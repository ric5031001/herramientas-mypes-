import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Button, Text, Divider, TextInput, Switch, Chip, FAB, Portal, Dialog, IconButton, Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ClientDetailScreen = ({ route, navigation }) => {
  const { client } = route.params || {};
  const isNewClient = !client;
  
  const [formData, setFormData] = useState({
    id: client?.id || Date.now(),
    name: client?.name || '',
    phone: client?.phone || '+503 ',
    email: client?.email || '',
    lastVisit: client?.lastVisit || '',
    visitCount: client?.visitCount || 0,
    favorite: client?.favorite || false,
    notes: client?.notes || '',
    services: client?.services || [],
  });
  
  const [showServiceDialog, setShowServiceDialog] = useState(false);
  
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
  
  // Historial de citas de ejemplo
  const [appointments, setAppointments] = useState([
    { 
      id: 1, 
      service: 'Corte de cabello', 
      date: '2025-04-10', 
      time: '10:00', 
      status: 'completed',
      price: 15
    },
    { 
      id: 2, 
      service: 'Tinte', 
      date: '2025-03-15', 
      time: '14:30', 
      status: 'completed',
      price: 35
    },
    { 
      id: 3, 
      service: 'Tratamiento', 
      date: '2025-02-20', 
      time: '11:00', 
      status: 'completed',
      price: 25
    },
  ]);
  
  const handleSave = () => {
    // Aquí se guardaría el cliente en una base de datos real
    console.log('Guardando cliente:', formData);
    navigation.goBack();
  };
  
  const handleDelete = () => {
    // Aquí se eliminaría el cliente en una base de datos real
    console.log('Eliminando cliente:', formData.id);
    navigation.goBack();
  };
  
  const handleAddService = (service) => {
    if (!formData.services.includes(service.name)) {
      setFormData({
        ...formData, 
        services: [...formData.services, service.name]
      });
    }
    setShowServiceDialog(false);
  };
  
  const handleRemoveService = (serviceName) => {
    setFormData({
      ...formData,
      services: formData.services.filter(s => s !== serviceName)
    });
  };
  
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  return (
    <View style={styles.container}>
      <ScrollView>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.headerContainer}>
              <Avatar.Text 
                size={60} 
                label={getInitials(formData.name || 'Nuevo Cliente')} 
                backgroundColor="#8e44ad" 
              />
              <View style={styles.headerInfo}>
                <Title>{isNewClient ? 'Nuevo Cliente' : 'Detalles del Cliente'}</Title>
                {!isNewClient && (
                  <View style={styles.favoriteContainer}>
                    <Text>Favorito</Text>
                    <Switch
                      value={formData.favorite}
                      onValueChange={(value) => setFormData({...formData, favorite: value})}
                      color="#f39c12"
                    />
                  </View>
                )}
              </View>
            </View>
            
            <Divider style={styles.divider} />
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Nombre completo</Text>
              <TextInput
                mode="outlined"
                value={formData.name}
                onChangeText={(text) => setFormData({...formData, name: text})}
                placeholder="Nombre del cliente"
                style={styles.input}
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Teléfono</Text>
              <TextInput
                mode="outlined"
                value={formData.phone}
                onChangeText={(text) => setFormData({...formData, phone: text})}
                placeholder="+503 7123 4567"
                keyboardType="phone-pad"
                style={styles.input}
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Correo electrónico</Text>
              <TextInput
                mode="outlined"
                value={formData.email}
                onChangeText={(text) => setFormData({...formData, email: text})}
                placeholder="correo@ejemplo.com"
                keyboardType="email-address"
                style={styles.input}
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Servicios frecuentes</Text>
              <View style={styles.servicesContainer}>
                {formData.services.map((service, index) => (
                  <Chip 
                    key={index} 
                    style={styles.serviceChip}
                    onClose={() => handleRemoveService(service)}
                  >
                    {service}
                  </Chip>
                ))}
                <Button 
                  mode="outlined" 
                  icon="plus" 
                  onPress={() => setShowServiceDialog(true)}
                  style={styles.addServiceButton}
                >
                  Agregar servicio
                </Button>
              </View>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Notas</Text>
              <TextInput
                mode="outlined"
                value={formData.notes}
                onChangeText={(text) => setFormData({...formData, notes: text})}
                placeholder="Agregar notas sobre el cliente"
                multiline
                numberOfLines={3}
                style={styles.input}
              />
            </View>
            
            {!isNewClient && (
              <>
                <Divider style={styles.divider} />
                
                <View style={styles.statsContainer}>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Última visita</Text>
                    <Text style={styles.statValue}>
                      {formData.lastVisit ? new Date(formData.lastVisit).toLocaleDateString('es-ES') : 'N/A'}
                    </Text>
                  </View>
                  
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Total de visitas</Text>
                    <Text style={styles.statValue}>{formData.visitCount}</Text>
                  </View>
                  
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Gasto promedio</Text>
                    <Text style={styles.statValue}>
                      ${appointments.reduce((sum, apt) => sum + apt.price, 0) / (appointments.length || 1)}
                    </Text>
                  </View>
                </View>
                
                <Divider style={styles.divider} />
                
                <View style={styles.historyContainer}>
                  <Title style={styles.historyTitle}>Historial de visitas</Title>
                  
                  {appointments.map(appointment => (
                    <Card key={appointment.id} style={styles.appointmentCard}>
                      <Card.Content>
                        <View style={styles.appointmentHeader}>
                          <View>
                            <Text style={styles.appointmentService}>{appointment.service}</Text>
                            <Text style={styles.appointmentDate}>
                              {new Date(appointment.date).toLocaleDateString('es-ES')} - {appointment.time}
                            </Text>
                          </View>
                          <Text style={styles.appointmentPrice}>${appointment.price}</Text>
                        </View>
                      </Card.Content>
                    </Card>
                  ))}
                  
                  <Button 
                    mode="text" 
                    onPress={() => navigation.navigate('Citas')}
                    style={styles.viewAllButton}
                  >
                    Ver todo el historial
                  </Button>
                </View>
              </>
            )}
            
            <View style={styles.buttonContainer}>
              <Button 
                mode="contained" 
                onPress={handleSave}
                style={styles.saveButton}
              >
                {isNewClient ? 'Crear Cliente' : 'Guardar Cambios'}
              </Button>
              
              {!isNewClient && (
                <Button 
                  mode="outlined" 
                  onPress={handleDelete}
                  style={styles.deleteButton}
                  textColor="#e74c3c"
                >
                  Eliminar Cliente
                </Button>
              )}
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
      
      <Portal>
        <Dialog visible={showServiceDialog} onDismiss={() => setShowServiceDialog(false)}>
          <Dialog.Title>Seleccionar Servicio</Dialog.Title>
          <Dialog.Content>
            <ScrollView style={styles.dialogScrollView}>
              {services.map(service => (
                <TouchableOpacity 
                  key={service.id} 
                  style={styles.dialogItem}
                  onPress={() => handleAddService(service)}
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerInfo: {
    marginLeft: 16,
    flex: 1,
  },
  favoriteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  divider: {
    marginVertical: 16,
  },
  formGroup: {
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
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  serviceChip: {
    margin: 4,
    backgroundColor: '#e8daef',
  },
  addServiceButton: {
    margin: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  historyContainer: {
    marginBottom: 16,
  },
  historyTitle: {
    marginBottom: 12,
  },
  appointmentCard: {
    marginBottom: 8,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appointmentService: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  appointmentDate: {
    color: '#666',
  },
  appointmentPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewAllButton: {
    alignSelf: 'center',
    marginTop: 8,
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

export default ClientDetailScreen;
