import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f6f9',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    elevation: 2,
  },
  fecha: {
    fontSize: 12,
    color: '#777',
  },
  desc: {
    fontSize: 15,
    color: '#333',
    marginVertical: 4,
  },
  valor: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
