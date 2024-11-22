import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import styles from '../components/styles';
import { AuthContext } from '../components/context/AuthProvider';

const CreateAccountScreen = ({ navigation }) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { loading, handleCreateAccount } = useContext(AuthContext) ?? {};

  const handleCreateAccountPress = () => {
    handleCreateAccount?.(username, password, email, navigation);
  }

  const handleLoginPress = () => {
    navigation.navigate("Login");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <Button title="Create Account" onPress={handleCreateAccountPress} />
      )}
      <Button title='Already have an account?' onPress={handleLoginPress} />
    </View>
  );
};

export default CreateAccountScreen;