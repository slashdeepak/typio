import { useState, useEffect, useContext } from "react";
import { TypioContext } from "../utils/Typio.context";
import { TypingEvent, TypingResult } from "./Typio.model";

// Hook
export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({ windowWidth:0, windowHeight:0 });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}


interface Result {
  result: TypingResult | null
}

export function useResult() {
  const {context, setContext} = useContext(TypioContext);
  const [result, setResult] = useState<Result>({result:null});
  const [typedWords, setTypedWords] = useState<Array<TypingEvent[]>>([]);

  useEffect(()=>{
    updateTypedWords();
  },[context]);

  const updateTypedWords = () => {
    if(context.typingProgress?.length > 0) {
      const _typedEntries:TypingEvent[] = context.typingProgress.map(t => JSON.parse(JSON.stringify(t)));
      const last = _typedEntries[_typedEntries.length-1]
      
      if(_typedEntries?.length>0) {
        if(typedWords.length == 0 && last.letterTyped == " ") {
          setTypedWords([_typedEntries.splice(0,last.letterIndex)])
        }

        if(typedWords.length>0 && last.letterTyped == " ") {
          const lastWord:TypingEvent[] = typedWords[typedWords.length-1];
          const startIndex:number = lastWord[lastWord.length-1]?.letterIndex + 1;
          const newWord:TypingEvent[] = _typedEntries.splice(startIndex, last.letterIndex);
          setTypedWords(current => [...current, newWord]);
        }
      }

      calculateResult();
    }
  }

  const calculateResult = () => {
    if(typedWords.length > 0) {
      const typedWordCount = (context.typingProgress.length/5);
      
      let _errorWords = [];
      typedWords.forEach(wArr => {
        const errorWord:TypingEvent[] = wArr.filter(w => !w.isHitSuccess);
        if(errorWord?.length>0) _errorWords.push(errorWord);
      });
      const errorWordCount = _errorWords.length;

      const grossWPM = typedWordCount / context.gameDuration;
      const netWPM = (typedWordCount - errorWordCount) / context.gameDuration;
      const accuracy = (netWPM/grossWPM) * 100;

      const {hitKeys, errorKeys} = hitAndErrorKeys();

      const result:TypingResult = { 
        wpm: Math.ceil(netWPM),
        accuracy: Number(accuracy.toFixed(1)),
        hitKeys: hitKeys,
        errorKeys: errorKeys,
        totalKeyCount: context.typingProgress.length,
        backspaceKeyCount: context.backspaceKeyCount
      }
      setResult({result:result});
    }
  }


  const hitAndErrorKeys = () => {
    const _typedKeys:TypingEvent[] = context.typingProgress.filter(k => k.letterTyped != " ");
    let hitKeys:string[] = [];
    let errorKeys:string[] = [];
    hitKeys = _typedKeys.filter(key => key.isHitSuccess).map(key => key.letterTyped);
    errorKeys = _typedKeys.filter(key => !key.isHitSuccess).map(key => key.letterTyped);
    return { hitKeys: getTopValues(hitKeys), errorKeys: getTopValues(errorKeys) }
    // https://stackoverflow.com/a/53510045
  }


  const getTopValues = (arr:string[]) => {
    const counts = arr.reduce((a:any, c:any) => {
      a[c] = (a[c] || 0) + 1;
      return a;
    }, {});

    const top2 = Object.entries(counts)
      .sort((a:any, b:any) => b[1] - a[1])
      .slice(0, 2)
      .map(([label, value]) => ({ label, value }));
    return top2.map(v => v.label);
  }
  
  return result;
}
