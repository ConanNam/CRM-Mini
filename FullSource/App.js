import React, {useState, useEffect} from 'react';
import {
  View,
  Button,
  Platform,
  Text,
  Alert,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  LogBox,
} from 'react-native';
import Navigation from './src/redux/screen/Navigation';
import allReducer from './src/redux/reducers/index';

import {
  Provider,
  createStoreHook,
  createDispatchHook,
  createSelectorHook,
} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import createSagaMidleware from 'redux-saga';
import rootSaga from './src/redux/saga/rootSaga';
const MyContext = React.createContext();
const sagaMiddleware = createSagaMidleware();

export const useStore = createStoreHook(MyContext);
export const useDispatch = createDispatchHook(MyContext);
export const useSelector = createSelectorHook(MyContext);

let store = createStore(allReducer, applyMiddleware(sagaMiddleware));

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </SafeAreaView>
  );
};
sagaMiddleware.run(rootSaga);
export default App;
