import React, { useState } from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../services/api';
import styles from './TransferirScreenStyles';

export default function TransferirScreen() {
    const navigation = useNavigation();
    const [celular, setCelular] = useState('');
    const [monto, setMonto] = useState('');

    const handleTransferir = async () => {
        if (!/^\d{10}$/.test(celular)) {
            Alert.alert('Error', 'El número de celular debe tener 10 dígitos.');
            return;
        }

        const valor = parseFloat(monto.replace(',', '.'));
        if (isNaN(valor) || valor <= 0) {
            Alert.alert('Error', 'El monto debe ser un número válido y mayor a cero.');
            return;
        }

        try {
            await api.post('/transferir', {
                celular_destino: celular,
                monto: valor,
            });

            Alert.alert('Éxito', 'Transferencia realizada');
            navigation.navigate('Home', { reload: true });

        } catch (error: any) {
            const { response } = error;

            // Default fallback
            let msg = 'Ocurrió un error al transferir';

            if (response?.data?.error?.code) {
                const code = response.data.error.code;

                switch (code) {
                    case 'SALDO_INSUFICIENTE':
                        msg = 'No tienes saldo suficiente para realizar la transferencia';
                        break;
                    case 'SELF_TRANSFER_NOT_ALLOWED':
                        msg = 'No puedes transferirte dinero a ti mismo';
                        break;
                    case 'DESTINO_NO_EXISTE':
                        msg = 'El número destino no existe';
                        break;
                    default:
                        msg = response.data.error.message || msg;
                }
            }

            Alert.alert('Error', msg);
        }
    };


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.container}
        >
            <Text style={styles.title}>Realizar transferencia</Text>

            <Text style={styles.label}>Número de celular destino</Text>
            <TextInput
                style={styles.input}
                placeholder="Ej: 3001234567"
                keyboardType="number-pad"
                maxLength={10}
                value={celular}
                onChangeText={setCelular}
            />

            <Text style={styles.label}>Monto a transferir</Text>
            <TextInput
                style={styles.input}
                placeholder="Ej: 10000"
                keyboardType="decimal-pad"
                value={monto}
                onChangeText={setMonto}
            />

            <TouchableOpacity style={styles.button} onPress={handleTransferir}>
                <Text style={styles.buttonText}>Transferir</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}
