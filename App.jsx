import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import WorkoutScreen from './screens/WorkoutScreen';
import { WorkoutProvider } from './components/context/WorkoutProvider';

// Placeholder Screens
const ProgressScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.text}>Progress Screen</Text>
  </View>
);

const ExercisesScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.text}>Exercises Library Screen</Text>
  </View>
);

const HistoryScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.text}>Workout History Screen</Text>
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
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: styles.tabBar,
            tabBarLabelStyle: styles.tabBarLabel,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Progress') {
                iconName = focused ? 'barbell' : 'barbell-outline';
              } else if (route.name === 'Exercises') {
                iconName = focused ? 'fitness' : 'fitness-outline';
              } else if (route.name === 'History') {
                iconName = focused ? 'time' : 'time-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: '#8e8e93',
          })}
        >
          <Tab.Screen name="Exercises" component={ExercisesScreen} />
          <Tab.Screen name="Progress" component={ProgressScreen} />
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="History" component={HistoryScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </WorkoutProvider>
  );
}

// Styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tabBar: {
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderTopColor: '#ddd',
  },
  tabBarLabel: {
    fontSize: 12,
    marginBottom: 5,
  },
});
