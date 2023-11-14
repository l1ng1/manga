import React from 'react';
import { Image } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native';
import { fetchDog } from '../redux/mangaSlice';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Geners from './GenersComp';


// const Geners = ({ item }) => {
//   let list = item.genres;
//   return (
//     <View style={styles.genresContainer}>
//       <Text style={styles.genresTitle}>Жанры:</Text>
//       <FlatList
//         style={styles.genresList}
//         data={list}
//         renderItem={({ item }) => (
//           <View>
//             <Text style={styles.genreItem}>{item.name}</Text>
//           </View>
//         )}
//       />
//     </View>
//   )
// }

const PopularManga = ({ data, navigation }) => {
  console.log(navigation)
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => { navigation.navigate('Читать',item)}}>
            <View style={styles.box}>
              <Image resizeMode='contain' source={{ uri: "https://remanga.org" + item.img.low }} style={styles.coverImage} />
              <Text style={styles.mangaName}>{item.main_name}</Text>
              <Geners item={item} />
            </View>
          </TouchableOpacity>
        )}
        // numColumns={3}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
// backgroundColor: '#fff', // Фон контейнера
    },
    listContainer: {
        width: '80%',
    },
    box: {
        width: '90%',
        margin: 10,
        borderWidth: 1,
        borderColor: 'black', 
        padding: 20,
        borderRadius: 9,
        marginBottom: 15,
        fontSize: 24,
        textAlign: 'center',
        backgroundColor: '#f9f9f9', // Фон для каждого элемента
    },
    coverImage: {
        width: '100%',
        height: 200,
    },
    mangaName: {
marginTop: 10,
        fontWeight: 'bold',
        fontSize: 18, // Уменьшим размер шрифта
        color: '#4682B4', // Цвет текста
        textAlign: 'center', // Выравнивание текста по центру
    },
    genresContainer: {
      marginTop: 10,
    },
    genresTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    genresList: {
      marginTop: 5,
    },
    genreItem: {
      fontSize: 14, // Уменьшим размер шрифта жанров
    },
});

export default PopularManga;
