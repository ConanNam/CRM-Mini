import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {View, ScrollView, Text} from 'react-native';

import {useSelector} from 'react-redux';

function OverView(props) {
  const data = useSelector(state => state.HomeReducer.dataPlace);
  console.log(`data`, data);
  const [revenue, setRevenue] = useState(0);
  const [newPlace, setNewPlace] = useState(0);
  const [cancelPlace, setCancelPlace] = useState(0);
  const [donePlace, setDonePlace] = useState(0);

  useEffect(() => {
    let lenPlace = data?.length;
    let tongPrice = 0;
    let n = 0;
    let c = 0;
    let d = 0;
    for (let k = 0; k < lenPlace; k++) {
      let lenPlace_Product = data[k].Place_Product.length;
      switch (data[k].place.statusOrder) {
        case 'New':
          n += 1;
          break;
        case 'Done':
          d += 1;
          break;
        case 'Cancel':
          c += 1;
          break;
        default:
          break;
      }
      let tong = 0;
      for (let v = 0; v < lenPlace_Product; v++) {
        tong += Math.floor(
          (1 - data[k].Place_Product[v].discount / 100) *
            data[k].Place_Product[v].valueProduct *
            data[k].Place_Product[v].quantity,
        );
      }
      tongPrice += tong;
    }
    setRevenue(tongPrice);
    setCancelPlace(c);
    setDonePlace(d);
    setNewPlace(n);
  }, [data]);
  function changeEdit(item) {
    props.navigation.navigate('EditPlace', {item: item});
  }
  function sumPrice(item) {
    let tong = 0;
    for (let k = 0; k < item.length; k++) {
      tong += Math.floor(
        (1 - item[k].discount / 100) * item[k].valueProduct * item[k].quantity,
      );
    }
    return tong.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  const RenderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => changeEdit(item)}
        style={{
          width: '95%',
          alignSelf: 'center',
          height: 30,
          borderBottomWidth:0.5, borderBottomColor:"gray",
          justifyContent: 'space-between',
          borderRadius: 5,
          marginBottom: 10,
          flexDirection:"row"
        }}>
        <Text style={{fontSize: 18}}>{item.custom?.name}</Text>
        <Text>{sumPrice(item.Place_Product)}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={{flex: 1}}>
      <View
        style={{
          backgroundColor: '#b50000',
          height: 220,
          width: '100%',
          flex: 1,
          borderBottomLeftRadius: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: 130,
            width: 300,
            backgroundColor: 'white',
            borderRadius: 10,
          }}>
          <View style={{width: '90%', alignSelf: 'center'}}>
            <Text
              style={{
                alignSelf: 'center',
                marginTop: 10,
                fontSize: 18,
                fontWeight: 'bold',
                color: 'gray',
              }}>
              Doanh thu
            </Text>
            <Text style={{alignSelf: 'center'}}>
              {revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Đ
            </Text>
          </View>
          <View
            style={{
              borderTopWidth: 0.5,
              borderTopColor: 'gray',
              width: '95%',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignSelf: 'center',
              marginTop: 5,
            }}>
            <View style={{}}>
              <Text style={{alignSelf: 'center', marginTop: 10}}>
                Đơn hàng mới
              </Text>
              <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>
                {newPlace}
              </Text>
            </View>
            <View style={{}}>
              <Text style={{alignSelf: 'center', marginTop: 10}}>Đơn hủy</Text>
              <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>
                {cancelPlace}
              </Text>
            </View>
            <View style={{}}>
              <Text style={{alignSelf: 'center', marginTop: 10}}>
                Đơn hoàn thành
              </Text>
              <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>
                {donePlace}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style ={{width:"95%", alignSelf:"center", marginTop:10}}>
      <Text style ={{fontSize:18}}>Tổng đơn hàng: {data.length}</Text>
      </View>
      
      <View style={{marginTop: 10}}>
        {data?.map((item, index) => (
          <RenderItem item={item} key={index} />
        ))}
      </View>
    </ScrollView>
  );
}

export default OverView;
