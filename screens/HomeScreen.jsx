import React, { useContext} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { WorkoutContext } from '../components/context/WorkoutProvider';
import { AuthContext } from '../components/context/AuthProvider';

const HomeScreen = ({ navigation }) => {

  const { startWorkout } = useContext(WorkoutContext) || {};
  const { user } = useContext(AuthContext) || {};

  const handleStartWorkout = () => {
    startWorkout(user.id);
    navigation.navigate('Workout');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pain Games</Text>
      <Text style={styles.subtitle}>Welcome to Hell</Text>

      {/* Start Workout Button */}
      <TouchableOpacity
        style={[styles.button, styles.primaryButton]}
        onPress={() => handleStartWorkout()}
      >
        <Icon name="barbell" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.primaryButtonText}>Start Workout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2B2B2B'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E63946',
    marginBottom: 5
  },
  subtitle: {
    fontSize: 16,
    color: '#E63946',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: '#E63946',
    width: '100%',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default HomeScreen;
