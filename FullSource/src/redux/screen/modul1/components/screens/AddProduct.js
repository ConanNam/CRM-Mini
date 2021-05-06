import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {addProductAction} from '../../../../actions/index';
import {Input} from 'react-native-elements';

function AddProduct(props) {
  const [nameProduct, setNameProduct] = useState('');
  const [valueProduct, setValueProduct] = useState(0);
  const [imageProduct, setImageProduct] = useState(
    'https://topthuthuat.com/wp/wp-content/uploads/2017/07/android.jpg',
  );
  const [noteProduct, setNoteProduct] = useState('');
  const [check, setCheck] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();

  function onBack() {
    props.navigation.goBack();
  }

  function onAdd(nameProduct, valueProduct, imageProduct, noteProduct) {
    if (nameProduct && valueProduct) {
      setCheck(false);
      let obj = {nameProduct, valueProduct, imageProduct, noteProduct};
      dispatch(addProductAction(obj));
      setRefreshing(true);
      setTimeout(() => {
        setNameProduct('');
        setValueProduct(0);
        setImageProduct(
          'https://topthuthuat.com/wp/wp-content/uploads/2017/07/android.jpg',
        );
        setNoteProduct('');
        setRefreshing(false);
        props.navigation.goBack();
      }, 2000);
    } else {
      setCheck(true);
    }
  }

  function editImage() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setImageProduct(image.path);
      })
      .catch(err => {
        return console.log(err);
      });
  }

  function onChangeTextValue(text) {
    if (text) {
      setValueProduct(parseInt(text.replace(/\,/g, '')));
    } else {
      setValueProduct(0);
    }
  }
  return (
    <ScrollView
      style={{flex: 1}}
      refreshControl={<RefreshControl refreshing={refreshing} />}>
      {/* Header */}
      <View style={{width: '100%', backgroundColor: '#34a4eb'}}>
        <View
          style={{
            width: '90%',
            height: 60,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignSelf: 'center',
          }}>
          <TouchableOpacity onPress={onBack}>
            <Feather name="arrow-left" color="white" size={26} />
          </TouchableOpacity>
          <Text style={{color: 'white', fontSize: 18}}>Thêm sản phẩm</Text>
          <TouchableOpacity
            onPress={() =>
              onAdd(nameProduct, valueProduct, imageProduct, noteProduct)
            }>
            <Feather name="check" color="white" size={26} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{width: '90%', height: 230, marginTop: 10, alignSelf: 'center'}}>
        <TouchableOpacity onPress={editImage}>
          <Image
            style={{
              width: 200,
              height: 200,
              borderRadius: 0,
              alignSelf: 'center',
            }}
            source={{uri: imageProduct}}
          />
          <View style={{position: 'absolute', marginLeft: '81%'}}>
            <Feather name="edit-3" color="black" size={24} />
          </View>
        </TouchableOpacity>
      </View>
          <Input
           containerStyle ={{ height:90}}
           leftIcon={<Feather name="user" size={24} color="gray" style ={{marginLeft:2}} />}
            inputContainerStyle={{borderWidth: 1, marginTop:5, borderRadius:5}}
          label = "Tên sản phẩm"
            placeholder="Tên sản phẩm"
            value={nameProduct}
            onChangeText={setNameProduct}
          />
          <Input
           containerStyle ={{ height:90}}
              label="Giá sản phẩm*"
              leftIcon={<Icon name="money" size={20} color="gray" style ={{marginLeft:2}} />}
              inputContainerStyle={{borderWidth: 1, marginTop:5, borderRadius:5}}
            value={valueProduct
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            keyboardType="numeric"
            onChangeText={text => {
              onChangeTextValue(text);
            }}
           
          />
      <Input
       containerStyle ={{ height:90}}
        value={noteProduct}
        onChangeText={setNoteProduct}
        placeholder="Ghi chú"
        label="Ghi chú*"
        leftIcon={<Feather name="file-text" size={24} color="gray" />}
        inputContainerStyle={{borderWidth: 1, marginTop:5, borderRadius:5}}
      />
      {check ? (
        <Text style={{color: 'red', marginTop: 20, alignSelf: 'center'}}>
          Kiểm tra thông tin tên, giá sản phẩm :v
        </Text>
      ) : (
        <View />
      )}
    </ScrollView>
  );
}

export default AddProduct;
