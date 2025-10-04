import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';

export default function Register() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!fullName.trim()) {
      Alert.alert('Erro', 'Por favor, informe seu nome completo');
      return false;
    }
    if (!email.trim()) {
      Alert.alert('Erro', 'Por favor, informe seu email');
      return false;
    }
    if (!phone.trim()) {
      Alert.alert('Erro', 'Por favor, informe seu telefone');
      return false;
    }
    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres');
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return false;
    }
    if (!acceptTerms) {
      Alert.alert('Erro', 'Você deve aceitar os termos de uso');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    // Simular cadastro
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Sucesso!',
        'Cadastro realizado com sucesso! Você receberá um código de verificação.',
        [
          {
            text: 'OK',
            onPress: () => router.push('/(auth)'),
          },
        ]
      );
    }, 1500);
  };

  const handleSocialRegister = (provider: string) => {
    Alert.alert('Cadastro Social', `Cadastro com ${provider} em desenvolvimento`);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <ScrollView
        className="flex-grow px-6 pt-15 pb-8"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <View className="items-center mb-6">
          <Image
            source={require('../../assets/images/icon2.png')}
            className="w-20 h-20"
            resizeMode="contain"
          />
        </View>

        {/* Título */}
        <Text className="text-[28px] text-center text-slate-800 mb-2" style={{ fontFamily: 'Poppins_700Bold' }}>
          Criar Conta
        </Text>
        <Text className="text-sm text-center text-slate-600 mb-8" style={{ fontFamily: 'Poppins_400Regular' }}>
          Preencha seus dados para começar
        </Text>

        {/* Form Fields */}
        <View className="mb-6">
          {/* Full Name */}
          <View className="mb-5">
            <Text className="text-sm font-bold text-slate-800 mb-2" style={{ fontFamily: 'Poppins_700Bold' }}>
              <Ionicons name="person-outline" size={16} color="#64748B" /> Nome Completo
            </Text>
            <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 gap-3">
              <Ionicons name="person-outline" size={20} color="#64748B" />
              <TextInput
                className="flex-1 text-base text-slate-800"
                style={{ fontFamily: 'Poppins_400Regular' }}
                placeholder="Seu nome completo"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
                autoComplete="name"
                placeholderTextColor="#94A3B8"
              />
            </View>
          </View>

          {/* Email */}
          <View className="mb-5">
            <Text className="text-sm font-bold text-slate-800 mb-2" style={{ fontFamily: 'Poppins_700Bold' }}>
              <Ionicons name="mail-outline" size={16} color="#64748B" /> Email
            </Text>
            <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 gap-3">
              <Ionicons name="mail-outline" size={20} color="#64748B" />
              <TextInput
                className="flex-1 text-base text-slate-800"
                style={{ fontFamily: 'Poppins_400Regular' }}
                placeholder="seu@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                placeholderTextColor="#94A3B8"
              />
            </View>
          </View>

          {/* Phone */}
          <View className="mb-5">
            <Text className="text-sm font-bold text-slate-800 mb-2" style={{ fontFamily: 'Poppins_700Bold' }}>
              <Ionicons name="call-outline" size={16} color="#64748B" /> Telefone
            </Text>
            <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 gap-3">
              <Ionicons name="call-outline" size={20} color="#64748B" />
              <TextInput
                className="flex-1 text-base text-slate-800"
                style={{ fontFamily: 'Poppins_400Regular' }}
                placeholder="(00) 00000-0000"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                autoComplete="tel"
                placeholderTextColor="#94A3B8"
              />
            </View>
          </View>

          {/* Password */}
          <View className="mb-5">
            <Text className="text-sm font-bold text-slate-800 mb-2" style={{ fontFamily: 'Poppins_700Bold' }}>
              <Ionicons name="lock-closed-outline" size={16} color="#64748B" /> Senha
            </Text>
            <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 gap-3">
              <Ionicons name="lock-closed-outline" size={20} color="#64748B" />
              <TextInput
                className="flex-1 text-base text-slate-800"
                style={{ fontFamily: 'Poppins_400Regular' }}
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoComplete="password"
                placeholderTextColor="#94A3B8"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#64748B"
                />
              </TouchableOpacity>
            </View>
            <Text className="text-xs text-slate-600 mt-1 ml-1" style={{ fontFamily: 'Poppins_400Regular' }}>
              Mínimo de 6 caracteres
            </Text>
          </View>

          {/* Confirm Password */}
          <View className="mb-5">
            <Text className="text-sm font-bold text-slate-800 mb-2" style={{ fontFamily: 'Poppins_700Bold' }}>
              <Ionicons name="lock-closed-outline" size={16} color="#64748B" /> Confirmar Senha
            </Text>
            <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 gap-3">
              <Ionicons name="lock-closed-outline" size={20} color="#64748B" />
              <TextInput
                className="flex-1 text-base text-slate-800"
                style={{ fontFamily: 'Poppins_400Regular' }}
                placeholder="••••••••"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                autoComplete="password"
                placeholderTextColor="#94A3B8"
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons
                  name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#64748B"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Terms and Conditions */}
          <TouchableOpacity
            className="flex-row items-center mt-2"
            onPress={() => setAcceptTerms(!acceptTerms)}
            activeOpacity={0.8}
          >
            <View className={`w-6 h-6 border-2 border-slate-200 rounded-lg mr-3 items-center justify-center ${
              acceptTerms ? 'bg-teal-600 border-teal-600' : ''
            }`}>
              {acceptTerms && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
            </View>
            <Text className="flex-1 text-xs text-slate-600 leading-[18px]" style={{ fontFamily: 'Poppins_400Regular' }}>
              Aceito os{' '}
              <Text className="text-teal-600 font-bold" style={{ fontFamily: 'Poppins_700Bold' }}>
                Termos de Uso
              </Text>
              {' '}e{' '}
              <Text className="text-teal-600 font-bold" style={{ fontFamily: 'Poppins_700Bold' }}>
                Política de Privacidade
              </Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* Register Button */}
        <TouchableOpacity
          className="w-full rounded-[28px] overflow-hidden shadow-lg mb-6"
          onPress={handleRegister}
          disabled={loading}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#65BF7A', '#39B2A7', '#3290CD']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="py-[18px] px-8 items-center justify-center"
          >
            {loading ? (
              <Text className="text-white text-base font-bold tracking-wider" style={{ fontFamily: 'Poppins_700Bold' }}>
                CRIANDO CONTA...
              </Text>
            ) : (
              <Text className="text-white text-base font-bold tracking-wider" style={{ fontFamily: 'Poppins_700Bold' }}>
                CRIAR CONTA
              </Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center my-6">
          <View className="flex-1 h-px bg-slate-200" />
          <Text className="text-xs text-slate-600 mx-4" style={{ fontFamily: 'Poppins_400Regular' }}>
            ou cadastre-se com
          </Text>
          <View className="flex-1 h-px bg-slate-200" />
        </View>

        {/* Social Register Buttons */}
        <View className="flex-row justify-center gap-4 mb-8">
          <TouchableOpacity
            className="w-14 h-14 bg-slate-50 border border-slate-200 rounded-2xl items-center justify-center shadow-sm"
            onPress={() => handleSocialRegister('Google')}
            activeOpacity={0.8}
          >
            <Ionicons name="logo-google" size={24} color="#DB4437" />
          </TouchableOpacity>

          <TouchableOpacity
            className="w-14 h-14 bg-slate-50 border border-slate-200 rounded-2xl items-center justify-center shadow-sm"
            onPress={() => handleSocialRegister('Facebook')}
            activeOpacity={0.8}
          >
            <Ionicons name="logo-facebook" size={24} color="#4267B2" />
          </TouchableOpacity>

          <TouchableOpacity
            className="w-14 h-14 bg-slate-50 border border-slate-200 rounded-2xl items-center justify-center shadow-sm"
            onPress={() => handleSocialRegister('Apple')}
            activeOpacity={0.8}
          >
            <Ionicons name="logo-apple" size={24} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* Login Link */}
        <View className="flex-row justify-center items-center">
          <Text className="text-sm text-slate-600" style={{ fontFamily: 'Poppins_400Regular' }}>
            Já tem uma conta?{' '}
          </Text>
          <Link href="/(auth)" asChild>
            <TouchableOpacity>
              <MaskedView
                maskElement={
                  <Text className="text-sm font-bold" style={{ fontFamily: 'Poppins_700Bold' }}>
                    Entrar
                  </Text>
                }
              >
                <LinearGradient
                  colors={['#65BF7A', '#39B2A7', '#3290CD']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text className="text-sm font-bold opacity-0" style={{ fontFamily: 'Poppins_700Bold' }}>
                    Entrar
                  </Text>
                </LinearGradient>
              </MaskedView>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
