import { Typewriter } from "react-simple-typewriter";
import { useContext, useEffect, useState } from "react";
import { TypioContext } from "./utils/Typio.context";
import text from "../assets/text.json";
import Result from "./Result";
import './styles/Showcase.css';


const Showcase = (props:any) => {
  const {context, setContext} = useContext(TypioContext);
  const [durationOptions, setDurationOptions] = useState<number[]>([]);
  // const [result, setResult] = useState<TypingResult|null>(null);

  useEffect(()=>{
    const durationOptions = [ 1, 2, 3, 5 ];
    setDurationOptions(durationOptions);
    // setResult(getResult({...context}));
    // console.log({...context}, result);
  },[]);

  const handleAction = () => {
    let newContext = context;
    newContext.isGameStarted = !newContext.isGameStarted;
    setContext({...newContext});
  }

  const handleSelect = (event:any) => {
    let newContext = context;
    newContext.gameDuration = event.target.value;
    setContext({...newContext});
    // console.log(event.target.value);
  }

  const isShowResult = () => {
    return context.timeLeft > 0;
  }

  const getTimestamp = () => {
    const date = new Date();
    return date.toLocaleString('en-US', {hour:'numeric', minute:'numeric', hour12:true}) + ", " +
      date.toLocaleString('en-US', {day: '2-digit', month:'short', year: 'numeric'})
  }

  return (
    <div className='showcase'>
      <div className="title">Typio {isShowResult() && ' Result'}</div>
      { !isShowResult() &&
        <div className="quotes">
          <Typewriter
            words={text.taglines}
            loop={2}
            cursor
            cursorStyle="_"
            typeSpeed={50}
            deleteSpeed={30}
            delaySpeed={4000}
          />
        </div>
      }

      { isShowResult() && <div className="timestamp">{getTimestamp()}</div> }

      { isShowResult() && <Result result={props.result} /> }

      <div className="action-section" style={{marginTop: isShowResult() ? '4rem' : '2rem'}}>
        <div className="duration">
          {/* <span className="label">duration</span> */}
          <select className="duration-select" onChange={handleSelect}>{ durationOptions.map(duration => 
              <option className="option" value={duration}>{duration}</option>
            )}
          </select>
          <span className="label">minute test</span>
        </div>

        <button className="action-btn" onClick={handleAction}>{ isShowResult() ? 'retake' : 'start' }</button>
      </div>

    </div>
  )
}


export default Showcase;