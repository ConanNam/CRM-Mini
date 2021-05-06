import React, {useState, useRef, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToggleSwitch from 'toggle-switch-react-native';
import {
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Dimensions,
} from 'react-native';
import TodoInput from './TodoInput';
import Icon from 'react-native-vector-icons/Ionicons';
import IconF from 'react-native-vector-icons/FontAwesome';
import IconFe from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import * as Action from '../../actions/index';

const windowHeight = Dimensions.get('window').height;
const moment = require('moment');

const storeData = async (value, key) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    console.log(`saved ok`);
  } catch (e) {
    // saving error
    console.log('khong luu duoc');
  }
};

const getData = async key => {
  try {
    const result = await AsyncStorage.getItem(key);
    if (result !== null) {
      return result;
    }
  } catch (e) {
    // error reading value
  }
};

const mergeData = (data, dataPlace) => {
  for (let i = 0; i < dataPlace?.length; i++) {
    dataPlace[i] = {
      ...dataPlace[i],
      dateTime: `${moment(dataPlace[i].place.timeOrder).format(
        'DD/MM/yyyy hh:mm:ss',
      )}`,
    };
  }
  return data?.concat(dataPlace);
};

const HomeTodo = ({navigation}) => {
  const [todoItems, setTodoItems] = useState([]);
  const itemE = useRef({});
  const [modalVisible, setModalVisible] = useState(false);
  const [editContent, setEditContent] = useState('');
  const dispatch = useDispatch();
  const [showSwitch, setShowSwitch] = useState(false);
  const dataPlace = useSelector(state => state.HomeReducer.dataPlace);
  const [dataMerge, setDataMerge] = useState([]);

  dataPlace
    .sort((a, b) => {
      return a.place.timeOrder.localeCompare(b.place.timeOrder);
    })
    .reverse();

  useEffect(() => {
    if (todoItems?.length > 0) {
      storeData(todoItems, 'dataItem');
    }
  }, [todoItems]);

  useEffect(() => {
    getData('dataItem').then(rs => {
      let data = JSON.parse(rs);
      setTodoItems(data);
    });
  }, []);

  useEffect(() => {
    dispatch(Action.fetchPlaceAction());
  }, [dispatch]);

  useEffect(() => {
    let tempData = [...todoItems];
    let dataMerge = mergeData(tempData, dataPlace);
    dataMerge
      .sort((a, b) => {
        if (a.dateTime < b.dateTime) {
          return -1;
        }
        if (a.dateTime > b.dateTime) {
          return 1;
        }
        return 0;
      })
      .reverse();
    setDataMerge(dataMerge);
  }, [todoItems, dataPlace]);

  // Add a new item to the state
  function addTodoItem(_text) {
    let date = new Date();
    let temp = [
      ...todoItems,
      {
        text: _text,
        completed: false,
        dateTime: `${moment(date).format('DD/MM/yyyy hh:mm:ss')}`,
      },
    ];
    setTodoItems(temp);
  }

  // Delete an item from state by index
  function deleteTodoItem(_index) {
    if (_index === 0) {
      storeData([], 'dataItem');
    }
    let tempArr = [...todoItems];
    tempArr.splice(_index, 1);
    setTodoItems(tempArr);
  }

  // Function to set completed to true by index.
  function completeTodoItem(_index) {
    if (todoItems[_index].completed === true) {
      let tempArr = [...todoItems];
      tempArr[_index].completed = false;
      setTodoItems(tempArr);
    } else {
      let tempArr = [...todoItems];
      tempArr[_index].completed = true;
      setTodoItems(tempArr);
    }
  }
  // edit item
  const editTodoItem = _index => {
    let tempArr = [...todoItems];
    itemE.current.completed = false;
    tempArr[_index] = itemE.current;
    setTodoItems(tempArr);
  };

  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={'#212121'} />
      <SafeAreaView
        style={[
          {padding: 16, justifyContent: 'space-between', flex: 1},
          modalVisible === true ? {opacity: 0.2} : {opacity: 1},
        ]}>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                navigation.toggleDrawer();
              }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="menu-outline" size={40} />
            </TouchableOpacity>
            <Text style={{fontSize: 36, fontWeight: 'bold', marginLeft: 10}}>
              Công việc
            </Text>
          </View>
          <ToggleSwitch
            isOn={showSwitch}
            onColor="green"
            offColor="#b50000"
            size="medium"
            onToggle={() => {
              setShowSwitch(!showSwitch);
            }}
          />
        </View>
        {showSwitch === false ? (
          <FlatList
            data={dataMerge}
            keyExtractor={(item, index) =>
              index.toString() + Math.random() * 10
            }
            renderItem={({item, index}) => {
              return item?.custom ? (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Sale', {
                      screen: 'EditPlace',
                      params: {
                        item: item,
                        code: 11,
                      },
                    })
                  }
                  style={{
                    paddingVertical: 8,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flex: 10,
                    }}>
                    <IconF name="pencil-square-o" size={30} color="#b50000" />
                    <View style={{marginLeft: 10, marginRight: 25}}>
                      <Text style={{color: 'gray'}}>
                        {moment(new Date(item?.place.timeOrder)).format(
                          'DD/MM/yyyy hh:mm:ss',
                        )}
                      </Text>
                      <Text
                        style={[
                          {fontSize: 18},
                          item.place.statusOrder === 'Done'
                            ? {
                                textDecorationLine: 'line-through',
                              }
                            : [
                                item.place.statusOrder === 'Cancel'
                                  ? {textDecorationLine: 'line-through'}
                                  : {textDecorationLine: 'none'},
                              ],
                        ]}>
                        {item.place.statusOrder === 'Cancel' ? (
                          <Text style={{fontSize: 18}}>
                            Đơn hàng của {item.custom.name} đã hủy
                          </Text>
                        ) : (
                          <Text style={{fontSize: 18}}>
                            Đơn hàng của {item.custom.name}
                          </Text>
                        )}
                      </Text>
                    </View>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <IconFe name="box" size={30} color="#b50000" />
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    let indexF = todoItems
                      .map(e => {
                        return e.dateTime;
                      })
                      .indexOf(item.dateTime);
                    completeTodoItem(indexF);
                  }}
                  style={{
                    paddingVertical: 8,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                  onLongPress={() => {
                    itemE.current = item;
                    setModalVisible(!modalVisible);
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flex: 10,
                    }}>
                    <IconF name="pencil-square-o" size={30} color="#b50000" />
                    <View style={{marginLeft: 10, marginRight: 20}}>
                      <Text style={{color: 'gray'}}>{item.dateTime}</Text>
                      <Text
                        style={[
                          {fontSize: 18},
                          item.completed
                            ? {
                                textDecorationLine: 'line-through',
                              }
                            : {
                                textDecorationLine: 'none',
                              },
                        ]}>
                        {item.text}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                      flex: 1,
                      marginLeft: 5,
                    }}
                    onPress={() => {
                      let indexF = todoItems
                        .map(e => {
                          return e.dateTime;
                        })
                        .indexOf(item.dateTime);
                      deleteTodoItem(indexF);
                    }}>
                    <Icon name="trash" size={30} color="#b50000" />
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <FlatList
            data={dataPlace}
            keyExtractor={(item, index) =>
              index.toString() + Math.random() * 100
            }
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Sale', {
                      screen: 'EditPlace',
                      params: {
                        item: item,
                        code: 11,
                      },
                    })
                  }
                  style={{
                    paddingVertical: 8,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flex: 10,
                    }}>
                    <IconF name="pencil-square-o" size={30} color="#b50000" />
                    <View style={{marginLeft: 10, marginRight: 20}}>
                      <Text style={{color: 'gray'}}>
                        {moment(new Date(item?.place.timeOrder)).format(
                          'DD/MM/yyyy hh:mm:ss',
                        )}
                      </Text>
                      <Text
                        style={[
                          {fontSize: 18, marginRight: 20},
                          item.place.statusOrder === 'Done'
                            ? {
                                textDecorationLine: 'line-through',
                              }
                            : [
                                item.place.statusOrder === 'Cancel'
                                  ? {textDecorationLine: 'line-through'}
                                  : {textDecorationLine: 'none'},
                              ],
                        ]}>
                        {item.place.statusOrder === 'Cancel' ? (
                          <Text style={{fontSize: 18}}>
                            Đơn hàng của {item.custom.name} đã hủy
                          </Text>
                        ) : (
                          <Text style={{fontSize: 18}}>
                            Đơn hàng của {item.custom.name}
                          </Text>
                        )}
                      </Text>
                    </View>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <IconFe name="box" size={30} color="#b50000" />
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
        {showSwitch === false ? <TodoInput onPress={addTodoItem} /> : null}
      </SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            padding: 10,
            backgroundColor: 'white',
            justifyContent: 'center',
            width: '100%',
            top: windowHeight / 4,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontWeight: 'bold', fontSize: 25}}>Edit</Text>
          </View>
          <TextInput
            style={{
              width: '100%',
              borderRadius: 10,
              borderWidth: 0.5,
              borderColor: 'gray',
            }}
            value={itemE.current.text}
            autoFocus={true}
            multiline={true}
            onChangeText={txt => {
              itemE.current.text = txt;
              setEditContent(txt);
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={{
                justifyContent: 'center',
                backgroundColor: '#b50000',
                padding: 10,
                borderRadius: 10,
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 20, textAlign: 'center', color: 'white'}}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                backgroundColor: '#15e307',
                padding: 10,
                borderRadius: 10,
                width: '20%',
                alignItems: 'center',
              }}
              onPress={() => {
                editTodoItem(itemE.current.index);
                setModalVisible(!modalVisible);
              }}>
              <Text style={{fontSize: 20, textAlign: 'center', color: 'white'}}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default HomeTodo;
