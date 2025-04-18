import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Importar pantallas
import HomeScreen from './screens/HomeScreen';
import AppointmentsScreen from './screens/AppointmentsScreen';
import ClientsScreen from './screens/ClientsScreen';
import MarketingScreen from './screens/MarketingScreen';
import MessagesScreen from './screens/MessagesScreen';
import AppointmentDetailScreen from './screens/AppointmentDetailScreen';
import ClientDetailScreen from './screens/ClientDetailScreen';
import CampaignDetailScreen from './screens/CampaignDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Definir tema personalizado
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#8e44ad', // Morado para salones de belleza
    accent: '#e74c3c',
    background: '#f5f5f5',
    surface: '#ffffff',
  },
};

// Navegación para citas
function AppointmentsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="AppointmentsList" 
        component={AppointmentsScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="AppointmentDetail" 
        component={AppointmentDetailScreen} 
        options={{ title: 'Detalle de Cita' }}
      />
    </Stack.Navigator>
  );
}

// Navegación para clientes
function ClientsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ClientsList" 
        component={ClientsScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ClientDetail" 
        component={ClientDetailScreen} 
        options={{ title: 'Detalle de Cliente' }}
      />
    </Stack.Navigator>
  );
}

// Navegación para marketing
function MarketingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MarketingList" 
        component={MarketingScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="CampaignDetail" 
        component={CampaignDetailScreen} 
        options={{ title: 'Detalle de Campaña' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Inicio') {
                iconName = 'home';
              } else if (route.name === 'Citas') {
                iconName = 'calendar-clock';
              } else if (route.name === 'Clientes') {
                iconName = 'account-group';
              } else if (route.name === 'Marketing') {
                iconName = 'bullhorn';
              } else if (route.name === 'Mensajes') {
                iconName = 'message-text';
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Inicio" component={HomeScreen} />
          <Tab.Screen name="Citas" component={AppointmentsStack} />
          <Tab.Screen name="Clientes" component={ClientsStack} />
          <Tab.Screen name="Marketing" component={MarketingStack} />
          <Tab.Screen name="Mensajes" component={MessagesScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
