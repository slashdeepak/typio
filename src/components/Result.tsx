import { useEffect, useState } from "react";
import { TypingResult } from "./utils/Typio.model";
import { useWindowSize } from "./utils/Hooks";
import CountUp from "react-countup";
import Confetti from 'react-confetti';
import "./styles/Result.css";

const Result = (props:{result:TypingResult|null}) => {
    const [result, setResult] = useState<TypingResult|null>(null);
    const { windowWidth, windowHeight } = useWindowSize();

    useEffect(() => {
      if(props.result) {
        const _result:TypingResult = {
          wpm: props.result.wpm > 0 ? props.result.wpm : 0,
          accuracy: props.result.accuracy > 0 ? props.result.accuracy : 0,
          totalKeyCount: props.result.totalKeyCount,
          backspaceKeyCount: props.result.backspaceKeyCount,
          hitKeys: props.result.hitKeys,
          errorKeys: props.result.errorKeys
        };
        setResult(_result);
      }
    }, [props]);

    return (
      <div className="result">
          { (result && result.wpm >25) && <Confetti width={windowWidth} height={windowHeight} recycle={true} /> }

          <div className="metric"> 
            <div className="main">
              <div className="value"> { result && <CountUp end={result?.wpm} duration={3}/> } </div>
              <div className="label">Words per Minute (WPM)</div>  
            </div>

            <div className="extra">
              { <div className="value">Total Hits: {result?.totalKeyCount}</div> }
              { <div className="value">Backspace Hits: {result?.backspaceKeyCount}</div> }
            </div>
          </div>

          <div className="metric">
            <div className="main">
              <span className="value">{ result && <CountUp end={result?.accuracy} suffix="%" duration={3}/> } </span>
              <span className="label">Accuracy</span>
            </div>

            <div className="extra">
              { (result?.hitKeys && result?.hitKeys.length>0) && <div className="value"><span className="label">Best Keys: </span> { result?.hitKeys.map(key => <span className="key" id="hit">{key}</span>) } </div> }
              { (result?.errorKeys && result?.errorKeys.length>0) && <div className="value"><span className="label">Error Keys:</span> { result?.errorKeys.map(key => <span className="key" id="error">{key}</span>) }</div> }
            </div>
          </div>

      </div>
    );


}


export default Result;

// https://indiatyping.com/index.php/typing-tips/typing-speed-calculation-formula