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
import commonStyles from '../styles/commonStyles';

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
    ...commonStyles.container,
  },
  header: {
    ...commonStyles.header,
  },
  backButton: {
    padding: 8,
    marginRight: 15,
  },
  title: {
    ...commonStyles.title,
  },
  form: {
    flex: 1,
    backgroundColor: Colors.secondaryBackground,
    padding: 20,
  },
  input: {
    ...commonStyles.input,
    height: 300,
  },
  saveButton: {
    ...commonStyles.button,
    margin: 30,
  },
  saveButtonText: {
    ...commonStyles.buttonText,
  },
});

export default EditNoteScreen; 