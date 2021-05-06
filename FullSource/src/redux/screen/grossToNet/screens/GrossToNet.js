import React, {useState} from 'react';
import {View, Text, ScrollView, FlatList} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import styles from './Styles';

function GrossToNet({navigation, route}) {
  console.log(route.name + 'vvv');
  const {
    screen,
    date,
    insurance,
    salary_insurance,
    region,
    soNpt,
  } = route.params;
  var bao_hiem_xa_hoi = 0,
    bao_hiem_y_te,
    thu_nhap_truoc_thue,
    giam_tru_nguoi_phu_thuoc,
    thu_nhap_chiu_thue,
    bao_hiem_xa_hoi1 = 0,
    tnld,
    bao_hiem_y_te1 = 0,
    tong_cong = 0,
    thue_thu_nhap_ca_nhan,
    bao_hiem,
    bao_hiem_that_nghiep,
    thue5,
    thue10 = 0,
    thue18 = 0,
    thue32 = 0,
    thue52 = 0,
    thue80 = 0,
    thuet80 = 0;
  if (screen === 5) {
    var {salary} = route.params;
  }
  if (screen === 10) {
    var {net} = route.params;
    var salary = Math.floor(net / 0.895);
  }

  if (salary > 29800000) {
    bao_hiem_xa_hoi = 2384000;
    bao_hiem_y_te = 447000;
    bao_hiem_xa_hoi1 = 5066000;
    tnld = 149000;
    bao_hiem_y_te1 = 894000;
  } else {
    bao_hiem_xa_hoi = Math.floor(salary * 0.08);
    bao_hiem_y_te = Math.floor(salary * 0.015);
    bao_hiem_xa_hoi1 = Math.floor(salary * 0.17);
    tnld = Math.floor(salary * 0.005);
    bao_hiem_y_te1 = Math.floor(salary * 0.03);
  }

  switch (region) {
    case 1:
      {
        if (salary > 88400000) {
          bao_hiem_that_nghiep = 884000;
        } else {
          bao_hiem_that_nghiep = Math.floor(salary * 0.01);
        }
      }
      break;
    case 2:
      {
        if (salary > 78400000) {
          bao_hiem_that_nghiep = 784000;
        } else {
          bao_hiem_that_nghiep = Math.floor(salary * 0.01);
        }
      }
      break;
    case 3:
      {
        if (salary > 68600000) {
          bao_hiem_that_nghiep = 686000;
        } else {
          bao_hiem_that_nghiep = Math.floor(salary * 0.01);
        }
      }
      break;
    case 4:
      {
        if (salary > 61400000) {
          bao_hiem_that_nghiep = 614000;
        } else {
          bao_hiem_that_nghiep = Math.floor(salary * 0.01);
        }
      }
      break;
  }
  bao_hiem = bao_hiem_that_nghiep + bao_hiem_xa_hoi + bao_hiem_y_te;
  thu_nhap_truoc_thue = salary - bao_hiem;
  var giam_tru_ban_than = 110000000;
  if (!data) {
    giam_tru_ban_than = 9000000;
  }
  switch (date) {
    case true:
      giam_tru_nguoi_phu_thuoc = soNpt * 4400000;
      break;
    case false:
      giam_tru_nguoi_phu_thuoc = soNpt * 3600000;
      break;
  }
  thu_nhap_chiu_thue =
    thu_nhap_truoc_thue - giam_tru_ban_than - giam_tru_nguoi_phu_thuoc;
  if (thu_nhap_chiu_thue < 0) {
    thu_nhap_chiu_thue = 0;
  }
  if (thu_nhap_chiu_thue < 5000000) {
    thue_thu_nhap_ca_nhan = Math.floor(thu_nhap_chiu_thue * 0.05);
    thue5 = Math.floor(thu_nhap_chiu_thue * 0.05);
  } else if (thu_nhap_chiu_thue >= 5000000 && thu_nhap_chiu_thue < 10000000) {
    thue_thu_nhap_ca_nhan = Math.floor(thu_nhap_chiu_thue * 0.1);
    thue5 = 250000;
    thue10 = Math.floor((thu_nhap_chiu_thue - 5000000) * 0.1);
  } else if (thu_nhap_chiu_thue >= 10000000 && thu_nhap_chiu_thue < 18000000) {
    thue_thu_nhap_ca_nhan = Math.floor(thu_nhap_chiu_thue * 0.15);
    thue5 = 250000;
    thue10 = 5000000;
    thue18 = Math.floor((thu_nhap_chiu_thue - 10000000) * 0.15);
  } else if (thu_nhap_chiu_thue >= 18000000 && thu_nhap_chiu_thue < 32000000) {
    thue_thu_nhap_ca_nhan = Math.floor(thu_nhap_chiu_thue * 0.2);
    thue5 = 250000;
    thue10 = 500000;
    thue18 = 1200000;
    thue32 = Math.floor((thu_nhap_chiu_thue - 18000000) * 0.2);
  } else if (thu_nhap_chiu_thue >= 32000000 && thu_nhap_chiu_thue < 52000000) {
    thue_thu_nhap_ca_nhan = Math.floor(thu_nhap_chiu_thue * 0.25);
    thue5 = 250000;
    thue10 = 500000;
    thue18 = 1200000;
    thue32 = 2800000;
    thue52 = Math.floor((thu_nhap_chiu_thue - 32000000) * 0.25);
  } else if (thu_nhap_chiu_thue >= 52000000 && thu_nhap_chiu_thue < 80000000) {
    thue_thu_nhap_ca_nhan = Math.floor(thu_nhap_chiu_thue * 0.3);
    thue5 = 250000;
    thue10 = 500000;
    thue18 = 1200000;
    thue32 = 2800000;
    thue52 = 5000000;
    thue80 = Math.floor((thu_nhap_chiu_thue - 52000000) * 0.3);
  } else if (thu_nhap_chiu_thue >= 80000000) {
    thue_thu_nhap_ca_nhan = Math.floor(thu_nhap_chiu_thue * 0.35);
    thue5 = 250000;
    thue10 = 500000;
    thue18 = 1200000;
    thue32 = 2800000;
    thue52 = 5000000;
    thue80 = 8400000;
    thuet80 = Math.floor((thu_nhap_chiu_thue - 80000000) * 0.35);
  }

  if (screen === 5) {
    var net = salary - bao_hiem - thue_thu_nhap_ca_nhan;
  }
  tong_cong =
    salary -
    -bao_hiem_xa_hoi1 -
    -bao_hiem_y_te1 -
    -tnld -
    -bao_hiem_that_nghiep;
  const [data, setData] = useState([
    {title: 'Lương GROSS', value: salary},
    {title: 'Bảo hiểm xã hội (8%)', value: - bao_hiem_xa_hoi},
    {title: 'Bảo hiểm y tế (1.5%)', value: - bao_hiem_y_te},
    {title: 'Bảo hiểm thất nghiệp (1%)', value: - bao_hiem_that_nghiep},
    {title: 'Thu nhập trước thuế', value: - thu_nhap_truoc_thue},
    {title: 'Giảm trừ gia cảnh bản thân', value: - giam_tru_ban_than},
    {
      title: 'Giảm trừ gia cảnh người phụ thuộc',
      value: -giam_tru_nguoi_phu_thuoc,
    },
    {title: 'Thu nhập chịu thuế', value: thu_nhap_chiu_thue},
    {title: 'Thuế thu nhập cá nhân(*)', value: thue_thu_nhap_ca_nhan},
    {title: 'Lương NET', value: net},
  ]);
  const [data_tax, setData_tax] = useState([
    {title: 'Mức chịu thuế', tax: 'Thuế suất', value: 'Tiền nộp'},
    {title: 'Đến 5 triệu VNĐ', tax: '5%', value: thue5},
    {title: 'Trên 5 triệu VNĐ đến 10 triệu VNĐ', tax: '10%', value: thue10},
    {title: 'Trên 10 triệu VNĐ đến 18 triệu VNĐ', tax: '15%', value: thue18},
    {title: 'Trên 18 triệu VNĐ đến 32 triệu VNĐ', tax: '20%', value: thue32},
    {title: 'Trên 32 triệu VNĐ đến 52 triệu VNĐ', tax: '25%', value: thue52},
    {title: 'Trên 52 triệu VNĐ đến 80 triệu VNĐ', tax: '30%', value: thue80},
    {title: 'Trên 80 triệu VNĐ	', tax: '35%', value: thuet80},
  ]);

  const [data_salary, setData_salary] = useState([
    {title: 'Lương GROSS', value: salary},
    {title: 'Bảo hiểm xã hội (17%)', value: -bao_hiem_xa_hoi1},
    {
      title: 'Bảo hiểm Tai nạn lao động\n- Bệnh nghề nghiệp (0.5%)',
      value: tnld,
    },
    {title: 'Bảo hiểm y tế (3%)', value: bao_hiem_y_te1},
    {title: 'Bảo hiểm thất nghiệp (1%)', value: bao_hiem_that_nghiep},
    {title: 'Tổng cộng	', value: tong_cong},
  ]);
  const renderItem = ({item}) => (
    <View style={styles.view_flat}>
      <Text style={styles.item_txt}>{item.title}</Text>
      <Text>{item.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
    </View>
  );

  const renderItem_tax = ({item}) => (
    <View style={styles.view_flat1}>
      <View style={styles.item_txt}>
        <Text style = {styles.item_txt}>{item.title}</Text>
      </View>
      <View style={styles.item_txt1}>
        <Text >{item.tax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
      </View>
      <View style={styles.item_txt2}>
        <Text>{item.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} nestedScrollEnabled={true}>
      <View style ={{width:"90%", alignSelf:"center", marginTop:20, flexDirection:"row"}}>
        <TouchableOpacity onPress = {()=>navigation.goBack()}>
          <Feather name = "arrow-left" size ={26}/>
        </TouchableOpacity>

        <Text style ={{fontSize:20, flexGrow:1, textAlign: 'center'}}>Bảng lương chi tiết</Text>
      </View>
      {/* view xem luong  */}
      <View  style={styles.salary_1}>
      <View style={styles.salary_}>
        <View style={styles.header_salary1}>
          <Text style={styles.txt_salary_}>Lương Gross</Text>
          <Text style={styles.txt_money}>{salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
        </View>
        <View style={styles.header_salary}>
          <Text style={styles.txt_salary_}>Bảo hiểm</Text>
          <Text style={styles.txt_money}>- {bao_hiem.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
        </View>
        </View>

      <View style={styles.salary_}>
        <View style={styles.header_salary1}>
          <Text style={styles.txt_salary_}>Thuế TNCN</Text>
          <Text style={styles.txt_money}>-{thue_thu_nhap_ca_nhan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
        </View>
        <View style={styles.header_salary}>
          <Text style={styles.txt_salary_}> Lương Net</Text>
          <Text style={styles.txt_money}>{net.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
        </View>
      </View>
      </View>

      {/* đơn giá chi tiết */}
      <View style={styles.body}>
        <Text style={styles.title_no}>Diễm giải chi tiết(VND)</Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.title}
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.title_no}>
          (*) Chi tiết thuế thu nhập cá nhân (VNĐ)
        </Text>
        <FlatList
          data={data_tax}
          renderItem={renderItem_tax}
          keyExtractor={item => item.title}
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.title_no}>Người sử dụng lao động trả (VNĐ)</Text>
        <FlatList
          data={data_salary}
          renderItem={renderItem}
          keyExtractor={item => item.title}
        />
      </View>
    </ScrollView>
  );
}

export default GrossToNet;
