import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Button, Text, Divider, FAB, Searchbar, Chip, Avatar, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MessagesScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'whatsapp'
  const [replyText, setReplyText] = useState('');
  
  // Datos de ejemplo para mensajes
  const [messages, setMessages] = useState([
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
  ]);

  // Filtrar mensajes
  const filteredMessages = messages.filter(message => {
    // Filtrar por búsqueda
    const matchesSearch = message.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          message.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filtrar por categoría
    const matchesFilter = filter === 'all' ? true : 
                          filter === 'unread' ? !message.read : 
                          filter === 'whatsapp' ? message.type === 'whatsapp' : true;
    
    return matchesSearch && matchesFilter;
  });

  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleMessagePress = (message) => {
    // Marcar como leído
    const updatedMessages = messages.map(m => 
      m.id === message.id ? { ...m, read: true } : m
    );
    setMessages(updatedMessages);
    setSelectedMessage(message);
  };

  const handleReply = () => {
    if (!selectedMessage || !replyText.trim()) return;
    
    // Marcar como respondido
    const updatedMessages = messages.map(m => 
      m.id === selectedMessage.id ? { ...m, replied: true } : m
    );
    setMessages(updatedMessages);
    
    // Limpiar campo de respuesta
    setReplyText('');
    
    // Aquí se enviaría el mensaje por WhatsApp en una implementación real
    console.log(`Enviando respuesta a ${selectedMessage.clientName}: ${replyText}`);
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Ayer';
    } else if (diffDays < 7) {
      return date.toLocaleDateString('es-ES', { weekday: 'long' });
    } else {
      return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });
    }
  };

  const renderMessageItem = (message) => (
    <TouchableOpacity 
      key={message.id} 
      onPress={() => handleMessagePress(message)}
      style={[
        styles.messageItem,
        selectedMessage?.id === message.id && styles.selectedMessageItem
      ]}
    >
      <View style={styles.messageHeader}>
        <View style={styles.clientInfo}>
          <Avatar.Text 
            size={40} 
            label={getInitials(message.clientName)} 
            backgroundColor={message.read ? '#bdc3c7' : '#8e44ad'} 
          />
          <View style={styles.clientDetails}>
            <Text style={[
              styles.clientName,
              !message.read && styles.unreadText
            ]}>
              {message.clientName}
            </Text>
            <View style={styles.messageTypeContainer}>
              <Icon 
                name={message.type === 'whatsapp' ? 'whatsapp' : 'message'} 
                size={14} 
                color={message.type === 'whatsapp' ? '#25D366' : '#3498db'} 
              />
              <Text style={styles.messageTypeText}>
                {message.phone}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.messageTime}>
          <Text style={styles.timeText}>{formatTimestamp(message.timestamp)}</Text>
          {!message.read && <View style={styles.unreadDot} />}
        </View>
      </View>
      
      <View style={styles.messageContent}>
        <Text 
          numberOfLines={2} 
          style={[
            styles.messageText,
            !message.read && styles.unreadText
          ]}
        >
          {message.content}
        </Text>
      </View>
      
      <View style={styles.messageFooter}>
        {message.replied ? (
          <Chip icon="check" style={styles.repliedChip}>Respondido</Chip>
        ) : (
          <Button 
            mode="text" 
            compact 
            icon="reply" 
            onPress={() => handleMessagePress(message)}
          >
            Responder
          </Button>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Buscar mensajes..."
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
          selected={filter === 'unread'} 
          onPress={() => setFilter('unread')}
          style={styles.filterChip}
          icon="email-unread"
        >
          No leídos
        </Chip>
        <Chip 
          selected={filter === 'whatsapp'} 
          onPress={() => setFilter('whatsapp')}
          style={styles.filterChip}
          icon="whatsapp"
        >
          WhatsApp
        </Chip>
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.messagesList}>
          <ScrollView>
            {filteredMessages.length === 0 ? (
              <Text style={styles.noMessagesText}>No se encontraron mensajes</Text>
            ) : (
              filteredMessages.map(renderMessageItem)
            )}
          </ScrollView>
        </View>
        
        {selectedMessage && (
          <View style={styles.conversationContainer}>
            <View style={styles.conversationHeader}>
              <View style={styles.conversationClient}>
                <Avatar.Text 
                  size={40} 
                  label={getInitials(selectedMessage.clientName)} 
                  backgroundColor="#8e44ad" 
                />
                <View style={styles.conversationClientDetails}>
                  <Text style={styles.conversationClientName}>{selectedMessage.clientName}</Text>
                  <Text style={styles.conversationClientPhone}>{selectedMessage.phone}</Text>
                </View>
              </View>
              <View style={styles.conversationActions}>
                <Button 
                  mode="text" 
                  compact 
                  icon="phone" 
                  onPress={() => console.log('Call pressed')}
                >
                  Llamar
                </Button>
                <Button 
                  mode="text" 
                  compact 
                  icon="calendar-plus" 
                  onPress={() => navigation.navigate('Citas')}
                >
                  Agendar
                </Button>
              </View>
            </View>
            
            <ScrollView style={styles.messagesContainer}>
              <View style={styles.receivedMessage}>
                <Text style={styles.messageContent}>{selectedMessage.content}</Text>
                <Text style={styles.messageTimestamp}>
                  {new Date(selectedMessage.timestamp).toLocaleTimeString('es-ES', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </Text>
              </View>
              
              {selectedMessage.replied && (
                <View style={styles.sentMessage}>
                  <Text style={styles.messageContent}>
                    Gracias por contactarnos. Sí, tenemos disponibilidad para esa hora. ¿Desea confirmar la cita?
                  </Text>
                  <Text style={styles.messageTimestamp}>
                    {new Date(new Date(selectedMessage.timestamp).getTime() + 10*60000).toLocaleTimeString('es-ES', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </Text>
                </View>
              )}
            </ScrollView>
            
            <View style={styles.replyContainer}>
              <TextInput
                mode="outlined"
                placeholder="Escribe tu respuesta..."
                value={replyText}
                onChangeText={setReplyText}
                style={styles.replyInput}
                multiline
              />
              <Button 
                mode="contained" 
                icon="send" 
                onPress={handleReply}
                style={styles.sendButton}
                disabled={!replyText.trim()}
              >
                Enviar
              </Button>
            </View>
          </View>
        )}
      </View>
      
      <FAB
        style={styles.fab}
        icon="message-plus"
        onPress={() => console.log('New message')}
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
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  messagesList: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
  conversationContainer: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
  },
  noMessagesText: {
    fontStyle: 'italic',
    color: '#666',
    textAlign: 'center',
    marginTop: 32,
  },
  messageItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  selectedMessageItem: {
    backgroundColor: '#f0e6f6',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  clientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clientDetails: {
    marginLeft: 12,
  },
  clientName: {
    fontSize: 16,
  },
  unreadText: {
    fontWeight: 'bold',
  },
  messageTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  messageTypeText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
  },
  messageTime: {
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: 12,
    color: '#666',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8e44ad',
    marginTop: 4,
  },
  messageContent: {
    marginBottom: 8,
  },
  messageText: {
    color: '#333',
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  repliedChip: {
    backgroundColor: '#e8f5e9',
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  conversationClient: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  conversationClientDetails: {
    marginLeft: 12,
  },
  conversationClientName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  conversationClientPhone: {
    color: '#666',
  },
  conversationActions: {
    flexDirection: 'row',
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 16,
    borderTopLeftRadius: 4,
    maxWidth: '80%',
    marginBottom: 16,
    elevation: 1,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#e3f2fd',
    padding: 12,
    borderRadius: 16,
    borderTopRightRadius: 4,
    maxWidth: '80%',
    marginBottom: 16,
    elevation: 1,
  },
  messageTimestamp: {
    fontSize: 10,
    color: '#999',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  replyContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'center',
  },
  replyInput: {
    flex: 1,
    marginRight: 8,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#8e44ad',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#8e44ad',
  },
});

export default MessagesScreen;
