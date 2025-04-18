import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Button, Text, Divider, FAB, Searchbar, Chip } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AppointmentsScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [view, setView] = useState('calendar'); // 'calendar' or 'list'
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'completed'
  
  // Datos de ejemplo para citas
  const [appointments, setAppointments] = useState([
    { 
      id: 1, 
      clientName: 'María Rodríguez', 
      service: 'Corte de cabello', 
      date: '2025-04-17', 
      time: '10:00', 
      duration: 60,
      status: 'pending',
      notes: 'Cliente regular, prefiere corte en capas'
    },
    { 
      id: 2, 
      clientName: 'Juan Pérez', 
      service: 'Manicure', 
      date: '2025-04-17', 
      time: '11:30', 
      duration: 45,
      status: 'pending',
      notes: 'Primera vez'
    },
    { 
      id: 3, 
      clientName: 'Ana López', 
      service: 'Tinte', 
      date: '2025-04-17', 
      time: '14:00', 
      duration: 120,
      status: 'pending',
      notes: 'Color #5233'
    },
    { 
      id: 4, 
      clientName: 'Carlos Martínez', 
      service: 'Corte y barba', 
      date: '2025-04-18', 
      time: '09:00', 
      duration: 60,
      status: 'pending',
      notes: ''
    },
    { 
      id: 5, 
      clientName: 'Laura Sánchez', 
      service: 'Pedicure', 
      date: '2025-04-18', 
      time: '16:00', 
      duration: 60,
      status: 'pending',
      notes: 'Alergia a ciertos productos'
    }
  ]);

  // Filtrar citas por fecha seleccionada
  const filteredAppointments = appointments.filter(appointment => {
    // Filtrar por búsqueda
    const matchesSearch = appointment.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          appointment.service.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filtrar por fecha
    const matchesDate = selectedDate ? appointment.date === selectedDate : true;
    
    // Filtrar por estado
    const matchesStatus = filter === 'all' ? true : 
                          filter === 'pending' ? appointment.status === 'pending' : 
                          appointment.status === 'completed';
    
    return matchesSearch && matchesDate && matchesStatus;
  });

  // Preparar datos para el calendario
  const markedDates = {};
  appointments.forEach(appointment => {
    if (!markedDates[appointment.date]) {
      markedDates[appointment.date] = { marked: true, dotColor: '#8e44ad' };
    }
    
    if (selectedDate === appointment.date) {
      markedDates[appointment.date] = { 
        ...markedDates[appointment.date],
        selected: true, 
        selectedColor: '#8e44ad' 
      };
    }
  });

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleAppointmentPress = (appointment) => {
    navigation.navigate('AppointmentDetail', { appointment });
  };

  const renderAppointmentItem = (appointment) => (
    <TouchableOpacity 
      key={appointment.id} 
      onPress={() => handleAppointmentPress(appointment)}
    >
      <Card style={styles.appointmentCard}>
        <Card.Content>
          <View style={styles.appointmentHeader}>
            <View>
              <Title>{appointment.clientName}</Title>
              <Paragraph>{appointment.service}</Paragraph>
            </View>
            <View style={styles.appointmentTime}>
              <Text style={styles.timeText}>{appointment.time}</Text>
              <Text>{`${appointment.duration} min`}</Text>
            </View>
          </View>
          
          {appointment.notes ? (
            <View style={styles.notesContainer}>
              <Icon name="note-text-outline" size={16} color="#666" />
              <Text style={styles.notesText}>{appointment.notes}</Text>
            </View>
          ) : null}
          
          <View style={styles.actionsContainer}>
            <Button 
              mode="text" 
              compact 
              icon="whatsapp" 
              style={styles.actionButton}
              onPress={() => console.log('WhatsApp pressed')}
            >
              Recordar
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
              icon={appointment.status === 'completed' ? 'check-circle' : 'check-circle-outline'} 
              style={styles.actionButton}
              onPress={() => console.log('Complete pressed')}
            >
              {appointment.status === 'completed' ? 'Completada' : 'Completar'}
            </Button>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Buscar citas..."
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
          selected={filter === 'pending'} 
          onPress={() => setFilter('pending')}
          style={styles.filterChip}
        >
          Pendientes
        </Chip>
        <Chip 
          selected={filter === 'completed'} 
          onPress={() => setFilter('completed')}
          style={styles.filterChip}
        >
          Completadas
        </Chip>
        <Chip 
          selected={view === 'calendar'} 
          onPress={() => setView('calendar')}
          style={styles.filterChip}
          icon="calendar"
        >
          Calendario
        </Chip>
        <Chip 
          selected={view === 'list'} 
          onPress={() => setView('list')}
          style={styles.filterChip}
          icon="format-list-bulleted"
        >
          Lista
        </Chip>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {view === 'calendar' && (
          <Card style={styles.calendarCard}>
            <Card.Content>
              <Calendar
                onDayPress={handleDateSelect}
                markedDates={markedDates}
                theme={{
                  todayTextColor: '#8e44ad',
                  arrowColor: '#8e44ad',
                }}
              />
            </Card.Content>
          </Card>
        )}
        
        {selectedDate && (
          <View style={styles.selectedDateContainer}>
            <Text style={styles.selectedDateText}>
              Citas para el {new Date(selectedDate).toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Text>
            {selectedDate && filteredAppointments.length === 0 && (
              <Text style={styles.noAppointmentsText}>No hay citas para esta fecha</Text>
            )}
          </View>
        )}
        
        {filteredAppointments.map(renderAppointmentItem)}
      </ScrollView>
      
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('AppointmentDetail', { appointment: null })}
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
  calendarCard: {
    marginBottom: 16,
  },
  selectedDateContainer: {
    marginBottom: 16,
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  noAppointmentsText: {
    fontStyle: 'italic',
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
  },
  appointmentCard: {
    marginBottom: 12,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  appointmentTime: {
    alignItems: 'flex-end',
  },
  timeText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  notesText: {
    marginLeft: 8,
    color: '#666',
    flex: 1,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
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

export default AppointmentsScreen;
