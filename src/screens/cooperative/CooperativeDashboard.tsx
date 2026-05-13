import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuthStore } from '../../store/auth.store';
import { colors } from '../../constants/colors';
import { fonts, fontSizes } from '../../constants/fonts';

export const CooperativeDashboard = () => {
  const { user } = useAuthStore();

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Icon name="storefront" size={28} color={colors.primary} />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.coopName}>{user?.cooperativeName || 'Coopérative'}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.activeDot} />
              <Text style={styles.networkStatus}>RÉSEAU BLOCKCHAIN ACTIF</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.qrBtn}>
          <Icon name="qrcode-scan" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* ZONE SCAN */}
        <View style={styles.scanZone}>
          <Icon name="qrcode-scan" size={48} color={colors.textLight} style={{ marginBottom: 16 }} />
          <Text style={styles.scanTitle}>Scannez le QR Code du Producteur</Text>
          <TouchableOpacity style={styles.btnScan}>
            <Icon name="camera" size={28} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* RECHERCHE */}
        <View style={styles.searchBar}>
          <Icon name="magnify" size={24} color={colors.textMuted} />
          <TextInput 
            style={styles.searchInput}
            placeholder="Rechercher un ID de lot..."
            placeholderTextColor={colors.textLight}
          />
        </View>

        {/* STATS */}
        <View style={styles.statsContainer}>
          <TouchableOpacity style={styles.statPill}>
            <Text style={styles.statPillValue}>1,450 kg</Text>
            <Text style={styles.statPillLabel}>Total Collecté</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.statPill, styles.statPillSecondary]}>
            <Text style={[styles.statPillValue, { color: colors.warning }]}>12</Text>
            <Text style={styles.statPillLabel}>En attente</Text>
          </TouchableOpacity>
        </View>

        {/* LISTE COLLECTES */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Collectes du jour</Text>
          <View style={styles.badgeCount}><Text style={styles.badgeCountText}>4</Text></View>
        </View>

        {/* Mock des collectes */}
        {[1,2,3].map(i => (
          <View key={i} style={styles.collecteCard}>
            <View style={styles.collecteHeader}>
              <Text style={styles.farmerName}>Koffi Mensah</Text>
              <Text style={styles.timeText}>14:30</Text>
            </View>
            <View style={styles.collecteFooter}>
              <View style={styles.eudrBadge}>
                <Icon name="shield-check" size={12} color="#FFF" style={{ marginRight: 4 }} />
                <Text style={styles.eudrBadgeText}>CERTIFIÉ EUDR</Text>
              </View>
              <Text style={styles.lotWeight}>75.0 kg</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 40, backgroundColor: colors.card, borderBottomWidth: 1, borderBottomColor: colors.border },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  coopName: { fontFamily: fonts.title.bold, fontSize: fontSizes.md, color: colors.primary, marginBottom: 2 },
  activeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.success, marginRight: 6 },
  networkStatus: { fontFamily: fonts.body.bold, fontSize: 10, color: colors.success, letterSpacing: 0.5 },
  qrBtn: { padding: 10, backgroundColor: colors.surface, borderRadius: 12 },
  content: { padding: 16, paddingBottom: 100 },
  scanZone: { borderStyle: 'dashed', borderWidth: 2, borderColor: colors.borderDark, borderRadius: 24, padding: 32, alignItems: 'center', backgroundColor: colors.surface, marginBottom: 24 },
  scanTitle: { fontFamily: fonts.body.medium, fontSize: fontSizes.md, color: colors.textMuted, marginBottom: 24 },
  btnScan: { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.warning, justifyContent: 'center', alignItems: 'center', shadowColor: colors.warning, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 10, elevation: 6 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderRadius: 12, paddingHorizontal: 16, height: 56, marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, elevation: 2 },
  searchInput: { flex: 1, marginLeft: 12, fontFamily: fonts.body.medium, fontSize: fontSizes.base, color: colors.text },
  statsContainer: { flexDirection: 'row', gap: 12, marginBottom: 32 },
  statPill: { flex: 1, backgroundColor: colors.primary, borderRadius: 16, padding: 16, alignItems: 'center' },
  statPillSecondary: { backgroundColor: colors.warningLight },
  statPillValue: { fontFamily: fonts.title.bold, fontSize: fontSizes.xl, color: '#FFF', marginBottom: 4 },
  statPillLabel: { fontFamily: fonts.body.medium, fontSize: fontSizes.xs, color: colors.textLight, textTransform: 'uppercase' },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontFamily: fonts.title.bold, fontSize: fontSizes.md, color: colors.text, marginRight: 8 },
  badgeCount: { backgroundColor: colors.primary, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
  badgeCountText: { color: '#FFF', fontFamily: fonts.title.bold, fontSize: fontSizes.xs },
  collecteCard: { backgroundColor: colors.card, borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, elevation: 2 },
  collecteHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  farmerName: { fontFamily: fonts.title.semiBold, fontSize: fontSizes.base, color: colors.text },
  timeText: { fontFamily: fonts.body.regular, fontSize: fontSizes.xs, color: colors.textLight },
  collecteFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  eudrBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.success, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  eudrBadgeText: { color: '#FFF', fontFamily: fonts.body.bold, fontSize: 10, letterSpacing: 0.5 },
  lotWeight: { fontFamily: fonts.title.extraBold, fontSize: fontSizes.lg, color: colors.primary },
});
