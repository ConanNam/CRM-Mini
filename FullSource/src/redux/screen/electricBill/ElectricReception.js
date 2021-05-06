/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import TabNavigation from './BottomNavigation';

const ElectricReception = () => {
  return (
    <>
      <SafeAreaView style={styles.Container}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <TabNavigation />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#F4F4F7',
  },
});

export default ElectricReception;
