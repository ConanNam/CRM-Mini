import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  ScrollView,
  RefreshControl,
  TextInput
} from 'react-native';
import {Input} from 'react-native-elements'
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {addCustomAction} from '../../../../actions/index';
function AddCustom(props) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState(
    'https://st.quantrimang.com/photos/image/072015/22/avatar.jpg',
  );
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [check, setCheck] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  function onBack() {
    props.navigation.goBack();
  }

  function onAdd(name, phone, address, image, note) {
    if (name.length > 0 && phone.match( /(84|0[3|5|7|8|9])+([0-9]{8})\b/g) && address.length > 0) {
      setCheck(false);
      let newCustom = {name, phone, address, image, note, stateCustomer:1};
      dispatch(addCustomAction(newCustom));
      setRefreshing(true);
      setTimeout(() => {
        setFullName('');
        setImage(
          'https://st.quantrimang.com/photos/image/072015/22/avatar.jpg',
        );
        setNote('');
        setAddress('');
        setPhone('');
        setRefreshing(false);
        props.navigation.goBack();
      }, 1000);
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
        setImage(image.path);
      })
      .catch(err => {
        return console.log(err);
      });
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
          <Text style={{color: 'white', fontSize: 18}}>Thêm khách hàng</Text>
          <TouchableOpacity
            onPress={() => onAdd(fullName, phone, address, image, note)}>
            <Feather name="check" color="white" size={26} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{width: '90%', height: 230, marginTop: 10, alignSelf: 'center'}}>
        <TouchableOpacity onPress={editImage}>
        <View style={{position:"absolute", marginLeft:"68%"}}>
            <Feather name="edit-3" color="black" size={24} />
          </View>
          <Image
            style={{
              width: 200,
              height: 200,
              borderRadius: 200,
              alignSelf: 'center',
            }}
            source={{uri: image}}
          />
         
        </TouchableOpacity>
      </View>
      <Input
       containerStyle ={{ height:90}}
           leftIcon={<Feather name="user" size={24} color="gray" style ={{marginLeft:2}} />}
            inputContainerStyle={{borderWidth: 1, marginTop:5, borderRadius:5}}
          label = "Họ tên"
            placeholder="Họ tên "
            value={fullName}
            onChangeText={setFullName}
          />
           <Input
           containerStyle ={{ height:90}}
           leftIcon={<Feather name="phone" size={24} color="gray" style ={{marginLeft:2}} />}
            inputContainerStyle={{borderWidth: 1, marginTop:5, borderRadius:5}}
            keyboardType ="numeric"
          label = "SĐT"
            placeholder="Số điện thoại"
            value={phone}
            onChangeText={setPhone}
          />
          <Input
          containerStyle ={{ height:90}}
           leftIcon={<Feather name="map-pin" size={24} color="gray" style ={{marginLeft:2}} />}
            inputContainerStyle={{borderWidth: 1, marginTop:5, borderRadius:5}}
          label = "Địa chỉ"
            placeholder="Địa chỉ"
            value={address}
            onChangeText={setAddress}
          />
          <Input
           leftIcon={<Feather name="file-text" size={24} color="gray" style ={{marginLeft:2}} />}
            inputContainerStyle={{borderWidth: 1, marginTop:5, borderRadius:5}}
          label = "Ghi chú"
            placeholder="Ghi chú"
            value={note}
            onChangeText={setNote}
          />
      {check ? (
        <Text style={{color: 'red', marginBottom: 20, alignSelf: 'center'}}>
          Kiểm tra thông tin họ tên, số điện thoại và địa chỉ :v
        </Text>
      ) : (
        <View />
      )}
    </ScrollView>
  );
}

export default AddCustom;
