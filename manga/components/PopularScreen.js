import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDog } from '../redux/mangaSlice';

export default function PopularScreen() {
    const state = useSelector((state) => state);
    

    const dispatch = useDispatch();
    dispatch(fetchDog());
    console.log(state.manga.popularManga);
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