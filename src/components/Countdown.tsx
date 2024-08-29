import { useContext, useEffect, useRef, useState } from 'react';
import './styles/Countdown.css';
import { TypioContext } from './utils/Typio.context';

const Countdown = () => {
  const {context} = useContext(TypioContext);
  const [firstHitTime, setFirstHitTime] = useState<string|null>(null);

  const countdownRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    if(context.isGameStarted && context.typingProgress.length==1) {
      if(firstHitTime == null) {
        setFirstHitTime(new Date().toISOString());
        changeCountdownStyles("add");
      } else {
        changeCountdownStyles("remove");
        changeCountdownStyles("add");
      }
    }
  },[context]);


  const changeCountdownStyles = (action:string) => {
    const leftFillNode = countdownRef.current?.querySelector<HTMLElement>(".left.fill");
    const rightFillNode = countdownRef.current?.querySelector<HTMLElement>(".right.fill");
    const duration = (context.timeLeft+10) +"s";

    if(leftFillNode && rightFillNode) {
      if(action == "add") {
        leftFillNode.style.animationDuration =  duration;
        rightFillNode.style.animationDuration = duration;
        rightFillNode.style.animationDelay = duration;
      }
      if(action == "remove") {
        leftFillNode.style.animationDuration =  "none";
        rightFillNode.style.animationDuration = "none";
        rightFillNode.style.animationDelay = "none";
      }
    }
  }


  return (
    <>
    { (context.isGameStarted && context.typingProgress.length>0) && (
      <div id='countdown-container' ref={countdownRef}>
        <div className='hold left'>
          <div className='fill' style={{animationDuration: (context?.timeLeft)+"s"}}></div>
        </div>
        <div className='hold right'>
          <div className='fill' style={{animationDuration: (context?.timeLeft+10)+"s", animationDelay: (context?.timeLeft+10)+"s"}}></div>
        </div>
      </div>)
    }
    </>
  );


}


export default Countdown;