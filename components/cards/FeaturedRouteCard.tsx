import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { MapPin } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';

interface FeaturedRouteCardProps {
  name: string;
  location: string;
  difficulty: string;
  distance: string;
  imageUrl: string;
}

export default function FeaturedRouteCard({ name, location, difficulty, distance, imageUrl }: FeaturedRouteCardProps) {
  return (
    <TouchableOpacity style={styles.container}>
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.imageBackground}
        imageStyle={styles.image}
      >
        <View style={styles.overlay}>
          <View style={styles.content}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.locationContainer}>
              <MapPin size={14} color="#FFF" style={styles.icon} />
              <Text style={styles.location}>{location}</Text>
            </View>
            <View style={styles.badgeContainer}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{difficulty}</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{distance}</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 180,
    borderRadius: 12,
    marginRight: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  image: {
    borderRadius: 12,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
    borderRadius: 12,
  },
  content: {
    padding: 16,
  },
  name: {
    ...Typography.heading4,
    color: '#FFF',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 4,
  },
  location: {
    ...Typography.bodySmall,
    color: '#FFF',
  },
  badgeContainer: {
    flexDirection: 'row',
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  badgeText: {
    ...Typography.caption,
    color: '#FFF',
  },
});