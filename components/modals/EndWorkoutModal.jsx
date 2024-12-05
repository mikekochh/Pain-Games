import React, { useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
} from 'react-native';
import { WorkoutContext } from '../context/WorkoutProvider';
import { AuthContext } from '../context/AuthProvider';

const EndWorkoutModal = ({ visible, onClose, onDone }) => {

    const { endWorkout, pausedWorkoutTime, setIsWorkoutPaused, workoutSets } = useContext(WorkoutContext) || {};
    const { user } = useContext(AuthContext) || {};

    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleClose = () => {
      setIsWorkoutPaused(false);
      onClose();
    }

    const handleFinishWorkout = () => {
      // onDone();
      endWorkout(totalVolume, user.id);
    }

    const calculateTotalVolume = () => {
      return workoutSets.reduce((total, set) => {
        const reps = parseInt(set.reps, 10);
        const weight = parseInt(set.weight, 10);
        return total + reps * weight;
      }, 0);
    }

    const totalVolume = calculateTotalVolume();

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.closeButton} onPress={() => handleClose()}>
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>
    
                    <Text style={styles.modalTitle}>Are you sure you want to end your workout?</Text>
    
                    {/* New Columns for Workout Summary */}
                    <View style={styles.columnsContainer}>
                        <View style={styles.column}>
                            <Text style={styles.columnTitle}>Duration</Text>
                            <Text style={styles.columnData}>{formatTime(pausedWorkoutTime)}</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.columnTitle}>Sets</Text>
                            <Text style={styles.columnData}>{workoutSets.length}</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.columnTitle}>Volume</Text>
                            <Text style={styles.columnData}>{totalVolume} lbs</Text>
                        </View>
                    </View>
    
                    {/* Buttons */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.resumeButton} onPress={onClose}>
                            <Text style={styles.buttonText}>Resume</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.endWorkoutButton} onPress={handleFinishWorkout}>
                            <Text style={styles.buttonText}>End Workout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
    
}


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
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      marginTop: 20,
      color: '#E63946',
      textAlign: 'center',
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
      color: '#fff',
    },
    columnsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 20,
    },
    column: {
        alignItems: "center",
        flex: 1,
    },
    columnTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
        color: 'white'
    },
    columnData: {
        fontSize: 14,
        color: 'white'
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 30,
    },
    resumeButton: {
        flex: 1,
        marginRight: 10,
        paddingVertical: 10,
        backgroundColor: "green",
        borderRadius: 5,
        alignItems: "center",
    },
    endWorkoutButton: {
        flex: 1,
        marginLeft: 10,
        paddingVertical: 10,
        backgroundColor: "red",
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default EndWorkoutModal;

