import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View } from 'react-native';
import { useAuthStore } from '../store/auth.store';

// Auth Screens
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';

// Role Navigators
import { AgriculteurNavigator, CooperativeNavigator, ExportateurNavigator, VerificateurNavigator } from './RoleNavigators';

const AuthStack = createStackNavigator();
const AppStack = createStackNavigator();

const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
  </AuthStack.Navigator>
);

const RoleNavigator = ({ role }: { role: string }) => {
  switch (role) {
    case 'agriculteur':
      return <AgriculteurNavigator />;
    case 'cooperative':
      return <CooperativeNavigator />;
    case 'exportateur':
      return <ExportateurNavigator />;
    case 'verificateur':
      return <VerificateurNavigator />;
    default:
      return <AgriculteurNavigator />;
  }
};

export const AppNavigator = () => {
  const { isAuthenticated, role } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Authenticate init logic here
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="large" color="#3D1B0B" /></View>;
  }

  return (
    <NavigationContainer>
      {isAuthenticated && role ? <RoleNavigator role={role} /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
