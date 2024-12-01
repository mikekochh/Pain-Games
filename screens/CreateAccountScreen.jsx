import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import styles from '../components/styles';
import { AuthContext } from '../components/context/AuthProvider';

const CreateAccountScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading, handleCreateAccount } = useContext(AuthContext) ?? {};

  const handleCreateAccountPress = () => {
    handleCreateAccount?.(username, password, email, navigation);
  }

  const handleLoginPress = () => {
    navigation.navigate("Login");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join The Pain Games</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#FFFFFF" // White placeholder color
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#FFFFFF" // White placeholder color
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#FFFFFF" // White placeholder color
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {false ? (
        <Text>Loading...</Text>
      ) : (
        <TouchableOpacity style={styles.loginButton} onPress={handleCreateAccountPress}>
          <Text style={styles.loginButtonText}>Feel Pain</Text>
        </TouchableOpacity>
      )}
      <Button title='Already have an account?' onPress={handleLoginPress} />
    </View>
  );
};

export default CreateAccountScreen;