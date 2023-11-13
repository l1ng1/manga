import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import PopularScreen from './components/PopularScreen';
import SearchScreen from './components/SearchScreen';

const Tab = createMaterialTopTabNavigator();
const SearchStack = createStackNavigator();

const tabBarOptions = {
    labelStyle: { fontSize: 16, fontWeight: 'bold', color: '#fff'},
    tabStyle: ({ route, focused }) => ({
        borderWidth: 1,
        borderColor: focused ? '#B0C4DE' : 'transparent',
        borderRadius: 10,
    }),
    indicatorStyle: {
        backgroundColor: '#B0C4DE',
        height: 4,
    },
    style: {
        backgroundColor: '#4682B4',
    },
};

function SearchStackScreen() {
    return (
        <SearchStack.Navigator
            screenOptions={{
                cardStyle: { backgroundColor: '#4682B4', textAlign: 'center' } 
            }}
        >
            <SearchStack.Screen name="Поиск Вашей Любимой Манги" component={SearchScreen} />
        </SearchStack.Navigator>
    );
}

function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Tab.Navigator
                    tabBarOptions={tabBarOptions}
                    onTabPress={({ route, preventDefault }) => {
                      setActiveTab(route.key); 
                      preventDefault(); 
                    }}
                >
                      <Tab.Screen name="Новинки" component={PopularScreen} />
                      <Tab.Screen name="Поиск" component={SearchStackScreen} />
                  </Tab.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

export default App;
