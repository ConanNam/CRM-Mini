import React from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';

const Wellcome = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Image
        source={require('../assets/icon-welcome.png')}
        style={{width: 300, height: 300, resizeMode: 'contain'}}
      />
      <Text style={{fontSize: 25}}>Chào mừng bạn trở lại!</Text>
      <View style={styles.footer}>
        <TouchableOpacity
          style={{
            backgroundColor: '#b50000',
            width: 250,
            padding: 12,
            borderRadius: 10,
          }}
          onPress={() => {
            navigation.navigate('OverViewTabs', {screen: 'OverView'});
          }}>
          <Text style={{color: 'white', textAlign: 'center', fontSize: 20}}>
            TIẾP TỤC
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Wellcome;

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
