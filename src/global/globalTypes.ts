export interface IUser {
    name: string,
    group?: DraftGroup,
    teams: ITeam[]
}

export enum Group {
    A = "Group A",
    B = "Group B",
    C = "Group C",
    D = "Group D",
    E = "Group E",
    F = "Group F",
    G = "Group G",
    H = "Group H"
}

/**
$qatar-pink: #a10953;
$qatar-skyBlue: #49BCE3;
$qatar-yellow: #FEC310;
$qatar-violet: #6969B3;
$qatar-green: #4B644A;
 */
export enum Color {
    QATAR_BLUE = "#1b1b27",
    QATER_SKYBLUE = "#49BCE3",
    QATAR_YELLOW = "#FEC310",
    QATAR_SCARLET = "#56042C",
    QATAR_PINK = "#a10953",
    QATAR_VIOLET = "#6969B3",
    QATAR_GREEN = "#4B644A"
}

export enum Page {
    TEAMS = "teamSelector",
    RULES = "rules",
    LEADERBOARD = "leaderboard"
}

export enum DraftGroup {
    OPEN = "Everyone",
    BMCS = "BMCS",
    _119 = "HOPE ST+",
    CASA = "CASA",
    LINDIES = "Lindies",
    GOBLINS = "Goblins"

}

export enum Confederation {
    AFC = "AFC",
    CAF = "CAF",
    CONCACAF = "CONCACAF",
    CONMEBOL = "CONMEBOL",
    OFC = "OFC",
    UEFA = "UEFA",
}

export interface ITeam {
    keyId: string,
    name: string,
    matches?: IMatch[],
    fifaRanking: number,
    wcRanking: number,
    rankingPoints: number,
    group: Group,
    pool: number,
    confederation: Confederation,
    age: number,
    points?: number
}

export interface IMatch {
    homeTeam: string,
    awayTeam: string,
    homeTeamScore: null | number,
    awayTeamScore: null | number,
    date: Date,
    location: string,
    matchNumber: number,
    roundNumber: number,
    group?: Group,
}

export interface IFilter {
    key: string,
    filter: (team: ITeam) => boolean
}

export interface ISort {
    key: string,
    sort: (teamA: ITeam, teamB: ITeam) => number
}

export enum GroupByKey {
    Group = "group",
    Pool = "pool"
}