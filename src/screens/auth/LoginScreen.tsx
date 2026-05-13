import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../constants/colors';
import { fonts, fontSizes } from '../../constants/fonts';
import { fetchData } from '../../services/api.service';
import { useAuthStore } from '../../store/auth.store';

export const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const [role, setRole] = useState('agriculteur');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const testBackendConnection = async () => {
      try {
        const data = await fetchData('');
        console.log('Backend response:', data);
      } catch (error) {
        console.error('Error connecting to backend:', error);
      }
    };

    testBackendConnection();
  }, []);

  const handleLogin = async () => {
    // A implémenter (Appel API Login)
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const navigateToRoleInterface = (role) => {
    switch (role) {
      case 'agriculteur':
        navigation.replace('AgriculteurDashboard');
        break;
      case 'cooperative':
        navigation.replace('CooperativeDashboard');
        break;
      case 'exportateur':
        navigation.replace('ExportateurDashboard');
        break;
      case 'verificateur':
        navigation.replace('VerificateurDashboard');
        break;
      default:
        console.error('Unknown role:', role);
    }
  };

  useEffect(() => {
    const { isAuthenticated, role } = useAuthStore();

    if (isAuthenticated && role) {
      navigateToRoleInterface(role);
    }
  }, [isAuthenticated, role]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu de Connexion</Text>
      <Text style={styles.subtitle}>ChainCacao — Traçabilité Cacao Togo</Text>
      
      {/* Rôles Tab (Simulé) */}
      <View style={styles.roleContainer}>
        {['agriculteur', 'cooperative', 'exportateur', 'verificateur'].map((r) => (
          <TouchableOpacity key={r} style={[styles.roleTab, role === r && styles.roleTabActive]} onPress={() => setRole(r)}>
            <Text style={[styles.roleText, role === r && styles.roleTextActive]}>{r}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Numéro de téléphone (+228)</Text>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        placeholder="90 12 34 56"
      />

      <Text style={styles.label}>Mot de passe</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholder="********"
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.btnPrimary} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator size="small" color="#FFF" /> : <Text style={styles.btnPrimaryText}>SE CONNECTER</Text>}
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnSecondary} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.btnSecondaryText}>Pas encore de compte ? S'inscrire</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: colors.background, justifyContent: 'center' },
  title: { fontFamily: fonts.title.bold, fontSize: fontSizes['2xl'], color: colors.primary, textAlign: 'center', marginBottom: 8 },
  subtitle: { fontFamily: fonts.body.regular, fontSize: fontSizes.base, color: colors.textMuted, textAlign: 'center', marginBottom: 32 },
  roleContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 24, gap: 8 },
  roleTab: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, borderWidth: 1, borderColor: colors.border },
  roleTabActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  roleText: { fontFamily: fonts.body.medium, fontSize: fontSizes.sm, color: colors.textMuted },
  roleTextActive: { color: '#FFF' },
  label: { fontFamily: fonts.body.medium, fontSize: fontSizes.sm, color: colors.text, marginBottom: 4 },
  input: { height: 50, backgroundColor: colors.surface, borderRadius: 8, paddingHorizontal: 16, marginBottom: 16, borderWidth: 1, borderColor: colors.border },
  btnPrimary: { height: 56, backgroundColor: colors.primary, borderRadius: 100, justifyContent: 'center', alignItems: 'center', marginTop: 16 },
  btnPrimaryText: { color: '#FFF', fontFamily: fonts.title.bold, fontSize: fontSizes.md },
  btnSecondary: { marginTop: 16, alignItems: 'center' },
  btnSecondaryText: { color: colors.primary, fontFamily: fonts.body.medium, fontSize: fontSizes.base },
  errorText: { color: colors.error, fontFamily: fonts.body.regular, fontSize: fontSizes.sm, marginBottom: 8, textAlign: 'center' },
});
