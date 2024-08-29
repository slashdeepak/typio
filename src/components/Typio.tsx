import { useContext } from 'react';
import logo from '../assets/typio-logo.svg';
import Playground from './Playground';
import Showcase from './Showcase';
import { TypioContext } from './utils/Typio.context';
import { useResult } from './utils/Hooks';
import './styles/Typio.css';


const Typio = () => {
  const {context, setContext} = useContext(TypioContext);
  const {result} = useResult();

  const handleHeadingClick = () => {
    let newContext = context;
    newContext.typingProgress.length = 0;
    newContext.isGameStarted = !newContext.isGameStarted;
    setContext({...newContext});
  }

  return (
    <div className="typio-container"> {
        context.isGameStarted && (
          <div className="main-heading" onClick={handleHeadingClick}>
            {/* <img src={logo} alt="logo" className="logo"/> */}
            <div className="title">Typio</div>
          </div>)
      }

      { context.isGameStarted  ? <Playground /> : <Showcase result={result} /> } 
    </div>
  );

}


export default Typio;