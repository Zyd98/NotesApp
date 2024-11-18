import { StyleSheet } from 'react-native';
import Colors from '../theme';

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
    marginTop: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 20,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: Colors.accent,
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: Colors.optionBackground,
    borderRadius: 12,
    padding: 15,
    color: Colors.textPrimary,
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 15,
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

export default commonStyles; 