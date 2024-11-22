import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import styles from '../components/styles';
import { AuthContext } from '../components/context/AuthProvider';

const LoginScreen = ({ navigation }) => {
  
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { handleLogin, loading } = useContext(AuthContext) ?? {};

  const handleLoginPress = () => {
    handleLogin?.(username, password, navigation);
  }

  const handleCreateAccount = () => {
    navigation.navigate('CreateAccount');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <Button title="Login" onPress={handleLoginPress} />
      )}
      <Button title="Create an Account" onPress={handleCreateAccount} />
    </View>
  );
};

export default LoginScreen;