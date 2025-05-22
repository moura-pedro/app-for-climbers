import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, MapPin, Calendar, Users } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import PartnerCard from '@/components/cards/PartnerCard';
import EventCard from '@/components/cards/EventCard';

export default function CommunityScreen() {
  const [activeTab, setActiveTab] = useState<'partners' | 'events'>('partners');
  const [searchQuery, setSearchQuery] = useState('');
  
  const partners = [
    {
      id: '1',
      name: 'Rafael Silva',
      location: 'Rio de Janeiro',
      experience: 'Intermediate',
      styles: ['Sport', 'Trad'],
      availability: 'Weekends',
      rating: 4.8,
      imageUrl: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
      verified: true,
    },
    {
      id: '2',
      name: 'Ana Costa',
      location: 'São Paulo',
      experience: 'Advanced',
      styles: ['Bouldering', 'Sport'],
      availability: 'Evenings & Weekends',
      rating: 4.9,
      imageUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      verified: true,
    },
    {
      id: '3',
      name: 'Gabriel Monteiro',
      location: 'Minas Gerais',
      experience: 'Beginner',
      styles: ['Sport'],
      availability: 'Weekends',
      rating: 4.5,
      imageUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      verified: false,
    },
  ];

  const events = [
    {
      id: '1',
      title: 'Weekend Climb: Minas Gerais',
      location: 'Serra do Cipó',
      date: 'May 15-16, 2025',
      participants: 12,
      organizer: 'Climbing Club Brasil',
      imageUrl: 'https://images.pexels.com/photos/2387069/pexels-photo-2387069.jpeg',
    },
    {
      id: '2',
      title: 'Bouldering Competition',
      location: 'Rio de Janeiro',
      date: 'June 5, 2025',
      participants: 32,
      organizer: 'Climb Rio',
      imageUrl: 'https://images.pexels.com/photos/7099594/pexels-photo-7099594.jpeg',
    },
    {
      id: '3',
      title: 'Beginners Workshop',
      location: 'São Paulo',
      date: 'May 22, 2025',
      participants: 8,
      organizer: 'Escalada SP',
      imageUrl: 'https://images.pexels.com/photos/3522740/pexels-photo-3522740.jpeg',
    },
  ];

  const filteredPartners = partners.filter(partner => 
    partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    partner.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Community</Text>
      <View style={styles.searchBar}>
        <Search size={20} color={Colors.light.text} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={activeTab === 'partners' ? "Search partners..." : "Search events..."}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'partners' && styles.activeTab]} 
          onPress={() => setActiveTab('partners')}
        >
          <Users size={20} color={activeTab === 'partners' ? Colors.light.primary : Colors.light.text} />
          <Text style={[styles.tabText, activeTab === 'partners' && styles.activeTabText]}>
            Partners
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'events' && styles.activeTab]} 
          onPress={() => setActiveTab('events')}
        >
          <Calendar size={20} color={activeTab === 'events' ? Colors.light.primary : Colors.light.text} />
          <Text style={[styles.tabText, activeTab === 'events' && styles.activeTabText]}>
            Events
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      
      {activeTab === 'partners' ? (
        <FlatList
          data={filteredPartners}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PartnerCard partner={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={filteredEvents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EventCard
              title={item.title}
              location={item.location}
              date={item.date}
              participants={item.participants}
              organizer={item.organizer}
              imageUrl={item.imageUrl}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
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
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginRight: 24,
  },
  tabText: {
    ...Typography.button,
    marginLeft: 8,
    color: Colors.light.text,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.light.primary,
  },
  activeTabText: {
    color: Colors.light.primary,
  },
  listContent: {
    padding: 16,
  },
});