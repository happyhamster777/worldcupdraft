import { useRecoilState } from 'recoil';
import { getPoolColor, ITeam, myTeamsState, updateState } from '../../global';
import Popover from '@mui/material/Popover';
import './TeamCard.scss';
import { MatchInfo } from '../MatchInfo';
import { useState } from 'react';
import { teamsToPointsMap } from '../../data';
import { Button } from '../Button';

export const TeamCard = (team: ITeam) => {
  const [myTeams, setMyTeams] = useRecoilState<Map<number, any>>(myTeamsState);
  const [update, setUpdate] = useRecoilState<boolean>(updateState);


  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  let flag = team.name;
  if (team.name === "South Korea"){
    flag = "KOR"
  }

  return (
    <div className="teamCard-container" 
    style={{border: `solid 5px ${getPoolColor(team.pool)}`,
      opacity: myTeams.has(team.pool) && myTeams.get(team.pool).keyId !== team.keyId ? 0.6 : 1
    }}
    onClick={() => {
      myTeams.set(team.pool, team)
      setMyTeams(myTeams)
      setUpdate(!update)
    }}>
      <div className="add-remove">
        <Button onClick={(e: React.PointerEvent) => {
          e.stopPropagation();
          e.preventDefault();
          if (myTeams.has(team.pool) && myTeams.get(team.pool).keyId === team.keyId) {
            console.log('delete')
            myTeams.delete(team.pool)
            setMyTeams(myTeams)
            setUpdate(!update)
            return
          } else {
            myTeams.set(team.pool, team)
            setMyTeams(myTeams)
            setUpdate(!update)
          }
        }}
        color={getPoolColor(team.pool)}
        >
          {myTeams.has(team.pool) ? myTeams.get(team.pool).keyId === team.keyId ? "Remove" : "Replace" : "Add"}
        </Button>
      </div>
      <div className="points" style={{color: getPoolColor(team.pool)}}>{teamsToPointsMap.get(team.keyId)} <span className="pts">pts</span></div>
      <img className="card-image" src={`https://countryflagsapi.com/png/${flag}`} alt={`Flag of ${team.name}`}></img>
      <div className="card-info">
      <div className="name">
        {team.name}
        <span className="ranking" style={{background: getPoolColor(team.pool)}}>{team.fifaRanking}</span>
      </div>
      <div className="fixtures-container">
          {team.matches && team.matches.map((match) => {
            let opp;
            if (match.homeTeam === team.keyId){
              opp = match.awayTeam;
            } else {
              opp = match.homeTeam;
            }
            switch(opp) {
              case "south_korea":
                opp = "KOR";
                break;
              case "saudi_arabia":
                opp = "Saudi Arabia";
                break;
              case "costa_rica":
                opp = "Costa Rica";
                break;
            }
            return <div>
              <img onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        className="fixtureImage" src={`https://countryflagsapi.com/png/${opp}`} alt={`Flag of ${opp}`}></img>
              <Popover
                id={`mouse-over-popover-${match.date}`}
                sx={{
                  pointerEvents: 'none',
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
              >
                <MatchInfo {...match}/>
              </Popover>
            </div>
          })}
        </div>
        <div style={{
          display: 'flex',
          gap: '5px'
        }}>
        <span className="group">{team.group}</span>
        </div>
        <div className="age">Average Age: <span style={{fontWeight: 600}}>{team.age}</span></div>
      </div>
    </div>
  );
}
