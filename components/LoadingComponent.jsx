import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Animated, Easing } from 'react-native';

const Loading = ({ loadingText = "Loading..." }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{loadingText}</Text>
      <ActivityIndicator size="large" color="#007AFF" style={styles.spinner} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 5,
    borderColor: "#007AFF",
    borderTopColor: "transparent",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginVertical: 10,
    textAlign: "center",
  },
  spinner: {
    marginTop: 10,
  },
});

export default Loading;
