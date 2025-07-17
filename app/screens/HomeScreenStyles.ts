import { StyleSheet } from 'react-native';

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
    elevation: 4,
    shadowColor: '#000',
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

export default styles;
