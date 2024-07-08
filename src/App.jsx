import { useState } from "react";
import "./App.css";
import Square from "./Square";

const TURNOS = {
  X: "x",
  O: "o",
};
const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turno, setTurno] = useState(TURNOS.X);
  const [winner, setWinner] = useState(null);

  const checkWinner=(boardToCheck)=>{
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ){
        return boardToCheck[a]
      }
    }
    return null;
  }
  const resetGame = ()=>{
    setBoard(Array(9).fill(null));
    setTurno(TURNOS.X);
    setWinner(null);
  }
  const checkEndGame=(newBoard)=>{
    return newBoard.every((square) => square !== null);
  }
  const updataBoard = (index)=>{
    if (board[index] || winner) {
      return
    }
    const newBoard = [...board];
    newBoard[index] = turno;
    setBoard(newBoard);
    const newTurno = turno === TURNOS.X ? TURNOS.O : TURNOS.X;
    setTurno(newTurno);
    // revisar si hay ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner)
    }else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
    // todo check 
  }
  return (
    <>
      <main className="board">
        <h1>Tic Tac Toe</h1>
        <button onClick={resetGame}>Reset del juego</button>
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
        <section>
          {
            winner !== null 
            &&
            <section className="winner">
              <div className="text">
                <h2>
                  {
                    winner === false
                    ?
                    "Empate"
                    :
                    `Gano`
                  }
                </h2>
                <header className="win">
                  {winner && <Square>{winner}</Square>}
                </header>
                <footer>
                  <button onClick={resetGame}>Empezar de nuevo</button>
                </footer>
              </div>
            </section>
          }
        </section>
      </main>
    </>
  );
}

export default App;
