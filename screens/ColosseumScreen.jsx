import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../components/styles';
import axios from 'axios';
import { API_BASE_URL } from '../components/constants';

const ArenaScreen = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Colosseum</Text>
            <Text style={styles.comingSoon}>Coming Soon</Text>
        </View>
    )
}

export default ArenaScreen;