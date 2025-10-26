import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export default function RideDetailsScreen() {
  return (
    <View style={styles.container}>
      <Text>Ride Details Screen - Coming Soon</Text>
      <Text style={styles.hint}>View full details and book this ride</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  hint: {
    marginTop: 8,
    color: '#666',
  },
});
