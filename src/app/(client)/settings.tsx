import React from "react";
import { View, Text, ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";

export default function SettingsPage() {
  return (
    <SafeAreaView className="flex-1">
      <LinearGradient 
        colors={["#65BF7A", "#39B2A7", "#3290CD"]} 
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1"
      >
        <StatusBar barStyle="light-content" backgroundColor="#65BF7A" />
        
        {/* Floating Shapes for Modern Design */}
        <View className="absolute top-20 right-10 w-20 h-20 rounded-full bg-white/10" />
        <View className="absolute top-40 left-8 w-12 h-12 rounded-full bg-white/5" />
        <View className="absolute bottom-60 right-20 w-16 h-16 rounded-full bg-white/10" />
        
        <ScrollView 
          className="flex-1 px-6"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="mt-8">
            <Text className="text-white text-3xl font-bold mb-3">
              Meu Perfil
            </Text>
            <Text className="text-white/80 text-base leading-6 mb-8">
              Gerencie suas informações pessoais
            </Text>
            
            {/* Card do perfil */}
            <View className="bg-white/95 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20 mb-6">
              <View className="items-center mb-4">
                <View className="w-12 h-1 bg-gradient-to-r from-[#65BF7A] to-[#39B2A7] rounded-full" />
              </View>
              <View className="flex-row items-center mb-4">
                <Feather name="user" size={20} color="#39B2A7" />
                <Text className="text-gray-800 text-lg font-semibold ml-2">
                  Configurações de Perfil
                </Text>
              </View>
              <Text className="text-gray-600 text-sm">
                Edite suas informações pessoais e preferências
              </Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}