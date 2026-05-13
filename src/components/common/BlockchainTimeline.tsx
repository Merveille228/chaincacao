import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../constants/colors';
import { fonts, fontSizes } from '../../constants/fonts';

interface TransferEvent {
  id: string;
  actorRole: string;
  action: string;
  actorName: string;
  timestamp: number;
  notes: string;
}

interface BlockchainTimelineProps {
  transfers: TransferEvent[];
}

export const BlockchainTimeline: React.FC<BlockchainTimelineProps> = ({ transfers }) => {
  return (
    <View style={styles.container}>
      {transfers.map((event, index) => {
        const isLast = index === transfers.length - 1;
        const date = new Date(event.timestamp).toLocaleDateString('fr-FR', {
          day: '2-digit', month: 'short', year: 'numeric'
        });

        return (
          <View key={event.id} style={styles.itemContainer}>
            <View style={styles.timelineGraphic}>
              <View style={styles.node}>
                <Icon name="link-lock" size={14} color="#FFF" />
              </View>
              {!isLast && <View style={styles.line} />}
            </View>
            <View style={styles.content}>
              <Text style={styles.date}>{date.toUpperCase()} — {event.notes}</Text>
              <Text style={styles.actor}>{event.actorName}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    minHeight: 60,
  },
  timelineGraphic: {
    width: 40,
    alignItems: 'center',
  },
  node: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: colors.borderDark,
    marginVertical: 4,
  },
  content: {
    flex: 1,
    paddingBottom: 24,
    paddingTop: 2,
  },
  date: {
    fontFamily: fonts.body.bold,
    fontSize: fontSizes.xs,
    color: colors.textMuted,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  actor: {
    fontFamily: fonts.title.semiBold,
    fontSize: fontSizes.sm,
    color: colors.primary,
  }
});
