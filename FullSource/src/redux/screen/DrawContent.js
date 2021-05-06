import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
  Text,
  PermissionsAndroid,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import IconF from 'react-native-vector-icons/FontAwesome5';
import IconA from 'react-native-vector-icons/AntDesign';
import IconFe from 'react-native-vector-icons/Feather';
import IconI from 'react-native-vector-icons/Ionicons';
import Geolocation from '@react-native-community/geolocation';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';

const openWeatherKey = `50e84571dbe337604074ef3e73cfa370`;
const openWeatherKey2 = `d2307b5cea109f1be2239d2588f020a0`;
let url = `https://api.openweathermap.org/data/2.5/onecall?&units=metric&exclude=minutely&appid=${openWeatherKey}&lang=vi`;
let locationArr = [];

function image_weather1(a) {
  if (a == 'Clouds') {
    return require('./assets/cloud.png');
  } else if (a == 'Drizzle') {
    return require('./assets/cloudy_rain.png');
  } else if (a == 'Rain') {
    return require('./assets/rainnig.png');
  } else {
    return require('./assets/sun(2).png');
  }
}

const formatSrt = str => {
  let desc = str[0].toUpperCase() + str.substring(1, 100);
  return desc;
};

const DrawContent = ({props, navigation}) => {
  const [dataLocation, setDataLocation] = useState({});
  const [forecast, setForecast] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [showTool, setShowTool] = useState(false);

  const loadForecast = () => {
    setRefreshing(true);
    if (dataLocation.lat !== null && dataLocation.lon !== null) {
      var config = {
        method: 'get',
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${dataLocation.lat}&lon=${dataLocation.lon}&lang=vi&appid=50e84571dbe337604074ef3e73cfa370`,
        headers: {},
      };

      axios(config)
        .then(response => {
          setForecast(response.data);
        })
        .catch(function (error) {
          console.log('drawContent', error);
        });
    }
    setRefreshing(false);
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        let location = info.coords;
        setDataLocation({lat: location.latitude, lon: location.longitude});
      },
      error => console.log(error),
    );
  }, []);

  useEffect(() => {
    if (dataLocation.lat !== null && dataLocation.lon !== null) {
      loadForecast();
    }
  }, [dataLocation]);

  const current = forecast?.weather[0];
  console.log(current);
  return (
    <DrawerContentScrollView
      refreshControl={
        <RefreshControl
          onRefresh={() => {
            Geolocation.getCurrentPosition(
              info => {
                let location = info.coords;

                setDataLocation({
                  lat: location.latitude,
                  lon: location.longitude,
                });
              },
              error => console.log('Error local', error),
            );
            loadForecast();
          }}
          refreshing={refreshing}
        />
      }
      showsVerticalScrollIndicator={false}
      style={{flex: 1, padding: 5}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* <IconM
          name="category"
          size={30}
          color="#b50000"
          style={{marginLeft: 30}}
        /> */}
        <Text
          style={{
            fontSize: 38,
            textAlign: 'center',
            width: '60%',
          }}>
          Menu
        </Text>
      </View>
      {forecast !== null ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(52, 52, 52, 0.3)',
            borderRadius: 10,
            marginTop: 20,
          }}>
          <View style={styles.current}>
            <Image
              //style={styles.largeIcon}
              source={{
                uri: `https://openweathermap.org/img/wn/${current.icon}@4x.png`,
              }}
              style={{width: 120, height: 120, marginRight: 5}}
            />
            <View>
              <Text style={styles.currentTemp}>
                <Text>{Math.round(forecast.main.temp - 273.15)}°C</Text>
              </Text>
              <Text style={{fontSize: 15, color: 'white'}}>
                <Text>
                  Cảm giác như: {Math.round(forecast.main.feels_like - 273.15)}
                  °C
                </Text>
              </Text>
            </View>
          </View>
          <Text style={styles.currentDescription}>
            {formatSrt(current.description)}
          </Text>
        </View>
      ) : (
        <ActivityIndicator size="large" color="#b50000" />
      )}
      <View>
        <DrawerItem
          label="Đơn hàng"
          onPress={() => navigation.navigate('Sale')}
          labelStyle={{fontSize: 20, color: 'black'}}
          icon={() => <IconFe name="box" size={22} color="#b50000" />}
        />
        <DrawerItem
          label="Thu chi"
          onPress={() => navigation.navigate('Side')}
          labelStyle={{fontSize: 20, color: 'black'}}
          icon={() => (
            <IconI name="ios-wallet-sharp" size={22} color="#b50000" />
          )}
        />
        <DrawerItem
          label="Công việc"
          onPress={() => navigation.navigate('HomeTodo')}
          labelStyle={{fontSize: 20, color: 'black'}}
          icon={() => (
            <IconFA name="pencil-square-o" size={22} color="#b50000" />
          )}
        />
      </View>
      <View style={{marginLeft: 20, marginTop: 20}}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => setShowGame(!showGame)}>
          <IconI name="ios-game-controller-outline" size={25} color="#b50000" />
          <Text style={{fontSize: 20, marginLeft: 30, marginRight: 20}}>
            Mini game
          </Text>
          {showGame === false ? (
            <IconA name="down" size={16} color="#b50000" />
          ) : (
            <IconA name="up" size={16} color="#b50000" />
          )}
        </TouchableOpacity>
        {showGame === true ? (
          <View style={{marginLeft: 5}}>
            <DrawerItem
              label="Cờ caro 12x12"
              labelStyle={{fontSize: 15}}
              onPress={() => navigation.navigate('Caro')}
              icon={() => (
                <Image
                  source={require('./assets/tic-tac-toe.png')}
                  style={{width: 22, height: 22}}
                />
              )}
            />
            <DrawerItem
              label="2468"
              labelStyle={{fontSize: 15}}
              onPress={() => navigation.navigate('Game2468')}
              icon={() => (
                <Image
                  source={require('./assets/2048_logo.png')}
                  style={{width: 22, height: 22}}
                />
              )}
            />
          </View>
        ) : null}
      </View>
      <View style={{marginLeft: 20, marginTop: 35}}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => setShowTool(!showTool)}>
          <IconA name="tool" size={25} color="#b50000" />
          <Text style={{fontSize: 20, marginLeft: 30, marginRight: 38}}>
            Mini tool
          </Text>
          {showTool === false ? (
            <IconA name="down" size={16} color="#b50000" />
          ) : (
            <IconA name="up" size={16} color="#b50000" />
          )}
        </TouchableOpacity>
        {showTool === true ? (
          <View style={{marginLeft: 5}}>
            <DrawerItem
              label="Thời tiết"
              labelStyle={{fontSize: 15}}
              onPress={() => navigation.navigate('WeatherFocast')}
              icon={() => (
                <Image
                  source={require('./assets/sun.png')}
                  style={{width: 22, height: 22}}
                />
              )}
            />
            <DrawerItem
              label="Tính giá điện"
              labelStyle={{fontSize: 15}}
              onPress={() => navigation.navigate('Electric')}
              icon={() => (
                <Image
                  source={require('./assets/electricity-bill.png')}
                  style={{width: 22, height: 22}}
                />
              )}
            />
            <DrawerItem
              label="Converter gross - net"
              labelStyle={{fontSize: 15}}
              onPress={() => navigation.navigate('GrossToNet')}
              icon={() => (
                <Image
                  source={require('./assets/gross.png')}
                  style={{width: 22, height: 22}}
                />
              )}
            />
            <DrawerItem
              label="Converter currency"
              labelStyle={{fontSize: 15}}
              onPress={() => navigation.navigate('ConverterCurrency')}
              icon={() => (
                <Image
                  source={require('./assets/exchange.png')}
                  style={{width: 22, height: 22}}
                />
              )}
            />
            <DrawerItem
              label="Covid 19"
              labelStyle={{fontSize: 15}}
              onPress={() => navigation.navigate('Covid19')}
              icon={() => (
                <Image
                  source={require('./assets/doctor.png')}
                  style={{width: 22, height: 22}}
                />
              )}
            />
          </View>
        ) : (
          <View style={{height: 50}}></View>
        )}
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    width: '100%',
    textAlign: 'center',
    fontSize: 42,
    color: 'white',
  },
  subtitle: {
    fontSize: 24,
    marginVertical: 12,
    marginLeft: 20,
    color: 'white',
    padding: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  current: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  currentTemp: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  currentDescription: {
    width: '100%',
    textAlign: 'center',
    fontWeight: '200',
    fontSize: 24,
    marginBottom: 24,
    color: 'white',
  },
  hour: {
    padding: 6,
    alignItems: 'center',
  },
  day: {
    flexDirection: 'row',
    marginLeft: 20,
  },
  dayDetails: {
    justifyContent: 'center',
  },
  dayTemp: {
    marginLeft: 12,
    alignSelf: 'center',
    fontSize: 20,
    color: 'white',
  },
  largeIcon: {
    width: 60,
    height: 60,
  },
  smallIcon: {
    width: 100,
    height: 100,
  },
  childrentDetailContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.3)',
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderRadius: 10,
  },
});

export default DrawContent;
