import { useContext, useEffect, useRef, useState } from "react";
import { getTextContent, isKeyAlphabet } from "./utils/Utils";
import cx from 'classnames';
import gsap from 'gsap';
import { useWindowSize } from "./utils/Hooks";
import Countdown from "./Countdown";
import { TypioContext } from "./utils/Typio.context";
import { TypingEvent } from "./utils/Typio.model";
import './styles/Playground.css';


const Playground = () => {
  const {context, setContext} = useContext(TypioContext);

  const [typingContent, setTypingContent] = useState<string[]>([]);
  const [typingContentNext, setTypingContentNext] = useState<string[]>([]);

  const [timeLeft, setTimeLeft] = useState<number|null>(null);

  const [typingProgress, setTypingProgress] = useState<any[]>([]);
  const [cursorIndex, setCursorIndex] = useState<number>(0);
  const [lineCount, setLineCount] = useState<number>(0);
  const [backspaceCount, setBackspaceCount] = useState<number>(0);

  const {windowWidth, windowHeight} = useWindowSize();
  const playgroundRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<HTMLDivElement>(null);
  const nextLinesRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    updateTypingContent(getTextContent().split(""));
    playgroundRef.current?.focus();
  },[windowWidth,windowHeight])


  const updateTypingContent = (textArr:string[]) => {
    if(textArr?.length>0 && textArr[0] == " ") {
      textArr.shift();
    }
    setTypingContent(textArr.splice(0,windowWidth/30));
    setTypingContentNext(textArr);
  }

  const handleKeyDown = (e:React.KeyboardEvent) => {
    const _pressedKey = e.key;
    const _expectedKey = typingContent[cursorIndex];

    if(isKeyAlphabet(_pressedKey)) {
      const _progress:TypingEvent = { letterIndex:(typingContent.length*lineCount)+cursorIndex, letterTyped:_pressedKey, isHitSuccess:_pressedKey == _expectedKey };
      setTypingProgress(currentArr => [...currentArr, _progress]);
      setCursorIndex(cursorIndex+1);
    }

    if(_pressedKey == "Backspace") {
      const pressedLetterNode = activeLineRef.current?.querySelector(".pressed");
      if(pressedLetterNode) {
        setTypingProgress(currentArr => currentArr.slice(0,-1));
        setCursorIndex(cursorIndex-1);
        setBackspaceCount(backspaceCount+1);
      }
    }
    
    if(typingProgress.length===1) {
      setTimeLeft(context.gameDuration*60);
    }

    updateContext();
  }

  useEffect(()=>{
    if(typingContent?.length>0 && (cursorIndex > typingContent?.length-1)) {
      updateTypingContent(typingContentNext);
      setCursorIndex(0);
      setLineCount(lineCount+1);
    }
    // console.log("letterIndex: " + typingProgress[typingProgress.length-1]?.letterIndex);
  },[cursorIndex]);


  useEffect(()=>{
    if(lineCount>0) {
      gsap.fromTo(activeLineRef.current, 
        { opacity: 0.5 },
        { opacity: 1, duration: 0.2, delay: 0.1, ease: "power1.in" },
      );
  
      gsap.fromTo(nextLinesRef.current, 
        { opacity: 0.8, y: 10 },
        { opacity: 1, y: 0, duration: 0.15, ease: "power1.in" },
      );
    }
  },[lineCount]);


  useEffect(()=>{
    if(timeLeft===0) {
      console.log("Duration Elapsed: 0");
      setTimeLeft(null)
      let newContext = context;
      newContext.isGameStarted = false;
      setContext({...newContext});
    }

    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
      let newContext = context;
      newContext.timeLeft = timeLeft;
      setContext({...newContext});
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  
  const updateContext = () => {
    let newContext = context;
    newContext.typingProgress = typingProgress;
    if(timeLeft != null) newContext.timeLeft = timeLeft;
    newContext.backspaceKeyCount = backspaceCount;
    setContext({...newContext});
  }
  
  const isLetterPressedCorrect = (letterIndex:number) => {
    const _typing = typingProgress.find(t => t.letterIndex == (typingContent?.length*lineCount) + letterIndex);
    return _typing && _typing.isHitSuccess;
  }

  const isLetterPressed = (letterIndex:number) => {
    return typingProgress.some(t => t.letterIndex == (typingContent?.length*lineCount)+letterIndex);
  }



  return (
    <div className="playground" ref={playgroundRef} tabIndex={0} onKeyDown={(e) => handleKeyDown(e)}>
      <div className="typing-content"> 
        <div className="active-line" ref={activeLineRef}> {
          typingContent.map((letter, letterIndex) =>
            <span className={ cx('letter', {
              'pressed': isLetterPressed(letterIndex),
              'correct-letter': isLetterPressed(letterIndex) && isLetterPressedCorrect(letterIndex),
              'incorrect-letter': isLetterPressed(letterIndex) && !isLetterPressedCorrect(letterIndex),
              'current': letterIndex == cursorIndex,
              }) }>
              {letter}</span>
            )
          } 
        </div>

        <div className="next-lines" ref={nextLinesRef}> {
          typingContentNext.map((letter, letterIndex) =>
            <span className="letter">{letter}</span>
          )
        }
        </div>

        <div className="tooltip-wrapper">
          { (context.isGameStarted && typingProgress.length==0)  && <span className="tooltip">&darr; Start Typing</span> }
        </div>
      </div>

      <div className="countdown-wrapper">
        { timeLeft && <Countdown /> }
      </div>

    </div>
  );


}


export default Playground;