import React from 'react';
import {View, Text} from 'react-native';
function CustomColor(props) {
  a = props.so;
  var so = a;
  var c = Math.log2(a);
  var dataColor = [
    '#5ff719',
    '#97f719',
    '#c3f719',
    '#ecf719',
    '#f7b119',
    '#f78119',
    '#f75c19',
    '#f73a19',
  ];
  if (c > 7) {
    c = 7;
  }
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: dataColor[c],
        width: 75,
        height: 75,
      }}>
      <Text style={{fontSize: 40, color: 'black', fontWeight: 'bold'}}>
        {so}
      </Text>
    </View>
  );
}

export default CustomColor;
