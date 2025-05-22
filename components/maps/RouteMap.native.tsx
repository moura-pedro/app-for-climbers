import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Colors from '@/constants/Colors';

interface RouteProps {
  id: string;
  name: string;
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  difficulty: string;
  imageUrl: string;
}

interface RouteMapProps {
  routes: RouteProps[];
}

export default function RouteMap({ routes }: RouteMapProps) {
  // Default to Rio de Janeiro coordinates
  const initialRegion = {
    latitude: -22.9068,
    longitude: -43.1729,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // If we have routes, center on the first one
  const mapRegion = routes.length > 0 
    ? {
        latitude: routes[0].coordinates.latitude,
        longitude: routes[0].coordinates.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    : initialRegion;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={mapRegion}
      >
        {routes.map((route) => (
          <Marker
            key={route.id}
            coordinate={route.coordinates}
            title={route.name}
            description={`${route.location} - ${route.difficulty}`}
            pinColor={Colors.light.primary}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
}); 