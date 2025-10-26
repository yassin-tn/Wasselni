import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { List, Switch, Divider, Title } from 'react-native-paper';

export default function SettingsScreen({ navigation }) {
  const [notifications, setNotifications] = useState({
    bookingConfirmed: true,
    rideCancelled: true,
    newMessage: true,
    promotions: false,
  });

  const toggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.sectionTitle}>Notifications</Title>
      <List.Item
        title="Booking Confirmed"
        description="Get notified when your booking is confirmed"
        right={() => (
          <Switch
            value={notifications.bookingConfirmed}
            onValueChange={() => toggleNotification('bookingConfirmed')}
          />
        )}
      />
      <Divider />
      <List.Item
        title="Ride Cancelled"
        description="Get notified when a ride is cancelled"
        right={() => (
          <Switch
            value={notifications.rideCancelled}
            onValueChange={() => toggleNotification('rideCancelled')}
          />
        )}
      />
      <Divider />
      <List.Item
        title="New Messages"
        description="Get notified about new messages"
        right={() => (
          <Switch
            value={notifications.newMessage}
            onValueChange={() => toggleNotification('newMessage')}
          />
        )}
      />
      <Divider />
      <List.Item
        title="Promotions"
        description="Receive promotional offers"
        right={() => (
          <Switch
            value={notifications.promotions}
            onValueChange={() => toggleNotification('promotions')}
          />
        )}
      />

      <Title style={styles.sectionTitle}>Privacy & Security</Title>
      <List.Item
        title="Change Password"
        left={props => <List.Icon {...props} icon="lock-reset" />}
        right={props => <List.Icon {...props} icon="chevron-right" />}
        onPress={() => {}}
      />
      <Divider />
      <List.Item
        title="Two-Factor Authentication"
        description="Add an extra layer of security"
        left={props => <List.Icon {...props} icon="shield-lock" />}
        right={props => <List.Icon {...props} icon="chevron-right" />}
        onPress={() => {}}
      />
      <Divider />
      <List.Item
        title="Blocked Users"
        left={props => <List.Icon {...props} icon="account-cancel" />}
        right={props => <List.Icon {...props} icon="chevron-right" />}
        onPress={() => {}}
      />

      <Title style={styles.sectionTitle}>App Settings</Title>
      <List.Item
        title="Language"
        description="English"
        left={props => <List.Icon {...props} icon="translate" />}
        right={props => <List.Icon {...props} icon="chevron-right" />}
        onPress={() => {}}
      />
      <Divider />
      <List.Item
        title="Units"
        description="Miles, USD"
        left={props => <List.Icon {...props} icon="speedometer" />}
        right={props => <List.Icon {...props} icon="chevron-right" />}
        onPress={() => {}}
      />

      <Title style={styles.sectionTitle}>Help & Support</Title>
      <List.Item
        title="Help Center"
        left={props => <List.Icon {...props} icon="help-circle" />}
        right={props => <List.Icon {...props} icon="chevron-right" />}
        onPress={() => {}}
      />
      <Divider />
      <List.Item
        title="Contact Support"
        left={props => <List.Icon {...props} icon="email" />}
        right={props => <List.Icon {...props} icon="chevron-right" />}
        onPress={() => {}}
      />
      <Divider />
      <List.Item
        title="Report a Problem"
        left={props => <List.Icon {...props} icon="alert-circle" />}
        right={props => <List.Icon {...props} icon="chevron-right" />}
        onPress={() => {}}
      />

      <Title style={styles.sectionTitle}>About</Title>
      <List.Item
        title="Terms of Service"
        left={props => <List.Icon {...props} icon="file-document" />}
        right={props => <List.Icon {...props} icon="chevron-right" />}
        onPress={() => {}}
      />
      <Divider />
      <List.Item
        title="Privacy Policy"
        left={props => <List.Icon {...props} icon="shield-account" />}
        right={props => <List.Icon {...props} icon="chevron-right" />}
        onPress={() => {}}
      />
      <Divider />
      <List.Item
        title="App Version"
        description="1.0.0"
        left={props => <List.Icon {...props} icon="information" />}
      />

      <View style={styles.footer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    padding: 16,
    paddingBottom: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  footer: {
    height: 40,
  },
});
