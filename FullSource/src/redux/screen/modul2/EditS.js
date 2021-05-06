import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as Action from '../../actions/index';
import {openDatabase} from 'react-native-sqlite-storage';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwsome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import DateTimePicker from '@react-native-community/datetimepicker';

const moment = require('moment');
var hasChanged = false;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    paddingLeft: 10,
    backgroundColor: 'white',
    marginTop: 30,
    paddingTop: 10,
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

const foteDate = a => {
  if (a < 10) {
    return '0' + a;
  } else return a;
};

var db = openDatabase({
  name: 'mydbase.db',
  createFromLocation: '~sqlite.db',
});

const getImage = nameImg => {
  switch (nameImg) {
    case 'orange-juice':
      return (
        <Image
          source={require('../assets/orange-juice.png')}
          style={styles.image}
        />
      );
      break;
    case 'car':
      return (
        <Image source={require('../assets/car.png')} style={styles.image} />
      );
      break;
    case 'game-console':
      return (
        <Image
          source={require('../assets/game-console.png')}
          style={styles.image}
        />
      );
      break;
    case 'house':
      return (
        <Image source={require('../assets/house.png')} style={styles.image} />
      );
      break;
    case 'insurance':
      return (
        <Image
          source={require('../assets/insurance.png')}
          style={styles.image}
        />
      );
      break;
    case 'gift-box':
      return (
        <Image
          source={require('../assets/gift-box.png')}
          style={styles.image}
        />
      );
      break;
    case 'university':
      return (
        <Image
          source={require('../assets/university.png')}
          style={styles.image}
        />
      );
      break;
    case 'heartbeat':
      return (
        <Image
          source={require('../assets/heartbeat.png')}
          style={styles.image}
        />
      );
      break;
    case 'invoice':
      return (
        <Image source={require('../assets/invoice.png')} style={styles.image} />
      );
      break;
    case 'like':
      return (
        <Image source={require('../assets/like.png')} style={styles.image} />
      );
      break;
    case 'shop':
      return (
        <Image source={require('../assets/shop.png')} style={styles.image} />
      );
      break;
    case 'analytics':
      return (
        <Image
          source={require('../assets/analytics.png')}
          style={styles.image}
        />
      );
      break;
    case 'present-box':
      return (
        <Image
          source={require('../assets/present-box.png')}
          style={styles.image}
        />
      );
      break;
    case 'sale':
      return (
        <Image source={require('../assets/sale.png')} style={styles.image} />
      );
      break;
    case 'money':
      return (
        <Image source={require('../assets/money.png')} style={styles.image} />
      );
      break;
    case 'trophy':
      return (
        <Image source={require('../assets/trophy.png')} style={styles.image} />
      );
      break;
    case 'salary':
      return (
        <Image source={require('../assets/salary.png')} style={styles.image} />
      );
      break;
    case 'discount':
      return (
        <Image
          source={require('../assets/discount.png')}
          style={styles.image}
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
          <FontAwsome name="question" size={30} color="#737a78" />
        </View>
      );
  }
};

const EditS = ({route, navigation}) => {
  let {editS, data} = route?.params;
  let spmoney = route.params?.spendmoney;
  console.log(data.id);
  const [money, setMoney] = useState(0);
  const [note, setNote] = useState(data.note_S || data.note_E);
  const [colori, setColori] = useState('red');
  const [date, setDate] = useState(new Date(data.time_S || data.time_E));
  const [show, setShow] = useState(false);
  const [img, setImg] = useState(data.img_S || data.img_E);
  const [title, setTitle] = useState(data.name_S || data.name_E);
  // const [sp, setSp] = useState();
  const tmoney = useRef(data.cost_S || data.cost_E);
  const disPatch = useDispatch();
  const onChange = (event, selectedDate) => {
    hasChanged = true;
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const a = tmoney.current.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const UpdateDBActionS = id => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE spending set name_S=?, note_S=?, time_S=?, cost_S=?, img_S=?, status=? where id=?',
        [
          title,
          note,
          `${date.getFullYear()}-${foteDate(date.getMonth() + 1)}-${foteDate(
            date.getDate(),
          )}`,
          tmoney.current,
          img,
          'Hoàn thành',
          id,
        ],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Cập nhật thành công',
              [
                {
                  text: 'Ok',
                  onPress: () => disPatch(Action.fetchSpending()),
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Updation Failed');
          }
        },
      );
    });
  };

  const UpdateDBActionE = id => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE earning set name_E=?, note_E=?, time_E=?, cost_E=?, img_E=?, status=? where id=?',
        [
          title,
          note,
          moment(date).format('YYYY-MM-DD'),
          tmoney.current,
          img,
          'Hoàn thành',
          id,
        ],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Cập nhật thành công',
              [
                {
                  text: 'Ok',
                  onPress: () => disPatch(Action.fetchEarning()),
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Updation Failed');
          }
        },
      );
    });
  };

  useEffect(() => {
    if (!editS) {
      setColori('blue');
    }
  }, []);

  useEffect(() => {
    setShow(false);
  }, [date]);
  const showDatepicker = () => {
    setShow(true);
  };

  useEffect(() => {
    if (route.params?.nameImg) {
      console.log(`route.params?.nameImg: ` + route.params?.nameImg);
      setImg(route.params?.nameImg);
      console.log(`Img in effect: ` + img);
    }
  }, [route.params?.nameImg]);

  useEffect(() => {
    if (route.params?.title) {
      setTitle(route.params?.title);
      console.log(title);
    }
  }, [route.params?.title]);

  useEffect(() => {
    if (spmoney === true) {
      setColori('red');
    } else if (spmoney === false) {
      setColori('blue');
    }
  }, [spmoney]);

  return (
    <View style={styles.Container}>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          backgroundColor: 'white',
          justifyContent: 'space-between',
          paddingVertical: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <AntDesign name="close" size={30} />
          </TouchableOpacity>
          <Text style={{marginLeft: 20, fontSize: 25, textAlign: 'center'}}>
            Edit
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (editS === true) {
              if (spmoney === true) {
                UpdateDBActionS(data.id);
              } else if (spmoney === undefined && hasChanged === true) {
                UpdateDBActionS(data.id);
              } else {
                Alert.alert('Error', 'Vui lòng chọn đúng mục chi tiêu', [
                  {text: 'OK'},
                ]);
              }
            } else {
              if (spmoney === false) {
                UpdateDBActionE(data.id);
              } else if (spmoney === undefined && hasChanged === true) {
                UpdateDBActionE(data.id);
              } else {
                Alert.alert('Error', 'Vui lòng chọn đúng mục thu nguồn tiền', [
                  {text: 'OK'},
                ]);
              }
            }
            navigation.goBack(data.id);
          }}>
          <Text style={{fontSize: 20}}>LƯU</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#b4c2be',
            alignItems: 'center',
            borderBottomWidth: 0.5,
            marginBottom: 20,
            marginLeft: 40,
          }}>
          <TextInput
            value={tmoney.current > 0 ? a : 0}
            placeholderTextColor={`${colori}`}
            placeholder="0"
            style={{
              color: `${colori}`,
              paddingLeft: 10,
              fontSize: 30,
            }}
            autoFocus={true}
            keyboardType="numeric"
            onChangeText={val => {
              tmoney.current = val.replace(/\,/g, '');
              hasChanged = true;
              setMoney(val);
            }}
          />
          <Text
            style={{
              fontSize: 30,
              marginLeft: 20,
              color: `${colori}`,
            }}>
            VND
          </Text>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginBottom: 20,
            alignItems: 'center',
            marginBottom: 10,
          }}
          onPress={() => {
            navigation.navigate('ChoseExpenses2');
          }}>
          {getImage(img)}
          <View
            style={{
              borderBottomColor: '#b5bab9',
              borderBottomWidth: 0.5,
              width: '100%',
              padding: 10,
              marginLeft: 10,
            }}>
            {title === undefined ? (
              <Text style={{fontSize: 20}}>Chọn nhóm</Text>
            ) : (
              <Text style={{fontSize: 20}}>{title}</Text>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <View
            style={{
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 15,
              backgroundColor: '#b5bab9',
            }}>
            <FontAwsome name="sticky-note" size={20} color="#737a78" />
          </View>
          <View
            style={{
              marginLeft: 10,
              borderBottomColor: '#b5bab9',
              borderBottomWidth: 0.5,
              width: '100%',
              padding: 10,
            }}>
            <TextInput
              value={note}
              style={{padding: 0, fontSize: 20, color: 'black'}}
              placeholder="Thêm ghi chú"
              onChangeText={val => {
                hasChanged = true;
                setNote(val);
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
          }}
          onPress={showDatepicker}>
          <View
            style={{
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 15,
              backgroundColor: '#b5bab9',
            }}>
            <Fontisto name="date" size={20} color="#737a78" />
          </View>
          <View
            style={{
              marginLeft: 10,
              borderBottomColor: '#b5bab9',
              borderBottomWidth: 0.5,
              width: '100%',
              padding: 10,
            }}>
            <Text style={{fontSize: 20}}>
              {moment(date).format('DD/MM/yyyy')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default EditS;
