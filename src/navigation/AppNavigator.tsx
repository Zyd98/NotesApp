import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import NewNoteScreen from '../screens/NewNoteScreen';
import SummaryScreen from '../screens/SummaryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EditNoteScreen from '../screens/EditNoteScreen';
import { RootStackParamList } from '../navigation/types';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Home') iconName = 'home';
        else if (route.name === 'New') iconName = 'add';
        else if (route.name === 'Summary') iconName = 'list';

        return <Ionicons name={iconName as keyof typeof Ionicons.glyphMap} size={size} color={color} />;
      },
      tabBarStyle: {
        display: route.name === 'New' ? 'none' : 'flex', // Hide tab bar on the "New" screen
        backgroundColor: '#1e014d', // Background color of the tab bar
        borderTopWidth: 0, // Remove top border
        elevation: 5, // Add shadow for Android
      },
      tabBarActiveTintColor: '#ff6be6', // Active tab icon color
      tabBarInactiveTintColor: '#8e8e93', // Inactive tab icon color
      tabBarLabelStyle: {
        fontSize: 10,
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Tab.Screen name="New" component={NewNoteScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Summary" component={SummaryScreen} options={{ headerShown: false }} />
  </Tab.Navigator>
);


const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
    <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="EditNote" component={EditNoteScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default AppNavigator;
