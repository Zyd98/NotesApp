import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreenNavigationProp } from '../navigation/types';
import { useDispatch } from 'react-redux';
import { deleteAllNotes } from '../redux/reducers/notesReducer';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../utils/languageUtils';
import Colors from '../theme';

type Props = {
  navigation: HomeScreenNavigationProp;
};

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);

  const handleDeleteAllNotes = () => {
    Alert.alert(
      t('settings_screen.delete_all_notes_title'),
      t('settings_screen.delete_all_notes_message'),
      [
        { text: t('settings_screen.cancel'), style: 'cancel' },
        {
          text: t('settings_screen.delete'),
          style: 'destructive',
          onPress: () => {
            dispatch(deleteAllNotes());
            Alert.alert(t('settings_screen.success'), t('settings_screen.all_notes_deleted'));
          },
        },
      ]
    );
  };

  const handleLanguageChange = (language: string) => {
    changeLanguage(language);
    setLanguageModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>{t('settings_screen.settings')}</Text>
      </View>
      <View style={styles.content}>
        {/* Options List */}
        <TouchableOpacity style={styles.option}>
          <Ionicons name="headset-outline" size={24} color={Colors.accent} />
          <Text style={styles.optionText}>{t('settings_screen.online_customer')}</Text>
          <Ionicons name="chevron-forward-outline" size={20} color={Colors.accent} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Ionicons name="document-text-outline" size={24} color={Colors.accent} />
          <Text style={styles.optionText}>{t('settings_screen.user_agreement')}</Text>
          <Ionicons name="chevron-forward-outline" size={20} color={Colors.accent} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Ionicons name="shield-checkmark-outline" size={24} color={Colors.accent} />
          <Text style={styles.optionText}>{t('settings_screen.privacy_policy')}</Text>
          <Ionicons name="chevron-forward-outline" size={20} color={Colors.accent} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => setLanguageModalVisible(true)}>
          <Ionicons name="language-outline" size={24} color={Colors.accent} />
          <Text style={styles.optionText}>{t('settings_screen.change_language')}</Text>
          <Ionicons name="chevron-forward-outline" size={20} color={Colors.accent} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Ionicons name="information-circle-outline" size={24} color={Colors.accent} />
          <Text style={styles.optionText}>{t('settings_screen.about_us')}</Text>
          <Ionicons name="chevron-forward-outline" size={20} color={Colors.accent} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAllNotes}>
        <Text style={styles.deleteButtonText}>{t('settings_screen.delete_all_notes')}</Text>
      </TouchableOpacity>

      {/* Language Selection Modal */}
      <Modal
        transparent={true}
        visible={isLanguageModalVisible}
        animationType="slide"
        onRequestClose={() => setLanguageModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t('settings_screen.select_language')}</Text>
            <TouchableOpacity onPress={() => handleLanguageChange('en')} style={styles.button}>
              <Text style={styles.buttonText}>{t('settings_screen.english')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLanguageChange('zh')} style={styles.button}>
              <Text style={styles.buttonText}>{t('settings_screen.chinese')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setLanguageModalVisible(false)} style={styles.button}>
              <Text style={styles.buttonText}>{t('settings_screen.cancel')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
    marginTop: 30,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.secondaryBackground,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 20,
  },
  backButton: {
    padding: 8,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.optionBackground,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    elevation: 5,
    borderColor: Colors.borderColor,
    borderWidth: 0.2,
  },
  optionText: {
    flex: 1,
    marginLeft: 10,
    color: Colors.textPrimary,
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: Colors.accent,
    margin: 30,
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    padding: 10,
    backgroundColor: Colors.primaryBackground,
    marginVertical: 5,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: Colors.secondaryBackground,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    color: Colors.textPrimary,
    marginBottom: 20,
  },
});

export default SettingsScreen;
