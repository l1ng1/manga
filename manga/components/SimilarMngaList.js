import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';


const SimilarMangaList = ({ navigation }) => {
    const similarManga = useSelector((state) => state.manga.similarManga);
    
    const renderItem = ({ item }) => (
      <TouchableOpacity onPress={() => navigation.navigate('Читать', item.title)}>
        <View style={{ margin: 10 }}>
          <Image
            source={{ uri: 'https://remanga.org/' + item.title.img.low }}
            style={{ width: 100, height: 150 }}
          />
          <Text>{item.title.main_name}</Text>
          <Text>{item.title.en_name}</Text>
          <Text>Rating: {item.avg_rating}</Text>
        </View>
      </TouchableOpacity>
    );

    return (
        <View>
            <Text style={styles.similarMangaTitle}>Похожая манга</Text>
            <FlatList
                data={similarManga}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
            />
        </View>
        
    );
};

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 10,
    },
    itemContainer: {
        marginRight: 15,
    },
    image: {
        width: 150,
        height: 200,
        borderRadius: 8,
    },
    title: {
        marginTop: 5,
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default SimilarMangaList;
