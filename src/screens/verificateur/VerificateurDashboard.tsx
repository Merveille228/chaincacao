import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../constants/colors';
import { fonts, fontSizes } from '../../constants/fonts';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { BlockchainTimeline } from '../../components/common/BlockchainTimeline';

export const VerificateurDashboard = () => {

  const mockTransfers = [
    {
      id: '1',
      actorRole: 'FARMER',
      action: 'CREATED',
      actorName: 'Koffi A.',
      timestamp: new Date('2026-04-02T10:00:00').getTime(),
      notes: 'Récolte'
    },
    {
      id: '2',
      actorRole: 'COOPERATIVE',
      action: 'VALIDATED',
      actorName: 'Coopérative Élite',
      timestamp: new Date('2026-04-05T14:30:00').getTime(),
      notes: 'Collecte et Pesée'
    },
    {
      id: '3',
      actorRole: 'EXPORTER',
      action: 'EXPORTED',
      actorName: 'CacaoTogo Export',
      timestamp: new Date('2026-04-10T09:15:00').getTime(),
      notes: 'Export - Port de Lomé'
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="shield-check" size={28} color={colors.primary} />
        <Text style={styles.headerTitle}>Cacao Authentique</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* EUDR BADGE */}
        <View style={styles.eudrContainer}>
          <Icon name="shield-check" size={80} color={colors.success} style={{ marginBottom: 16 }} />
          <Text style={styles.eudrTitle}>CERTIFIÉ CONFORME EUDR</Text>
          <Text style={styles.eudrSubtitle}>ZÉRO DÉFORESTATION GARANTIE</Text>
          <View style={styles.hashBox}>
            <Text style={styles.hashText}>HASH: 0X4IF2E...9A1C8R32E</Text>
          </View>
        </View>

        {/* MAP PLACEHOLDER */}
        <View style={styles.mapContainer}>
          <View style={styles.mapOverlay}>
            <Icon name="satellite-variant" size={20} color="#FFF" />
            <Text style={styles.mapOverlayText}>Vérification Satellite: Positive</Text>
          </View>
          <Icon name="map-marker-radius" size={48} color={colors.primary} />
          <Text style={styles.coords}>6.942° N, 0.631° E</Text>
        </View>

        {/* INFO PRODUIT */}
        <View style={styles.productInfo}>
          <View style={styles.productCol}>
            <Text style={styles.productLabel}>Espèce</Text>
            <Text style={styles.productValue}>Cacao Forastero</Text>
          </View>
          <View style={styles.productCol}>
            <Text style={styles.productLabel}>Poids Total</Text>
            <Text style={styles.productValue}>1,200 kg</Text>
          </View>
          <View style={styles.productCol}>
            <Text style={styles.productLabel}>Humidité</Text>
            <Text style={styles.productValue}>7.5%</Text>
          </View>
        </View>

        {/* TIMELINE BLOCKCHAIN */}
        <Text style={styles.sectionTitle}>Parcours Blockchain</Text>
        <BlockchainTimeline transfers={mockTransfers} />

        <View style={{ marginTop: 32 }}>
          <PrimaryButton 
            label="Télécharger le Certificat" 
            variant="primary" 
            icon="file-download" 
            onPress={() => {}} 
          />
          <Text style={styles.footerNote}>Document officiel sécurisé par Agricert Togo</Text>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16, paddingTop: 40, backgroundColor: colors.card, borderBottomWidth: 1, borderBottomColor: colors.border },
  headerTitle: { fontFamily: fonts.title.bold, fontSize: fontSizes.lg, color: colors.primary, marginLeft: 12 },
  content: { padding: 24, paddingBottom: 100 },
  eudrContainer: { alignItems: 'center', marginVertical: 32 },
  eudrTitle: { fontFamily: fonts.title.extraBold, fontSize: fontSizes.xl, color: colors.success, textAlign: 'center', marginBottom: 4 },
  eudrSubtitle: { fontFamily: fonts.body.bold, fontSize: fontSizes.sm, color: colors.textMuted, textAlign: 'center', marginBottom: 16 },
  hashBox: { backgroundColor: colors.surface, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: colors.border },
  hashText: { fontFamily: 'Courier', fontSize: fontSizes.xs, color: colors.textLight },
  mapContainer: { height: 160, backgroundColor: '#E0E0E0', borderRadius: 16, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', marginBottom: 32 },
  mapOverlay: { position: 'absolute', top: 12, left: 12, backgroundColor: 'rgba(45, 90, 39, 0.9)', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 100 },
  mapOverlayText: { fontFamily: fonts.body.bold, fontSize: 10, color: '#FFF', marginLeft: 6 },
  coords: { fontFamily: fonts.title.bold, fontSize: fontSizes.sm, color: colors.primary, marginTop: 8 },
  productInfo: { flexDirection: 'row', backgroundColor: colors.card, borderRadius: 12, padding: 16, marginBottom: 32, borderWidth: 1, borderColor: colors.border },
  productCol: { flex: 1 },
  productLabel: { fontFamily: fonts.body.medium, fontSize: fontSizes.xs, color: colors.textLight, marginBottom: 4 },
  productValue: { fontFamily: fonts.title.semiBold, fontSize: fontSizes.sm, color: colors.text },
  sectionTitle: { fontFamily: fonts.title.bold, fontSize: fontSizes.md, color: colors.text, marginBottom: 16 },
  footerNote: { fontFamily: fonts.body.regular, fontSize: fontSizes.xs, color: colors.textLight, textAlign: 'center', marginTop: 16 }
});
