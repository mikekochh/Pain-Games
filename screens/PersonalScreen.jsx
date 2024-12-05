import React, { useState, useContext, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '../components/constants';
import Loading from '../components/LoadingComponent';
import { AuthContext } from '../components/context/AuthProvider';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../components/styles';

const PersonalScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext) || {};

  const [userWorkouts, setUserWorkouts] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const fetchPastWorkouts = async () => {
        try {
          console.log("user: ", user);
          const response = await axios.get(`${API_BASE_URL}/api/user/fetchPastWorkouts/${user.id}`);
          console.log("response: ", response.data);
          setUserWorkouts(response.data.data); // Store all workouts
        } catch (error) {
          console.error("Error fetching workouts:", error);
        }
      };

      fetchPastWorkouts();
    }, [user])
  );

  if (!userWorkouts) {
    return <Loading loadingText="Loading Workouts" />;
  }

  const renderWorkout = ({ item }) => (
    <TouchableOpacity
      style={styles.workoutCard}
      onPress={() => navigation.navigate('Summary', { workoutID: item.id })} // Navigate with workoutID
    >
      <Text style={styles.workoutText}>Date: {new Date(item.created_at).toLocaleString()}</Text>
      <Text style={styles.workoutText}>Workout Length: {item.workout_length} minutes</Text>
      <Text style={styles.workoutText}>Total Volume: {item.total_volume}</Text>
      <Text style={styles.workoutText}>Sets: {item.sets.length} sets</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Workouts</Text>
      <FlatList
        data={userWorkouts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderWorkout}
        contentContainerStyle={styles.workoutList}
      />
    </View>
  );
};

export default PersonalScreen;
