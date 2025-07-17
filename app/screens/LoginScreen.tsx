import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
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
import styles from './LoginScreenStyles';

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
