import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';

// import screens
import Home from './components/screens/Home';
import ListCustom from './components/screens/ListCustom';
import ListProduct from './components/screens/ListProduct';
import OverView from './components/screens/OverView';
import AddCustom from './components/screens/AddCustom';
import EditCustom from './components/screens/EditCustom';
import EditProduct from './components/screens/EditProduct';
import AddProduct from './components/screens/AddProduct';
import AddPlace from './components/screens/AddPlace';
import EditPlace from './components/screens/EditPlace';

const Tab = createBottomTabNavigator();
const TabScreen = createStackNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="Trang chủ"
      tabBarOptions={{
        activeTintColor: '#b50000',
        activeBackgroundColor: '#fff0f0',
      }}>
      <Tab.Screen
        name="Trang chủ"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <Feather name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Khách hàng"
        component={ListCustom}
        options={{
          tabBarIcon: ({color, size}) => (
            <Feather name="users" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Sản phẩm"
        component={ListProduct}
        options={{
          tabBarIcon: ({color, size}) => (
            <Feather name="server" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Tổng quan"
        component={OverView}
        options={{
          tabBarIcon: ({color, size}) => (
            <Feather name="package" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function Sale() {
  return (
    <TabScreen.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <TabScreen.Screen name="Home" component={BottomTab} />
      <TabScreen.Screen name="AddPlace" component={AddPlace} />
      <TabScreen.Screen name="EditPlace" component={EditPlace} />
      <TabScreen.Screen name="AddCustom" component={AddCustom} />
      <TabScreen.Screen name="EditCustom" component={EditCustom} />
      <TabScreen.Screen name="ListCustom" component={ListCustom} />
      <TabScreen.Screen name="ListProduct" component={ListProduct} />
      <TabScreen.Screen name="EditProduct" component={EditProduct} />
      <TabScreen.Screen name="AddProduct" component={AddProduct} />
    </TabScreen.Navigator>
  );
}

export default Sale;
