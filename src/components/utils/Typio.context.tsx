import { createContext } from "react";
import { AppContext, ContextData } from "./utils/Typio.model";


export const TypioContext = createContext<AppContext>({
  context: { 
    isGameStarted: false,
    gameDuration: 1,
    timeLeft: -1,
    typingProgress: [],
    backspaceKeyCount: 0,
  },
  setContext: () => {}
});
