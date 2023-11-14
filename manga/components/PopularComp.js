import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';
import Geners from './GenersComp';


const PopularManga = ({ data, navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Читать', item)}>
            <View style={styles.box}>
              <View style={styles.imageContainer}>
                <Image
                  resizeMode='contain'
                  source={{ uri: 'https://remanga.org' + item.img.low }}
                  style={styles.coverImage}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.mangaName}>{item.main_name}</Text>
                <Text style={styles.additionalInfo}>{item.type}</Text>
                <Text style={styles.additionalInfo}>{item.count_chapters} глав</Text>
                <Geners item={item} />
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flexGrow: 1,
    width: '100%',
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'black',
    padding: 20,
    margin: 10,
    width: '100%',
    alignItems: 'center',
  },
  imageContainer: {
    width: 100, 
    height: 120, 
    marginRight: 15,
  },
  textContainer: {
    flex: 1, // Allow text container to take remaining space
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  mangaName: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#4682B4',
    textAlign: 'center',
  },
  additionalInfo: {
    fontSize: 16,
    color: 'blue',
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
    fontSize: 14,
  },
});

export default PopularManga;
