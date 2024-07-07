import { useState } from "react";
import "./App.css";
import Square from "./Square";

const TURNOS = {
  X: "x",
  O: "o",
};

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turno, setTurno] = useState(TURNOS.X);
  const [winner, setWinner] = useState(null);
  const updataBoard = (index)=>{
    if (board[index]) {
      return
    }
    const newBoard = [...board];
    newBoard[index] = turno;
    setBoard(newBoard);
    const newTurno = turno === TURNOS.X ? TURNOS.O : TURNOS.X;
    setTurno(newTurno);
  }
  return (
    <>
      <main className="board">
        <h1>Tic Tac Toe</h1>
        <section className="game">
          {board.map((_, index) => {
            return (
              <Square 
              key={index} 
              index={index}
              updataBoard={updataBoard}
                >
                {board[index]}
              </Square>
            );
          })}
        </section>

        <section className="turn">
          <Square isSelected = {turno === TURNOS.X}>{TURNOS.X}</Square>
          <Square isSelected = {turno === TURNOS.O}>{TURNOS.O}</Square>

        </section>

      </main>
    </>
  );
}

export default App;
