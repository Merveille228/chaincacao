import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../constants/colors';
import { fonts, fontSizes } from '../../constants/fonts';
import { REGIONS_TOGO } from '../../constants/regions';
import { useAuthStore } from '../../store/auth.store';

export const RegisterScreen = () => {
  const navigation = useNavigation<any>();
  const [step, setStep] = useState(0);
  const [role, setRole] = useState('agriculteur');
  const [formData, setFormData] = useState({ firstName: '', lastName: '', phone: '', password: '', confirmPassword: '', locality: '' });

  const nextStep = () => {
    if (step === 0) setStep(1);
    else if (step === 1) setStep(2);
    else handleRegister();
  };

  const handleRegister = async () => {
    const userData = { firstName: formData.firstName, lastName: formData.lastName, phone: formData.phone, password: formData.password, role };
    await handleRegistration(userData);
  };

  const handleRegistration = async (userData) => {
    try {
      const response = await fetchData('register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (response.success) {
        useAuthStore.setState({
          isAuthenticated: true,
          role: response.role,
        });
        navigation.replace('Login'); // Redirect to login after registration
      } else {
        console.error('Registration failed:', response.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>CRÉER MON COMPTE</Text>

      {step === 0 && (
        <View style={styles.stepContainer}>
          <Text style={styles.subtitle}>Sélectionnez votre rôle</Text>
          <View style={styles.rolesGrid}>
            {['agriculteur', 'cooperative', 'exportateur', 'verificateur'].map((r) => (
              <TouchableOpacity
                key={r}
                style={[styles.roleCard, role === r && styles.roleCardActive]}
                onPress={() => setRole(r)}
              >
                <Text style={[styles.roleCardText, role === r && styles.roleCardTextActive]}>{r.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {step === 1 && (
        <View style={styles.stepContainer}>
          <Text style={styles.label}>Prénom *</Text>
          <TextInput style={styles.input} value={formData.firstName} onChangeText={t => setFormData({ ...formData, firstName: t })} />
          <Text style={styles.label}>Nom *</Text>
          <TextInput style={styles.input} value={formData.lastName} onChangeText={t => setFormData({ ...formData, lastName: t })} />
          <Text style={styles.label}>Téléphone (+228) *</Text>
          <TextInput style={styles.input} keyboardType="phone-pad" value={formData.phone} onChangeText={t => setFormData({ ...formData, phone: t })} />
          <Text style={styles.label}>Localité *</Text>
          <View style={styles.regionGrid}>
            {REGIONS_TOGO.slice(0, 4).map(reg => (
              <TouchableOpacity key={reg} style={[styles.regionChip, formData.locality === reg && styles.regionChipActive]} onPress={() => setFormData({ ...formData, locality: reg })}>
                <Text style={formData.locality === reg ? {color: '#FFF'} : {}}>{reg}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {step === 2 && (
        <View style={styles.stepContainer}>
          <Text style={styles.label}>Mot de passe *</Text>
          <TextInput style={styles.input} secureTextEntry value={formData.password} onChangeText={t => setFormData({ ...formData, password: t })} />
          <Text style={styles.label}>Confirmer le mot de passe *</Text>
          <TextInput style={styles.input} secureTextEntry value={formData.confirmPassword} onChangeText={t => setFormData({ ...formData, confirmPassword: t })} />
        </View>
      )}

      <TouchableOpacity style={styles.btnPrimary} onPress={nextStep}>
        <Text style={styles.btnPrimaryText}>{step === 2 ? 'CRÉER MON COMPTE' : 'CONTINUER →'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnSecondary} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.btnSecondaryText}>Déjà un compte ? Se connecter</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, backgroundColor: colors.background },
  title: { fontFamily: fonts.title.bold, fontSize: fontSizes.xl, color: colors.primary, textAlign: 'center', marginBottom: 24, marginTop: 40 },
  subtitle: { fontFamily: fonts.body.medium, fontSize: fontSizes.md, color: colors.text, marginBottom: 16 },
  stepContainer: { flex: 1 },
  rolesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between' },
  roleCard: { width: '48%', height: 100, backgroundColor: colors.card, borderWidth: 2, borderColor: 'transparent', borderRadius: 12, padding: 16, justifyContent: 'center', alignItems: 'center', elevation: 2 },
  roleCardActive: { borderColor: colors.success, backgroundColor: colors.successLight },
  roleCardText: { fontFamily: fonts.title.semiBold, fontSize: fontSizes.sm, color: colors.text },
  roleCardTextActive: { color: colors.success },
  label: { fontFamily: fonts.body.medium, fontSize: fontSizes.sm, color: colors.text, marginBottom: 4, marginTop: 12 },
  input: { height: 50, backgroundColor: colors.surface, borderRadius: 8, paddingHorizontal: 16, borderWidth: 1, borderColor: colors.border },
  regionGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  regionChip: { padding: 8, backgroundColor: colors.surface, borderRadius: 16, borderWidth: 1, borderColor: colors.border },
  regionChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  btnPrimary: { height: 56, backgroundColor: colors.primary, borderRadius: 100, justifyContent: 'center', alignItems: 'center', marginTop: 32 },
  btnPrimaryText: { color: '#FFF', fontFamily: fonts.title.bold, fontSize: fontSizes.md },
  btnSecondary: { marginTop: 16, alignItems: 'center' },
  btnSecondaryText: { color: colors.primary, fontFamily: fonts.body.medium, fontSize: fontSizes.base }
});
