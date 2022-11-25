import React from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../../global';
import { IUser } from '../../global/globalTypes';
import { Button } from '../Button';
import { Countdown } from '../Countdown';
import './Header.scss';

export const Header = () => {

  const [user, setUser] = useRecoilState<IUser>(userState);

  const getHeaderLeft = () => {
    return <div className="header-left">
      <div className="title">World Cup Draft</div>
    </div>
  }

  const getHeaderCenter = () => {
    return <div className="header-center">
      {/* <Countdown/> */}
    </div>
  }

  const getHeaderRight = () => {
    return <div className="header-right">
    </div>
  }

  return (
    <div className="header-container">
      {getHeaderLeft()}
      {getHeaderCenter()}
      {getHeaderRight()}
    </div>
  );
}
