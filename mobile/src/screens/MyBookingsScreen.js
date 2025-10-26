import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, Alert } from 'react-native';
import { Card, Title, Paragraph, Chip, FAB, Text, Button } from 'react-native-paper';
import { format } from 'date-fns';
import { useFocusEffect } from '@react-navigation/native';
import * as api from '../services/api';

export default function MyBookingsScreen({ navigation }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      loadBookings();
    }, [])
  );

  const loadBookings = async () => {
    setLoading(true);
    try {
      const response = await api.getMyBookings();
      // Filter out cancelled bookings
      const activeBookings = response.data.bookings.filter(
        booking => booking.status !== 'cancelled'
      );
      setBookings(activeBookings);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de charger les réservations');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    Alert.alert(
      'Annuler la réservation',
      'Êtes-vous sûr de vouloir annuler cette réservation?',
      [
        { text: 'Non', style: 'cancel' },
        {
          text: 'Oui',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.cancelBooking(bookingId);
              Alert.alert('Succès', 'Réservation annulée');
              loadBookings();
            } catch (error) {
              Alert.alert('Erreur', error.response?.data?.error || 'Échec de l\'annulation');
            }
          },
        },
      ]
    );
  };

  const renderBooking = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.statusRow}>
          <Chip
            mode="outlined"
            style={[
              styles.statusChip,
              item.status === 'confirmed' && styles.confirmedChip,
              item.status === 'cancelled' && styles.cancelledChip,
            ]}
          >
            {item.status.toUpperCase()}
          </Chip>
        </View>

        <View style={styles.routeContainer}>
          <Title style={styles.location}>{item.ride.origin}</Title>
          <Text style={styles.arrow}>→</Text>
          <Title style={styles.location}>{item.ride.destination}</Title>
        </View>

        <Paragraph style={styles.time}>
          {format(new Date(item.ride.departureTime), 'PPp')}
        </Paragraph>

        <View style={styles.infoRow}>
          <Chip icon="account">{item.ride.driver.fullName}</Chip>
          <Chip icon="star">{item.ride.driver.rating}</Chip>
          <Chip icon="seat-passenger">{item.seatsBooked} places</Chip>
          <Chip icon="cash">{item.totalPrice} TND</Chip>
        </View>

        {item.ride.vehicle && (
          <Paragraph style={styles.vehicle}>
            {item.ride.vehicle.make} {item.ride.vehicle.model} • {item.ride.vehicle.plateNumber}
          </Paragraph>
        )}

        {item.status === 'confirmed' && (
          <Button
            mode="outlined"
            onPress={() => handleCancel(item.id)}
            style={styles.cancelButton}
            textColor="#d32f2f"
          >
            Annuler la réservation
          </Button>
        )}
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={bookings}
        renderItem={renderBooking}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadBookings} />}
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>📅</Text>
              <Title>Aucune réservation</Title>
              <Paragraph style={styles.emptyDescription}>
                Vous n'avez pas encore réservé de trajets. Commencez à explorer les trajets disponibles!
              </Paragraph>
              <Button 
                mode="contained" 
                onPress={() => navigation.navigate('Find')} 
                style={styles.findButton}
                icon="magnify"
              >
                Trouver des trajets
              </Button>
            </View>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 12,
  },
  card: {
    marginBottom: 12,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  statusChip: {
    alignSelf: 'flex-start',
  },
  confirmedChip: {
    backgroundColor: '#e8f5e9',
  },
  cancelledChip: {
    backgroundColor: '#ffebee',
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
    marginBottom: 12,
    color: '#888',
    fontSize: 12,
  },
  cancelButton: {
    marginTop: 8,
    borderColor: '#d32f2f',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyDescription: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 12,
    paddingHorizontal: 20,
  },
  findButton: {
    marginTop: 20,
  },
});
