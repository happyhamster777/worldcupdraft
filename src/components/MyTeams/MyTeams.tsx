import { InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Color, DraftGroup, draftGroupState, getPoolColor, ITeam, IUser, leaderboardState, myTeamsState, Page, pageState, updateState } from '../../global';
import { createUser } from '../../serverGateway';
import { Button } from '../Button';
import './MyTeams.scss';

export const MyTeams = () => {

  const [myTeams, setMyTeams] = useRecoilState<Map<number, any>>(myTeamsState);
  const [update, setUpdate] = useRecoilState<boolean>(updateState);
  const [list, setList] = useRecoilState<IUser[]>(leaderboardState);
  const [page, setPage] = useRecoilState<Page>(pageState);
  const [group, setGroup] = useRecoilState<DraftGroup>(draftGroupState);

  const getItems = () => {
    const items: JSX.Element[] = [];
    for (let i = 0; i < 5; i++) {
      if (!myTeams.has(i+1)) {
        items.push(
          <div style={{border: `solid 2px ${getPoolColor(i+1)}`, color: getPoolColor(i+1)}} key={i} className={'item-container'}>Pool {i+1}</div>
        )
      } else {
        const team = myTeams.get(i+1);
        let flag = team.name;
        if (team.name === "South Korea"){
          flag = "KOR"
        }
        items.push(
          <div style={{border: `solid 2px ${getPoolColor(i+1)}`}} key={i} className={'item-container'}>
            <img className="card-image" src={`https://countryflagsapi.com/png/${flag}`} alt={`Flag of ${team.name}`}></img>
          </div>
        )
      }
    }
    return items;
  }

  const onClick = (page: Page) => {
    setPage(page);
  }

  const onSubmit = () => {
    console.log(myTeams)
    const teams:ITeam[] = [];
    myTeams.forEach((team) => {
      teams.push(team)
    })
    createUser({
      name: name,
      group: group,
      teams: teams
    })
    setTimeout(()=>{
      setPage(Page.LEADERBOARD)
    }, 100)
  }

  const [name, setName] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const hasAllTeams = ():boolean => {
    for (let i = 0; i < 5; i++) {
      if (!myTeams.has(i+1)) {
        return false;
      }
    }
    return true;
  }

  const nameExists = ():boolean => {
    for (let i = 0; i < list.length; i++) {
      if ((list[i].group === group && list[i].group !== undefined) && list[i].name === name) return true;
    }
    return false;
  }


  const handleChangeDraftGroup = (event: SelectChangeEvent) => {
    setGroup(event.target.value as DraftGroup);
  }

  return (
    <div className="myTeams-container">
      <div className="myTeams-tabs">
        <Button active={page === Page.RULES} onClick={() => onClick(Page.RULES)}>Rules</Button>
        <Button active={page === Page.TEAMS} onClick={() => onClick(Page.TEAMS)}>Team Selector</Button>
        <Button active={page === Page.LEADERBOARD} onClick={() =>onClick(Page.LEADERBOARD)}>Leaderboard</Button>
      </div>
      <div className="myTeams-items">
        {getItems()}
      </div>
      <div className="myTeams-submit">
        <Select
          size="small"
          labelId="simple-select-label"
          id="simple-select"
          value={group}
          label="Group"
          onChange={handleChangeDraftGroup}
        >
          <MenuItem value={DraftGroup.OPEN}>Everyone</MenuItem>
          <MenuItem value={DraftGroup.BMCS}>BMCS</MenuItem>
          <MenuItem value={DraftGroup._119}>Hope St+</MenuItem>
          <MenuItem value={DraftGroup.CASA}>CASA</MenuItem>
          <MenuItem value={DraftGroup.GOBLINS}>Goblins</MenuItem>
          <MenuItem value={DraftGroup.LINDIES}>Lindies</MenuItem>
        </Select>
        <TextField style={{borderColor: Color.QATAR_SCARLET}} error={nameExists()} id="outlined-basic" label="Name" variant="outlined" size="small" onChange={handleChange} helperText={nameExists() ? "Name already exists in that group" : undefined}/>
        <Button inactive={name === '' || !hasAllTeams() || nameExists()} onClick={() => {
          if(name !== '' && hasAllTeams() && !nameExists()) onSubmit()
        }}>Submit</Button>
      </div>
    </div>
  );
}
