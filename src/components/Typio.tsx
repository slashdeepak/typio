import { useContext } from 'react';
import Playground from './Playground';
import Showcase from './Showcase';
import { TypioContext } from './utils/Typio.context';
import { useResult } from './utils/Hooks';
// import logo from '../assets/typio-logo.svg';
import './styles/Typio.css';


const Typio = () => {
  const {context} = useContext(TypioContext);
  const {result} = useResult();

  return (
    <div className="typio-container"> {
        context.isGameStarted && (
          <div className="main-heading">
            {/* <img src={logo} alt="logo" className="logo"/> */}
            <div className="title">Typio</div>
          </div>)
      }

      { context.isGameStarted  ? <Playground /> : <Showcase result={result} /> } 
    </div>
  );
}


export default Typio;