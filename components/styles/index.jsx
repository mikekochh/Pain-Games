import { StyleSheet } from "react-native"
import { Platform } from "react-native";

export const isAndroid = () => {
  if (Platform.OS === "android") {
    return true;
  } else {
    return false;
  }
};

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        color: '#fff',
    },
    exerciseTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 4,
    },
    exerciseContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    exerciseContent: {
        alignItems: 'center',
    },
    header: {
        backgroundColor: '#1e88e5',
        padding: 20,
        alignItems: 'center',
        width: "100%",
        justifyContent: 'center'
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    exercisesContainer: {
        marginTop: 16,
      },
      exerciseItem: {
        backgroundColor: '#f0f0f0',
        padding: 12,
        marginBottom: 8,
      },
      exerciseName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
      },
      tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      tag: {
        backgroundColor: '#e0e0e0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginRight: 4,
        marginBottom: 4,
      },
});