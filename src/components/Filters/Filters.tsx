import { FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, FormGroup, Checkbox, FormHelperText } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { Confederation, filterState, Group, groupState, IFilter, ISort, ITeam, sortingState, updateState } from '../../global';
import { Button } from '../Button';
import './Filters.scss';
import { filterConfederation, filterGroup } from './FilterUtils';
import { sortByAge, sortByFifaRanking, sortByPoints } from './SortingUtils';

export const Filters = () => {

  const [filterMap, setFilterMap] = useRecoilState<Map<string, IFilter>>(filterState);
  const [sorting, setSorting] = useRecoilState<ISort>(sortingState);
  const [group, setGroup] = useRecoilState<string>(groupState);
  const [update, setUpdate] = useRecoilState<boolean>(updateState);
        
  const resetSorting = useResetRecoilState(sortingState);
  const resetGroup = useResetRecoilState(groupState);


  const handleChangeConfedFilters = (filterKey: string, alwaysAll?: boolean) => {
    let filterMethod: (team: ITeam) => boolean = () => true;
    if (filterKey === 'allConfeds') {
      if (hasAllGroupFilters() && !alwaysAll) {
        Object.values(Confederation).forEach((confed) => {
          filterMap.delete(confed);
          setUpdate(!update);
        })
      } else {
        Object.values(Confederation).forEach((confed) => {
          filterMethod = (team: ITeam) => filterConfederation(team, confed);
          filterMap.set(confed, {
            key: confed,
            filter: filterMethod
          })
          setFilterMap(filterMap);
          setUpdate(!update);
        })
      }
      return;
    }
    if (Object.values(Confederation).includes(filterKey as Confederation)) {
      filterMethod = (team: ITeam) => filterConfederation(team, filterKey as Confederation);
    } 

    if (filterMap.has(filterKey)) {
      filterMap.delete(filterKey);
      setUpdate(!update);
      return;
    }

    filterMap.set(filterKey, {
      key: filterKey,
      filter: filterMethod
    })
    setFilterMap(filterMap);
    setUpdate(!update);
  }
  
  const handleChangeGroupFilters = (filterKey: string, alwaysAll?: boolean) => {
    let filterMethod: (team: ITeam) => boolean = () => true;
    if (filterKey === 'allGroups') {
      if (hasAllGroupFilters() && !alwaysAll) {
        Object.values(Group).forEach((group) => {
          filterMap.delete(group);
          setUpdate(!update);
        })
      } else {
        Object.values(Group).forEach((group) => {
          filterMethod = (team: ITeam) => filterGroup(team, group);
          filterMap.set(group, {
            key: group,
            filter: filterMethod
          })
          setFilterMap(filterMap);
          setUpdate(!update);
        })
      }
      return;
    }
    if (Object.values(Group).includes(filterKey as Group)) {
      filterMethod = (team: ITeam) => filterGroup(team, filterKey as Group);
    } 

    if (filterMap.has(filterKey)) {
      filterMap.delete(filterKey);
      setUpdate(!update);
      return;
    }

    filterMap.set(filterKey, {
      key: filterKey,
      filter: filterMethod
    })
    setFilterMap(filterMap);
    setUpdate(!update);
  }

  const handleChangeSorting = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSorting = e.target.value;
    let sortingMethod: (teamA: ITeam, teamB: ITeam) => number = sortByFifaRanking;
    switch(newSorting){
      case "fifaRanking":
        sortingMethod = sortByFifaRanking;
        break;
      case "age":
        sortingMethod = sortByAge;
        break;
      case "points":
        sortingMethod = sortByPoints;
        break;
      default:
        sortingMethod = sortByFifaRanking;
    }
    if (sorting && sorting.key === newSorting) setSorting({ key: '', sort: sortingMethod});
    else setSorting({
      key: newSorting,
      sort: sortingMethod
    })
  }

  const handleChangeGrouping = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newGrouping = e.target.value;
    if (group === newGrouping) setGroup('');
    else setGroup(newGrouping);
  }

  const getGroupFilters = () => {
    return <div style={{marginLeft: 10}}>
      {Object.values(Group).map((group) => {
        return <FormControlLabel
        control={
          <Checkbox checked={filterMap.has(group)} onChange={() => handleChangeGroupFilters(group)} name={group} />
        }
        label={group}
        />
      })}
    </div>
  }

  const getConfederationFilters = () => {
    return <div style={{marginLeft: 10}}>
      {Object.values(Confederation).map((confed) => {
        return <FormControlLabel
        control={
          <Checkbox checked={filterMap.has(confed)} onChange={() => handleChangeConfedFilters(confed)} name={confed} />
        }
        label={confed}
        />
      })}
    </div>
  }

  const hasAllGroupFilters = (): boolean => {
    for (let i = 0; i < Object.values(Group).length; i++) {
      if (!filterMap.has(Object.values(Group)[i])) return false;
    }
    return true;
  }

  const hasNoGroupFilters = (): boolean => {
    for (let i = 0; i < Object.values(Group).length; i++) {
      if (filterMap.has(Object.values(Group)[i])) return false;
    }
    return true;
  }

  const hasAllConfederationFilters = (): boolean => {
    for (let i = 0; i < Object.values(Confederation).length; i++) {
      if (!filterMap.has(Object.values(Confederation)[i])) return false;
    }
    return true;
  }

  const hasNoConfederationFilters = (): boolean => {
    for (let i = 0; i < Object.values(Confederation).length; i++) {
      if (filterMap.has(Object.values(Confederation)[i])) return false;
    }
    return true;
  }


  return (
    <div className="filters-container">
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">Sort By</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={sorting ? sorting.key : 'fifaRanking'}
          onChange={handleChangeSorting}
        >
          <FormControlLabel value="fifaRanking" control={<Radio />} label="FIFA Ranking" />
          <FormControlLabel value="age" control={<Radio />} label="Average Age" />
          <FormControlLabel value="points" control={<Radio />} label="Points" />
        </RadioGroup>
        <FormLabel id="demo-controlled-radio-buttons-group">Group By</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={group}
          onChange={handleChangeGrouping}
        >
          <FormControlLabel value="pool" control={<Radio />} label="Pool" />
          <FormControlLabel value="group" control={<Radio />} label="Group" />
          <FormControlLabel value="confederation" control={<Radio />} label="Confederation" />
          <FormControlLabel value="" control={<Radio />} label="No Grouping" />
        </RadioGroup>
        <FormLabel component="legend">Filter</FormLabel>
        <FormGroup>
          <FormControlLabel
              label="Groups"
              control={
                <Checkbox
                  checked={hasAllGroupFilters()}
                  indeterminate={!hasAllGroupFilters() && !hasNoGroupFilters()}
                  onChange={() => handleChangeGroupFilters('allGroups')}
                />
              }
          />
          {getGroupFilters()}
        </FormGroup>
        {/* <FormGroup>
          <FormControlLabel
              label="Confederations"
              control={
                <Checkbox
                  checked={hasAllConfederationFilters()}
                  indeterminate={!hasAllConfederationFilters() && !hasNoConfederationFilters()}
                  onChange={() => handleChangeConfedFilters('allConfeds')}
                />
              }
          />
          {getConfederationFilters()}
        </FormGroup> */}
      </FormControl>
      <Button color={'#1976d2'} onClick={() => {
        handleChangeGroupFilters('allGroups', true)
        handleChangeConfedFilters('allConfeds', true)
        resetGroup();
        resetSorting();
        setUpdate(!update);
      }}>
        Reset
      </Button>
    </div>
  );
}
