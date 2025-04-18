import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Button, Text, Divider, FAB, Searchbar, Chip, Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ClientsScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'recent', 'favorite'
  
  // Datos de ejemplo para clientes
  const [clients, setClients] = useState([
    { 
      id: 1, 
      name: 'María Rodríguez', 
      phone: '+503 7123 4567', 
      email: 'maria.rodriguez@gmail.com',
      lastVisit: '2025-04-10',
      visitCount: 12,
      favorite: true,
      notes: 'Prefiere productos sin sulfatos',
      services: ['Corte de cabello', 'Tinte', 'Tratamiento']
    },
    { 
      id: 2, 
      name: 'Juan Pérez', 
      phone: '+503 7234 5678', 
      email: 'juan.perez@gmail.com',
      lastVisit: '2025-04-15',
      visitCount: 3,
      favorite: false,
      notes: 'Alérgico a ciertos tintes',
      services: ['Manicure', 'Pedicure']
    },
    { 
      id: 3, 
      name: 'Ana López', 
      phone: '+503 7345 6789', 
      email: 'ana.lopez@gmail.com',
      lastVisit: '2025-04-17',
      visitCount: 8,
      favorite: true,
      notes: 'Prefiere citas en la mañana',
      services: ['Tinte', 'Tratamiento', 'Peinado']
    },
    { 
      id: 4, 
      name: 'Carlos Martínez', 
      phone: '+503 7456 7890', 
      email: 'carlos.martinez@gmail.com',
      lastVisit: '2025-04-05',
      visitCount: 5,
      favorite: false,
      notes: '',
      services: ['Corte', 'Barba']
    },
    { 
      id: 5, 
      name: 'Laura Sánchez', 
      phone: '+503 7567 8901', 
      email: 'laura.sanchez@gmail.com',
      lastVisit: '2025-03-20',
      visitCount: 2,
      favorite: false,
      notes: 'Nueva cliente',
      services: ['Pedicure']
    }
  ]);

  // Filtrar clientes
  const filteredClients = clients.filter(client => {
    // Filtrar por búsqueda
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          client.phone.includes(searchQuery) ||
                          client.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filtrar por categoría
    const matchesFilter = filter === 'all' ? true : 
                          filter === 'favorite' ? client.favorite : 
                          filter === 'recent' ? new Date(client.lastVisit) >= new Date(Date.now() - 30*24*60*60*1000) : true;
    
    return matchesSearch && matchesFilter;
  });

  const handleClientPress = (client) => {
    navigation.navigate('ClientDetail', { client });
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const renderClientItem = (client) => (
    <TouchableOpacity 
      key={client.id} 
      onPress={() => handleClientPress(client)}
    >
      <Card style={styles.clientCard}>
        <Card.Content>
          <View style={styles.clientHeader}>
            <View style={styles.clientInfo}>
              <Avatar.Text 
                size={50} 
                label={getInitials(client.name)} 
                backgroundColor="#8e44ad" 
              />
              <View style={styles.clientDetails}>
                <Title>{client.name}</Title>
                <Paragraph>{client.phone}</Paragraph>
              </View>
            </View>
            {client.favorite && (
              <Icon name="star" size={24} color="#f39c12" />
            )}
          </View>
          
          <Divider style={styles.divider} />
          
          <View style={styles.clientStats}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Última visita</Text>
              <Text style={styles.statValue}>
                {new Date(client.lastVisit).toLocaleDateString('es-ES')}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Visitas</Text>
              <Text style={styles.statValue}>{client.visitCount}</Text>
            </View>
          </View>
          
          <View style={styles.servicesContainer}>
            {client.services.map((service, index) => (
              <Chip key={index} style={styles.serviceChip} textStyle={styles.chipText}>
                {service}
              </Chip>
            ))}
          </View>
          
          <View style={styles.actionsContainer}>
            <Button 
              mode="text" 
              compact 
              icon="whatsapp" 
              style={styles.actionButton}
              onPress={() => console.log('WhatsApp pressed')}
            >
              WhatsApp
            </Button>
            <Button 
              mode="text" 
              compact 
              icon="phone" 
              style={styles.actionButton}
              onPress={() => console.log('Call pressed')}
            >
              Llamar
            </Button>
            <Button 
              mode="text" 
              compact 
              icon="calendar-plus" 
              style={styles.actionButton}
              onPress={() => navigation.navigate('Citas')}
            >
              Agendar
            </Button>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Buscar clientes..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />
      
      <View style={styles.filterContainer}>
        <Chip 
          selected={filter === 'all'} 
          onPress={() => setFilter('all')}
          style={styles.filterChip}
        >
          Todos
        </Chip>
        <Chip 
          selected={filter === 'favorite'} 
          onPress={() => setFilter('favorite')}
          style={styles.filterChip}
          icon="star"
        >
          Favoritos
        </Chip>
        <Chip 
          selected={filter === 'recent'} 
          onPress={() => setFilter('recent')}
          style={styles.filterChip}
          icon="clock"
        >
          Recientes
        </Chip>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {filteredClients.length === 0 ? (
          <Text style={styles.noClientsText}>No se encontraron clientes</Text>
        ) : (
          filteredClients.map(renderClientItem)
        )}
      </ScrollView>
      
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('ClientDetail', { client: null })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    margin: 16,
    elevation: 2,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  filterChip: {
    marginRight: 8,
  },
  scrollView: {
    flex: 1,
    padding: 16,
    paddingTop: 0,
  },
  noClientsText: {
    fontStyle: 'italic',
    color: '#666',
    textAlign: 'center',
    marginTop: 32,
  },
  clientCard: {
    marginBottom: 12,
  },
  clientHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clientDetails: {
    marginLeft: 16,
  },
  divider: {
    marginVertical: 12,
  },
  clientStats: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  statItem: {
    marginRight: 24,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  serviceChip: {
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#e8daef',
  },
  chipText: {
    color: '#8e44ad',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    marginLeft: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#8e44ad',
  },
});

export default ClientsScreen;
