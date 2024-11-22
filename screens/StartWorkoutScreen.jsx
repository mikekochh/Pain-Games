import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AddExerciseModal from '../components/modals/AddExerciseModal';

const StartWorkoutScreen = () => {
  const [workoutTime, setWorkoutTime] = useState(0); // Total workout timer
  const [currentExercise, setCurrentExercise] = useState(null); // Active exercise
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility
  const [weight, setWeight] = useState(''); // Input for weight
  const [sets, setSets] = useState(''); // Input for sets

  // Dummy data for exercises
  const exercises = [
    { id: '1', name: 'Bench Press' },
    { id: '2', name: 'Deadlift' },
    { id: '3', name: 'Squat' },
    { id: '4', name: 'Pull-Ups' },
    { id: '5', name: 'Overhead Press' },
  ];

  useEffect(() => {
    const workoutTimer = setInterval(() => {
      setWorkoutTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(workoutTimer); // Cleanup timer
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleExerciseClick = (exercise) => {
    setCurrentExercise(exercise.name);
    setModalVisible(true); // Open the modal
  };

  const handleSave = () => {
    console.log(`Exercise: ${currentExercise}, Weight: ${weight}, Sets: ${sets}`);
    setModalVisible(false); // Close the modal
    setWeight(''); // Clear input
    setSets(''); // Clear input
  };

  return (
    <View style={styles.container}>
      {/* Timer at the Top */}
      <View style={styles.timerContainer}>
        <Text style={styles.timerLabel}>Workout Time</Text>
        <Text style={styles.timer}>{formatTime(workoutTime)}</Text>
      </View>

      {/* Current Exercise */}
      {currentExercise && (
        <View style={styles.currentExerciseContainer}>
          <Text style={styles.currentExerciseLabel}>Current Exercise:</Text>
          <Text style={styles.currentExercise}>{currentExercise}</Text>
        </View>
      )}

      {/* Exercise List */}
      <Text style={styles.exercisesTitle}>Available Exercises</Text>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.exerciseButton}
            onPress={() => handleExerciseClick(item)}
          >
            <Text style={styles.exerciseText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.exerciseList}
      />

      {/* Exercise Modal */}
      <AddExerciseModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        exerciseName={currentExercise}
        weight={weight}
        setWeight={setWeight}
        sets={sets}
        setSets={setSets}
        onSave={handleSave}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  timerLabel: {
    fontSize: 16,
    color: '#777',
  },
  timer: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  currentExerciseContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  currentExerciseLabel: {
    fontSize: 16,
    color: '#555',
  },
  currentExercise: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  exercisesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  exerciseList: {
    paddingBottom: 20,
  },
  exerciseButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exerciseText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

export default StartWorkoutScreen;
