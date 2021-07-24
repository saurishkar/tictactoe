import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';

import Game from '../components/Game';

const symbols = Object.freeze({
  naught: 'O',
  cross: 'X',
});

const Home = () => {
  const [playerSymbols, setPlayerSymbols] = useState({});
  const [startGame, setStartGame] = useState(false);
  const {naught, cross} = symbols;

  const handleSymbolClick = choice => {
    const userChoice = choice;
    let cpuChoice = cross;
    if (choice === cross) {
      cpuChoice = naught;
    }
    setPlayerSymbols({
      user: userChoice,
      cpu: cpuChoice,
    });
    setStartGame(true);
  };

  const resetGame = () => {
    setStartGame(false);
    setPlayerSymbols({});
  }

  return (
    <View>
      <Text>
        Tic Tac Toe{' '}
        <Text style={{fontSize: 15, lineHeight: 37}}>v/s Computer</Text>
      </Text>
      {!startGame && (
        <>
          <Text
            style={{
              margin: 'auto',
              textAlign: 'center',
              paddingBottom: 50,
            }}>
            Choose your symbol
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Button mode="contained" onPress={() => handleSymbolClick(cross)}>
              X
            </Button>
            <Button mode="contained" onPress={() => handleSymbolClick(naught)}>
              O
            </Button>
          </View>
        </>
      )}
      {startGame && <Game user={playerSymbols.user} cpu={playerSymbols.cpu} reset={resetGame} />}
    </View>
  );
};

export default Home;
