import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Foundation';
import {useDispatch} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {deletePlaceAction, updatePlaceAction} from '../../../../actions/index';
import {Input} from 'react-native-elements';
import Moment from 'moment';
import {duration} from 'moment';

const dataListState = [
  {id: 1, title: 'New'},
  {id: 2, title: 'Done'},
  {id: 3, title: 'Cancel'},
];
function EditPlace(props) {
  const custom = props.route.params?.itemCustom;
  const itemProduct = props.route.params?.itemProduct;
  const item = props.route.params?.item;
  const code = props.route.params?.code;
  // console.log('custom :>> ', custom);
  // console.log('itemProduct :>> ', itemProduct);
  console.log('item :>> ', item);
  const [dataProduct, setDataProduct] = useState(item?.Place_Product || []);
  const [itemCustom, setItemCustom] = useState(item?.custom || []);
  const [notePlace, setNotePlace] = useState('');
  const [statusPlace, setStatusPlace] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [showListState, setShowListState] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(`item`, item);
    console.log('1111111111111111');
    setDataProduct(item?.Place_Product);
    setItemCustom(item?.custom);
    setNotePlace(item?.place.noteOrder);
    setStatusPlace(item?.place.statusOrder);
  }, [item]);

  useEffect(() => {
    if (custom) {
      setItemCustom(custom);
    }
  }, [custom]);

  useEffect(() => {
    if (itemProduct) {
      let check = true;
      for (let i = 0; i < dataProduct.length; i++) {
        if (itemProduct.id === dataProduct[i].id) {
          setDataProduct(x => {
            let index = x.findIndex(y => y.id === itemProduct.id);
            if (index !== -1) {
              x[index].quantity += 1;
            }
            return [...x];
          });
          check = false;
        }
      }
      if (check) {
        let obj = {
          id: itemProduct.id,
          nameProduct: itemProduct.nameProduct,
          valueProduct: itemProduct.valueProduct,
          noteProdcut: itemProduct.noteProdcut,
          imageProduct: itemProduct.imageProduct,
          discount: 0,
          quantity: 1,
        };
        setDataProduct(x => [...x, obj]);
      } else {
        check = true;
      }
    }
  }, [itemProduct]);

  function onBack() {
    if (code === 10) {
      props.navigation.navigate('OverViewTabs', {
        screen: 'ListSE',
        params: {
          showSale: true,
        },
      });
    } else if (code === 11) {
      props.navigation.navigate('HomeTodo');
    } else {
      props.navigation.goBack();
    }
  }

  // price
  function price(item) {
    let priceProduct = Math.floor(
      (1 - item.discount / 100) * item.valueProduct,
    );
    return priceProduct.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function sumPrice() {
    let tong = 0;
    for (let k = 0; k < dataProduct.length; k++) {
      tong += Math.floor(
        (1 - dataProduct[k].discount / 100) *
          dataProduct[k].valueProduct *
          dataProduct[k].quantity,
      );
    }
    return tong.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function changeDiscount(text, item) {
    if (text) {
      setDataProduct(x => {
        let index = x.findIndex(y => y.id === item.id);
        if (index !== -1) {
          x[index].discount = parseInt(text);
        }
        return [...x];
      });
    } else {
      setDataProduct(x => {
        let index = x.findIndex(y => y.id === item.id);
        if (index !== -1) {
          x[index].discount = 0;
        }
        return [...x];
      });
    }
  }

  function updatePlace(itemCustom, dataProduct, notePlace, time, status) {
    console.log('--------------------------UPDatePlace');
    if (dataProduct.length > 0) {
      console.log('--------------------------UPDatePlace');
      let idPlace = item.place.id;
      let a = {
        custom: itemCustom,
        dataListProduct: dataProduct,
        notePlace: notePlace,
        timeOrder: time,
        statusOrder: status,
        id: idPlace,
      };
      dispatch(updatePlaceAction(a));
      setRefreshing(true);
      setTimeout(() => {
        if (code === 10) {
          props.navigation.navigate('OverViewTabs', {
            screen: 'ListSE',
            params: {
              showSale: true,
            },
          });
        } else if (code === 11) {
          props.navigation.push('HomeTodo');
        } else {
          props.navigation.goBack();
        }

        setRefreshing(false);
      }, 2000);
    } else {
      alert('không có sản phẩm trong đơn hàng, bạn nên xóa đơn hàng:v');
    }
  }

  function onShowStatus() {
    setShowListState(!showListState);
  }
  const RenderItemProduct = ({item}) => {
    return (
      <View
        style={{
          width: '95%',
          alignSelf: 'center',
          borderBottomWidth: 0.5,
          borderBottomColor: 'gray',
          marginTop: 10,
          borderRadius: 5,
          marginBottom: 10,
        }}>
        <View
          style={{
            width: '95%',
            alignSelf: 'center',
            flexDirection: 'row',
            borderRadius: 5,
          }}>
          <View
            style={{
              width: '20%',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Image
              style={{height: 80, width: 80, borderRadius: 40}}
              source={{uri: item.imageProduct}}
            />
          </View>
          <View
            style={{marginLeft: 20, justifyContent: 'center', width: '73%'}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 18}}>Tên Sp: {item.nameProduct}</Text>
              <TouchableOpacity onPress={() => deleteItem(item)} style={{}}>
                <Feather name="x-circle" size={20} color="#b50000" />
              </TouchableOpacity>
            </View>

            <Text style={{marginTop: 5, fontWeight: 'bold'}}>
              Giá gốc:{' '}
              {item.valueProduct
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
              đ
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{alignItems: 'center'}}>Giảm giá: </Text>
              <TextInput
                value={item.discount.toString()}
                style={{
                  height: 40,
                  width: 60,
                  borderRadius: 10,
                  paddingLeft: 5,
                }}
                keyboardType="numeric"
                onChangeText={text => changeDiscount(text, item)}
              />
              <Text style={{alignItems: 'center'}}> %</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '60%',
              }}>
              {item.quantity > 1 ? (
                <TouchableOpacity onPress={() => minusQuantity(item)}>
                  <Feather name="minus-circle" size={20} color="black" />
                </TouchableOpacity>
              ) : (
                <View />
              )}
              <Text style={{}}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => plusQuantity(item)}>
                <Feather name="plus-circle" size={20} color="black" />
              </TouchableOpacity>
            </View>
            <Text style={{marginTop: 5, fontWeight: 'bold', marginBottom: 10}}>
              Giá : {price(item)} đ
            </Text>
          </View>
        </View>
      </View>
    );
  };

  function changeToListCustom() {
    props.navigation.navigate('ListCustom', {code: 3});
  }
  function changeToListProduct() {
    props.navigation.navigate('ListProduct', {code: 1});
  }

  function plusQuantity(item) {
    setDataProduct(x => {
      let index = x.findIndex(y => y.id === item.id);
      if (index !== -1) {
        x[index].quantity += 1;
      }
      return [...x];
    });
  }

  function minusQuantity(item) {
    setDataProduct(x => {
      let index = x.findIndex(y => y.id === item.id);
      if (index !== -1) {
        x[index].quantity -= 1;
      }
      return [...x];
    });
  }

  function deleteItem(item) {
    setDataProduct(x => {
      let index = x.findIndex(y => y.id === item.id);
      if (index !== -1) {
        let arr = [...dataProduct];
        arr.splice(index, 1);
        return arr;
      }
    });
  }

  function onAddPlace(id) {
    console.log('xaos', id);
    dispatch(deletePlaceAction(id));
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      if (code === 10) {
        props.navigation.navigate('OverViewTabs', {
          screen: 'ListSE',
          params: {
            showSale: true,
          },
        });
      } else if (code === 11) {
        props.navigation.push('HomeTodo');
      } else {
        props.navigation.navigate('Home');
      }
    }, 2000);
  }
  function setStatusPlace_(item) {
    setStatusPlace(item.title);
    setShowListState(false);
  }
  function iconList(id) {
    switch (id) {
      case 1:
        return <Icon name="burst-new" color="red" size={24} />;
      case 2:
        return <Icon name="check" color="gray" size={24} />;
      case 3:
        return <Icon name="x" color="gray" size={24} />;
      default:
        return <Icon name="burst-new" color="red" size={24} />;
    }
  }
  const RenderItemStatus = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => setStatusPlace_(item)}
        style={{
          width: '95%',
          alignSelf: 'center',
          flexDirection: 'row',
          borderColor: 'gray',
        }}>
        <View
          style={{
            width: '10%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {iconList(item.id)}
        </View>
        <View
          style={{alignItems: 'center', justifyContent: 'center', height: 40}}>
          <Text style={{}}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      {/* Header */}
      <View style={{width: '100%', backgroundColor: '#34a4eb'}}>
        <View
          style={{
            width: '95%',
            height: 60,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignSelf: 'center',
          }}>
          <TouchableOpacity onPress={onBack}>
            <Feather name="arrow-left" color="white" size={26} />
          </TouchableOpacity>
          <Text style={{color: 'white', fontSize: 18}}>Sửa đơn hàng</Text>
          <TouchableOpacity onPress={() => onAddPlace(item.place.id)}>
            <Feather name="trash-2" color="white" size={26} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} />}>
        <View style={{width: '95%', alignSelf: 'center'}}>
          <Text style={{fontSize: 18}}>
            {Moment(item?.place.timeOrder).format('DD/MM/yyyy HH:mm')}
          </Text>
          <Text style={{fontSize: 16, marginTop: 20}}>Khách hàng</Text>
          {itemCustom ? (
            <View />
          ) : (
            <TouchableOpacity onPress={changeToListCustom}>
              <Feather
                name="plus-circle"
                size={20}
                style={{marginTop: 20, marginLeft: 10}}
              />
            </TouchableOpacity>
          )}
        </View>
        {itemCustom ? (
          <TouchableOpacity style={{}} onPress={() => changeToListCustom()}>
            <View
              style={{
                width: '95%',
                alignSelf: 'center',
                flexDirection: 'row',
                borderBottomWidth: 0.5,
                borderBottomColor: 'gray',
                marginTop: 10,
                borderRadius: 5,
                marginBottom: 10,
              }}>
              <View
                style={{
                  width: '30%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                  marginBottom: 10,
                }}>
                <Image
                  style={{height: 80, width: 80, borderRadius: 40}}
                  source={{uri: itemCustom.image}}
                />
              </View>
              <View style={{marginLeft: 10, justifyContent: 'center'}}>
                <Text style={{fontSize: 18}}>{itemCustom.name}</Text>
                <Text style={{marginTop: 5}}>SĐT: {itemCustom.phone}</Text>
                <Text style={{marginTop: 5}}>
                  Địa chỉ: {itemCustom.address}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <View />
        )}
        <View style={{width: '95%', alignSelf: 'center', flexDirection: 'row'}}>
          <Text style={{fontSize: 16, marginTop: 20}}>Sản phẩm</Text>

          <TouchableOpacity onPress={changeToListProduct}>
            <Feather
              name="plus-circle"
              size={20}
              style={{marginTop: 20, marginLeft: 10}}
            />
          </TouchableOpacity>
        </View>
        {dataProduct?.map((item, index) => (
          <RenderItemProduct item={item} key={index} />
        ))}
        <Input
          containerStyle={{height: 90}}
          leftIcon={
            <Feather
              name="file-text"
              size={24}
              color="gray"
              style={{marginLeft: 2}}
            />
          }
          inputContainerStyle={{borderWidth: 1, marginTop: 5, borderRadius: 5}}
          label="Ghi chú"
          placeholder="Ghi chú"
          value={notePlace}
          onChangeText={setNotePlace}
        />
        <TouchableOpacity
          onPress={onShowStatus}
          style={{
            width: '95%',
            alignSelf: 'center',
            flexDirection: 'row',
            borderRadius: 5,
            borderWidth: 1,
            borderColor: 'gray',
            marginTop: 10,
          }}>
          <View
            style={{
              width: '10%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Feather name="star" color="gray" size={24} />
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
            }}>
            <Text style={{}}>{statusPlace}</Text>
          </View>
        </TouchableOpacity>
        <ScrollView>
          {showListState ? (
            dataListState.map((item, index) => (
              <RenderItemStatus item={item} key={index} />
            ))
          ) : (
            <View />
          )}
        </ScrollView>
        <View style={{flexDirection: 'row', marginLeft: '5%', marginTop: 20}}>
          <Text style={{fontWeight: 'bold', fontSize: 20, color: '#0542a3'}}>
            Tổng tiền : {sumPrice()} đ
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            width: '95%',
            justifyContent: 'flex-end',
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            style={{
              height: 50,
              width: 120,
              borderRadius: 5,
              backgroundColor: '#ed422f',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}>
            <Text style={{color: 'white'}}>Hủy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              updatePlace(
                itemCustom,
                dataProduct,
                notePlace,
                item?.place.timeOrder,
                statusPlace,
              )
            }
            style={{
              height: 50,
              width: 120,
              borderRadius: 5,
              backgroundColor: '#0641cc',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <Text style={{color: 'white'}}>Cập nhật</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default EditPlace;
