import { TypingResult } from "./utils/Typio.model";
import "./styles/Result.css";

const Result = (props:{result:TypingResult|null}) => {
    const result = props.result;
    
    return (
      <div className="result">
          <div className="metric"> 
            <div className="main">
              <div className="value">{result?.wpm}</div>
              <div className="label">Words per Minute (WPM)</div>  
            </div>

            <div className="extra">
              { <div className="value">Total Hits: {result?.totalKeyCount}</div> }
              { <div className="value">Backspace Hits: {result?.backspaceKeyCount}</div> }
            </div>
          </div>

          <div className="metric">
            <div className="main">
              <span className="value">{result?.accuracy + "%"}</span>
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