import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { AgriculteurDashboard } from '../screens/agriculteur/AgriculteurDashboard';
import { NouveauLotScreen } from '../screens/agriculteur/NouveauLotScreen';
import { CooperativeDashboard } from '../screens/cooperative/CooperativeDashboard';
import { ValidationLotScreen } from '../screens/cooperative/ValidationLotScreen';
import { ExportateurDashboard } from '../screens/exportateur/ExportateurDashboard';
import { VerificateurDashboard } from '../screens/verificateur/VerificateurDashboard';
import { ProfileScreen } from '../screens/common/ProfileScreen';
import { QRScannerScreen } from '../screens/common/QRScannerScreen';
import { colors } from '../constants/colors';
import { fonts } from '../constants/fonts';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// --- PLACEHOLDERS ---
const PlaceholderScreen = ({ name }: { name: string }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
    <Text style={{ fontFamily: fonts.title.bold, color: colors.primary }}>{name}</Text>
  </View>
);

const screenOptions = {
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: colors.textLight,
  tabBarLabelStyle: { fontFamily: fonts.body.bold, fontSize: 10, marginBottom: 4 },
  tabBarStyle: { height: 60, paddingBottom: 8, paddingTop: 8, backgroundColor: colors.card, borderTopColor: colors.border },
  headerShown: false,
};

// --- AGRICULTEUR NAVIGATOR ---
const AgriculteurTabs = () => (
  <Tab.Navigator screenOptions={screenOptions}>
    <Tab.Screen 
      name="Lots" 
      component={AgriculteurDashboard} 
      options={{ tabBarIcon: ({ color }) => <Icon name="shopping" size={24} color={color} /> }} 
    />
    <Tab.Screen 
      name="Scan" 
      component={QRScannerScreen} 
      options={{ tabBarIcon: ({ color }) => <Icon name="qrcode-scan" size={24} color={color} /> }} 
    />
    <Tab.Screen 
      name="Earnings" 
      component={() => <PlaceholderScreen name="Revenus" />} 
      options={{ tabBarIcon: ({ color }) => <Icon name="cash-multiple" size={24} color={color} /> }} 
    />
    <Tab.Screen 
      name="Profile" 
      component={ProfileScreen} 
      options={{ tabBarIcon: ({ color }) => <Icon name="account" size={24} color={color} /> }} 
    />
  </Tab.Navigator>
);

export const AgriculteurNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainTabs" component={AgriculteurTabs} />
    <Stack.Screen name="NouveauLot" component={NouveauLotScreen} />
  </Stack.Navigator>
);

// --- COOPERATIVE NAVIGATOR ---
const CooperativeTabs = () => (
  <Tab.Navigator screenOptions={screenOptions}>
    <Tab.Screen 
      name="Collecte" 
      component={CooperativeDashboard} 
      options={{ tabBarIcon: ({ color }) => <Icon name="tractor" size={24} color={color} /> }} 
    />
    <Tab.Screen 
      name="Stocks" 
      component={() => <PlaceholderScreen name="Stocks" />} 
      options={{ tabBarIcon: ({ color }) => <Icon name="warehouse" size={24} color={color} /> }} 
    />
    <Tab.Screen 
      name="LotsExport" 
      component={() => <PlaceholderScreen name="Lots Export" />} 
      options={{ tabBarIcon: ({ color }) => <Icon name="truck-delivery" size={24} color={color} /> }} 
    />
    <Tab.Screen 
      name="Admin" 
      component={() => <PlaceholderScreen name="Admin" />} 
      options={{ tabBarIcon: ({ color }) => <Icon name="shield-account" size={24} color={color} /> }} 
    />
  </Tab.Navigator>
);

export const CooperativeNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainTabs" component={CooperativeTabs} />
    <Stack.Screen name="ValidationLot" component={ValidationLotScreen} />
    <Stack.Screen name="Scanner" component={QRScannerScreen} />
  </Stack.Navigator>
);

// --- EXPORTATEUR NAVIGATOR ---
export const ExportateurNavigator = () => (
  <Tab.Navigator screenOptions={screenOptions}>
    <Tab.Screen 
      name="Shipments" 
      component={ExportateurDashboard} 
      options={{ tabBarIcon: ({ color }) => <Icon name="truck-cargo-container" size={24} color={color} /> }} 
    />
    <Tab.Screen 
      name="Audit" 
      component={() => <PlaceholderScreen name="Audit blockchain" />} 
      options={{ tabBarIcon: ({ color }) => <Icon name="file-document-check-outline" size={24} color={color} /> }} 
    />
    <Tab.Screen 
      name="Zones" 
      component={() => <PlaceholderScreen name="Zones" />} 
      options={{ tabBarIcon: ({ color }) => <Icon name="map-marker-radius" size={24} color={color} /> }} 
    />
    <Tab.Screen 
      name="EUDR" 
      component={() => <PlaceholderScreen name="Rapports EUDR" />} 
      options={{ tabBarIcon: ({ color }) => <Icon name="leaf" size={24} color={color} /> }} 
    />
  </Tab.Navigator>
);

// --- VERIFICATEUR NAVIGATOR ---
export const VerificateurNavigator = () => (
  <Tab.Navigator screenOptions={screenOptions}>
    <Tab.Screen 
      name="Verifier" 
      component={VerificateurDashboard} 
      options={{ tabBarIcon: ({ color }) => <Icon name="qrcode-scan" size={24} color={color} /> }} 
    />
    <Tab.Screen 
      name="Certificats" 
      component={() => <PlaceholderScreen name="Certificats PDF" />} 
      options={{ tabBarIcon: ({ color }) => <Icon name="text-box-check-outline" size={24} color={color} /> }} 
    />
    <Tab.Screen 
      name="Profile" 
      component={ProfileScreen} 
      options={{ tabBarIcon: ({ color }) => <Icon name="account-circle-outline" size={24} color={color} /> }} 
    />
  </Tab.Navigator>
);
