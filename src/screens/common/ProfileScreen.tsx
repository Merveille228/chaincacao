import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuthStore } from '../../store/auth.store';
import { colors } from '../../constants/colors';
import { fonts, fontSizes } from '../../constants/fonts';

export const ProfileScreen = () => {
  const { user, logout } = useAuthStore();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mon Profil</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.firstName?.[0] || 'U'}</Text>
          </View>
          <Text style={styles.userName}>{user?.firstName} {user?.lastName}</Text>
          <Text style={styles.userRole}>{user?.role?.toUpperCase()}</Text>
          <Text style={styles.userId}>{user?.id}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Paramètres</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Icon name="weather-night" size={24} color={colors.primary} />
              <Text style={styles.menuItemText}>Mode Sombre</Text>
            </View>
            <Icon name="chevron-right" size={24} color={colors.textLight} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Icon name="earth" size={24} color={colors.primary} />
              <Text style={styles.menuItemText}>Langue (Français)</Text>
            </View>
            <Icon name="chevron-right" size={24} color={colors.textLight} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Icon name="sync" size={24} color={colors.primary} />
              <Text style={styles.menuItemText}>Synchronisation manuelle</Text>
            </View>
            <Icon name="chevron-right" size={24} color={colors.textLight} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Icon name="logout" size={24} color={colors.error} />
          <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { padding: 16, paddingTop: 40, backgroundColor: colors.card, borderBottomWidth: 1, borderBottomColor: colors.border, alignItems: 'center' },
  headerTitle: { fontFamily: fonts.title.bold, fontSize: fontSizes.lg, color: colors.primary },
  content: { padding: 16, paddingBottom: 100 },
  profileCard: { backgroundColor: colors.card, borderRadius: 16, padding: 24, alignItems: 'center', marginBottom: 32, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  avatarText: { color: '#FFF', fontFamily: fonts.title.bold, fontSize: 32 },
  userName: { fontFamily: fonts.title.bold, fontSize: fontSizes.xl, color: colors.text, marginBottom: 4 },
  userRole: { fontFamily: fonts.body.bold, fontSize: fontSizes.xs, color: colors.success, backgroundColor: colors.successLight, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, marginBottom: 8 },
  userId: { fontFamily: fonts.body.regular, fontSize: fontSizes.sm, color: colors.textMuted },
  section: { backgroundColor: colors.card, borderRadius: 16, overflow: 'hidden', marginBottom: 32 },
  sectionTitle: { fontFamily: fonts.body.bold, fontSize: fontSizes.xs, color: colors.textLight, textTransform: 'uppercase', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 },
  menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: colors.surface },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center' },
  menuItemText: { fontFamily: fonts.body.medium, fontSize: fontSizes.base, color: colors.text, marginLeft: 16 },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16, backgroundColor: colors.errorLight, borderRadius: 16 },
  logoutText: { fontFamily: fonts.title.bold, fontSize: fontSizes.base, color: colors.error, marginLeft: 8 },
});
