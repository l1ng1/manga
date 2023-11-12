import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { searchManga } from '../redux/mangaSlice'; 

export default function SearchScreen({ navigation }) {
    // текст с инпута
    const [searchText, setSearchText] = useState('');
    // Диспатч для отслеживания функции со слайса
    const dispatch = useDispatch();
    // Вызов функции поиска с текстом поиска
    const handleSearch = () => {
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
        backgroundColor: '#B0C4DE', 
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#7280a8',
        borderRadius: 10,
        padding: 10,
        color: 'white', 
        backgroundColor: '#4682B4', 
    },
    button: {
        backgroundColor: '#4682B4', 
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
}); 