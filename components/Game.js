import React, { useState, useEffect, useCallback } from "react";
import { View, Text } from "react-native";
import { DataTable, Button } from "react-native-paper";

import { hasPlayerWon, getBestMove, isGridFull } from "../helpers/utils";

const defaultGrid = [
	["", "", ""],
	["", "", ""],
	["", "", ""],
];

const gameStatusWinner = "Winner";
const gameStatusDraw = "Draw";

const Game = ({ user: userSymbol, cpu: cpuSymbol }) => {
	const [grid, updateGrid] = useState(defaultGrid);
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

	const makeCpuMove = useCallback(() => {
		const [row, col] = getBestMove(grid, userSymbol, cpuSymbol);
		let updatedGrid = [...grid];
		updatedGrid[row][col] = cpuSymbol;
		updateGrid(updatedGrid);
		setCurrentPlayerMove(userSymbol);
	});

	const setGameDraw = () => {
		setGameEnded(true);
		setGameStatus(gameStatusDraw);
	};

	const setWinner = (winningGrid) => {
		setWinningGrid(winningGrid);
		setGameEnded(true);
		setGameStatus(gameStatusWinner);
	};

	const checkGameOver = () => {
		const winningGrid = hasPlayerWon(grid);
		if (winningGrid.length) {
			setWinner(winningGrid);
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
              let backgroundStyle = {};
							return (
								<DataTable.Cell
									style={{ padding: 5, ...backgroundStyle }}
									key={`cell-${rowIdx}-${cellIdx}`}
								>
									<Button
										onPress={() =>
											!gameEnded ? handleCellClick(rowIdx, cellIdx) : null
										}
									>
										{grid[rowIdx][cellIdx]}
									</Button>
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
