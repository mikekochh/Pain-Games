import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../components/styles';
import axios from 'axios';
import { API_BASE_URL } from '../components/constants';

const ArenaScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState([]);

  const [allUsers, setAllUsers] = useState();


  useEffect(() => {
    const fetchAllUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_BASE_URL + '/api/user/getAllUsers');
            setAllUsers(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error("There was an error fetching the users: ", error);
            return;
        }
    }
    
    fetchAllUsers();
  }, [])

  useEffect(() => {
    console.log("allUsers: ", allUsers);
  }, [allUsers])

  // Handle adding a friend
  const addFriend = (user) => {
    setFriends((prevFriends) => [...prevFriends, user]);
    alert(`${user.name} has been added to your friend list!`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Arena</Text>

      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search for friends..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      

      {/* Search Results */}
      {loading ? (
        <Text style={styles.loadingText}>Searching...</Text>
      ) : (
        <FlatList
            data={allUsers}
            keyExtractor={(item) => item.id || item.username}
            renderItem={({ item }) => (
                <View style={styles.resultItem}>
                    <Text style={styles.resultText}>{item.username || 'Unnamed User'}</Text>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => addFriend(item)}
                    >
                        <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
                </View>
            )}
            ListEmptyComponent={
                !loading && (
                    <Text>No users found. Try searching!</Text>
                )
            }
        />
      )}

      {/* Friend List */}
      <View style={styles.friendListContainer}>
        <Text style={styles.subTitle}>Your Friends:</Text>
        <FlatList
          data={friends}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Text style={styles.friendText}>{item.name}</Text>
          )}
        />
      </View>
    </View>
  );
};

export default ArenaScreen;
