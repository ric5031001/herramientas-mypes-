import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Card, Title, Paragraph, Button, Text, Divider, TextInput, Switch, Chip, FAB, Portal, Dialog, IconButton, ToggleButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CampaignDetailScreen = ({ route, navigation }) => {
  const { campaign } = route.params || {};
  const isNewCampaign = !campaign;
  
  const [formData, setFormData] = useState({
    id: campaign?.id || Date.now(),
    title: campaign?.title || '',
    type: campaign?.type || 'whatsapp',
    status: campaign?.status || 'draft',
    audience: campaign?.audience || 'all',
    audienceCount: campaign?.audienceCount || 0,
    message: campaign?.message || '',
    scheduledDate: campaign?.scheduledDate || '',
    scheduledTime: campaign?.scheduledTime || '10:00',
    sentCount: campaign?.sentCount || 0,
    responseCount: campaign?.responseCount || 0,
    image: campaign?.image || null,
  });
  
  const [showAudienceDialog, setShowAudienceDialog] = useState(false);
  const [showCalendarDialog, setShowCalendarDialog] = useState(false);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  
  // Datos de ejemplo para audiencias
  const audiences = [
    { id: 'all', name: 'Todos los clientes', count: 45, description: 'Todos los clientes registrados' },
    { id: 'recent', name: 'Clientes recientes', count: 32, description: 'Clientes que visitaron en los últimos 30 días' },
    { id: 'favorite', name: 'Clientes favoritos', count: 15, description: 'Clientes marcados como favoritos' },
    { id: 'inactive', name: 'Clientes inactivos', count: 28, description: 'Clientes sin visitas en los últimos 3 meses' },
    { id: 'custom', name: 'Selección personalizada', count: 0, description: 'Seleccionar clientes manualmente' },
  ];
  
  // Datos de ejemplo para plantillas
  const templates = [
    { 
      id: 1, 
      title: 'Promoción general', 
      message: '¡Hola! 👋 Te invitamos a aprovechar nuestra promoción especial: 20% de descuento en todos los servicios. ¡Agenda tu cita ahora! 📅',
    },
    { 
      id: 2, 
      title: 'Descuento en productos', 
      message: '¡Hola! 👋 Tenemos nuevos productos disponibles con 15% de descuento para clientes frecuentes. ¡Visítanos pronto! 🛍️',
    },
    { 
      id: 3, 
      title: 'Nuevos servicios', 
      message: '¡Hola! 👋 Estamos emocionados de anunciar nuestros nuevos servicios. ¡Agenda una cita y pruébalos con 10% de descuento! ✨',
    },
    { 
      id: 4, 
      title: 'Agradecimiento', 
      message: '¡Hola! 👋 Queremos agradecerte por tu preferencia. Como cliente especial, te ofrecemos un 25% de descuento en tu próxima visita. ¡Te esperamos! 💖',
    },
  ];
  
  useEffect(() => {
    // Actualizar el conteo de audiencia cuando cambia la selección
    const selectedAudience = audiences.find(a => a.id === formData.audience);
    if (selectedAudience && formData.audience !== 'custom') {
      setFormData({...formData, audienceCount: selectedAudience.count});
    }
  }, [formData.audience]);
  
  const handleSave = () => {
    // Aquí se guardaría la campaña en una base de datos real
    console.log('Guardando campaña:', formData);
    navigation.goBack();
  };
  
  const handleDelete = () => {
    // Aquí se eliminaría la campaña en una base de datos real
    console.log('Eliminando campaña:', formData.id);
    navigation.goBack();
  };
  
  const handleSendNow = () => {
    // Aquí se enviaría la campaña inmediatamente
    console.log('Enviando campaña ahora:', formData);
    setFormData({...formData, status: 'active'});
    navigation.goBack();
  };
  
  const handleSchedule = () => {
    // Aquí se programaría la campaña para envío futuro
    console.log('Programando campaña:', formData);
    setFormData({...formData, status: 'scheduled'});
    navigation.goBack();
  };
  
  const handleAudienceSelect = (audience) => {
    setFormData({...formData, audience: audience.id, audienceCount: audience.count});
    setShowAudienceDialog(false);
  };
  
  const handleTemplateSelect = (template) => {
    setFormData({...formData, message: template.message});
    setShowTemplateDialog(false);
  };
  
  const getAudienceText = (audienceId) => {
    const audience = audiences.find(a => a.id === audienceId);
    return audience ? audience.name : 'Seleccionar audiencia';
  };
  
  return (
    <View style={styles.container}>
      <ScrollView>
        <Card style={styles.card}>
          <Card.Content>
            <Title>{isNewCampaign ? 'Nueva Campaña' : 'Detalles de Campaña'}</Title>
            
            <Divider style={styles.divider} />
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Título de la campaña</Text>
              <TextInput
                mode="outlined"
                value={formData.title}
                onChangeText={(text) => setFormData({...formData, title: text})}
                placeholder="Ej: Promoción de verano"
                style={styles.input}
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Tipo de mensaje</Text>
              <ToggleButton.Row onValueChange={value => setFormData({...formData, type: value})} value={formData.type}>
                <ToggleButton 
                  icon="whatsapp" 
                  value="whatsapp" 
                  style={[
                    styles.toggleButton, 
                    formData.type === 'whatsapp' && styles.toggleButtonSelected
                  ]}
                  color={formData.type === 'whatsapp' ? 'white' : '#25D366'}
                />
                <ToggleButton 
                  icon="email" 
                  value="email" 
                  style={[
                    styles.toggleButton, 
                    formData.type === 'email' && styles.toggleButtonSelected
                  ]}
                  color={formData.type === 'email' ? 'white' : '#4285F4'}
                  disabled={true}
                />
                <ToggleButton 
                  icon="message" 
                  value="sms" 
                  style={[
                    styles.toggleButton, 
                    formData.type === 'sms' && styles.toggleButtonSelected
                  ]}
                  color={formData.type === 'sms' ? 'white' : '#3498db'}
                  disabled={true}
                />
              </ToggleButton.Row>
              <Text style={styles.helperText}>Solo WhatsApp disponible en esta versión</Text>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Audiencia</Text>
              <Button 
                mode="outlined" 
                onPress={() => setShowAudienceDialog(true)}
                icon="account-group"
                style={styles.selectButton}
              >
                {getAudienceText(formData.audience)} ({formData.audienceCount})
              </Button>
            </View>
            
            <View style={styles.formGroup}>
              <View style={styles.messageHeaderContainer}>
                <Text style={styles.label}>Mensaje</Text>
                <Button 
                  mode="text" 
                  compact 
                  icon="file-document-outline" 
                  onPress={() => setShowTemplateDialog(true)}
                >
                  Usar plantilla
                </Button>
              </View>
              <TextInput
                mode="outlined"
                value={formData.message}
                onChangeText={(text) => setFormData({...formData, message: text})}
                placeholder="Escribe tu mensaje aquí..."
                multiline
                numberOfLines={6}
                style={styles.messageInput}
              />
              <Text style={styles.charCount}>
                {formData.message.length}/1000 caracteres
              </Text>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Programar envío</Text>
              <View style={styles.scheduleContainer}>
                <TextInput
                  mode="outlined"
                  value={formData.scheduledDate}
                  placeholder="Fecha (AAAA-MM-DD)"
                  style={[styles.input, styles.dateInput]}
                  onChangeText={(text) => setFormData({...formData, scheduledDate: text})}
                />
                <TextInput
                  mode="outlined"
                  value={formData.scheduledTime}
                  placeholder="Hora (HH:MM)"
                  style={[styles.input, styles.timeInput]}
                  onChangeText={(text) => setFormData({...formData, scheduledTime: text})}
                />
              </View>
              <Text style={styles.helperText}>Deja en blanco para guardar como borrador</Text>
            </View>
            
            {!isNewCampaign && formData.status !== 'draft' && (
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Enviados</Text>
                  <Text style={styles.statValue}>{formData.sentCount}</Text>
                </View>
                
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Respuestas</Text>
                  <Text style={styles.statValue}>{formData.responseCount}</Text>
                </View>
                
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Tasa de respuesta</Text>
                  <Text style={styles.statValue}>
                    {formData.sentCount > 0 
                      ? `${Math.round((formData.responseCount / formData.sentCount) * 100)}%` 
                      : '0%'}
                  </Text>
                </View>
              </View>
            )}
            
            <View style={styles.buttonContainer}>
              {isNewCampaign || formData.status === 'draft' ? (
                <>
                  <Button 
                    mode="contained" 
                    onPress={handleSave}
                    style={styles.saveButton}
                  >
                    Guardar como borrador
                  </Button>
                  
                  <Button 
                    mode="contained" 
                    onPress={handleSendNow}
                    style={styles.sendButton}
                    disabled={!formData.message.trim()}
                  >
                    Enviar ahora
                  </Button>
                  
                  <Button 
                    mode="contained" 
                    onPress={handleSchedule}
                    style={styles.scheduleButton}
                    disabled={!formData.scheduledDate || !formData.message.trim()}
                  >
                    Programar envío
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    mode="contained" 
                    onPress={handleSave}
                    style={styles.saveButton}
                  >
                    Guardar cambios
                  </Button>
                  
                  {formData.status === 'scheduled' && (
                    <Button 
                      mode="contained" 
                      onPress={handleSendNow}
                      style={styles.sendButton}
                    >
                      Enviar ahora
                    </Button>
                  )}
                  
                  <Button 
                    mode="outlined" 
                    onPress={handleDelete}
                    style={styles.deleteButton}
                    textColor="#e74c3c"
                  >
                    Eliminar campaña
                  </Button>
                </>
              )}
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
      
      <Portal>
        <Dialog visible={showAudienceDialog} onDismiss={() => setShowAudienceDialog(false)}>
          <Dialog.Title>Seleccionar Audiencia</Dialog.Title>
          <Dialog.Content>
            <ScrollView style={styles.dialogScrollView}>
              {audiences.map(audience => (
                <TouchableOpacity 
                  key={audience.id} 
                  style={styles.dialogItem}
                  onPress={() => handleAudienceSelect(audience)}
                >
                  <View style={styles.audienceItem}>
                    <View>
                      <Text style={styles.dialogItemTitle}>{audience.name}</Text>
                      <Text style={styles.dialogItemSubtitle}>{audience.description}</Text>
                    </View>
                    <Chip>{audience.count}</Chip>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowAudienceDialog(false)}>Cancelar</Button>
          </Dialog.Actions>
        </Dialog>
        
        <Dialog visible={showTemplateDialog} onDismiss={() => setShowTemplateDialog(false)}>
          <Dialog.Title>Seleccionar Plantilla</Dialog.Title>
          <Dialog.Content>
            <ScrollView style={styles.dialogScrollView}>
              {templates.map(template => (
                <TouchableOpacity 
                  key={template.id} 
                  style={styles.dialogItem}
                  onPress={() => handleTemplateSelect(template)}
                >
                  <Text style={styles.dialogItemTitle}>{template.title}</Text>
                  <Text style={styles.dialogItemSubtitle} numberOfLines={2}>
                    {template.message}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowTemplateDialog(false)}>Cancelar</Button>
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
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
  },
  toggleButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  toggleButtonSelected: {
    backgroundColor: '#8e44ad',
  },
  helperText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  selectButton: {
    justifyContent: 'flex-start',
    height: 56,
    paddingVertical: 8,
  },
  messageHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageInput: {
    backgroundColor: 'white',
    minHeight: 120,
  },
  charCount: {
    fontSize: 12,
    color: '#666',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  scheduleContainer: {
    flexDirection: 'row',
  },
  dateInput: {
    flex: 2,
    marginRight: 8,
  },
  timeInput: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
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
  buttonContainer: {
    marginTop: 24,
  },
  saveButton: {
    marginBottom: 12,
    backgroundColor: '#8e44ad',
  },
  sendButton: {
    marginBottom: 12,
    backgroundColor: '#27ae60',
  },
  scheduleButton: {
    marginBottom: 12,
    backgroundColor: '#f39c12',
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
  audienceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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

export default CampaignDetailScreen;
