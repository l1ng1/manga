// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import PopularScreen from './components/PopularScreen';
import SearchScreen from './components/SearchScreen';

const Tab = createMaterialTopTabNavigator();
const SearchStack = createStackNavigator();

function SearchStackScreen() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Поиск Вашей Любимой Манги" component={SearchScreen} />
    </SearchStack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Популярное" component={PopularScreen} />
        <Tab.Screen name="Поиск" component={SearchStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
