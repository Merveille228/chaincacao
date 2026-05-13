import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../constants/colors';
import { fonts, fontSizes } from '../../constants/fonts';

// Cette interface servira de conteneur d'interface avant l'intégration du vrai composant Caméra.
export const QRScannerScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scan QR Code</Text>
        <View style={{ width: 44 }} />
      </View>

      <View style={styles.cameraContainer}>
        {/* Mock Area : Replace with react-native-vision-camera later */}
        <View style={styles.overlay}>
          <Text style={styles.instructionText}>Placez le QR Code dans le cadre</Text>
          <View style={styles.scanTarget}>
            <View style={[styles.corner, styles.cornerTL]} />
            <View style={[styles.corner, styles.cornerTR]} />
            <View style={[styles.corner, styles.cornerBL]} />
            <View style={[styles.corner, styles.cornerBR]} />
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.actionBtn}>
          <Icon name="flash-outline" size={32} color="#FFF" />
          <Text style={styles.actionText}>Flash</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Icon name="image-outline" size={32} color="#FFF" />
          <Text style={styles.actionText}>Galerie</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, paddingTop: 40, backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 },
  backBtn: { padding: 8 },
  headerTitle: { fontFamily: fonts.title.bold, fontSize: fontSizes.lg, color: '#FFF' },
  cameraContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111' }, // Placeholder color
  overlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center' },
  instructionText: { fontFamily: fonts.body.medium, fontSize: fontSizes.base, color: '#FFF', position: 'absolute', top: 180 },
  scanTarget: { width: 250, height: 250, borderWidth: 0, position: 'relative' },
  corner: { position: 'absolute', width: 40, height: 40, borderColor: colors.warning, borderWidth: 4 },
  cornerTL: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 16 },
  cornerTR: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 16 },
  cornerBL: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 16 },
  cornerBR: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 16 },
  footer: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 32, backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', bottom: 0, left: 0, right: 0 },
  actionBtn: { alignItems: 'center' },
  actionText: { fontFamily: fonts.body.medium, fontSize: fontSizes.xs, color: '#FFF', marginTop: 8 }
});
