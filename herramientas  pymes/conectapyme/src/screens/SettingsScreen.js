import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, Title, Paragraph, Button, Text, Divider, TextInput, Switch } from 'react-native-paper';
import DataManager from '../utils/DataManager';
import WhatsAppConnector from '../utils/WhatsAppConnector';
import SocialMediaConnector from '../utils/SocialMediaConnector';

const SettingsScreen = ({ navigation }) => {
  const [settings, setSettings] = useState({
    businessName: '',
    businessType: 'beauty',
    whatsappNumber: '',
    notificationsEnabled: true,
    theme: 'default',
    whatsappEnabled: false,
    facebookEnabled: false,
    instagramEnabled: false
  });
  
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadSettings();
  }, []);
  
  const loadSettings = async () => {
    setLoading(true);
    const savedSettings = await DataManager.getSettings();
    if (savedSettings) {
      setSettings(savedSettings);
    }
    setLoading(false);
  };
  
  const saveSettings = async () => {
    const success = await DataManager.saveSettings(settings);
    if (success) {
      Alert.alert('Éxito', 'Configuración guardada correctamente');
    } else {
      Alert.alert('Error', 'No se pudo guardar la configuración');
    }
  };
  
  const connectWhatsApp = () => {
    // En una implementación real, aquí se haría la autenticación con WhatsApp Business API
    // Para el prototipo, simulamos una conexión exitosa
    const connected = WhatsAppConnector.initialize('123456789', 'mock_access_token');
    
    setSettings({
      ...settings,
      whatsappEnabled: connected
    });
    
    if (connected) {
      Alert.alert('Éxito', 'Conectado a WhatsApp Business');
    } else {
      Alert.alert('Error', 'No se pudo conectar a WhatsApp Business');
    }
  };
  
  const connectFacebook = () => {
    // En una implementación real, aquí se haría la autenticación con Facebook API
    // Para el prototipo, simulamos una conexión exitosa
    const connected = SocialMediaConnector.initializeFacebook('123456789', 'mock_access_token');
    
    setSettings({
      ...settings,
      facebookEnabled: connected
    });
    
    if (connected) {
      Alert.alert('Éxito', 'Conectado a Facebook');
    } else {
      Alert.alert('Error', 'No se pudo conectar a Facebook');
    }
  };
  
  const connectInstagram = () => {
    // En una implementación real, aquí se haría la autenticación con Instagram API
    // Para el prototipo, simulamos una conexión exitosa
    const connected = SocialMediaConnector.initializeInstagram('123456789', 'mock_access_token');
    
    setSettings({
      ...settings,
      instagramEnabled: connected
    });
    
    if (connected) {
      Alert.alert('Éxito', 'Conectado a Instagram');
    } else {
      Alert.alert('Error', 'No se pudo conectar a Instagram');
    }
  };
  
  const loadSampleData = async () => {
    Alert.alert(
      'Cargar datos de ejemplo',
      '¿Estás seguro de que deseas cargar datos de ejemplo? Esto reemplazará cualquier dato existente.',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Aceptar',
          onPress: async () => {
            setLoading(true);
            const success = await DataManager.loadSampleData();
            setLoading(false);
            
            if (success) {
              Alert.alert('Éxito', 'Datos de ejemplo cargados correctamente');
            } else {
              Alert.alert('Error', 'No se pudieron cargar los datos de ejemplo');
            }
          }
        }
      ]
    );
  };
  
  const exportData = async () => {
    const jsonData = await DataManager.exportAllData();
    
    if (jsonData) {
      // En una implementación real, aquí se guardaría el archivo o se compartiría
      Alert.alert('Éxito', 'Datos exportados correctamente');
      console.log('Datos exportados:', jsonData);
    } else {
      Alert.alert('Error', 'No se pudieron exportar los datos');
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Información del negocio</Title>
          
          <Divider style={styles.divider} />
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nombre del negocio</Text>
            <TextInput
              mode="outlined"
              value={settings.businessName}
              onChangeText={(text) => setSettings({...settings, businessName: text})}
              placeholder="Ej: Salón de Belleza Estrella"
              style={styles.input}
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Tipo de negocio</Text>
            <View style={styles.businessTypeContainer}>
              <Button
                mode={settings.businessType === 'beauty' ? 'contained' : 'outlined'}
                onPress={() => setSettings({...settings, businessType: 'beauty'})}
                style={styles.businessTypeButton}
              >
                Salón de belleza
              </Button>
              <Button
                mode={settings.businessType === 'store' ? 'contained' : 'outlined'}
                onPress={() => setSettings({...settings, businessType: 'store'})}
                style={styles.businessTypeButton}
              >
                Tienda
              </Button>
            </View>
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Número de WhatsApp</Text>
            <TextInput
              mode="outlined"
              value={settings.whatsappNumber}
              onChangeText={(text) => setSettings({...settings, whatsappNumber: text})}
              placeholder="+503 7123 4567"
              keyboardType="phone-pad"
              style={styles.input}
            />
          </View>
        </Card.Content>
      </Card>
      
      <Card style={styles.card}>
        <Card.Content>
          <Title>Conexiones</Title>
          
          <Divider style={styles.divider} />
          
          <View style={styles.connectionItem}>
            <View style={styles.connectionInfo}>
              <Text style={styles.connectionTitle}>WhatsApp Business</Text>
              <Text style={styles.connectionDescription}>
                Conecta con WhatsApp para enviar mensajes y recordatorios a tus clientes
              </Text>
            </View>
            <Button
              mode={settings.whatsappEnabled ? 'contained' : 'outlined'}
              onPress={connectWhatsApp}
              icon="whatsapp"
              style={settings.whatsappEnabled ? styles.connectedButton : styles.connectButton}
            >
              {settings.whatsappEnabled ? 'Conectado' : 'Conectar'}
            </Button>
          </View>
          
          <Divider style={styles.itemDivider} />
          
          <View style={styles.connectionItem}>
            <View style={styles.connectionInfo}>
              <Text style={styles.connectionTitle}>Facebook</Text>
              <Text style={styles.connectionDescription}>
                Conecta con tu página de Facebook para gestionar mensajes y publicaciones
              </Text>
            </View>
            <Button
              mode={settings.facebookEnabled ? 'contained' : 'outlined'}
              onPress={connectFacebook}
              icon="facebook"
              style={settings.facebookEnabled ? styles.connectedButton : styles.connectButton}
            >
              {settings.facebookEnabled ? 'Conectado' : 'Conectar'}
            </Button>
          </View>
          
          <Divider style={styles.itemDivider} />
          
          <View style={styles.connectionItem}>
            <View style={styles.connectionInfo}>
              <Text style={styles.connectionTitle}>Instagram</Text>
              <Text style={styles.connectionDescription}>
                Conecta con tu cuenta de Instagram para gestionar publicaciones
              </Text>
            </View>
            <Button
              mode={settings.instagramEnabled ? 'contained' : 'outlined'}
              onPress={connectInstagram}
              icon="instagram"
              style={settings.instagramEnabled ? styles.connectedButton : styles.connectButton}
            >
              {settings.instagramEnabled ? 'Conectado' : 'Conectar'}
            </Button>
          </View>
        </Card.Content>
      </Card>
      
      <Card style={styles.card}>
        <Card.Content>
          <Title>Preferencias</Title>
          
          <Divider style={styles.divider} />
          
          <View style={styles.switchItem}>
            <Text>Notificaciones</Text>
            <Switch
              value={settings.notificationsEnabled}
              onValueChange={(value) => setSettings({...settings, notificationsEnabled: value})}
              color="#8e44ad"
            />
          </View>
        </Card.Content>
      </Card>
      
      <Card style={styles.card}>
        <Card.Content>
          <Title>Datos</Title>
          
          <Divider style={styles.divider} />
          
          <Button
            mode="outlined"
            onPress={loadSampleData}
            icon="database-import"
            style={styles.dataButton}
          >
            Cargar datos de ejemplo
          </Button>
          
          <Button
            mode="outlined"
            onPress={exportData}
            icon="database-export"
            style={styles.dataButton}
          >
            Exportar todos los datos
          </Button>
        </Card.Content>
      </Card>
      
      <Button
        mode="contained"
        onPress={saveSettings}
        style={styles.saveButton}
      >
        Guardar configuración
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  divider: {
    marginVertical: 16,
  },
  itemDivider: {
    marginVertical: 12,
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
  businessTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  businessTypeButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  connectionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  connectionInfo: {
    flex: 1,
    marginRight: 16,
  },
  connectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  connectionDescription: {
    color: '#666',
    fontSize: 12,
  },
  connectButton: {
    minWidth: 100,
  },
  connectedButton: {
    minWidth: 100,
    backgroundColor: '#27ae60',
  },
  switchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  dataButton: {
    marginBottom: 12,
  },
  saveButton: {
    marginVertical: 16,
    backgroundColor: '#8e44ad',
  },
});

export default SettingsScreen;
