import React from 'react';
import { IMatch } from '../../global';
import './MatchInfo.scss';

export const MatchInfo = (match: IMatch) => {
  return (
    <div className="matchInfo-container">
      {match.homeTeam}-{match.awayTeam}
      {match.location}
    </div>
  );
}
