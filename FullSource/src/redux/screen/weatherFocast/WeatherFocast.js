/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useState, useEffect} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import Navigation from './Navigation';
import DataContextProvider from './context/DataContext';
const WeatherFocast = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <DataContextProvider>
        <Navigation />
      </DataContextProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WeatherFocast;
