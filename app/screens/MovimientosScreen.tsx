import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import styles from './MovimientosScreenStyles';

export default function MovimientosScreen() {
  const { logout } = useAuth();
  const [transferencias, setTransferencias] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const cargarMovimientos = async (pagina = 1) => {
    if (loading || (pagina !== 1 && transferencias.length >= total)) return;

    setLoading(true);
    try {
      const response = await api.get(`/transferencias?page=${pagina}&limit=10`);
      const { transferencias: nuevos, total: totalItems } = response.data.data;

      setTransferencias(pagina === 1 ? nuevos : [...transferencias, ...nuevos]);
      setTotal(totalItems);
      setPage(pagina);
    } catch (error: any) {
      if (error.response?.status === 401) {
        Alert.alert('Sesión expirada', 'Por favor inicia sesión nuevamente');
        logout();
      } else {
        Alert.alert('Error', 'No se pudieron cargar los movimientos');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarMovimientos(1);
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.item}>
      <Text style={styles.fecha}>{formatFecha(item.fecha)}</Text>
      <Text style={styles.desc}>{getDescripcion(item)}</Text>
      <Text
        style={[
          styles.valor,
          { color: item.tipo === 'RECIBIDA' ? '#007b00' : '#c90013' },
        ]}
      >
        {item.tipo === 'RECIBIDA' ? '+' : '-'}$
        {item.valor.toLocaleString('es-CO')}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Movimientos</Text>

      <FlatList
        data={transferencias}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={() => cargarMovimientos(page + 1)}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          loading ? <ActivityIndicator size="small" color="#c90013" /> : null
        }
      />
    </View>
  );
}

function formatFecha(fechaISO: string) {
  const date = new Date(fechaISO);
  return `${date.getDate()} ${date.toLocaleString('es-CO', { month: 'short' })}`;
}

function getDescripcion(mov: any) {
  if (mov.estado !== 'EXITOSA') return 'Transferencia fallida';
  return mov.tipo === 'RECIBIDA'
    ? `Transferencia de ${mov.origen}`
    : `Transferencia a ${mov.destino}`;
}
