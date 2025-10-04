import React, { useState, useRef, useEffect } from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  StatusBar, 
  TouchableOpacity, 
  Dimensions,
  FlatList,
  Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

const { width } = Dimensions.get('window');

// Dados do banner promocional
const promoData = [
  {
    id: 1,
    title: "50% OFF",
    subtitle: "Primeira Limpeza",
    description: "Para novos clientes",
    color: ["#FF6B6B", "#FF8E8E"]
  },
  {
    id: 2,
    title: "Limpeza Completa",
    subtitle: "3x sem juros",
    description: "Parcelamento facilitado",
    color: ["#4ECDC4", "#6ED5D1"]
  },
  {
    id: 3,
    title: "Frete Grátis",
    subtitle: "Acima de R$ 200",
    description: "Válido para toda região",
    color: ["#45B7D1", "#74C7E3"]
  }
];

// Dados dos serviços
const servicesData = [
  {
    id: 1,
    name: "Limpeza Residencial",
    icon: "home",
    description: "Limpeza completa da sua casa",
    price: "A partir de R$ 80"
  },
  {
    id: 2,
    name: "Limpeza Comercial",
    icon: "briefcase",
    description: "Escritórios e estabelecimentos",
    price: "A partir de R$ 120"
  },
  {
    id: 3,
    name: "Limpeza Pós-Obra",
    icon: "tool",
    description: "Remoção de entulhos e sujeira",
    price: "A partir de R$ 150"
  },
  {
    id: 4,
    name: "Limpeza de Carpetes",
    icon: "layers",
    description: "Higienização profunda",
    price: "A partir de R$ 60"
  },
  {
    id: 5,
    name: "Limpeza de Vidros",
    icon: "square",
    description: "Janelas e superfícies de vidro",
    price: "A partir de R$ 40"
  },
  {
    id: 6,
    name: "Limpeza Pesada",
    icon: "zap",
    description: "Para situações extremas",
    price: "A partir de R$ 200"
  }
];

export default function HomePage() {
  const [currentPromo, setCurrentPromo] = useState(0);
  const promoScrollRef = useRef<FlatList>(null);

  // Auto-scroll do banner
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromo(prev => {
        const next = (prev + 1) % promoData.length;
        promoScrollRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const renderPromoItem = ({ item }: { item: typeof promoData[0] }) => (
    <View style={{ width: width - 48 }}>
      <LinearGradient
        colors={item.color as any}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-2xl p-6 mx-2"
      >
        <View className="flex-row justify-between items-center">
          <View className="flex-1">
            <Text className="text-white text-2xl font-bold mb-1">
              {item.title}
            </Text>
            <Text className="text-white text-lg font-semibold mb-2">
              {item.subtitle}
            </Text>
            <Text className="text-white/90 text-sm">
              {item.description}
            </Text>
          </View>
          <View className="w-16 h-16 bg-white/20 rounded-full items-center justify-center">
            <Feather name="percent" size={28} color="#FFFFFF" />
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  const renderServiceItem = ({ item }: { item: typeof servicesData[0] }) => (
    <TouchableOpacity 
      className="bg-white/95 backdrop-blur-lg rounded-2xl p-4 mr-3 shadow-lg border border-white/20"
      style={{ width: 160 }}
      onPress={() => router.push("/(client)/schedule")}
    >
      <View className="w-12 h-12 bg-gradient-to-r from-[#65BF7A] to-[#39B2A7] rounded-xl items-center justify-center mb-3">
        <Feather name={item.icon as any} size={20} color="#FFFFFF" />
      </View>
      <Text className="text-gray-800 text-sm font-semibold mb-1" numberOfLines={2}>
        {item.name}
      </Text>
      <Text className="text-gray-600 text-xs mb-2" numberOfLines={2}>
        {item.description}
      </Text>
      <Text className="text-[#39B2A7] text-xs font-bold">
        {item.price}
      </Text>
    </TouchableOpacity>
  );

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
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="px-6 mt-8 mb-6">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-1">
                <Text className="text-white text-2xl font-bold mb-1">
                  Olá, bem-vindo! 👋
                </Text>
                <Text className="text-white/80 text-sm">
                  Que tal agendar uma limpeza hoje?
                </Text>
              </View>
              <TouchableOpacity className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
                <Feather name="bell" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Banner Promocional */}
          <View className="mb-6">
            <FlatList
              ref={promoScrollRef}
              data={promoData}
              renderItem={renderPromoItem}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16 }}
              onMomentumScrollEnd={(event) => {
                const index = Math.round(event.nativeEvent.contentOffset.x / (width - 48 + 16));
                setCurrentPromo(index);
              }}
            />
            
            {/* Indicadores do banner */}
            <View className="flex-row justify-center mt-4">
              {promoData.map((_, index) => (
                <View
                  key={index}
                  className={`w-2 h-2 rounded-full mx-1 ${
                    index === currentPromo ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </View>
          </View>

          {/* Botão Agendar em Destaque */}
          <View className="px-6 mb-6">
            <TouchableOpacity 
              onPress={() => router.push("/(client)/schedule")}
              className="bg-white/95 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20"
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-gray-800 text-xl font-bold mb-2">
                    Agendar Serviço
                  </Text>
                  <Text className="text-gray-600 text-sm">
                    Escolha data, horário e tipo de limpeza
                  </Text>
                </View>
                <View className="w-16 h-16 bg-gradient-to-r from-[#65BF7A] to-[#39B2A7] rounded-2xl items-center justify-center ml-4">
                  <Feather name="calendar" size={28} color="#FFFFFF" />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Lista de Serviços */}
          <View className="mb-6">
            <View className="px-6 mb-4">
              <Text className="text-white text-xl font-bold mb-2">
                Nossos Serviços
              </Text>
              <Text className="text-white/80 text-sm">
                Escolha o serviço ideal para você
              </Text>
            </View>
            
            <FlatList
              data={servicesData}
              renderItem={renderServiceItem}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 24 }}
            />
          </View>

          {/* Seção de Acesso Rápido */}
          <View className="px-6 mb-6">
            <Text className="text-white text-xl font-bold mb-4">
              Acesso Rápido
            </Text>
            
            <View className="flex-row justify-between">
              <TouchableOpacity 
                className="bg-white/95 backdrop-blur-lg rounded-2xl p-4 flex-1 mr-2 shadow-lg border border-white/20"
                onPress={() => router.push("/(client)/my-orders")}
              >
                <View className="w-10 h-10 bg-gradient-to-r from-[#65BF7A] to-[#39B2A7] rounded-xl items-center justify-center mb-3">
                  <Feather name="clipboard" size={18} color="#FFFFFF" />
                </View>
                <Text className="text-gray-800 text-sm font-semibold mb-1">
                  Meus Pedidos
                </Text>
                <Text className="text-gray-600 text-xs">
                  Acompanhe status
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                className="bg-white/95 backdrop-blur-lg rounded-2xl p-4 flex-1 ml-2 shadow-lg border border-white/20"
                onPress={() => router.push("/(client)/settings")}
              >
                <View className="w-10 h-10 bg-gradient-to-r from-[#65BF7A] to-[#39B2A7] rounded-xl items-center justify-center mb-3">
                  <Feather name="user" size={18} color="#FFFFFF" />
                </View>
                <Text className="text-gray-800 text-sm font-semibold mb-1">
                  Meu Perfil
                </Text>
                <Text className="text-gray-600 text-xs">
                  Configurações
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}
