import React, {FC} from 'react'

interface ChangeProps {
    change: number;
}

interface Coins {
    ten: number[],
    five: number[],
    two: number[],
    one: number[]
}

function changeCount(ammountRequired: number): Coins {
    const coins: number[] = [10, 5, 2, 1];
    const result: Coins = {
        ten: [],
        five: [],
        two: [],
        one: []
    };
  
    if (ammountRequired > 0) {
      for (let i = 0; i < coins.length; i++) {
        let note = coins[i];
        
        while (ammountRequired - note >= 0) {
          ammountRequired -= note;
          switch(note) {
            case 10: result.ten.push(note);
            break;
            case 5: result.five.push(note);
            break;
            case 2: result.two.push(note);
            break;
            case 1: result.one.push(note);
          }
        }
      }    
    }                                                
    return result;
  }

export const Change: FC<ChangeProps> = ({change}) => {
    const result = changeCount(change);

  return (
    <div style={{color: 'goldenrod'}}>
       {!!result.ten.length && <span>10₽: {result.ten.length} coins</span>}
        <br/>
       {!!result.five.length && <span>5₽: {result.five.length} coins</span>}
        <br/>
        {!!result.two.length && <span>2₽: {result.two.length} coins</span>}
        <br/>
        {!!result.one.length && <span>1₽: {result.one.length} coins</span>}
    </div>
  )
}