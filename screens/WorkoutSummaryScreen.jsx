import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '../components/constants';
import Loading from '../components/LoadingComponent';

const WorkoutSummaryScreen = ({ navigation, route }) => {
  const [workoutData, setWorkoutData] = useState(null);
  const [exercises, setExercises] = useState(null);
  const { workoutID } = route.params || {};

  useEffect(() => {
    const fetchExerciseData = async () => {
        try {
            const response = await axios.get(API_BASE_URL + '/api/exercise/getExercises');
            if (response.data && response.data.data) {
                setExercises(response.data.data);
            } else {
                console.error('Unexpected error when fetching exercises: ', response);
            }
        } catch (error) {
            console.error("There was an error fetching the exericses: ", error);
        }
    }

    fetchExerciseData();
  }, [])

  useEffect(() => {
    const fetchWorkoutData = async () => {
      const response = await axios.get(
        `${API_BASE_URL}/api/workout/fetchWorkoutData/${workoutID}`
      );

      console.log("response: ", response.data.data[0]);
      setWorkoutData(response.data.data[0]);
    };

    if (workoutID) {
      fetchWorkoutData();
    }
  }, [workoutID]);

  if (!workoutData) {
    return <Loading loadingText="Loading Workout" />;
  }

  const formatDate = () => {
    return workoutData?.created_at
      ? new Date(workoutData.created_at).toLocaleDateString('en-US', {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit',
        })
      : null;
  };

  const formatWorkoutLength = () => {
    if (
      workoutData?.workout_length === null ||
      workoutData?.workout_length === undefined
    ) {
      return 'N/A';
    }
    const hours = Math.floor(workoutData.workout_length / 60);
    const minutes = workoutData.workout_length % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  };

  const groupSetsByExercise = () => {
    const groupedSets = {};

    workoutData.sets.forEach((set) => {
      if (!groupedSets[set.exercise_id]) {
        groupedSets[set.exercise_id] = [];
      }
      groupedSets[set.exercise_id].push(set);
    });

    return groupedSets;
  };

  const groupedSets = groupSetsByExercise();

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Workout Completed on {formatDate()}</Text>
      <View style={styles.statsContainer}>
        <View style={styles.statColumn}>
          <Text style={styles.statTitle}>Duration</Text>
          <Text style={styles.statValue}>{formatWorkoutLength()}</Text>
        </View>
        <View style={styles.statColumn}>
          <Text style={styles.statTitle}>Volume</Text>
          <Text style={styles.statValue}>
            {workoutData?.total_volume + ' lbs' || 'N/A'}
          </Text>
        </View>
      </View>

      <FlatList
        data={Object.keys(groupedSets)}
        keyExtractor={(item) => item}
        renderItem={({ item: exercise_id }) => {
            // Find the exercise with the corresponding ID
            const exercise = exercises?.find(
                (exercise) => exercise.id === parseInt(exercise_id)
            );

            return (
            <View style={styles.exerciseGroup}>
                <Text style={styles.exerciseTitle}>
                {exercise ? exercise.exercise_name : `Exercise ID: ${exercise_id}`}
                </Text>
                {groupedSets[exercise_id].map((set, index) => (
                <View key={index} style={styles.setContainer}>
                    <Text style={styles.setText}>
                    Set {index + 1}: {set.reps} reps @ {set.weight} lbs
                    </Text>
                </View>
                ))}
            </View>
            );
        }}
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
  titleText: {
    textAlign: 'center',
    paddingTop: 10,
    fontSize: 24,
    color: 'white',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  statColumn: {
    alignItems: 'center',
    flex: 1,
  },
  statTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'white',
  },
  statValue: {
    fontSize: 16,
    color: 'white',
  },
  exerciseGroup: {
    marginTop: 16,
    padding: 10,
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  setContainer: {
    marginBottom: 4,
  },
  setText: {
    fontSize: 16,
    color: 'white',
  },
});

export default WorkoutSummaryScreen;
