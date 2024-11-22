import React, { useContext, useEffect } from 'react';
import { SafeAreaView, Button, Text, View, TouchableOpacity } from 'react-native';
// import styles from '../components/styles';
import { AuthContext } from '../components/context/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {

  const { 
    user, 
    handleLogout, 
    startWorkout, 
    workout, 
    handleLogin 
  } = useContext(AuthContext) ?? {};

  useEffect(() => {
    console.log("this running?");
    console.log("workout: ", workout);
    const checkLoginStatus = async () => {
      console.log("this should only run when no user logged in");
      try {
        const username = await AsyncStorage.getItem('username');
        const password = await AsyncStorage.getItem('password');

        if (username && password) {
          await handleLogin?.(username, password, navigation);
        } else {
        }
      } catch (error) {
        console.log('Error checking login status:', error);
      }
    };

    if (!user) {
      checkLoginStatus();
    }
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fit Net</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.subtitle}>
          {user && `Welcome back ${user.username}!`}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('AddExercise')}
          >
            <Text style={styles.buttonText}>Add New Exercise</Text>
          </TouchableOpacity>
          {!workout ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => startWorkout?.(navigation)}
            >
              <Text style={styles.buttonText}>Start New Workout</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('StartWorkout')}
            >
              <Text style={styles.buttonText}>Continue Workout</Text>
            </TouchableOpacity>
          )}
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('PastWorkouts')}
            >
                <Text style={styles.buttonText}>View Past Workouts</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('EditProfile')}
            >
                <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
            {!user ? (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Logout')}
                >
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    width: '30%',
    aspectRatio: 1,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#1e88e5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});