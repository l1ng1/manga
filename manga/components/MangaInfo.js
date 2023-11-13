import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const MangaInfo = ({ manga }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://remanga.org/' + manga.img.high }} style={styles.coverImage} />
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
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  coverImage: {
    width: 200,
    height: 300,
    marginBottom: 12,
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
});

export default MangaInfo;
