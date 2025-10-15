import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateVerificationCode } from "../utils/generateVerificationCode.js";
import {generateTokenAndSetCookie} from "../utils/generateTokenAndSetCookie.js";
import { SendLoginCredential, SendPasswordReset, SendPasswordResetSuccess } from "../utils/mailtrap/email.js";

export async function createUser(req, res)
{   
    try{
        const {email, password, name, authRole} = req.body;

        if(!email || !password || !name || !authRole){
            throw new Error("All Fields are required.")
        }

        if(authRole == "superadmin" || authRole == "dev"){
            return res.status(403).json({message: "You are not authorized to create this user."});
        }

        const userAlreadyExists = await User.findOne({email:email.toLowerCase()})
        if(userAlreadyExists){
            return res.status(400).json({message:"User already exists."});
        }

        const hashpass = await bcrypt.hash(password, 14);
        //const verifcode = generateVerificationCode();
        const user = new User(
            {
                email: email.toLowerCase(),
                password: hashpass,
                name: name,
                role: authRole,
                //verificationToken: verifcode,
                //verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
            }
        )


        await user.save();

        //jwt 
        
        //generateTokenAndSetCookie(res, user._id);

        res.status(201).json({
            success:true,
            message: "user created successfully.",
            user:{
                ...user._doc,
                password: undefined,
            }
        })

        await SendLoginCredential(name, email.toLowerCase(), password);
    }
    catch(error){
        res.status(400).json({success:false,   message:"error in createUser.", err: error.message});
    }
}



export async function login(req, res)
{   
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email: email.toLowerCase()}).populate("clubId", "name teams players");
        if(!user){
            return res.status(400).json({
                success:false,
                message: "Felaktiga inloggningsuppgifter.",
            })    
        }
        
        const validPass = await bcrypt.compare(password, user.password);
        if(!validPass){
            return res.status(400).json({
                success:false,
                message: "Felaktiga inloggningsuppgifter.",
            })  
        }
        
        generateTokenAndSetCookie(res, user._id);
          
        user.lastLogin = Date.now();

        await user.save()
    

            res.status(200).json({
            success:true,
            message: "Inloggning lyckades.",
            user:{
                ...user._doc,
                password: undefined,
            }
        })
    
    }
    catch(error){
        console.log("Error in login: ", error.message);
        res.status(400).json({success:false,   message:"error in login.", err: error.message});

    }
}



export async function logout(req, res)
{   
    try{
        res.clearCookie("authtoken");
        res.status(200).json({success: true, message:"Utloggning lyckades."});
    }
    catch(error){
        console.log("Error in logout: ", error.message);
        res.status(400).json({success: false, message:"error in logout."});
    }
}

export async function forgotPass(req, res)
{   
    try{
        const {email} = req.body;
        const user = await User.findOne({email: email.toLowerCase()});

        if(!user){
            return res.status(400).json({
                success:false,
                message: "Felaktiga uppgifter.",
            })  
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetExpireDate = Date.now() + 30 * 60 * 1000; // 30 min
   
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetExpireDate;

        await user.save();

        await SendPasswordReset("elias.dovkrans@gmail.com", `${process.env.CLIENT_URL}/reset-password/${resetToken}`);
        
        res.status(200).json({success: true, message:"Länk för återställning av lösenord skickad."});
    }
    catch(error){
        res.status(400).json({success: false, message:"error in forgotPass.", err: error.message});
    }
}


export async function resetPass(req, res)
{   
    try{
        const {token} = req.params;
        const {newPass} = req.body;
        const user = await User.findOne({resetPasswordToken: token, resetPasswordExpiresAt: {$gt: Date.now()}});

        if(!user){
            return res.status(400).json({
                success: false,
                message: "Ogiltig länk.",
            })  
        }

        const hashpass = await bcrypt.hash(newPass, 14);
        user.password = hashpass;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;

        await user.save();

        await SendPasswordResetSuccess(user.email.toLowerCase(),user.name);

        res.status(200).json({success: true, message:"Lösenordet har återställts."});
    }
    catch(error){
        res.status(400).json({success: false, message:"error in resetPass.", err: error.message});
    }
}

export async function checkAuth(req, res)
{   
    try{
        const user = await User.findById(req.userId).select("-password").populate("clubId", "name teams players");

        if(!user){
            return res.status(400).json({
                success: false,
                message: "Ogiltig användare.",
            })  
        }

        res.status(200).json({success: true, message:"Användaren är autentiserad.", user: user});


    }catch(error){
        console.log("Error in checkAuth: ", error.message);
        res.status(400).json({success: false, message:"error in checkAuth.", err: error.message});
    }
}

export async function verifyRole(req, res)
{   
    try{
        const {role} = req.body;
        const user = await User.findById(req.userId).select("-password").populate("clubId", "name teams players"); 
        if(!user){
            return res.status(400).json({
                success: false,
                message: "Ogiltig användare.",
            })  
        }
        if(user.role !== role){
            return res.status(403).json({
                success: false,
                message: "Åtkomst nekad.",
            })  
        }
        res.status(200).json({success: true, message:"Användaren har rätt roll.", user: user});

    }
    catch(error){
        console.log("Error in verifyRole: ", error.message);
        res.status(400).json({success: false, message:"error in verifyRole.", err: error.message});
    }
}

export const sendNotification = async (req, res) => {
    try {
        const { title, message, group, clubId, userId } = req.body;
        console.log("Notification request received:", { title, message, group, clubId, userId });

        if (!title || !message || !group) {
            return res.status(400).json({ success: false, message: "Title, message, and group are required." });
        }
        if (group === "club" && !clubId) {
            return res.status(400).json({ success: false, message: "Club ID is required for group 'club'." });
        }
        if (group === "individual" && !userId) {
            return res.status(400).json({ success: false, message: "User ID is required for group 'individual'." });
        }
        
        let usersToNotify = [];
        if (group === "all") {
            usersToNotify = await User.find({});
        } else if (group === "club") {
            usersToNotify = await User.find({ clubId: clubId });
        } else if (group === "admin") {
            usersToNotify = await User.find({ role: { $in: ["admin", "superadmin", "dev"] } });
        }
        else if (group === "individual") {
            const user = await User.findById(userId);
            if (user) {
                usersToNotify.push(user);
            }
        } else {
            return res.status(400).json({ success: false, message: "Invalid group specified." });
        }
 
        for (const user of usersToNotify) {
            user.notifications.push({ title, message });
            await user.save();
        }

        res.status(200).json({ success: true, message: "Notifications sent successfully." });
    } catch (error) {
        console.log("Error in sendNotification: ", error.message);
        res.status(400).json({ success: false, message: "error in sendNotification.", err: error.message });
    }
};

export const readNotification = async (req, res) => {
    try {
        const { notificationIds } = req.body;
        if (!notificationIds || !Array.isArray(notificationIds)) {
            return res.status(400).json({ success: false, message: "Notification IDs are required." });
        }
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid user." });
        }
        const notificationsToMark = user.notifications.filter(n => notificationIds.includes(n._id.toString()));
        notificationsToMark.forEach(n => n.read = true);
        await user.save();
        res.status(200).json({ success: true, message: "Notifications marked as read." });
    } catch (error) {
        console.log("Error in readNotification: ", error.message);
        res.status(400).json({ success: false, message: "error in readNotification.", err: error.message });
    }  
};
