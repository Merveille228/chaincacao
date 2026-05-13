import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../constants/colors';
import { fonts, fontSizes } from '../../constants/fonts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'success' | 'warning' | 'error';
  icon?: string;
  style?: ViewStyle;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  icon,
  style,
}) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'success': return colors.success;
      case 'warning': return colors.warning;
      case 'error': return colors.error;
      case 'primary':
      default: return colors.primary;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="#FFF" />
      ) : (
        <>
          {icon && <Icon name={icon} size={20} color="#FFF" style={styles.icon} />}
          <Text style={styles.label}>{label}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    color: '#FFF',
    fontFamily: fonts.title.bold,
    fontSize: fontSizes.base,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  icon: {
    marginRight: 8,
  },
});
