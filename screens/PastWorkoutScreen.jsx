import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, Button, Text, View } from 'react-native';
import styles from '../components/styles';
import { API_WORKOUTS_ENDPOINT, API_BASE_URL } from '../components/constants';

const PastWorkoutScreen = ({ navigation }) => {

    const [workouts, setWorkouts] = useState();

    useEffect(() => {
        const fetchWorkouts = async () => {
          try {
            const response = await fetch(API_BASE_URL + API_WORKOUTS_ENDPOINT);
            if (response.ok) {
              const data = await response.json();
              console.log("data: ", data);
              setWorkouts(data);
            } else {
              console.error('Error fetching workouts:', response.status);
            }
          } catch (error) {
            console.error('Error fetching workouts:', error);
          }
        };
    
        fetchWorkouts();
      }, []);


    return (
        <View>
        <Text>Past Workout Screen</Text>
        <Text>Here, all previous workouts that are completed should appear</Text>
        {workouts?.map((workout, index) => (
          <View key={index}>
            <Text>Workout ID: {workout._id}</Text>
            <Text>Workout Name: {workout.userID}</Text>
          </View>
        ))}
      </View>
    )
}

export default PastWorkoutScreen;