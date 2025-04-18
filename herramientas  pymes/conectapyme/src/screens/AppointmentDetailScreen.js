import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button, Text, Divider, TextInput, Switch, Chip, FAB, Portal, Dialog, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Calendar } from 'react-native-calendars';

const AppointmentDetailScreen = ({ route, navigation }) => {
  const { appointment } = route.params || {};
  const isNewAppointment = !appointment;
  
  const [formData, setFormData] = useState({
    id: appointment?.id || Date.now(),
    clientName: appointment?.clientName || '',
    clientId: appointment?.clientId || null,
    service: appointment?.service || '',
    date: appointment?.date || new Date().toISOString().split('T')[0],
    time: appointment?.time || '10:00',
    duration: appointment?.duration || 60,
    status: appointment?.status || 'pending',
    notes: appointment?.notes || '',
    sendReminder: appointment?.sendReminder !== false,
  });
  
  const [showCalendar, setShowCalendar] = useState(false);
  const [showClientDialog, setShowClientDialog] = useState(false);
  const [showServiceDialog, setShowServiceDialog] = useState(false);
  
  // Datos de ejemplo para clientes
  const [clients, setClients] = useState([
    { id: 1, name: 'María Rodríguez', phone: '+503 7123 4567' },
    { id: 2, name: 'Juan Pérez', phone: '+503 7234 5678' },
    { id: 3, name: 'Ana López', phone: '+503 7345 6789' },
    { id: 4, name: 'Carlos Martínez', phone: '+503 7456 7890' },
    { id: 5, name: 'Laura Sánchez', phone: '+503 7567 8901' },
  ]);
  
  // Datos de ejemplo para servicios
  const [services, setServices] = useState([
    { id: 1, name: 'Corte de cabello', duration: 60, price: 15 },
    { id: 2, name: 'Tinte', duration: 120, price: 35 },
    { id: 3, name: 'Manicure', duration: 45, price: 12 },
    { id: 4, name: 'Pedicure', duration: 60, price: 15 },
    { id: 5, name: 'Tratamiento', duration: 90, price: 25 },
    { id: 6, name: 'Corte y barba', duration: 60, price: 20 },
    { id: 7, name: 'Peinado', duration: 45, price: 18 },
  ]);
  
  const [filteredClients, setFilteredClients] = useState(clients);
  const [clientSearch, setClientSearch] = useState('');
  
  useEffect(() => {
    setFilteredClients(
      clients.filter(client => 
        client.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
        client.phone.includes(clientSearch)
      )
    );
  }, [clientSearch]);
  
  const handleSave = () => {
    // Aquí se guardaría la cita en una base de datos real
    console.log('Guardando cita:', formData);
    navigation.goBack();
  };
  
  const handleDelete = () => {
    // Aquí se eliminaría la cita en una base de datos real
    console.log('Eliminando cita:', formData.id);
    navigation.goBack();
  };
  
  const handleDateSelect = (day) => {
    setFormData({...formData, date: day.dateString});
    setShowCalendar(false);
  };
  
  const handleClientSelect = (client) => {
    setFormData({...formData, clientName: client.name, clientId: client.id});
    setShowClientDialog(false);
  };
  
  const handleServiceSelect = (service) => {
    setFormData({...formData, service: service.name, duration: service.duration});
    setShowServiceDialog(false);
  };
  
  return (
    <View style={styles.container}>
      <ScrollView>
        <Card style={styles.card}>
          <Card.Content>
            <Title>{isNewAppointment ? 'Nueva Cita' : 'Detalles de Cita'}</Title>
            
            <Divider style={styles.divider} />
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Cliente</Text>
              <View style={styles.clientInputContainer}>
                <TextInput
                  mode="outlined"
                  value={formData.clientName}
                  onChangeText={(text) => setFormData({...formData, clientName: text})}
                  placeholder="Seleccionar cliente"
                  style={styles.clientInput}
                  disabled={true}
                />
                <IconButton
                  icon="account-search"
                  size={24}
                  onPress={() => setShowClientDialog(true)}
                  style={styles.clientSearchButton}
                />
              </View>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Servicio</Text>
              <View style={styles.clientInputContainer}>
                <TextInput
                  mode="outlined"
                  value={formData.service}
                  onChangeText={(text) => setFormData({...formData, service: text})}
                  placeholder="Seleccionar servicio"
                  style={styles.clientInput}
                  disabled={true}
                />
                <IconButton
                  icon="format-list-bulleted"
                  size={24}
                  onPress={() => setShowServiceDialog(true)}
                  style={styles.clientSearchButton}
                />
              </View>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Fecha</Text>
              <Button 
                mode="outlined" 
                onPress={() => setShowCalendar(true)}
                icon="calendar"
                style={styles.dateButton}
              >
                {new Date(formData.date).toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Button>
            </View>
            
            {showCalendar && (
              <Card style={styles.calendarCard}>
                <Card.Content>
                  <Calendar
                    onDayPress={handleDateSelect}
                    markedDates={{
                      [formData.date]: { selected: true, selectedColor: '#8e44ad' }
                    }}
                    theme={{
                      todayTextColor: '#8e44ad',
                      arrowColor: '#8e44ad',
                    }}
                  />
                </Card.Content>
              </Card>
            )}
            
            <View style={styles.formRow}>
              <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.label}>Hora</Text>
                <TextInput
                  mode="outlined"
                  value={formData.time}
                  onChangeText={(text) => setFormData({...formData, time: text})}
                  placeholder="10:00"
                  style={styles.input}
                />
              </View>
              
              <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>Duración (min)</Text>
                <TextInput
                  mode="outlined"
                  value={formData.duration.toString()}
                  onChangeText={(text) => setFormData({...formData, duration: parseInt(text) || 0})}
                  keyboardType="numeric"
                  style={styles.input}
                />
              </View>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Notas</Text>
              <TextInput
                mode="outlined"
                value={formData.notes}
                onChangeText={(text) => setFormData({...formData, notes: text})}
                placeholder="Agregar notas sobre la cita"
                multiline
                numberOfLines={3}
                style={styles.input}
              />
            </View>
            
            <View style={styles.formGroup}>
              <View style={styles.switchContainer}>
                <Text style={styles.label}>Enviar recordatorio por WhatsApp</Text>
                <Switch
                  value={formData.sendReminder}
                  onValueChange={(value) => setFormData({...formData, sendReminder: value})}
                  color="#8e44ad"
                />
              </View>
            </View>
            
            <View style={styles.buttonContainer}>
              <Button 
                mode="contained" 
                onPress={handleSave}
                style={styles.saveButton}
              >
                {isNewAppointment ? 'Crear Cita' : 'Guardar Cambios'}
              </Button>
              
              {!isNewAppointment && (
                <Button 
                  mode="outlined" 
                  onPress={handleDelete}
                  style={styles.deleteButton}
                  textColor="#e74c3c"
                >
                  Eliminar Cita
                </Button>
              )}
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
      
      <Portal>
        <Dialog visible={showClientDialog} onDismiss={() => setShowClientDialog(false)}>
          <Dialog.Title>Seleccionar Cliente</Dialog.Title>
          <Dialog.Content>
            <TextInput
              mode="outlined"
              value={clientSearch}
              onChangeText={setClientSearch}
              placeholder="Buscar cliente"
              style={styles.dialogSearchInput}
            />
            <ScrollView style={styles.dialogScrollView}>
              {filteredClients.map(client => (
                <TouchableOpacity 
                  key={client.id} 
                  style={styles.dialogItem}
                  onPress={() => handleClientSelect(client)}
                >
                  <Text style={styles.dialogItemTitle}>{client.name}</Text>
                  <Text style={styles.dialogItemSubtitle}>{client.phone}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowClientDialog(false)}>Cancelar</Button>
          </Dialog.Actions>
        </Dialog>
        
        <Dialog visible={showServiceDialog} onDismiss={() => setShowServiceDialog(false)}>
          <Dialog.Title>Seleccionar Servicio</Dialog.Title>
          <Dialog.Content>
            <ScrollView style={styles.dialogScrollView}>
              {services.map(service => (
                <TouchableOpacity 
                  key={service.id} 
                  style={styles.dialogItem}
                  onPress={() => handleServiceSelect(service)}
                >
                  <Text style={styles.dialogItemTitle}>{service.name}</Text>
                  <Text style={styles.dialogItemSubtitle}>
                    {service.duration} min - ${service.price}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowServiceDialog(false)}>Cancelar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      
      <FAB
        style={styles.fab}
        icon="check"
        onPress={handleSave}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 16,
  },
  divider: {
    marginVertical: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
  },
  clientInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clientInput: {
    flex: 1,
    backgroundColor: 'white',
  },
  clientSearchButton: {
    marginLeft: 8,
  },
  dateButton: {
    justifyContent: 'flex-start',
    height: 56,
    paddingVertical: 8,
  },
  calendarCard: {
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 24,
  },
  saveButton: {
    marginBottom: 12,
    backgroundColor: '#8e44ad',
  },
  deleteButton: {
    borderColor: '#e74c3c',
  },
  dialogSearchInput: {
    marginBottom: 16,
  },
  dialogScrollView: {
    maxHeight: 300,
  },
  dialogItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dialogItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dialogItemSubtitle: {
    color: '#666',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#8e44ad',
  },
});

export default AppointmentDetailScreen;
