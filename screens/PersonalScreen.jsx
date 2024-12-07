import React, { useState, useContext, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '../components/constants';
import Loading from '../components/LoadingComponent';
import { AuthContext } from '../components/context/AuthProvider';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../components/styles';
import moment from 'moment';

const PersonalScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext) || {};

  const [userWorkouts, setUserWorkouts] = useState(null);
  const [totalWorkouts, setTotalWorkouts] = useState(null);
  const [totalWeightMoved, setTotalWeightMoved] = useState(null);
  const [selectedDate, setSelectedDate] = useState(''); // Default to today's date

  useEffect(() => {
    const today = moment().format('YYYY-MM-DD');
    console.log("today: ", today);
    setSelectedDate(today);
  }, [])

  useFocusEffect(
    useCallback(() => {
      const fetchPastWorkouts = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/api/user/fetchPastWorkouts/${user.id}`);
          setUserWorkouts(response.data.data); // Store all workouts

          const workouts = response.data.data;
          
          // Calculate total workouts
          setTotalWorkouts(workouts.length);
          
          // Calculate total weight moved
          const totalVolume = workouts.reduce((acc, workout) => acc + workout.total_volume, 0);
          
          // Format total volume
          const formattedTotalVolume = totalVolume > 1000 
            ? `${(totalVolume / 1000).toFixed(1)}k` 
            : totalVolume;
          
          setTotalWeightMoved(formattedTotalVolume);
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

  // Generate dates for the calendar
  const generateDates = () => {
    const days = [];
    for (let i = -30; i <= 30; i++) {
      days.push(moment().add(i, 'days').format('YYYY-MM-DD'));
    }
    return days;
  };

  const dates = generateDates();

  const handleDatePress = (date) => {
    setSelectedDate(date);
    console.log('Selected Date:', date); // Replace this with navigation or other actions
  };

  const renderDate = ({ item }) => (
    <TouchableOpacity onPress={() => handleDatePress(item)}>
      <View style={[styles.dateItem, item === selectedDate && styles.selectedDateItem]}>
        <Text style={[styles.dateText, item === selectedDate && styles.selectedDateText]}>
          {moment(item).format('D')}
        </Text>
        <Text style={[styles.dateLabel, item === selectedDate && styles.selectedDateLabel]}>
          {moment(item).format('ddd')}
        </Text>
      </View>
    </TouchableOpacity>
  );

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
      {/* Top Card */}
      <View style={styles.statsCard}>
        <Text style={styles.statsTitle}>Personal Pain</Text>
        <View style={styles.statsContent}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{totalWorkouts}</Text>
            <Text style={styles.statLabel}>Total Workouts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{totalWeightMoved} lbs</Text>
            <Text style={styles.statLabel}>Total Weight Moved</Text>
          </View>
        </View>
      </View>

      {/* Scrollable Calendar */}
      <View>
        <FlatList
          data={dates}
          keyExtractor={(item) => item}
          renderItem={renderDate}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.calendarContainer}
        />
      </View>


      {/* Workout List */}
      <FlatList
        data={userWorkouts?.filter(workout => {
          const workoutDate = moment(workout.created_at).format('YYYY-MM-DD');
          console.log("Workout Date:", workoutDate, "Selected Date:", selectedDate); // Debug logs
          return workoutDate === selectedDate;
        })}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderWorkout}
        contentContainerStyle={styles.workoutList}
        ListEmptyComponent={
          <Text style={styles.noWorkoutsText}>No workouts for the selected date.</Text>
        }
      />
    </View>
  );
};

export default PersonalScreen;
