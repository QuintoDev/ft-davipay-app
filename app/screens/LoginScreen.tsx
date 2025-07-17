import api from '../services/api';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';


const schema = Yup.object().shape({
  phone: Yup.string()
    .required('El número es obligatorio')
    .matches(/^\d{10}$/, 'Debe tener exactamente 10 dígitos'),
  otp: Yup.string()
    .matches(/^\d{6}$/, 'Debe tener 6 dígitos')
    .optional(),
});

export default function LoginScreen() {
  const navigation = useNavigation();
  const [otpEnabled, setOtpEnabled] = useState(false);
   const { login } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handlePhoneSubmit = async (data: any) => {
    try {
      const response = await api.post(
        '/login',
        { celular: data.phone },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        setOtpEnabled(true);
        Alert.alert('OTP enviado', 'Código: 123456');
      } else {
        Alert.alert('Error', 'Número no válido');
      }
    } catch (error: any) {
      Alert.alert(
        'Error',
        error.response?.data?.message || 'No se pudo conectar al servidor'
      );
    }
  };

  const handleOtpSubmit = async (data: any) => {
    try {
      const response = await api.post('/otp', {
        celular: data.phone,
        otp: data.otp,
      });

     
      
      if (response.status === 200 && response.data.data?.token) {
        const { token } = response.data.data;
        if (token) {
          await login(token);
        }
      } else {
        Alert.alert('Error', 'OTP incorrecto o respuesta inválida');
      }
    } catch (error: any) {
      Alert.alert(
        'Error',
        error.response?.data?.message || 'No se pudo validar el OTP'
      );
    }
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.card}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>DaviPay</Text>

        {/* Teléfono */}
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Número de celular"
              keyboardType="numeric"
              maxLength={10}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.phone && (
          <Text style={styles.error}>{errors.phone.message}</Text>
        )}

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleSubmit(handlePhoneSubmit)}
        >
          <Text style={styles.primaryButtonText}>Empezar</Text>
        </TouchableOpacity>

        {/* OTP dinámico */}
        {otpEnabled && (
          <>
            <Controller
              control={control}
              name="otp"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Código OTP"
                  keyboardType="numeric"
                  maxLength={6}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.otp && (
              <Text style={styles.error}>{errors.otp.message}</Text>
            )}
            <TouchableOpacity
              style={[styles.primaryButton, { marginTop: 10 }]}
              onPress={handleSubmit(handleOtpSubmit)}
            >
              <Text style={styles.primaryButtonText}>Validar OTP</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

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
    padding: 30,
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
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
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
});
