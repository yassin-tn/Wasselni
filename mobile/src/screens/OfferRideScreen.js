import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, SegmentedButtons, Text, Title } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as api from '../services/api';

export default function OfferRideScreen({ navigation }) {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [availableSeats, setAvailableSeats] = useState('');
  const [pricePerSeat, setPricePerSeat] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      const response = await api.getMyVehicles();
      setVehicles(response.data.vehicles);
      if (response.data.vehicles.length > 0) {
        setSelectedVehicle(response.data.vehicles[0].id.toString());
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de charger vos véhicules');
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDepartureDate(selectedDate);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setDepartureDate(selectedTime);
    }
  };

  const handleSubmit = async () => {
    if (!origin.trim() || !destination.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer l\'origine et la destination');
      return;
    }

    if (!availableSeats || parseInt(availableSeats) < 1) {
      Alert.alert('Erreur', 'Veuillez entrer le nombre de places disponibles');
      return;
    }

    if (!pricePerSeat || parseFloat(pricePerSeat) < 0) {
      Alert.alert('Erreur', 'Veuillez entrer le prix par place');
      return;
    }

    if (vehicles.length === 0) {
      Alert.alert('Erreur', 'Vous devez ajouter un véhicule d\'abord');
      navigation.navigate('AddVehicle');
      return;
    }

    setLoading(true);
    try {
      await api.createRide({
        vehicleId: parseInt(selectedVehicle),
        origin: origin.trim(),
        destination: destination.trim(),
        departureTime: departureDate.toISOString(),
        availableSeats: parseInt(availableSeats),
        pricePerSeat: parseFloat(pricePerSeat),
        notes: notes.trim(),
        // Default coordinates (would use real location in production)
        originLat: 36.8065,
        originLng: 10.1815,
        destinationLat: 36.8510,
        destinationLng: 10.2272
      });

      Alert.alert('Succès', 'Trajet créé avec succès!', [
        { text: 'OK', onPress: () => navigation.navigate('MyRides') }
      ]);
    } catch (error) {
      Alert.alert('Erreur', error.response?.data?.error || 'Échec de la création du trajet');
    } finally {
      setLoading(false);
    }
  };

  if (vehicles.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🚗</Text>
        <Title>Aucun véhicule</Title>
        <Text style={styles.emptyText}>
          Vous devez ajouter un véhicule avant d'offrir un trajet
        </Text>
        <Button 
          mode="contained" 
          onPress={() => navigation.navigate('AddVehicle')}
          style={styles.addButton}
          icon="plus"
        >
          Ajouter un véhicule
        </Button>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Title style={styles.title}>Offrir un trajet</Title>

      <Text style={styles.label}>Véhicule</Text>
      <SegmentedButtons
        value={selectedVehicle}
        onValueChange={setSelectedVehicle}
        buttons={vehicles.map(v => ({
          value: v.id.toString(),
          label: `${v.make} ${v.model}`,
          icon: 'car'
        }))}
        style={styles.input}
      />

      <TextInput
        label="Origine"
        value={origin}
        onChangeText={setOrigin}
        mode="outlined"
        style={styles.input}
        placeholder="Ex: Centre Ville Tunis"
        left={<TextInput.Icon icon="map-marker" />}
      />

      <TextInput
        label="Destination"
        value={destination}
        onChangeText={setDestination}
        mode="outlined"
        style={styles.input}
        placeholder="Ex: Aéroport Tunis-Carthage"
        left={<TextInput.Icon icon="map-marker-check" />}
      />

      <Text style={styles.label}>Date et heure de départ</Text>
      <View style={styles.dateTimeRow}>
        <Button 
          mode="outlined" 
          onPress={() => setShowDatePicker(true)}
          icon="calendar"
          style={styles.dateButton}
        >
          {departureDate.toLocaleDateString('fr-FR')}
        </Button>
        <Button 
          mode="outlined" 
          onPress={() => setShowTimePicker(true)}
          icon="clock"
          style={styles.timeButton}
        >
          {departureDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
        </Button>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={departureDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={departureDate}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}

      <TextInput
        label="Places disponibles"
        value={availableSeats}
        onChangeText={setAvailableSeats}
        mode="outlined"
        keyboardType="number-pad"
        style={styles.input}
        left={<TextInput.Icon icon="seat-passenger" />}
      />

      <TextInput
        label="Prix par place (TND)"
        value={pricePerSeat}
        onChangeText={setPricePerSeat}
        mode="outlined"
        keyboardType="decimal-pad"
        style={styles.input}
        left={<TextInput.Icon icon="cash" />}
      />

      <TextInput
        label="Notes (optionnel)"
        value={notes}
        onChangeText={setNotes}
        mode="outlined"
        multiline
        numberOfLines={3}
        style={styles.input}
        placeholder="Ex: Climatisation disponible, arrêts possibles..."
        left={<TextInput.Icon icon="note-text" />}
      />

      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={loading}
        disabled={loading}
        style={styles.submitButton}
        icon="check"
      >
        Offrir ce trajet
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 8,
  },
  input: {
    marginBottom: 16,
  },
  dateTimeRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  dateButton: {
    flex: 1,
  },
  timeButton: {
    flex: 1,
  },
  submitButton: {
    marginTop: 20,
    marginBottom: 40,
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 8,
    marginBottom: 24,
  },
  addButton: {
    paddingHorizontal: 20,
  },
});
