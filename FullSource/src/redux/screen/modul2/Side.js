import {StackActions} from '@react-navigation/routers';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import Wellcome from './Wellcome';
import OverView from './OverView';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {MyTabs} from '../Navigation';

const styles = StyleSheet.create({
  Container: {
    margin: 10,
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    textAlign: 'center',
  },
  body: {
    flex: 3,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 15,
    resizeMode: 'contain',
  },
});

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const Side = ({route, navigation}) => {
  const [walletName, setWalletName] = useState('Tiền mặt');
  const [totalMoney, setTotalMoney] = useState('');
  const [isWellCome, setIsWellCome] = useState(false);

  let isdel = route.params?.isdel;

  const a = totalMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  useEffect(async () => {
    try {
      const value = await AsyncStorage.getItem('header');
      if (value !== null) {
        setIsWellCome(true);
      }
    } catch (error) {
      console.log('side :', error);
    }
  }, []);

  useEffect(() => {
    if (isdel === true) {
      setIsWellCome(false);
    }
  }, [isdel]);

  if (isWellCome) {
    return <MyTabs />;
  } else {
    return (
      <SafeAreaView style={styles.Container}>
        <View style={{flex: 1}}>
          <View style={styles.header}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>
              Đầu tiên, hãy tạo ví
            </Text>
          </View>
          <View style={styles.body}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                style={styles.image}
                source={require('../assets/wallet.png')}
              />
            </View>
            <View
              style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
              <Text
                style={{
                  fontSize: 25,
                  color: '#b8b8b8',
                  marginTop: 20,
                  marginLeft: 8,
                }}>
                Tên ví
              </Text>
              <View
                style={{
                  borderColor: 'gray',
                  borderWidth: 0.5,
                  borderRadius: 10,
                  padding: 10,
                  width: '100%',
                }}>
                <TextInput
                  autoFocus={true}
                  defaultValue="Tiền mặt"
                  style={{
                    padding: 0,
                    width: '100%',
                    fontSize: 20,
                  }}
                  onChangeText={val => {
                    setWalletName(val);
                  }}
                />
              </View>
              <Text
                style={{
                  fontSize: 25,
                  color: '#b8b8b8',
                  marginTop: 10,
                  marginLeft: 8,
                }}>
                Số tiền hiện có
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderColor: 'gray',
                  borderWidth: 0.5,
                  borderRadius: 10,
                  width: '100%',
                  padding: 10,
                }}>
                <TextInput
                  autoFocus={true}
                  placeholder="0"
                  keyboardType="numeric"
                  style={{
                    padding: 0,
                    marginRight: 10,
                    width: '80%',
                    fontSize: 20,
                  }}
                  onChangeText={val => {
                    setTotalMoney(val.replace(/\,/g, ''));
                  }}
                  value={a}
                />
                <Text style={{fontSize: 20}}>VND</Text>
              </View>
            </View>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              style={{
                backgroundColor: '#b50000',
                width: '80%',
                padding: 10,
                borderRadius: 10,
              }}
              onPress={() => {
                let header = {
                  hWalletName: walletName,
                  hTotal: totalMoney,
                };
                storeData('header', header);
                navigation.dispatch(
                  StackActions.replace('OverViewTabs', {
                    screen: 'OverView',
                    params: {
                      nameW: walletName,
                      moneyW: totalMoney,
                    },
                  }),
                );
              }}>
              <Text style={{color: 'white', textAlign: 'center', fontSize: 20}}>
                TIẾP TỤC
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
};

export default Side;
