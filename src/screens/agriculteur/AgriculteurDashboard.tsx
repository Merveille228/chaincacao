import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuthStore } from '../../store/auth.store';
import { colors } from '../../constants/colors';
import { fonts, fontSizes } from '../../constants/fonts';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { OfflineBanner } from '../../components/common/OfflineBanner';

export const AgriculteurDashboard = () => {
  const navigation = useNavigation<any>();
  const { user } = useAuthStore();

  return (
    <View style={styles.container}>
      <OfflineBanner />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user?.firstName?.[0]}{user?.lastName?.[0]}</Text>
            </View>
            <View>
              <Text style={styles.userName}>{user?.firstName} {user?.lastName}</Text>
              <Text style={styles.userId}>ID: {user?.id} • Coop: {user?.cooperativeId}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.themeBtn}>
            <Icon name="weather-sunny" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* HERO CARD */}
        <View style={styles.heroCard}>
          <View style={styles.heroHeader}>
            <View style={styles.stockBadge}>
              <Text style={styles.stockBadgeText}>STOCK ACTUEL</Text>
            </View>
            <Text style={styles.lotCount}>3 lots en attente</Text>
          </View>
          <Text style={styles.heroTitle}>120 kg de Cacao Marchand</Text>
        </View>

        {/* STATS ROW */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Icon name="scale" size={24} color={colors.primary} />
            <View style={styles.statTextContainer}>
              <Text style={styles.statLabel}>DERNIÈRE PESÉE</Text>
              <Text style={styles.statValue}>24 kg</Text>
            </View>
          </View>
          <View style={styles.statCard}>
            <Icon name="calendar-month" size={24} color={colors.primary} />
            <View style={styles.statTextContainer}>
              <Text style={styles.statLabel}>TOTAL SEMAINE</Text>
              <Text style={styles.statValue}>48 kg</Text>
            </View>
          </View>
        </View>

        {/* MAIN ACTION */}
        <PrimaryButton 
          label="NOUVEAU LOT DE RÉCOLTE" 
          icon="plus-circle"
          onPress={() => navigation.navigate('NouveauLot')}
          style={styles.mainActionBtn}
        />

        {/* STATUS STRIP */}
        <View style={styles.statusStrip}>
          <TouchableOpacity style={styles.statusItem}><Text style={styles.statusText}>En attente: 3</Text></TouchableOpacity>
          <Text style={styles.statusDivider}>|</Text>
          <TouchableOpacity style={styles.statusItem}><Text style={styles.statusText}>Acceptés: 12</Text></TouchableOpacity>
          <Text style={styles.statusDivider}>|</Text>
          <TouchableOpacity style={styles.statusItem}><Text style={styles.statusText}>Refusés: 0</Text></TouchableOpacity>
        </View>

        {/* RECENT LOTS */}
        <Text style={styles.sectionTitle}>Activité récente</Text>
        {/* Mock LotCard placement */}
        <View style={styles.mockLotCard}>
          <Icon name="sack" size={32} color={colors.textLight} />
          <View style={styles.mockLotInfo}>
            <Text style={styles.mockLotId}>(Kpalimé)-CC_8A2B9C</Text>
            <Text style={styles.mockLotDate}>Aujourd'hui • 24 kg</Text>
          </View>
          <Icon name="clock-outline" size={24} color={colors.textMuted} />
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { padding: 16, paddingTop: 40, paddingBottom: 100 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  avatarText: { color: '#FFF', fontFamily: fonts.title.bold, fontSize: fontSizes.lg },
  userName: { fontFamily: fonts.title.semiBold, fontSize: fontSizes.md, color: colors.text },
  userId: { fontFamily: fonts.body.regular, fontSize: fontSizes.xs, color: colors.textMuted },
  themeBtn: { padding: 8, backgroundColor: colors.surface, borderRadius: 20 },
  heroCard: { backgroundColor: colors.card, borderRadius: 16, padding: 20, shadowColor: colors.primary, shadowOpacity: 0.08, shadowOffset: { width: 0, height: 2 }, shadowRadius: 12, elevation: 3, marginBottom: 24 },
  heroHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  stockBadge: { backgroundColor: colors.primary, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 100 },
  stockBadgeText: { color: '#FFF', fontFamily: fonts.body.bold, fontSize: fontSizes.xs },
  lotCount: { fontFamily: fonts.body.medium, fontSize: fontSizes.sm, color: colors.textMuted },
  heroTitle: { fontFamily: fonts.title.bold, fontSize: fontSizes['2xl'], color: colors.primary },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  statCard: { flex: 1, backgroundColor: colors.card, borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', marginHorizontal: 4, shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 1 }, shadowRadius: 8, elevation: 2 },
  statTextContainer: { marginLeft: 12 },
  statLabel: { fontFamily: fonts.body.bold, fontSize: 10, color: colors.textLight, marginBottom: 2 },
  statValue: { fontFamily: fonts.title.bold, fontSize: fontSizes.lg, color: colors.text },
  mainActionBtn: { marginBottom: 24 },
  statusStrip: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.surface, paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12, marginBottom: 24 },
  statusItem: { flex: 1, alignItems: 'center' },
  statusText: { fontFamily: fonts.body.medium, fontSize: fontSizes.sm, color: colors.textMuted },
  statusDivider: { color: colors.borderDark },
  sectionTitle: { fontFamily: fonts.title.semiBold, fontSize: fontSizes.md, color: colors.text, marginBottom: 12 },
  mockLotCard: { backgroundColor: colors.card, borderRadius: 12, padding: 16, flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  mockLotInfo: { flex: 1, marginLeft: 12 },
  mockLotId: { fontFamily: fonts.title.semiBold, fontSize: fontSizes.sm, color: colors.primary },
  mockLotDate: { fontFamily: fonts.body.regular, fontSize: fontSizes.xs, color: colors.textMuted },
});
