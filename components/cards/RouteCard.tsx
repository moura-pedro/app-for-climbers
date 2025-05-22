import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { MapPin, Star } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';

interface RouteProps {
  id: string;
  name: string;
  location: string;
  difficulty: string;
  type: string;
  length: string;
  rating: number;
  imageUrl: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

interface RouteCardProps {
  route: RouteProps;
}

export default function RouteCard({ route }: RouteCardProps) {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: route.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>{route.name}</Text>
            <View style={styles.locationContainer}>
              <MapPin size={14} color={Colors.light.primary} />
              <Text style={styles.location}>{route.location}</Text>
            </View>
          </View>
          <View style={styles.difficultyBadge}>
            <Text style={styles.difficultyText}>{route.difficulty}</Text>
          </View>
        </View>
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Type</Text>
            <Text style={styles.detailValue}>{route.type}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Length</Text>
            <Text style={styles.detailValue}>{route.length}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Rating</Text>
            <View style={styles.ratingContainer}>
              <Star size={14} color={Colors.light.warning} fill={Colors.light.warning} />
              <Text style={styles.ratingText}>{route.rating}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 120,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  name: {
    ...Typography.bodyMedium,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    ...Typography.caption,
    color: Colors.light.text,
    marginLeft: 4,
  },
  difficultyBadge: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    ...Typography.caption,
    color: Colors.light.background,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    paddingTop: 8,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    ...Typography.caption,
    color: Colors.light.text,
    marginBottom: 2,
  },
  detailValue: {
    ...Typography.bodySmall,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    ...Typography.bodySmall,
    marginLeft: 4,
  },
});