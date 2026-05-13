import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LotStatus } from '../../types/lot.types';
import { colors } from '../../constants/colors';
import { fonts, fontSizes } from '../../constants/fonts';

interface StatusBadgeProps {
  status: LotStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let bgColor = colors.surface;
  let textColor = colors.textMuted;
  let label = 'En attente';
  let icon = 'clock-outline';

  switch (status) {
    case 'CREATED':
      bgColor = colors.surface;
      textColor = colors.textMuted;
      label = 'En attente';
      icon = 'clock-outline';
      break;
    case 'AT_COOPERATIVE':
      bgColor = colors.warningLight;
      textColor = colors.warning;
      label = 'En collecte';
      icon = 'truck-delivery-outline';
      break;
    case 'VALIDATED':
      bgColor = colors.successLight;
      textColor = colors.success;
      label = 'Validé';
      icon = 'check-decagram-outline';
      break;
    case 'EXPORTED':
      bgColor = '#E3F2FD';
      textColor = '#1565C0';
      label = 'Exporté';
      icon = 'ship-wheel';
      break;
    case 'REJECTED':
      bgColor = colors.errorLight;
      textColor = colors.error;
      label = 'Rejeté';
      icon = 'alert-circle-outline';
      break;
  }

  return (
    <View style={[styles.badge, { backgroundColor: bgColor }]}>
      <Icon name={icon} size={14} color={textColor} style={styles.icon} />
      <Text style={[styles.text, { color: textColor }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  icon: {
    marginRight: 4,
  },
  text: {
    fontFamily: fonts.body.bold,
    fontSize: fontSizes.xs,
    textTransform: 'uppercase',
  },
});
