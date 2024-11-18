import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Picker from '../components/Picker';
import { useDispatch } from 'react-redux';
import { addNote } from '../redux/reducers/notesReducer';
import { NewNoteScreenNavigationProp } from '../navigation/types';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Category } from '../enums/CategoryEnum';
import Colors from '../theme';

type Props = {
  navigation: NewNoteScreenNavigationProp;
};

const categories = [
  { label: 'Work and Study', value: Category.WorkAndStudy },
  { label: 'Life', value: Category.Life },
  { label: 'Health and Wellness', value: Category.HealthAndWellness },
];

const NewNoteScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [categoryId, setCategoryId] = useState<Category | ''>('');
  const [content, setContent] = useState('');

  const handleSaveNote = () => {
    if (!categoryId || !content) {
      Alert.alert(t('new_note_screen.error'), t('new_note_screen.select_category_and_content'));
      return;
    }

    if (content.length > 200) {
      Alert.alert(t('new_note_screen.error'), t('new_note_screen.content_exceeds_limit'));
      return;
    }

    const newNote = {
      category: categoryId,
      content,
      createdAt: new Date().toISOString(),
    };

    dispatch(addNote(newNote));
    setCategoryId('');
    setContent('');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>{t('new_note_screen.new_note')}</Text>
      </View>
      <View style={styles.form}>
        <Picker
          options={categories.map(category => ({
            label: t(`category.${category.label}`),
            value: category.value,
          }))}
          selectedValue={categoryId}
          onValueChange={(value) => setCategoryId(value as Category)}
          placeholder={t('new_note_screen.choose_category')}
        />

        <TextInput
          style={styles.input}
          placeholder={t('new_note_screen.input_note_content')}
          placeholderTextColor={Colors.textPrimary}
          value={content}
          onChangeText={setContent}
          multiline
          maxLength={200}
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveNote}>
          <Text style={styles.saveButtonText}>{t('new_note_screen.save')}</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
    paddingTop: 20,
    marginTop:30
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
    marginRight: 15,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 24,
    fontWeight: 'bold',
  },
  form: {
    flex: 1,
    backgroundColor: Colors.secondaryBackground,
    padding: 20,
  },
  input: {
    backgroundColor: Colors.optionBackground,
    borderRadius: 12,
    padding: 15,
    height: 300,
    color: Colors.textPrimary,
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: Colors.accent,
    margin:30,
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NewNoteScreen;
