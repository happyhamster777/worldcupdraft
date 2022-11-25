import { atom } from "recoil";
import { filterConfederation, filterGroup } from "../components/Filters/FilterUtils";
import { Confederation, DraftGroup, Group, IFilter, ISort, ITeam, IUser, Page } from "./globalTypes";

export const myTeamsState = atom<Map<number, any>>({
    key: 'myTeamsState',
    default: new Map<number, any>(),
});

export const leaderboardState = atom<IUser[]>({
  key: 'leaderboardState',
  default: [],
});

export const pageState = atom<Page>({
  key: 'pageState',
  default: Page.RULES,
});

export const draftGroupState = atom<DraftGroup>({
  key: 'draftGroupState',
  default: DraftGroup.OPEN,
});


export const updateState = atom<boolean>({
  key: 'updateState',
  default: false,
});

const getFilterGroup = (key: string):{key: string, filter: IFilter} => {
  const filterMethod = (team: ITeam) => filterGroup(team, key as Group);
  const filter:IFilter = {
    key: key,
    filter: filterMethod
  }
  return {key, filter};
}

const getFilterConfederation = (key: string):{key: string, filter: IFilter} => {
  const filterMethod = (team: ITeam) => filterConfederation(team, key as Confederation);
  const filter:IFilter = {
    key: key,
    filter: filterMethod
  }
  return {key, filter};
}

export const filterState = atom<Map<string, IFilter>>({
  key: 'filterState',
  default: new Map<string, IFilter>(
    [
      [getFilterGroup(Group.A).key, getFilterGroup(Group.A).filter],
      [getFilterGroup(Group.B).key, getFilterGroup(Group.B).filter],
      [getFilterGroup(Group.C).key, getFilterGroup(Group.C).filter],
      [getFilterGroup(Group.D).key, getFilterGroup(Group.D).filter],
      [getFilterGroup(Group.E).key, getFilterGroup(Group.E).filter],
      [getFilterGroup(Group.F).key, getFilterGroup(Group.F).filter],
      [getFilterGroup(Group.G).key, getFilterGroup(Group.G).filter],
      [getFilterGroup(Group.H).key, getFilterGroup(Group.H).filter],
    ],
  ),
});

export const sortingState = atom<ISort>({
  key: 'sortingState',
  default: undefined,
});

export const groupState = atom<string>({
  key: 'groupState',
  default: 'pool',
});
  
export const userState = atom<IUser>({
    key: 'user', // unique ID (with respect to other atoms/selectors)
    default: undefined, // default value (aka initial value)
});