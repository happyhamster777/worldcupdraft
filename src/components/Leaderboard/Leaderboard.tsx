import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { teamsMap, teamsToPointsMap } from '../../data';
import { DraftGroup, draftGroupState, ITeam, IUser, leaderboardState } from '../../global';
import { fetchUsers } from '../../serverGateway';
import './Leaderboard.scss';

export const Leaderboard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [list, setList] = useRecoilState<IUser[]>(leaderboardState);
  const [group, setGroup] = useRecoilState<DraftGroup>(draftGroupState);

  useEffect(() => {
    const getUsers = async () => {
      const users = await fetchUsers();
      if (Array.isArray(users)){
        setList(users)
      }
    };
    getUsers();
    setIsLoading(false);
  },[list, setList])

  const getList = () => {
    const filteredList:IUser[] = [];
    list.forEach((user) => {
      if(user.group === group || group === DraftGroup.OPEN) filteredList.push(user)
    })

    const sortedList = filteredList.sort((userA: IUser, userB: IUser) => {
      let userAPoints: number = 0;
      let userBPoints: number = 0;
      const aTeamsList:ITeam[] = [...userA.teams]
      const bTeamsList:ITeam[] = [...userB.teams]
      for (let i = 0; i < 5; i++) {
        const teamA = teamsToPointsMap.get(aTeamsList[i].keyId);
        const teamB = teamsToPointsMap.get(bTeamsList[i].keyId);
        const teamAPoints: number = teamA ? teamA : 0;
        const teamBPoints: number = teamB ?  teamB : 0;
        userAPoints += teamAPoints;
        userBPoints += teamBPoints;
      }
      return userBPoints - userAPoints;
    })

    return sortedList.map((user, ind) => {
      const teams = [];
      let userPoints: number = 0;
      const teamsList:ITeam[] = [...user.teams]
      teamsList.sort((teamA: ITeam, teamB: ITeam) => {
        return teamA.fifaRanking - teamB.fifaRanking
      })
      for (let i = 0; i < 5; i++) {
        const team = teamsMap.get(teamsList[i].keyId);
        if (team) {
          const points = teamsToPointsMap.get(team.keyId)
          const teamPoints: number = points ? points : 0;
          userPoints += teamPoints;
          let flag = team.name;
          if (team.name === "South Korea"){
            flag = "KOR"
          }
          teams.push(<div className="flag">
            <div className="team-points">{teamPoints}</div>
            <img className="card-image" src={`https://countryflagsapi.com/png/${flag}`} alt={`Flag of ${team.name}`}></img>
          </div>)
        } 
      }
      let userGroup = user.group;
      if (user.group === undefined) userGroup = DraftGroup.OPEN;
      return <div className="leaderboard-item">
        <div className={'rank'}>{ind + 1}.</div>
        <div className={'points'}>{userPoints} pts</div>
        <div className={'name'}>
          {user.name}
          <div className={'group'}>{userGroup}</div>
        </div>
        <div className={'teams'}>{teams}</div>
      </div>
    })
  }
  
  return (
    <div className="leaderboard">
      <h2 style={{textAlign: 'center', width: '100%'}}>{group}</h2>
      <div className="leaderboard-container">
        {isLoading ? <CircularProgress color="secondary" /> : getList()}
      </div>
    </div>
  );
}
