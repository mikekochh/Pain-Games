import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AddExerciseModal from '../components/modals/AddExerciseModal';
import axios from 'axios';
import { API_BASE_URL } from '../components/constants';
import { WorkoutContext } from '../components/context/WorkoutProvider';

const WorkoutScreen = () => {
  const [currentExercise, setCurrentExercise] = useState({}); // Active exercise
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility
  const [sets, setSets] = useState([{}]); // An array of objects for sets (weight, reps)
  const { workoutID, workoutTime } = useContext(WorkoutContext) || {};
  const [exercises, setExercises] = useState(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(API_BASE_URL + '/api/exercise/getExercises');

        console.log('Fetch exercises: ', response.data);
  
        if (response.data && response.data.data) {
          setExercises(response.data.data);
        } else {
          console.error('Unexpected response format: ', response);
        }
      } catch (error) {
        console.error("There was an error fetching the exercises: ", error);
      }
    }

    fetchExercises();
  }, [])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleExerciseClick = (exercise) => {
    setCurrentExercise(exercise);
    setModalVisible(true); // Open the modal
  };

  const handleSave = async () => {
    setModalVisible(false); // Close the modal
    // send exerciseID, userID, and sets to backend
    // send workoutID, exerciseID, userID, and sets to backend server
    setWorkout();

    setSets(''); // Clear input
  };

  return (
    <View style={styles.container}>
      {/* Timer at the Top */}
      <View style={styles.timerContainer}>
        <Text style={styles.timerLabel}>Workout Time</Text>
        <Text style={styles.timer}>{formatTime(workoutTime)}</Text>
      </View>


      {/* Exercise List */}
      <Text style={styles.exercisesTitle}>Exercises</Text>
      <FlatList
        data={exercises}
        // keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.exerciseButton}
            onPress={() => handleExerciseClick(item)}
          >
            <Text style={styles.exerciseText}>{item.exercise_name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.exerciseList}
      />

      {/* Exercise Modal */}
      <AddExerciseModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        exercise={currentExercise}
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

export default WorkoutScreen;
