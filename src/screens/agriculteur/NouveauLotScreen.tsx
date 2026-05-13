import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../constants/colors';
import { fonts, fontSizes } from '../../constants/fonts';
import { SPECIES, REGIONS_TOGO } from '../../constants/regions';
import { PrimaryButton } from '../../components/common/PrimaryButton';

export const NouveauLotScreen = () => {
  const navigation = useNavigation<any>();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ weight: '', species: SPECIES[0], region: REGIONS_TOGO[0] });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => step > 1 ? setStep(step - 1) : navigation.goBack()}>
          <Icon name="arrow-left" size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nouveau Lot</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {step === 1 && (
          <View>
            <Text style={styles.stepTitle}>Détails de la récolte</Text>
            
            <Text style={styles.label}>Poids estimé (kg) *</Text>
            <TextInput 
              style={styles.input} 
              keyboardType="numeric" 
              placeholder="0.0" 
              value={formData.weight}
              onChangeText={t => setFormData({...formData, weight: t})} 
            />

            <Text style={styles.label}>Espèce *</Text>
            <View style={styles.grid}>
              {SPECIES.map(s => (
                <TouchableOpacity key={s} style={[styles.chip, formData.species === s && styles.chipActive]} onPress={() => setFormData({...formData, species: s})}>
                  <Text style={[styles.chipText, formData.species === s && styles.chipTextActive]}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Région de récolte *</Text>
            <View style={styles.grid}>
              {REGIONS_TOGO.slice(0, 6).map(r => (
                <TouchableOpacity key={r} style={[styles.chip, formData.region === r && styles.chipActive]} onPress={() => setFormData({...formData, region: r})}>
                  <Text style={[styles.chipText, formData.region === r && styles.chipTextActive]}>{r}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <PrimaryButton 
              label="CONTINUER →" 
              onPress={() => setStep(2)} 
              style={{ marginTop: 32 }} 
              disabled={!formData.weight}
            />
          </View>
        )}

        {step === 2 && (
          <View>
            <Text style={styles.stepTitle}>Preuves terrain</Text>
            
            <TouchableOpacity style={styles.photoZone}>
              <Icon name="camera" size={32} color={colors.primary} />
              <Text style={styles.photoText}>Photographier le sac</Text>
            </TouchableOpacity>

            <View style={styles.gpsZone}>
              <PrimaryButton variant="warning" label="CAPTURER MA POSITION GPS" icon="crosshairs-gps" onPress={() => {}} />
              <View style={styles.gpsResult}>
                <Icon name="check-circle" size={16} color={colors.success} />
                <Text style={styles.gpsText}>LAT: 6.9075° | LNG: 0.6339° | ±12m</Text>
              </View>
            </View>

            <PrimaryButton label="VALIDER LA RÉCOLTE" onPress={() => setStep(3)} style={{ marginTop: 32 }} />
          </View>
        )}

        {step === 3 && (
          <View style={styles.successContainer}>
            <Icon name="check-decagram" size={80} color={colors.success} style={styles.successIcon} />
            <Text style={styles.successTitle}>Lot Enregistré !</Text>
            <Text style={styles.lotId}>(Kpalimé)-CC_A1B2C3</Text>
            
            <View style={styles.qrContainer}>
              <Icon name="qrcode" size={160} color={colors.primary} />
            </View>

            <PrimaryButton label="PARTAGER LE QR CODE" icon="share-variant" variant="primary" onPress={() => {}} style={{ marginBottom: 16 }} />
            <TouchableOpacity style={styles.btnSecondary} onPress={() => navigation.navigate('Dashboard')}>
              <Text style={styles.btnSecondaryText}>Retour au tableau de bord</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, paddingTop: 40, backgroundColor: colors.card, borderBottomWidth: 1, borderBottomColor: colors.border },
  headerTitle: { fontFamily: fonts.title.bold, fontSize: fontSizes.lg, color: colors.text },
  content: { padding: 24, paddingBottom: 100 },
  stepTitle: { fontFamily: fonts.title.bold, fontSize: fontSizes.xl, color: colors.primary, marginBottom: 24 },
  label: { fontFamily: fonts.body.bold, fontSize: fontSizes.sm, color: colors.text, marginBottom: 8, marginTop: 16 },
  input: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 12, height: 56, paddingHorizontal: 16, fontFamily: fonts.title.bold, fontSize: fontSizes.lg, color: colors.primary },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip: { paddingVertical: 10, paddingHorizontal: 16, backgroundColor: colors.surface, borderRadius: 20, borderWidth: 1, borderColor: colors.border },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { fontFamily: fonts.body.medium, fontSize: fontSizes.sm, color: colors.textMuted },
  chipTextActive: { color: '#FFF' },
  photoZone: { height: 160, borderStyle: 'dashed', borderWidth: 2, borderColor: colors.primary, borderRadius: 16, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.surface, marginBottom: 24 },
  photoText: { fontFamily: fonts.body.medium, fontSize: fontSizes.sm, color: colors.primary, marginTop: 8 },
  gpsZone: { marginTop: 16 },
  gpsResult: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 16, padding: 12, backgroundColor: colors.successLight, borderRadius: 8 },
  gpsText: { fontFamily: fonts.body.bold, fontSize: fontSizes.xs, color: colors.success, marginLeft: 8 },
  successContainer: { alignItems: 'center', paddingTop: 32 },
  successIcon: { marginBottom: 16 },
  successTitle: { fontFamily: fonts.title.bold, fontSize: fontSizes['2xl'], color: colors.success, marginBottom: 8 },
  lotId: { fontFamily: fonts.title.extraBold, fontSize: fontSizes.xl, color: colors.primary, marginBottom: 32 },
  qrContainer: { padding: 24, backgroundColor: '#FFF', borderRadius: 24, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 4 }, elevation: 4, marginBottom: 32 },
  btnSecondary: { padding: 16 },
  btnSecondaryText: { fontFamily: fonts.body.bold, fontSize: fontSizes.md, color: colors.textMuted }
});
