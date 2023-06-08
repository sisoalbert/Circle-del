import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {appId, baseUrl} from './atlasConfig.json';
import {AppProvider, UserProvider, useApp, useUser} from '@realm/react';
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
  Button,
} from 'react-native-paper';
import {realmContext} from './src/data/RealmContext';

const App = () => {
  const {RealmProvider} = realmContext;

  const WelcomeView = () => {
    const [isLoading, setIsLoading] = React.useState(false);

    const app = useApp();

    const handlelogin = async () => {
      const credentials = Realm.Credentials.anonymous();
      setIsLoading(true);
      try {
        const user = await app.logIn(credentials);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to log in', err);
        setIsLoading(false);
      }
    };
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Welcome to Atlas</Text>
        <Button
          loading={isLoading}
          icon="toy-brick"
          mode="contained"
          onPress={handlelogin}>
          Login
        </Button>
      </View>
    );
  };

  const MainApp = () => {
    const {useRealm, useQuery} = realmContext;
    const realm = useRealm();
    const user = useUser();

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Main App</Text>
      </View>
    );
  };

  const LoadingIndicator = () => {
    return (
      <View style={styles.activityContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  return (
    <PaperProvider>
      <AppProvider id={appId} baseUrl={baseUrl}>
        <UserProvider fallback={WelcomeView}>
          <RealmProvider
            sync={{
              flexible: true,
              onError: (_, error) => {
                // Show sync errors in the console
                console.error(error);
              },
            }}
            fallback={LoadingIndicator}>
            <MainApp />
          </RealmProvider>
        </UserProvider>
      </AppProvider>
    </PaperProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
