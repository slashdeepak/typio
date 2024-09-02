import text from '../../assets/text.json';

export const getTextContent = () => {
  return text.paragraphs[Math.floor((Math.random()*text.paragraphs.length))];
}

export const generateTextBlocks = (text:string) => {
  const words = text.split(' ').map(w => <div className='word'> {spanifyWord(w)} </div>);
  return words;
}

const spanifyWord = (word:string) => {
  const letters = word.split('').map(l => <span className='letter'> {l} </span>);
  return letters;
} 

export const isKeyAlphabet = (key:string) => {
  return new RegExp("^[a-zA-Z0-9.—!-@?#'\"$%&:';()*\+,\/;-=[\\\]\^_{|}<>~` ]$", "i").test(key);
}


// const getTagline = (count:number) => {
//   return [...Array(count).keys()].map(i => Math.floor(Math.random()*text.taglines.length) )
//     .map(index => text.taglines[index]);
// }


export type Nullable<T> = T | null;
  