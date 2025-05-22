import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
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
  const defaultCenter = [-22.9068, -43.1729]; // Rio de Janeiro coordinates
  const center = routes.length > 0 
    ? [routes[0].coordinates.latitude, routes[0].coordinates.longitude]
    : defaultCenter;

  return (
    <View style={styles.container}>
      <div style={{ width: '100%', height: '100%' }}>
        <MapContainer
          center={center}
          zoom={13}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {routes.map((route) => (
            <Marker
              key={route.id}
              position={[route.coordinates.latitude, route.coordinates.longitude]}
            >
              <div>
                <b>{route.name}</b><br />
                {route.location} - {route.difficulty}
              </div>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 