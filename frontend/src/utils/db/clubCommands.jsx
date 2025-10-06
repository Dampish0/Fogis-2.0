import useClubStore from "../../store/clubStore";
import useTeamStore from "../../store/teamStore.js";
import useAuthStore from "../../store/authStore.js";

const { createPlayer } = usePlayerStore();
const { user } = useAuthStore();
const {fetchClubs, createClub, fetchClubById, updateClub} = useClubStore();
const {fetchTeamById} = useTeamStore();

export async function createClub(name, trainers=null, location=null, established=null, logo=null
    , phoneNumber=null, email=null, adress=null) {
    const clubData = { name, trainers, location, established, logo, phoneNumber, email, adress };
    return await createClub(clubData);
}

export async function getClubs(page=1, limit=10, filters={}) {
    const params = { page, limit: Math.min(limit, 30), ...filters };
    await fetchClubs(params);
    const clubs = useClubStore.getState().clubs;
    return clubs;
}

export async function getClubById(clubId) {
    const club = await fetchClubById(clubId);
    return club;
}

export async function updateClubInfo(clubId, trainers=null, location=null, established=null, logo=null
    , phoneNumber=null, email=null, adress=null
) {
    const data = {};
    trainers && (data.trainers = trainers);
    location && (data.location = location);
    established && (data.established = established);
    logo && (data.logo = logo);
    phoneNumber && (data.phoneNumber = phoneNumber);
    email && (data.email = email);
    adress && (data.adress = adress);

    const updatedClub = await updateClub(clubId, data);
    return updatedClub;
}
