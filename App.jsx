import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';
import {
  HomeIcon,
  UserIcon,
  FireIcon,
  UsersIcon,
  TrophyIcon
} from 'react-native-heroicons/solid'; // Import HeroIcons
import {
  HomeIcon as HomeOutline,
  UserIcon as UserOutline,
  UsersIcon as UsersOutline,
  TrophyIcon as TrophyOutline,
  FireIcon as FireOutline
} from 'react-native-heroicons/outline';
import HomeScreen from './screens/HomeScreen';
import WorkoutScreen from './screens/WorkoutScreen';
import { WorkoutProvider } from './components/context/WorkoutProvider';

// Placeholder Screens
const FriendsScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.text}>Friends Screen</Text>
  </View>
);

const PersonalScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.text}>Personal Screen</Text>
  </View>
);

const ColosseumScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.text}>Colloseum Screen</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.text}>Profile/Settings Screen</Text>
  </View>
);

// Stack Navigator for the Home Tab
const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="Workout" component={WorkoutScreen} />
    </HomeStack.Navigator>
  );
}

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <WorkoutProvider>
      <View style={styles.appContainer}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarStyle: styles.tabBar,
              tabBarLabelStyle: styles.tabBarLabel,
              tabBarIcon: ({ focused, color }) => {
                if (route.name === 'Home') {
                  return focused ? <HomeIcon color={color} size={24} /> : <HomeOutline color={color} size={24} />;
                } else if (route.name === 'Friends') {
                  return focused ? <UsersIcon color={color} size={24} /> : <UsersOutline color={color} size={24} />;
                } else if (route.name === 'Personal') {
                  return focused ? <FireIcon color={color} size={24} /> : <FireOutline color={color} size={24} />;
                } else if (route.name === 'Colosseum') {
                  return focused ? <TrophyIcon color={color} size={24} /> : <TrophyOutline color={color} size={24} />;
                } else if (route.name === 'Profile') {
                  return focused ? <UserIcon color={color} size={24} /> : <UserOutline color={color} size={24} />;
                }
              },
              tabBarActiveTintColor: '#FF0000', // Red text color
              tabBarInactiveTintColor: '#8e8e93',
            })}
          >
            <Tab.Screen name="Personal" component={PersonalScreen} />
            <Tab.Screen name="Friends" component={FriendsScreen} />
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="Colosseum" component={ColosseumScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </WorkoutProvider>
  );
}

// Styles
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#2B2B2B', // Charcoal black background
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2B2B2B', // Charcoal black background
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF0000', // Red text for better visibility
  },
  tabBar: {
    height: 60,
    backgroundColor: '#1F1F1F', // Match the background
    borderTopWidth: 0.5,
    borderTopColor: '#444', // Subtle border color for contrast
  },
  tabBarLabel: {
    fontSize: 12,
    marginBottom: 5,
  },
});
