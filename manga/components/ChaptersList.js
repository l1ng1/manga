import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getChapters, getTomes, getElseTomes, increasePageNumber } from '../redux/readingSlice';

const ChapterList = ({ navigation, chapter, mangaId }) => {
    const currentToms = useSelector((state) => state.read.currentToms);
    const pageNumber = useSelector((state) => state.read.pageNumber);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(currentToms);
        console.log(chapter);
    }, [currentToms]);

    const handleGetChapters = () => {
        dispatch(getChapters('314801'));
    };

    const handleGetElseTomes =  (id, pageNumber) => {
        console.log(pageNumber)
        dispatch(getElseTomes({mangaID: '314', pageNumber: pageNumber}));
        dispatch(increasePageNumber())
    };
    

    return (
        <View>
        {currentToms.length !== 0 ? (
            <>
            {currentToms.map((tom) => (
                <TouchableOpacity
                key={tom.id}
                style={styles.chapterButton}
                onPress={() => {
                    dispatch(getChapters(tom.id));
                    navigation.navigate('chapter', currentToms);
                }}
                >
                <Text>
                    <Text style={styles.textBold}>{`Том ${tom.tome}, `}</Text>
                    <Text>{`Глава ${tom.chapter}`}</Text>
                    {tom.name && <Text style={styles.textItalic}>{` - ${tom.name}`}</Text>}
                </Text>
                </TouchableOpacity>
            ))}
            <Button
                title="Загрузить больше глав"
                onPress={() => {
                    handleGetElseTomes(mangaId, pageNumber)
                }}
                // Добавьте стили для кнопки по вашему усмотрению
            />
            </>
        ) : (
            <Text>Не найдено</Text>
        )}
        </View>
    );
};


const styles = StyleSheet.create({
    chapterButton: {
        padding: 10,
        marginTop: 8,
        marginBottom: 8,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
    },
    textBold: {
        fontWeight: 'bold',
    },
    textItalic: {
        fontStyle: 'italic',
    },
});

export default ChapterList;
