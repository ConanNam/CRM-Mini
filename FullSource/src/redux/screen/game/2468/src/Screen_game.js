import React, {useState, useEffect, useCallback} from 'react';
import {
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
  Text,
  Button,
} from 'react-native';

import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import CustomColor from './CustomColor';
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const Screen_game_2468 = ({navigation}) => {
  const [action, setAction] = useState('none');
  const [score, setScore] = useState(0);
  const [heightScore, setHeightScore] = useState(0);
  const [count, setCount] = useState([
    [0, 0, 0, 0],
    [2, 0, 4, 0],
    [2, 2, 0, 0],
    [2, 2, 0, 8],
  ]);

  const start = [2, 2, 2, 2, 4, 4, 2, 2];

  // chọn 2 số ngẫu nhiên ở 2 vị trí ngẫu nhiên
  const selectRandom = () => {
    console.log('hello123');
    setScore(0);
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        console.log('reSet ' + i);
        count[i][j] = 0;
      }
    }
    setCount([...count]);

    let number = start[Math.floor(Math.random() * start.length)];
    let number1 = start[Math.floor(Math.random() * start.length)];
    let x1 = Math.floor(Math.random() * 4);
    let x2 = Math.floor(Math.random() * 4);
    while (true) {
      var x3 = 1 + Math.trunc(Math.random() * 3);
      var x4 = 1 + Math.trunc(Math.random() * 3);
      if (x1 !== x3 && x2 !== x4) break;
    }
    count[x1][x2] = number;
    count[x3][x4] = number1;
    setCount([...count]);
    if (heightScore < score) {
      setHeightScore(score);
    }
  };
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  // hàm chọn màu
  const selectColor = a => {
    let c = Math.LOG2E(a);
    let dataColor = [
      '#5ff719',
      '#97f719',
      '#c3f719',
      '#ecf719',
      '#f7b119',
      '#f78119',
      '#f75c19',
      '#f73a19',
    ];
    if (c > 7) {
      c = 7;
    }
    return dataColor[c];
  };

  const onSwipeUp = () => {
    console.log('up');
    // xep lai gan nhau
    var index_up = 0;
    var value_up = 0;
    let add_so = false;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        // cong so cung gia tri
        if (count[j][i] !== 0) {
          if (count[j][i] === value_up) {
            add_so = true;
            count[index_up][i] = value_up + count[j][i];
            count[j][i] = 0;
            value_up = 0;
            let diem = score + count[index_up][i];
            setScore(diem);
          } else {
            index_up = j;
            value_up = count[j][i];
          }
        }
        if (j === 3) {
          index_up = 0;
          value_up = 0;
        }
      }
    }
    //  sap xep lai
    let a = 0;
    while (a < 3) {
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (count[j][i] === 0) {
            while (j < 3) {
              if (count[j + 1][i] !== 0) {
                add_so = true;
              }
              count[j][i] = count[j + 1][i];
              count[j + 1][i] = 0;
              j++;
            }
          }
        }
      }
      a++;
    }

    //chọn 1 số để hiện thị
    if (add_so) {
      let number = start[Math.floor(Math.random() * start.length)];
      let c = new Array();
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (count[j][i] === 0) {
            c.push([j, i]);
          }
        }
      }
      let index = Math.floor(Math.random() * c.length);
      let x1 = c[index][0];
      let x2 = c[index][1];
      count[x1][x2] = number;
      add_so = false;
    }

    setCount([...count]);

    // check thua chưa báo out game
    let check_up = 0;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (count[j][i] !== 0) {
          if (i < 3 && j < 3) {
            if (
              count[i][j] !== count[i + 1][j] &&
              count[i][j + 1] !== count[i][j]
            ) {
              check_up += 1;
            }
          } else if (i == 3 && j < 3) {
            if (count[3][j] !== count[3][j + 1]) {
              check_up += 1;
            }
          } else if (j == 3 && i < 3) {
            if (count[i][3] !== count[i + 1][3]) {
              check_up += 1;
            }
          }
        }
      }
    }
    if (check_up === 15) {
      alert(' bạn đã thua cuộc');
    } else {
      check_up = 0;
    }
  };

  // vuốt xuống
  function onSwipeDown() {
    console.log('Down');
    var index_down = 0;
    var value_down = 0;
    let add_so = false;
    for (let i = 3; i > -1; i--) {
      for (let j = 3; j > -1; j--) {
        if (count[j][i] !== 0) {
          if (count[j][i] === value_down) {
            count[index_down][i] = value_down + count[j][i];
            count[j][i] = 0;
            value_down = 0;
            let diem = score + count[index_down][i];
            setScore(diem);
            add_so = true;
          } else {
            index_down = j;
            value_down = count[j][i];
          }
        }
        if (j === 0) {
          index_down = 0;
          value_down = 0;
        }
      }
    }

    // sắp xếp xuống
    let a = 0;
    while (a < 3) {
      for (let i = 3; i > -1; i--) {
        for (let j = 3; j > -1; j--) {
          if (count[j][i] === 0) {
            while (j > 0) {
              if (count[j - 1][i] !== 0) {
                add_so = true;
              }
              count[j][i] = count[j - 1][i];
              count[j - 1][i] = 0;
              j--;
            }
          }
        }
      }
      a++;
    }

    //chọn 1 số để hiện thị
    if (add_so) {
      let number = start[Math.floor(Math.random() * start.length)];
      let c = new Array();
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (count[j][i] === 0) {
            c.push([j, i]);
          }
        }
      }
      let index = Math.floor(Math.random() * c.length);
      let x1 = c[index][0];
      let x2 = c[index][1];
      count[x1][x2] = number;

      add_so = false;
    }

    setCount([...count]);

    // check thua chưa báo out game
    let check_down = 0;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (count[j][i] !== 0) {
          if (i < 3 && j < 3) {
            if (
              count[i][j] !== count[i + 1][j] &&
              count[i][j + 1] !== count[i][j]
            ) {
              check_down += 1;
            }
          } else if (i == 3 && j < 3) {
            if (count[3][j] !== count[3][j + 1]) {
              check_down += 1;
            }
          } else if (j == 3 && i < 3) {
            if (count[i][3] !== count[i + 1][3]) {
              check_down += 1;
            }
          }
        }
      }
    }
    if (check_down == 15) {
      alert(' bạn đã thua cuộc');
    } else {
      check_down = 0;
    }
  }

  function onSwipeRight() {
    console.log('Right');
    var index_right = 0;
    var value_right = 0;
    let add_so = false;
    for (let i = 3; i > -1; i--) {
      for (let j = 3; j > -1; j--) {
        if (count[i][j] !== 0) {
          if (count[i][j] === value_right) {
            count[i][index_right] = value_right + count[i][j];
            count[i][j] = 0;
            value_right = 0;
            let diem = score + count[i][index_right];
            setScore(diem);
            add_so = true;
          } else {
            index_right = j;
            value_right = count[i][j];
          }
        }
        if (j === 0) {
          index_right = 0;
          value_right = 0;
        }
      }
    }

    // sắp xếp sang phải
    let a = 0;
    while (a < 3) {
      for (let i = 3; i > -1; i--) {
        for (let j = 3; j > -1; j--) {
          if (count[i][j] === 0) {
            while (j > 0) {
              count[i][j] = count[i][j - 1];
              count[i][j - 1] = 0;

              if (count[i][j - 1] !== 0) {
                add_so = true;
              }
              j--;
            }
          }
        }
      }
      a++;
    }

    //chọn 1 số để hiện thị
    if (add_so) {
      let number = start[Math.floor(Math.random() * start.length)];
      let c = new Array();
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (count[j][i] === 0) {
            c.push([j, i]);
          }
        }
      }
      let index = Math.floor(Math.random() * c.length);
      let x1 = c[index][0];
      let x2 = c[index][1];
      count[x1][x2] = number;
      add_so = false;
    }

    setCount([...count]);
    // check thua chưa báo out game
    let check_right = 0;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (count[j][i] !== 0) {
          if (i < 3 && j < 3) {
            if (
              count[i][j] !== count[i + 1][j] &&
              count[i][j + 1] !== count[i][j]
            ) {
              check_right += 1;
            }
          } else if (i == 3 && j < 3) {
            if (count[3][j] !== count[3][j + 1]) {
              check_right += 1;
            }
          } else if (j == 3 && i < 3) {
            if (count[i][3] !== count[i + 1][3]) {
              check_right += 1;
            }
          }
        }
      }
    }
    if (check_right === 15) {
      alert(' bạn đã thua cuộc');
    } else {
      check_right = 0;
    }
  }

  function onSwipeLeft() {
    console.log('left');
    var index_left = 0;
    var value_left = 0;
    let add_so = false;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (count[i][j] !== 0) {
          if (count[i][j] === value_left) {
            count[i][index_left] = value_left + count[i][j];
            count[i][j] = 0;
            value_left = 0;
            let diem = score + count[i][index_left];
            setScore(diem);
            add_so = true;
          } else {
            index_left = j;
            value_left = count[i][j];
          }
        }
        if (j === 3) {
          index_left = 0;
          value_left = 0;
        }
      }
    }

    // sắp xếp qua trái
    let a = 0;
    while (a < 3) {
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (count[i][j] === 0) {
            while (j < 3) {
              if (count[i][j + 1] !== 0) {
                add_so = true;
              }
              count[i][j] = count[i][j + 1];
              count[i][j + 1] = 0;
              j++;
            }
          }
        }
      }
      a++;
    }

    //chọn 1 số để hiện thị
    if (add_so) {
      let number = start[Math.floor(Math.random() * start.length)];
      let c = new Array();
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (count[j][i] === 0) {
            c.push([j, i]);
          }
        }
      }
      let index = Math.floor(Math.random() * c.length);
      let x1 = c[index][0];
      let x2 = c[index][1];
      count[x1][x2] = number;
      add_so = false;
    }

    setCount([...count]);

    // check thua chưa báo out game
    let check_left = 0;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (count[j][i] !== 0) {
          if (i < 3 && j < 3) {
            if (
              count[i][j] !== count[i + 1][j] &&
              count[i][j + 1] !== count[i][j]
            ) {
              check_left += 1;
            }
          } else if (i == 3 && j < 3) {
            if (count[3][j] !== count[3][j + 1]) {
              check_left += 1;
            }
          } else if (j == 3 && i < 3) {
            if (count[i][3] !== count[i + 1][3]) {
              check_left += 1;
            }
          }
        }
      }
    }

    if (check_left === 15) {
      alert(' bạn đã thua cuộc');
    } else {
      check_left = 0;
    }
  }

  function onSwipe(gestureName, gestureState) {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    setAction(gestureName);
    switch (gestureName) {
      case SWIPE_UP:
        break;
      case SWIPE_DOWN:
        break;
      case SWIPE_LEFT:
        break;
      case SWIPE_RIGHT:
        break;
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.game}>
        <View style={styles.button_hear}>
          <View style={styles.button_}>
            <Text style={styles.title}>Điểm</Text>
            <Text style={styles.number}>{score}</Text>
          </View>
          <View style={styles.button_}>
            <Text style={styles.title}>Điểm cao</Text>
            <Text style={styles.number}>{heightScore}</Text>
          </View>
        </View>
        <View style={styles.button_playAgain}>
          <TouchableOpacity
            style={[styles.button_again, {alignSelf: 'flex-start'}]}
            onPress={() => navigation.openDrawer()}>
            <Text style={styles.title_button}>Menu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button_again} onPress={selectRandom}>
            <Text style={styles.title_button}>Chơi lại</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <GestureRecognizer
            config={config}
            onSwipe={onSwipe}
            onSwipeUp={onSwipeUp}
            onSwipeDown={onSwipeDown}
            onSwipeLeft={onSwipeLeft}
            onSwipeRight={onSwipeRight}
            style={styles.view_game}>
            <View style={styles.ban_game}>
              <View style={styles.doc}>
                <View style={styles.o}>
                  {count[0][0] === 0 ? (
                    <View />
                  ) : (
                    <CustomColor so={count[0][0]}></CustomColor>
                  )}
                </View>
                <View style={styles.o}>
                  {count[0][1] === 0 ? (
                    <View />
                  ) : (
                    <CustomColor so={count[0][1]} />
                  )}
                </View>
                <View style={styles.o}>
                  {count[0][2] === 0 ? (
                    <View />
                  ) : (
                    <CustomColor so={count[0][2]} />
                  )}
                </View>
                <View style={styles.o}>
                  {count[0][3] === 0 ? (
                    <View />
                  ) : (
                    <CustomColor so={count[0][3]} />
                  )}
                </View>
              </View>
              <View style={styles.doc}>
                <View style={styles.o}>
                  {count[1][0] === 0 ? (
                    <View />
                  ) : (
                    <CustomColor so={count[1][0]} />
                  )}
                </View>
                <View style={styles.o}>
                  {count[1][1] === 0 ? (
                    <View />
                  ) : (
                    <CustomColor so={count[1][1]} />
                  )}
                </View>
                <View style={styles.o}>
                  {count[1][2] === 0 ? (
                    <View />
                  ) : (
                    <CustomColor so={count[1][2]} />
                  )}
                </View>
                <View style={styles.o}>
                  {count[1][3] === 0 ? (
                    <View />
                  ) : (
                    <CustomColor so={count[1][3]} />
                  )}
                </View>
              </View>
              <View style={styles.doc}>
                <View style={styles.o}>
                  {count[2][0] === 0 ? (
                    <View />
                  ) : (
                    <CustomColor so={count[2][0]} />
                  )}
                </View>
                <View style={styles.o}>
                  {count[2][1] === 0 ? (
                    <View />
                  ) : (
                    <CustomColor so={count[2][1]} />
                  )}
                </View>
                <View style={styles.o}>
                  {count[2][2] === 0 ? (
                    <View />
                  ) : (
                    <CustomColor so={count[2][2]} />
                  )}
                </View>
                <View style={styles.o}>
                  {count[2][3] === 0 ? (
                    <View />
                  ) : (
                    <CustomColor so={count[2][3]} />
                  )}
                </View>
              </View>
              <View style={styles.doc}>
                <View style={styles.o}>
                  {count[3][0] === 0 ? (
                    <View />
                  ) : (
                    <CustomColor so={count[3][0]} />
                  )}
                </View>
                <View style={styles.o}>
                  {count[3][1] === 0 ? (
                    <View />
                  ) : (
                    <CustomColor so={count[3][1]} />
                  )}
                </View>
                <View style={styles.o}>
                  {count[3][2] === 0 ? (
                    <View />
                  ) : (
                    <CustomColor so={count[3][2]} />
                  )}
                </View>
                <View style={styles.o}>
                  {count[3][3] === 0 ? (
                    <View />
                  ) : (
                    <CustomColor so={count[3][3]} />
                  )}
                </View>
              </View>
            </View>
          </GestureRecognizer>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // display: flex,
    flexGrow: 1,
    // flex: 1,
    // width: width,
    // height: height,
    backgroundColor: '#1a2f52',
  },
  button_hear: {
    flexDirection: 'row',
    height: height * 0.1,
    width: width * 0.9,
    justifyContent: 'space-between',
    marginTop: height * 0.05,
  },
  button_: {
    backgroundColor: '#0f141c',
    width: width * 0.42,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    color: '#d1bc00',
    fontWeight: 'bold',
    marginTop:5
  },
  number: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
  },
  game: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_playAgain: {
    marginTop: 30,
    width: 0.9 * width,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  view_game: {
    zIndex: 100,
    // position : 'absolute',
    marginTop: 30,
    height: 350,
    width: 350,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    // alignItems: 'baseline',
  },
  o: {
    backgroundColor: '#032a69',
    height: 75,
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doc: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ban_game: {
    width: 330,
    height: 330,
    justifyContent: 'space-between',
  },
  o_text: {
    fontSize: 40,
    color: 'black',
    fontWeight: 'bold',
  },
  button_again: {
    backgroundColor: '#0b2040',
    height: 60,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  title_button: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  o_: {
    height: 75,
    width: 75,
    backgroundColor: '#032a69',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Screen_game_2468;
