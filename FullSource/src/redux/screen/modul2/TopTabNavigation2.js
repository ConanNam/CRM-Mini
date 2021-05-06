import React from 'react';
import Expenses2 from './Expenses2';
import CollectionOfMoney2 from './CollectionOfMoney2';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const MyTab = () => {
  return (
    <Tab.Navigator initialRouteName="Expenses2" tabBarOptions={{}}>
      <Tab.Screen
        name="Expenses2"
        component={Expenses2}
        options={{title: 'KHOẢN CHI'}}
      />
      <Tab.Screen
        name="CollectionOfMoney2"
        component={CollectionOfMoney2}
        options={{title: 'KHOẢN THU'}}
      />
    </Tab.Navigator>
  );
};

const TopTabNavigation2 = () => {
  return <MyTab />;
};

export default TopTabNavigation2;
