import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  MainTabs: undefined;
  Home: undefined;
  New: undefined;
  Summary: undefined;
  Settings: undefined;
  EditNote:  { noteId: string};
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

export type NewNoteScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "New"
>;

export type SettingsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Settings"
>;

export type EditNoteScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "EditNote"
>;


