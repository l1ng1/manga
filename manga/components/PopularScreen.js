import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPopularMangaList } from '../redux/mangaSlice';
import PopularManga from './PopularComp';

export default function PopularScreen({navigation}) {
    console.log(navigation)
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        // Вызов действия при загрузке компонента
        dispatch(fetchPopularMangaList());

    }, []); // Пустой массив зависимостей гарантирует, что это действие выполняется только один раз при загрузке компонента.

    console.log(state.manga.popularManga.content);
    return (
        <View style={styles.container}>
          <PopularManga data={state.manga.popularManga.content}  navigation={navigation}></PopularManga>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});