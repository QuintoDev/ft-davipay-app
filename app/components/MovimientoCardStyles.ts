import { StyleSheet } from 'react-native';

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

export default styles;
