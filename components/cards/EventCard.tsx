import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { MapPin, Users, Calendar } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';

interface EventCardProps {
  title: string;
  date: string;
  participants: number;
  imageUrl: string;
  location?: string;
  organizer?: string;
}

export default function EventCard({ title, date, participants, imageUrl, location, organizer }: EventCardProps) {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        
        {location && (
          <View style={styles.infoRow}>
            <MapPin size={14} color={Colors.light.text} style={styles.icon} />
            <Text style={styles.infoText}>{location}</Text>
          </View>
        )}
        
        <View style={styles.infoRow}>
          <Calendar size={14} color={Colors.light.text} style={styles.icon} />
          <Text style={styles.infoText}>{date}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Users size={14} color={Colors.light.text} style={styles.icon} />
          <Text style={styles.infoText}>{participants} participants</Text>
        </View>
        
        {organizer && (
          <Text style={styles.organizer}>By {organizer}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
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
  title: {
    ...Typography.heading4,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  icon: {
    marginRight: 6,
  },
  infoText: {
    ...Typography.bodySmall,
  },
  organizer: {
    ...Typography.caption,
    marginTop: 8,
    color: Colors.light.primary,
  },
});