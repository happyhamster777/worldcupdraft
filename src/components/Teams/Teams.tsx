import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { teams } from '../../data';
import { Confederation, filterState, Group, groupState, IFilter, ISort, ITeam, sortingState, updateState } from '../../global';
import { CardGroup } from '../CardGroup';
import { TeamCard } from '../TeamCard';
import './Teams.scss';

export const Teams = () => {

  const [filterMap, setFilterMap] = useRecoilState<Map<string, IFilter>>(filterState);
  const [sorting, setSorting] = useRecoilState<ISort>(sortingState);
  const [group, setGroup] = useRecoilState<string>(groupState);

  const [update, setUpdate] = useRecoilState<boolean>(updateState);

  const getTeamCards = () => {
    let teamsList = teams;

    if (sorting) {
      teamsList = teams.sort(sorting.sort);
    }

    const filteredList:ITeam[] = [];
    teamsList.forEach((team) => {
      let alreadyAdded = false;
      filterMap.forEach((value) => {
        if(value.filter(team) && !alreadyAdded){
          filteredList.push(team);
          alreadyAdded = true;
        }
      })
    })

    switch(group) {
      case 'group':
        return Object.values(Group).map((group) => {
            return <CardGroup title={group}>
              {filteredList.map((team) => {
                if(team.group === group) return <TeamCard {...team}/>
                else return null
              })}
            </CardGroup>
          })
      case 'confederation':
        return Object.values(Confederation).map((confed) => {
          return <CardGroup title={confed}>
            {filteredList.map((team) => {
              if(team.confederation === confed) return <TeamCard {...team}/>
              else return null
            })}
          </CardGroup>
        })
      case 'pool':
        let groups:JSX.Element[] = [];
        for (let i = 0; i < 5; i++) {
          groups.push( <CardGroup title={"Pool " + (i+1)}>
              {filteredList.map((team) => {
                if(team.pool === i + 1) return <TeamCard {...team}/>
                else return null
              })}
            </CardGroup>)
        }
        return groups;
    }

    return filteredList.map((team) => {
      return <TeamCard {...team}/>
    })
  }

  return (
    <div className="teams-container">
      {getTeamCards()}
    </div>
  );
}
