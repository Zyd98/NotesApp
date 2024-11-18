import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreenNavigationProp } from '../navigation/types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote } from '../redux/reducers/notesReducer';
import { RootState } from '../redux/store';
import { getCategoryLabel } from '../utils/categoryUtils';
import { Category } from '../enums/CategoryEnum';

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const notes = useSelector((state: RootState) => state.notes.notes);

  const categoryIcons: Record<Category, string> = {
    [Category.WorkAndStudy]: 'school-outline',
    [Category.Life]: 'home-outline',
    [Category.HealthAndWellness]: 'fitness-outline',
  };

  // Group notes by category
  const notesByCategory = notes.reduce((acc, note) => {
    const { category } = note;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(note);
    return acc;
  }, {} as Record<string, typeof notes>);

  const handleDeleteNote = (noteId: string) => {
    Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => dispatch(deleteNote(noteId)),
      },
    ]);
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>Home</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
      <View style={styles.recentlyHeader}>
      <Ionicons
              name={'time-outline'}
              size={20}
              color="gray"
            />
      <Text style={styles.subtitle}>Recently created notes</Text>
      </View>
      {Object.entries(notesByCategory).map(([categoryId, notes]) => (
        <View key={categoryId} style={styles.categorySection}>
          <View style={styles.categoryHeader}>
            <Ionicons
              name={categoryIcons[categoryId as Category] as any || 'bookmark-outline'}
              size={20}
              color="#ff6be6"
            />
            <Text style={styles.categoryTitle}>
              {getCategoryLabel(categoryId as Category)}
            </Text>
          </View>
          <FlatList
            data={notes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.noteContainer}
                onLongPress={() => handleDeleteNote(item.id)}
              >
                <Text style={styles.noteText}>{item.content}</Text>
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="#ff6be6"
                />
              </TouchableOpacity>
            )}
          />
        </View>
      ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e014d',
    marginTop:30
  },
  content: {
    flex: 1,
    backgroundColor: '#2A1A5E',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginHorizontal: 20,
  },
  recentlyHeader: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
  },
  noteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3B2C7A',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 5,
    borderColor: 'lightgray',
    borderWidth: 0.2,
  },
  noteText: {
    color: 'white',
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
});

export default HomeScreen;
