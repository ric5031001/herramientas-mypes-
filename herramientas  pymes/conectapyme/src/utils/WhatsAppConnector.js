import React from 'react';

// Clase para manejar la integración con WhatsApp
class WhatsAppConnector {
  // URL base para la API de WhatsApp Business
  static BASE_URL = 'https://graph.facebook.com/v17.0/';
  
  // Método para inicializar la conexión con WhatsApp
  static initialize(phoneNumberId, accessToken) {
    this.phoneNumberId = phoneNumberId;
    this.accessToken = accessToken;
    this.isInitialized = true;
    return this.isInitialized;
  }
  
  // Verificar si está inicializado
  static isConnected() {
    return this.isInitialized === true;
  }
  
  // Método para enviar mensaje de texto simple
  static async sendTextMessage(to, message) {
    if (!this.isConnected()) {
      console.error('WhatsApp no está inicializado');
      return this._mockResponse(false, 'WhatsApp no está inicializado');
    }
    
    // En un entorno real, aquí se haría la llamada a la API de WhatsApp
    // Para el prototipo, simulamos una respuesta exitosa
    console.log(`Enviando mensaje a ${to}: ${message}`);
    
    // Simulación de respuesta exitosa
    return this._mockResponse(true, {
      messaging_product: "whatsapp",
      contacts: [{ wa_id: to.replace('+', '') }],
      messages: [{ id: "wamid." + Math.random().toString(36).substring(2, 15) }]
    });
  }
  
  // Método para enviar mensaje con plantilla
  static async sendTemplateMessage(to, templateName, components = []) {
    if (!this.isConnected()) {
      console.error('WhatsApp no está inicializado');
      return this._mockResponse(false, 'WhatsApp no está inicializado');
    }
    
    console.log(`Enviando plantilla ${templateName} a ${to}`);
    
    // Simulación de respuesta exitosa
    return this._mockResponse(true, {
      messaging_product: "whatsapp",
      contacts: [{ wa_id: to.replace('+', '') }],
      messages: [{ id: "wamid." + Math.random().toString(36).substring(2, 15) }]
    });
  }
  
  // Método para enviar mensaje con imagen
  static async sendImageMessage(to, imageUrl, caption = '') {
    if (!this.isConnected()) {
      console.error('WhatsApp no está inicializado');
      return this._mockResponse(false, 'WhatsApp no está inicializado');
    }
    
    console.log(`Enviando imagen a ${to}: ${imageUrl}`);
    
    // Simulación de respuesta exitosa
    return this._mockResponse(true, {
      messaging_product: "whatsapp",
      contacts: [{ wa_id: to.replace('+', '') }],
      messages: [{ id: "wamid." + Math.random().toString(36).substring(2, 15) }]
    });
  }
  
  // Método para enviar recordatorio de cita
  static async sendAppointmentReminder(to, clientName, service, date, time) {
    const message = `¡Hola ${clientName}! 👋 Este es un recordatorio de tu cita para ${service} programada para el ${date} a las ${time}. ¡Te esperamos! Si necesitas reprogramar, por favor avísanos.`;
    return this.sendTextMessage(to, message);
  }
  
  // Método para enviar confirmación de cita
  static async sendAppointmentConfirmation(to, clientName, service, date, time) {
    const message = `¡Hola ${clientName}! 👋 Tu cita para ${service} ha sido confirmada para el ${date} a las ${time}. ¡Te esperamos! Si necesitas reprogramar, por favor avísanos con anticipación.`;
    return this.sendTextMessage(to, message);
  }
  
  // Método para enviar campaña a múltiples destinatarios
  static async sendCampaign(phoneNumbers, message) {
    if (!this.isConnected()) {
      console.error('WhatsApp no está inicializado');
      return this._mockResponse(false, 'WhatsApp no está inicializado');
    }
    
    console.log(`Enviando campaña a ${phoneNumbers.length} destinatarios`);
    
    const results = [];
    
    // Simulamos el envío a cada destinatario
    for (const phone of phoneNumbers) {
      // Simulamos que algunos mensajes fallan aleatoriamente
      const success = Math.random() > 0.1;
      
      results.push({
        phone,
        success,
        messageId: success ? "wamid." + Math.random().toString(36).substring(2, 15) : null,
        error: success ? null : "Número no disponible en WhatsApp"
      });
    }
    
    return this._mockResponse(true, {
      messaging_product: "whatsapp",
      batch_id: "batch." + Math.random().toString(36).substring(2, 15),
      messages_sent: results.filter(r => r.success).length,
      messages_failed: results.filter(r => !r.success).length,
      details: results
    });
  }
  
  // Método para simular respuestas de la API
  static _mockResponse(success, data) {
    // Simulamos un pequeño retraso para imitar la latencia de red
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success,
          data: success ? data : null,
          error: !success ? data : null
        });
      }, 500);
    });
  }
}

export default WhatsAppConnector;
