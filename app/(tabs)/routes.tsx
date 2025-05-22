import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, Map as MapIcon, List } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import RouteCard from '@/components/cards/RouteCard';
import RouteMap from '@/components/maps/RouteMap';

export default function RoutesScreen() {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All Brazil');
  
  const regions = ['All Brazil', 'Rio de Janeiro', 'São Paulo', 'Minas Gerais', 'Rio Grande do Sul'];
  
  const routes = [
    {
      id: '1',
      name: 'Pão de Açúcar - Via dos Italianos',
      location: 'Rio de Janeiro',
      difficulty: '5.10a',
      type: 'Traditional',
      length: '250m',
      rating: 4.8,
      imageUrl: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
      coordinates: {
        latitude: -22.9492,
        longitude: -43.1545,
      }
    },
    {
      id: '2',
      name: 'Pedra da Gávea - Face Sul',
      location: 'Rio de Janeiro',
      difficulty: '5.11b',
      type: 'Sport',
      length: '180m',
      rating: 4.6,
      imageUrl: 'https://images.pexels.com/photos/2335126/pexels-photo-2335126.jpeg',
      coordinates: {
        latitude: -22.9977,
        longitude: -43.2851,
      }
    },
    {
      id: '3',
      name: 'Serra do Cipó - Via Trimming',
      location: 'Minas Gerais',
      difficulty: '5.9',
      type: 'Traditional',
      length: '120m',
      rating: 4.7,
      imageUrl: 'https://images.pexels.com/photos/1659437/pexels-photo-1659437.jpeg',
      coordinates: {
        latitude: -19.3298,
        longitude: -43.6018,
      }
    },
  ];

  const filteredRoutes = routes.filter(route => {
    const matchesSearch = route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          route.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === 'All Brazil' || route.location === selectedRegion;
    
    return matchesSearch && matchesRegion;
  });

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Climbing Routes</Text>
      <View style={styles.searchBar}>
        <Search size={20} color={Colors.light.text} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search routes..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {regions.map((region) => (
            <TouchableOpacity 
              key={region} 
              style={[
                styles.filterChip,
                selectedRegion === region && styles.filterChipSelected
              ]}
              onPress={() => setSelectedRegion(region)}
            >
              <Text 
                style={[
                  styles.filterChipText,
                  selectedRegion === region && styles.filterChipTextSelected
                ]}
              >
                {region}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={Colors.light.text} />
        </TouchableOpacity>
      </View>
      <View style={styles.viewToggle}>
        <TouchableOpacity 
          style={[styles.toggleButton, viewMode === 'list' && styles.toggleButtonActive]} 
          onPress={() => setViewMode('list')}
        >
          <List size={20} color={viewMode === 'list' ? Colors.light.background : Colors.light.text} />
          <Text style={[styles.toggleText, viewMode === 'list' && styles.toggleTextActive]}>List</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.toggleButton, viewMode === 'map' && styles.toggleButtonActive]} 
          onPress={() => setViewMode('map')}
        >
          <MapIcon size={20} color={viewMode === 'map' ? Colors.light.background : Colors.light.text} />
          <Text style={[styles.toggleText, viewMode === 'map' && styles.toggleTextActive]}>Map</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      
      {viewMode === 'list' ? (
        <FlatList
          data={filteredRoutes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <RouteCard route={item} />}
          contentContainerStyle={styles.routesList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <RouteMap routes={filteredRoutes} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.card,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    ...Typography.body,
    flex: 1,
    height: 44,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.light.card,
    marginRight: 8,
  },
  filterChipSelected: {
    backgroundColor: Colors.light.primary,
  },
  filterChipText: {
    ...Typography.buttonSmall,
    color: Colors.light.text,
  },
  filterChipTextSelected: {
    color: Colors.light.background,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: Colors.light.card,
    borderRadius: 8,
    overflow: 'hidden',
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    flex: 1,
  },
  toggleButtonActive: {
    backgroundColor: Colors.light.primary,
  },
  toggleText: {
    ...Typography.buttonSmall,
    marginLeft: 8,
  },
  toggleTextActive: {
    color: Colors.light.background,
  },
  routesList: {
    padding: 16,
  },
});