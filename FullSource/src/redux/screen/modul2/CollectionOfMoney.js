import React from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#c1c9c4',
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    backgroundColor: '#d8d9d4',
  },
  text: {
    marginLeft: 20,
  },
});

const CollectionOfMoney = ({navigation}) => {
  let category2 = {nameImg: '', title: '', spendmoney: null};
  return (
    <View style={styles.Container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: 10}}>
        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            category2.spendmoney = false;
            category2.nameImg = 'sale';
            category2.title = 'Bán đồ';
            navigation.navigate('AddBill', category2);
          }}>
          <Image source={require('../assets/sale.png')} style={styles.image} />
          <Text>Bán đồ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            category2.spendmoney = false;
            category2.nameImg = 'money';
            category2.title = 'Tiền lương';
            navigation.navigate('AddBill', category2);
          }}>
          <Image source={require('../assets/money.png')} style={styles.image} />
          <Text>Tiền lương</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            category2.spendmoney = false;
            category2.nameImg = 'trophy';
            category2.title = 'Tiền thưởng';
            navigation.navigate('AddBill', category2);
          }}>
          <Image
            source={require('../assets/trophy.png')}
            style={styles.image}
          />
          <Text>Tiền thưởng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            category2.spendmoney = false;
            category2.nameImg = 'salary';
            category2.title = 'Được tặng';
            navigation.navigate('AddBill', category2);
          }}>
          <Image
            source={require('../assets/salary.png')}
            style={styles.image}
          />
          <Text>Được tặng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            category2.spendmoney = false;
            category2.nameImg = 'discount';
            category2.title = 'Tiền lãi';
            navigation.navigate('AddBill', category2);
          }}>
          <Image
            source={require('../assets/discount.png')}
            style={styles.image}
          />
          <Text>Tiền lãi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            category2.spendmoney = false;
            category2.nameImg = 'present-box';
            category2.title = 'Thu nhập khác';
            navigation.navigate('AddBill', category2);
          }}>
          <Image
            source={require('../assets/present-box.png')}
            style={styles.image}
          />
          <Text>Thu nhập khác</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CollectionOfMoney;
