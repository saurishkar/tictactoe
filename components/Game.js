import React, { useState, useEffect, useCallback } from "react";
import { View, Text } from "react-native";
import { DataTable, Button } from "react-native-paper";

import { hasPlayerWon, getBestMove, isGridFull, deepClone2dArray } from "../helpers/utils";

const defaultGrid = [
	["", "", ""],
	["", "", ""],
	["", "", ""],
];

const gameStatusWinner = "Winner";
const gameStatusDraw = "Draw";

const Game = ({ user: userSymbol, cpu: cpuSymbol, reset }) => {
	const [grid, updateGrid] = useState(deepClone2dArray(defaultGrid));
	const [currentPlayerMove, setCurrentPlayerMove] = useState(userSymbol);
	const [gameEnded, setGameEnded] = useState(false);
	const [gameStatus, setGameStatus] = useState("");
	const [winningGrid, setWinningGrid] = useState([]);

	const handleCellClick = (rowIndex, colIndex) => {
		let updatedGrid = [...grid];
		if (updatedGrid[rowIndex][colIndex] === "") {
			updatedGrid[rowIndex][colIndex] = userSymbol;
			updateGrid(updatedGrid);
			setCurrentPlayerMove(cpuSymbol);
		}
	};

	const makeCpuMove = () => {
		const [row, col] = getBestMove(grid, userSymbol, cpuSymbol);
		let updatedGrid = [...grid];
		updatedGrid[row][col] = cpuSymbol;
		updateGrid(updatedGrid);
		setCurrentPlayerMove(userSymbol);
	};

	const setGameDraw = () => {
		setGameEnded(true);
		setGameStatus(gameStatusDraw);
	};

	const setWinner = (winnerGrid) => {
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

  useEffect(() => {
    return () => {
      updateGrid(deepClone2dArray(defaultGrid));
      setWinningGrid([]);
      setGameStatus("");
      setGameEnded(false);
    }
  }, []);

	const gameWon = gameEnded && gameStatus === gameStatusWinner;
	return (
		<View>
			{grid.map((row, rowIdx) => {
				return (
					<DataTable.Row key={rowIdx}>
						{row.map((cell, cellIdx) => {
							let cellStyle = {
								padding: 0,
								margin: "auto",
								borderColor: "black",
								borderWidth: 2,
								textAlign: "center",
								alignItems: "center",
								justifyContent: "center",
							};
							return (
								<DataTable.Cell
									style={cellStyle}
									key={`cell-${rowIdx}-${cellIdx}`}
									onPress={() =>
										!gameEnded ? handleCellClick(rowIdx, cellIdx) : null
									}
								>
									{cell}
								</DataTable.Cell>
							);
						})}
					</DataTable.Row>
				);
			})}
			{gameEnded && (
				<>
					<Text>{gameStatus}</Text>
					<View style={{ marginTop: 2 }}>
						<Button onPress={reset}>Start New Game</Button>
					</View>
				</>
			)}
		</View>
	);
};

export default Game;
