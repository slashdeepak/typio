import { useContext, useEffect, useRef, useState } from 'react';
import './styles/Countdown.css';
import { TypioContext } from './utils/Typio.context';

const Countdown = () => {
  const {context} = useContext(TypioContext);
  const [countdown, setCountdown] = useState<string|null>(null);

  useEffect(()=>{
    const {timeLeft} = context;
    if(timeLeft > 0) {
      const minutes = Math.floor(timeLeft/60);
      const seconds = timeLeft - (minutes * 60);
      // const timeString = (minutes>0) ? (minutes+":"+seconds) : seconds.toString();
      setCountdown(minutes+":"+seconds);
    }
  },[context]);


  return (
    <div className="countdown">{countdown}</div>
  )


}


export default Countdown;