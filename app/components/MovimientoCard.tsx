import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import dayjs from 'dayjs';

type Props = {
  fecha: string;
  valor: number;
  tipo: 'ENVIADA' | 'RECIBIDA';
  estado: 'EXITOSA' | 'FALLIDA';
  origen: string;
  destino: string | null;
};

export default function MovimientoCard({ fecha, valor, tipo, estado, origen, destino }: Props) {
  const fechaFormateada = dayjs(fecha).format('DD MMM');
  const esExitosa = estado === 'EXITOSA';

  let descripcion = 'Transferencia';
  let valorTexto = `$${valor.toLocaleString('es-CO')}`;
  let valorEstilo = styles.valorEnviado;

  if (!esExitosa) {
    descripcion = 'Transferencia fallida';
  } else if (tipo === 'RECIBIDA') {
    descripcion = `Transferencia de ${origen}`;
    valorTexto = `+ ${valorTexto}`;
    valorEstilo = styles.valorRecibido;
  } else {
    descripcion = `Transferencia a ${destino}`;
    valorTexto = `- ${valorTexto}`;
  }

  return (
    <View style={styles.card}>
      <Text style={styles.fecha}>{fechaFormateada}</Text>
      <Text style={[styles.descripcion, !esExitosa && styles.fallida]}>{descripcion}</Text>
      <Text style={[styles.valor, valorEstilo]}>{valorTexto}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  fecha: {
    fontSize: 12,
    color: '#999',
  },
  descripcion: {
    fontSize: 15,
    color: '#333',
  },
  fallida: {
    color: '#999',
  },
  valor: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 2,
  },
  valorEnviado: {
    color: '#c90013',
  },
  valorRecibido: {
    color: '#2e7d32',
  },
});
