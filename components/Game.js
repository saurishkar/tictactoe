import React, {useState, useEffect, useCallback} from 'react';
import {View, Text} from 'react-native';
import {DataTable} from 'react-native-paper';

import {hasPlayerWon, getBestMove, isGridFull} from '../helpers/utils';

const defaultGrid = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

const gameStatusWinner = 'Winner';
const gameStatusDraw = 'Draw';

const Game = ({user: userSymbol, cpu: cpuSymbol}) => {
  const [grid, updateGrid] = useState(defaultGrid);
  const [currentPlayerMove, setCurrentPlayerMove] = useState(userSymbol);
  const [gameEnded, setGameEnded] = useState(false);
  const [gameStatus, setGameStatus] = useState('');
  const [winningGrid, setWinningGrid] = useState([]);
  const handleCellClick = (rowIndex, colIndex) => {
    let updatedGrid = [...grid];
    if (updatedGrid[rowIndex][colIndex] === '') {
      updatedGrid[rowIndex][colIndex] = userSymbol;
      updateGrid(updatedGrid);
      setCurrentPlayerMove(cpuSymbol);
    }
  };

  const makeCpuMove = useCallback(() => {
    const [row, col] = getBestMove(grid, userSymbol, cpuSymbol);
    let updatedGrid = [...grid];
    updatedGrid[row][col] = cpuSymbol;
    updateGrid(updatedGrid);
    setCurrentPlayerMove(userSymbol);
  }, [userSymbol, cpuSymbol, updateGrid, setCurrentPlayerMove, grid]);

  const setGameDraw = () => {
    setGameEnded(true);
    setGameStatus(gameStatusDraw);
  };

  const setWinner = winnerGrid => {
    setWinningGrid(winnerGrid);
    setGameEnded(true);
    setGameStatus(gameStatusWinner);
  };

  const checkGameOver = () => {
    const winnerGrid = hasPlayerWon(grid);
    if (winnerGrid.length) {
      setWinner(winnerGrid);
      return true;
    }
    if (isGridFull(grid)) {
      setGameDraw();
      return true;
    }
    return false;
  };

  useEffect(() => {
    const isGameOver = checkGameOver();
    if (!isGameOver && currentPlayerMove === cpuSymbol) {
      setTimeout(() => makeCpuMove(), 1500);
    }
  }, [currentPlayerMove]);

  const gameWon = gameEnded && gameStatus === gameStatusWinner;

  return (
    <View>
      {grid.map((row, rowIdx) => {
        return (
          <DataTable.Row key={rowIdx}>
            {row.map((cell, cellIdx) => {
              let cellStyle = {
                padding: 0,
                margin: 'auto',
                borderColor: 'black',
                borderWidth: 2,
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              };
              return (
                <DataTable.Cell
                  style={cellStyle}
                  key={`cell-${rowIdx}-${cellIdx}`}
                  onPress={() => handleCellClick(rowIdx, cellIdx)}>
                  {cell}
                </DataTable.Cell>
              );
            })}
          </DataTable.Row>
        );
      })}
      {gameEnded && <Text>{gameStatus}</Text>}
    </View>
  );
};

export default Game;
