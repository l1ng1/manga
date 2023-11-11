import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import { TabView, SceneMap } from 'react-native-tab-view';
import { PopularList } from './components/PopularList';
import { Search } from './components/Search';


const renderScene = SceneMap({
  popular: PopularList,
  search: Search,
});

export default function App() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'popular', title: 'Popular' },
    { key: 'search', title: 'Search' },
  ]);

  return (
    <Provider store={ store }>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </Provider>
  );
}