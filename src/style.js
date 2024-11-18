import { StyleSheet } from 'react-native';
import Colors from './theme';

export const commonStyles = StyleSheet.create({
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
  backButton: {
    marginRight: 10,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    height: 100,
    borderColor: Colors.textPrimary,
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
  },
});
