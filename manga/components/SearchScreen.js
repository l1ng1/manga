import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { searchManga } from '../redux/mangaSlice'; 
import { clearSearchResults } from '../redux/mangaSlice'; // Добавьте этот импорт

export default function SearchScreen({ navigation }) {
    const [searchText, setSearchText] = useState('');
    const searchResults = useSelector((state) => state.manga.searchResults); // Измените находку состояния
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(searchResults);
    }, [searchResults]); 

    const handleSearch = () => {
        console.log(searchText);
        // Очистите результаты поиска перед новым поиском
        dispatch(clearSearchResults()); 
        dispatch(searchManga(searchText));
    };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TextInput
                  style={styles.input}
                  placeholder="Поиск..."
                  onChangeText={setSearchText}
                  value={searchText}
                />
                <TouchableOpacity style={styles.button} onPress={handleSearch}>
                    <Text style={styles.buttonText}>Поиск</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.contentContainer}>
              
                <Text>Контейнер для отображения поика!</Text>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        // backgroundColor: '#B0C4DE', 
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        marginRight: 10,
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#B0C4DE', 
    },
    button: {
        backgroundColor: '#4682B4', 
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
}); 