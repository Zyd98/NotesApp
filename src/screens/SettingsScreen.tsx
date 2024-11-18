import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreenNavigationProp } from '../navigation/types';
import { useDispatch } from 'react-redux';
import { deleteAllNotes } from '../redux/reducers/notesReducer';

type Props = {
  navigation: HomeScreenNavigationProp;
};

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleDeleteAllNotes = () => {
    Alert.alert(
      'Delete All Notes',
      'Are you sure you want to delete all notes? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch(deleteAllNotes());
            Alert.alert('Success', 'All notes have been deleted');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>
      <View style={styles.content}>
      {/* Options List */}
      <TouchableOpacity style={styles.option}>
        <Ionicons name="headset-outline" size={24} color="#ff6be6" />
        <Text style={styles.optionText}>Online Customer</Text>
        <Ionicons name="chevron-forward-outline" size={20} color="#ff6be6" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Ionicons name="document-text-outline" size={24} color="#ff6be6" />
        <Text style={styles.optionText}>User Agreement</Text>
        <Ionicons name="chevron-forward-outline" size={20} color="#ff6be6" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Ionicons name="shield-checkmark-outline" size={24} color="#ff6be6" />
        <Text style={styles.optionText}>Privacy Policy</Text>
        <Ionicons name="chevron-forward-outline" size={20} color="#ff6be6" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Ionicons name="information-circle-outline" size={24} color="#ff6be6" />
        <Text style={styles.optionText}>About Us</Text>
        <Ionicons name="chevron-forward-outline" size={20} color="#ff6be6" />
      </TouchableOpacity>

      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAllNotes}>
        <Text style={styles.deleteButtonText}>Delete All Notes</Text>
      </TouchableOpacity>
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
    color: 'white',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#3B2C7A',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    elevation: 5,
    borderColor: 'lightgray',
    borderWidth: 0.2,
  },
  optionText: {
    flex: 1,
    marginLeft: 10,
    color: 'white',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#ff6be6',
    margin:30,
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
