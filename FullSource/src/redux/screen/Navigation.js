import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';

import OverView from './modul2/OverView';
import ListSE from './modul2/ListSE';
import Side from './modul2/Side';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Ionicons';
import AddBill from './modul2/AddBill';
import ChoseExpenses from './modul2/ChoseExpenses';
import ChoseExpenses2 from './modul2/ChoseExpenses2';
import EditS from './modul2/EditS';
import Wellcome from './modul2/Wellcome';
import HomeTodo from './modul3/HomeTodo';
import DrawContent from './DrawContent';
import Caro from './game/caro/Caro';
import ElectricReception from './electricBill/ElectricReception';
import ConverterCurrency from './converterCurrency/Home';
import WeatherFocast from './weatherFocast/WeatherFocast';
import Screen_game_2468 from './game/2468/src/Screen_game';
import Covid_19 from './covid19/src/Home';
import GrossToNetHome from './grossToNet/screens/Home';
import GTN from './grossToNet/screens/Navigation';
import Sale from './modul1/App';

const tabs = createBottomTabNavigator();
const stack = createStackNavigator();
const draw = createDrawerNavigator();

export const MyTabs = () => {
  return (
    <tabs.Navigator
      tabBarOptions={{
        activeTintColor: '#b50000',
        activeBackgroundColor: '#fff0f0',
      }}
      initialRouteName="OverView">
      <tabs.Screen
        name="OverView"
        component={OverView}
        options={{
          tabBarLabel: 'Tổng quan',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <tabs.Screen
        name="ListSE"
        component={ListSE}
        options={{
          tabBarLabel: 'Danh sách',
          tabBarIcon: ({color, size}) => (
            <Icon2
              name="ios-file-tray-stacked-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </tabs.Navigator>
  );
};

const StackNavigation = () => {
  return (
    <stack.Navigator initialRouteName="Sale">
      <stack.Screen
        name="Side"
        component={Side}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="OverViewTabs"
        component={MyTabs}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="ListSE"
        component={ListSE}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="AddBill"
        component={AddBill}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="ChoseExpenses"
        component={ChoseExpenses}
        options={{title: 'Chọn nhóm'}}
      />
      <stack.Screen
        name="EditS"
        component={EditS}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="ChoseExpenses2"
        component={ChoseExpenses2}
        options={{title: 'Chọn nhóm'}}
      />

      <stack.Screen
        name="Wellcome"
        component={Wellcome}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="DrawerContent"
        component={DrawContent}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="HomeTodo"
        component={HomeTodo}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="Caro"
        component={Caro}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="Electric"
        component={ElectricReception}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="ConverterCurrency"
        component={ConverterCurrency}
        options={{headerShown: false}}
      />
      <stack.Screen name="WeatherFocast" component={WeatherFocast} />
      <stack.Screen
        name="Game2468"
        component={Screen_game_2468}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="GrossToNet"
        component={GTN}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="Sale"
        component={Sale}
        options={{headerShown: false}}
      />
    </stack.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <draw.Navigator drawerContent={props => <DrawContent {...props} />}>
        <draw.Screen
          name="ESTab"
          component={StackNavigation}
          options={{title: 'Quản lí thu chi'}}
        />
        <draw.Screen
          name="TodoList"
          component={HomeTodo}
          options={{title: 'Quản lí công việc'}}
        />
        <draw.Screen
          name="Caro"
          component={Caro}
          options={{title: 'Cờ caro 12x12'}}
        />
        <draw.Screen
          name="Electric"
          component={ElectricReception}
          options={{title: 'Tính tiền điện'}}
        />
        <draw.Screen
          name="ConverterCurrency"
          component={ConverterCurrency}
          options={{title: 'Chuyển đổi tiền tệ'}}
        />
        <draw.Screen
          name="WeatherFocast"
          component={WeatherFocast}
          options={{title: 'Dự báo thời tiết'}}
        />
        <draw.Screen
          name="Game2468"
          component={Screen_game_2468}
          options={{title: 'Game2468'}}
        />
        <draw.Screen
          name="Covid19"
          component={Covid_19}
          options={{title: 'Covid19'}}
        />
        <draw.Screen
          name="GrossToNet"
          component={GTN}
          options={{title: 'Covid19'}}
        />
        <draw.Screen
          name="Sale"
          component={Sale}
          options={{title: 'Managerment sale'}}
        />
      </draw.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
