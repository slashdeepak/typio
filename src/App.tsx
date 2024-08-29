import { useState } from 'react';
import Typio from './components/Typio';
import { ContextData } from './components/utils/Typio.model';
import { TypioContext } from './components/utils/Typio.context';
import './App.css';

function App() {
  const [context, setContext] = useState<ContextData>({
    isGameStarted: false,
    gameDuration: 1,
    timeLeft: -1,
    typingProgress: [],
    backspaceKeyCount: 0,
  });

  const value = {context, setContext}
  
  return (
    <TypioContext.Provider value={value}>
      <Typio />
    </TypioContext.Provider>
  )
}

export default App;
