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
        backgroundColor: '#2B2B2B',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        marginTop: 100,
        color: '#E63946',
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
        borderColor: '#E63946',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        color: '#E63946'
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
      loginButton: {
        backgroundColor: '#E63946', // Intense red background
        borderWidth: 2,            // Black border
        borderColor: '#000',       // Border color
        borderRadius: 8,           // Rounded corners for a smoother look
        paddingVertical: 12,       // Vertical padding for height
        paddingHorizontal: 20,     // Horizontal padding for width
        alignItems: 'center',      // Center text horizontally
        justifyContent: 'center',  // Center text vertically
        shadowColor: '#000',       // Add shadow for intensity
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,              // Elevation for Android shadow
      },
      loginButtonText: {
        color: '#fff',             // White text for contrast
        fontWeight: 'bold',        // Bold text for intensity
        fontSize: 16,              // Text size for visibility
      },
      resultItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
      },
      resultText: {
        fontSize: 16,
      },
});