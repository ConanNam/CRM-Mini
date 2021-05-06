import React from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import TopTabNavigation from './TopTabNavigation';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
});

const ChoseExpenses = ({navigation}) => {
  return <TopTabNavigation />;
};

export default ChoseExpenses;
