import { Button } from '@mui/material'
import React from 'react'
import { useState } from 'react'

import useClubStore from '../store/clubStore'
import useTeamStore from '../store/teamStore.js'
import useAuthStore from '../store/authStore.js'
import usePlayerStore from '../store/playerStore.js'
import useMatchStore from '../store/matchStore.js'
import useArenaStore from '../store/arenaStore.js'
import useRefereeStore from '../store/refereeStore.js'
import seriesStore from '../store/seriesStore.js'
import useAdminCaseStore from '../store/adminCaseStore.js'
import { useEffect } from 'react'
import { Select, MenuItem, TextField, InputLabel, FormControl, Box } from '@mui/material';



const TestingPage = () => {
    const {fetchClubs, createClub, fetchClubById, updateClub, clubs} = useClubStore();
    const {fetchTeams, createTeam, fetchTeamById, updateTeam, teams} = useTeamStore();
    const {fetchPlayers, createPlayer, fetchPlayerById, updatePlayer, players} = usePlayerStore();
    const {fetchMatches, createMatch, fetchMatchById, updateMatch, matches} = useMatchStore();
    const {fetchArenas, createArena, fetchArenaById, updateArena, arenas} = useArenaStore();
    const {fetchReferees, createReferee, fetchRefereeById, updateReferee, referees} = useRefereeStore();
    const {fetchAdminCases, createAdminCase, fetchAdminCaseById, updateAdminCase, adminCases} = useAdminCaseStore();
    const {fetchSeries, createSeries, fetchSeriesById, updateSeries, seriesList} = seriesStore();

    const { user } = useAuthStore();

    const [error, setError] = useState(null);
    const [success, updateSuccess] = useState(null);
    const [fetchedData, setFetchedData] = useState(null);
    const [lastFetched, setLastFetched] = useState(null);


const entityMap = {
  club: { items: clubs, update: updateClub },
  team: { items: teams, update: updateTeam },
  player: { items: players, update: updatePlayer },
  match: { items: matches, update: updateMatch },
  arena: { items: arenas, update: updateArena },
  referee: { items: referees, update: updateReferee },
  adminCase: { items: adminCases, update: updateAdminCase },
  series: { items: seriesList, update: updateSeries },
};

const [selectedEntity, setSelectedEntity] = useState("club");
const [selectedId, setSelectedId] = useState("");
const [updateFields, setUpdateFields] = useState({});
const [updateSuccessState, setUpdateSuccessState] = useState(null);

const handleFieldChange = (field, value) => {
  setUpdateFields(prev => ({ ...prev, [field]: value }));
};

const randomPositions = ["Substitute","CB", "LB", "RB", "LWB", "RWB", "CDM", "CM", "CAM", "LM", "RM", "LW", "RW", "CF", "ST", "GK"];
const handleAddLineup = async () => {
  try {
    const match = matches.find(m => m._id === selectedId);
    if (!match) throw new Error("Match not found");

    const isHomeTeam = Math.random() < 0.5;
    const lineupEntry = {
      player: "68e6ad55285f34ee1ffeeb2f",
      position: randomPositions[Math.floor(Math.random() * randomPositions.length)],
      coordinates: { x: isHomeTeam ? (Math.random() / 2) : (Math.random()/2) + 0.5, 
        y: Math.random() }
    };
    const updatedLineup = isHomeTeam ? [...match.homeTeamLineup, lineupEntry] : [...match.awayTeamLineup, lineupEntry];
    await updateMatch(match._id, { [isHomeTeam ? "homeTeamLineup" : "awayTeamLineup"]: updatedLineup });
      setUpdateSuccessState(true);

  } catch (error) {
    setError(error);
        setUpdateSuccessState(false);

  }
};

const handleUpdate = async () => {
  try {
    await entityMap[selectedEntity].update(selectedId, updateFields);
    setUpdateSuccessState(true);
  } catch (error) {
    setError(error);
    setUpdateSuccessState(false);
  }
};


    useEffect(() => {
      switch (lastFetched) {
      case "clubs":
        setFetchedData(clubs);
        break;
      case "teams":
        setFetchedData(teams);
        break;
      case "players":
        setFetchedData(players);
        break;
      case "matches":
        setFetchedData(matches);
        break;
      case "arenas":
        setFetchedData(arenas);
        break;
      case "referees":
        setFetchedData(referees);
        break;
      case "adminCases":
        setFetchedData(adminCases);
        break;
      case "series":
        setFetchedData(seriesList);
        break;
      default:
        setFetchedData(null);
    }
    }, [clubs, teams, players, matches, arenas, referees, adminCases, seriesList, lastFetched]);

    const handleCreateClub = async () => {
      try {

        const clubData = { name: "Test Club", trainers: ["68dd68c7bf33cb059d32414a"], location: "Test Location", established: 2024, logo: null, phoneNumber: "123-456-7890", email: "test@example.com", adress: "Test Address" };
        await createClub(clubData);
        updateSuccess(true);
      } catch(error) {
        setError(error);
        console.error("Error creating club:", error);
        updateSuccess(false);
      }
    }

    const handleCreateTeam = async () => {
      try {
        const teamData = { name: "Test Team", clubId: "68e6a43f87c4f36570c95e31", ageGroup: "U-18", players: [], logo: null, address: "Test Address", homeArena: null };
        await createTeam(teamData);
        updateSuccess(true);
      } catch(error) {
        setError(error);
        console.error("Error creating team:", error);
        updateSuccess(false);
      }
    }

    const handleCreateMatch = async () => {
      try {  
        const matchData = { matchDate:  Date.now() + 1.1 * 60 * 60 * 1000, homeTeam: "68e6a7e2bd5bf4e083b83f0f", awayTeam: "68e6a821bd5bf4e083b83f12", location:null, arena: null, series: null, referees: null };
        await createMatch(matchData);
        updateSuccess(true);
      } catch(error) {
        setError(error);
        console.error("Error creating match:", error);
        updateSuccess(false);
      }
    }

    const handleCreatePlayer = async () => {
      try { 

        const playerData = { name: "test player", persNmr: "20020202-" + Math.floor(Math.random() * 10000).toString().padStart(4, "0"), shirtNumber: "5", preferedPosition: "FWD", team: "68e6a7e2bd5bf4e083b83f0f", clubId: "68e6addc914e9ac1dae612a0" };
        await createPlayer(playerData);
        updateSuccess(true);
      } catch(error) {
        setError(error);
        console.error("Error creating player:", error);
        updateSuccess(false);
      }
    }

    const handleCreateArena = async () => {
      try {
        const arenaData = { name: "Test Arena", location: "Test Location", capacity: 5000, indoor: true, address: "Test Address" };
        await createArena(arenaData);
        updateSuccess(true);
      } catch(error) {
        setError(error);
        console.error("Error creating arena:", error);
        updateSuccess(false);
      }
    }

    const handleCreateReferee = async () => {
      try {
        const refereeData = { name: "Test Referee", persNmr: "19850505-" + Math.floor(Math.random() * 10000).toString().padStart(4, "0"), certificationLevel: "Level 1", phoneNumber: "123-456-7890", email: "test@example.com" };
        await createReferee(refereeData);
        updateSuccess(true);
      } catch(error) {
        setError(error);
        console.error("Error creating referee:", error);
        updateSuccess(false);
      }
    }
    const handleCreateAdminCase = async () => {
      try {
        const adminCaseData = {caseType: "suspension", filedBy: "68e6b29bced75733396b1046", description: "He started fighting naked", status: "open", involvedPlayers: ["68e6ad55285f34ee1ffeeb2f"], matchOfIncident: "68e6ab4de05c013ce5355603", assignedTo: null };
        await createAdminCase(adminCaseData);
        updateSuccess(true);
      } catch(error) {
        setError(error);
        console.error("Error creating admin case:", error);
        updateSuccess(false);
      }
    }
    const handleCreateSeries = async () => {
      try {
        const seriesData = { name: "Test Series", level: "Division 1", ageGroup: "Senior", gender: "Mixed", teams: [], description: "This is a test series", startDate: Date.now(), endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)) };
        await createSeries(seriesData);
        updateSuccess(true);
      }
      catch(error) {
        setError(error);
        console.error("Error creating series:", error);
        updateSuccess(false);
      }
    }


  return (
    <div style={{backgroundColor: '#212122', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '20px'}}>
        
        {/* create data */}
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px'}}>
        {error && !success && <div style={{ color: `#${Math.floor(Math.random()*16777215).toString(16)}` }}>Error: {error.message}</div>}
        {success === true && <div style={{ color: `#${Math.floor(Math.random()*16777215).toString(16)}` }}>Everything worked successfully!</div>}
        {success === false && <div style={{ color: `#${Math.floor(Math.random()*16777215).toString(16)}` }}>Something went wrong!</div>}
        {success === null && <div style={{ color: `#${Math.floor(Math.random()*16777215).toString(16)}` }}>Click the button to run the test.</div>}
        <Button onClick={handleCreateClub} variant="contained" color="primary">
            create club
        </Button>

        <Button onClick={handleCreateTeam} variant="contained" color="primary">
            create team
        </Button>

        <Button onClick={handleCreateMatch} variant="contained" color="primary">
            create match
        </Button>

        <Button onClick={handleCreatePlayer} variant="contained" color="primary">
            create player
        </Button>

        <Button onClick={handleCreateArena} variant="contained" color="primary">
            create arena
        </Button>

        <Button onClick={handleCreateReferee} variant="contained" color="primary">
            create referee
        </Button>

        <Button onClick={handleCreateAdminCase} variant="contained" color="primary">
            create admin case
        </Button>

        <Button onClick={handleCreateSeries} variant="contained" color="primary">
            create series
        </Button>
      </div>

      {/* get data */}
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px'}}>
        <Button onClick={async () => {await fetchClubs(); setLastFetched("clubs");}} variant="contained" color="secondary">
            fetch clubs
        </Button>
        <Button onClick={async () => {await fetchTeams(); setLastFetched("teams");}} variant="contained" color="secondary">
            fetch teams
        </Button>
        <Button onClick={async () => {await fetchMatches(); setLastFetched("matches");}} variant="contained" color="secondary">
            fetch matches
        </Button>
        <Button onClick={async () => {await fetchPlayers(); setLastFetched("players");}} variant="contained" color="secondary">
            fetch players
        </Button>
        <Button onClick={async () => {await fetchArenas(); setLastFetched("arenas");}} variant="contained" color="secondary">
            fetch arenas
        </Button>
        <Button onClick={async () => {await fetchReferees(); setLastFetched("referees");}} variant="contained" color="secondary">
            fetch referees
        </Button>
        <Button onClick={async () => {await fetchAdminCases(); setLastFetched("adminCases");}} variant="contained" color="secondary">
            fetch admin cases
        </Button>
        <Button onClick={async () => {await fetchSeries(); setLastFetched("series");}} variant="contained" color="secondary">
            fetch series
        </Button>
      </div>

      {/* Display fetched data */}
      <div style={{color: '#ffffff', maxHeight: '80vh', overflowY: 'auto', width: '40%', backgroundColor: '#2c2c2e', padding: '10px', borderRadius: '8px'}}>
        {fetchedData && (
          <pre>{JSON.stringify(fetchedData, null, 2)}</pre>
        )}
      </div>


    {/* Update entity */}
<Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
    bgcolor: '#232325',
    p: 2,
    borderRadius: 2,
    minWidth: 300,
    maxHeight: '100vh',
    width: '350px',
  }}
>
  <h3 style={{ color: '#fff' }}>Update Entity</h3>
  <FormControl fullWidth variant="filled" sx={{ mb: 2 }}>
    <InputLabel sx={{ color: '#fff' }}>Entity</InputLabel>
    <Select
      value={selectedEntity}
      onChange={e => { setSelectedEntity(e.target.value); setSelectedId(""); setUpdateFields({}); }}
      sx={{ color: '#fff', bgcolor: '#333' }}
    >
      {Object.keys(entityMap).map(key => (
        <MenuItem key={key} value={key}>{key}</MenuItem>
      ))}
    </Select>
  </FormControl>
  <FormControl fullWidth variant="filled" sx={{ mb: 2 }}>
    <InputLabel sx={{ color: '#fff' }}>Item</InputLabel>
    <Select
      value={selectedId}
      onChange={e => { setSelectedId(e.target.value); setUpdateFields({}); }}
      sx={{ color: '#fff', bgcolor: '#333' }}
    >
      <MenuItem value="">Select item</MenuItem>
      {entityMap[selectedEntity].items?.map(item => (
        <MenuItem key={item._id} value={item._id}>{item.name || item._id}</MenuItem>
      ))}
    </Select>
  </FormControl>
  {/* Scrollable fields container */}
  <Box sx={{ width: '100%', maxHeight: '300px', overflowY: 'auto', mb: 2 }}>
    {selectedId && entityMap[selectedEntity].items?.find(i => i._id === selectedId) &&
      Object.entries(entityMap[selectedEntity].items.find(i => i._id === selectedId)).map(([field, value]) => (
        field !== "_id" && (
          <TextField
            key={field}
            label={field}
            variant="filled"
            fullWidth
            sx={{ mb: 1, input: { color: '#fff' }, label: { color: '#fff' } }}
            value={updateFields[field] ?? value ?? ""}
            onChange={e => handleFieldChange(field, e.target.value)}
            InputProps={{ style: { background: '#333', color: '#fff' } }}
          />
        )
      ))
    }
  </Box>
  <Button onClick={handleUpdate} variant="contained" color="warning" disabled={!selectedId}>
    Update
  </Button>
  {selectedEntity === "match" &&
    <Button onClick={handleAddLineup} variant="contained" color="warning" disabled={!selectedId}>
    Add a random player to lineup
  </Button>
  }
  {updateSuccessState === true && <div style={{ color: `#${Math.floor(Math.random()*16777215).toString(16)}` }}>Update successful!</div>}
</Box>




    </div>
  )
}

export default TestingPage;