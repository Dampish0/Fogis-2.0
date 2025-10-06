import useMatchStore  from '../../stores/matchStore';

const { createMatch, fetchMatches, fetchMatchById } = useMatchStore();
//    createMatch:    const {homeTeam, awayTeam, matchDate, location, arena, referees} = req.body;
//

export async function createMatch(homeTeam, awayTeam, matchDate, location = "", arena = "", referees = []) {
    return await createMatch({ homeTeam, awayTeam, matchDate, location, arena, referees });
}

export async function getMatches(currentPage = 1, limit=10, filters = {}) {
    const params = { currentPage, limit: Math.min(limit, 30), ...filters };
    return await fetchMatches(params);
}

export async function getMatchById(id) {
    return await fetchMatchById(id);
}