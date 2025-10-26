import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { List, RadioButton, Button, Title, Divider, Text } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import * as api from '../services/api';

export default function PaymentMethodsScreen({ navigation }) {
  const { user, loadUser } = useAuth();
  const [selectedMethod, setSelectedMethod] = useState('cash');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.preferredPaymentMethod) {
      setSelectedMethod(user.preferredPaymentMethod);
    }
  }, [user]);

  const paymentMethods = [
    { value: 'cash', label: 'Cash', icon: 'cash', description: 'Pay in cash directly to the driver' },
    { value: 'card', label: 'Credit/Debit Card', icon: 'credit-card', description: 'Pay with your card (Coming soon)' },
    { value: 'paypal', label: 'PayPal', icon: 'cash-multiple', description: 'Pay via PayPal (Coming soon)' },
    { value: 'venmo', label: 'Venmo', icon: 'cash-marker', description: 'Pay via Venmo (Coming soon)' },
  ];

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.updateProfile({ preferredPaymentMethod: selectedMethod });
      await loadUser();
      Alert.alert('Success', 'Payment method updated');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update payment method');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Title>Payment Methods</Title>
          <Text style={styles.subtitle}>Choose your preferred payment method</Text>
        </View>

        <RadioButton.Group onValueChange={setSelectedMethod} value={selectedMethod}>
          {paymentMethods.map((method) => (
            <View key={method.value}>
              <List.Item
                title={method.label}
                description={method.description}
                left={props => <List.Icon {...props} icon={method.icon} />}
                right={() => <RadioButton value={method.value} />}
                onPress={() => setSelectedMethod(method.value)}
                disabled={method.value !== 'cash'}
              />
              <Divider />
            </View>
          ))}
        </RadioButton.Group>

        <View style={styles.footer}>
          <Button
            mode="contained"
            onPress={handleSave}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            Save Preference
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
  },
  subtitle: {
    color: '#666',
    marginTop: 4,
  },
  footer: {
    padding: 20,
  },
  button: {
    paddingVertical: 6,
  },
});
