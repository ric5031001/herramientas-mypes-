import React from 'react';
import { View, StyleSheet, ScrollView, Text, Image } from 'react-native';
import { Card, Title, Paragraph, Button, List, Divider } from 'react-native-paper';

const HelpScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Guía de uso de ConectaPYME</Title>
          <Paragraph style={styles.subtitle}>
            Bienvenido a ConectaPYME, tu asistente para gestionar tu salón de belleza o tienda pequeña
          </Paragraph>
          
          <Divider style={styles.divider} />
          
          <Title style={styles.sectionTitle}>Primeros pasos</Title>
          
          <List.Item
            title="1. Configura tu negocio"
            description="Ve a la sección de Configuración y completa la información de tu negocio"
            left={props => <List.Icon {...props} icon="store" />}
          />
          
          <List.Item
            title="2. Conecta tus canales"
            description="Conecta WhatsApp y redes sociales para una mejor comunicación con tus clientes"
            left={props => <List.Icon {...props} icon="link" />}
          />
          
          <List.Item
            title="3. Importa tus clientes"
            description="Agrega tus clientes manualmente o importa desde Excel/CSV"
            left={props => <List.Icon {...props} icon="account-multiple-plus" />}
          />
          
          <Divider style={styles.divider} />
          
          <Title style={styles.sectionTitle}>Gestión de citas</Title>
          
          <Paragraph style={styles.paragraph}>
            La sección de Citas te permite gestionar todas las citas de tu negocio de manera eficiente:
          </Paragraph>
          
          <List.Item
            title="Crear citas"
            description="Agrega nuevas citas con todos los detalles necesarios"
            left={props => <List.Icon {...props} icon="calendar-plus" />}
          />
          
          <List.Item
            title="Ver calendario"
            description="Visualiza tus citas en formato de calendario o lista"
            left={props => <List.Icon {...props} icon="calendar" />}
          />
          
          <List.Item
            title="Enviar recordatorios"
            description="Envía recordatorios automáticos por WhatsApp a tus clientes"
            left={props => <List.Icon {...props} icon="bell" />}
          />
          
          <Divider style={styles.divider} />
          
          <Title style={styles.sectionTitle}>Gestión de clientes</Title>
          
          <Paragraph style={styles.paragraph}>
            Mantén toda la información de tus clientes organizada:
          </Paragraph>
          
          <List.Item
            title="Ficha de cliente"
            description="Guarda datos de contacto, historial de visitas y preferencias"
            left={props => <List.Icon {...props} icon="account-details" />}
          />
          
          <List.Item
            title="Clientes favoritos"
            description="Marca tus clientes más frecuentes como favoritos"
            left={props => <List.Icon {...props} icon="star" />}
          />
          
          <List.Item
            title="Historial de servicios"
            description="Consulta todos los servicios realizados a cada cliente"
            left={props => <List.Icon {...props} icon="history" />}
          />
          
          <Divider style={styles.divider} />
          
          <Title style={styles.sectionTitle}>Marketing y campañas</Title>
          
          <Paragraph style={styles.paragraph}>
            Crea y gestiona campañas de marketing para promocionar tu negocio:
          </Paragraph>
          
          <List.Item
            title="Crear campaña"
            description="Diseña campañas para enviar por WhatsApp a tus clientes"
            left={props => <List.Icon {...props} icon="bullhorn" />}
          />
          
          <List.Item
            title="Usar plantillas"
            description="Utiliza plantillas prediseñadas para ahorrar tiempo"
            left={props => <List.Icon {...props} icon="file-document-outline" />}
          />
          
          <List.Item
            title="Programar envíos"
            description="Programa tus campañas para que se envíen automáticamente"
            left={props => <List.Icon {...props} icon="clock-outline" />}
          />
          
          <Divider style={styles.divider} />
          
          <Title style={styles.sectionTitle}>Mensajería</Title>
          
          <Paragraph style={styles.paragraph}>
            Centraliza todas tus comunicaciones con clientes:
          </Paragraph>
          
          <List.Item
            title="Bandeja de entrada"
            description="Gestiona todos tus mensajes de WhatsApp en un solo lugar"
            left={props => <List.Icon {...props} icon="inbox" />}
          />
          
          <List.Item
            title="Respuestas rápidas"
            description="Responde rápidamente a consultas frecuentes"
            left={props => <List.Icon {...props} icon="reply" />}
          />
          
          <Divider style={styles.divider} />
          
          <Title style={styles.sectionTitle}>Importación y exportación de datos</Title>
          
          <Paragraph style={styles.paragraph}>
            Gestiona tus datos de manera flexible:
          </Paragraph>
          
          <List.Item
            title="Importar desde Excel/CSV"
            description="Importa tus clientes y citas desde archivos existentes"
            left={props => <List.Icon {...props} icon="database-import" />}
          />
          
          <List.Item
            title="Exportar datos"
            description="Haz copias de seguridad de toda tu información"
            left={props => <List.Icon {...props} icon="database-export" />}
          />
          
          <Divider style={styles.divider} />
          
          <Title style={styles.sectionTitle}>Soporte</Title>
          
          <Paragraph style={styles.paragraph}>
            Si necesitas ayuda adicional, puedes contactarnos a través de:
          </Paragraph>
          
          <List.Item
            title="WhatsApp"
            description="+503 7123 4567"
            left={props => <List.Icon {...props} icon="whatsapp" />}
          />
          
          <List.Item
            title="Correo electrónico"
            description="soporte@conectapyme.com"
            left={props => <List.Icon {...props} icon="email" />}
          />
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
  card: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  divider: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  paragraph: {
    marginBottom: 8,
  },
});

export default HelpScreen;
