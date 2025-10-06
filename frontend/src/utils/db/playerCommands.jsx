import usePlayerStore from "../../store/playerStore.js";
import useClubStore from "../../store/clubStore.js";
import useTeamStore from "../../store/teamStore.js";
import useAuthStore from "../../store/authStore.js";

//         const { name, persNmr, number, preferedPosition, clubId, teamId } = req.body;

const { createPlayer } = usePlayerStore();
const { user } = useAuthStore();
const {fetchClubById} = useClubStore();
const {fetchTeamById} = useTeamStore();

export async function createPlayer(name, persNmr, shirtNumber = 3, preferedPosition = "CB", teamId = null) {
    
    const clubId = user.clubId;
    const teamId = teamId;

    const playerData = { name, persNmr, number: shirtNumber, preferedPosition };

    return await createPlayer(playerData);
}

export async function getPlayersInClub() {
    const club =  user.clubId;
    const players = club.players || [];
    return players;
}

export async function getPlayersInTeam(teamId) {
    const team = await fetchTeamById(teamId);
    const players = team.players || [];
    return players;
}

