import { useState } from "react";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useForm, Controller } from "react-hook-form";
import { loginSchema } from "@/utils/authValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Text, View, TouchableOpacity, StatusBar, Dimensions } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { Feather } from "@expo/vector-icons";

import Input from "@/components/Input";
import Button from "@/components/Button";
import AuthModal from "@/components/AuthModal";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get('window');

import { Image } from 'react-native';

import icon from '../../assets/images/icon2.png';

interface LoginForm {
    email: string;
    password: string;
}

export default function Login() {
    const [loading, setLoading] = useState(false);
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [warningModalVisible, setWarningModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const { login } = useAuth();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        resolver: yupResolver(loginSchema),
        mode: "onBlur",
    });

    const onSubmit = async (data: LoginForm) => {
        setLoading(true);
        try {
            await login(data.email, data.password);
            setSuccessModalVisible(true);
            setTimeout(() => {
                router.replace("/(client)");
            }, 2000);
        } catch (error: unknown) {
            let message = "Ocorreu um erro. Verifique suas credenciais e tente novamente.";

            if (error instanceof Error) {
                const errorCode = (error as any).code;
                switch (errorCode) {
                    case "auth/invalid-email":
                        message = "E-mail inválido.";
                        break;
                    case "auth/user-not-found":
                        message = "Usuário não encontrado.";
                        break;
                    case "auth/wrong-password":
                        message = "Senha incorreta.";
                        break;
                    case "auth/invalid-credential":
                        message = "Credenciais inválidas.";
                        break;
                    default:
                        message = error.message;
                }
            }
            setErrorMessage(message);
            setWarningModalVisible(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1">
            {/* Gradient Background */}
            <LinearGradient 
                colors={["#65BF7A", "#39B2A7", "#3290CD"]} 
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="flex-1 w-full"
            >
                <StatusBar barStyle="light-content" backgroundColor="#65BF7A" />
                
                {/* Floating Shapes for Modern Design */}
                <View className="absolute top-20 right-10 w-20 h-20 rounded-full bg-white/10" />
                <View className="absolute top-40 left-8 w-12 h-12 rounded-full bg-white/5" />
                <View className="absolute bottom-60 right-20 w-16 h-16 rounded-full bg-white/10" />
                
                <View className="flex-1 justify-center px-6">
                    {/* Header Section */}
                    <View className="items-center mb-12">
                    
                        <Image source={icon} className="" />
                  
                        <Text className="text-white text-3xl font-bold mb-3 text-center">
                            Bem-vindo ao Higienix
                        </Text>
                        <Text className="text-white/80 text-base text-center leading-6">
                            Sua plataforma de limpeza profissional{"\n"}
                            Faça login para continuar
                        </Text>
                    </View>

                    {/* Login Card */}
                    <View className="bg-white/95 backdrop-blur-lg rounded-3xl p-6 mx-2 shadow-2xl border border-white/20">
                        <View className="items-center mb-6">
                            <View className="w-12 h-1 bg-gradient-to-r from-[#65BF7A] to-[#39B2A7] rounded-full" />
                        </View>

                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                                <Input
                                    placeholder="Digite seu e-mail"
                                    keyboardType="email-address"
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    error={error?.message}
                                    nameIcon="mail"
                                />
                            )}
                        />
                        
                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                                <Input
                                    placeholder="Digite sua senha"
                                    secureTextEntry
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    error={error?.message}
                                    nameIcon="lock"
                                    className="mt-4"
                                />
                            )}
                        />
                        
                        <TouchableOpacity 
                            onPress={() => router.push("/(auth)/forgot-password")}
                            className="self-end mt-3 mb-6"
                        >
                            <Text className="text-[#39B2A7] font-semibold text-sm">
                                Esqueceu a senha?
                            </Text>
                        </TouchableOpacity>

                        <Button 
                            title="Entrar" 
                            onPress={handleSubmit(onSubmit)} 
                            disabled={loading} 
                            loading={loading} 
                        />
                    </View>

                    {/* Register Link */}
                    <View className="flex-row justify-center mt-8 px-4">
                        <Text className="text-white/80 text-base">Não tem uma conta? </Text>
                        <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
                            <Text className="text-white font-bold text-base underline">
                                Cadastre-se
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Footer */}
                    <View className="items-center mt-8 mb-4">
                        <Text className="text-white/60 text-xs text-center">
                            © 2025 Higienix. Todos os direitos reservados.
                        </Text>
                    </View>
                </View>

                <AuthModal
                    visible={successModalVisible}
                    type="success"
                    title="Sucesso!"
                    message="Login efetuado com sucesso!"
                    primaryButtonText="Ok"
                    onPrimaryButtonPress={() => setSuccessModalVisible(false)}
                    onClose={() => setSuccessModalVisible(false)}
                />

                <AuthModal
                    visible={warningModalVisible}
                    type="warning"
                    title="Erro no login"
                    message={errorMessage}
                    primaryButtonText="Ok"
                    onPrimaryButtonPress={() => setWarningModalVisible(false)}
                    onClose={() => setWarningModalVisible(false)}
                />
            </LinearGradient>
        </SafeAreaView>
    );
}