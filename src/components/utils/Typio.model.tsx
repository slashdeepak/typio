
export interface AppContext {
  context: ContextData,
  setContext: React.Dispatch<React.SetStateAction<ContextData>>
}

export interface ContextData {
  isGameStarted: boolean,
  gameDuration: number,
  timeLeft: number,
  typingProgress: TypingEvent[],
  backspaceKeyCount: number,
}

type SetContextCallback = () => {};

export interface TypingEvent {
  letterIndex: number,
  letterTyped: string,
  isHitSuccess: boolean
}

export interface TypingResult {
  wpm: number,
  accuracy: number,
  hitKeys: string[],
  errorKeys: string[],
  totalKeyCount: number,
  backspaceKeyCount: number
}