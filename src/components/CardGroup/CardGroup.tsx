import React from 'react';
import { getPoolColor, Group } from '../../global';
import './CardGroup.scss';

export interface ICardGroup {
  title: string,
  children: any
}

export const CardGroup = (props: ICardGroup) => {
  const { children, title } = props;
  let color = undefined;
  if (title.includes("Pool")) {
    color = getPoolColor(Number(title[5]))
  }

  return (
    <div className="cardGroup-container">
      <div className="cardGroup-title" style={{color: color}}>{title}</div>
      <div className="item-container">{children}</div>
    </div>
  );
}
