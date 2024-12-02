import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import styles from '../components/styles';
import { AuthContext } from '../components/context/AuthProvider';
import Loading from '../components/LoadingComponent';

const LoginScreen = ({ navigation }) => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { handleLogin, loading } = useContext(AuthContext) ?? {};

  const handleLoginPress = () => {
    handleLogin?.(username, password, navigation);
  }

  const handleCreateAccount = () => {
    navigation.navigate('CreateAccount');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome To The Pain Games</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#dddddd"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#dddddd"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {loading ? (
        <Loading loadingText='Loading' />
      ) : (
        <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      )}
      <Button title="Sign Up" onPress={handleCreateAccount} />
    </View>
  );
};

export default LoginScreen;