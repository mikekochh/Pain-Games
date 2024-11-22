import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';

const AddExerciseModal = ({ visible, onClose, exerciseName, onSave }) => {
  const [sets, setSets] = useState([
    { id: 1, reps: '', weight: '' },
    { id: 2, reps: '', weight: '' },
    { id: 3, reps: '', weight: '' },
  ]);

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
      { id: prevSets.length + 1, reps: '', weight: '' },
    ]);
  };

  const handleSave = () => {
    console.log('Saving Exercise:', exerciseName, sets);
    onSave(sets);
    onClose();
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
          <Text style={styles.modalTitle}>{exerciseName}</Text>

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
                    onChangeText={(value) =>
                    handleInputChange(item.id, 'reps', value)
                    }
                />
                <TextInput
                    style={[styles.input, styles.weightInput]}
                    placeholder="Weight (lbs)"
                    keyboardType="numeric"
                    value={item.weight}
                    onChangeText={(value) =>
                    handleInputChange(item.id, 'weight', value)
                    }
                />
                </View>
            )}
            />


          <TouchableOpacity style={styles.addButton} onPress={addSet}>
            <Text style={styles.addButtonText}>+ Add Set</Text>
          </TouchableOpacity>

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
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
    paddingRight: 10
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
    marginTop: 10,
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
});

export default AddExerciseModal;
