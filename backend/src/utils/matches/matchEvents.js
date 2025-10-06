async function addEvent(match, newEvent) {
    match.events.push(newEvent);
    return match.save();
}

async function updateStatus(match, newStatus) {
    match.status = newStatus;
    return match.save();
}

async function incrementScore(match, team, amount = 1) {
    if (team === "home") {
        match.homeTeamScore += amount;
    } else if (team === "away") {
        match.awayTeamScore += amount;
    }
    return match.save();
}

async function handleRedCard(match, event, suspensionGames = 1) {
    // logic to handle red card
    const player = event.player;

    // suspend the player
    player.suspendedUntill = suspensionGames;
    await player.save();
    
    return match.save();
}