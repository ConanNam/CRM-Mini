import React from 'react';
import Expenses from './Expenses';
import CollectionOfMoney from './CollectionOfMoney';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const MyTab = () => {
  return (
    <Tab.Navigator initialRouteName="Expenses" tabBarOptions={{}}>
      <Tab.Screen
        name="Expenses"
        component={Expenses}
        options={{title: 'KHOẢN CHI'}}
      />
      <Tab.Screen
        name="CollectionOfMoney"
        component={CollectionOfMoney}
        options={{title: 'KHOẢN THU'}}
      />
    </Tab.Navigator>
  );
};

const TopTabNavigation = () => {
  return <MyTab />;
};

export default TopTabNavigation;
