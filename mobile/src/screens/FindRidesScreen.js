import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, Alert } from 'react-native';
import { Searchbar, Card, Title, Paragraph, Chip, FAB, Text, Button } from 'react-native-paper';
import { format } from 'date-fns';
import * as api from '../services/api';

export default function FindRidesScreen({ navigation }) {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});

  useEffect(() => {
    loadRides();
  }, []);

  const loadRides = async () => {
    setLoading(true);
    try {
      const response = await api.searchRides(filters);
      setRides(response.data.rides);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de charger les trajets');
    } finally {
      setLoading(false);
    }
  };

  const handleBookRide = (ride) => {
    Alert.alert(
      'Confirmer la réservation',
      `Voulez-vous réserver ce trajet de ${ride.origin} à ${ride.destination} pour ${ride.pricePerSeat} TND?`,
      [
        {
          text: 'Annuler',
          style: 'cancel'
        },
        {
          text: 'Confirmer',
          onPress: async () => {
            try {
              await api.createBooking({
                rideId: ride.id,
                seatsBooked: 1
              });
              Alert.alert('Succès', 'Trajet réservé avec succès!');
              loadRides(); // Refresh to show updated available seats
              navigation.navigate('MyBookings');
            } catch (error) {
              Alert.alert('Erreur', error.response?.data?.error || 'Échec de la réservation');
            }
          }
        }
      ]
    );
  };

  const renderRide = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.routeContainer}>
          <Title style={styles.location}>{item.origin}</Title>
          <Text style={styles.arrow}>→</Text>
          <Title style={styles.location}>{item.destination}</Title>
        </View>

        <Paragraph style={styles.time}>
          {format(new Date(item.departureTime), 'PPp')}
        </Paragraph>

        <View style={styles.infoRow}>
          <Chip icon="account">{item.driver.fullName}</Chip>
          <Chip icon="star">{item.driver.rating}</Chip>
          <Chip icon="seat-passenger">{item.availableSeats} places</Chip>
          <Chip icon="cash">{item.pricePerSeat} TND/place</Chip>
        </View>

        {item.vehicle && (
          <Paragraph style={styles.vehicle}>
            {item.vehicle.make} {item.vehicle.model} • {item.vehicle.color}
          </Paragraph>
        )}

        {item.notes && (
          <Paragraph style={styles.notes}>
            💬 {item.notes}
          </Paragraph>
        )}

        <Button
          mode="contained"
          onPress={() => handleBookRide(item)}
          style={styles.bookButton}
          icon="calendar-check"
        >
          Réserver
        </Button>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search origin or destination..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />

      <FlatList
        data={rides}
        renderItem={renderRide}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadRides} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text>No rides found. Try different search criteria.</Text>
          </View>
        }
      />

      <FAB
        style={styles.fab}
        icon="plus"
        label="Offer Ride"
        onPress={() => navigation.navigate('OfferRide')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchbar: {
    margin: 12,
  },
  list: {
    padding: 12,
  },
  card: {
    marginBottom: 12,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  location: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  arrow: {
    marginHorizontal: 8,
    fontSize: 20,
    color: '#666',
  },
  time: {
    color: '#666',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  vehicle: {
    marginTop: 4,
    color: '#888',
    fontSize: 12,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
});
