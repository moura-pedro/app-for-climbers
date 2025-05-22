import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dumbbell, Award, Clock, CheckCircle2 } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import TrainingProgramCard from '@/components/cards/TrainingProgramCard';
import ProgressChart from '@/components/charts/ProgressChart';

export default function TrainingScreen() {
  const [selectedLevel, setSelectedLevel] = useState('all');
  
  const levels = ['all', 'beginner', 'intermediate', 'advanced'];

  const trainingPrograms = [
    {
      id: '1',
      title: 'Beginner Strength Building',
      level: 'beginner',
      duration: '6 weeks',
      focus: ['Finger Strength', 'Core', 'Pull Power'],
      sessions: 3,
      rating: 4.7,
      imageUrl: 'https://images.pexels.com/photos/3764011/pexels-photo-3764011.jpeg',
    },
    {
      id: '2',
      title: 'Sport Climbing Endurance',
      level: 'intermediate',
      duration: '8 weeks',
      focus: ['Endurance', 'Technique', 'Mental Training'],
      sessions: 4,
      rating: 4.9,
      imageUrl: 'https://images.pexels.com/photos/1822458/pexels-photo-1822458.jpeg',
    },
    {
      id: '3',
      title: 'Advanced Project Preparation',
      level: 'advanced',
      duration: '12 weeks',
      focus: ['Power Endurance', 'Finger Strength', 'Movement Efficiency'],
      sessions: 5,
      rating: 4.8,
      imageUrl: 'https://images.pexels.com/photos/9457825/pexels-photo-9457825.jpeg',
    },
  ];

  const activeProgram = {
    id: '2',
    title: 'Sport Climbing Endurance',
    level: 'intermediate',
    progress: 65,
    weeksCompleted: 5,
    totalWeeks: 8,
    nextSession: 'Tomorrow',
    lastMilestone: 'Completed 4x4 Endurance Circuit',
  };

  const personalBests = [
    { category: 'Max Grade', value: '5.12a' },
    { category: 'Hang Time', value: '45s' },
    { category: 'Pull-ups', value: '12' },
  ];

  const filteredPrograms = selectedLevel === 'all' 
    ? trainingPrograms 
    : trainingPrograms.filter(program => program.level === selectedLevel);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Training</Text>
        </View>

        {/* Active Program Section */}
        {activeProgram && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Active Program</Text>
              <TouchableOpacity>
                <Text style={styles.seeDetailsText}>See Details</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.activeProgramCard}>
              <View style={styles.programProgressContainer}>
                <ProgressChart progress={activeProgram.progress} />
                <View style={styles.progressDetails}>
                  <Text style={styles.progressTitle}>{activeProgram.title}</Text>
                  <View style={styles.progressStats}>
                    <View style={styles.progressStat}>
                      <Clock size={16} color={Colors.light.text} />
                      <Text style={styles.progressStatText}>
                        Week {activeProgram.weeksCompleted}/{activeProgram.totalWeeks}
                      </Text>
                    </View>
                    <View style={styles.progressStat}>
                      <CheckCircle2 size={16} color={Colors.light.success} />
                      <Text style={styles.progressStatText}>
                        Next session: {activeProgram.nextSession}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.milestoneContainer}>
                <Text style={styles.milestoneLabel}>Latest Milestone:</Text>
                <Text style={styles.milestoneText}>{activeProgram.lastMilestone}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Personal Bests Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Bests</Text>
          <View style={styles.personalBestsContainer}>
            {personalBests.map((best, index) => (
              <View key={index} style={styles.personalBestCard}>
                <Award size={24} color={Colors.light.primary} />
                <Text style={styles.personalBestValue}>{best.value}</Text>
                <Text style={styles.personalBestCategory}>{best.category}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Training Programs Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Training Programs</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.levelFilter}>
            {levels.map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.levelChip,
                  selectedLevel === level && styles.selectedLevelChip
                ]}
                onPress={() => setSelectedLevel(level)}
              >
                <Text 
                  style={[
                    styles.levelChipText,
                    selectedLevel === level && styles.selectedLevelChipText
                  ]}
                >
                  {level === 'all' ? 'All Levels' : level.charAt(0).toUpperCase() + level.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.programsList}>
            {filteredPrograms.map((program) => (
              <TrainingProgramCard key={program.id} program={program} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingTop: 8,
    backgroundColor: Colors.light.background,
  },
  headerTitle: {
    ...Typography.heading2,
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    ...Typography.heading3,
  },
  seeDetailsText: {
    ...Typography.buttonSmall,
    color: Colors.light.primary,
  },
  activeProgramCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  programProgressContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  progressDetails: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  progressTitle: {
    ...Typography.heading4,
    marginBottom: 8,
  },
  progressStats: {
    gap: 8,
  },
  progressStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressStatText: {
    ...Typography.bodySmall,
    marginLeft: 8,
  },
  milestoneContainer: {
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    paddingTop: 12,
  },
  milestoneLabel: {
    ...Typography.caption,
    color: Colors.light.text,
    marginBottom: 4,
  },
  milestoneText: {
    ...Typography.bodyMedium,
  },
  personalBestsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  personalBestCard: {
    flex: 1,
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    margin: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  personalBestValue: {
    ...Typography.heading3,
    marginTop: 8,
    marginBottom: 4,
  },
  personalBestCategory: {
    ...Typography.caption,
    textAlign: 'center',
  },
  levelFilter: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  levelChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.light.card,
    marginRight: 8,
  },
  selectedLevelChip: {
    backgroundColor: Colors.light.primary,
  },
  levelChipText: {
    ...Typography.buttonSmall,
  },
  selectedLevelChipText: {
    color: Colors.light.background,
  },
  programsList: {
    gap: 16,
  },
});