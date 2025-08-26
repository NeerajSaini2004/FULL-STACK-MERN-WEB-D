import { useState } from "react";
import Card from "../Card/card";
import './Grid.css'
import isWinner from "../../Helper/chekWinner";
import { set } from "mongoose";

function Grid({ numberOfRCards }) {
  const [board, setBoard] = useState(Array(numberOfRCards).fill(" "));
 const [ turn , setTurn ] = useState(true);//true for X and false for O
const [winner,setWinner]=useState(null);
 function play(index) {

    if(turn===true){
        board[index]="O";
       
    }
    else{
        board[index]="X";
    }
const win= isWinner(board,turn?'O':'X');

if(win){
    setWinner(win);
   
}
    setBoard([...board]);
    setTurn(!turn);
 }


 function reset(){
    setTurn(true);
    setWinner(null);
    setBoard(Array(numberOfRCards).fill(" "));
 }

  return (

    <div className="grid-wrapper">
{
  winner && (
    <>
      <h1 className="turn-highlight">Winner is : {winner}</h1>
      <button className="reset" onClick={reset}>Reset Game</button>
    </>
  )
}

    <h1 className="turn-highlight">Current turn :{(turn)?'O':'X'}</h1>

       <div className="grid">
      {board.map((el, idx) => 
        <Card  gameEnd={winner ?true:false} key={idx}  onPlay={play} player={el} index={idx}/>
      )}
        </div>
        </div>

    
  );
}

export default Grid;
