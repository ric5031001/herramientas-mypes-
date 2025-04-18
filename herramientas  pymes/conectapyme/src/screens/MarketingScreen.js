import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Card, Title, Paragraph, Button, Text, Divider, FAB, Searchbar, Chip, TextInput, ToggleButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MarketingScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'draft', 'completed'
  
  // Datos de ejemplo para campañas
  const [campaigns, setCampaigns] = useState([
    { 
      id: 1, 
      title: 'Promoción de verano', 
      type: 'whatsapp',
      status: 'active',
      audience: 'all',
      audienceCount: 45,
      message: '¡Hola! 👋 Te invitamos a aprovechar nuestra promoción de verano: 20% de descuento en todos los servicios. ¡Agenda tu cita ahora! 📅',
      scheduledDate: '2025-04-15',
      sentCount: 38,
      responseCount: 12,
      image: null
    },
    { 
      id: 2, 
      title: 'Descuento en productos', 
      type: 'whatsapp',
      status: 'scheduled',
      audience: 'recent',
      audienceCount: 32,
      message: '¡Hola! 👋 Tenemos nuevos productos disponibles con 15% de descuento para clientes frecuentes. ¡Visítanos pronto! 🛍️',
      scheduledDate: '2025-04-20',
      sentCount: 0,
      responseCount: 0,
      image: null
    },
    { 
      id: 3, 
      title: 'Nuevos servicios', 
      type: 'whatsapp',
      status: 'draft',
      audience: 'custom',
      audienceCount: 25,
      message: '¡Hola! 👋 Estamos emocionados de anunciar nuestros nuevos servicios. ¡Agenda una cita y pruébalos con 10% de descuento! ✨',
      scheduledDate: null,
      sentCount: 0,
      responseCount: 0,
      image: null
    },
    { 
      id: 4, 
      title: 'Agradecimiento clientes', 
      type: 'whatsapp',
      status: 'completed',
      audience: 'favorite',
      audienceCount: 15,
      message: '¡Hola! 👋 Queremos agradecerte por tu preferencia. Como cliente especial, te ofrecemos un 25% de descuento en tu próxima visita. ¡Te esperamos! 💖',
      scheduledDate: '2025-04-01',
      sentCount: 15,
      responseCount: 8,
      image: null
    }
  ]);

  // Filtrar campañas
  const filteredCampaigns = campaigns.filter(campaign => {
    // Filtrar por búsqueda
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          campaign.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filtrar por estado
    const matchesFilter = filter === 'all' ? true : 
                          filter === campaign.status;
    
    return matchesSearch && matchesFilter;
  });

  const handleCampaignPress = (campaign) => {
    navigation.navigate('CampaignDetail', { campaign });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return '#27ae60';
      case 'scheduled': return '#f39c12';
      case 'draft': return '#7f8c8d';
      case 'completed': return '#3498db';
      default: return '#7f8c8d';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'active': return 'Activa';
      case 'scheduled': return 'Programada';
      case 'draft': return 'Borrador';
      case 'completed': return 'Completada';
      default: return status;
    }
  };

  const getAudienceText = (audience, count) => {
    switch(audience) {
      case 'all': return `Todos los clientes (${count})`;
      case 'recent': return `Clientes recientes (${count})`;
      case 'favorite': return `Clientes favoritos (${count})`;
      case 'custom': return `Selección personalizada (${count})`;
      default: return `${count} clientes`;
    }
  };

  const renderCampaignItem = (campaign) => (
    <TouchableOpacity 
      key={campaign.id} 
      onPress={() => handleCampaignPress(campaign)}
    >
      <Card style={styles.campaignCard}>
        <Card.Content>
          <View style={styles.campaignHeader}>
            <View style={styles.campaignTitleContainer}>
              <Title>{campaign.title}</Title>
              <View style={styles.campaignTypeContainer}>
                <Icon 
                  name={campaign.type === 'whatsapp' ? 'whatsapp' : 'email'} 
                  size={16} 
                  color={campaign.type === 'whatsapp' ? '#25D366' : '#4285F4'} 
                />
                <Text style={styles.campaignTypeText}>
                  {campaign.type === 'whatsapp' ? 'WhatsApp' : 'Email'}
                </Text>
              </View>
            </View>
            <Chip 
              style={[styles.statusChip, { backgroundColor: getStatusColor(campaign.status) + '20' }]}
              textStyle={{ color: getStatusColor(campaign.status) }}
            >
              {getStatusText(campaign.status)}
            </Chip>
          </View>
          
          <Divider style={styles.divider} />
          
          <View style={styles.campaignDetails}>
            <View style={styles.detailItem}>
              <Icon name="account-group" size={16} color="#666" />
              <Text style={styles.detailText}>
                {getAudienceText(campaign.audience, campaign.audienceCount)}
              </Text>
            </View>
            
            {campaign.scheduledDate && (
              <View style={styles.detailItem}>
                <Icon name="calendar" size={16} color="#666" />
                <Text style={styles.detailText}>
                  {new Date(campaign.scheduledDate).toLocaleDateString('es-ES')}
                </Text>
              </View>
            )}
            
            {campaign.status === 'active' || campaign.status === 'completed' ? (
              <View style={styles.detailItem}>
                <Icon name="message-reply" size={16} color="#666" />
                <Text style={styles.detailText}>
                  {campaign.responseCount} respuestas de {campaign.sentCount} enviados
                </Text>
              </View>
            ) : null}
          </View>
          
          <View style={styles.messagePreview}>
            <Text numberOfLines={2} style={styles.messageText}>
              {campaign.message}
            </Text>
          </View>
          
          <View style={styles.actionsContainer}>
            {campaign.status === 'draft' && (
              <>
                <Button 
                  mode="text" 
                  compact 
                  icon="pencil" 
                  style={styles.actionButton}
                  onPress={() => handleCampaignPress(campaign)}
                >
                  Editar
                </Button>
                <Button 
                  mode="text" 
                  compact 
                  icon="send" 
                  style={styles.actionButton}
                  onPress={() => console.log('Send now pressed')}
                >
                  Enviar
                </Button>
              </>
            )}
            
            {campaign.status === 'scheduled' && (
              <>
                <Button 
                  mode="text" 
                  compact 
                  icon="pencil" 
                  style={styles.actionButton}
                  onPress={() => handleCampaignPress(campaign)}
                >
                  Editar
                </Button>
                <Button 
                  mode="text" 
                  compact 
                  icon="send" 
                  style={styles.actionButton}
                  onPress={() => console.log('Send now pressed')}
                >
                  Enviar ahora
                </Button>
              </>
            )}
            
            {campaign.status === 'active' && (
              <Button 
                mode="text" 
                compact 
                icon="chart-bar" 
                style={styles.actionButton}
                onPress={() => handleCampaignPress(campaign)}
              >
                Ver resultados
              </Button>
            )}
            
            {campaign.status === 'completed' && (
              <>
                <Button 
                  mode="text" 
                  compact 
                  icon="chart-bar" 
                  style={styles.actionButton}
                  onPress={() => handleCampaignPress(campaign)}
                >
                  Ver resultados
                </Button>
                <Button 
                  mode="text" 
                  compact 
                  icon="content-copy" 
                  style={styles.actionButton}
                  onPress={() => console.log('Duplicate pressed')}
                >
                  Duplicar
                </Button>
              </>
            )}
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Buscar campañas..."
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
          Todas
        </Chip>
        <Chip 
          selected={filter === 'active'} 
          onPress={() => setFilter('active')}
          style={styles.filterChip}
        >
          Activas
        </Chip>
        <Chip 
          selected={filter === 'scheduled'} 
          onPress={() => setFilter('scheduled')}
          style={styles.filterChip}
        >
          Programadas
        </Chip>
        <Chip 
          selected={filter === 'draft'} 
          onPress={() => setFilter('draft')}
          style={styles.filterChip}
        >
          Borradores
        </Chip>
        <Chip 
          selected={filter === 'completed'} 
          onPress={() => setFilter('completed')}
          style={styles.filterChip}
        >
          Completadas
        </Chip>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {filteredCampaigns.length === 0 ? (
          <Text style={styles.noCampaignsText}>No se encontraron campañas</Text>
        ) : (
          filteredCampaigns.map(renderCampaignItem)
        )}
      </ScrollView>
      
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('CampaignDetail', { campaign: null })}
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
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  filterChip: {
    marginRight: 8,
    marginBottom: 8,
  },
  scrollView: {
    flex: 1,
    padding: 16,
    paddingTop: 0,
  },
  noCampaignsText: {
    fontStyle: 'italic',
    color: '#666',
    textAlign: 'center',
    marginTop: 32,
  },
  campaignCard: {
    marginBottom: 12,
  },
  campaignHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  campaignTitleContainer: {
    flex: 1,
  },
  campaignTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  campaignTypeText: {
    marginLeft: 4,
    color: '#666',
  },
  statusChip: {
    marginLeft: 8,
  },
  divider: {
    marginVertical: 12,
  },
  campaignDetails: {
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    marginLeft: 8,
    color: '#666',
  },
  messagePreview: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  messageText: {
    color: '#333',
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

export default MarketingScreen;
