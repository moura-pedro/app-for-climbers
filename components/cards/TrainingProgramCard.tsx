import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Clock, Star, ArrowRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';

interface TrainingProgramProps {
  id: string;
  title: string;
  level: string;
  duration: string;
  focus: string[];
  sessions: number;
  rating: number;
  imageUrl: string;
}

interface TrainingProgramCardProps {
  program: TrainingProgramProps;
}

export default function TrainingProgramCard({ program }: TrainingProgramCardProps) {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: program.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{program.title}</Text>
          <View style={styles.ratingContainer}>
            <Star size={16} color={Colors.light.warning} fill={Colors.light.warning} />
            <Text style={styles.rating}>{program.rating}</Text>
          </View>
        </View>
        
        <View style={styles.infoContainer}>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>
              {program.level.charAt(0).toUpperCase() + program.level.slice(1)}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Clock size={14} color={Colors.light.text} />
            <Text style={styles.infoText}>{program.duration}</Text>
          </View>
        </View>
        
        <View style={styles.focusContainer}>
          <Text style={styles.focusLabel}>Focus Areas:</Text>
          <View style={styles.focusBadges}>
            {program.focus.map((focus, index) => (
              <View key={index} style={styles.focusBadge}>
                <Text style={styles.focusText}>{focus}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.sessionText}>{program.sessions} sessions per week</Text>
          <ArrowRight size={18} color={Colors.light.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 150,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  title: {
    ...Typography.heading4,
    flex: 1,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    ...Typography.bodyMedium,
    marginLeft: 4,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  levelBadge: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 12,
  },
  levelText: {
    ...Typography.caption,
    color: Colors.light.background,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    ...Typography.bodySmall,
    marginLeft: 6,
  },
  focusContainer: {
    marginBottom: 12,
  },
  focusLabel: {
    ...Typography.bodySmall,
    marginBottom: 6,
  },
  focusBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  focusBadge: {
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  focusText: {
    ...Typography.caption,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    paddingTop: 12,
  },
  sessionText: {
    ...Typography.bodyMedium,
  },
});