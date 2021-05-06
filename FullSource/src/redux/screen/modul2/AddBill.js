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

const AddBill = ({route, navigation}) => {
  const [money, setMoney] = useState(0);
  const [note, setNote] = useState('');
  const [colori, setColori] = useState('green');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const tmoney = useRef(0);
  const disPatch = useDispatch();
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const a = tmoney.current.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const InsertDBActionS = () => {
    db.transaction(tx => {
      console.log('start insert');
      tx.executeSql(
        'INSERT INTO spending (id, name_S, note_S, time_S, cost_S, img_S, status) VALUES (?,?,?,?,?,?,?)',
        [
          null,
          title,
          note,
          `${date.getFullYear()}-${foteDate(date.getMonth() + 1)}-${foteDate(
            date.getDate(),
          )}`,
          tmoney.current,
          Img,
          'Hoàn thành',
        ],
        (tx, rs) => {
          console.log('started11111 insert');
          if (rs.rowsAffected > 0) {
            console.log('entering.........');
            Alert.alert(
              'Success',
              'Thêm thành công',
              [
                {
                  text: 'Ok',
                  onPress: () => disPatch(Action.fetchSpending()),
                },
              ],
              {cancelable: false},
            );
            tx.executeSql('SELECT * FROM spending', [], (tx, res) => {
              console.log(res.rows.length);
              for (let i = 0; i < res.rows.length; ++i) {
                console.log('item:', res.rows.item(i));
              }
            });
          }
        },
      );
    });
  };

  const InsertDBActionE = () => {
    db.transaction(tx => {
      console.log('start insert');
      tx.executeSql(
        'INSERT INTO earning (id, name_E, note_E, time_E, cost_E, img_E, status) VALUES (?,?,?,?,?,?,?)',
        [
          null,
          title,
          note,
          `${date.getFullYear()}-${foteDate(date.getMonth() + 1)}-${foteDate(
            date.getDate(),
          )}`,
          tmoney.current,
          Img,
          'Hoàn thành',
        ],
        (tx, rs) => {
          if (rs.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Thêm thành công',
              [
                {
                  text: 'Ok',
                  onPress: () => disPatch(Action.fetchEarning()),
                },
              ],
              {cancelable: false},
            );
          }
        },
      );
    });
  };

  useEffect(() => {
    setShow(false);
  }, [date]);
  const showDatepicker = () => {
    setShow(true);
  };
  let spmoney = route.params?.spendmoney;
  let Img = route.params?.nameImg;
  let title = route.params?.title;

  console.log(spmoney);

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
          <Text style={{marginLeft: 20, fontSize: 25}}>Thêm giao dịch</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (spmoney === true) {
              InsertDBActionS();
            } else if (spmoney === false) {
              InsertDBActionE();
            } else {
              Alert.alert('Error', 'Vui lòng chọn nhóm chi thu', [
                {
                  text: 'OK',
                },
              ]);
            }
            navigation.goBack();
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
              (tmoney.current = val.replace(/\,/g, '')), setMoney(val);
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
            navigation.navigate('ChoseExpenses');
          }}>
          {getImage(Img)}
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
              style={{padding: 0, fontSize: 20, color: 'black'}}
              placeholder="Thêm ghi chú"
              onChangeText={val => {
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
              {foteDate(date.getDate())}/{foteDate(date.getMonth() + 1)}/
              {date.getFullYear()}
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

export default AddBill;
