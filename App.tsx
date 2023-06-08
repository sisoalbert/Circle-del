import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {appId, baseUrl} from './atlasConfig.json';
import {AppProvider, UserProvider, useApp} from '@realm/react';

const App = () => {
  const WelcomeView = () => {
    const app = useApp();

    const handlelogin = async () => {
      const credentials = Realm.Credentials.anonymous();
      try {
        const user = await app.logIn(credentials);
      } catch (err) {
        console.error('Failed to log in', err);
      }
    };
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Welcome to Atlas</Text>
      </View>
    );
  };

  const MainApp = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Main App</Text>
      </View>
    );
  };

  return (
    <AppProvider id={appId} baseUrl={baseUrl}>
      <UserProvider fallback={WelcomeView}>
        <MainApp />
      </UserProvider>
    </AppProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
