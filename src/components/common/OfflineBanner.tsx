import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppStore } from '../../store/app.store';
import { colors } from '../../constants/colors';
import { fonts, fontSizes } from '../../constants/fonts';

export const OfflineBanner: React.FC = () => {
  const { isOnline } = useAppStore();

  if (isOnline) return null;

  return (
    <View style={styles.container}>
      <Icon name="cloud-off-outline" size={20} color="#FFF" style={styles.icon} />
      <Text style={styles.text}>Mode hors-ligne — données sécurisées localement</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.warning,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: '#FFF',
    fontFamily: fonts.body.medium,
    fontSize: fontSizes.sm,
  },
});
