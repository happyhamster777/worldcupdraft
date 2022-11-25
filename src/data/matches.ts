import { Group, IMatch } from '../global';
import jsonMatches from './matches.json';


// https://fixturedownload.com/view/json/fifa-world-cup-2022
const convertToKey = (name: string): string => {
    if (name === "Korea Republic") return "south_korea"
    let key: string = name.toLowerCase();
    key = key.split(' ').join('_');
    return key;
}

const getGroup = (group: string | null): Group | undefined => {
    if (group) {
        const groupLetter = group[6];
        switch(groupLetter){
            case "A":
                return Group.A;
            case "B":
                return Group.B;
            case "C":
                return Group.C;
            case "D":
                return Group.D;
            case "E":
                return Group.E;
            case "F":
                return Group.F;
            case "G":
                return Group.G;
            case "H":
                return Group.H;
            default:
                return undefined;  
        }
    } else {
        return undefined;
    }
}

export const matches: IMatch[] = [];
jsonMatches.forEach((match) => {
    const homeKey = convertToKey(match.HomeTeam);
    const awayKey = convertToKey(match.AwayTeam);
    const date = new Date(match.DateUtc);
    let group: Group | undefined = getGroup(match.Group);
    matches.push(
        {
            homeTeam: homeKey,
            awayTeam: awayKey,
            homeTeamScore: match.HomeTeamScore,
            awayTeamScore: match.AwayTeamScore,
            date: date,
            location: match.Location,
            matchNumber: match.MatchNumber,
            roundNumber: match.RoundNumber,
            group: group 
        }
    )
})
