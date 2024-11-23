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
import Loading from '../components/LoadingComponent';

const WorkoutScreen = () => {
  const [currentExercise, setCurrentExercise] = useState({}); // Active exercise
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility
  const { workoutID, workoutTime, workoutSets, setWorkoutSets, addSetsToWorkout } = useContext(WorkoutContext) || {};
  const [exercises, setExercises] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("workoutSets: ", workoutSets);
  }, [workoutSets]);  

  useEffect(() => {
    if (exercises) {
      setLoading(false);
    }
    else {
      setLoading(true);
    }
  }, [exercises])

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

  const handleSave = async (sets) => {
    try {
      console.log("sets: ", sets);
      console.log("currentExercise: ", currentExercise);
      console.log("workoutID: ", workoutID);
  
      const response = await axios.post(API_BASE_URL + '/api/workout/addSets', {
        userID: 1,
        sets,
        exerciseID: currentExercise.id,
        workoutID
      });

      if (response.status === 200 && response.data) {
        console.log("Successfully added the sets!");
        setModalVisible(false);
        addSetsToWorkout(sets, currentExercise.id);
        setCurrentExercise(null);
      } else {
        console.error("Unexpected response when saving sets: ", response);
        alert("There was an issue saving your sets. Please try again");
      }

    } catch (error) {
      console.error("There was an error logging sets for workout: ", error);
      return;
    }
  };

  if (loading) {
    return (
      <Loading loadingText='Starting Workout' />
    )
  }

  return (
    <View style={styles.container}>
      {/* Timer at the Top */}
      <View style={styles.timerContainer}>
        <Text style={styles.timerLabel}>Workout Time</Text>
        <Text style={styles.timer}>{formatTime(workoutTime)}</Text>
      </View>


      <Text style={styles.exercisesTitle}>Exercises</Text>
      <FlatList
        data={exercises}
        renderItem={({ item }) => {
          // Check if the current exercise has sets in workoutSets
          const exerciseSets = workoutSets.filter((set) => set.exerciseID === item.id);
          const hasSets = exerciseSets.length > 0;

          return (
            <TouchableOpacity
              style={[
                styles.exerciseButton,
                hasSets && styles.exerciseButtonHighlighted // Add highlighted style if sets exist
              ]}
              onPress={() => handleExerciseClick(item)}
            >
              <Text
                style={[
                  styles.exerciseText,
                  hasSets && styles.exerciseTextHighlighted // Optional text highlight
                ]}
              >
                {item.exercise_name}
              </Text>
              {hasSets && (
                <Text style={styles.exerciseSetsText}>
                  {exerciseSets.length} {exerciseSets.length === 1 ? 'set' : 'sets'}
                </Text>
              )}
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={styles.exerciseList}
      />

      {/* Exercise Modal */}
      <AddExerciseModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        exercise={currentExercise}
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
  exerciseButtonHighlighted: {
    backgroundColor: '#e6f7ff', // Light blue highlight
    borderColor: '#007AFF', // Blue border for emphasis
    borderWidth: 2,
  },
  exerciseText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  exerciseTextHighlighted: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF', // Matches the highlighted border color
  },
});


export default WorkoutScreen;
