import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import MovimientoCard from '../components/MovimientoCard';
import { Ionicons } from '@expo/vector-icons';
import { useLayoutEffect } from 'react';

export default function HomeScreen({ navigation }: any) {
  const { logout } = useAuth();
  const [saldo, setSaldo] = useState<number | null>(null);
  const [movimientos, setMovimientos] = useState<any[]>([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={logout} style={{ marginRight: 16 }}>
          <Ionicons name="log-out-outline" size={24} color="#000000ff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);


  const cargarDatos = async () => {
    try {
      const saldoResp = await api.get('/saldo');
      setSaldo(saldoResp.data.data?.saldo);

      const movsResp = await api.get('/transferencias');
      setMovimientos(movsResp.data.data || []);
    } catch (error: any) {
      if (error.response?.status === 401) {
        Alert.alert('Sesión expirada', 'Por favor inicia sesión nuevamente');
        logout();
      } else {
        Alert.alert('Error', 'No se pudieron obtener los datos');
      }
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saldo disponible</Text>
        {typeof saldo === 'number' ? (
          <Text style={styles.saldo}>$ {saldo.toLocaleString('es-CO')}</Text>
        ) : (
          <Text style={styles.loading}>Cargando saldo...</Text>
        )}
      </View>

      {/* BOTÓN TRANSFERIR */}
      <TouchableOpacity
        style={styles.transferButton}
        onPress={() => navigation.navigate('Transferir')}
      >
        <Text style={styles.transferText}>Transferir</Text>
      </TouchableOpacity>

      {/* RESUMEN DE MOVIMIENTOS */}
      <View style={styles.resumen}>
        <Text style={styles.resumenTitle}>Movimientos recientes</Text>

        {movimientos.transferencias?.length > 0 ? (
          movimientos.transferencias.slice(0, 2).map((mov: any) => (
            <MovimientoCard
              key={mov.id}
              fecha={mov.fecha}
              valor={mov.valor}
              tipo={mov.tipo}
              estado={mov.estado}
              origen={mov.origen}
              destino={mov.destino}
            />
          ))
        ) : (
          <Text style={styles.loading}>Sin movimientos recientes</Text>
        )}

        {movimientos.transferencias?.length > 2 && (
          <TouchableOpacity
            onPress={() => navigation.navigate('Movimientos')}
            style={{ marginTop: 10 }}
          >
            <Text style={{ color: '#c90013', textAlign: 'center', fontWeight: '600' }}>
              Ver todos &gt;
            </Text>
          </TouchableOpacity>
        )}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6f9',
  },
  header: {
    backgroundColor: '#c90013',
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  saldo: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  loading: {
    fontSize: 16,
    color: '#777',
    marginTop: 10,
    textAlign: 'center',
  },
  transferButton: {
    marginTop: 20,
    backgroundColor: '#da9502ff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignSelf: 'center',
    minWidth: 160,
  },
  transferText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  resumen: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 16,
    borderRadius: 16,
    elevation: 4, // sombra Android
    shadowColor: '#000', // sombra iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  resumenTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  movRow: {
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 12,
  },
  movFecha: {
    fontSize: 12,
    color: '#999',
  },
  movDesc: {
    fontSize: 15,
    color: '#333',
  },
  movValor: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: '#aaa',
    marginHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 40,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
