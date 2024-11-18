import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateNote } from '../redux/reducers/notesReducer';
import { RootState } from '../redux/store';
import { StackScreenProps } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../navigation/types';
import Colors from '../theme';

type Props = StackScreenProps<RootStackParamList, 'EditNote'>;

const EditNoteScreen: React.FC<Props> = ({ route, navigation }) => {
  const { noteId } = route.params;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const note = useSelector((state: RootState) => state.notes.notes.find(n => n.id === noteId));
  const [content, setContent] = useState(note?.content || '');

  const handleUpdateNote = () => {
    if (!content) {
      Alert.alert(t('edit_note_screen.error'), t('edit_note_screen.content_cannot_be_empty'));
      return;
    }

    dispatch(updateNote({
      id: noteId,
      content
    }));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>{t('edit_note_screen.edit_note')}</Text>
      </View>
      <View style={styles.form}>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
        multiline
        maxLength={200}
      />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleUpdateNote}>
        <Text style={styles.saveButtonText}>{t('edit_note_screen.save')}</Text>
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

export default EditNoteScreen; 