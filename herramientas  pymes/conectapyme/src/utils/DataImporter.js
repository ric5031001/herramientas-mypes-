import React from 'react';

// Clase para manejar la integración con Excel y CSV
class DataImporter {
  // Método para importar clientes desde CSV
  static async importClientsFromCSV(csvContent) {
    try {
      // Dividir el contenido por líneas
      const lines = csvContent.split('\n');
      
      // La primera línea debe contener los encabezados
      const headers = lines[0].split(',').map(header => header.trim());
      
      // Verificar que los encabezados contengan al menos nombre y teléfono
      if (!headers.includes('nombre') && !headers.includes('telefono')) {
        return {
          success: false,
          error: 'El archivo CSV debe contener al menos las columnas "nombre" y "telefono"'
        };
      }
      
      // Procesar cada línea para crear objetos de cliente
      const clients = [];
      
      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue; // Saltar líneas vacías
        
        const values = lines[i].split(',').map(value => value.trim());
        
        // Crear objeto de cliente con mapeo dinámico de columnas
        const client = {
          id: Date.now() + i, // Generar ID único
          favorite: false,
          visitCount: 0,
          services: []
        };
        
        // Mapear valores según los encabezados
        headers.forEach((header, index) => {
          if (values[index]) {
            switch(header.toLowerCase()) {
              case 'nombre':
                client.name = values[index];
                break;
              case 'telefono':
                client.phone = values[index];
                break;
              case 'email':
                client.email = values[index];
                break;
              case 'notas':
                client.notes = values[index];
                break;
              case 'servicios':
                client.services = values[index].split(';').map(s => s.trim());
                break;
              case 'favorito':
                client.favorite = values[index].toLowerCase() === 'si' || 
                                 values[index].toLowerCase() === 'sí' || 
                                 values[index] === '1';
                break;
            }
          }
        });
        
        // Solo agregar clientes que tengan al menos nombre y teléfono
        if (client.name && client.phone) {
          clients.push(client);
        }
      }
      
      return {
        success: true,
        data: clients
      };
    } catch (error) {
      console.error('Error importando clientes desde CSV:', error);
      return {
        success: false,
        error: 'Error al procesar el archivo CSV'
      };
    }
  }
  
  // Método para importar clientes desde Excel (simulado)
  static async importClientsFromExcel(excelContent) {
    // En un entorno real, aquí se utilizaría una biblioteca para procesar archivos Excel
    // Para el prototipo, simulamos que el contenido ya está en formato JSON
    try {
      const data = JSON.parse(excelContent);
      
      // Verificar que los datos tengan la estructura esperada
      if (!Array.isArray(data)) {
        return {
          success: false,
          error: 'El formato de los datos no es válido'
        };
      }
      
      // Procesar cada elemento para asegurar que tenga la estructura correcta
      const clients = data.map((item, index) => ({
        id: Date.now() + index,
        name: item.nombre || item.name || '',
        phone: item.telefono || item.phone || '',
        email: item.email || item.correo || '',
        notes: item.notas || item.notes || '',
        favorite: item.favorito || item.favorite || false,
        visitCount: item.visitas || item.visitCount || 0,
        services: Array.isArray(item.servicios || item.services) 
          ? (item.servicios || item.services) 
          : []
      })).filter(client => client.name && client.phone);
      
      return {
        success: true,
        data: clients
      };
    } catch (error) {
      console.error('Error importando clientes desde Excel:', error);
      return {
        success: false,
        error: 'Error al procesar el archivo Excel'
      };
    }
  }
  
  // Método para exportar clientes a CSV
  static exportClientsToCSV(clients) {
    try {
      // Definir encabezados
      const headers = ['nombre', 'telefono', 'email', 'notas', 'favorito', 'visitas', 'servicios'];
      
      // Crear línea de encabezados
      let csvContent = headers.join(',') + '\n';
      
      // Agregar cada cliente
      clients.forEach(client => {
        const row = [
          client.name || '',
          client.phone || '',
          client.email || '',
          client.notes || '',
          client.favorite ? 'Sí' : 'No',
          client.visitCount || 0,
          (client.services || []).join(';')
        ];
        
        // Escapar comas en los valores
        const escapedRow = row.map(value => {
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        });
        
        csvContent += escapedRow.join(',') + '\n';
      });
      
      return {
        success: true,
        data: csvContent
      };
    } catch (error) {
      console.error('Error exportando clientes a CSV:', error);
      return {
        success: false,
        error: 'Error al generar el archivo CSV'
      };
    }
  }
  
  // Método para importar citas desde CSV
  static async importAppointmentsFromCSV(csvContent, clients) {
    try {
      // Dividir el contenido por líneas
      const lines = csvContent.split('\n');
      
      // La primera línea debe contener los encabezados
      const headers = lines[0].split(',').map(header => header.trim());
      
      // Verificar que los encabezados contengan los campos necesarios
      const requiredFields = ['cliente', 'servicio', 'fecha', 'hora'];
      const missingFields = requiredFields.filter(field => 
        !headers.some(header => header.toLowerCase().includes(field))
      );
      
      if (missingFields.length > 0) {
        return {
          success: false,
          error: `El archivo CSV debe contener las columnas: ${missingFields.join(', ')}`
        };
      }
      
      // Procesar cada línea para crear objetos de cita
      const appointments = [];
      
      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue; // Saltar líneas vacías
        
        const values = lines[i].split(',').map(value => value.trim());
        
        // Crear objeto de cita con mapeo dinámico de columnas
        const appointment = {
          id: Date.now() + i, // Generar ID único
          status: 'pending'
        };
        
        // Mapear valores según los encabezados
        headers.forEach((header, index) => {
          if (values[index]) {
            const headerLower = header.toLowerCase();
            
            if (headerLower.includes('cliente')) {
              appointment.clientName = values[index];
              
              // Intentar encontrar el ID del cliente
              const client = clients.find(c => c.name === values[index]);
              if (client) {
                appointment.clientId = client.id;
              }
            } 
            else if (headerLower.includes('servicio')) {
              appointment.service = values[index];
            }
            else if (headerLower.includes('fecha')) {
              appointment.date = values[index];
            }
            else if (headerLower.includes('hora')) {
              appointment.time = values[index];
            }
            else if (headerLower.includes('duracion') || headerLower.includes('duración')) {
              appointment.duration = parseInt(values[index]) || 60;
            }
            else if (headerLower.includes('notas')) {
              appointment.notes = values[index];
            }
            else if (headerLower.includes('estado')) {
              appointment.status = values[index].toLowerCase();
            }
          }
        });
        
        // Solo agregar citas que tengan los campos requeridos
        if (appointment.clientName && appointment.service && appointment.date && appointment.time) {
          appointments.push(appointment);
        }
      }
      
      return {
        success: true,
        data: appointments
      };
    } catch (error) {
      console.error('Error importando citas desde CSV:', error);
      return {
        success: false,
        error: 'Error al procesar el archivo CSV'
      };
    }
  }
}

export default DataImporter;
