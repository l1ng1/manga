import React from 'react';
import { Image, Pressable } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native';
import { fetchDog } from '../redux/mangaSlice';
import { useEffect } from 'react';
import { useState } from 'react';
import Geners from './GenersComp';


const CurrentManga = ({route,navigation}) => {
    console.log(route);
    let len = route.params != undefined;
  return (
    <View>
        {len ?  
        <View>
                <Image resizeMode='contain' source={{ uri: "https://remanga.org" + route.params.img.low }} style={styles.coverImage} />
                <Text style={styles.mangaName}>{route.params.main_name}</Text>
                <Geners item={route.params} />
                <Pressable onPress={()=>{navigation.goBack()}}><Text>Назад</Text></Pressable>
        </View>
        
        :
        
        <Text>Не найденно</Text>}
       
       
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
        width: '18%',
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

export default CurrentManga;


// import React from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';

// const MangaInfo = ({ manga }) => {
//   return (
//     <View style={styles.container}>
//       <Image source={{ uri: 'https://remanga.org/' + manga.img.high }} style={styles.coverImage} />
//       <Text style={styles.title}>{manga.rus_name}</Text>
//       <Text style={styles.secondaryTitle}>{manga.secondary_name}</Text>
//       <Text style={styles.description}>{manga.en_name}</Text>
//       <Text style={styles.description}>{manga.main_name}</Text>
//       <Text style={styles.description}>Year: {manga.issue_year}</Text>
//       <Text style={styles.description}>Genres: {manga.genres.map((genre) => genre.name).join(', ')}</Text>
//       <Text style={styles.description}>Total Views: {manga.total_views}</Text>
//       <Text style={styles.description}>Total Votes: {manga.total_votes}</Text>
//       <Text style={styles.description}>Chapters: {manga.count_chapters}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     alignItems: 'center',
//   },
//   coverImage: {
//     width: 200,
//     height: 300,
//     marginBottom: 12,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   secondaryTitle: {
//     fontSize: 20,
//   },
//   description: {
//     fontSize: 16,
//     marginTop: 4,
//   },
// });

// export default MangaInfo;