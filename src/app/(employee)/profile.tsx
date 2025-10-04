import React, { useState } from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  StatusBar, 
  TouchableOpacity, 
  Modal,
  Image,
  FlatList,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

// Interface para serviços realizados
interface ServiceHistory {
  id: string;
  type: string;
  icon: string;
  clientName: string;
  address: string;
  date: string;
  duration: string;
  price: number;
  status: "completed" | "cancelled";
  rating?: number;
  clientFeedback?: string;
  images?: string[];
}

// Interface para avaliações recebidas
interface Rating {
  id: string;
  clientName: string;
  clientAvatar: string;
  serviceType: string;
  rating: number;
  comment: string;
  date: string;
  serviceId: string;
}

// Interface para estatísticas do perfil
interface ProfileStats {
  totalServices: number;
  averageRating: number;
  totalEarnings: number;
  completionRate: number;
  responseTime: string;
  clientsSatisfied: number;
}

// Dados mock do histórico de serviços
const serviceHistoryData: ServiceHistory[] = [
  {
    id: "SRV001",
    type: "Limpeza Residencial",
    icon: "home",
    clientName: "Maria Silva",
    address: "Rua das Flores, 123",
    date: "2025-10-01",
    duration: "3h 15min",
    price: 120,
    status: "completed",
    rating: 5,
    clientFeedback: "Excelente trabalho! Casa ficou impecável.",
    images: ["https://via.placeholder.com/300x200"]
  },
  {
    id: "SRV002",
    type: "Limpeza Comercial",
    icon: "briefcase",
    clientName: "Empresa XYZ",
    address: "Av. Paulista, 1000",
    date: "2025-09-28",
    duration: "4h 30min",
    price: 200,
    status: "completed",
    rating: 4,
    clientFeedback: "Bom trabalho, mas poderia ter sido mais rápido.",
    images: []
  },
  {
    id: "SRV003",
    type: "Limpeza Pós-Obra",
    icon: "tool",
    clientName: "João Santos",
    address: "Rua Nova, 456",
    date: "2025-09-25",
    duration: "6h 00min",
    price: 300,
    status: "completed",
    rating: 5,
    clientFeedback: "Superou minhas expectativas! Recomendo muito.",
    images: ["https://via.placeholder.com/300x200", "https://via.placeholder.com/300x200"]
  },
  {
    id: "SRV004",
    type: "Limpeza de Carpetes",
    icon: "layers",
    clientName: "Ana Costa",
    address: "Rua do Comércio, 789",
    date: "2025-09-20",
    duration: "2h 00min",
    price: 80,
    status: "completed",
    rating: 4,
    clientFeedback: "Carpetes ficaram muito limpos, obrigada!",
    images: []
  },
  {
    id: "SRV005",
    type: "Limpeza Residencial",
    icon: "home",
    clientName: "Carlos Mendes",
    address: "Av. Central, 321",
    date: "2025-09-15",
    duration: "3h 45min",
    price: 150,
    status: "cancelled",
    clientFeedback: "Cliente cancelou por motivos pessoais.",
    images: []
  }
];

// Dados mock das avaliações
const ratingsData: Rating[] = [
  {
    id: "RAT001",
    clientName: "Maria Silva",
    clientAvatar: "https://github.com/emanuel-malungo.png",
    serviceType: "Limpeza Residencial",
    rating: 5,
    comment: "Profissional excepcional! Muito cuidadosa e detalhista. Casa ficou perfeita e ela foi super educada. Recomendo para todos!",
    date: "2025-10-01",
    serviceId: "SRV001"
  },
  {
    id: "RAT002",
    clientName: "João Santos",
    clientAvatar: "https://github.com/emanuel-malungo.png",
    serviceType: "Limpeza Pós-Obra",
    rating: 5,
    comment: "Trabalho impecável! Removeu toda a sujeira da obra e deixou tudo brilhando. Pontual e muito profissional.",
    date: "2025-09-25",
    serviceId: "SRV003"
  },
  {
    id: "RAT003",
    clientName: "Ana Costa",
    clientAvatar: "https://github.com/emanuel-malungo.png",
    serviceType: "Limpeza de Carpetes",
    rating: 4,
    comment: "Muito boa profissional. Os carpetes ficaram como novos. Única observação é que chegou 10 minutos atrasada.",
    date: "2025-09-20",
    serviceId: "SRV004"
  },
  {
    id: "RAT004",
    clientName: "Empresa XYZ",
    clientAvatar: "https://github.com/emanuel-malungo.png",
    serviceType: "Limpeza Comercial",
    rating: 4,
    comment: "Serviço de qualidade, mas poderia ter sido mais ágil. No geral, ficamos satisfeitos com o resultado.",
    date: "2025-09-28",
    serviceId: "SRV002"
  },
  {
    id: "RAT005",
    clientName: "Roberto Lima",
    clientAvatar: "https://github.com/emanuel-malungo.png",
    serviceType: "Limpeza Residencial",
    rating: 5,
    comment: "Fantástica! Super recomendo. Chegou no horário, foi muito eficiente e educada. Casa ficou impecável!",
    date: "2025-09-10",
    serviceId: "SRV006"
  }
];

// Estatísticas do perfil
const profileStats: ProfileStats = {
  totalServices: 47,
  averageRating: 4.8,
  totalEarnings: 5680,
  completionRate: 96,
  responseTime: "< 2h",
  clientsSatisfied: 45
};

export default function EmployeeProfilePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "history" | "ratings">("overview");
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceHistory | null>(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState<Rating | null>(null);

  // Calcular estatísticas
  const completedServices = serviceHistoryData.filter(s => s.status === "completed");
  const thisMonthServices = completedServices.filter(s => 
    new Date(s.date).getMonth() === new Date().getMonth()
  );
  const thisMonthEarnings = thisMonthServices.reduce((sum, s) => sum + s.price, 0);

  // Renderizar estrelas
  const renderStars = (rating: number, size: number = 16) => {
    return (
      <View className="flex-row">
        {[1, 2, 3, 4, 5].map((star) => (
          <Feather
            key={star}
            name="star"
            size={size}
            color={star <= rating ? "#FFD700" : "#E0E0E0"}
            style={{ marginRight: 2 }}
          />
        ))}
      </View>
    );
  };

  // Abrir detalhes do serviço
  const openServiceDetails = (service: ServiceHistory) => {
    setSelectedService(service);
    setShowServiceModal(true);
  };

  // Abrir detalhes da avaliação
  const openRatingDetails = (rating: Rating) => {
    setSelectedRating(rating);
    setShowRatingModal(true);
  };

  // Renderizar item do histórico
  const renderHistoryItem = ({ item }: { item: ServiceHistory }) => (
    <TouchableOpacity
      onPress={() => openServiceDetails(item)}
      className="bg-white/95 backdrop-blur-lg rounded-2xl p-4 mb-3 shadow-lg border border-white/20"
    >
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center flex-1">
          <View className="w-10 h-10 bg-gradient-to-r from-[#65BF7A] to-[#39B2A7] rounded-xl items-center justify-center mr-3">
            <Feather name={item.icon as any} size={18} />
          </View>
          <View className="flex-1">
            <Text className="text-gray-800 text-sm font-bold" numberOfLines={1}>
              {item.type}
            </Text>
            <Text className="text-gray-600 text-xs">
              {new Date(item.date).toLocaleDateString('pt-BR')}
            </Text>
          </View>
        </View>
        
        <View className="items-end">
          <Text className="text-[#39B2A7] text-sm font-bold">
            R$ {item.price}
          </Text>
          {item.rating && (
            <View className="flex-row items-center mt-1">
              {renderStars(item.rating, 12)}
              <Text className="text-gray-500 text-xs ml-1">
                {item.rating}
              </Text>
            </View>
          )}
        </View>
      </View>

      <View className="mb-2">
        <Text className="text-gray-600 text-xs" numberOfLines={1}>
          {item.clientName}
        </Text>
        <Text className="text-gray-600 text-xs" numberOfLines={1}>
          {item.address}
        </Text>
        <Text className="text-gray-600 text-xs">
          {item.duration}
        </Text>
      </View>

      <View className={`px-2 py-1 rounded-full self-start ${
        item.status === "completed" ? "bg-green-100" : "bg-red-100"
      }`}>
        <Text className={`text-xs font-semibold ${
          item.status === "completed" ? "text-green-600" : "text-red-600"
        }`}>
          {item.status === "completed" ? "Concluído" : "Cancelado"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  // Renderizar item de avaliação
  const renderRatingItem = ({ item }: { item: Rating }) => (
    <TouchableOpacity
      onPress={() => openRatingDetails(item)}
      className="bg-white/95 backdrop-blur-lg rounded-2xl p-4 mb-3 shadow-lg border border-white/20"
    >
      <View className="flex-row items-start mb-3">
        <Image
          source={{ uri: item.clientAvatar }}
          className="w-12 h-12 rounded-full mr-3"
        />
        <View className="flex-1">
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-gray-800 text-sm font-bold">
              {item.clientName}
            </Text>
            <Text className="text-gray-500 text-xs">
              {new Date(item.date).toLocaleDateString('pt-BR')}
            </Text>
          </View>
          <Text className="text-gray-600 text-xs mb-2">
            {item.serviceType}
          </Text>
          <View className="flex-row items-center mb-2">
            {renderStars(item.rating)}
            <Text className="text-gray-700 text-sm font-semibold ml-2">
              {item.rating}/5
            </Text>
          </View>
        </View>
      </View>
      
      <Text className="text-gray-700 text-sm" numberOfLines={3}>
        "{item.comment}"
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
          className="flex-1 px-6"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="mt-8 mb-6">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-1">
                <Text className="text-white text-2xl font-bold mb-1">
                  Meu Perfil
                </Text>
                <Text className="text-white/80 text-sm">
                  Histórico e avaliações
                </Text>
              </View>
              <TouchableOpacity className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
                <Feather name="settings" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Perfil do Funcionário */}
          <View className="bg-white/95 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20 mb-6">
            <View className="items-center mb-4">
              <View className="w-12 h-1 bg-gradient-to-r from-[#65BF7A] to-[#39B2A7] rounded-full" />
            </View>
            
            <View className="items-center mb-6">
              <Image
                source={{ uri: "https://github.com/emanuel-malungo.png" }}
                className="w-20 h-20 rounded-full mb-3 border-4 border-[#39B2A7]"
              />
              <Text className="text-gray-800 text-xl font-bold">
                Emanuel Malungo
              </Text>
              <Text className="text-gray-600 text-sm">
                Profissional de Limpeza
              </Text>
              <View className="flex-row items-center mt-2">
                {renderStars(profileStats.averageRating, 18)}
                <Text className="text-gray-700 text-lg font-bold ml-2">
                  {profileStats.averageRating}
                </Text>
                <Text className="text-gray-500 text-sm ml-1">
                  ({ratingsData.length} avaliações)
                </Text>
              </View>
            </View>

            {/* Estatísticas Rápidas */}
            <View className="flex-row justify-between bg-gray-50 rounded-2xl p-4">
              <View className="items-center flex-1">
                <Text className="text-[#39B2A7] text-2xl font-bold">
                  {profileStats.totalServices}
                </Text>
                <Text className="text-gray-600 text-xs text-center">
                  Serviços
                </Text>
              </View>
              
              <View className="items-center flex-1">
                <Text className="text-[#39B2A7] text-2xl font-bold">
                  {profileStats.completionRate}%
                </Text>
                <Text className="text-gray-600 text-xs text-center">
                  Concluídos
                </Text>
              </View>
              
              <View className="items-center flex-1">
                <Text className="text-[#39B2A7] text-2xl font-bold">
                  R$ {thisMonthEarnings}
                </Text>
                <Text className="text-gray-600 text-xs text-center">
                  Este mês
                </Text>
              </View>
            </View>
          </View>

          {/* Abas de Navegação */}
          <View className="bg-white/95 backdrop-blur-lg rounded-2xl p-2 shadow-lg border border-white/20 mb-6">
            <View className="flex-row">
              <TouchableOpacity
                onPress={() => setActiveTab("overview")}
                className={`flex-1 py-3 px-4 rounded-xl ${
                  activeTab === "overview" ? "bg-[#39B2A7]" : "bg-transparent"
                }`}
              >
                <Text className={`text-center text-sm font-semibold ${
                  activeTab === "overview" ? "text-white" : "text-gray-600"
                }`}>
                  Visão Geral
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => setActiveTab("history")}
                className={`flex-1 py-3 px-4 rounded-xl ${
                  activeTab === "history" ? "bg-[#39B2A7]" : "bg-transparent"
                }`}
              >
                <Text className={`text-center text-sm font-semibold ${
                  activeTab === "history" ? "text-white" : "text-gray-600"
                }`}>
                  Histórico
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => setActiveTab("ratings")}
                className={`flex-1 py-3 px-4 rounded-xl ${
                  activeTab === "ratings" ? "bg-[#39B2A7]" : "bg-transparent"
                }`}
              >
                <Text className={`text-center text-sm font-semibold ${
                  activeTab === "ratings" ? "text-white" : "text-gray-600"
                }`}>
                  Avaliações
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Conteúdo das Abas */}
          {activeTab === "overview" && (
            <View>
              {/* Estatísticas Detalhadas */}
              <View className="mb-6">
                <Text className="text-white text-xl font-bold mb-4">
                  Estatísticas Detalhadas
                </Text>
                
                <View className="gap-3">
                  <View className="bg-white/95 backdrop-blur-lg rounded-2xl p-4 shadow-lg border border-white/20">
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center">
                        <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mr-3">
                          <Feather name="check-circle" size={20} color="#4CAF50" />
                        </View>
                        <View>
                          <Text className="text-gray-800 text-sm font-bold">
                            Taxa de Conclusão
                          </Text>
                          <Text className="text-gray-600 text-xs">
                            Serviços finalizados
                          </Text>
                        </View>
                      </View>
                      <Text className="text-green-600 text-xl font-bold">
                        {profileStats.completionRate}%
                      </Text>
                    </View>
                  </View>

                  <View className="bg-white/95 backdrop-blur-lg rounded-2xl p-4 shadow-lg border border-white/20">
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center">
                        <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
                          <Feather name="clock" size={20} color="#2196F3" />
                        </View>
                        <View>
                          <Text className="text-gray-800 text-sm font-bold">
                            Tempo de Resposta
                          </Text>
                          <Text className="text-gray-600 text-xs">
                            Média de resposta
                          </Text>
                        </View>
                      </View>
                      <Text className="text-blue-600 text-xl font-bold">
                        {profileStats.responseTime}
                      </Text>
                    </View>
                  </View>

                  <View className="bg-white/95 backdrop-blur-lg rounded-2xl p-4 shadow-lg border border-white/20">
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center">
                        <View className="w-10 h-10 bg-yellow-100 rounded-full items-center justify-center mr-3">
                          <Feather name="dollar-sign" size={20} color="#FFA500" />
                        </View>
                        <View>
                          <Text className="text-gray-800 text-sm font-bold">
                            Ganhos Totais
                          </Text>
                          <Text className="text-gray-600 text-xs">
                            Valor total arrecadado
                          </Text>
                        </View>
                      </View>
                      <Text className="text-yellow-600 text-xl font-bold">
                        R$ {profileStats.totalEarnings}
                      </Text>
                    </View>
                  </View>

                  <View className="bg-white/95 backdrop-blur-lg rounded-2xl p-4 shadow-lg border border-white/20">
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center">
                        <View className="w-10 h-10 bg-purple-100 rounded-full items-center justify-center mr-3">
                          <Feather name="heart" size={20} color="#9C27B0" />
                        </View>
                        <View>
                          <Text className="text-gray-800 text-sm font-bold">
                            Clientes Satisfeitos
                          </Text>
                          <Text className="text-gray-600 text-xs">
                            Avaliações positivas
                          </Text>
                        </View>
                      </View>
                      <Text className="text-purple-600 text-xl font-bold">
                        {profileStats.clientsSatisfied}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Últimos Serviços */}
              <View className="mb-6">
                <Text className="text-white text-xl font-bold mb-4">
                  Últimos Serviços
                </Text>
                <FlatList
                  data={completedServices.slice(0, 3)}
                  renderItem={renderHistoryItem}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                />
              </View>
            </View>
          )}

          {activeTab === "history" && (
            <View>
              <Text className="text-white text-xl font-bold mb-4">
                Histórico de Serviços ({serviceHistoryData.length})
              </Text>
              <FlatList
                data={serviceHistoryData}
                renderItem={renderHistoryItem}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
              />
            </View>
          )}

          {activeTab === "ratings" && (
            <View>
              <Text className="text-white text-xl font-bold mb-4">
                Avaliações Recebidas ({ratingsData.length})
              </Text>
              <FlatList
                data={ratingsData}
                renderItem={renderRatingItem}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
              />
            </View>
          )}
        </ScrollView>

        {/* Modal de Detalhes do Serviço */}
        <Modal
          visible={showServiceModal}
          transparent
          animationType="slide"
        >
          <View className="flex-1 bg-black/50 justify-end">
            <View className="bg-white rounded-t-3xl p-6 max-h-4/5">
              <View className="flex-row items-center justify-between mb-6">
                <Text className="text-gray-800 text-xl font-bold">
                  Detalhes do Serviço
                </Text>
                <TouchableOpacity onPress={() => setShowServiceModal(false)}>
                  <Feather name="x" size={24} color="#666666" />
                </TouchableOpacity>
              </View>

              {selectedService && (
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View className="bg-gray-50 rounded-2xl p-4 mb-4">
                    <View className="flex-row items-center mb-3">
                      <View className="w-12 h-12 bg-[#39B2A7] rounded-xl items-center justify-center mr-3">
                        <Feather name={selectedService.icon as any} size={20} color="#FFFFFF" />
                      </View>
                      <View className="flex-1">
                        <Text className="text-gray-800 text-lg font-bold">
                          {selectedService.type}
                        </Text>
                        <Text className="text-gray-600 text-sm">
                          #{selectedService.id}
                        </Text>
                      </View>
                      <Text className="text-[#39B2A7] text-xl font-bold">
                        R$ {selectedService.price}
                      </Text>
                    </View>
                    
                    <View className="gap-2">
                      <Text className="text-gray-600 text-sm">
                        Cliente: {selectedService.clientName}
                      </Text>
                      <Text className="text-gray-600 text-sm">
                        Local: {selectedService.address}
                      </Text>
                      <Text className="text-gray-600 text-sm">
                        Data: {new Date(selectedService.date).toLocaleDateString('pt-BR')}
                      </Text>
                      <Text className="text-gray-600 text-sm">
                        Duração: {selectedService.duration}
                      </Text>
                    </View>
                  </View>

                  {selectedService.rating && (
                    <View className="bg-gray-50 rounded-2xl p-4 mb-4">
                      <Text className="text-gray-800 font-bold mb-2">Avaliação do Cliente:</Text>
                      <View className="flex-row items-center mb-2">
                        {renderStars(selectedService.rating, 20)}
                        <Text className="text-gray-700 text-lg font-bold ml-2">
                          {selectedService.rating}/5
                        </Text>
                      </View>
                      {selectedService.clientFeedback && (
                        <Text className="text-gray-600 text-sm italic">
                          "{selectedService.clientFeedback}"
                        </Text>
                      )}
                    </View>
                  )}

                  <View 
                    className={`px-4 py-2 rounded-full self-start ${
                      selectedService.status === "completed" ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    <Text className={`text-sm font-semibold ${
                      selectedService.status === "completed" ? "text-green-600" : "text-red-600"
                    }`}>
                      {selectedService.status === "completed" ? "✅ Concluído" : "❌ Cancelado"}
                    </Text>
                  </View>
                </ScrollView>
              )}
            </View>
          </View>
        </Modal>

        {/* Modal de Detalhes da Avaliação */}
        <Modal
          visible={showRatingModal}
          transparent
          animationType="slide"
        >
          <View className="flex-1 bg-black/50 justify-end">
            <View className="bg-white rounded-t-3xl p-6 max-h-4/5">
              <View className="flex-row items-center justify-between mb-6">
                <Text className="text-gray-800 text-xl font-bold">
                  Detalhes da Avaliação
                </Text>
                <TouchableOpacity onPress={() => setShowRatingModal(false)}>
                  <Feather name="x" size={24} color="#666666" />
                </TouchableOpacity>
              </View>

              {selectedRating && (
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View className="bg-gray-50 rounded-2xl p-4 mb-4">
                    <View className="flex-row items-center mb-4">
                      <Image
                        source={{ uri: selectedRating.clientAvatar }}
                        className="w-16 h-16 rounded-full mr-4"
                      />
                      <View className="flex-1">
                        <Text className="text-gray-800 text-lg font-bold">
                          {selectedRating.clientName}
                        </Text>
                        <Text className="text-gray-600 text-sm">
                          {selectedRating.serviceType}
                        </Text>
                        <Text className="text-gray-500 text-xs">
                          {new Date(selectedRating.date).toLocaleDateString('pt-BR')}
                        </Text>
                      </View>
                    </View>
                    
                    <View className="items-center mb-4">
                      {renderStars(selectedRating.rating, 24)}
                      <Text className="text-gray-700 text-2xl font-bold mt-2">
                        {selectedRating.rating}/5
                      </Text>
                      <Text className="text-gray-500 text-sm">
                        {selectedRating.rating === 5 ? "Excelente!" : 
                         selectedRating.rating === 4 ? "Muito Bom!" :
                         selectedRating.rating === 3 ? "Bom" :
                         selectedRating.rating === 2 ? "Regular" : "Ruim"}
                      </Text>
                    </View>
                  </View>

                  <View className="bg-gray-50 rounded-2xl p-4">
                    <Text className="text-gray-800 font-bold mb-2">Comentário:</Text>
                    <Text className="text-gray-700 text-base leading-6">
                      "{selectedRating.comment}"
                    </Text>
                  </View>
                </ScrollView>
              )}
            </View>
          </View>
        </Modal>
      </LinearGradient>
    </SafeAreaView>
  );
}