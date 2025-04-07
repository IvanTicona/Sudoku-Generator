import React, { useState } from 'react';
import { generateSudoku } from '../utils/sudokuGenerator.js';
import './SudokuBoard.css';

const SudokuBoard = () => {
  const initialData = generateSudoku();
  const [puzzleData, setPuzzleData] = useState(initialData);
  const [userGrid, setUserGrid] = useState(initialData.puzzle.map(row => row.slice()));
  const [message, setMessage] = useState('');

  const handleGenerate = (difficulty) => {
    const newPuzzleData = generateSudoku(difficulty);
    setPuzzleData(newPuzzleData);
    setUserGrid(newPuzzleData.puzzle.map(row => row.slice()));
    setMessage('');
  };

  const handleInputChange = (row, col, value) => {
    const num = parseInt(value, 10);
    if (value === '' || (num >= 1 && num <= 9)) {
      const updatedGrid = userGrid.map(r => r.slice());
      updatedGrid[row][col] = value === '' ? 0 : num;
      setUserGrid(updatedGrid);
    }
  };

  const checkSolution = () => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (userGrid[i][j] !== puzzleData.solution[i][j]) {
          setMessage('La solución no es correcta. ¡Sigue intentando!');
          return;
        }
      }
    }
    setMessage('¡Felicidades, ganaste!');
  };

  const handleReset = () => {
    setUserGrid(puzzleData.puzzle.map(row => row.slice()));
    setMessage('');
  };

  return (
    <div className="sudoku-container">
      <h1>Juego de Sudoku</h1>
      <div className="controls">
        <button onClick={() => handleGenerate('easy')}>Fácil</button>
        <button onClick={() => handleGenerate('medium')}>Medio</button>
        <button onClick={() => handleGenerate('hard')}>Difícil</button>
        <button onClick={handleReset}>Reiniciar</button>
        <button onClick={checkSolution}>Comprobar solución</button>
      </div>
      <div className="grid">
        {userGrid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              puzzleData.puzzle[rowIndex][colIndex] !== 0 ? (
                <div key={colIndex} className="cell fixed">
                  {cell}
                </div>
              ) : (
                <input
                  key={colIndex}
                  className="cell input-cell"
                  type="text"
                  maxLength="1"
                  value={cell === 0 ? '' : cell}
                  onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                />
              )
            ))}
          </div>
        ))}
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default SudokuBoard;
