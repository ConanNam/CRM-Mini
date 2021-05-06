import React, {useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import {useEffect, useState} from 'react';
import CountryPicker from 'react-native-country-picker-modal';
import axios from 'axios';
import {Dimensions} from 'react-native';
import IconFt from 'react-native-vector-icons/Fontisto';
import IconA from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
const getFirstRate = currency => {
  axios({
    method: 'GET',
    url: `https://v6.exchangerate-api.com/v6/693ca460c1796cfac0daf0d6/latest/${currency}`,
  })
    .then(Response => {
      return Response.data['conversion_rates']['USD'];
    })
    .catch(Error => {
      console.log('Home Converter', Error);
    });
};

let deviceHeight = Dimensions.get('window').height;

const ConverterCurrency = ({navigation}) => {
  const [country1, setCountry1] = useState(null);
  const [country2, setCountry2] = useState(null);
  const [countryCode1, setCountryCode1] = useState('VN');
  const [countryCode2, setCountryCode2] = useState('US');
  const [nameCountry1, setNameCountry1] = useState('Vietnam');
  const [nameCountry2, setNameCountry2] = useState('United States');
  const [currency1, setCurrency1] = useState('VND');
  const [currency2, setCurrency2] = useState('USD');
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [number3, setNumber3] = useState(0);
  const [number4, setNumber4] = useState(0);
  const [number5, setNumber5] = useState(0);
  const [number6, setNumber6] = useState(0);
  const [number7, setNumber7] = useState(0);
  const [number8, setNumber8] = useState(0);
  const [number9, setNumber9] = useState(0);
  const [rate, setRate] = useState(() => getFirstRate('VND'));
  const tmoney = useRef(0);

  const a = tmoney.current.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const b = number2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  useEffect(() => {
    axios({
      method: 'GET',
      url: `https://v6.exchangerate-api.com/v6/693ca460c1796cfac0daf0d6/latest/${currency1}`,
    })
      .then(Response => {
        setRate(Response.data['conversion_rates']);
      })
      .catch(Error => {
        console.log('error converter', Error);
      });
  }, [currency1]);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 5,
          paddingVertical: 10,
          borderBottomColor: 'gray',
          borderBottomWidth: 0.5,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.toggleDrawer();
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="menu-outline" size={38} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 30,
            flexGrow: 1,
            marginLeft: 30,
          }}>
          Trang chủ
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#7c7d7c',

          height: 100,
        }}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              flexDirection: 'row',
            }}>
            <CountryPicker
              withAlphaFilter={true}
              countryCode={countryCode1}
              withFilter={true}
              withFlag={true}
              withCurrency={true}
              withFlagButton={true}
              onSelect={country => {
                setCountry1(country);
                setCountryCode1(country.cca2);
                setNameCountry1(country.name);
                setCurrency1(country.currency[0]);
                setNumber2((number1 * rate[`${currency2}`]).toFixed(2));
                setNumber3((number1 * rate['GBP']).toFixed(2));
                setNumber4((number1 * rate['CNY']).toFixed(2));
                setNumber5((number1 * rate['JPY']).toFixed(2));
                setNumber6((number1 * rate['CAD']).toFixed(2));
                setNumber7((number1 * rate['AUD']).toFixed(2));
                setNumber8((number1 * rate['RUB']).toFixed(2));
                setNumber9((number1 * rate['SGD']).toFixed(2));
              }}
            />
            <Text style={{textAlign: 'center', fontSize: 13, color: 'white'}}>
              {nameCountry1}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="white"
              value={tmoney.current > 0 ? a : 0}
              onChangeText={val => {
                tmoney.current = val.replace(/\,/g, '');
                setNumber1(parseFloat(val.replace(/\,/g, '')));
                setNumber2(
                  (
                    parseFloat(val.replace(/\,/g, '')) * rate[`${currency2}`]
                  ).toFixed(2),
                );
                setNumber3(
                  (parseFloat(val.replace(/\,/g, '')) * rate['GBP']).toFixed(2),
                );
                setNumber4(
                  (parseFloat(val.replace(/\,/g, '')) * rate['CNY']).toFixed(2),
                );
                setNumber5(
                  (parseFloat(val.replace(/\,/g, '')) * rate['JPY']).toFixed(2),
                );
                setNumber6(
                  (parseFloat(val.replace(/\,/g, '')) * rate['CAD']).toFixed(2),
                );
                setNumber7(
                  (parseFloat(val.replace(/\,/g, '')) * rate['AUD']).toFixed(2),
                );
                setNumber8(
                  (parseFloat(val.replace(/\,/g, '')) * rate['RUB']).toFixed(2),
                );
                setNumber9(
                  (parseFloat(val.replace(/\,/g, '')) * rate['SGD']).toFixed(2),
                );
              }}
              autoFocus={true}
            />
            <Text style={{color: 'white'}}>{currency1}</Text>
          </View>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <IconA name="arrow-right" size={30} color="white" />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              paddingVertical: 10,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <CountryPicker
              withAlphaFilter={true}
              countryCode={countryCode2}
              withFilter={true}
              withCurrency={true}
              withFlagButton={true}
              onSelect={country2 => {
                setCountry2(country2);
                setCountryCode2(country2.cca2);
                setNameCountry2(country2.name);
                setCurrency2(country2.currency[0]);
              }}
            />
            <Text style={{textAlign: 'center', fontSize: 13, color: 'white'}}>
              {nameCountry2}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="white"
              value={number2 > 0 ? b : 0}
              onChangeText={val => {
                setNumber2(parseFloat(val));
                setNumber1((parseFloat(val) / rate[`${currency2}`]).toFixed(2));
              }}
            />
            <Text style={{color: 'white'}}>{currency2}</Text>
          </View>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: '#e1e4e6',
          borderRadius: 10,
          height: '100%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 20,
            marginTop: 20,
          }}>
          <IconFt name="world-o" size={22} />
          <Text style={{marginLeft: 15, fontSize: 20}}>
            Một số loại tiền thông dụng khác
          </Text>
        </View>
        <View style={styles.Container}>
          <View style={styles.Row}>
            <View style={styles.subContainer}>
              <Image
                source={require('../assets/flags/gb-nir.png')}
                style={styles.image}
              />
              <Text style={styles.txtName}>United Kingdom</Text>
            </View>
            <View style={styles.subContainer}>
              <Text style={styles.txtName}>
                {number3?.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
              </Text>
              <Text style={styles.txtName}>GBP</Text>
            </View>
          </View>
        </View>
        <View style={styles.Container}>
          <View style={styles.Row}>
            <View style={styles.subContainer}>
              <Image
                source={require('../assets/flags/cn.png')}
                style={styles.image}
              />
              <Text style={styles.txtName}>China</Text>
            </View>
            <View style={styles.subContainer}>
              <Text style={styles.txtName}>
                {number4?.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
              </Text>
              <Text style={styles.txtName}>CNY</Text>
            </View>
          </View>
        </View>
        <View style={styles.Container}>
          <View style={styles.Row}>
            <View style={styles.subContainer}>
              <Image
                source={require('../assets/flags/jp.png')}
                style={styles.image}
              />
              <Text style={styles.txtName}>Japan</Text>
            </View>
            <View style={styles.subContainer}>
              <Text style={styles.txtName}>
                {number5?.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
              </Text>
              <Text style={styles.txtName}>JPY</Text>
            </View>
          </View>
        </View>
        <View style={styles.Container}>
          <View style={styles.Row}>
            <View style={styles.subContainer}>
              <Image
                source={require('../assets/flags/ca.png')}
                style={styles.image}
              />
              <Text style={styles.txtName}>Canadian</Text>
            </View>
            <View style={styles.subContainer}>
              <Text style={styles.txtName}>
                {number6?.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
              </Text>
              <Text style={styles.txtName}>CAD</Text>
            </View>
          </View>
        </View>
        <View style={styles.Container}>
          <View style={styles.Row}>
            <View style={styles.subContainer}>
              <Image
                source={require('../assets/flags/au.png')}
                style={styles.image}
              />
              <Text style={styles.txtName}>Australia</Text>
            </View>
            <View style={styles.subContainer}>
              <Text style={styles.txtName}>
                {number7?.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
              </Text>
              <Text style={styles.txtName}>AUD</Text>
            </View>
          </View>
        </View>
        <View style={styles.Container}>
          <View style={styles.Row}>
            <View style={styles.subContainer}>
              <Image
                source={require('../assets/flags/ru.png')}
                style={styles.image}
              />
              <Text style={styles.txtName}>Rusian</Text>
            </View>
            <View style={styles.subContainer}>
              <Text style={styles.txtName}>
                {number8?.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
              </Text>
              <Text style={styles.txtName}>RUB</Text>
            </View>
          </View>
        </View>
        <View style={styles.Container}>
          <View style={styles.Row}>
            <View style={styles.subContainer}>
              <Image
                source={require('../assets/flags/sg.png')}
                style={styles.image}
              />
              <Text style={styles.txtName}>Singapore</Text>
            </View>
            <View style={styles.subContainer}>
              <Text style={styles.txtName}>
                {number9?.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
              </Text>
              <Text style={styles.txtName}>SGD</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    color: 'white',
    textAlign: 'center',
  },
  Container: {
    padding: 10,
  },
  Row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#888d94',
    borderBottomWidth: 0.5,
    alignItems: 'center',
  },
  txtName: {
    marginLeft: 10,
  },
  subContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'center',
  },
});
export default ConverterCurrency;
