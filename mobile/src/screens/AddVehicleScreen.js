import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import * as api from '../services/api';

export default function AddVehicleScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    color: '',
    plateNumber: '',
    seats: '',
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAdd = async () => {
    if (!formData.make || !formData.model || !formData.plateNumber || !formData.seats) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      await api.createVehicle({
        ...formData,
        year: parseInt(formData.year) || null,
        seats: parseInt(formData.seats),
      });
      Alert.alert('Success', 'Vehicle added successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Add vehicle error:', error);
      Alert.alert('Error', error.response?.data?.error || 'Failed to add vehicle');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Title style={styles.title}>Add Vehicle</Title>

        <TextInput
          label="Make *"
          value={formData.make}
          onChangeText={(v) => updateField('make', v)}
          style={styles.input}
          mode="outlined"
          placeholder="e.g., Toyota, Honda"
        />

        <TextInput
          label="Model *"
          value={formData.model}
          onChangeText={(v) => updateField('model', v)}
          style={styles.input}
          mode="outlined"
          placeholder="e.g., Camry, Civic"
        />

        <TextInput
          label="Year"
          value={formData.year}
          onChangeText={(v) => updateField('year', v)}
          keyboardType="numeric"
          style={styles.input}
          mode="outlined"
          placeholder="e.g., 2020"
        />

        <TextInput
          label="Color"
          value={formData.color}
          onChangeText={(v) => updateField('color', v)}
          style={styles.input}
          mode="outlined"
          placeholder="e.g., Silver, Black"
        />

        <TextInput
          label="Plate Number *"
          value={formData.plateNumber}
          onChangeText={(v) => updateField('plateNumber', v)}
          autoCapitalize="characters"
          style={styles.input}
          mode="outlined"
          placeholder="e.g., ABC123"
        />

        <TextInput
          label="Number of Seats *"
          value={formData.seats}
          onChangeText={(v) => updateField('seats', v)}
          keyboardType="numeric"
          style={styles.input}
          mode="outlined"
          placeholder="e.g., 4"
        />

        <Button
          mode="contained"
          onPress={handleAdd}
          loading={loading}
          disabled={loading}
          style={styles.button}
          icon="plus"
        >
          Add Vehicle
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  title: {
    marginBottom: 20,
    fontSize: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 10,
    paddingVertical: 6,
  },
});
