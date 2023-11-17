import React, { useState, useEffect } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getChapters, getTomes, getElseTomes } from '../redux/readingSlice';
import ChapterList from './ChaptersList';
import SimilarMangaList from './SimilarMngaList';



const CurrentManga = ({ route, navigation }) => {
    const [chaptersVisible, setChaptersVisible] = useState(false);
    let isMangaReceived = route.params !== undefined;
    const manga = route.params;
    const chapter = useSelector((state) => state.read.currentChapters);
    const similarManga = useSelector((state) => state.manga.similarManga);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(chapter);
    }, [chapter]);

    useEffect(() => {
        
        console.log(similarManga);
    }, [chapter]);
    
    const handleGetTomes = (id) => {
        dispatch(getTomes('314'));
        setChaptersVisible(true); 
    };
    

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
            {isMangaReceived ? (
            <>
                <View style={styles.info}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: 'https://remanga.org/' + manga.img.low }} style={styles.coverImage}  />
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.title}>{manga.rus_name}</Text>
                    <Text style={styles.secondaryTitle}>{manga.secondary_name}</Text>
                    <Text style={styles.description}>{manga.en_name}</Text>
                    <Text style={styles.description}>{manga.main_name}</Text>
                    <Text style={styles.description}>Year: {manga.issue_year}</Text>
                    {/* <Text style={styles.description}>Genres: {manga.genres.map((genre) => genre.name).join(', ')}</Text> */}
                    <Text style={styles.description}>Total Views: {manga.total_views}</Text>
                    <Text style={styles.description}>Total Votes: {manga.total_votes}</Text>
                    <Text style={styles.description}>Chapters: {manga.count_chapters}</Text>
                </View>
                </View>

                <TouchableOpacity style={styles.buttonContainer} onPress={handleGetTomes}>
                <Text style={styles.buttonText}>
                    {
                        chaptersVisible ?  "Скрыть Главы" : 'Отобразить главы'
                    }
                </Text>
                </TouchableOpacity>

                {chaptersVisible && <ChapterList navigation={navigation} chapter={chapter} mangaId={manga.id} />}

                <View style={styles.similarMangaContainer}>
                    {similarManga.length > 0 && <SimilarMangaList navigation={navigation} />}
                </View>
            </>
            ) : (
            <Text>Не найденно</Text>
            )}
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 16,
        width: '100%',
    },
    info: {
        flexDirection: 'row',
        width: '100%',
        height: 500, 
    },
    imageContainer: {
        flex: 4,
        paddingRight: 16,
        width: '50%'
    },
    descriptionContainer: {
        flex: 6,
    },
    coverImage: {
        width: '80%', 
        height: '80%', 
        borderRadius: 8,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
color: '#4682B4', // Голубой цвет
            },
    secondaryTitle: {
        fontSize: 20,
color: '#4682B4', // Голубой цвет
            },
    description: {
        fontSize: 16,
        marginTop: 4,
    },
    buttonContainer: {
        backgroundColor: '#3498db',
        width: '100%',
        padding: 10,
        borderRadius: 8,
        marginTop: 16,
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});
  

export default CurrentManga;
