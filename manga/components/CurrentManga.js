import React, { useState, useEffect } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getChapters, getTomes } from '../redux/readingSlice';
import ChapterList from './ChaptersList';

const CurrentManga = ({ route, navigation }) => {
    const [chaptersVisible, setChaptersVisible] = useState(false);
    let isMangaReceived = route.params !== undefined;
    let manga = route.params;
    const chapter = useSelector((state) => state.read.currentChapters);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(chapter);
    }, [chapter]);
    
    const handleGetTomes = () => {
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
                    <Image source={{ uri: 'https://remanga.org/' + manga.img.mid }} style={styles.coverImage} />
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.title}>{manga.rus_name}</Text>
                    <Text style={styles.secondaryTitle}>{manga.secondary_name}</Text>
                    <Text style={styles.description}>{manga.en_name}</Text>
                    <Text style={styles.description}>{manga.main_name}</Text>
                    <Text style={styles.description}>Year: {manga.issue_year}</Text>
                    <Text style={styles.description}>Genres: {manga.genres.map((genre) => genre.name).join(', ')}</Text>
                    <Text style={styles.description}>Total Views: {manga.total_views}</Text>
                    <Text style={styles.description}>Total Votes: {manga.total_votes}</Text>
                    <Text style={styles.description}>Chapters: {manga.count_chapters}</Text>
                </View>
                </View>

                <TouchableOpacity style={styles.buttonContainer} onPress={handleGetTomes}>
                <Text style={styles.buttonText}>Chapters</Text>
                </TouchableOpacity>

                {chaptersVisible && <ChapterList />} {/* Отображение глав только если видимость установлена в true */}
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
        flexDirection: 'column',
        padding: 16,
        width: '100%',
        height: '100%'
    },
    info: {
        flexDirection: 'row',
        width: '100%',
        height: '60%'
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
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    secondaryTitle: {
        fontSize: 20,
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
