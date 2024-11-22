import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, Button, Text, TextInput, Switch, View } from 'react-native';
import styles from '../components/styles';

const EditProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [isMale, setIsMale] = useState(true);

  const handleSave = () => {
    const gender = isMale ? 'Male' : 'Female';
    console.log('Updated Profile:', { name, weight, height, gender });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Weight (kg):</Text>
        <TextInput
          style={styles.input}
          value={weight.toString()}
          onChangeText={(value) => setWeight(parseFloat(value))}
          placeholder="Enter your weight"
          keyboardType="numeric"
        />
        <Text style={styles.label}>Height (cm):</Text>
        <TextInput
          style={styles.input}
          value={height.toString()}
          onChangeText={(value) => setHeight(parseFloat(value))}
          placeholder="Enter your height"
          keyboardType="numeric"
        />
        <View style={styles.genderContainer}>
          <Text style={styles.label}>Gender:</Text>
          <Text style={styles.genderText}>{isMale ? 'Male' : 'Female'}</Text>
          <Switch
            value={isMale}
            onValueChange={setIsMale}
            trackColor={{ false: '#FF0000', true: '#0000FF' }}
          />
        </View>
        <Button title="Save" onPress={handleSave} />
      </View>
    </SafeAreaView>
  );
};

export default EditProfileScreen;