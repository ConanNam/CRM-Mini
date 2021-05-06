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

const Expenses2 = ({navigation}) => {
  let category = {nameImg: '', title: '', spendmoney: null};
  return (
    <View style={styles.Container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: 10}}>
        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            category.nameImg = 'orange-juice';
            category.title = 'Ăn uống';
            category.spendmoney = true;
            navigation.navigate('EditS', category);
          }}>
          <Image
            source={require('../assets/orange-juice.png')}
            style={styles.image}
          />
          <Text>Ăn uống</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            category.nameImg = 'car';
            category.title = 'Di chuyển';
            category.spendmoney = true;
            navigation.navigate('EditS', category);
          }}>
          <Image source={require('../assets/car.png')} style={styles.image} />
          <Text>Di chuyển</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            category.nameImg = 'game-console';
            category.title = 'Giải trí';
            category.spendmoney = true;
            navigation.navigate('EditS', category);
          }}>
          <Image
            source={require('../assets/game-console.png')}
            style={styles.image}
          />
          <Text>Giải trí</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            category.nameImg = 'house';
            category.title = 'Gia đình';
            category.spendmoney = true;
            navigation.navigate('EditS', category);
          }}>
          <Image source={require('../assets/house.png')} style={styles.image} />
          <Text>Gia đình</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            category.nameImg = 'insurance';
            category.title = 'Bảo hiểm';
            category.spendmoney = true;
            navigation.navigate('EditS', category);
          }}>
          <Image
            source={require('../assets/insurance.png')}
            style={styles.image}
          />
          <Text>Bảo hiểm</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            category.nameImg = 'gift-box';
            category.title = 'Quà tặng và quyên góp';
            category.spendmoney = true;
            navigation.navigate('EditS', category);
          }}>
          <Image
            source={require('../assets/gift-box.png')}
            style={styles.image}
          />
          <Text>Quà tặng và quyên góp</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            category.nameImg = 'university';
            category.title = 'Giáo dục';
            category.spendmoney = true;
            navigation.navigate('EditS', category);
          }}>
          <Image
            source={require('../assets/university.png')}
            style={styles.image}
          />
          <Text>Giáo dục</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            category.nameImg = 'heartbeat';
            category.title = 'Sức khỏe';
            category.spendmoney = true;
            navigation.navigate('EditS', category);
          }}>
          <Image
            source={require('../assets/heartbeat.png')}
            style={styles.image}
          />
          <Text>Sức khỏe</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            category.nameImg = 'invoice';
            category.title = 'Hóa đơn';
            category.spendmoney = true;
            navigation.navigate('EditS', category);
          }}>
          <Image
            source={require('../assets/invoice.png')}
            style={styles.image}
          />
          <Text>Hóa đơn</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            category.nameImg = 'like';
            category.title = 'Bạn bè và người yêu';
            category.spendmoney = true;
            navigation.navigate('EditS', category);
          }}>
          <Image source={require('../assets/like.png')} style={styles.image} />
          <Text>Bạn bè và người yêu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            category.nameImg = 'shop';
            category.title = 'Mua sắm';
            category.spendmoney = true;
            navigation.navigate('EditS', category);
          }}>
          <Image source={require('../assets/shop.png')} style={styles.image} />
          <Text>Mua sắm</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            category.nameImg = 'analytics';
            category.title = 'Đầu tư';
            category.spendmoney = true;
            navigation.navigate('EditS', category);
          }}>
          <Image
            source={require('../assets/analytics.png')}
            style={styles.image}
          />
          <Text>Đầu tư</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            category.nameImg = 'present-box';
            category.title = 'Các chi phí khác';
            category.spendmoney = true;
            navigation.navigate('EditS', category);
          }}>
          <Image
            source={require('../assets/present-box.png')}
            style={styles.image}
          />
          <Text>Các chi phí khác</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Expenses2;
