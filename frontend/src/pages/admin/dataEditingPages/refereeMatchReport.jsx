import { Button, Container, Box, Typography, Paper, Stack, Divider, Grid } from "@mui/material";
import NavBar from "../../../components/navbar/Navbar";
import React, { useEffect, useState } from "react";
import useMatchStore from "../../../store/matchStore";
import useRefereeStore from "../../../store/refereeStore";
import useAuthStore from "../../../store/authStore";
import MatchBrowser from "../../../components/MatchDetails/MatchBrowser";
import { Autocomplete, IconButton, TextField, Select, MenuItem } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const eventTypes = [
    { label: "Mål", value: "goal" }, 
    { label: "Gult kort", value: "yellow_card" }, 
    { label: "Rött kort", value: "red_card" }, 
    { label: "Spelarbyte", value: "substitution" }
];

const RefereeMatchReport = () => {
    const { fetchRefereeById } = useRefereeStore();
    const { user } = useAuthStore();
    const { updateMatch, matches } = useMatchStore();
    const refereeId = user?._id;
    const [MyMatches, setMyMatches] = useState([]);
    const [events, setEvents] = useState([]);
    const [selectedMatchId, setSelectedMatchId] = useState(null);

    // Toggle this to false/remove when done testing
    const FAKE_MODE = true;

    // ...existing code...
    // Temporary fake data for testing
    useEffect(() => {
        if (!FAKE_MODE) return;
        const fakeMatch = {
            _id: "m1",
            status: "in_progress",
            date: new Date().toISOString(),
            score: { home: 1, away: 0 },
            homeTeam: { _id: "t1", name: "AIK" },
            awayTeam: { _id: "t2", name: "Djurgården" },
            events: [],
            homeTeamLineup: [
                { player: { _id: "p1", name: "Henrik Larsson" }, position: "FW", coordinates: { x: 10, y: 20 } },
                { player: { _id: "p2", name: "Anders Svensson" }, position: "MF", coordinates: { x: 20, y: 30 } },
                { player: { _id: "p3", name: "Kim Källström" }, position: "MF", coordinates: { x: 30, y: 40 } },
            ],
            awayTeamLineup: [
                { player: { _id: "p4", name: "Zlatan Ibrahimović" }, position: "FW", coordinates: { x: 50, y: 60 } },
                { player: { _id: "p5", name: "Kennedy Bakircioglü" }, position: "MF", coordinates: { x: 60, y: 70 } },
                { player: { _id: "p6", name: "Olof Mellberg" }, position: "DF", coordinates: { x: 70, y: 80 } },
            ],
        };
        setMyMatches([fakeMatch]);
        setSelectedMatchId(fakeMatch._id);
    }, [FAKE_MODE]);
    // ...existing code...

    // Keep fetching in real mode
    useEffect(() => {
        if (FAKE_MODE) return;
        if (refereeId) fetchRefereeById(refereeId);
    }, [FAKE_MODE, refereeId, fetchRefereeById]);

    useEffect(() => {
        if (FAKE_MODE) return;
        setMyMatches(matches);
    }, [FAKE_MODE, matches]);

    const [eventInput, setEventInput] = useState({
        time: "", 
        type: "",
        team: "",
        players: [],
        assist: null,
        substitution: null,
        description: ""
    });

    const handleEventInputChange = (field, value) => {
        setEventInput(prev => ({ ...prev, [field]: value }));
    };

    const handleAddEvent = () => {
        setEvents([...events, eventInput]);
        setEventInput({
            time: "", 
            type: "",
            team: "",
            players: [],
            assist: null,
            substitution: null,
            description: ""
        });
    };

    const selectedMatch = MyMatches.find(m => m._id === selectedMatchId) || MyMatches[0];

    const teams = selectedMatch ? [
        { label: selectedMatch.homeTeam?.name, value: selectedMatch.homeTeam?._id, side: "home" },
        { label: selectedMatch.awayTeam?.name, value: selectedMatch.awayTeam?._id, side: "away" }
    ] : [];

    // Players from selected team in the selected match (temporary)
    const selectedTeamSide = teams.find(t => t.value === eventInput.team)?.side;
    const players = selectedMatch && selectedTeamSide
        ? (selectedTeamSide === "home" ? selectedMatch.homeTeamLineup : selectedMatch.awayTeamLineup)
            .map(l => ({ _id: l.player._id, name: l.player.name }))
        : [];

    const handleSubmitEvents = () => {
        if (!selectedMatchId) return;
        const match = MyMatches.find(m => m._id === selectedMatchId);
        if (!match) return;

        // Map UI events to backend-like event shape for testing
        const payload = events.map(ev => ({
            time: Number(ev.time),
            type: ev.type,
            player: ev.players?.[0]?._id || null,
            assistingPlayer: ev.assist?._id || null,
            description: ev.description || ""
        }));

        if (FAKE_MODE) {
            console.log("FAKE submit events payload:", payload);
            setEvents([]);
            return;
        }

        const updatedMatch = {
            ...match,
            events: [...(match.events || []), ...payload]
        };
        updateMatch(updatedMatch);
        setEvents([]);
    };

    const handleClickArrow = (selectedNum, id) => {
        setSelectedMatchId(id);
        // Reset team/players when changing match
        setEventInput(prev => ({ ...prev, team: "", players: [], assist: null, substitution: null }));
    };

    const historyData = MyMatches.map((match, index) => ({
        name: `${match.homeTeam.name} - ${match.awayTeam.name}`,
        status: match.status,
        score: `${match.score.home} - ${match.score.away}`,
        date: (new Date(match.date)).toISOString().slice(0, 10),
        time: (new Date(match.date)).toISOString().slice(11, 16),
        action: (
            <IconButton onClick={() => handleClickArrow(index, match._id)}>
                <ArrowForwardIcon style={{ color: "white" }}/>
            </IconButton>
        ),
        id: match._id
    }));

    const isAddDisabled = !eventInput.time || !eventInput.type || !eventInput.team || eventInput.players.length === 0;

    return (
        <div>
            <NavBar />
            <Typography variant="h4" fontWeight="bold" mb={2} ml={3}>Dina matcher</Typography>
            <Grid container sx={{ mt: 4, mb: 4 }}>
                <Stack direction="row" spacing={4} ml={3} alignItems="flex-start">
                    <Box flex={1}>
                        <MatchBrowser DisplayData={historyData} />
                    </Box>
                    <Box flex={1}>
                        <Paper elevation={3} sx={{ p: 3, bgcolor: "#2E2E2E", color: "white", borderRadius: 3, minWidth: 800 }}>
                            <Typography variant="h6" mb={2}>Registrera matchhändelse</Typography>
                            <Stack spacing={2}>
                                <TextField
                                    label="Minut" 
                                    name="event-time"
                                    id="event-time"
                                    type="number"
                                    value={eventInput.time}
                                    onChange={e => handleEventInputChange("time", e.target.value)}
                                    inputProps={{ min: 0 }}
                                    sx={{ 
                                        input: { color: "white" }, 
                                        "& .MuiInputLabel-root": { color: "white" } 
                                    }}
                                />
                                <Select
                                    name="event-type"
                                    id="event-type"
                                    value={eventInput.type}
                                    onChange={e => handleEventInputChange("type", e.target.value)}
                                    displayEmpty
                                    sx={{ color: "white" }}
                                >
                                    <MenuItem value="" disabled>Typ av händelse</MenuItem>
                                    {eventTypes.map(event => (
                                        <MenuItem key={event.value} value={event.value}>
                                            {event.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <Select
                                    name="team"
                                    id="event-team"
                                    value={eventInput.team}
                                    onChange={e => handleEventInputChange("team", e.target.value)}
                                    displayEmpty
                                    sx={{ color: "white" }}
                                >
                                    <MenuItem value="" disabled>Lag</MenuItem>
                                    {teams.map(team => (
                                        <MenuItem key={team.value} value={team.value}>{team.label}</MenuItem>
                                    ))}
                                </Select>
                                <Autocomplete
                                    multiple
                                    id="event-players"
                                    options={players}
                                    getOptionLabel={option => option.name}
                                    value={eventInput.players}
                                    onChange={(e, value) => handleEventInputChange("players", value)}
                                    renderInput={params => (
                                        <TextField 
                                            {...params} 
                                            label="Spelare" 
                                            name="event-players"
                                            sx={{ "& .MuiInputLabel-root": { color: "white" } }}
                                        />
                                    )}
                                    sx={{ minWidth: 200 }}
                                />
                                {eventInput.type === "goal" && (
                                    <Autocomplete
                                        id="event-assist"
                                        options={players}
                                        getOptionLabel={option => option.name}
                                        value={eventInput.assist || null}
                                        onChange={(e, value) => handleEventInputChange("assist", value)}
                                        renderInput={params => (
                                            <TextField 
                                                {...params} 
                                                label="Assist" 
                                                name="event-assist"
                                                sx={{ "& .MuiInputLabel-root": { color: "white" } }}
                                            />
                                        )}
                                        sx={{ minWidth: 200 }}
                                    />
                                )}
                                {eventInput.type === "substitution" && (
                                    <Autocomplete
                                        id="event-substitution"
                                        options={players}
                                        getOptionLabel={option => option.name}
                                        value={eventInput.substitution}
                                        onChange={(e, value) => handleEventInputChange("substitution", value)}
                                        renderInput={params => (
                                            <TextField 
                                                {...params} 
                                                label="Inbytt spelare"
                                                name="event-substitution"
                                                sx={{ "& .MuiInputLabel-root": { color: "white" } }}
                                            />
                                        )}
                                        sx={{ minWidth: 200 }}
                                    />
                                )}
                                <Button
                                    onClick={handleAddEvent}
                                    variant="contained"
                                    disabled={isAddDisabled}
                                    sx={{ mt: 2 }}
                                >
                                    Lägg till händelse
                                </Button>
                            </Stack>
                            <Divider sx={{ my: 3, bgcolor: "grey.700" }} />
                            <Typography variant="subtitle1" mb={1}>Tillagda händelser:</Typography>
                            <Stack spacing={1}>
                                {events.length === 0 && <Typography color="grey.500">Inga händelser tillagda ännu.</Typography>}
                                {events.map((ev, idx) => (
                                    <Box key={idx} sx={{ bgcolor: "#222", p: 1, borderRadius: 1 }}>
                                        <Typography>
                                            <b>{ev.time} min</b> - {eventTypes.find(e => e.value === ev.type)?.label || ev.type} - {teams.find(t => t.value === ev.team)?.label || ev.team}
                                        </Typography>
                                        <Typography variant="body2">
                                            Spelare: {ev.players.map(p => p.name).join(", ")}
                                        </Typography>
                                        {ev.description && (
                                            <Typography variant="body2" color="grey.400">
                                                {ev.description}
                                            </Typography>
                                        )}
                                    </Box>
                                ))}
                            </Stack>
                            <TextField
                                label="Domarens rapport"
                                name="event-description"
                                id="event-description"
                                value={eventInput.description}
                                onChange={e => handleEventInputChange("description", e.target.value)}
                                multiline
                                rows={3}
                                fullWidth
                                margin="normal"
                                sx={{ 
                                    input: { color: "white" }, 
                                    "& .MuiInputLabel-root": { color: "white" } 
                                }}
                            />
                            <Button
                                onClick={handleSubmitEvents}
                                variant="outlined"
                                sx={{ mt: 2 }}
                                disabled={events.length === 0 || !selectedMatchId}
                            >
                                Registrera händelser
                            </Button>
                        </Paper>
                    </Box>
                </Stack>
            </Grid>
        </div>
    );
};

export default RefereeMatchReport;