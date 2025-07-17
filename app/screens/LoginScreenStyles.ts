import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
    elevation: 5,
  },
  logo: {
    height: 70,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    marginBottom: 24,
    fontWeight: 'bold',
    color: '#444',
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  primaryButton: {
    backgroundColor: '#c90013',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
  },
  primaryButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  otpLabel: {
    marginTop: 30,
    fontWeight: '500',
    fontSize: 14,
    alignSelf: 'flex-start',
  },
  codeFieldRoot: {
    marginTop: 20,
    marginBottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cell: {
    width: 40,
    height: 50,
    lineHeight: 48,
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    fontSize: 20,
  },
  focusCell: {
    borderColor: '#c90013',
  },
});

export default styles;
