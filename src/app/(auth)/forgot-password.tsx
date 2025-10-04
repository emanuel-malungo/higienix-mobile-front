import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type RecoveryMethod = 'email' | 'sms';

export default function ForgotPassword() {
  const router = useRouter();
  const [recoveryMethod, setRecoveryMethod] = useState<RecoveryMethod>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    if (recoveryMethod === 'email' && !email) {
      Alert.alert('Erro', 'Por favor, informe seu email');
      return;
    }
    if (recoveryMethod === 'sms' && !phone) {
      Alert.alert('Erro', 'Por favor, informe seu telefone');
      return;
    }

    setLoading(true);
    // Simular envio de código
    setTimeout(() => {
      setLoading(false);
      setCodeSent(true);
      Alert.alert(
        'Código Enviado!',
        recoveryMethod === 'email'
          ? 'Verifique seu email para o código de recuperação'
          : 'Um SMS foi enviado para seu telefone com o código de recuperação'
      );
    }, 1500);
  };

  const handleResetPassword = async () => {
    if (!verificationCode) {
      Alert.alert('Erro', 'Por favor, informe o código de verificação');
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    setLoading(true);
    // Simular reset de senha
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Sucesso!',
        'Sua senha foi redefinida com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => router.push('/(auth)'),
          },
        ]
      );
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="lock-closed-outline" size={40} color="#39B2A7" />
          </View>
        </View>

        {/* Título */}
        <Text style={styles.title}>
          {codeSent ? 'Redefinir Senha' : 'Recuperar Senha'}
        </Text>
        <Text style={styles.subtitle}>
          {codeSent
            ? 'Digite o código e sua nova senha'
            : 'Escolha como deseja recuperar sua senha'}
        </Text>

        {!codeSent ? (
          <>
            {/* Toggle Recovery Method */}
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  recoveryMethod === 'email' && styles.toggleButtonActive,
                ]}
                onPress={() => setRecoveryMethod('email')}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={recoveryMethod === 'email' ? '#FFFFFF' : '#64748B'}
                />
                <Text
                  style={[
                    styles.toggleText,
                    recoveryMethod === 'email' && styles.toggleTextActive,
                  ]}
                >
                  Email
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  recoveryMethod === 'sms' && styles.toggleButtonActive,
                ]}
                onPress={() => setRecoveryMethod('sms')}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="chatbubble-outline"
                  size={20}
                  color={recoveryMethod === 'sms' ? '#FFFFFF' : '#64748B'}
                />
                <Text
                  style={[
                    styles.toggleText,
                    recoveryMethod === 'sms' && styles.toggleTextActive,
                  ]}
                >
                  SMS
                </Text>
              </TouchableOpacity>
            </View>

            {/* Form Fields */}
            <View style={styles.formContainer}>
              {recoveryMethod === 'email' ? (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>
                    <Ionicons name="mail-outline" size={16} color="#64748B" /> Email
                  </Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="mail-outline" size={20} color="#64748B" />
                    <TextInput
                      style={styles.input}
                      placeholder="seu@email.com"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoComplete="email"
                      placeholderTextColor="#94A3B8"
                    />
                  </View>
                  <Text style={styles.hint}>
                    Enviaremos um código de recuperação para este email
                  </Text>
                </View>
              ) : (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>
                    <Ionicons name="call-outline" size={16} color="#64748B" /> Telefone
                  </Text>
                  <View style={styles.inputContainer}>
                    <Ionicons name="call-outline" size={20} color="#64748B" />
                    <TextInput
                      style={styles.input}
                      placeholder="(00) 00000-0000"
                      value={phone}
                      onChangeText={setPhone}
                      keyboardType="phone-pad"
                      autoComplete="tel"
                      placeholderTextColor="#94A3B8"
                    />
                  </View>
                  <Text style={styles.hint}>
                    Enviaremos um SMS com o código de recuperação
                  </Text>
                </View>
              )}
            </View>

            {/* Send Code Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSendCode}
              disabled={loading}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#65BF7A', '#39B2A7', '#3290CD']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                {loading ? (
                  <Text style={styles.buttonText}>ENVIANDO...</Text>
                ) : (
                  <Text style={styles.buttonText}>ENVIAR CÓDIGO</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {/* Reset Password Form */}
            <View style={styles.formContainer}>
              {/* Verification Code */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  <Ionicons name="key-outline" size={16} color="#64748B" /> Código de Verificação
                </Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="key-outline" size={20} color="#64748B" />
                  <TextInput
                    style={styles.input}
                    placeholder="000000"
                    value={verificationCode}
                    onChangeText={setVerificationCode}
                    keyboardType="number-pad"
                    maxLength={6}
                    placeholderTextColor="#94A3B8"
                  />
                </View>
              </View>

              {/* New Password */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  <Ionicons name="lock-closed-outline" size={16} color="#64748B" /> Nova Senha
                </Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="lock-closed-outline" size={20} color="#64748B" />
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry={!showNewPassword}
                    placeholderTextColor="#94A3B8"
                  />
                  <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                    <Ionicons
                      name={showNewPassword ? 'eye-outline' : 'eye-off-outline'}
                      size={20}
                      color="#64748B"
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.hint}>Mínimo de 6 caracteres</Text>
              </View>

              {/* Confirm Password */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  <Ionicons name="lock-closed-outline" size={16} color="#64748B" /> Confirmar Senha
                </Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="lock-closed-outline" size={20} color="#64748B" />
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
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
            </View>

            {/* Reset Password Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleResetPassword}
              disabled={loading}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#65BF7A', '#39B2A7', '#3290CD']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                {loading ? (
                  <Text style={styles.buttonText}>REDEFININDO...</Text>
                ) : (
                  <Text style={styles.buttonText}>REDEFINIR SENHA</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            {/* Resend Code */}
            <TouchableOpacity
              style={styles.resendContainer}
              onPress={() => setCodeSent(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.resendText}>
                Não recebeu o código?{' '}
                <Text style={styles.resendLink}>Reenviar</Text>
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 32,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E6F7F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins_700Bold',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    padding: 4,
    marginBottom: 24,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
  },
  toggleButtonActive: {
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  toggleText: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    color: '#64748B',
  },
  toggleTextActive: {
    color: '#39B2A7',
  },
  formContainer: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#1E293B',
  },
  hint: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#64748B',
    marginTop: 4,
    marginLeft: 4,
  },
  button: {
    width: '100%',
    borderRadius: 28,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    marginBottom: 16,
  },
  gradientButton: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    letterSpacing: 1,
  },
  resendContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  resendText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#64748B',
  },
  resendLink: {
    color: '#39B2A7',
    fontFamily: 'Poppins_700Bold',
  },
});