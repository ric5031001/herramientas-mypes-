import AsyncStorage from '@react-native-async-storage/async-storage';

// Clase para gestionar la persistencia de datos local
class DataManager {
  // Claves para almacenamiento
  static KEYS = {
    CLIENTS: 'conectapyme_clients',
    APPOINTMENTS: 'conectapyme_appointments',
    CAMPAIGNS: 'conectapyme_campaigns',
    MESSAGES: 'conectapyme_messages',
    SERVICES: 'conectapyme_services',
    SETTINGS: 'conectapyme_settings',
  };

  // Guardar datos
  static async saveData(key, data) {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonValue);
      return true;
    } catch (error) {
      console.error('Error saving data:', error);
      return false;
    }
  }

  // Cargar datos
  static async loadData(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error loading data:', error);
      return null;
    }
  }

  // Eliminar datos
  static async removeData(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing data:', error);
      return false;
    }
  }

  // Métodos específicos para clientes
  static async getClients() {
    const clients = await this.loadData(this.KEYS.CLIENTS);
    return clients || [];
  }

  static async saveClient(client) {
    const clients = await this.getClients();
    
    // Si el cliente ya existe, actualizarlo
    const index = clients.findIndex(c => c.id === client.id);
    if (index !== -1) {
      clients[index] = client;
    } else {
      // Si es nuevo, asignar ID y agregar
      client.id = Date.now();
      clients.push(client);
    }
    
    return this.saveData(this.KEYS.CLIENTS, clients);
  }

  static async deleteClient(clientId) {
    const clients = await this.getClients();
    const filteredClients = clients.filter(client => client.id !== clientId);
    return this.saveData(this.KEYS.CLIENTS, filteredClients);
  }

  // Métodos específicos para citas
  static async getAppointments() {
    const appointments = await this.loadData(this.KEYS.APPOINTMENTS);
    return appointments || [];
  }

  static async saveAppointment(appointment) {
    const appointments = await this.getAppointments();
    
    // Si la cita ya existe, actualizarla
    const index = appointments.findIndex(a => a.id === appointment.id);
    if (index !== -1) {
      appointments[index] = appointment;
    } else {
      // Si es nueva, asignar ID y agregar
      appointment.id = Date.now();
      appointments.push(appointment);
    }
    
    return this.saveData(this.KEYS.APPOINTMENTS, appointments);
  }

  static async deleteAppointment(appointmentId) {
    const appointments = await this.getAppointments();
    const filteredAppointments = appointments.filter(appointment => appointment.id !== appointmentId);
    return this.saveData(this.KEYS.APPOINTMENTS, filteredAppointments);
  }

  // Métodos específicos para campañas
  static async getCampaigns() {
    const campaigns = await this.loadData(this.KEYS.CAMPAIGNS);
    return campaigns || [];
  }

  static async saveCampaign(campaign) {
    const campaigns = await this.getCampaigns();
    
    // Si la campaña ya existe, actualizarla
    const index = campaigns.findIndex(c => c.id === campaign.id);
    if (index !== -1) {
      campaigns[index] = campaign;
    } else {
      // Si es nueva, asignar ID y agregar
      campaign.id = Date.now();
      campaigns.push(campaign);
    }
    
    return this.saveData(this.KEYS.CAMPAIGNS, campaigns);
  }

  static async deleteCampaign(campaignId) {
    const campaigns = await this.getCampaigns();
    const filteredCampaigns = campaigns.filter(campaign => campaign.id !== campaignId);
    return this.saveData(this.KEYS.CAMPAIGNS, filteredCampaigns);
  }

  // Métodos específicos para mensajes
  static async getMessages() {
    const messages = await this.loadData(this.KEYS.MESSAGES);
    return messages || [];
  }

  static async saveMessage(message) {
    const messages = await this.getMessages();
    
    // Si el mensaje ya existe, actualizarlo
    const index = messages.findIndex(m => m.id === message.id);
    if (index !== -1) {
      messages[index] = message;
    } else {
      // Si es nuevo, asignar ID y agregar
      message.id = Date.now();
      messages.push(message);
    }
    
    return this.saveData(this.KEYS.MESSAGES, messages);
  }

  static async deleteMessage(messageId) {
    const messages = await this.getMessages();
    const filteredMessages = messages.filter(message => message.id !== messageId);
    return this.saveData(this.KEYS.MESSAGES, filteredMessages);
  }

  // Métodos específicos para servicios
  static async getServices() {
    const services = await this.loadData(this.KEYS.SERVICES);
    return services || [];
  }

  static async saveService(service) {
    const services = await this.getServices();
    
    // Si el servicio ya existe, actualizarlo
    const index = services.findIndex(s => s.id === service.id);
    if (index !== -1) {
      services[index] = service;
    } else {
      // Si es nuevo, asignar ID y agregar
      service.id = Date.now();
      services.push(service);
    }
    
    return this.saveData(this.KEYS.SERVICES, services);
  }

  static async deleteService(serviceId) {
    const services = await this.getServices();
    const filteredServices = services.filter(service => service.id !== serviceId);
    return this.saveData(this.KEYS.SERVICES, filteredServices);
  }

  // Métodos para configuración
  static async getSettings() {
    const settings = await this.loadData(this.KEYS.SETTINGS);
    return settings || {
      businessName: '',
      businessType: '',
      whatsappNumber: '',
      notificationsEnabled: true,
      theme: 'default',
    };
  }

  static async saveSettings(settings) {
    return this.saveData(this.KEYS.SETTINGS, settings);
  }

  // Método para cargar datos de ejemplo
  static async loadSampleData() {
    // Datos de ejemplo para clientes
    const sampleClients = [
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
    ];

    // Datos de ejemplo para citas
    const sampleAppointments = [
      { 
        id: 1, 
        clientName: 'María Rodríguez', 
        clientId: 1,
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
        clientId: 2,
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
        clientId: 3,
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
        clientId: 4,
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
        clientId: 5,
        service: 'Pedicure', 
        date: '2025-04-18', 
        time: '16:00', 
        duration: 60,
        status: 'pending',
        notes: 'Alergia a ciertos productos'
      }
    ];

    // Datos de ejemplo para campañas
    const sampleCampaigns = [
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
    ];

    // Datos de ejemplo para mensajes
    const sampleMessages = [
      { 
        id: 1, 
        clientName: 'María Rodríguez', 
        clientId: 1,
        phone: '+503 7123 4567',
        type: 'whatsapp',
        content: '¿Tienen disponibilidad para un corte de cabello mañana a las 3 PM?',
        timestamp: '2025-04-17T14:30:00',
        read: false,
        replied: false
      },
      { 
        id: 2, 
        clientName: 'Juan Pérez', 
        clientId: 2,
        phone: '+503 7234 5678',
        type: 'whatsapp',
        content: 'Quisiera agendar una cita para manicure el viernes',
        timestamp: '2025-04-17T13:15:00',
        read: true,
        replied: true
      },
      { 
        id: 3, 
        clientName: 'Ana López', 
        clientId: 3,
        phone: '+503 7345 6789',
        type: 'whatsapp',
        content: '¿Cuál es el precio del tinte que usamos la última vez?',
        timestamp: '2025-04-17T10:45:00',
        read: false,
        replied: false
      },
      { 
        id: 4, 
        clientName: 'Carlos Martínez', 
        clientId: 4,
        phone: '+503 7456 7890',
        type: 'whatsapp',
        content: 'Necesito cancelar mi cita de mañana, ¿podemos reprogramarla?',
        timestamp: '2025-04-16T18:20:00',
        read: true,
        replied: false
      },
      { 
        id: 5, 
        clientName: 'Laura Sánchez', 
        clientId: 5,
        phone: '+503 7567 8901',
        type: 'sms',
        content: '¿Tienen disponibilidad para un pedicure este sábado?',
        timestamp: '2025-04-16T15:10:00',
        read: true,
        replied: true
      }
    ];

    // Datos de ejemplo para servicios
    const sampleServices = [
      { id: 1, name: 'Corte de cabello', duration: 60, price: 15 },
      { id: 2, name: 'Tinte', duration: 120, price: 35 },
      { id: 3, name: 'Manicure', duration: 45, price: 12 },
      { id: 4, name: 'Pedicure', duration: 60, price: 15 },
      { id: 5, name: 'Tratamiento', duration: 90, price: 25 },
      { id: 6, name: 'Corte y barba', duration: 60, price: 20 },
      { id: 7, name: 'Peinado', duration: 45, price: 18 },
    ];

    // Configuración de ejemplo
    const sampleSettings = {
      businessName: 'Salón de Belleza Ejemplo',
      businessType: 'beauty',
      whatsappNumber: '+503 7123 4567',
      notificationsEnabled: true,
      theme: 'default',
    };

    // Guardar todos los datos de ejemplo
    await this.saveData(this.KEYS.CLIENTS, sampleClients);
    await this.saveData(this.KEYS.APPOINTMENTS, sampleAppointments);
    await this.saveData(this.KEYS.CAMPAIGNS, sampleCampaigns);
    await this.saveData(this.KEYS.MESSAGES, sampleMessages);
    await this.saveData(this.KEYS.SERVICES, sampleServices);
    await this.saveData(this.KEYS.SETTINGS, sampleSettings);

    return true;
  }

  // Método para exportar todos los datos
  static async exportAllData() {
    const allData = {
      clients: await this.getClients(),
      appointments: await this.getAppointments(),
      campaigns: await this.getCampaigns(),
      messages: await this.getMessages(),
      services: await this.getServices(),
      settings: await this.getSettings(),
    };
    
    return JSON.stringify(allData);
  }

  // Método para importar todos los datos
  static async importAllData(jsonData) {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.clients) await this.saveData(this.KEYS.CLIENTS, data.clients);
      if (data.appointments) await this.saveData(this.KEYS.APPOINTMENTS, data.appointments);
      if (data.campaigns) await this.saveData(this.KEYS.CAMPAIGNS, data.campaigns);
      if (data.messages) await this.saveData(this.KEYS.MESSAGES, data.messages);
      if (data.services) await this.saveData(this.KEYS.SERVICES, data.services);
      if (data.settings) await this.saveData(this.KEYS.SETTINGS, data.settings);
      
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }
}

export default DataManager;
