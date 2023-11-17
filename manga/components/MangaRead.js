import { View, Text, StyleSheet, Image } from 'react-native';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { getImg } from '../redux/readingSlice';
const MangaRead = ({route,navigation}) => {

  // const img = useSelector((state) => state.read.currentImg);
  // const chapter = useSelector((state) => state.read.currentChapters);
  //   const dispatch = useDispatch();
  //   dispatch(getImg(chapter));
  //   useEffect(() => {
  //       console.log(chapter);
  //   }, []);

    // src="https://img3.reimg.org/images/350/26163/711315eda7bfbbccb12019779aa034fa.jpg"

    return (
      <View >
          <Text>Компонент для чтения(картинки)</Text>
          <Image source={{ uri: 'https://reimg2.org/images/381/24-99/1_re.jpg' }}   />
      </View>
    )
};



export default MangaRead;