import React, { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { API_BASE_URL } from '../constants';
import axios from 'axios';

export const WorkoutContext = createContext(null);

export const WorkoutProvider = ({ children }) => {
    const [workoutID, setWorkoutID] = useState(null);
    const [workoutTime, setWorkoutTime] = useState(0);
    const [workoutSets, setWorkoutSets] = useState([]);

    useEffect(() => {
        if (workoutID) {
            console.log("Starting workout timer for workoutID: ", workoutID);
    
            // Reset workout time to 0 whenever workoutID changes
            setWorkoutTime(0);
    
            const workoutTimer = setInterval(() => {
                setWorkoutTime((prevTime) => prevTime + 1);
            }, 1000);
    
            // Cleanup the timer when workoutID changes or component unmounts
            return () => clearInterval(workoutTimer);
        }
    }, [workoutID]);

    const startWorkout = async (userID) => {
        try {
            console.log("starting workout for user: ", userID);
            // Generate a new workout ID so we can save sets and stuff to it
            const response = await axios.post(`${API_BASE_URL}/api/workout/startNewWorkout`, {
                userID
            });
    
            // Log the response from the backend
            console.log("response: ", response);
    
            // Update the state with the newly created workoutID
            if (response.data && response.data.workoutID) {
                setWorkoutID(response.data.workoutID);
                console.log("Workout ID set: ", response.data.workoutID);
            } else {
                console.error("Invalid response: ", response);
            }
        } catch (error) {
            console.error("Failed to start workout: ", error);
        }
    };

    const addSetsToWorkout = (sets, exerciseID) => {
        setWorkoutSets((prevWorkoutSets) => [
            ...prevWorkoutSets,
            ...sets.map((set) => ({ ...set, exerciseID }))
        ]);
    };
    

    const endWorkout = async () => {
        setWorkoutID(null);
        setWorkoutTime(0);
    }

    return (
        <WorkoutContext.Provider value={{
            workoutID,
            workoutTime,
            workoutSets,
            startWorkout,
            addSetsToWorkout,
            setWorkoutSets
        }}>
            {children}
        </WorkoutContext.Provider>
    );
};