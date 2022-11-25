import { Confederation, Group, IMatch, ITeam } from "../global";
import { matches } from "./matches";

export const teamsToMatchesMap: Map<string, IMatch[]> = new Map<string, IMatch[]>();
export const teamsToPointsMap: Map<string, number> = new Map<string,number>();
for (let i in matches) {
    const match = matches[i];
    let homeTeamPoints: number = 0;
    let awayTeamPoints: number = 0;
    if (match.awayTeamScore !== null && match.homeTeamScore !== null) {
        // win
        if (match.homeTeamScore > match.awayTeamScore) homeTeamPoints += 3
        // draw
        if (match.homeTeamScore === match.awayTeamScore) homeTeamPoints += 1
        // goals scored
        homeTeamPoints += match.homeTeamScore
        // goals conceded
        homeTeamPoints -= match.awayTeamScore
        // clean sheets
        if (match.awayTeamScore === 0) homeTeamPoints += 1
        // win
        if (match.homeTeamScore < match.awayTeamScore) awayTeamPoints += 3
        // draw
        if (match.homeTeamScore === match.awayTeamScore) awayTeamPoints += 1
        // goals scored
        awayTeamPoints += match.awayTeamScore
        // goals conceded
        awayTeamPoints -= match.homeTeamScore
        // clean sheets
        if (match.homeTeamScore === 0) awayTeamPoints += 1
    }
    const prevHomeList: IMatch[] | undefined = teamsToMatchesMap.get(match.homeTeam)
    let newHomeList: IMatch[];
    if (prevHomeList) {
        newHomeList = prevHomeList;
        newHomeList.push(match);
    } else {
        newHomeList = [match];
    }
    let newAwayList: IMatch[];
    const prevAwayList: IMatch[] | undefined = teamsToMatchesMap.get(match.awayTeam)
    if (prevAwayList) {
        newAwayList = prevAwayList;
        newAwayList.push(match);
    } else {
        newAwayList = [match];
    }
    const prevHomePoints = teamsToPointsMap.get(match.homeTeam);
    const prevAwayPoints = teamsToPointsMap.get(match.awayTeam);

    teamsToMatchesMap.set(match.homeTeam, newHomeList);
    teamsToMatchesMap.set(match.awayTeam, newAwayList);

    if (prevHomePoints) {
        teamsToPointsMap.set(match.homeTeam, homeTeamPoints + prevHomePoints);
    } else {
        teamsToPointsMap.set(match.homeTeam, homeTeamPoints);
    }
    if (prevAwayPoints) {
        teamsToPointsMap.set(match.awayTeam, awayTeamPoints + prevAwayPoints);
    } else {
        teamsToPointsMap.set(match.awayTeam, awayTeamPoints);

    }
}

export const teams: ITeam[] = [
    {
        keyId: "brazil",
        name: "Brazil",
        matches: teamsToMatchesMap.get("brazil"),
        fifaRanking: 1,
        wcRanking: 1,
        rankingPoints: 1841.3,
        group: Group.G,
        pool: 1,
        confederation: Confederation.CONMEBOL,
        age: 27.9,
        points: teamsToPointsMap.get("brazil")
    },
    {
        keyId: "belgium",
        name: "Belgium",
        matches: teamsToMatchesMap.get("belgium"),
        fifaRanking: 2,
        wcRanking: 2,
        rankingPoints: 1816.71,
        group: Group.F,
        pool: 1,
        confederation: Confederation.UEFA,
        age: 27.8,
        points: teamsToPointsMap.get("belgium")
    },
    {
        keyId: "argentina",
        name: "Argentina",
        matches: teamsToMatchesMap.get("argentina"),
        fifaRanking: 3,
        wcRanking: 3,
        rankingPoints: 1773.88,
        group: Group.C,
        pool: 1,
        confederation: Confederation.CONMEBOL,
        age: 27.9,
        points: teamsToPointsMap.get("argentina")
    },
    {
        keyId: "france",
        name: "France",
        matches: teamsToMatchesMap.get("france"),
        fifaRanking: 4,
        wcRanking: 4,
        rankingPoints: 1759.78,
        group: Group.D,
        pool: 1,
        confederation: Confederation.UEFA,
        age: 26.5,
        points: teamsToPointsMap.get("france")
    },
    {
        keyId: "england",
        name: "England",
        matches: teamsToMatchesMap.get("england"),
        fifaRanking: 5,
        wcRanking: 5,
        rankingPoints: 1728.47,
        group: Group.B,
        pool: 1,
        confederation: Confederation.UEFA,
        age: 26.4,
        points: teamsToPointsMap.get("england")
    },
    {
        keyId: "spain",
        name: "Spain",
        matches: teamsToMatchesMap.get("spain"),
        fifaRanking: 7,
        wcRanking: 6,
        rankingPoints: 1715.22,
        group: Group.E,
        pool: 1,
        confederation: Confederation.UEFA,
        age: 25.6,
        points: teamsToPointsMap.get("spain")
    },
    {
        keyId: "netherlands",
        name: "Netherlands",
        matches: teamsToMatchesMap.get("netherlands"),
        fifaRanking: 8,
        wcRanking: 7,
        rankingPoints: 1694.51,
        group: Group.A,
        pool: 2,
        confederation: Confederation.UEFA,
        age: 26.6,
        points: teamsToPointsMap.get("netherlands")
    },
    {
        keyId: "portugal",
        name: "Portugal",
        matches: teamsToMatchesMap.get("portugal"),
        fifaRanking: 9,
        wcRanking: 8,
        rankingPoints: 1676.56,
        group: Group.H,
        pool: 2,
        confederation: Confederation.UEFA,
        age: 26.8,
        points: teamsToPointsMap.get("portugal")
    },
    {
        keyId: "denmark",
        name: "Denmark",
        matches: teamsToMatchesMap.get("denmark"),
        fifaRanking: 10,
        wcRanking: 9,
        rankingPoints: 1666.57,
        group: Group.D,
        pool: 2,
        confederation: Confederation.UEFA,
        age: 27.2,
        points: teamsToPointsMap.get("denmark")
    },
    {
        keyId: "germany",
        name: "Germany",
        matches: teamsToMatchesMap.get("germany"),
        fifaRanking: 11,
        wcRanking: 10,
        rankingPoints: 1650.21,
        group: Group.E,
        pool: 2,
        confederation: Confederation.UEFA,
        age: 26.7,
        points: teamsToPointsMap.get("germany")
    },
    {
        keyId: "croatia",
        name: "Croatia",
        matches: teamsToMatchesMap.get("croatia"),
        fifaRanking: 12,
        wcRanking: 11,
        rankingPoints: 1645.64,
        group: Group.F,
        pool: 2,
        confederation: Confederation.UEFA,
        age: 27.4,
        points: teamsToPointsMap.get("croatia")
    },
    {
        keyId: "mexico",
        name: "Mexico",
        matches: teamsToMatchesMap.get("mexico"),
        fifaRanking: 13,
        wcRanking: 12,
        rankingPoints: 1644.69,
        group: Group.C,
        pool: 2,
        confederation: Confederation.CONCACAF,
        age: 28.5,
        points: teamsToPointsMap.get("mexico")
    },
    {
        keyId: "uruguay",
        name: "Uruguay",
        matches: teamsToMatchesMap.get("uruguay"),
        fifaRanking: 14,
        wcRanking: 13,
        rankingPoints: 1638.71,
        group: Group.H,
        pool: 3,
        confederation: Confederation.CONMEBOL,
        age: 27.8,
        points: teamsToPointsMap.get("uruguay")
    },
    {
        keyId: "switzerland",
        name: "Switzerland",
        matches: teamsToMatchesMap.get("switzerland"),
        fifaRanking: 15,
        wcRanking: 14,
        rankingPoints: 1635.92,
        group: Group.G,
        pool: 3,
        confederation: Confederation.UEFA,
        age: 27,
        points: teamsToPointsMap.get("switzerlands")
    },
    {
        keyId: "usa",
        name: "USA",
        matches: teamsToMatchesMap.get("usa"),
        fifaRanking: 16,
        wcRanking: 15,
        rankingPoints: 1627.48,
        group: Group.B,
        pool: 3,
        confederation: Confederation.CONCACAF,
        age: 25.2,
        points: teamsToPointsMap.get("usa")
    },
    {
        keyId: "senegal",
        name: "Senegal",
        matches: teamsToMatchesMap.get("senegal"),
        fifaRanking: 18,
        wcRanking: 16,
        rankingPoints: 1584.38,
        group: Group.A,
        pool: 3,
        confederation: Confederation.CAF,
        age: 26.3,
        points: teamsToPointsMap.get("senegal")
    },
    {
        keyId: "wales",
        name: "Wales",
        matches: teamsToMatchesMap.get("wales"),
        fifaRanking: 19,
        wcRanking: 17,
        rankingPoints: 1569.82,
        group: Group.B,
        pool: 3,
        confederation: Confederation.UEFA,
        age: 26.4,
        points: teamsToPointsMap.get("wales")
    },
    {
        keyId: "iran",
        name: "Iran",
        matches: teamsToMatchesMap.get("iran"),
        fifaRanking: 20,
        wcRanking: 18,
        rankingPoints: 1564.61,
        group: Group.B,
        pool: 3,
        confederation: Confederation.AFC,
        age: 28.9,
        points: teamsToPointsMap.get("iran")
    },
    {
        keyId: "serbia",
        name: "Serbia",
        matches: teamsToMatchesMap.get("serbia"),
        fifaRanking: 21,
        wcRanking: 19,
        rankingPoints: 1563.62,
        group: Group.G,
        pool: 4,
        confederation: Confederation.UEFA,
        age: 26.8,
        points: teamsToPointsMap.get("serbia")
    },
    {
        keyId: "morocco",
        name: "Morocco",
        matches: teamsToMatchesMap.get("morocco"),
        fifaRanking: 22,
        wcRanking: 20,
        rankingPoints: 1563.5,
        group: Group.F,
        pool: 4,
        confederation: Confederation.CAF,
        age: 26.2,
        points: teamsToPointsMap.get("morocco")
    },
    {
        keyId: "japan",
        name: "Japan",
        matches: teamsToMatchesMap.get("japan"),
        fifaRanking: 24,
        wcRanking: 21,
        rankingPoints: 1559.54,
        group: Group.E,
        pool: 4,
        confederation: Confederation.AFC,
        age: 27.8,
        points: teamsToPointsMap.get("japan")
    },
    {
        keyId: "poland",
        name: "Poland",
        matches: teamsToMatchesMap.get("poland"),
        fifaRanking: 26,
        wcRanking: 22,
        rankingPoints: 1548.59,
        group: Group.C,
        pool: 4,
        confederation: Confederation.UEFA,
        age: 27,
        points: teamsToPointsMap.get("poland")
    },
    {
        keyId: "south_korea",
        name: "South Korea",
        matches: teamsToMatchesMap.get("south_korea"),
        fifaRanking: 28,
        wcRanking: 23,
        rankingPoints: 1530.3,
        group: Group.H,
        pool: 4,
        confederation: Confederation.AFC,
        age: 27.8,
        points: teamsToPointsMap.get("south_korea")
    },
    {
        keyId: "tunisia",
        name: "Tunisia",
        matches: teamsToMatchesMap.get("tunisia"),
        fifaRanking: 30,
        wcRanking: 24,
        rankingPoints: 1507.54,
        group: Group.D,
        pool: 4,
        confederation: Confederation.CAF,
        age: 27.8,
        points: teamsToPointsMap.get("tunisia")
    },
    {
        keyId: "costa_rica",
        name: "Costa Rica",
        matches: teamsToMatchesMap.get("costa_rica"),
        fifaRanking: 31,
        wcRanking: 25,
        rankingPoints: 1503.59,
        group: Group.E,
        pool: 4,
        confederation: Confederation.CONCACAF,
        age: 27.2,
        points: teamsToPointsMap.get("costa_rica")
    },
    {
        keyId: "australia",
        name: "Australia",
        matches: teamsToMatchesMap.get("australia"),
        fifaRanking: 38,
        wcRanking: 26,
        rankingPoints: 1488.72,
        group: Group.D,
        pool: 5,
        confederation: Confederation.OFC,
        age: 27.5,
        points: teamsToPointsMap.get("australia")
    },
    {
        keyId: "canada",
        name: "Canada",
        matches: teamsToMatchesMap.get("canada"),
        fifaRanking: 41,
        wcRanking: 27,
        rankingPoints: 1475,
        group: Group.F,
        pool: 5,
        confederation: Confederation.CONCACAF,
        age: 26.9,
        points: teamsToPointsMap.get("canada")
    },
    {
        keyId: "cameroon",
        name: "Cameroon",
        matches: teamsToMatchesMap.get("cameroon"),
        fifaRanking: 43,
        wcRanking: 28,
        rankingPoints: 1471.44,
        group: Group.G,
        pool: 5,
        confederation: Confederation.CAF,
        age: 26.3,
        points: teamsToPointsMap.get("cameroon")
    },
    {
        keyId: "ecuador",
        name: "Ecuador",
        matches: teamsToMatchesMap.get("ecuador"),
        fifaRanking: 44,
        wcRanking: 29,
        rankingPoints: 1464.39,
        group: Group.A,
        pool: 5,
        confederation: Confederation.CONMEBOL,
        age: 25.6,
        points: teamsToPointsMap.get("ecuador")
    },
    {
        keyId: "qatar",
        name: "Qatar",
        matches: teamsToMatchesMap.get("qatar"),
        fifaRanking: 50,
        wcRanking: 30,
        rankingPoints: 1439.89,
        group: Group.A,
        pool: 5,
        confederation: Confederation.AFC,
        age: 26.9,
        points: teamsToPointsMap.get("qatar")
    },
    {
        keyId: "saudi_arabia",
        name: "Saudi Arabia",
        matches: teamsToMatchesMap.get("saudi_arabia"),
        fifaRanking: 51,
        wcRanking: 31,
        rankingPoints: 1437.78,
        group: Group.C,
        pool: 5,
        confederation: Confederation.AFC,
        age: 27.3,
        points: teamsToPointsMap.get("saudi_arabia")
    },
    {
        keyId: "ghana",
        name: "Ghana",
        matches: teamsToMatchesMap.get("ghana"),
        fifaRanking: 61,
        wcRanking: 32,
        rankingPoints: 1393,
        group: Group.H,
        pool: 5,
        confederation: Confederation.CAF,
        age: 24.7,
        points: teamsToPointsMap.get("ghana")
    },

]

export const teamsMap: Map<string, ITeam> = new Map<string, ITeam>();
for (let i in teams) {
  const team = teams[i];
  teamsMap.set(team.keyId, team);
}
