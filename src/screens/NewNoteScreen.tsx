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
import { Category } from '../enums/CategoryEnum';

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
  const [categoryId, setCategoryId] = useState<Category | ''>('');
  const [content, setContent] = useState('');

  const handleSaveNote = () => {
    if (!categoryId || !content) {
      Alert.alert('Error', 'Please select a category and enter content.');
      return;
    }

    if (content.length > 200) {
      Alert.alert('Error', 'Content exceeds 200 characters.');
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
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>New Note</Text>
      </View>
      <View style={styles.form}>
        <Picker
          options={categories}
          selectedValue={categoryId}
          onValueChange={(value) => setCategoryId(value as Category)}
          placeholder="Choose a category"
        />

        <TextInput
          style={styles.input}
          placeholder="Please input note content"
          placeholderTextColor="white"
          value={content}
          onChangeText={setContent}
          multiline
          maxLength={200}
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveNote}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e014d',
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
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  form: {
    flex: 1,
    backgroundColor: '#2A1A5E',
    padding: 20,
  },
  input: {
    backgroundColor: '#3B2C7A',
    borderRadius: 12,
    padding: 15,
    height: 300,
    color: 'white',
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#ff6be6',
    margin:30,
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NewNoteScreen;
