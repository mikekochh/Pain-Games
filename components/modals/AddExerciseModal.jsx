import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { WorkoutContext } from '../context/WorkoutProvider';
import { API_BASE_URL } from '../constants';
import { AuthContext } from '../context/AuthProvider';
import axios from 'axios';

const AddExerciseModal = ({ visible, onClose, exercise, onSave }) => {
  const { workoutSets } = useContext(WorkoutContext) || {};
  const { user } = useContext(AuthContext) || {};
  const [maxWeight, setMaxWeight] = useState(null);
  const [userPR, setUserPR] = useState(null);
  const [currentTotalWeight, setCurrentTotalWeight] = useState(0);

  const originalSets = [
    { id: 1, reps: '', weight: '', new: true },
    { id: 2, reps: '', weight: '', new: true },
    { id: 3, reps: '', weight: '', new: true },
  ]

  const [sets, setSets] = useState(originalSets);

  useEffect(() => {
    const fetchExerciseMax = async () => {
      const userID = user.id;
      const exerciseID = exercise.id;

      if (exerciseID) {
        const response = await axios.get(`${API_BASE_URL}/api/user/fetchExerciseMax`, {
          params: {
            userID,
            exerciseID
          }
        });
  
        if (response.data.data) {
          setMaxWeight(response.data.data.weight_max);
        }
        else {
          setMaxWeight(null);
        }
      }
    };

    const fetchUserPR = async () => {
      const userID = user.id;
      const exerciseID = exercise.id;

      if (exerciseID) {
        const response = await axios.get(`${API_BASE_URL}/api/user/fetchUserPR`, {
          params: {
            userID,
            exerciseID
          }
        });
  
        if (response.data.data) {
          setUserPR(response.data.data.weight);
        }
        else {
          setUserPR(null);
        }
      }
    }

    const populateExistingSets = () => {
      const existingSets = workoutSets.filter((set) => set.exerciseID === exercise.id);

      if (existingSets.length > 0) {
        setSets(existingSets.map((set, index) => ({
          id: index + 1,
          reps: set.reps || 0,
          weight: set.weight || 0,
          updated: false
        })));
      } else {
        setSets([
          { id: 1, reps: '', weight: '', new: true },
          { id: 2, reps: '', weight: '', new: true },
          { id: 3, reps: '', weight: '', new: true },
        ]);
      }
    };

    if (workoutSets.length > 0 && exercise) {
      populateExistingSets();
    }
    if (visible && exercise) {
      fetchExerciseMax();
      fetchUserPR();
    }

  }, [workoutSets, exercise, visible]);

  const calculateCurrentTotalVolume = (updatedSets) => {
    const totalVolume = updatedSets.reduce((total, set) => {
      return total + (parseInt(set.reps) || 0) * (parseInt(set.weight) || 0);
    }, 0);
    setCurrentTotalWeight(totalVolume);
  };

  const handleInputChange = (id, field, value) => {
    const updatedSets = sets.map((set) =>
      set.id === id ? { ...set, [field]: value, updated: true } : set
    );
    setSets(updatedSets);
    calculateCurrentTotalVolume(updatedSets);
  };

  const addSet = () => {
    setSets((prevSets) => [
      ...prevSets,
      {
        id: prevSets.length + 1,
        reps: '',
        weight: '',
        new: true
      },
    ]);
  };

  const handleSave = () => {
    onSave(sets);
    setSets(null);
  };

  const handleOnClose = () => {
    setUserPR(null);
    setMaxWeight(null);
    setSets(originalSets);
    onClose();
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleOnClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={handleOnClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>

          <Text style={styles.modalTitle}>{exercise?.exercise_name}</Text>
          {maxWeight > 0 && (
            <Text style={styles.maxWeightText}>Max Weight: {maxWeight}lbs</Text>
          )}
          {userPR > 0 && (
            <Text style={styles.maxWeightText}>PR: {userPR}lbs</Text>
          )}

          <FlatList
            data={sets}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.setRow}>
                <Text style={styles.number}>{index + 1}.</Text>
                <TextInput
                  style={[styles.input, styles.repsInput]}
                  placeholder="Reps"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  value={String(item.reps)}
                  onChangeText={(value) => handleInputChange(item.id, 'reps', value)}
                />
                <TextInput
                  style={[styles.input, styles.weightInput]}
                  placeholder="Weight (lbs)"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  value={String(item.weight)}
                  onChangeText={(value) => handleInputChange(item.id, 'weight', value)}
                />
              </View>
            )}
            ListFooterComponent={
              <TouchableOpacity style={styles.addButton} onPress={addSet}>
                <Text style={styles.addButtonText}>+ Add Set</Text>
              </TouchableOpacity>
            }
          />
          <Text style={styles.maxWeightText}>Total Weight Moved: {currentTotalWeight}lbs</Text>

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  number: {
    paddingRight: 10,
    color: '#E63946',
    fontWeight: 'bold'
  },
  modalContainer: {
    flex: 1,
    marginTop: 60,
    backgroundColor: '#2B2B2B',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#E63946'
  },
  maxWeightText: {
    fontSize: 20,
    fontWeight: 'semibold',
    textAlign: 'center',
    color: '#E63946',
    marginBottom: 10
  },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  bulletPoint: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#E63946',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
    textAlign: 'center',
    color: 'white', // White text color when typing
  },
  repsInput: {
    flex: 1,
  },
  weightInput: {
    flex: 2,
  },
  addButton: {
    marginVertical: 10, // Adjusted for proper spacing above and below
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#C5303C',
    borderRadius: 5,
  },  
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  saveButton: {
    flex: 1,
    marginRight: 10,
    padding: 15,
    backgroundColor: '#C5303C',
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cancelButton: {
    flex: 1,
    marginLeft: 10,
    padding: 15,
    backgroundColor: '#FF3B30',
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    width: 35,
    height: 35,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Shadow effect
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});


export default AddExerciseModal;
