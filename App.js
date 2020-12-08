import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import PushNotification from 'react-native-push-notification';
import { StyleSheet, Text, View } from 'react-native';

import BackgroundTask from 'react-native-background-task';

const _sendPushNotification = () => {
  PushNotification.localNotificationSchedule({
    //... You can use all the options from localNotifications
    message: `Hi there, it's ${Date(Date.now()).toLocaleString().split(' ')[4]}\nJust a reminder.`, // (required)
    date: new Date(Date.now() + 3 * 1000), // in 60 secs
    allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
  });
}

BackgroundTask.define(() => {
  _sendPushNotification();

  BackgroundTask.finish()
})

export default function App() {

  useEffect(() => {

    BackgroundTask.schedule({
      period: 300, // Aim to run every 30 mins - more conservative on battery
    })

  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
