import useClubStore from "../../store/clubStore.js";
import useTeamStore from "../../store/teamStore.js";
import useAuthStore from "../../store/authStore.js";

const { updateTeam, createTeam, fetchTeamById } = useTeamStore();
const { user } = useAuthStore();


export async function getTeamsInClub() {
    const club =  user.clubId;
    const teams = club.teams || [];
    return teams;
}

export async function getTeamById(teamId) {
    const team = await fetchTeamById(teamId);
    return team;
}

export async function createTeam(name, ageGroup=null, clubId=null, players=[], logo=null, address = "", homeArena = null) {
    const teamData = { name, ageGroup, clubId: clubId || user.clubId, players, logo, address, homeArena };
    return await createTeam(teamData);
}

//lineups

// homeTeamLineup: [{
//         player: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Player',
//             required: true,
//         },
//         position: { type: String }, // optional
//         coordinates: {
//             x: { type: Number, required: true },
//             y: { type: Number, required: true }
//         }
//     }],

export async function updateLineupInTeam(teamId, lineup) {
    const updatedTeam = await updateTeam(teamId, { lineup });
    return updatedTeam;
}

export async function updateTeamInfo(teamId, clubId=null, name=null, ageGroup=null, players=null, logo=null, address = null, homeArena = null) {
    const data = {};
    name && (data.name = name);
    ageGroup && (data.ageGroup = ageGroup);
    players && (data.players = players);
    logo && (data.logo = logo);
    address && (data.address = address);
    homeArena && (data.homeArena = homeArena);
    clubId && (data.clubId = clubId);
    const updatedTeam = await updateTeam(teamId, data);
    return updatedTeam;
}
