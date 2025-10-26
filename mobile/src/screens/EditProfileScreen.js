import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, SegmentedButtons, Title } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import * as api from '../services/api';

export default function EditProfileScreen({ navigation }) {
  const { user, loadUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    gender: '',
    city: '',
    bio: '',
    dateOfBirth: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        phone: user.phone || '',
        gender: user.gender || '',
        city: user.city || '',
        bio: user.bio || '',
        dateOfBirth: user.dateOfBirth || '',
      });
    }
  }, [user]);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!formData.fullName) {
      Alert.alert('Error', 'Full name is required');
      return;
    }

    setLoading(true);
    try {
      await api.updateProfile(formData);
      await loadUser();
      Alert.alert('Success', 'Profile updated successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Update profile error:', error);
      Alert.alert('Error', error.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Title style={styles.title}>Edit Profile</Title>

        <TextInput
          label="Full Name *"
          value={formData.fullName}
          onChangeText={(v) => updateField('fullName', v)}
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label="Phone"
          value={formData.phone}
          onChangeText={(v) => updateField('phone', v)}
          keyboardType="phone-pad"
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label="City"
          value={formData.city}
          onChangeText={(v) => updateField('city', v)}
          style={styles.input}
          mode="outlined"
          placeholder="e.g., New York, Los Angeles"
        />

        <TextInput
          label="Date of Birth"
          value={formData.dateOfBirth}
          onChangeText={(v) => updateField('dateOfBirth', v)}
          style={styles.input}
          mode="outlined"
          placeholder="YYYY-MM-DD"
        />

        <SegmentedButtons
          value={formData.gender}
          onValueChange={(v) => updateField('gender', v)}
          buttons={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' },
          ]}
          style={styles.input}
        />

        <TextInput
          label="Bio"
          value={formData.bio}
          onChangeText={(v) => updateField('bio', v)}
          multiline
          numberOfLines={4}
          style={styles.input}
          mode="outlined"
          placeholder="Tell us about yourself..."
        />

        <Button
          mode="contained"
          onPress={handleSave}
          loading={loading}
          disabled={loading}
          style={styles.button}
        >
          Save Changes
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
