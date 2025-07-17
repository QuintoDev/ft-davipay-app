import React from 'react';
import { View, Text } from 'react-native';
import dayjs from 'dayjs';
import styles from './MovimientoCardStyles';

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
