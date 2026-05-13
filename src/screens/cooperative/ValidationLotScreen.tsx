import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../constants/colors';
import { fonts, fontSizes } from '../../constants/fonts';
import { QUALITY_GRADES } from '../../constants/regions';
import { PrimaryButton } from '../../components/common/PrimaryButton';

export const ValidationLotScreen = () => {
  const navigation = useNavigation<any>();
  const [weight, setWeight] = useState('');
  const [grade, setGrade] = useState('grade1');
  const [humidity, setHumidity] = useState('');

  // Mock pour l'UI
  const declaredWeight = 75;
  const numWeight = parseFloat(weight) || 0;
  
  let gapPercent = 0;
  if (numWeight > 0) {
    gapPercent = Math.abs((numWeight - declaredWeight) / declaredWeight) * 100;
  }

  const gapStatus = gapPercent <= 1 ? 'ok' : gapPercent <= 3 ? 'warn' : 'error';
  const isValid = numWeight > 0 && gapStatus !== 'error';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Validation du Lot</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* FICHE LOT */}
        <View style={styles.ficheLot}>
          <Text style={styles.farmerName}>Producteur: Koffi Mensah</Text>
          <View style={styles.originRow}>
            <Icon name="map-marker" size={16} color={colors.success} />
            <Text style={styles.originText}>Origine: Kpalimé (GPS Certifié)</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Espèce:</Text>
            <Text style={styles.infoValue}>Forastero Gold</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Poids déclaré Agriculteur:</Text>
            <Text style={styles.infoValue}>{declaredWeight} kg</Text>
          </View>
        </View>

        {/* INPUT POIDS */}
        <Text style={styles.sectionLabel}>Poids officiel coopérative</Text>
        <View style={styles.weightInputContainer}>
          <TextInput
            style={styles.weightInputXl}
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
            placeholder="00.0"
            placeholderTextColor={colors.borderDark}
          />
          <Text style={styles.weightUnit}>kg</Text>
        </View>

        {/* BADGE ECART */}
        {numWeight > 0 && (
          <View style={[styles.gapBadge, 
            gapStatus === 'ok' ? styles.gapOk : 
            gapStatus === 'warn' ? styles.gapWarn : styles.gapError]}>
            <Icon 
              name={gapStatus === 'ok' ? 'check-circle' : gapStatus === 'warn' ? 'alert' : 'close-circle'} 
              size={16} 
              color={gapStatus === 'ok' ? colors.success : gapStatus === 'warn' ? colors.warning : colors.error} 
            />
            <Text style={[styles.gapText, {
              color: gapStatus === 'ok' ? colors.success : gapStatus === 'warn' ? colors.warning : colors.error
            }]}>
              Écart: {gapPercent.toFixed(1)}% {gapStatus === 'ok' ? '✓ Conforme' : gapStatus === 'warn' ? '⚠ Attention' : '✗ Rejet obligatoire'}
            </Text>
          </View>
        )}

        {/* GRADES */}
        <Text style={styles.sectionLabel}>Grade de Qualité</Text>
        <View style={styles.gradeContainer}>
          {QUALITY_GRADES.map(g => (
            <TouchableOpacity 
              key={g.id} 
              style={[styles.gradeBtn, grade === g.id && { backgroundColor: g.color, borderColor: g.color }]}
              onPress={() => setGrade(g.id)}
            >
              <Text style={[styles.gradeText, grade === g.id && { color: '#FFF' }]}>{g.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* HUMIDITE */}
        <Text style={styles.sectionLabel}>Taux d'humidité (%)</Text>
        <TextInput
          style={styles.humidityInput}
          keyboardType="numeric"
          value={humidity}
          onChangeText={setHumidity}
          placeholder="7.5"
        />

        {/* ACTION */}
        <View style={{ marginTop: 40 }}>
          {gapStatus === 'error' ? (
            <PrimaryButton label="REJETER LE LOT" variant="error" icon="close-octagon" onPress={() => console.log('Rejet')} />
          ) : (
            <PrimaryButton 
              label="SCELLER DANS LA BLOCKCHAIN" 
              variant="primary" 
              icon="lock-check" 
              onPress={() => console.log('Scellé')} 
              disabled={!isValid || !humidity}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, paddingTop: 40, backgroundColor: colors.card, borderBottomWidth: 1, borderBottomColor: colors.border },
  headerTitle: { fontFamily: fonts.title.bold, fontSize: fontSizes.lg, color: colors.primary },
  content: { padding: 24, paddingBottom: 100 },
  ficheLot: { backgroundColor: colors.card, borderRadius: 16, padding: 20, marginBottom: 24, shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  farmerName: { fontFamily: fonts.title.bold, fontSize: fontSizes.md, color: colors.text, marginBottom: 8 },
  originRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  originText: { fontFamily: fonts.body.medium, fontSize: fontSizes.sm, color: colors.success, marginLeft: 8 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  infoLabel: { fontFamily: fonts.body.regular, fontSize: fontSizes.sm, color: colors.textMuted },
  infoValue: { fontFamily: fonts.title.semiBold, fontSize: fontSizes.sm, color: colors.text },
  sectionLabel: { fontFamily: fonts.body.bold, fontSize: fontSizes.sm, color: colors.textMuted, textTransform: 'uppercase', marginBottom: 12, marginTop: 16 },
  weightInputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: 16, paddingHorizontal: 24, paddingVertical: 16, borderWidth: 2, borderColor: colors.border },
  weightInputXl: { flex: 1, fontFamily: fonts.title.extraBold, fontSize: fontSizes['4xl'], color: colors.primary, textAlign: 'center', padding: 0 },
  weightUnit: { fontFamily: fonts.title.bold, fontSize: fontSizes.xl, color: colors.textLight, paddingBottom: 8 },
  gapBadge: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 8, marginTop: 16 },
  gapOk: { backgroundColor: colors.successLight },
  gapWarn: { backgroundColor: colors.warningLight },
  gapError: { backgroundColor: colors.errorLight },
  gapText: { fontFamily: fonts.body.bold, fontSize: fontSizes.sm, marginLeft: 8 },
  gradeContainer: { flexDirection: 'row', gap: 8 },
  gradeBtn: { flex: 1, paddingVertical: 12, borderRadius: 8, borderWidth: 1, borderColor: colors.border, alignItems: 'center', backgroundColor: colors.surface },
  gradeText: { fontFamily: fonts.title.semiBold, fontSize: fontSizes.sm, color: colors.textMuted },
  humidityInput: { backgroundColor: colors.surface, borderRadius: 12, height: 56, paddingHorizontal: 16, fontFamily: fonts.title.bold, fontSize: fontSizes.lg, color: colors.primary, borderWidth: 1, borderColor: colors.border },
});
