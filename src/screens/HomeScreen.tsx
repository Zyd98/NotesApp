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
import { useTranslation } from 'react-i18next';
import Colors from '../theme';

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
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
    Alert.alert(t('home_screen.delete_note'), t('home_screen.are_you_sure_you_want_to_delete_this_note'), [
      { text: t('home_screen.cancel'), style: 'cancel' },
      {
        text: t('home_screen.delete'),
        style: 'destructive',
        onPress: () => dispatch(deleteNote(noteId)),
      },
    ]);
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>{t('home_screen.home')}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings-outline" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
      <View style={styles.recentlyHeader}>
      <Ionicons
              name={'time-outline'}
              size={20}
              color={Colors.textPrimary}
            />
      <Text style={styles.subtitle}>{t('home_screen.recently_created_notes')}</Text>
      </View>
      {Object.entries(notesByCategory).map(([categoryId, notes]) => (
        <View key={categoryId} style={styles.categorySection}>
          <View style={styles.categoryHeader}>
            <Ionicons
              name={categoryIcons[categoryId as Category] as any || 'bookmark-outline'}
              size={20}
              color={Colors.accent}
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
                onPress={() => navigation.navigate('EditNote', { noteId: item.id })}
              >
                <Text style={styles.noteText}>
                  {item.content.slice(0, 20)}{item.content.length > 20 ? '...' : ''}
                </Text>
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color={Colors.accent}
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
    backgroundColor: Colors.primaryBackground,
    marginTop:30
  },
  content: {
    flex: 1,
    backgroundColor: Colors.secondaryBackground,
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
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textPrimary,
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
    color: Colors.textPrimary,
    marginLeft: 8,
  },
  noteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.optionBackground,
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 5,
    borderColor: Colors.borderColor,
    borderWidth: 0.2,
  },
  noteText: {
    color: Colors.textPrimary,
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
});

export default HomeScreen;
