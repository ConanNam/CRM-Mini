import React, {useState, useEffect} from 'react';
import * as Action from '../../actions/index';
import {openDatabase} from 'react-native-sqlite-storage';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Picker,
  ScrollView,
  FlatList,
  Alert,
  Modal,
  Dimensions,
  StatusBar,
} from 'react-native';
import IconI from 'react-native-vector-icons/Ionicons';
import IconA from 'react-native-vector-icons/AntDesign';
import IconM from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';

const windowHeight = Dimensions.get('window').height;
const moment = require('moment');

const getImage = nameImg => {
  switch (nameImg) {
    case 'orange-juice':
      return (
        <Image
          source={require('../assets/orange-juice.png')}
          style={styles.image2}
        />
      );
      break;
    case 'car':
      return (
        <Image source={require('../assets/car.png')} style={styles.image2} />
      );
      break;
    case 'game-console':
      return (
        <Image
          source={require('../assets/game-console.png')}
          style={styles.image2}
        />
      );
      break;
    case 'house':
      return (
        <Image source={require('../assets/house.png')} style={styles.image2} />
      );
      break;
    case 'insurance':
      return (
        <Image
          source={require('../assets/insurance.png')}
          style={styles.image2}
        />
      );
      break;
    case 'gift-box':
      return (
        <Image
          source={require('../assets/gift-box.png')}
          style={styles.image2}
        />
      );
      break;
    case 'university':
      return (
        <Image
          source={require('../assets/university.png')}
          style={styles.image2}
        />
      );
      break;
    case 'heartbeat':
      return (
        <Image
          source={require('../assets/heartbeat.png')}
          style={styles.image2}
        />
      );
      break;
    case 'invoice':
      return (
        <Image
          source={require('../assets/invoice.png')}
          style={styles.image2}
        />
      );
      break;
    case 'like':
      return (
        <Image source={require('../assets/like.png')} style={styles.image2} />
      );
      break;
    case 'shop':
      return (
        <Image source={require('../assets/shop.png')} style={styles.image2} />
      );
      break;
    case 'analytics':
      return (
        <Image
          source={require('../assets/analytics.png')}
          style={styles.image2}
        />
      );
      break;
    case 'present-box':
      return (
        <Image
          source={require('../assets/present-box.png')}
          style={styles.image2}
        />
      );
      break;
    case 'sale':
      return (
        <Image source={require('../assets/sale.png')} style={styles.image2} />
      );
      break;
    case 'money':
      return (
        <Image source={require('../assets/money.png')} style={styles.image2} />
      );
      break;
    case 'trophy':
      return (
        <Image source={require('../assets/trophy.png')} style={styles.image2} />
      );
      break;
    case 'salary':
      return (
        <Image source={require('../assets/salary.png')} style={styles.image2} />
      );
      break;
    case 'discount':
      return (
        <Image
          source={require('../assets/discount.png')}
          style={styles.image2}
        />
      );
      break;
    default:
      return (
        <View
          style={{
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
            backgroundColor: '#b5bab9',
          }}>
          <FontAwesome name="question" size={30} color="#737a78" />
        </View>
      );
  }
};

var db = openDatabase({
  name: 'mydbase.db',
  createFromLocation: '~sqlite.db',
});

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

const fomatDate = str => {
  let arr = str.split('-');
  return `${arr[2]}/${arr[1]}/${arr[0]}`;
};

const filterStatus = (data, status) => {
  switch (status) {
    case 'All':
      return data;
      break;
    case 'Pending':
      return data.filter(item => item.status == 'pending');
    default:
      return data.filter(item => item.status == 'Hoàn thành');
      break;
  }
};

var dataAll2 = [];

const filterStatusPlace = (data, status) => {
  switch (status) {
    case 'All':
      return data;
      break;
    case 'Pending':
      return data.filter(item => item.place.statusOrder == 'New');
    default:
      return data.filter(item => item.place.statusOrder == 'Done');
      break;
  }
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

const ListSE = ({navigation, route}) => {
  const [selectPicker, setSelectPicker] = useState('All');
  const [showSpending, setShowSpending] = useState(true);
  const [showSale, setShowSale] = useState(false);
  const disPatch = useDispatch();
  const show = route.params?.showSale;
  const dataS = useSelector(state => state.FSpending.dataSpending);
  const dataE = useSelector(state => state.FEarning.dataEarning);
  const dataPlace = useSelector(state => state.HomeReducer.dataPlace);
  useEffect(() => {
    if (show === true) {
      setShowSale(true);
    }
  }, [show]);

  if (dataE?.length > 0 || dataS?.length > 0 || dataPlace?.length > 0) {
    dataAll2 = caculateData(dataS, dataE, dataPlace);
  } else {
    dataAll2 = [];
  }

  const [modalVisible, setModalVisible] = useState(false);

  const DeleteRowDBActionS = id => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM  spending where id=?', [id], (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          Alert.alert(
            'Success',
            'Xóa thành công',
            [
              {
                text: 'Ok',
                onPress: () => disPatch(Action.fetchSpending()),
              },
            ],
            {cancelable: false},
          );
        } else {
          alert('Please insert a valid Id');
        }
      });
    });
  };

  const DeleteRowDBActionE = id => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM  earning where id=?', [id], (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          Alert.alert(
            'Success',
            'Xóa thành công',
            [
              {
                text: 'Ok',
                onPress: () => disPatch(Action.fetchEarning()),
              },
            ],
            {cancelable: false},
          );
        } else {
          alert('Please insert a valid Id');
        }
      });
    });
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        modalVisible === true ? {opacity: 0.3} : {opacity: 1},
      ]}>
      <StatusBar hidden={true} />
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            flex: 2,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={styles.logo}>
            <IconI name="ios-wallet-sharp" size={38} color="#b50000" />
          </View>
          <Text style={{color: 'white', fontSize: 30}}>Danh sách</Text>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <IconA name="filter" size={38} color="white" />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <View style={styles.rowButtonTop}>
            <TouchableOpacity
              style={styles.buttonTop}
              onPress={() => {
                setShowSpending(true);
                setShowSale(false);
              }}>
              <View>
                {showSpending ? (
                  showSale === true ? (
                    <Text style={[styles.txtButton]}>Chi</Text>
                  ) : (
                    <Text style={[styles.txtButton, {color: 'red'}]}>Chi</Text>
                  )
                ) : (
                  <Text style={[styles.txtButton]}>Chi</Text>
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonTop}
              onPress={() => {
                setShowSpending(false);
                setShowSale(false);
              }}>
              <View>
                {showSpending === false ? (
                  showSale === true ? (
                    <Text style={[styles.txtButton]}>Thu</Text>
                  ) : (
                    <Text style={[styles.txtButton, {color: 'blue'}]}>Thu</Text>
                  )
                ) : (
                  <Text style={[styles.txtButton]}>Thu</Text>
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonTop}
              onPress={() => {
                setShowSale(true);
              }}>
              <View>
                {showSale === true ? (
                  <Text style={[styles.txtButton, {color: 'green'}]}>
                    Đơn hàng
                  </Text>
                ) : (
                  <Text style={styles.txtButton}>Đơn hàng</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {showSale === true
            ? dataAll2.map(it => {
                let earnMoney = 0;
                let data = it.dataItem[2];
                let dataP = filterStatusPlace(data, selectPicker);
                for (let i = 0; i < it.dataItem[2].length; i++)
                  if (it.dataItem[2][i].place.statusOrder === 'Done')
                    earnMoney += caculateTotalP(
                      it.dataItem[2][i].Place_Product,
                    );
                if (dataP.length > 0)
                  return (
                    <View
                      style={styles.childrenFlat}
                      key={it.title + Math.random() * 100}>
                      <View style={styles.bodyChildrenHeader}>
                        <Text style={styles.title}>{fomatDate(it.title)}</Text>
                        <Text style={[styles.total, {color: 'blue'}]}>
                          +
                          {earnMoney
                            ?.toString()
                            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
                        </Text>
                      </View>
                      {dataP?.map(item => {
                        let product = item.Place_Product;
                        console.log(product);
                        return product?.map(e => {
                          console.log('e :>> ', e);
                          return (
                            <TouchableOpacity
                              style={styles.row}
                              key={Math.random() * 100 + 'a'}
                              onPress={() =>
                                navigation.navigate('Sale', {
                                  screen: 'EditPlace',
                                  params: {
                                    item: item,
                                    code: 10,
                                  },
                                })
                              }>
                              <View style={styles.bodyChildrenContent}>
                                <Image
                                  source={require('../assets/box-outline-filled.png')}
                                  style={{width: 50, height: 50}}
                                />
                                <View
                                  style={{marginLeft: 10}}
                                  key={Math.random() * 100 + 'b'}>
                                  <Text
                                    style={[
                                      styles.txtContent,
                                      {color: 'black', fontSize: 20},
                                    ]}>
                                    {e.nameProduct} (<Text>x{e.quantity}</Text>)
                                  </Text>
                                  <Text style={styles.txtContent}>
                                    {item.custom?.name}
                                  </Text>
                                  <Text style={styles.txtContent}>
                                    Trạng thái:{' '}
                                    {item.place.statusOrder === 'New' ? (
                                      <Text style={{color: '#e3e30e'}}>
                                        Đang chờ xử lí
                                      </Text>
                                    ) : item.place.statusOrder === 'Done' ? (
                                      <Text style={{color: 'black'}}>
                                        Hoàn thành
                                      </Text>
                                    ) : (
                                      <Text style={{color: '#b50000'}}>
                                        Đã hủy
                                      </Text>
                                    )}
                                  </Text>
                                </View>
                              </View>
                              <Text>
                                {(
                                  e.quantity * e.valueProduct -
                                  (e.discount / 100) *
                                    e.quantity *
                                    e.valueProduct
                                )
                                  ?.toString()
                                  .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
                              </Text>
                            </TouchableOpacity>
                          );
                        });
                      })}
                    </View>
                  );
              })
            : showSpending === true
            ? dataAll2?.map(item => {
                let data = item.dataItem[0];
                let dataS = filterStatus(data, selectPicker);
                let totalS = caculateTotalS(dataS);
                if (totalS !== 0)
                  return (
                    <View
                      style={styles.childrenFlat}
                      key={item.title + Math.random()}>
                      <View style={styles.bodyChildrenHeader}>
                        <Text style={styles.title}>
                          {fomatDate(item.title)}
                        </Text>
                        <Text style={[styles.total, {color: 'red'}]}>
                          -
                          {totalS
                            ?.toString()
                            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
                        </Text>
                      </View>
                      {dataS?.map(e => {
                        return (
                          <TouchableOpacity
                            style={styles.row}
                            key={Math.random() * 10}
                            onLongPress={() => {
                              Alert.alert(
                                'Cảnh báo',
                                'Bạn có chắc chắn muốn xóa',
                                [
                                  {text: 'cancel'},
                                  {
                                    text: 'OK',
                                    onPress: () => {
                                      DeleteRowDBActionS(e.id);
                                    },
                                  },
                                ],
                              );
                            }}
                            onPress={() =>
                              navigation.navigate('EditS', {
                                editS: true,
                                data: e,
                              })
                            }>
                            <View style={styles.bodyChildrenContent}>
                              {getImage(e.img_S)}
                              <View style={{marginLeft: 10}}>
                                <Text
                                  style={[
                                    styles.txtContent,
                                    {color: 'black', fontSize: 20},
                                  ]}>
                                  {e.name_S}
                                </Text>
                                <Text style={styles.txtContent}>
                                  Ghi chú: {e.note_S}
                                </Text>
                                <Text style={styles.txtContent}>
                                  Trạng thái:{' '}
                                  {
                                    <Text style={{color: 'black'}}>
                                      {e.status}
                                    </Text>
                                  }
                                </Text>
                              </View>
                            </View>
                            <Text>
                              {e.cost_S
                                .toString()
                                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  );
              })
            : dataAll2?.map(item => {
                let data = item.dataItem[1];
                let dataE = filterStatus(data, selectPicker);
                let totalE = caculateTotalE(dataE);
                if (totalE !== 0)
                  return (
                    <View
                      style={styles.childrenFlat}
                      key={item.title + Math.random()}>
                      <View style={styles.bodyChildrenHeader}>
                        <Text style={styles.title}>
                          {fomatDate(item.title)}
                        </Text>
                        <Text style={[styles.total, {color: 'blue'}]}>
                          +
                          {totalE
                            ?.toString()
                            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
                        </Text>
                      </View>
                      {dataE?.map(e => {
                        return (
                          <TouchableOpacity
                            style={styles.row}
                            key={Math.random() * 10}
                            onLongPress={() => {
                              Alert.alert(
                                'Cảnh báo',
                                'Bạn có chắc chắn muốn xóa',
                                [
                                  {text: 'cancel'},
                                  {
                                    text: 'OK',
                                    onPress: () => {
                                      DeleteRowDBActionE(e.id);
                                    },
                                  },
                                ],
                              );
                            }}
                            onPress={() =>
                              navigation.navigate('EditS', {
                                editS: false,
                                data: e,
                              })
                            }>
                            <View style={styles.bodyChildrenContent}>
                              {getImage(e.img_E)}
                              <View style={{marginLeft: 10}}>
                                <Text
                                  style={[
                                    styles.txtContent,
                                    {color: 'black', fontSize: 20},
                                  ]}>
                                  {e.name_E}
                                </Text>
                                <Text style={styles.txtContent}>
                                  Ghi chú: {e.note_E}
                                </Text>
                                <Text style={styles.txtContent}>
                                  Trạng thái:{' '}
                                  {
                                    <Text style={{color: 'green'}}>
                                      {e.status}
                                    </Text>
                                  }
                                </Text>
                              </View>
                            </View>
                            <Text>
                              {e.cost_E
                                .toString()
                                .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  );
              })}
        </ScrollView>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#b50000',
            borderRadius: 24,
            position: 'absolute',
            right: 10,
            bottom: 18,
            width: 48,
            height: 48,
          }}
          onPress={() => navigation.navigate('AddBill')}>
          <IconA name="plus" size={30} color="white" />
        </TouchableOpacity>
      </View>
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
            borderRadius: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 25}}>Trạng thái</Text>
          </View>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center', padding: 10}}
            onPress={() => {
              setModalVisible(!modalVisible);
              setSelectPicker('Done');
            }}>
            <IconI name="checkmark-done" size={38} color="#19ad05" />
            <Text style={{fontSize: 20, marginLeft: 20}}>Hoàn thành</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center', padding: 10}}
            onPress={() => {
              setModalVisible(!modalVisible);
              setSelectPicker('Pending');
            }}>
            <IconM name="pending-actions" size={38} color="#f0df29" />
            <Text style={{fontSize: 20, marginLeft: 20}}>Đang chờ xử lí</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center', padding: 10}}
            onPress={() => {
              setModalVisible(!modalVisible);
              setSelectPicker('All');
            }}>
            <IconM name="category" size={38} color="#b50000" />
            <Text style={{fontSize: 20, marginLeft: 20}}>Tất cả</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ListSE;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1.5,

    backgroundColor: '#b50000',
    paddingHorizontal: 10,
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  body: {
    flex: 6,
    paddingTop: 20,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',

    alignItems: 'center',
    justifyContent: 'center',
  },
  rowButtonTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 5,
  },
  buttonTop: {
    padding: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '30%',
    height: 30,
  },
  txtButton: {
    color: 'black',
    textAlign: 'center',
  },
  childrenFlat: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
  },
  total: {
    fontSize: 20,
  },
  imgChildren: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  bodyChildrenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    paddingBottom: 10,
  },
  bodyChildrenContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center',
  },
  content: {
    marginLeft: 20,
  },
  txtContent: {
    color: 'gray',
  },
  image2: {
    width: 50,
    height: 50,
  },
});
