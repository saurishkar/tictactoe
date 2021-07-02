import React, { useState, useEffect, useCallback } from "react";
import { View, Text } from "react-native";
import { DataTable, Button } from "react-native-paper";

import { hasPlayerWon, getBestMove, isGridFull } from "../helpers/utils";

const defaultGrid = [
	["", "", ""],
	["", "", ""],
	["", "", ""],
];

const Game = ({ user: userSymbol, cpu: cpuSymbol }) => {
	const [grid, updateGrid] = useState(defaultGrid);
	const [gameEnded, setGameEnded] = useState(false);
	const [gameStatus, setGameStatus] = useState("");

	const handleCellClick = (rowIndex, colIndex) => {
		let updatedGrid = grid;
		if (updatedGrid[rowIndex][colIndex] === "") {
			updatedGrid[rowIndex][colIndex] = userSymbol;
			updateGrid(updatedGrid);
		}
		new Promise((res) => setTimeout(() => res(makeCpuMove()), 1500));
	};

	const makeCpuMove = useCallback(() => {
		const [row, col] = getBestMove(grid, userSymbol, cpuSymbol);
		let updatedGrid = [...grid];
		updatedGrid[row][col] = cpuSymbol;
		updateGrid(updatedGrid);
	});

	const setGameDraw = () => {
		setGameEnded(true);
		setGameStatus("Draw");
	};

	const setWinner = () => {
		setGameEnded(true);
		setGameStatus("Winner");
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
		checkGameOver();
	}, [grid]);

	return (
		<View>
			{grid.map((row, rowIdx) => {
				return (
					<DataTable.Row key={rowIdx}>
						{row.map((cell, cellIdx) => (
							<DataTable.Cell
								style={{ padding: 5 }}
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
						))}
					</DataTable.Row>
				);
			})}
			{gameEnded && <Text>{gameStatus}</Text>}
		</View>
	);
};

export default Game;
