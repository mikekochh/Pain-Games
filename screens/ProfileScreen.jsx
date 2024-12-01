import React, { useContext} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../components/context/AuthProvider';

const ProfileScreen = () => {

    const { user, handleLogout } = useContext(AuthContext) || {};

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Loading user information...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: user.profilePicture || 'https://via.placeholder.com/150', // Default image if no profile picture
        }}
        style={styles.profilePicture}
      />
      <Text style={styles.username}>@{user.username}</Text>
      <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60, // Circular shape
    borderWidth: 2,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    color: '#555',
  },
  message: {
    fontSize: 16,
    color: '#555',
  },
});

export default ProfileScreen;
