import {client, sender} from "./MailTrapConfig.js"

export const SendLoginCredential = async (user, email, pass) => {

    // const recipients = [
    // {
    //     email: email,
    // }
    // ];

    const recipients = [
    {
        email: "elias.dovkrans@gmail.com",
    }
    ];

    client
    .send({
        from: sender,
        to: recipients,
        template_uuid: "631b3413-d24b-41d2-8486-37841b70d22e",
        template_variables: {
        "user_name": user,
        "email": email,
        "password": pass,
        }
    })
    .then(console.log, console.error);
}

export const SendPasswordReset = async (email, link) => {
    try{
    const recipients = [
    {
        email: email,
    }
    ];

    client
    .send({
        from: sender,
        to: recipients,
        template_uuid: "8c80c1af-0bd3-490a-a6b7-121a9028e643",
        template_variables: {
        "user_email": email,
        "pass_reset_link": link,
        }
    })
    .then(console.log, console.error);
    }
    catch(error){
        console.log("Error in SendPasswordReset: ", error.message);
    }
}

export const SendPasswordResetSuccess = async (email, username) => {
    try{
        const recipients = [
        {
            email: email,
        }
        ];
        client.send({
            from: sender,
            to: recipients,
            template_uuid: "76dec7a3-3811-4f47-8fb2-5ca904a6e266",
            template_variables: {
                "user_name": username,
            }
        })
        .then(console.log, console.error);
    } catch(error){
        console.log("Error in SendPasswordResetSuccess: ", error.message);
    }
}