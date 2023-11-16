import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import PopularScreen from './PopularScreen';
import SearchScreen from './SearchScreen';
import CurrentManga from './CurrentManga';
import MangaRead from './MangaRead';
const Tab = createMaterialTopTabNavigator();
const SearchStack = createStackNavigator();
const NewItemsStack = createStackNavigator();

const tabBarOptions = {
    labelStyle: { fontSize: 16, fontWeight: 'bold',},
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
        <SearchStack.Navigator>
            <SearchStack.Screen name="Поиск Вашей Любимой Манги" component={SearchScreen} />
            <SearchStack.Screen name="Читать" component={CurrentManga}   options={{ headerTitleAlign: 'right' }}/>
            <SearchStack.Screen name="chapter" component={MangaRead} />
        </SearchStack.Navigator>
    );
}

function NewItemsStackScreen() {
    return (
        <NewItemsStack.Navigator>
            <NewItemsStack.Screen name="Горячие новинки!" component={PopularScreen} />
            <NewItemsStack.Screen name="Читать" component={CurrentManga} options={{ headerTitleAlign: 'right' }} />
            <SearchStack.Screen name="chapter" component={MangaRead} />
        </NewItemsStack.Navigator>
    );
}

export default function MainScreen() {
    return (
            <NavigationContainer>
                <Tab.Navigator
                    tabBarOptions={tabBarOptions}
                    onTabPress={({ route, preventDefault }) => {
                      setActiveTab(route.key); 
                      preventDefault(); 
                    }}
                >
                      <Tab.Screen name="Новинки" component={NewItemsStackScreen} />
                      <Tab.Screen name="Поиск" component={SearchStackScreen} />
                  </Tab.Navigator>
            </NavigationContainer>
    );
}
