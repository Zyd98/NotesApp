import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../theme';
import commonStyles from '../styles/commonStyles';

type PickerOption = {
  label: string;
  value: string;
};

type PickerProps = {
  options: PickerOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
};

const Picker: React.FC<PickerProps> = ({
  options,
  selectedValue,
  onValueChange,
  placeholder = 'Choose a category',
}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleSelect = (value: string) => {
    onValueChange(value);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Selected Option */}
      <TouchableOpacity
        style={styles.selectedOption}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectedOptionText}>
          {selectedValue
            ? options.find((option) => option.value === selectedValue)?.label
            : placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#bbb" />
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={isModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  selectedOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.optionBackground,
    borderRadius: 12,
    padding: 15,
  },
  selectedOptionText: {
    color: Colors.textPrimary,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: Colors.optionBackground,
    borderRadius: 12,
  },
  option: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  optionText: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  closeButton: {
    ...commonStyles.button,
    marginTop: 20,
  },
  closeButtonText: {
    ...commonStyles.buttonText,
  },
});

export default Picker;
