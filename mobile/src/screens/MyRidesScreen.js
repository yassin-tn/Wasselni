import React, { useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, Alert } from 'react-native';
import { Card, Title, Paragraph, Chip, FAB, Text, Button, Menu } from 'react-native-paper';
import { format } from 'date-fns';
import { useFocusEffect } from '@react-navigation/native';
import * as api from '../services/api';

export default function MyRidesScreen({ navigation }) {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [menuVisible, setMenuVisible] = useState({});

  useFocusEffect(
    React.useCallback(() => {
      loadRides();
    }, [])
  );

  const loadRides = async () => {
    setLoading(true);
    try {
      const response = await api.getMyRides();
      setRides(response.data.rides);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de charger vos trajets');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelRide = async (rideId) => {
    Alert.alert(
      'Annuler le trajet',
      'Êtes-vous sûr de vouloir annuler ce trajet? Les passagers seront notifiés.',
      [
        { text: 'Non', style: 'cancel' },
        {
          text: 'Oui, annuler',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.cancelRide(rideId);
              Alert.alert('Succès', 'Trajet annulé');
              loadRides();
            } catch (error) {
              Alert.alert('Erreur', error.response?.data?.error || 'Échec de l\'annulation');
            }
          },
        },
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return '#4CAF50';
      case 'full': return '#FF9800';
      case 'completed': return '#2196F3';
      case 'cancelled': return '#F44336';
      default: return '#757575';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'open': return 'OUVERT';
      case 'full': return 'COMPLET';
      case 'completed': return 'TERMINÉ';
      case 'cancelled': return 'ANNULÉ';
      default: return status.toUpperCase();
    }
  };

  const renderRide = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.statusRow}>
          <Chip
            mode="outlined"
            style={[styles.statusChip, { borderColor: getStatusColor(item.status) }]}
            textStyle={{ color: getStatusColor(item.status) }}
          >
            {getStatusLabel(item.status)}
          </Chip>
        </View>

        <View style={styles.routeContainer}>
          <Title style={styles.location}>{item.origin}</Title>
          <Text style={styles.arrow}>→</Text>
          <Title style={styles.location}>{item.destination}</Title>
        </View>

        <Paragraph style={styles.time}>
          📅 {format(new Date(item.departureTime), 'PPp', { locale: 'fr' })}
        </Paragraph>

        <View style={styles.infoRow}>
          <Chip icon="seat-passenger">
            {item.availableSeats}/{item.vehicle?.seats || 0} places
          </Chip>
          <Chip icon="cash">{item.pricePerSeat} TND/place</Chip>
        </View>

        {item.vehicle && (
          <Paragraph style={styles.vehicle}>
            🚗 {item.vehicle.make} {item.vehicle.model} • {item.vehicle.color}
          </Paragraph>
        )}

        {item.notes && (
          <Paragraph style={styles.notes}>
            💬 {item.notes}
          </Paragraph>
        )}

        <View style={styles.bookingsInfo}>
          <Text style={styles.bookingsText}>
            👥 {item.bookings?.length || 0} réservation(s)
          </Text>
        </View>

        {item.status === 'open' && (
          <Button
            mode="outlined"
            onPress={() => handleCancelRide(item.id)}
            style={styles.cancelButton}
            textColor="#d32f2f"
            icon="cancel"
          >
            Annuler le trajet
          </Button>
        )}
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={rides}
        renderItem={renderRide}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadRides} />}
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>🚗</Text>
              <Title>Aucun trajet offert</Title>
              <Paragraph style={styles.emptyDescription}>
                Vous n'avez pas encore offert de trajets. Commencez à partager vos trajets avec d'autres!
              </Paragraph>
              <Button 
                mode="contained" 
                onPress={() => navigation.navigate('Offer')} 
                style={styles.offerButton}
                icon="plus"
              >
                Offrir un trajet
              </Button>
            </View>
          )
        }
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('Offer')}
        label="Offrir"
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
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  statusChip: {
    borderWidth: 2,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    flex: 1,
  },
  arrow: {
    fontSize: 20,
    marginHorizontal: 8,
    color: '#666',
  },
  time: {
    color: '#666',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  vehicle: {
    marginTop: 8,
    color: '#666',
  },
  notes: {
    marginTop: 8,
    fontStyle: 'italic',
    color: '#666',
  },
  bookingsInfo: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  bookingsText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  cancelButton: {
    marginTop: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    marginTop: 64,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyDescription: {
    textAlign: 'center',
    color: '#666',
    marginTop: 8,
    marginBottom: 24,
  },
  offerButton: {
    paddingHorizontal: 20,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});
