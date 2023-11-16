import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getChapters, getTomes } from '../redux/readingSlice';

const ChapterList = ({navigation,chapter}) => {
    const currentToms = useSelector((state) => state.read.currentToms);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(currentToms);
        console.log(chapter);
    }, [currentToms]);

    const handleGetChapters = () => {
        dispatch(getChapters('314801'));
    };

    return (
        <View>
            {currentToms.length !== 0 ? (
                currentToms.map((tom) => (
                <TouchableOpacity
                    key={tom.id}
                    style={styles.chapterButton}
                    onPress={() => {
                        dispatch(getChapters(tom.id));
                        navigation.navigate('chapter',currentToms);
                    }}
                >
                    <Text>
                    <Text style={styles.textBold}>{`Том ${tom.tome}, `}</Text>
                    <Text>{`Глава ${tom.chapter}`}</Text>
                    {tom.name && <Text style={styles.textItalic}>{` - ${tom.name}`}</Text>}
                    </Text>
                </TouchableOpacity>
                ))
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
