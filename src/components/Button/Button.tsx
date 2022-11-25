import React from 'react';
import { Color } from '../../global';
import './Button.scss';

export interface IButtonProps {
  children: any;
  onClick: any;
  active?: boolean;
  inactive?: boolean;
  color?: string;
}

export const Button = (props: IButtonProps) => {
  const { children, onClick, active, inactive, color } = props;
  return (
    <div onClick={onClick} style={{border: !active ? `solid 2px ${color ? color : Color.QATAR_SCARLET}` : undefined, opacity: inactive ? 0.5 : 1, background: !active ? undefined : Color.QATAR_SCARLET, color: !active ? color ? color : Color.QATAR_SCARLET : "white" }} className="button-container">
      {children}
    </div>
  );
}
