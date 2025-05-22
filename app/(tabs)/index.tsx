import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Cloud, Users, AlertTriangle } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import FeaturedRouteCard from '@/components/cards/FeaturedRouteCard';
import WeatherAlert from '@/components/alerts/WeatherAlert';
import EventCard from '@/components/cards/EventCard';

export default function HomeScreen() {
  const [weatherAlerts, setWeatherAlerts] = useState([
    {
      id: '1',
      location: 'Serra do Cipó',
      alert: 'Heavy rain expected',
      time: '12:00 - 18:00',
      severity: 'high'
    }
  ]);

  const featuredRoutes = [
    {
      id: '1',
      name: 'Pão de Açúcar - Via dos Italianos',
      location: 'Rio de Janeiro',
      difficulty: '5.10a',
      distance: '8.2km',
      imageUrl: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg'
    },
    {
      id: '2',
      name: 'Pedra da Gávea - Face Sul',
      location: 'Rio de Janeiro',
      difficulty: '5.11b',
      distance: '12.5km',
      imageUrl: 'https://images.pexels.com/photos/2335126/pexels-photo-2335126.jpeg'
    }
  ];

  const upcomingEvents = [
    {
      id: '1',
      title: 'Weekend Climb: Minas Gerais',
      date: 'May 15-16, 2025',
      participants: 12,
      imageUrl: 'https://images.pexels.com/photos/2387069/pexels-photo-2387069.jpeg'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Olá, Escalador!</Text>
          <Text style={styles.locationText}>
            <MapPin size={16} color={Colors.light.primary} /> Rio de Janeiro, BR
          </Text>
        </View>

        {/* Weather Alerts */}
        {weatherAlerts.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Weather Alerts</Text>
            {weatherAlerts.map(alert => (
              <WeatherAlert 
                key={alert.id}
                location={alert.location}
                alert={alert.alert}
                time={alert.time}
                severity={alert.severity}
              />
            ))}
          </View>
        )}

        {/* Featured Routes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Routes</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {featuredRoutes.map(route => (
              <FeaturedRouteCard
                key={route.id}
                name={route.name}
                location={route.location}
                difficulty={route.difficulty}
                distance={route.distance}
                imageUrl={route.imageUrl}
              />
            ))}
          </ScrollView>
        </View>

        {/* Partner Finder */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Find a Partner</Text>
          <TouchableOpacity style={styles.partnerFinderCard}>
            <View style={styles.partnerContent}>
              <Users size={24} color={Colors.light.primary} />
              <Text style={styles.partnerText}>5 climbers looking for partners near you</Text>
            </View>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Upcoming Events */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          {upcomingEvents.map(event => (
            <EventCard
              key={event.id}
              title={event.title}
              date={event.date}
              participants={event.participants}
              imageUrl={event.imageUrl}
            />
          ))}
        </View>

        {/* Safety Alert */}
        <View style={[styles.section, styles.safetySection]}>
          <View style={styles.safetyHeader}>
            <AlertTriangle size={20} color={Colors.light.warning} />
            <Text style={styles.safetySectionTitle}>Safety Reminder</Text>
          </View>
          <Text style={styles.safetyText}>
            Always check your equipment before climbing. The rainy season has begun in southern Brazil.
          </Text>
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
  welcomeText: {
    ...Typography.heading2,
    marginBottom: 4,
  },
  locationText: {
    ...Typography.bodySmall,
    color: Colors.light.primary,
    marginBottom: 8,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    ...Typography.heading3,
    marginBottom: 12,
  },
  horizontalScroll: {
    flexDirection: 'row',
    paddingBottom: 8,
  },
  partnerFinderCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  partnerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  partnerText: {
    ...Typography.bodyMedium,
    marginLeft: 12,
  },
  viewAllText: {
    ...Typography.buttonSmall,
    color: Colors.light.primary,
  },
  safetySection: {
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
  },
  safetyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  safetySectionTitle: {
    ...Typography.heading4,
    color: Colors.light.warning,
    marginLeft: 8,
  },
  safetyText: {
    ...Typography.body,
    color: '#92400E',
  },
});