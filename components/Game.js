import React from "react";
import { View } from "react-native";

import { hasPlayerWon, getBestMove, isGridFull } from "../helpers/utils";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ],
      userSymbol: "",
      cpuSymbol: "",
      gameEnded: false
      gameStatus: ""
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.grid != this.state.grid) {
      this.checkGameOver();
    }
  }

  checkGameOver() {
    const { grid } = this.state;
    winningGrid = hasPlayerWon(grid); 
    if (winningGrid.length) {
      this.setWinner(winningGrid);
    } else if (isGridFull(grid)) {
      this.setGameDraw();
    }
  }

  handleCellClick(rowIndex, colIndex) {
    const { userSymbol, grid } = this.state; 
    let updatedGrid = grid;
    if(updatedGrid[rowIndex][colIndex] === "") {
      updatedGrid[rowIndex][colIndex] = userSymbol;
      this.setState({ grid: updatedGrid }, this.makeCpuMove);
    }
  }

  makeCpuMove() {
    const { grid, cpuSymbol } = this.state;
    const [row, col] = getBestMove(grid);
    setTimeout(() => {
      let updatedGrid = [ ...grid ];
      updatedGrid[row][col] = cpuSymbol;
      this.setState({
        grid: updatedGrid
      });
    }, 3000);
  }

  setGameDraw() {
    this.setState({
      gameEnded: true,
      gameStatus: "Draw"
    });
  }

  setWinner() {
    this.setState({
      gameEnded: true,
      gameStatus: "Winner"
    });
  }

  render() {
    return "";
  }
}