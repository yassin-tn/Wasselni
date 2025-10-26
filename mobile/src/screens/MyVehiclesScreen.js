import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, Button, FAB, Title, Paragraph, Chip } from 'react-native-paper';
import * as api from '../services/api';

export default function MyVehiclesScreen({ navigation }) {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      const response = await api.getMyVehicles();
      setVehicles(response.data.vehicles || []);
    } catch (error) {
      console.error('Load vehicles error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (vehicleId) => {
    Alert.alert(
      'Delete Vehicle',
      'Are you sure you want to delete this vehicle?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.deleteVehicle(vehicleId);
              loadVehicles();
              Alert.alert('Success', 'Vehicle deleted');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete vehicle');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Title>Loading...</Title>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {vehicles.length === 0 ? (
          <View style={styles.empty}>
            <Title>No Vehicles Yet</Title>
            <Paragraph>Add your first vehicle to start offering rides</Paragraph>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('AddVehicle')}
              style={styles.addButton}
              icon="plus"
            >
              Add Vehicle
            </Button>
          </View>
        ) : (
          <>
            {vehicles.map((vehicle) => (
              <Card key={vehicle.id} style={styles.card}>
                <Card.Content>
                  <View style={styles.cardHeader}>
                    <Title>{vehicle.make} {vehicle.model}</Title>
                    <Chip icon="seat">{vehicle.seats} seats</Chip>
                  </View>
                  <Paragraph>Year: {vehicle.year}</Paragraph>
                  <Paragraph>Color: {vehicle.color}</Paragraph>
                  <Paragraph>Plate: {vehicle.plateNumber}</Paragraph>
                </Card.Content>
                <Card.Actions>
                  <Button onPress={() => handleDelete(vehicle.id)} textColor="#d32f2f">
                    Delete
                  </Button>
                </Card.Actions>
              </Card>
            ))}
          </>
        )}
      </ScrollView>

      {vehicles.length > 0 && (
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => navigation.navigate('AddVehicle')}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
    paddingBottom: 80,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  addButton: {
    marginTop: 20,
  },
  card: {
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
