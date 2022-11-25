import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import './App.scss';
import { Button, Filters, Header, Leaderboard, Teams } from './components';
import { MyTeams } from './components/MyTeams';
import { pageState } from './global';
import { Page } from './global/globalTypes';


function App() {

  const [page, setPage] = useRecoilState<Page>(pageState)

  const getPage = ():JSX.Element => {
    switch(page) {
      case Page.LEADERBOARD:
        return <div className="leaderboard-page">
          <Leaderboard/>
        </div>
      case Page.RULES:
        return <div className="rules-page">
          <body>
          <h3>Overview</h3>
          In this draft you choose 5 teams, one team from each pool. The pools are made based on FIFA Rankings, Pool 1 consists of the top 6 teams etc. Once you have selected your 5 teams, they will earn points in each round as follows:
          <h3>Group Games</h3>
          <ul>
            <li>3 points for a win</li>
            <li>1 point for a draw</li>
            <li>0 point for loss</li>
            <li>1 point for goal for</li>
            <li>-1 point for goal against</li>
            <li>1 point for clean sheet</li>
          </ul>

          <h3>Group stages</h3>
          <ul>
            <li>7 points for winning the group</li>
            <li>5 points for second</li>
            <li>3 points for third</li>
          </ul>

          <h3>Round of 16</h3>
          <ul>
            <li>10 points for advancing past this round</li>
          </ul>

          <h3>Round of 8</h3>
          <ul>
            <li>10 points for advancing past this round</li>
          </ul>

          <h3>Semis</h3>
          <ul>
            <li>10 points for advancing past this round</li>
          </ul>

          <h3>Finals</h3>
          <ul>
            <li>20 points for winning the World Cup</li>
          </ul>
          </body>
          <div className="button">
            <Button onClick={() => setPage(Page.TEAMS)}>Go to team selector</Button>
          </div>
        </div>
      default:
        return (
        <div className="teams-page">
          <Teams/>
          <Filters/>
        </div>
        )
    }
  }

  return (
      <div className="app-container">
        <Header/>
        <MyTeams/>
        {getPage()}
      </div>
  );
}

export default App;
