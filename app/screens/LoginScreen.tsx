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
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 6;

const schema = Yup.object().shape({
  phone: Yup.string()
    .required('El número es obligatorio')
    .matches(/^\d{10}$/, 'Debe tener exactamente 10 dígitos'),
});

export default function LoginScreen() {
  const navigation = useNavigation();
  const { login } = useAuth();
  const [otpEnabled, setOtpEnabled] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const ref = useBlurOnFulfill({ value: otpValue, cellCount: CELL_COUNT });
  const [propsOtp, getCellOnLayoutHandler] = useClearByFocusCell({
    value: otpValue,
    setValue: setOtpValue,
  });

  const {
    control,
    handleSubmit,
    watch,
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

  const handleOtpSubmit = async () => {
    try {
      const response = await api.post('/otp', {
        celular: watch('phone'),
        otp: otpValue,
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

        {/* TELÉFONO */}
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
          <Text style={styles.primaryButtonText}>Vamos</Text>
        </TouchableOpacity>

        {/* OTP */}
        {otpEnabled && (
          <>
            <Text style={styles.otpLabel}>Ingresa el código OTP</Text>
            <CodeField
              ref={ref}
              {...propsOtp}
              value={otpValue}
              onChangeText={setOtpValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <View
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}
                >
                  <Text style={styles.cellText}>
                    {symbol || (isFocused ? <Cursor /> : '')}
                  </Text>
                </View>
              )}
            />

            <TouchableOpacity
              style={[styles.primaryButton, { marginTop: 20 }]}
              onPress={handleOtpSubmit}
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
