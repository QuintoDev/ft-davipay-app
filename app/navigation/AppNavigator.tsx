import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import { useAuth } from '../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';
import MovimientosScreen from '../screens/MovimientosScreen';
import TransferirScreen from '../screens/TransferirScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerTitle: '' , headerBackground: () => <View style={{ backgroundColor: '#c90013', flex: 1 }} />}}/>
            <Stack.Screen name="Movimientos" component={MovimientosScreen} options={{ headerTitle: '' , headerBackground: () => <View style={{ backgroundColor: '#c90013', flex: 1 }} />}}/>
            <Stack.Screen name="Transferir" component={TransferirScreen} options={{ headerTitle: '' , headerBackground: () => <View style={{ backgroundColor: '#c90013', flex: 1 }} />}}/>
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
