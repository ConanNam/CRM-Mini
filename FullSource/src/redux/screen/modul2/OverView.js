import React, {useState, useEffect} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  View,
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
  SectionList,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import IconI from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import * as Action from '../../actions/index';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  monneySpend: {
    color: 'red',
    textAlign: 'center',
    marginTop: 5,
  },
  total: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 20,
  },
  Containerplus: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  plus: {
    backgroundColor: '#b50000',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image2: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    // marginRight: 20,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
});

const moment = require('moment');
var dataAll = [];
var db = openDatabase({
  name: 'mydbase.db',
  createFromLocation: '~sqlite.db',
});
const caculateData = (dataS, dataE, dataPlace) => {
  let arrTitle = [];
  let dataAfter = [];
  for (let i = 0; i < dataS?.length; i++) {
    if (!arrTitle.includes(dataS[i].time_S) && dataS[i].time_S !== null) {
      arrTitle.push(dataS[i].time_S);
    }
  }
  for (let i = 0; i < dataE?.length; i++) {
    if (!arrTitle.includes(dataE[i].time_E) && dataE[i].time_E !== null) {
      arrTitle.push(dataE[i].time_E);
    }
  }

  for (let i = 0; i < dataPlace?.length; i++) {
    let dt = new Date(dataPlace[i]?.place?.timeOrder);
    if (
      !arrTitle.includes(moment(dt).format('yyyy-MM-DD')) &&
      moment(dt).format('yyyy-MM-DD') !== null
    ) {
      arrTitle.push(moment(dt).format('yyyy-MM-DD'));
    }
  }
  arrTitle.sort().reverse();
  ///////////////////////////////////////

  for (let i = 0; i < arrTitle.length; i++) {
    let title = arrTitle[i];
    let tempS = [];
    let tempE = [];
    let tempPlace = [];
    for (let j = 0; j < dataS?.length; j++) {
      if (dataS[j]?.time_S === title) {
        tempS.push(dataS[j]);
      }
    }
    for (let j = 0; j < dataE?.length; j++) {
      if (dataE[j].time_E === title) {
        tempE.push(dataE[j]);
      }
    }

    for (let j = 0; j < dataPlace?.length; j++) {
      let dt = new Date(dataPlace[j]?.place?.timeOrder);
      let time = moment(dt).format('yyyy-MM-DD');
      if (time === title) {
        tempPlace.push(dataPlace[j]);
      }
    }
    if (tempE?.length > 0 || tempS?.length > 0 || tempPlace?.length > 0) {
      dataAfter.push({
        title: title,
        dataItem: [tempS, tempE, tempPlace],
      });
    }
  }
  return dataAfter;
};

const DeleteAllData = () => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM spending', []),
      tx.executeSql('DELETE FROM earning', []);
  });
};

const caculateTotalS = data => {
  let sumS = 0;
  for (let i = 0; i < data.length; i++) {
    sumS += data[i].cost_S;
  }
  return sumS;
};

const caculateTotalE = data => {
  let sumE = 0;
  for (let i = 0; i < data.length; i++) {
    sumE += data[i].cost_E;
  }
  return sumE;
};

const caculateTotalP = data => {
  let sumP = 0;

  for (let i = 0; i < data?.length; i++) {
    let tp1 = parseFloat(data[i].quantity * data[i].valueProduct);

    let tp2 =
      parseFloat(data[i].quantity * data[i].valueProduct) *
      (parseFloat(data[i].discount) / 100);

    sumP += tp1 - tp2;
  }

  return sumP;
};

const caculateHeader = (dataAll, bmoney) => {
  console.log('bmoney :>> ', bmoney);
  let earnMoney = 0;
  if (parseFloat(bmoney?.toString().replace(/\,/g, '')) > 0)
    earnMoney = parseFloat(bmoney?.toString().replace(/\,/g, ''));
  let spendMoney = 0;
  let total = 0;
  for (let i = 0; i < dataAll.length; i++) {
    earnMoney += caculateTotalE(dataAll[i].dataItem[1]);

    for (let j = 0; j < dataAll[i].dataItem[2].length; j++) {
      if (dataAll[i].dataItem[2][j].place.statusOrder === 'Done')
        earnMoney += caculateTotalP(dataAll[i].dataItem[2][j].Place_Product);
    }

    spendMoney += caculateTotalS(dataAll[i].dataItem[0]);
  }
  total = earnMoney - spendMoney;
  return [earnMoney, spendMoney, total];
};

const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {}
};

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
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

const fomatDate = str => {
  let arr = str.split('-');
  return `${arr[2]}/${arr[1]}/${arr[0]}`;
};

const OverView = ({navigation, route}) => {
  const [nameWallet, setNameWallet] = useState(route?.params?.nameW || 0);
  const [totalWallet, setTotalWallet] = useState(route?.params?.moneyW || 0);
  const dispatch = useDispatch();
  const dataS = useSelector(state => state.FSpending.dataSpending);
  const dataE = useSelector(state => state.FEarning.dataEarning);
  const dataPlace = useSelector(state => state.HomeReducer.dataPlace);
  let ESMoney = [];
  // const show = route.params?.showSale;

  useEffect(() => {
    getData('header').then(rs => {
      let data = JSON.parse(rs);
      setNameWallet(data.hWalletName);
      setTotalWallet(data.hTotal);
    });
    dispatch(Action.fetchSpending());
  }, []);

  // useEffect(() => {
  //   if (show === true) {
  //     navigation.navigate('OverViewTabs', {
  //       screen: 'ListSE',
  //       params: {
  //         sh: true,
  //       },
  //     });
  //   }
  // }, [show]);

  useEffect(() => {
    dispatch(Action.fetchPlaceAction());
  }, []);

  useEffect(() => {
    dispatch(Action.fetchEarning());
  }, [dataS]);

  if (dataE?.length > 0 || dataS?.length > 0 || dataPlace?.length > 0) {
    dataAll = caculateData(dataS, dataE, dataPlace);
    ESMoney = caculateHeader(dataAll, totalWallet);
  } else {
    dataAll = [];
  }

  useEffect(() => {
    dispatch(Action.fetchCustomData(dataAll));
  }, [dataAll]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingRight: 10,
          marginBottom: 10,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'flex-start',
          }}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <IconI name="menu-outline" size={35} color="#b50000" />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'row', paddingLeft: 10}}>
            <View
              style={{
                marginLeft: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 18}}>{nameWallet}</Text>
              <View style={{justifyContent: 'center', marginTop: 10}}>
                {dataAll?.length > 0 ? (
                  <Text style={{fontSize: 25}}>
                    {ESMoney[2]
                      ?.toString()
                      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') ||
                      totalWallet
                        .toString()
                        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}{' '}
                    VND
                  </Text>
                ) : (
                  <Text style={{fontSize: 25}}>
                    {totalWallet
                      .toString()
                      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}{' '}
                    VND
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'flex-start',
          }}
          onPress={() => {
            Alert.alert(
              'Cảnh báo',
              'Bạn có muốn xóa tất cả các bản ghi chi tiêu ?',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('canceled'),
                  style: 'cancel',
                },
                {
                  text: 'Delete',
                  onPress: () => {
                    clearStorage();
                    DeleteAllData();
                    navigation.navigate('Side', {
                      isdel: true,
                    });
                  },
                  style: 'destructive',
                },
              ],
            );
          }}>
          <Icon name="trash" size={30} color="#b50000" />
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 0, flex: 2}}>
        <View
          style={{
            backgroundColor: 'white',
            height: 130,
            width: '100%',
            padding: 10,
            marginBottom: 10,
            marginTop: 10,
            elevation: 10,
            borderRadius: 8,
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text style={{marginTop: 20, fontSize: 18}}>Tiền vào</Text>
            <Text style={styles.total}>
              {dataAll?.length > 0 ? (
                <Text>
                  {ESMoney[0]
                    ?.toString()
                    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') || 0}
                </Text>
              ) : (
                totalWallet
                  .toString()
                  .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
              )}
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text style={{marginTop: 5, fontSize: 18}}>Tiền ra</Text>
            <Text style={styles.monneySpend}>
              {dataAll?.length > 0 ? (
                <Text>
                  {ESMoney[1]
                    ?.toString()
                    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') || 0}
                </Text>
              ) : (
                0
              )}
            </Text>
          </View>
          <View
            style={{
              alignSelf: 'flex-end',
              height: 0.5,
              width: '50%',
              borderWidth: 0.5,
              marginTop: 5,
              borderColor: '#9fa4a6',
            }}></View>
          <Text style={{alignSelf: 'flex-end'}}>
            {dataAll?.length > 0 ? (
              <Text>
                {ESMoney[2]
                  ?.toString()
                  .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
              </Text>
            ) : (
              totalWallet.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
            )}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>Chi tiết</Text>
          <View style={styles.Containerplus}>
            <TouchableOpacity
              style={styles.plus}
              onPress={() => {
                navigation.navigate('AddBill');
              }}>
              <Icon name="plus-a" size={15} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {dataAll?.length > 0 ? (
            dataAll.map(item => {
              let spendMoney = caculateTotalS(item.dataItem[0]);
              let earnMoney = caculateTotalE(item.dataItem[1]);
              for (let i = 0; i < item.dataItem[2].length; i++)
                if (item.dataItem[2][i].place.statusOrder === 'Done')
                  earnMoney += caculateTotalP(
                    item.dataItem[2][i].Place_Product,
                  );
              let total = earnMoney - spendMoney;
              if (total !== 0)
                return (
                  <View
                    style={{
                      backgroundColor: 'white',
                      height: 130,
                      width: '100%',
                      padding: 10,
                      marginBottom: 10,
                      marginTop: 10,
                      borderRadius: 8,
                    }}
                    key={item.title}>
                    <View>
                      <Text style={{fontSize: 20}}>
                        {fomatDate(item.title)}
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                      }}>
                      <Text style={{marginTop: 20}}>Thu nhập</Text>
                      <Text style={styles.total}>
                        {earnMoney
                          .toString()
                          .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                      }}>
                      <Text style={{marginTop: 5}}>Chi tiêu</Text>
                      <Text style={styles.monneySpend}>
                        {spendMoney
                          .toString()
                          .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
                      </Text>
                    </View>
                    <View
                      style={{
                        alignSelf: 'flex-end',
                        height: 0.5,
                        width: '50%',
                        borderWidth: 0.5,
                        marginTop: 5,
                        borderColor: '#9fa4a6',
                      }}></View>
                    <Text style={{alignSelf: 'flex-end'}}>
                      {total
                        .toString()
                        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
                    </Text>
                  </View>
                );
            })
          ) : (
            <Text>Không có dữ liệu</Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default OverView;
