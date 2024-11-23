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

const AddExerciseModal = ({ visible, onClose, exercise, onSave }) => {

  const { workoutSets } = useContext(WorkoutContext) || {};

  const [sets, setSets] = useState([
    { id: 1, reps: 0, weight: 0 },
    { id: 2, reps: 0, weight: 0 },
    { id: 3, reps: 0, weight: 0 },
  ]);

  useEffect(() => {
    const populateExistingSets = () => {
      const existingSets = workoutSets.filter((set) => set.exerciseID === exercise.id);

      if (existingSets.length > 0) {
        setSets(existingSets.map((set, index) => ({
          id: index + 1,
          reps: set.reps || 0,
          weight: set.weight || 0
        })));
      } else {
        setSets([
          { id: 1, reps: 0, weight: 0 },
          { id: 2, reps: 0, weight: 0 },
          { id: 3, reps: 0, weight: 0 },
        ]);
      }
    }

    if (workoutSets.length > 0 && exercise) {
      populateExistingSets();
    }
  }, [workoutSets, exercise])

  const handleInputChange = (id, field, value) => {
    setSets((prevSets) =>
      prevSets.map((set) =>
        set.id === id ? { ...set, [field]: value } : set
      )
    );
  };

  const addSet = () => {
    setSets((prevSets) => [
      ...prevSets,
      {
        id: prevSets.length + 1,
        reps: 0,
        weight: 0
      },
    ]);
  };
  

  const handleSave = () => {
    console.log('Saving Exercise:', exercise.exercise_name, sets);
    onSave(sets);
    setSets(null);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>

          {/* Modal Title */}
          <Text style={styles.modalTitle}>{exercise?.exercise_name}</Text>

          {/* List of Sets */}
          <FlatList
            data={sets}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.setRow}>
                <Text style={styles.number}>{index + 1}.</Text>
                <TextInput
                  style={[styles.input, styles.repsInput]}
                  placeholder="Reps"
                  keyboardType="numeric"
                  value={item.reps}
                  onChangeText={(value) => handleInputChange(item.id, 'reps', value)}
                />
                <TextInput
                  style={[styles.input, styles.weightInput]}
                  placeholder="Weight (lbs)"
                  keyboardType="numeric"
                  value={item.weight}
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

          {/* Save Button */}
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
  },
  modalContainer: {
    flex: 1,
    marginTop: 60,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
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
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
    textAlign: 'center',
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
    backgroundColor: '#007AFF',
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
    backgroundColor: '#007AFF',
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
    backgroundColor: '#fff',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Shadow effect
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});


export default AddExerciseModal;
