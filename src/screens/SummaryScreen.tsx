import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Category } from '../enums/CategoryEnum';
import { getCategoryLabel } from '../utils/categoryUtils';
import { Note } from '../redux/reducers/notesReducer';
import Colors from '../theme';
import { useTranslation } from 'react-i18next';

const SummaryScreen = () => {
  const { t } = useTranslation();
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
          <Text style={styles.cardTitle}>{t(`category.${getCategoryLabel(categoryId as Category)}`)}</Text>
          <Text style={styles.cardSubtitle}>{t('summary_screen.topic_total_records', { count: notes.length })}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.detailButton}>
        <Text style={styles.detailButtonText}>{t('summary_screen.detail')}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{t('summary_screen.summary')}</Text>
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
    backgroundColor: Colors.primaryBackground,
    marginTop: 30,
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
    color: Colors.textPrimary,
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
    backgroundColor: Colors.secondaryBackground,
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
    color: Colors.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardSubtitle: {
    color: Colors.textPrimary,
    fontSize: 14,
  },
  detailButton: {
    backgroundColor: Colors.accent,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  detailButtonText: {
    color: Colors.textPrimary,
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default SummaryScreen;
