import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { getImg } from '../redux/readingSlice';
const MangaRead = ({route,navigation}) => {

  const img = useSelector((state) => state.read.currentImg);
  const chapter = useSelector((state) => state.read.currentChapters);
    const dispatch = useDispatch();
    dispatch(getImg(chapter));
    useEffect(() => {
        console.log(chapter);
    }, []);


    return (
      <View >
          <Text>Компонент для чтения(картинки)</Text>
      </View>
    )
};



export default MangaRead;