import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { CloudRain, AlertTriangle, Clock } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';

interface WeatherAlertProps {
  location: string;
  alert: string;
  time: string;
  severity: 'low' | 'medium' | 'high';
}

export default function WeatherAlert({ location, alert, time, severity }: WeatherAlertProps) {
  const getSeverityColor = () => {
    switch (severity) {
      case 'low':
        return Colors.light.primary;
      case 'medium':
        return Colors.light.warning;
      case 'high':
        return Colors.light.error;
      default:
        return Colors.light.primary;
    }
  };

  const severityColor = getSeverityColor();

  return (
    <View style={[styles.container, { borderLeftColor: severityColor }]}>
      <View style={styles.iconContainer}>
        {severity === 'high' ? (
          <AlertTriangle size={24} color={severityColor} />
        ) : (
          <CloudRain size={24} color={severityColor} />
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.location}>{location}</Text>
        <Text style={styles.alert}>{alert}</Text>
        <View style={styles.timeContainer}>
          <Clock size={14} color={Colors.light.text} />
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.light.card,
    borderRadius: 8,
    borderLeftWidth: 4,
    marginBottom: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  iconContainer: {
    marginRight: 12,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  location: {
    ...Typography.bodyMedium,
    marginBottom: 4,
  },
  alert: {
    ...Typography.body,
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    ...Typography.caption,
    marginLeft: 6,
    color: Colors.light.text,
  },
});