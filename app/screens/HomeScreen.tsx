import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import MovimientoCard from '../components/MovimientoCard';
import { Ionicons } from '@expo/vector-icons';
import { useLayoutEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import styles from './HomeScreenStyles';

export default function HomeScreen({ navigation }: any) {
  const { logout } = useAuth();
  const [saldo, setSaldo] = useState<number | null>(null);
  const [movimientos, setMovimientos] = useState<any[]>([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={logout} style={{ marginRight: 16 }}>
          <Ionicons name="log-out-outline" size={24} color="#ffffffff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);


  const cargarDatos = async () => {
    try {
      const saldoResp = await api.get('/saldo');
      setSaldo(saldoResp.data.data?.saldo);

      const movsResp = await api.get('/transferencias');
      setMovimientos(movsResp.data.data?.transferencias || []);
    } catch (error: any) {
      if (error.response?.status === 401) {
        Alert.alert('Sesión expirada', 'Por favor inicia sesión nuevamente');
        logout();
      } else {
        Alert.alert('Error', 'No se pudieron obtener los datos');
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      cargarDatos();
    }, [])
  );

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

        {movimientos.length > 0 ? (
          movimientos.slice(0, 2).map((mov: any) => (
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

        {movimientos.length > 2 && (
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
