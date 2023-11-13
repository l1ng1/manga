import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPopularMangaList } from '../redux/mangaSlice';

export default function PopularScreen() {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        // Вызов действия при загрузке компонента
        dispatch(fetchPopularMangaList());

    }, []); // Пустой массив зависимостей гарантирует, что это действие выполняется только один раз при загрузке компонента.

    ;
    return (
        <View style={styles.container}>
          <Text style={styles.text}>Популярное</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#B0C4DE',
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});