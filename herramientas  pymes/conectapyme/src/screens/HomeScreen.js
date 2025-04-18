import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button, Text, Divider, Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = ({ navigation }) => {
  const [stats, setStats] = useState({
    pendingAppointments: 5,
    todayAppointments: 3,
    unreadMessages: 8,
    activeClients: 42
  });

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.welcomeCard}>
        <Card.Content>
          <Title style={styles.welcomeTitle}>¡Bienvenido a ConectaPYME!</Title>
          <Paragraph>Tu asistente para gestionar tu salón de belleza o tienda</Paragraph>
        </Card.Content>
      </Card>

      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <Icon name="calendar-clock" size={30} color="#8e44ad" />
            <Title>{stats.pendingAppointments}</Title>
            <Paragraph>Citas pendientes</Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <Icon name="calendar-today" size={30} color="#8e44ad" />
            <Title>{stats.todayAppointments}</Title>
            <Paragraph>Citas hoy</Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <Icon name="message-badge" size={30} color="#8e44ad" />
            <Title>{stats.unreadMessages}</Title>
            <Paragraph>Mensajes</Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <Icon name="account-group" size={30} color="#8e44ad" />
            <Title>{stats.activeClients}</Title>
            <Paragraph>Clientes</Paragraph>
          </Card.Content>
        </Card>
      </View>

      <Card style={styles.actionCard}>
        <Card.Content>
          <Title>Acciones rápidas</Title>
        </Card.Content>
        <Card.Actions style={styles.actionButtons}>
          <Button 
            mode="contained" 
            icon="calendar-plus" 
            onPress={() => navigation.navigate('Citas')}
            style={styles.actionButton}
          >
            Nueva cita
          </Button>
          <Button 
            mode="contained" 
            icon="account-plus" 
            onPress={() => navigation.navigate('Clientes')}
            style={styles.actionButton}
          >
            Nuevo cliente
          </Button>
        </Card.Actions>
        <Card.Actions style={styles.actionButtons}>
          <Button 
            mode="contained" 
            icon="message-text" 
            onPress={() => navigation.navigate('Mensajes')}
            style={styles.actionButton}
          >
            Enviar mensaje
          </Button>
          <Button 
            mode="contained" 
            icon="bullhorn" 
            onPress={() => navigation.navigate('Marketing')}
            style={styles.actionButton}
          >
            Nueva campaña
          </Button>
        </Card.Actions>
      </Card>

      <Card style={styles.upcomingCard}>
        <Card.Content>
          <Title>Próximas citas</Title>
          <Divider style={styles.divider} />
          
          {[
            { id: 1, name: 'María Rodríguez', service: 'Corte de cabello', time: '10:00 AM', date: 'Hoy' },
            { id: 2, name: 'Juan Pérez', service: 'Manicure', time: '11:30 AM', date: 'Hoy' },
            { id: 3, name: 'Ana López', service: 'Tinte', time: '2:00 PM', date: 'Hoy' }
          ].map(appointment => (
            <View key={appointment.id} style={styles.appointmentItem}>
              <View style={styles.appointmentInfo}>
                <Text style={styles.appointmentName}>{appointment.name}</Text>
                <Text style={styles.appointmentService}>{appointment.service}</Text>
              </View>
              <View style={styles.appointmentTime}>
                <Text style={styles.appointmentTimeText}>{appointment.time}</Text>
                <Text style={styles.appointmentDateText}>{appointment.date}</Text>
              </View>
            </View>
          ))}
          
          <Button 
            mode="text" 
            onPress={() => navigation.navigate('Citas')}
            style={styles.viewAllButton}
          >
            Ver todas las citas
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.upcomingCard}>
        <Card.Content>
          <Title>Campañas activas</Title>
          <Divider style={styles.divider} />
          
          {[
            { id: 1, title: 'Promoción de verano', type: 'WhatsApp', status: 'Activa', reach: '45 clientes' },
            { id: 2, title: 'Descuento en productos', type: 'WhatsApp', status: 'Programada', reach: '32 clientes' }
          ].map(campaign => (
            <View key={campaign.id} style={styles.campaignItem}>
              <View style={styles.campaignInfo}>
                <Text style={styles.campaignTitle}>{campaign.title}</Text>
                <Text style={styles.campaignType}>
                  <Icon name="whatsapp" size={16} color="#25D366" /> {campaign.type}
                </Text>
              </View>
              <View style={styles.campaignStatus}>
                <Text style={styles.campaignStatusText}>{campaign.status}</Text>
                <Text style={styles.campaignReachText}>{campaign.reach}</Text>
              </View>
            </View>
          ))}
          
          <Button 
            mode="text" 
            onPress={() => navigation.navigate('Marketing')}
            style={styles.viewAllButton}
          >
            Ver todas las campañas
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  welcomeCard: {
    marginBottom: 16,
    backgroundColor: '#8e44ad',
  },
  welcomeTitle: {
    color: 'white',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    width: '48%',
    marginBottom: 10,
  },
  statContent: {
    alignItems: 'center',
    padding: 10,
  },
  actionCard: {
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  actionButton: {
    width: '48%',
    marginBottom: 8,
    backgroundColor: '#8e44ad',
  },
  upcomingCard: {
    marginBottom: 16,
  },
  divider: {
    marginVertical: 10,
  },
  appointmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  appointmentInfo: {
    flex: 3,
  },
  appointmentName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  appointmentService: {
    color: '#666',
  },
  appointmentTime: {
    flex: 1,
    alignItems: 'flex-end',
  },
  appointmentTimeText: {
    fontWeight: 'bold',
  },
  appointmentDateText: {
    color: '#666',
  },
  viewAllButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
  campaignItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  campaignInfo: {
    flex: 3,
  },
  campaignTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  campaignType: {
    color: '#666',
  },
  campaignStatus: {
    flex: 1,
    alignItems: 'flex-end',
  },
  campaignStatusText: {
    fontWeight: 'bold',
    color: '#27ae60',
  },
  campaignReachText: {
    color: '#666',
  },
});

export default HomeScreen;
