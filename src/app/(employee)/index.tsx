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

// Interface para serviços atribuídos
interface AssignedService {
  id: string;
  type: string;
  icon: string;
  clientName: string;
  address: string;
  date: string;
  time: string;
  status: "pending" | "in_progress" | "completed";
  price: number;
  estimatedDuration: string;
  priority: "low" | "medium" | "high";
}

// Interface para notificações
interface Notification {
  id: string;
  type: "new_service" | "status_update" | "payment" | "rating";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

// Dados mock dos serviços atribuídos
const assignedServicesData: AssignedService[] = [
  {
    id: "SRV001",
    type: "Limpeza Residencial",
    icon: "home",
    clientName: "Maria Silva",
    address: "Rua das Flores, 123 - Centro",
    date: "04/10/2025",
    time: "14:00",
    status: "pending",
    price: 120,
    estimatedDuration: "3h",
    priority: "high"
  },
  {
    id: "SRV002",
    type: "Limpeza Comercial",
    icon: "briefcase",
    clientName: "Empresa XYZ Ltda",
    address: "Av. Paulista, 1000 - Bela Vista",
    date: "04/10/2025",
    time: "16:30",
    status: "in_progress",
    price: 200,
    estimatedDuration: "4h",
    priority: "medium"
  },
  {
    id: "SRV003",
    type: "Limpeza Pós-Obra",
    icon: "tool",
    clientName: "João Santos",
    address: "Rua Nova, 456 - Vila Nova",
    date: "05/10/2025",
    time: "09:00",
    status: "pending",
    price: 300,
    estimatedDuration: "6h",
    priority: "high"
  },
  {
    id: "SRV004",
    type: "Limpeza de Carpetes",
    icon: "layers",
    clientName: "Ana Costa",
    address: "Rua do Comércio, 789 - Centro",
    date: "05/10/2025",
    time: "15:00",
    status: "completed",
    price: 80,
    estimatedDuration: "2h",
    priority: "low"
  }
];

// Dados mock das notificações
const notificationsData: Notification[] = [
  {
    id: "NOT001",
    type: "new_service",
    title: "Novo Serviço Atribuído",
    message: "Limpeza Residencial - Maria Silva às 14:00",
    timestamp: "5 min",
    isRead: false
  },
  {
    id: "NOT002",
    type: "status_update",
    title: "Status Atualizado",
    message: "Serviço SRV002 marcado como em andamento",
    timestamp: "15 min",
    isRead: false
  },
  {
    id: "NOT003",
    type: "payment",
    title: "Pagamento Recebido",
    message: "R$ 80,00 creditados na sua conta",
    timestamp: "1h",
    isRead: true
  },
  {
    id: "NOT004",
    type: "rating",
    title: "Nova Avaliação",
    message: "João Santos te avaliou com 5 estrelas ⭐",
    timestamp: "2h",
    isRead: true
  }
];

// Dados das métricas
const metricsData = [
  {
    id: 1,
    title: "Hoje",
    value: "3",
    subtitle: "Serviços",
    icon: "calendar",
    color: ["#FF6B6B", "#FF8E8E"]
  },
  {
    id: 2,
    title: "Esta Semana",
    value: "R$ 1.240",
    subtitle: "Ganhos",
    icon: "dollar-sign",
    color: ["#4ECDC4", "#6ED5D1"]
  },
  {
    id: 3,
    title: "Avaliação",
    value: "4.9",
    subtitle: "Estrelas",
    icon: "star",
    color: ["#45B7D1", "#74C7E3"]
  }
];

export default function EmployeeDashboard() {
  const [currentMetric, setCurrentMetric] = useState(0);
  const [unreadNotifications, setUnreadNotifications] = useState(
    notificationsData.filter(n => !n.isRead).length
  );
  const metricsScrollRef = useRef<FlatList>(null);

  // Auto-scroll das métricas
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetric(prev => {
        const next = (prev + 1) % metricsData.length;
        metricsScrollRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Simular notificações em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      // Simula uma nova notificação a cada 30 segundos (para demo)
      if (Math.random() > 0.8) {
        setUnreadNotifications(prev => prev + 1);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "#FFA500";
      case "in_progress": return "#39B2A7";
      case "completed": return "#4CAF50";
      default: return "#CCCCCC";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending": return "Pendente";
      case "in_progress": return "Em Andamento";
      case "completed": return "Concluído";
      default: return "Desconhecido";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "#EF4444";
      case "medium": return "#FFA500";
      case "low": return "#4CAF50";
      default: return "#CCCCCC";
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "new_service": return "briefcase";
      case "status_update": return "refresh-cw";
      case "payment": return "dollar-sign";
      case "rating": return "star";
      default: return "bell";
    }
  };

  const renderMetricItem = ({ item }: { item: typeof metricsData[0] }) => (
    <View style={{ width: width - 48 }}>
      <LinearGradient
        colors={item.color as any}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="p-6 mx-2"
        style={{ borderRadius: 16 }}
      >
        <View className="flex-row justify-between items-center">
          <View className="flex-1">
            <Text className="text-white text-3xl font-bold mb-1">
              {item.value}
            </Text>
            <Text className="text-white text-lg font-semibold mb-2">
              {item.title}
            </Text>
            <Text className="text-white/90 text-sm">
              {item.subtitle}
            </Text>
          </View>
          <View className="w-16 h-16 bg-white/20 rounded-full items-center justify-center">
            <Feather name={item.icon as any} size={28} color="#FFFFFF" />
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  const renderServiceItem = ({ item }: { item: AssignedService }) => (
    <TouchableOpacity 
      className="bg-white/95 backdrop-blur-lg rounded-2xl p-4 mr-3 shadow-lg border border-white/20"
      style={{ width: 280 }}

    >
      {/* Header do card */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <View className="w-10 h-10 bg-gradient-to-r from-[#65BF7A] to-[#39B2A7] rounded-xl items-center justify-center mr-3">
            <Feather name={item.icon as any} size={18} color="#FFFFFF" />
          </View>
          <View className="flex-1">
            <Text className="text-gray-800 text-sm font-bold" numberOfLines={1}>
              {item.type}
            </Text>
            <Text className="text-gray-600 text-xs">
              #{item.id}
            </Text>
          </View>
        </View>
        
        {/* Indicador de prioridade */}
        <View 
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: getPriorityColor(item.priority) }}
        />
      </View>

      {/* Informações do cliente */}
      <View className="mb-3">
        <Text className="text-gray-800 text-sm font-semibold mb-1">
          👤 {item.clientName}
        </Text>
        <Text className="text-gray-600 text-xs mb-1" numberOfLines={2}>
          📍 {item.address}
        </Text>
        <Text className="text-gray-600 text-xs">
          🕐 {item.date} às {item.time} ({item.estimatedDuration})
        </Text>
      </View>

      {/* Status e preço */}
      <View className="flex-row items-center justify-between">
        <View 
          className="px-2 py-1 rounded-full"
          style={{ backgroundColor: `${getStatusColor(item.status)}20` }}
        >
          <Text 
            className="text-xs font-semibold"
            style={{ color: getStatusColor(item.status) }}
          >
            {getStatusLabel(item.status)}
          </Text>
        </View>
        <Text className="text-[#39B2A7] text-sm font-bold">
          R$ {item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderNotificationItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity className="bg-white/95 backdrop-blur-lg rounded-2xl p-4 mr-3 shadow-lg border border-white/20" style={{ width: 260 }}>
      <View className="flex-row items-start">
        <View className={`w-10 h-10 rounded-xl items-center justify-center mr-3 ${!item.isRead ? 'bg-[#39B2A7]' : 'bg-gray-300'}`}>
          <Feather name={getNotificationIcon(item.type) as any} size={16} color="#FFFFFF" />
        </View>
        <View className="flex-1">
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-gray-800 text-sm font-bold flex-1" numberOfLines={1}>
              {item.title}
            </Text>
            <Text className="text-gray-500 text-xs ml-2">
              {item.timestamp}
            </Text>
          </View>
          <Text className="text-gray-600 text-xs" numberOfLines={2}>
            {item.message}
          </Text>
          {!item.isRead && (
            <View className="w-2 h-2 bg-[#39B2A7] rounded-full mt-2" />
          )}
        </View>
      </View>
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
                  Olá, Funcionário! 👨‍💼
                </Text>
                <Text className="text-white/80 text-sm">
                  Seus serviços de hoje te aguardam
                </Text>
              </View>
              <TouchableOpacity className="w-10 h-10 bg-white/20 rounded-full items-center justify-center relative">
                <Feather name="bell" size={20} color="#FFFFFF" />
                {unreadNotifications > 0 && (
                  <View className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full items-center justify-center">
                    <Text className="text-white text-xs font-bold">
                      {unreadNotifications > 9 ? '9+' : unreadNotifications}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Métricas */}
          <View className="mb-6">
            <FlatList
              ref={metricsScrollRef}
              data={metricsData}
              renderItem={renderMetricItem}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16 }}
              onMomentumScrollEnd={(event) => {
                const index = Math.round(event.nativeEvent.contentOffset.x / (width - 48 + 16));
                setCurrentMetric(index);
              }}
            />
            
            {/* Indicadores das métricas */}
            <View className="flex-row justify-center mt-4">
              {metricsData.map((_, index) => (
                <View
                  key={index}
                  className={`w-2 h-2 rounded-full mx-1 ${
                    index === currentMetric ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </View>
          </View>

          {/* Status Rápido */}
          <View className="px-6 mb-6">
            <View className="bg-white/95 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20">
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-gray-800 text-xl font-bold mb-2">
                    Status do Dia
                  </Text>
                  <Text className="text-gray-600 text-sm">
                    3 serviços agendados, 1 em andamento
                  </Text>
                </View>
                <View className="w-16 h-16 bg-gradient-to-r from-[#65BF7A] to-[#39B2A7] rounded-2xl items-center justify-center ml-4">
                  <Feather name="activity" size={28} color="#FFFFFF" />
                </View>
              </View>
            </View>
          </View>

          {/* Lista de Serviços Atribuídos */}
          <View className="mb-6">
            <View className="px-6 mb-4">
              <Text className="text-white text-xl font-bold mb-2">
                Serviços Atribuídos
              </Text>
              <Text className="text-white/80 text-sm">
                Seus agendamentos de hoje e próximos dias
              </Text>
            </View>
            
            <FlatList
              data={assignedServicesData}
              renderItem={renderServiceItem}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 24 }}
            />
          </View>

          {/* Notificações em Tempo Real */}
          <View className="mb-6">
            <View className="px-6 mb-4">
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="text-white text-xl font-bold mb-2">
                    Notificações
                  </Text>
                  <Text className="text-white/80 text-sm">
                    Atualizações em tempo real
                  </Text>
                </View>
                {unreadNotifications > 0 && (
                  <View className="px-3 py-1 bg-red-500 rounded-full">
                    <Text className="text-white text-xs font-bold">
                      {unreadNotifications} nova{unreadNotifications > 1 ? 's' : ''}
                    </Text>
                  </View>
                )}
              </View>
            </View>
            
            <FlatList
              data={notificationsData}
              renderItem={renderNotificationItem}
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
              >
                <View className="w-10 h-10 bg-gradient-to-r from-[#65BF7A] to-[#39B2A7] rounded-xl items-center justify-center mb-3">
                  <Feather name="calendar" size={18} color="#FFFFFF" />
                </View>
                <Text className="text-gray-800 text-sm font-semibold mb-1">
                  Minha Agenda
                </Text>
                <Text className="text-gray-600 text-xs">
                  Ver cronograma
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                className="bg-white/95 backdrop-blur-lg rounded-2xl p-4 flex-1 ml-2 shadow-lg border border-white/20"
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