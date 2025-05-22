import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Star, MapPin, Check, Calendar } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';

interface PartnerProps {
  id: string;
  name: string;
  location: string;
  experience: string;
  styles: string[];
  availability: string;
  rating: number;
  imageUrl: string;
  verified: boolean;
}

interface PartnerCardProps {
  partner: PartnerProps;
}

export default function PartnerCard({ partner }: PartnerCardProps) {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: partner.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{partner.name}</Text>
            {partner.verified && (
              <View style={styles.verifiedBadge}>
                <Check size={12} color="#FFF" />
              </View>
            )}
          </View>
          <View style={styles.ratingContainer}>
            <Star size={16} color={Colors.light.warning} fill={Colors.light.warning} />
            <Text style={styles.rating}>{partner.rating}</Text>
          </View>
        </View>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <MapPin size={14} color={Colors.light.text} />
            <Text style={styles.infoText}>{partner.location}</Text>
          </View>
          <View style={styles.infoItem}>
            <Calendar size={14} color={Colors.light.text} />
            <Text style={styles.infoText}>{partner.availability}</Text>
          </View>
        </View>
        
        <View style={styles.footer}>
          <View style={styles.experienceBadge}>
            <Text style={styles.experienceText}>{partner.experience}</Text>
          </View>
          {partner.styles.map((style, index) => (
            <View key={index} style={styles.styleBadge}>
              <Text style={styles.styleText}>{style}</Text>
            </View>
          ))}
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
    height: 130,
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
    alignItems: 'center',
    marginBottom: 8,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    ...Typography.bodyMedium,
    marginRight: 6,
  },
  verifiedBadge: {
    backgroundColor: Colors.light.success,
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoText: {
    ...Typography.bodySmall,
    marginLeft: 6,
  },
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  experienceBadge: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  experienceText: {
    ...Typography.caption,
    color: Colors.light.background,
  },
  styleBadge: {
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  styleText: {
    ...Typography.caption,
  },
});