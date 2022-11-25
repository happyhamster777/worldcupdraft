import { teamsMap } from "../data";
import { Color, ITeam } from "./globalTypes";

export const getPoolColor = (pool: number): Color => {
    switch(pool){
      case 1:
        return Color.QATAR_GREEN;
      case 2:
        return Color.QATAR_YELLOW;
      case 3:
        return Color.QATAR_VIOLET;
      case 4:
        return Color.QATER_SKYBLUE;
      case 5: 
        return Color.QATAR_PINK;
      default:
        return Color.QATAR_BLUE;
    }
  }

export const formatNumber = (number: number) => {
  let formattedNumber = number.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  })
  return formattedNumber
}

// export const getUserPoints = (teams: ITeam[]): number => {
//   let points: number = 0;
//   teams.forEach((teamItem) => {
//     const team = teamsMap.get(teamItem.keyId)
//     if (team) points += getTeamPoints(team);
//   })
//   return points;
// }


// export const getTeamPoints = (team: ITeam, verbose?: boolean):number => {
//   let points: number = 0;
//   team.matches?.forEach((match) => {
//     if (match.awayTeamScore !== null && match.homeTeamScore !== null) {
//       if (team.keyId === match.homeTeam) { // home team
//         // win
//         if (match.homeTeamScore > match.awayTeamScore) points += 3
//         // draw
//         if (match.homeTeamScore === match.awayTeamScore) points += 1
//         // goals scored
//         points += match.homeTeamScore
//         // goals conceded
//         points -= match.awayTeamScore
//         // clean sheets
//         if (match.awayTeamScore === 0) points += 1
//       } else { // away team
//         // win
//         if (match.homeTeamScore < match.awayTeamScore) points += 3
//         // draw
//         if (match.homeTeamScore === match.awayTeamScore) points += 1
//         // goals scored
//         points += match.awayTeamScore
//         // goals conceded
//         points -= match.homeTeamScore
//         // clean sheets
//         if (match.homeTeamScore === 0) points += 1
//       }
//     }
//   })
//   return points;
// }