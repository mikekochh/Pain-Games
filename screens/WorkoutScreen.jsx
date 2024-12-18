import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AddExerciseModal from '../components/modals/AddExerciseModal';
import EndWorkoutModal from '../components/modals/EndWorkoutModal';
import axios from 'axios';
import { API_BASE_URL } from '../components/constants';
import { WorkoutContext } from '../components/context/WorkoutProvider';
import Loading from '../components/LoadingComponent';

const WorkoutScreen = ({ navigation }) => {
  const [currentExercise, setCurrentExercise] = useState({}); // Active exercise
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility
  const [endWorkoutModalVisibile, setEndWorkoutModalVisible] = useState(false);
  const { workoutID, workoutTime, workoutSets, setWorkoutSets, setIsWorkoutPaused } = useContext(WorkoutContext) || {};
  const [exercises, setExercises] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const handleResumeWorkout = () => {
    setEndWorkoutModalVisible(false);
    setIsWorkoutPaused(false);
  }

  const handleStopWorkout = () => {
    setIsWorkoutPaused(true);
    setEndWorkoutModalVisible(true);
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleExerciseClick = (exercise) => {
    setCurrentExercise(exercise);
    setModalVisible(true); // Open the modal
  };

  const finishWorkout = () => {
    navigation.navigate('Summary', { workoutID: workoutID });
    setEndWorkoutModalVisible(false);
  }

  const handleSave = async (sets) => {
    try {
      const newSets = sets
        .filter((set) => set.new)
        .filter((set) => set.reps !== '' && set.weight !== '');
      
      const updatedSets = sets
        .filter((set) => set.updated && !set.new)
        .filter((set) => set.reps !== '' && set.weight !== '');
      
      if (newSets.length > 0) {
        const responseInsert = await axios.post(API_BASE_URL + '/api/workout/addSets', {
          userID: 1,
          sets: newSets,
          exerciseID: currentExercise.id,
          workoutID
        });
  
        if (responseInsert.status === 200 && responseInsert.data) {
          console.log("Successfully added the new sets");
        }
        else {
          console.error('There was an issue inserting new sets');
          return;
        }
      } 

      if (updatedSets.length > 0) {
        const responseUpdate = await axios.post(API_BASE_URL + '/api/workout/updateSets', {
          updatedSets
        });
  
        if (responseUpdate.status === 200 && responseUpdate.data) {
          console.log("Successfully updated the sets!");
        }
        else {
          console.error('There was an issue updating the sets');
          return;
        }
      }

      setWorkoutSets((prevWorkoutSets) => {
        // Update existing sets
        const updatedWorkoutSets = prevWorkoutSets.map((set) => {
          const updatedSet = updatedSets.find((updatedSet) => updatedSet.id === set.id);
          if (updatedSet) {
            return { 
              ...updatedSet, 
              exerciseID: currentExercise.id, // Add exerciseID to updated sets
              new: false, 
              updated: false // Reset flags
            };
          }
          return set;
        });
      
        // Ensure each new set includes exerciseID and reset flags
        const newSetsWithExerciseID = newSets.map((set) => ({
          ...set,
          exerciseID: currentExercise.id,
          new: false,
          updated: false // Reset flags for new sets
        }));
      
        // Add new sets with exerciseID and reset flags
        return [...updatedWorkoutSets, ...newSetsWithExerciseID];
      });           
      setModalVisible(false);
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
      <TouchableOpacity style={styles.stopButton} onPress={handleStopWorkout}>
        <View style={styles.stopIcon} />
      </TouchableOpacity>

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
      <EndWorkoutModal 
        visible={endWorkoutModalVisibile}
        onClose={handleResumeWorkout}
        onDone={finishWorkout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2B2B2B',
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
    color: '#E63946',
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
    color: '#E63946',
    marginBottom: 10,
  },
  exerciseList: {
    paddingBottom: 20,
  },
  exerciseButton: {
    backgroundColor: '#C76605',
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
    backgroundColor: '#D97706',
    borderColor: 'black', // Blue border for emphasis
    borderWidth: 2,
  },
  exerciseText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  exerciseTextHighlighted: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#black', // Matches the highlighted border color
  },
  stopButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  stopIcon: {
    width: 15,
    height: 15,
    backgroundColor: '#FFFFFF',
  },
});


export default WorkoutScreen;
