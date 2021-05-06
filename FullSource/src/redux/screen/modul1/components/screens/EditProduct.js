import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  RefreshControl
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import {Input} from 'react-native-elements'
import {
  updateProductAction,
  deleteProductAction,
} from '../../../../actions/index';
function EditProduct(props) {
  const {item} = props.route.params;
  const [nameProduct, setNameProduct] = useState(item.nameProduct);
  const [valueProduct, setValueProduct] = useState(
    item.valueProduct.toString(),
  );
  const [imageProduct, setImageProduct] = useState(item.imageProduct);
  const [noteProduct, setNoteProduct] = useState(item.noteProdcut);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  function onBack() {
    props.navigation.goBack();
  }

  function onDelete(id) {
    dispatch(deleteProductAction(id));
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
      props.navigation.navigate('Sản phẩm');
    }, 1000);
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

  function updateProduct(
    nameProduct,
    valueProduct,
    imageProduct,
    noteProduct,
    id,
  ) {
    if (nameProduct && valueProduct) {
      console.log('run update Product');
      let obj = {id, nameProduct, valueProduct, imageProduct, noteProduct};
      dispatch(updateProductAction(obj));
      setRefreshing(true)
      setTimeout(() => {
        props.navigation.goBack();
        setRefreshing(false)
      }, 1000);
    }
   else {
     alert("xen lại thông tin tên và giá :>")
   }
  }
  function onChangeTextValue(text) {
    if (text) {
      setValueProduct(parseInt(text.replace(/\,/g, '')));
    } else {
      setValueProduct(0);
    }
  }

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} />}
    style={{flex: 1}}>
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
          <Text style={{color: 'white', fontSize: 18}}>
            Sửa thông tin sản phẩm
          </Text>
          <TouchableOpacity onPress={() => onDelete(item.id)}>
            <Feather name="trash-2" color="white" size={26} />
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
          <View style={{position:"absolute", marginLeft:"81%"}}>
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
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          width: '90%',
          justifyContent: 'flex-end',
          alignSelf: 'center',
          marginBottom:20
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
            updateProduct(
              nameProduct,
              parseInt(valueProduct),
              imageProduct,
              noteProduct,
              item.id,
            )
          }
          style={{
            height: 50,
            width: 120,
            borderRadius: 5,
            backgroundColor: '#0641cc',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white'}}>Cập nhật</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default EditProduct;
