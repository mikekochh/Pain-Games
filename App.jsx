import React, { useContext, useEffect } from 'react';
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
import WorkoutSummaryScreen from './screens/WorkoutSummaryScreen';
import LoginScreen from './screens/LoginScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import ProfileScreen from './screens/ProfileScreen';
import PersonalScreen from './screens/PersonalScreen';
import { WorkoutProvider } from './components/context/WorkoutProvider';
import { AuthContext, AuthProvider } from './components/context/AuthProvider';

function RootNavigator() {
  const { user, checkLoginStatus } = useContext(AuthContext) || {};

  useEffect(() => {
    checkLoginStatus?.();
  }, []);

  return (
    <NavigationContainer>
      {user ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  )
}

// Placeholder Screens
const FriendsScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.text}>Friends Screen</Text>
  </View>
);

const ColosseumScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.text}>Colloseum Screen</Text>
  </View>
);

// Stack Navigator for the Home Tab
const HomeStack = createStackNavigator();
const PersonalStack = createStackNavigator();

function PersonalStackScreen() {
  return (
    <PersonalStack.Navigator screenOptions={{ headerShown: false }}>
      <PersonalStack.Screen name="PersonalMain" component={PersonalScreen} />
      <PersonalStack.Screen name="Summary" component={WorkoutSummaryScreen} />
    </PersonalStack.Navigator>
  )
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="Workout" component={WorkoutScreen} />
      <HomeStack.Screen name="Summary" component={WorkoutSummaryScreen} />
    </HomeStack.Navigator>
  );
}

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen 
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen 
        name="CreateAccount"
        component={CreateAccountScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  )
}

function AppTabs() {
  return (
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
      <Tab.Screen name="Personal" component={PersonalStackScreen} />
      <Tab.Screen name="Friends" component={FriendsScreen} />
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Colosseum" component={ColosseumScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <WorkoutProvider>
      <AuthProvider>
        <View style={styles.appContainer}>
          <RootNavigator />
        </View>
      </AuthProvider>
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
