import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Checkbox,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
} from 'react-native';
import GrossToNet from './GrossToNet';
import {Keyboard} from 'react-native';
import styles from './Styles';
import Icon from 'react-native-vector-icons/Ionicons';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
const GrossToNetHome = ({navigation}) => {
  const [check_date, setCheck_date] = useState(true);
  const [salary_base, setSalary_base] = useState(1490000);
  const [discount, setDiscount] = useState(11000000);
  const [npt, setNpt] = useState(4400000);
  const [soNpt, setSoNpt] = useState('0');
  const [insurance, setInsurance] = useState(true);
  const [salary, setSalary] = useState('');
  const [salary_insurance, setSalary_insurance] = useState(null);
  const [check_region, setCheck_region] = useState(1);
  // function numberWithCommas(x) {
  //   x = x.toString();
  //   var pattern = /(-?\d+)(\d{3})/;
  //   while (pattern.test(x)) x = x.replace(pattern, '$1,$2');
  //   return x;
  // }
  // Keyboard.dismiss();
  const numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // chọn ngày quy định
  function selectDate2() {
    setCheck_date(false);
    setNpt(3600000);
    setDiscount(9000000);
    console.log('1/1/2020-30/06/2020' + check_date);
  }
  function selectDate1() {
    setCheck_date(true);
    setNpt(4400000);
    setDiscount(11000000);
    console.log('1/7/2020' + check_date);
  }

  // chọn hình thức đóng bảo hiểm
  function insurance_() {
    setInsurance(true);
  }
  function insurance_1() {
    setInsurance(false);
  }

  // chuyen man hinh
  function grossToNet(navigation) {
    console.log('chuyen man hinh ');
    if (!salary) {
      alert('nhập số tiền thu nhập của bạn?');
    } else if (!insurance && !salary_insurance) {
      alert('nhập số tiền đóng bảo hiểm!');
    } else {
      navigation.navigate('GrossToNet', {
        date: check_date,
        salary: salary,
        insurance: insurance,
        salary_insurance: salary_insurance,
        region: check_region,
        soNpt: soNpt,
        screen: 5,
      });
    }
  }

  function netToGross(navigation) {
    console.log('chuyen man hinh ');
    if (!salary) {
      alert('nhập số tiền thu nhập của bạn?');
    } else if (!insurance && !salary_insurance) {
      alert('nhập số tiền đóng bảo hiểm!');
    } else {
      navigation.navigate('GrossToNet', {
        date: check_date,
        net: salary,
        insurance: insurance,
        salary_insurance: salary_insurance,
        region: check_region,
        soNpt: soNpt,
        screen: 10,
      });
    }
  }

  function onCheck_r1() {
    setCheck_region(1);
  }
  function onCheck_r2() {
    setCheck_region(2);
  }
  function onCheck_r3() {
    setCheck_region(3);
  }
  function onCheck_r4() {
    setCheck_region(4);
  }
  function onchangeText1(text) {
    setSalary(text.replace(/\,/g, ''));
  }

  const sa_base1 = salary_base.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const giam = discount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const n_tp = npt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const a = salary.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 5,
          paddingVertical: 10,
          borderBottomColor: 'gray',
          borderBottomWidth: 0.5,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.toggleDrawer();
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="menu-outline" size={38} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 30,
            flexGrow: 1,
            marginLeft: 30,
          }}>
          Trang chủ
        </Text>
      </View>
      <View style={styles.header}>
        <View style={styles.header1}>
          <Text style={styles.title1}>Áp dụng quy định: </Text>
          <View style={styles.checkbox1}>
            <TouchableOpacity onPress={selectDate1} style={styles.check_date}>
              {check_date ? (
                <Image
                  style={styles.photo_check_date}
                  source={require('../assets/doneCircle.png')}
                />
              ) : (
                <View style={styles.photo_check_date} />
              )}
              {check_date ? (
                <Text style={styles.title_date_true}>1/7/2020(mới nhất)</Text>
              ) : (
                <Text style={styles.title_date}>1/7/2020(mới nhất)</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={selectDate2} style={styles.check_date}>
              {!check_date ? (
                <Image
                  style={styles.photo_check_date}
                  source={require('../assets/doneCircle.png')}
                />
              ) : (
                <View style={styles.photo_check_date} />
              )}
              {!check_date ? (
                <Text style={styles.title_date_true}>1/1/2020-30/06/2020</Text>
              ) : (
                <Text style={styles.title_date}>1/1/2020-30/06/2020</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.salary}>
          <View style={styles.salary1}>
            <Text style={styles.salary_Cb}>Lương cơ sở: </Text>
            <Text style={styles.salary_Cb1}>{sa_base1}</Text>
            <Text style={styles.salary_Cb1}>đ</Text>
          </View>
          <View style={styles.salary1}>
            <Text style={styles.salary_Cb}>Giảm trừ gia cảnh bản thân: </Text>
            <Text style={styles.salary_Cb1}>{giam}</Text>
            <Text style={styles.salary_Cb1}>đ</Text>
          </View>
          <View style={styles.salary1}>
            <Text style={styles.salary_Cb}>Người phụ thuộc: </Text>
            <Text style={styles.salary_Cb1}>{n_tp}</Text>
            <Text style={styles.salary_Cb1}>đ</Text>
          </View>
        </View>
      </View>
      <View style={styles.body}>
        {/* phần nhập thu nhập */}

        <View style={styles.income}>
          <Text style={styles.txt_income}>Thu nhập</Text>
          <TextInput
            style={styles.input_income}
            placeholder="VD: 10,000,000"
            keyboardType="numeric"
            onChangeText={number => onchangeText1(number)}
            value={a}
          />
          <Text style={styles.cnd_income}>(VND)</Text>
        </View>

        {/* // phần đóng bảo hiểm  */}
        <View style={styles.income}>
          <Text style={styles.txt_income}>Đóng bảo hiểm:</Text>
          <TouchableOpacity style={styles.btn_insurance} onPress={insurance_}>
            {insurance ? (
              <Image
                style={styles.photo_check_date}
                source={require('../assets/doneCircle.png')}
              />
            ) : (
              <View style={styles.photo_check_date} />
            )}

            <Text style={styles.txt_insurance}>
              Trên lương{'\n'}chính thức{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn_insurance} onPress={insurance_1}>
            {!insurance ? (
              <Image
                style={styles.photo_check_date}
                source={require('../assets/doneCircle.png')}
              />
            ) : (
              <View style={styles.photo_check_date} />
            )}

            <Text style={styles.txt_insurance}>Khác</Text>
            {!insurance ? (
              <TextInput
                value={salary_insurance}
                onChangeText={setSalary_insurance}
                keyboardType="numeric"
                style={styles.input_insurance}
              />
            ) : (
              <View style={styles.input_insurance_1} />
            )}
          </TouchableOpacity>
        </View>

        {/* // phần vùng */}
        <View style={styles.income}>
          <Text style={styles.txt_income}>Vùng</Text>
          <TouchableOpacity>
            <Text style={styles.txt_region}>(giải thích)</Text>
          </TouchableOpacity>
          <Text> : </Text>
          <TouchableOpacity onPress={onCheck_r1} style={styles.btn_region}>
            {check_region === 1 ? (
              <Image
                style={styles.photo_check_date}
                source={require('../assets/doneCircle.png')}
              />
            ) : (
              <View style={styles.photo_check_date} />
            )}
            <Text style={styles.txt_so}>I</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onCheck_r2} style={styles.btn_region}>
            {check_region === 2 ? (
              <Image
                style={styles.photo_check_date}
                source={require('../assets/doneCircle.png')}
              />
            ) : (
              <View style={styles.photo_check_date} />
            )}

            <Text style={styles.txt_so}>II</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onCheck_r3} style={styles.btn_region}>
            {check_region === 3 ? (
              <Image
                style={styles.photo_check_date}
                source={require('../assets/doneCircle.png')}
              />
            ) : (
              <View style={styles.photo_check_date} />
            )}

            <Text style={styles.txt_so}>III</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onCheck_r4} style={styles.btn_region}>
            {check_region === 4 ? (
              <Image
                style={styles.photo_check_date}
                source={require('../assets/doneCircle.png')}
              />
            ) : (
              <View style={styles.photo_check_date} />
            )}
            <Text style={styles.txt_so}>IV</Text>
          </TouchableOpacity>
        </View>

        {/* // phần số người phụ thuộc  */}
        <View style={styles.income}>
          <Text style={styles.txt_income}>Số người phụ thuộc: </Text>
          <TextInput
            style={styles.input_npt}
            keyboardType="numeric"
            value={soNpt}
            onChangeText={setSoNpt}
          />
          <Text style={styles.nguoi}>(người)</Text>
        </View>

        {/* // hai nút chọn cách tính lương */}
        <View style={styles.btn_}>
          <TouchableOpacity
            onPress={() => grossToNet(navigation)}
            style={styles.btn_ok}>
            <Text style={styles.txt_btn}>GROSS ➙ NET</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => netToGross(navigation)}
            style={styles.btn_ok1}>
            <Text style={styles.txt_btn}>NET ➙ GROSS</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default GrossToNetHome;
