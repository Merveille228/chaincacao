import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../constants/colors';
import { fonts, fontSizes } from '../../constants/fonts';
import { PrimaryButton } from '../../components/common/PrimaryButton';

export const ExportateurDashboard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>AGRICHAIN</Text>
          <Text style={styles.headerSubtitle}>Gestion des Exportations</Text>
        </View>
        <TouchableOpacity style={styles.avatar}>
          <Icon name="account-tie" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* HERO */}
        <View style={styles.heroCard}>
          <Text style={styles.heroLabel}>Stock total prêt pour export</Text>
          <View style={styles.heroMain}>
            <Text style={styles.heroValue}>45.5 T</Text>
            <View style={styles.badgeEudr}>
              <Icon name="shield-check" size={14} color="#FFF" style={{ marginRight: 4 }} />
              <Text style={styles.badgeEudrText}>CERTIFIÉ EUDR</Text>
            </View>
          </View>
        </View>

        {/* LOGISTIQUE */}
        <View style={styles.logisticsContainer}>
          <View style={styles.logisticItem}>
            <Icon name="truck" size={32} color={colors.primary} />
            <Text style={styles.logisticCount}>12</Text>
            <Text style={styles.logisticLabel}>En transit</Text>
          </View>
          <View style={styles.logisticDivider} />
          <View style={styles.logisticItem}>
            <Icon name="ferry" size={32} color={colors.warning} />
            <Text style={styles.logisticCount}>4</Text>
            <Text style={styles.logisticLabel}>En chargement</Text>
          </View>
        </View>

        {/* SEARCH BLOCKCHAIN */}
        <Text style={styles.sectionTitle}>Vérificateur Empreinte Blockchain</Text>
        <View style={styles.searchBar}>
          <Icon name="cube-scan" size={24} color={colors.textMuted} />
          <TextInput 
            style={styles.searchInput}
            placeholder="Hash ou ID Lot..."
            placeholderTextColor={colors.textLight}
          />
          <TouchableOpacity style={styles.searchBtn}>
            <Icon name="magnify" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* LIST CACAO ACCEPTED */}
        <Text style={styles.sectionTitle}>Arrivages Coopératives</Text>
        {[1,2,3].map(i => (
          <View key={i} style={styles.lotCard}>
            <View style={styles.lotCardHeader}>
              <View>
                <Text style={styles.coopName}>Coopérative Élite Kpalimé</Text>
                <Text style={styles.lotId}>(Kpa)-CC_8A2B{i}</Text>
              </View>
              <Icon name="checkbox-blank-circle-outline" size={28} color={colors.borderDark} />
            </View>
            <View style={styles.lotCardDetails}>
              <View style={styles.detailCol}>
                <Text style={styles.detailValue}>1.2 T</Text>
                <Text style={styles.detailLabel}>Poids</Text>
              </View>
              <View style={styles.detailCol}>
                <Text style={styles.detailValue}>Grade 1</Text>
                <Text style={styles.detailLabel}>Qualité</Text>
              </View>
              <View style={styles.detailCol}>
                <Text style={styles.detailValue}>7.5%</Text>
                <Text style={styles.detailLabel}>Humidité</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* FOOTER ACTIONS */}
      <View style={styles.footerAction}>
        <View style={styles.footerSummary}>
          <Text style={styles.footerSummaryText}>Sélection: 0 lots</Text>
          <Text style={styles.footerSummaryTotal}>0.0 Tonnes</Text>
        </View>
        <PrimaryButton 
          label="GÉNÉRER LE MANIFESTE" 
          icon="file-document-edit" 
          onPress={() => {}} 
          disabled={true} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 40, backgroundColor: colors.primary },
  headerTitle: { fontFamily: fonts.title.bold, fontSize: fontSizes.xl, color: '#FFF' },
  headerSubtitle: { fontFamily: fonts.body.regular, fontSize: fontSizes.xs, color: colors.surface },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  content: { padding: 16, paddingBottom: 120 },
  heroCard: { backgroundColor: colors.card, borderRadius: 16, padding: 24, marginBottom: 24, shadowColor: '#000', shadowOffset: { width:0, height:2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 },
  heroLabel: { fontFamily: fonts.body.bold, fontSize: fontSizes.sm, color: colors.textMuted, textTransform: 'uppercase', marginBottom: 8 },
  heroMain: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  heroValue: { fontFamily: fonts.title.extraBold, fontSize: fontSizes['4xl'], color: colors.primary },
  badgeEudr: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.success, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  badgeEudrText: { color: '#FFF', fontFamily: fonts.body.bold, fontSize: fontSizes.xs },
  logisticsContainer: { flexDirection: 'row', backgroundColor: colors.surface, borderRadius: 16, padding: 16, marginBottom: 32 },
  logisticItem: { flex: 1, alignItems: 'center' },
  logisticCount: { fontFamily: fonts.title.bold, fontSize: fontSizes.xl, color: colors.text, marginTop: 8 },
  logisticLabel: { fontFamily: fonts.body.medium, fontSize: fontSizes.xs, color: colors.textMuted },
  logisticDivider: { width: 1, backgroundColor: colors.border, marginHorizontal: 16 },
  sectionTitle: { fontFamily: fonts.title.bold, fontSize: fontSizes.md, color: colors.text, marginBottom: 12 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderRadius: 12, paddingLeft: 16, paddingRight: 8, height: 56, marginBottom: 32, borderWidth: 1, borderColor: colors.border },
  searchInput: { flex: 1, marginLeft: 12, fontFamily: fonts.body.medium, fontSize: fontSizes.sm },
  searchBtn: { backgroundColor: colors.primary, width: 40, height: 40, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  lotCard: { backgroundColor: colors.card, borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: colors.border },
  lotCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  coopName: { fontFamily: fonts.title.semiBold, fontSize: fontSizes.base, color: colors.text },
  lotId: { fontFamily: fonts.body.regular, fontSize: fontSizes.sm, color: colors.textMuted, marginTop: 4 },
  lotCardDetails: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: colors.surface, paddingTop: 16 },
  detailCol: { alignItems: 'flex-start' },
  detailValue: { fontFamily: fonts.title.bold, fontSize: fontSizes.sm, color: colors.primary },
  detailLabel: { fontFamily: fonts.body.medium, fontSize: fontSizes.xs, color: colors.textLight, marginTop: 2 },
  footerAction: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: colors.card, padding: 16, paddingBottom: 32, borderTopWidth: 1, borderTopColor: colors.border, shadowColor: '#000', shadowOffset: {width:0, height:-2}, shadowOpacity: 0.1, elevation: 10 },
  footerSummary: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  footerSummaryText: { fontFamily: fonts.body.medium, fontSize: fontSizes.sm, color: colors.textMuted },
  footerSummaryTotal: { fontFamily: fonts.title.bold, fontSize: fontSizes.lg, color: colors.primary },
});
