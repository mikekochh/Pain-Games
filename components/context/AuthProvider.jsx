// AuthContext.tsx
import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';
import { API_BASE_URL } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkLoginStatus = async () => {
    try {
      const username = await AsyncStorage.getItem('username') || '';
      const id = await AsyncStorage.getItem('id') || '';

      if (username) {
        await handleLoginShort(username, id);
      }
      
    } catch (error) {
      console.log('Error retreiving login details: ', error);
    }
  }

  const handleLoginShort = async (username, id) => {
    setUser({
      username,
      id
    });
  }

  const storeLoginDetails = async (username, id, password) => {
    try {
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('id', JSON.stringify(id));
      await AsyncStorage.setItem('password', password);
    } catch (error) {
      console.log('Error storing login details: ', error);
    }
  }

  const handleLogin = async (username, password, navigation) => {
    setLoading(true);

    if (username.trim() === '') {
      Alert.alert('Please enter a username');
      setLoading(false);
      return;
    }
    if (password.trim() === '') {
      Alert.alert('Please enter a password');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(API_BASE_URL + "/api/user/login", {
        username: username,
        password: password,
      });

      if (response.data.success) {
        setUser({
          id: response.data.user.id,
          username: username,
          email: response.data.user.email,
        });

        await storeLoginDetails(username, response.data.user.id, password);
      } else {
        // const errorData = await response.json();
        Alert.alert('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Login failed', 'An error occurred during login.');
    }

    setLoading(false);
  };

  const handleCreateAccount = async (username, password, email) => {
    console.log("handleCreateAccount running...");
    setLoading(true);

    if (username.trim() === '') {
      Alert.alert('Please enter a valid username');
      setLoading(false);
      return;
    }
    if (email.trim() === '') {
      Alert.alert('Please enter a valid email');
      setLoading(false);
      return;
    }
    if (password.trim() === '') {
      Alert.alert('Please enter a valid password');
      setLoading(false);
      return;
    }

    const response = await axios.post(API_BASE_URL + "/api/user/createAccount", {
      username: username,
      email: email,
      password: password,
    });

    if (response.status === 200 && response.data.success) {
      const userId = response.data.userId;

      handleLoginShort(username, userId);
    } else {
      console.error("Account creation failed: ", response.data.error || "Unknown error");
      Alert.alert("Account creation failed");
    }

    setLoading(false);
  };


  const handleLogout = async (navigation) => {
    try {
      setUser(null);

      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('password');
      navigation.replace('Home');
    } catch (error) {
      console.log('Error logging out: ', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      handleLogin, 
      handleCreateAccount, 
      handleLogout,
      checkLoginStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
};