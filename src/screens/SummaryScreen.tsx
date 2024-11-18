import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../redux/store';
import { Category } from '../enums/CategoryEnum';
import { getCategoryLabel } from '../utils/categoryUtils';
import { Note } from '../redux/reducers/notesReducer';
import { Ionicons } from '@expo/vector-icons';

const SummaryScreen = () => {
  const navigation = useNavigation();
  const notes = useSelector((state: RootState) => state.notes.notes);

  // Group notes by category
  const categories = notes.reduce((acc, note) => {
    if (!acc[note.category]) {
      acc[note.category] = [];
    }
    acc[note.category].push(note);
    return acc;
  }, {} as Record<string, Note[]>);

  const categoryIcons = {
    [Category.WorkAndStudy]: require('./../../assets/work_study_icon.png'),
    [Category.Life]: require('./../../assets/home_life_icon.png'),
    [Category.HealthAndWellness]: require('./../../assets/health_wellness_icon.png'),
  };

  const renderCategory = ({ item: [categoryId, notes] }: { item: [string, Note[]] }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Image source={categoryIcons[categoryId as Category]} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{getCategoryLabel(categoryId as Category)}</Text>
          <Text style={styles.cardSubtitle}>This topic has a total of {notes.length} records.</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.detailButton}>
        <Text style={styles.detailButtonText}>Detail</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Summary</Text>
        <Image source={require('./../../assets/robot_icon2.png')} style={styles.headerIcon} />
      </View>
      <FlatList
        data={Object.entries(categories)}
        renderItem={renderCategory}
        keyExtractor={([categoryId]) => categoryId}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e014d',
    marginTop:30
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  backButton: {
    marginRight: 10,
  },
  backButtonText: {
    padding: 8,
    marginRight: 15,
  },
  headerText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerIcon: {
    width: 50,
    height: 50,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#2b1355',
    borderRadius: 12,
    marginVertical: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardSubtitle: {
    color: '#d9d8f3',
    fontSize: 14,
  },
  detailButton: {
    backgroundColor: '#ff6be6',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  detailButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default SummaryScreen;
