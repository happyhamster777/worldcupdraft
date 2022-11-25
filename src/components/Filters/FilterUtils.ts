import { Confederation, Group, ITeam } from "../../global";

export const filterGroup = (team: ITeam, group: Group) => {
    if (team.group === group) return true;
    else return false;
}

export const filterConfederation = (team: ITeam, confederation: Confederation) => {
    if (team.confederation === confederation) {
        console.log(confederation);
        return true
    } else return false;
}