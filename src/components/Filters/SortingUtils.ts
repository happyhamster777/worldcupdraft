import { teamsToPointsMap } from "../../data";
import { ITeam } from "../../global";

export const sortByFifaRanking = (teamA: ITeam, teamB: ITeam) => {
    return teamA.fifaRanking - teamB.fifaRanking;
  }

export const sortByAge = (teamA: ITeam, teamB: ITeam) => {
    return teamB.age - teamA.age;
}

export const sortByPoints = (teamA: ITeam, teamB: ITeam) => {
  let teamAPoints = teamsToPointsMap.get(teamA.keyId);
  let teamBPoints = teamsToPointsMap.get(teamB.keyId)

  if (!teamAPoints) teamAPoints = 0;
  else if (!teamBPoints) teamBPoints = 0;
  else {
    if (teamAPoints > teamBPoints) return -1;
    if (teamAPoints < teamBPoints) return 1;
  }
  return 0;
}