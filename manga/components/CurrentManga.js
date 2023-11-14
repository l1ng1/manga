import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CurrentManga = ({ route, navigation }) => {
    console.log('current');
    console.log(route);
    let isMangaReceived = route.params !== undefined;
    let manga = route.params;

    return (
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
                    
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => {console.log(manga.count_chapters)}}>
                        <Text style={styles.buttonText}>Chapters</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <Text>Не найденно</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
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
        width: '100%',
        height: '100%',
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
