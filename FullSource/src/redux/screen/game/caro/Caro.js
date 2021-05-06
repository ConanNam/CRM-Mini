/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import update from 'immutability-helper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconI from 'react-native-vector-icons/Ionicons';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';

//coo
const gameMatrix = [];

const X_SYMBOL = 'X';
const O_SYMBOL = 'O';
const init = () => {
  for (let i = 0; i < 12; i++) {
    gameMatrix.push([]);
    for (let j = 0; j < 12; j++) {
      gameMatrix[i].push(null);
    }
  }
};

const genMap = (mapData, callback) => {
  const mapJsx = [];
  for (let i = 0; i < mapData.length; i++) {
    const row = mapData[i];
    const rowJsx = [];
    for (let j = 0; j < row.length; j++) {
      rowJsx.push(
        <TouchableOpacity
          style={styles.cell}
          key={`cell_${i}_${j}`}
          onPress={() => {
            callback(i, j);
          }}>
          {mapData[i][j] === null ? (
            <Text>{mapData[i][j]}</Text>
          ) : mapData[i][j] === 'X' ? (
            <Icon name="close" size={20} color="#F80606" />
          ) : (
            <Icon name="circle-outline" size={20} color="#0921D7" />
          )}
        </TouchableOpacity>,
      );
    }
    mapJsx.push(
      <View style={styles.row} key={`row_${i}`}>
        {rowJsx}
      </View>,
    );
  }
  return mapJsx;
};

const gamePlayer = {
  player1: {win: 0},
  player2: {win: 0},
};

const hasNulls = inputArray => {
  let hasNulls = false;
  for (let i = 0; i < inputArray.length; i++) {
    const row = inputArray[i];
    for (let j = 0; j < row.length; j++) {
      if (inputArray[i][j] === null) {
        hasNulls = true;
      }
    }
  }

  return hasNulls;
};
var theWinner = undefined;
const Caro = ({navigation}) => {
  const [gameState, setGameState] = useState(() => {
    init();
    return gameMatrix;
  });
  const [turn, setTurn] = useState(X_SYMBOL);
  const [showReset, setShowReset] = useState(false);
  const nextTurn = () => {
    setTurn(turn === X_SYMBOL ? O_SYMBOL : X_SYMBOL);
  };
  const [winnerSymbol, setWinnerSymbol] = useState(null);

  const Winner = mapData => {
    let theWinner = null;
    // check first player
    for (let i = 0; i < mapData.length; i++) {
      for (let j = 0; j < mapData[i].length; j++) {
        if (
          // check row
          (mapData[i][j] === X_SYMBOL &&
            mapData[i][j + 1] === X_SYMBOL &&
            mapData[i][j + 2] === X_SYMBOL &&
            mapData[i][j + 3] === X_SYMBOL &&
            mapData[i][j + 4] === X_SYMBOL) ||
          // check column
          (mapData[i][j] === X_SYMBOL &&
            mapData[i + 1][j] === X_SYMBOL &&
            mapData[i + 2][j] === X_SYMBOL &&
            mapData[i + 3][j] === X_SYMBOL &&
            mapData[i + 4][j] === X_SYMBOL) ||
          // check diagonal left
          (mapData[i][j] === X_SYMBOL &&
            mapData[i + 1][j + 1] === X_SYMBOL &&
            mapData[i + 2][j + 2] === X_SYMBOL &&
            mapData[i + 3][j + 3] === X_SYMBOL &&
            mapData[i + 4][j + 4] === X_SYMBOL) ||
          // check diagonal right
          (mapData[i][j] === X_SYMBOL &&
            mapData[i + 1][j - 1] === X_SYMBOL &&
            mapData[i + 2][j - 2] === X_SYMBOL &&
            mapData[i + 3][j - 3] === X_SYMBOL &&
            mapData[i + 4][j - 4] === X_SYMBOL)
        ) {
          theWinner = X_SYMBOL;
          gamePlayer.player1.win++;
          setShowReset(true);
        }
      }
    }

    // second player
    for (let i = 0; i < mapData.length; i++) {
      for (let j = 0; j < mapData[i].length; j++) {
        if (
          // check row
          (mapData[i][j] === O_SYMBOL &&
            mapData[i][j + 1] === O_SYMBOL &&
            mapData[i][j + 2] === O_SYMBOL &&
            mapData[i][j + 3] === O_SYMBOL &&
            mapData[i][j + 4] === O_SYMBOL) ||
          // check column
          (mapData[i][j] === O_SYMBOL &&
            mapData[i + 1][j] === O_SYMBOL &&
            mapData[i + 2][j] === O_SYMBOL &&
            mapData[i + 3][j] === O_SYMBOL &&
            mapData[i + 4][j] === O_SYMBOL) ||
          // check diagonal left
          (mapData[i][j] === O_SYMBOL &&
            mapData[i + 1][j + 1] === O_SYMBOL &&
            mapData[i + 2][j + 2] === O_SYMBOL &&
            mapData[i + 3][j + 3] === O_SYMBOL &&
            mapData[i + 4][j + 4] === O_SYMBOL) ||
          // check diagonal right
          (mapData[i][j] === O_SYMBOL &&
            mapData[i + 1][j - 1] === O_SYMBOL &&
            mapData[i + 2][j - 2] === O_SYMBOL &&
            mapData[i + 3][j - 3] === O_SYMBOL &&
            mapData[i + 4][j - 4] === O_SYMBOL)
        ) {
          theWinner = O_SYMBOL;
          gamePlayer.player2.win++;
          setShowReset(true);
        }
      }
    }
    return theWinner;
  };

  return (
    <ImageBackground
      source={require('../../assets/white-concrete-wall.jpg')}
      style={{
        resizeMode: 'cover',
        alignItems: 'center',
        flex: 1,
      }}>
      <View
        style={{
          height: 200,
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            marginVertical: 10,
            borderBottomColor: 'gray',
            borderBottomWidth: 0.5,
          }}>
          <TouchableOpacity
            style={{
              alignSelf: 'flex-start',
              left: 15,
            }}
            onPress={() => navigation.openDrawer()}>
            <IconI name="menu-outline" size={38} />
          </TouchableOpacity>
          <Text style={{fontSize: 30, textAlign: 'center', flexGrow: 1}}>
            Cờ Caro
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <View
            style={{
              marginHorizontal: 10,
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                margin: 5,
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center',
              }}>
              <Icon name="close" size={28} color="#F80606" />
              <Text style={{fontSize: 20}}>: {gamePlayer.player1.win}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                margin: 5,
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center',
              }}>
              <Icon name="circle-outline" size={28} color="#0921D7" />
              <Text style={{fontSize: 20}}>: {gamePlayer.player2.win}</Text>
            </View>
          </View>
          <View style={{flex: 1}}>
            <Text
              style={{
                fontSize: 20,
                marginLeft: 15,
                justifyContent: 'flex-end',
              }}>
              {!winnerSymbol && `Turn: ${turn}`}
            </Text>
          </View>
        </View>
        <Text style={{fontSize: 28}}>{winnerSymbol}</Text>
      </View>
      {genMap(gameState, (i, j) => {
        if (theWinner || gameState[i][j]) {
          return;
        }
        const newStage = update(gameState, {
          [i]: {
            [j]: {$set: turn},
          },
        });
        nextTurn();
        setGameState(newStage);
        theWinner = Winner(newStage);
        if (theWinner) {
          setWinnerSymbol(`${theWinner} thắng!`);
        } else if (!hasNulls(gameState)) {
          setWinnerSymbol('Hòa');
        }
      })}
      {showReset == true ? (
        <TouchableOpacity
          onPress={() => {
            setGameState(gameMatrix);
            setTurn(X_SYMBOL);
            setWinnerSymbol(undefined);
            theWinner = null;
            setShowReset(false);
          }}
          style={{
            borderRadius: 8,
            marginVertical: 10,
            borderWidth: 0.5,
            marginTop: 30,
          }}>
          <Text
            style={{
              fontSize: 28,
              // textTransform: 'uppercase',
              fontFamily: 'vincHand',
              padding: 10,
            }}>
            Chơi lại
          </Text>
        </TouchableOpacity>
      ) : null}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    backgroundColor: '#FAFAF6',
    borderColor: '#D1D3CE',
  },
});

export default Caro;
