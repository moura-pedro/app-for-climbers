import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings, MapPin, Award, ChevronRight, Shield, Bell, LogOut } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';

export default function ProfileScreen() {
  const [isEmergencyContactEnabled, setIsEmergencyContactEnabled] = useState(true);
  const [isLocationSharingEnabled, setIsLocationSharingEnabled] = useState(true);
  
  const userProfile = {
    name: 'Rafael Silva',
    location: 'Rio de Janeiro, Brazil',
    memberSince: 'March 2024',
    climbingSince: '2018',
    styles: ['Sport', 'Trad', 'Bouldering'],
    favoriteAreas: ['Serra do Cipó', 'Pão de Açúcar'],
    imageUrl: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    level: 'Intermediate',
    achievements: [
      { id: '1', title: 'First 5.12a Lead', date: 'January 2025' },
      { id: '2', title: 'Multi-pitch Completion', date: 'November 2024' },
    ],
    emergencyContacts: [
      { name: 'Ana Costa', relationship: 'Partner', phone: '+55 21 98765-4321' }
    ]
  };

  const menuItems = [
    { icon: <User size={24} color={Colors.light.text} />, title: 'Edit Profile', screen: 'edit-profile' },
    { icon: <Award size={24} color={Colors.light.text} />, title: 'Achievements', screen: 'achievements' },
    { icon: <MapPin size={24} color={Colors.light.text} />, title: 'Favorite Areas', screen: 'favorite-areas' },
    { icon: <Shield size={24} color={Colors.light.text} />, title: 'Emergency Contacts', screen: 'emergency-contacts' },
    { icon: <Bell size={24} color={Colors.light.text} />, title: 'Notifications', screen: 'notifications' },
    { icon: <Settings size={24} color={Colors.light.text} />, title: 'Settings', screen: 'settings' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image source={{ uri: userProfile.imageUrl }} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userProfile.name}</Text>
            <Text style={styles.profileLocation}>
              <MapPin size={16} color={Colors.light.primary} style={{ marginRight: 4 }} />
              {userProfile.location}
            </Text>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>{userProfile.level}</Text>
            </View>
          </View>
        </View>
        
        {/* Climbing Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userProfile.climbingSince}</Text>
            <Text style={styles.statLabel}>Climbing Since</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userProfile.styles.length}</Text>
            <Text style={styles.statLabel}>Climbing Styles</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userProfile.favoriteAreas.length}</Text>
            <Text style={styles.statLabel}>Favorite Areas</Text>
          </View>
        </View>
        
        {/* Recent Achievements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Achievements</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {userProfile.achievements.map((achievement) => (
            <View key={achievement.id} style={styles.achievementItem}>
              <Award size={24} color={Colors.light.primary} />
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDate}>{achievement.date}</Text>
              </View>
            </View>
          ))}
        </View>
        
        {/* Safety & Emergency */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Safety & Emergency</Text>
          <View style={styles.safetyCard}>
            <View style={styles.safetyRow}>
              <View style={styles.safetyInfo}>
                <Text style={styles.safetyTitle}>Emergency Contacts</Text>
                <Text style={styles.safetyDescription}>Enable one-tap emergency contact access</Text>
              </View>
              <Switch
                trackColor={{ false: Colors.light.border, true: Colors.light.primary }}
                thumbColor={isEmergencyContactEnabled ? '#FFF' : '#FFF'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={setIsEmergencyContactEnabled}
                value={isEmergencyContactEnabled}
              />
            </View>
            <View style={styles.safetyRow}>
              <View style={styles.safetyInfo}>
                <Text style={styles.safetyTitle}>Location Sharing</Text>
                <Text style={styles.safetyDescription}>Share location during climbing sessions</Text>
              </View>
              <Switch
                trackColor={{ false: Colors.light.border, true: Colors.light.primary }}
                thumbColor={isLocationSharingEnabled ? '#FFF' : '#FFF'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={setIsLocationSharingEnabled}
                value={isLocationSharingEnabled}
              />
            </View>
          </View>
        </View>
        
        {/* Menu Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Menu</Text>
          <View style={styles.menuCard}>
            {menuItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  {item.icon}
                  <Text style={styles.menuItemTitle}>{item.title}</Text>
                </View>
                <ChevronRight size={20} color={Colors.light.text} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color={Colors.light.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
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
  profileCard: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: Colors.light.card,
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    marginLeft: 16,
    justifyContent: 'center',
  },
  profileName: {
    ...Typography.heading3,
    marginBottom: 4,
  },
  profileLocation: {
    ...Typography.bodySmall,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelBadge: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  levelText: {
    ...Typography.caption,
    color: Colors.light.background,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.light.card,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...Typography.heading3,
    marginBottom: 4,
  },
  statLabel: {
    ...Typography.caption,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.light.border,
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
    marginBottom: 12,
  },
  seeAllText: {
    ...Typography.buttonSmall,
    color: Colors.light.primary,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  achievementInfo: {
    marginLeft: 16,
  },
  achievementTitle: {
    ...Typography.bodyMedium,
    marginBottom: 4,
  },
  achievementDate: {
    ...Typography.caption,
    color: Colors.light.text,
  },
  safetyCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  safetyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  safetyInfo: {
    flex: 1,
    marginRight: 16,
  },
  safetyTitle: {
    ...Typography.bodyMedium,
    marginBottom: 4,
  },
  safetyDescription: {
    ...Typography.caption,
    color: Colors.light.text,
  },
  menuCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemTitle: {
    ...Typography.body,
    marginLeft: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginHorizontal: 16,
    marginBottom: 32,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.error,
  },
  logoutText: {
    ...Typography.button,
    color: Colors.light.error,
    marginLeft: 8,
  },
});