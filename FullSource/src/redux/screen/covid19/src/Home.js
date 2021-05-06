import React, {useEffect, useState} from 'react';
import styles from './Styles';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

const width = Dimensions.get('screen').width;
function Covid_19(props) {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [tg, setTg] = useState([]);
  const [t, setT] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    var config = {
      method: 'get',
      url: 'https://api.covid19api.com/summary',
      headers: {},
    };

    axios(config)
      .then(function (response) {
        setLoading(false);
        setData(response.data.Countries);
        setTg(response.data.Global);
      })
      .catch(function (error) {
        console.log('covid19', error);
      });
  }, []);

  const ListItem = ({item}) => (
    <View style={{flexDirection: 'row', marginTop: 5}}>
      <View style={styles.name_country}>
        <Text style={styles.stt_txt1}>{item.Country}</Text>
      </View>
      <View style={styles.name_country}>
        <Text style={styles.stt_txt}>
          {item.TotalConfirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </Text>
      </View>
      <View style={styles.name_country}>
        <Text style={styles.stt_txt}>
          {item.NewRecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </Text>
      </View>
      <View style={styles.name_country}>
        <Text style={styles.stt_txt}>
          {item.TotalDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </Text>
      </View>
      <View style={styles.name_country}>
        <Text style={styles.stt_txt}>
          {item.NewDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </Text>
      </View>
      <View style={styles.name_country}>
        <Text style={styles.stt_txt}>
          {item.NewRecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </Text>
      </View>
      <View style={styles.name_country}>
        <Text style={styles.stt_txt}>
          {(
            item.TotalConfirmed -
            item.NewRecovered -
            item.TotalDeaths -
            item.NewDeaths -
            item.NewRecovered
          )
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </Text>
      </View>
    </View>
  );

  function onFilter(text) {
    setT(text);

    let dataFilter = [];
    setData1(dataFilter);
    for (let a = 0; a < data.length; a++) {
      if (data[a].Country.toLowerCase().includes(text.toLowerCase())) {
        dataFilter.push(data[a]);
        setData1(dataFilter);
      }
    }
  }
  return (
    <View style={{flex: 1}}>
      {loading === true ? (
        <ActivityIndicator size="large" color="#b50000" />
      ) : (
        <ScrollView
          style={styles.container}
          stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={false}>
          <StatusBar hidden={true} />
          {/* <View style = {{height: 30, width : width}}></View> */}
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
                props.navigation.toggleDrawer();
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
          <View>
            <View style={styles.header}>
              <Text style={styles.txt_}>COVID 19</Text>
              <TextInput
                placeholder="Tìm kiếm"
                onChangeText={text => onFilter(text)}
                style={styles.input_txt}
              />
            </View>
          </View>

          <View style={styles.container_header}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.tct}>Tổng ca nhiễm : </Text>
              <Text>
                {tg?.TotalConfirmed?.toString().replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ',',
                )}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.tct}>Tổng ca nhiễm mới : </Text>
              <Text>
                {tg?.NewConfirmed?.toString().replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ',',
                )}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.tct}>Tổng ca mất mới : </Text>
              <Text>
                {tg?.NewDeaths?.toString().replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ',',
                )}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.tct}>Tổng ca số người mất : </Text>
              <Text>
                {tg?.TotalDeaths?.toString().replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ',',
                )}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.tct}>Tổng ca mới hồi phục : </Text>
              <Text>
                {tg?.NewRecovered?.toString().replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ',',
                )}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.tct}>Tổng ca hồi phục : </Text>
              <Text>
                {tg?.TotalRecovered?.toString().replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ',',
                )}
              </Text>
            </View>
          </View>
          <ScrollView style={styles.header_body} horizontal>
            {/* <View style={styles.data_country}> */}
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  // backgroundColor: '#4127b3',
                }}>
                <View style={styles.name_country}>
                  <Text style={styles.stt_txt2}>Quốc gia</Text>
                </View>
                <View style={styles.name_country}>
                  <Text style={styles.stt_txt2}>Tổng ca nhiễm</Text>
                </View>
                <View style={styles.name_country}>
                  <Text style={styles.stt_txt2}>Ca mới nhiễm</Text>
                </View>
                <View style={styles.name_country}>
                  <Text style={styles.stt_txt2}>Tổng ca tử vong</Text>
                </View>
                <View style={styles.name_country}>
                  <Text style={styles.stt_txt2}>Tử vong mới</Text>
                </View>
                <View style={styles.name_country}>
                  <Text style={styles.stt_txt2}>Tổng ca bình phục</Text>
                </View>
                <View style={styles.name_country}>
                  <Text style={styles.stt_txt2}>Ca đang bị nhiễm</Text>
                </View>
              </View>
              <View>
                {(t.length === 0 ? data : data1).map((item, index) => (
                  <ListItem item={item} key={item.ID + '_' + index} />
                ))}
              </View>
            </View>
            {/* </View> */}
          </ScrollView>
        </ScrollView>
      )}
    </View>
  );
}

export default Covid_19;
