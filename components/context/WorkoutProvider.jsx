import React, { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { API_BASE_URL } from '../constants';
import axios from 'axios';

export const WorkoutContext = createContext(null);

export const WorkoutProvider = ({ children }) => {
    const [workoutID, setWorkoutID] = useState(null);
    const [workoutTime, setWorkoutTime] = useState(0);
    const [isWorkoutPaused, setIsWorkoutPaused] = useState(false);
    const [pausedWorkoutTime, setPausedWorkoutTime] = useState(0);
    const [workoutSets, setWorkoutSets] = useState([]);

    useEffect(() => {
        if (workoutID) {
            // Reset workout time to 0 whenever workoutID changes
            console.log("changing workoutID and workout time to 0...");
            setWorkoutTime(0);
    
            const workoutTimer = setInterval(() => {
                setWorkoutTime((prevTime) => prevTime + 1);
            }, 1000);
    
            // Cleanup the timer when workoutID changes or component unmounts
            return () => clearInterval(workoutTimer);
        }
    }, [workoutID]);

    useEffect(() => {
        if (isWorkoutPaused) {
            setPausedWorkoutTime(workoutTime);
        }
        else {
            setWorkoutTime(pausedWorkoutTime);
        }
    }, [isWorkoutPaused])

    const startWorkout = async (userID) => {
        try {
            // Generate a new workout ID so we can save sets and stuff to it
            const response = await axios.post(`${API_BASE_URL}/api/workout/startNewWorkout`, {
                userID
            });
    
            // Update the state with the newly created workoutID
            if (response.data && response.data.workoutID) {
                setWorkoutID(response.data.workoutID);
                setWorkoutSets([]);
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
    

    const endWorkout = async (totalVolume, userID) => {
        const response = await axios.post(`${API_BASE_URL}/api/workout/endWorkout`, {
            workoutID,
            totalVolume,
            workoutDuration: pausedWorkoutTime
        });

        const checkHighestLiftsResponse = await axios.post(`${API_BASE_URL}/api/user/checkMaxAndPRs`, {
            userID,
            workoutSets
        });
        
        setWorkoutID(null);
        setWorkoutTime(0);
        setPausedWorkoutTime(0);
    }

    return (
        <WorkoutContext.Provider value={{
            workoutID,
            workoutTime,
            workoutSets,
            pausedWorkoutTime,
            startWorkout,
            addSetsToWorkout,
            setWorkoutSets,
            endWorkout,
            setIsWorkoutPaused
        }}>
            {children}
        </WorkoutContext.Provider>
    );
};