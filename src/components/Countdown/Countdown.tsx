import React, { useEffect, useState } from 'react';
import { formatNumber } from '../../global';
import './Countdown.scss';

export const Countdown = () => {
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  setInterval(() => {
    const countDownDate = new Date("2022-11-21 13:00:00Z").getTime();
    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    const daysLeft = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesLeft = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const secondsLeft = Math.floor((distance % (1000 * 60)) / 1000);
    
    setDays(daysLeft);
    setHours(hoursLeft);
    setMinutes(minutesLeft);
    setSeconds(secondsLeft);
  }, 1000)

  return (
    <div className="countdown-container">
      <div className="number">{formatNumber(days)}</div>
      <div className="number">{formatNumber(hours)}</div>
      <div className="number">{formatNumber(minutes)}</div>
      <div className="number">{formatNumber(seconds)}</div>
      <div className="section">DAYS</div>
      <div className="section">HOURS</div>
      <div className="section">MINUTES</div>
      <div className="section">SECONDS</div>      
    </div>
  );
}