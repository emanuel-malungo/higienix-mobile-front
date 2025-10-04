import React, { useState } from "react";
import { View, Text, ScrollView, StatusBar, TouchableOpacity, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

// Tipos de status
type OrderStatus = "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";

// Interface do pedido
interface Order {
  id: string;
  serviceType: string;
  serviceIcon: string;
  date: string;
  time: string;
  address: string;
  price: number;
  status: OrderStatus;
  createdAt: string;
  roomSize: number;
  additionalServices: string[];
  paymentMethod: string;
  professional?: {
    name: string;
    rating: number;
    photo?: string;
  };
}

// Dados mock dos pedidos
const ordersData: Order[] = [
  {
    id: "PED001",
    serviceType: "Limpeza Residencial",
    serviceIcon: "home",
    date: "15/10/2025",
    time: "14:00",
    address: "Rua das Flores, 123 - Centro",
    price: 120,
    status: "in_progress",
    createdAt: "10/10/2025",
    roomSize: 3,
    additionalServices: ["Limpeza profunda"],
    paymentMethod: "Cartão de Crédito",
    professional: {
      name: "Maria Silva",
      rating: 4.8
    }
  },
  {
    id: "PED002", 
    serviceType: "Limpeza Comercial",
    serviceIcon: "briefcase",
    date: "20/10/2025",
    time: "09:00",
    address: "Av. Principal, 456 - Empresarial",
    price: 200,
    status: "confirmed",
    createdAt: "12/10/2025",
    roomSize: 5,
    additionalServices: ["Produtos premium", "Organização"],
    paymentMethod: "Pix"
  },
  {
    id: "PED003",
    serviceType: "Limpeza de Carpetes",
    serviceIcon: "layers", 
    date: "08/10/2025",
    time: "16:00",
    address: "Rua do Comércio, 789 - Vila Nova",
    price: 80,
    status: "completed",
    createdAt: "05/10/2025",
    roomSize: 2,
    additionalServices: [],
    paymentMethod: "Dinheiro",
    professional: {
      name: "João Santos",
      rating: 4.9
    }
  },
  {
    id: "PED004",
    serviceType: "Limpeza Pós-Obra",
    serviceIcon: "tool",
    date: "25/10/2025", 
    time: "08:00",
    address: "Rua Nova, 321 - Bairro Alto",
    price: 300,
    status: "pending",
    createdAt: "14/10/2025",
    roomSize: 4,
    additionalServices: ["Limpeza profunda", "Produtos premium"],
    paymentMethod: "Cartão de Débito"
  }
];

// Configuração dos status
const statusConfig = {
  pending: { 
    label: "Pendente", 
    color: "#FFA500", 
    bgColor: "#FFF3E0",
    icon: "clock"
  },
  confirmed: { 
    label: "Confirmado", 
    color: "#2196F3", 
    bgColor: "#E3F2FD",
    icon: "check-circle"
  },
  in_progress: { 
    label: "Em Andamento", 
    color: "#39B2A7", 
    bgColor: "#E0F7F7",
    icon: "play-circle"
  },
  completed: { 
    label: "Concluído", 
    color: "#4CAF50", 
    bgColor: "#E8F5E8",
    icon: "check"
  },
  cancelled: { 
    label: "Cancelado", 
    color: "#F44336", 
    bgColor: "#FFEBEE",
    icon: "x-circle"
  }
};

// Linha do tempo do status
const statusTimeline = ["pending", "confirmed", "in_progress", "completed"];

export default function MyOrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showModal, setShowModal] = useState(false);

  const getStatusIndex = (status: OrderStatus) => {
    return statusTimeline.indexOf(status);
  };

  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const TimelineStep = ({ 
    status, 
    isActive, 
    isCompleted, 
    isLast 
  }: { 
    status: OrderStatus; 
    isActive: boolean; 
    isCompleted: boolean; 
    isLast: boolean; 
  }) => {
    const config = statusConfig[status];
    
    return (
      <View className="flex-row items-center">
        <View className="items-center">
          <View 
            className={`w-10 h-10 rounded-full items-center justify-center ${
              isCompleted || isActive ? 'opacity-100' : 'opacity-30'
            }`}
            style={{ 
              backgroundColor: isCompleted || isActive ? config.color : '#E0E0E0' 
            }}
          >
            <Feather 
              name={config.icon as any} 
              size={16} 
              color={isCompleted || isActive ? "#FFFFFF" : "#999999"} 
            />
          </View>
          
          {!isLast && (
            <View 
              className={`w-0.5 h-6 mt-1 ${
                isCompleted ? 'opacity-100' : 'opacity-30'
              }`}
              style={{ 
                backgroundColor: isCompleted ? config.color : '#E0E0E0' 
              }}
            />
          )}
        </View>
        
        <View className="ml-3 flex-1">
          <Text 
            className={`text-sm font-semibold ${
              isCompleted || isActive ? 'opacity-100' : 'opacity-50'
            }`}
            style={{ color: isCompleted || isActive ? config.color : '#999999' }}
          >
            {config.label}
          </Text>
        </View>
      </View>
    );
  };

  const OrderCard = ({ order }: { order: Order }) => {
    const config = statusConfig[order.status];
    const currentStatusIndex = getStatusIndex(order.status);
    
    return (
      <TouchableOpacity
        onPress={() => openOrderDetails(order)}
        className="bg-white/95 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20 mb-4"
      >
        <View className="flex-row items-start justify-between mb-4">
          <View className="flex-1">
            <View className="flex-row items-center mb-2">
              <View className="w-8 h-8 bg-[#39B2A7] rounded-lg items-center justify-center mr-3">
                <Feather name={order.serviceIcon as any} size={16} color="#FFFFFF" />
              </View>
              <Text className="text-gray-800 text-lg font-bold flex-1">
                {order.serviceType}
              </Text>
            </View>
            
            <Text className="text-gray-600 text-sm mb-1">
              Pedido #{order.id}
            </Text>
            <Text className="text-gray-600 text-sm mb-1">
              {order.date} às {order.time}
            </Text>
            <Text className="text-gray-600 text-sm" numberOfLines={1}>
              {order.address}
            </Text>
          </View>
          
          <View className="items-end">
            <View 
              className="px-3 py-1 rounded-full mb-2"
              style={{ backgroundColor: config.bgColor }}
            >
              <Text 
                className="text-xs font-semibold"
                style={{ color: config.color }}
              >
                {config.label}
              </Text>
            </View>
            <Text className="text-[#39B2A7] text-lg font-bold">
              R$ {order.price}
            </Text>
          </View>
        </View>

        {/* Mini Timeline */}
        <View className="flex-row items-center justify-between pt-4 border-t border-gray-200">
          {statusTimeline.map((status, index) => {
            const isCompleted = index < currentStatusIndex;
            const isActive = index === currentStatusIndex;
            
            return (
              <View key={status} className="flex-1 items-center">
                <View 
                  className={`w-6 h-6 rounded-full items-center justify-center ${
                    isCompleted || isActive ? 'opacity-100' : 'opacity-30'
                  }`}
                  style={{ 
                    backgroundColor: isCompleted || isActive ? statusConfig[status as OrderStatus].color : '#E0E0E0' 
                  }}
                >
                  <Feather 
                    name={statusConfig[status as OrderStatus].icon as any} 
                    size={12} 
                    color={isCompleted || isActive ? "#FFFFFF" : "#999999"} 
                  />
                </View>
                
                {index < statusTimeline.length - 1 && (
                  <View 
                    className={`absolute top-3 left-1/2 w-full h-0.5 ${
                      isCompleted ? 'opacity-100' : 'opacity-30'
                    }`}
                    style={{ 
                      backgroundColor: isCompleted ? statusConfig[status as OrderStatus].color : '#E0E0E0',
                      marginLeft: '25%',
                      width: '50%'
                    }}
                  />
                )}
              </View>
            );
          })}
        </View>
      </TouchableOpacity>
    );
  };

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
                  Meus Pedidos 
                </Text>
                <Text className="text-white/80 text-sm">
                  Acompanhe o status dos seus serviços
                </Text>
              </View>
              <TouchableOpacity 
                onPress={() => router.push("/(client)/schedule")}
                className="w-12 h-12 bg-white/20 rounded-full items-center justify-center"
              >
                <Feather name="plus" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Resumo Rápido */}
          <View className="bg-white/95 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20 mb-6">
            <View className="items-center mb-4">
              <View className="w-12 h-1 bg-gradient-to-r from-[#65BF7A] to-[#39B2A7] rounded-full" />
            </View>
            
            <Text className="text-gray-800 text-lg font-bold mb-4 text-center">
              Resumo dos Pedidos
            </Text>
            
            <View className="flex-row justify-between">
              <View className="items-center flex-1">
                <View className="w-12 h-12 bg-orange-100 rounded-full items-center justify-center mb-2">
                  <Text className="text-orange-600 text-lg font-bold">
                    {ordersData.filter(o => o.status === "pending").length}
                  </Text>
                </View>
                <Text className="text-gray-600 text-xs text-center">Pendentes</Text>
              </View>
              
              <View className="items-center flex-1">
                <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mb-2">
                  <Text className="text-blue-600 text-lg font-bold">
                    {ordersData.filter(o => o.status === "confirmed").length}
                  </Text>
                </View>
                <Text className="text-gray-600 text-xs text-center">Confirmados</Text>
              </View>
              
              <View className="items-center flex-1">
                <View className="w-12 h-12 bg-teal-100 rounded-full items-center justify-center mb-2">
                  <Text className="text-teal-600 text-lg font-bold">
                    {ordersData.filter(o => o.status === "in_progress").length}
                  </Text>
                </View>
                <Text className="text-gray-600 text-xs text-center">Em Andamento</Text>
              </View>
              
              <View className="items-center flex-1">
                <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mb-2">
                  <Text className="text-green-600 text-lg font-bold">
                    {ordersData.filter(o => o.status === "completed").length}
                  </Text>
                </View>
                <Text className="text-gray-600 text-xs text-center">Concluídos</Text>
              </View>
            </View>
          </View>

          {/* Lista de Pedidos */}
          <View className="mb-6">
            <Text className="text-white text-xl font-bold mb-4">
              Histórico de Pedidos
            </Text>
            
            {ordersData.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </View>

          {/* CTA para novo pedido */}
          <View className="bg-white/95 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20 mb-6">
            <View className="items-center">
              <View className="w-16 h-16 bg-gradient-to-r from-[#65BF7A] to-[#39B2A7] rounded-2xl items-center justify-center mb-4">
                <Feather name="calendar" size={28} color="#FFFFFF" />
              </View>
              <Text className="text-gray-800 text-lg font-bold mb-2 text-center">
                Precisa de uma nova limpeza?
              </Text>
              <Text className="text-gray-600 text-sm text-center mb-4">
                Agende um novo serviço de forma rápida e fácil
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/(client)/schedule")}
                className="bg-gradient-to-r from-[#65BF7A] to-[#39B2A7] px-6 py-3 rounded-2xl"
              >
                <LinearGradient
                  colors={["#65BF7A", "#39B2A7"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="px-4 py-2 rounded-xl"
                >
                  <Text className="text-white font-bold text-center">
                    Agendar Novo Serviço
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Modal de Detalhes do Pedido */}
        <Modal
          visible={showModal}
          transparent
          animationType="slide"
        >
          <View className="flex-1 bg-black/50 justify-end">
            <View className="bg-white rounded-t-3xl p-6 max-h-4/5">
              <View className="flex-row items-center justify-between mb-6">
                <Text className="text-gray-800 text-xl font-bold">
                  Detalhes do Pedido
                </Text>
                <TouchableOpacity onPress={() => setShowModal(false)}>
                  <Feather name="x" size={24} color="#666666" />
                </TouchableOpacity>
              </View>

              {selectedOrder && (
                <ScrollView showsVerticalScrollIndicator={false}>
                  {/* Informações básicas */}
                  <View className="bg-gray-50 rounded-2xl p-4 mb-4">
                    <View className="flex-row items-center mb-3">
                      <View className="w-10 h-10 bg-[#39B2A7] rounded-lg items-center justify-center mr-3">
                        <Feather name={selectedOrder.serviceIcon as any} size={18} color="#FFFFFF" />
                      </View>
                      <View className="flex-1">
                        <Text className="text-gray-800 text-lg font-bold">
                          {selectedOrder.serviceType}
                        </Text>
                        <Text className="text-gray-600 text-sm">
                          Pedido #{selectedOrder.id}
                        </Text>
                      </View>
                      <Text className="text-[#39B2A7] text-xl font-bold">
                        R$ {selectedOrder.price}
                      </Text>
                    </View>
                    
                    <View className="space-y-2">
                      <Text className="text-gray-600 text-sm">
                        Data: {selectedOrder.date} às {selectedOrder.time}
                      </Text>
                      <Text className="text-gray-600 text-sm">
                        Local: {selectedOrder.address}
                      </Text>
                      <Text className="text-gray-600 text-sm">
                        Cômodos: {selectedOrder.roomSize}
                      </Text>
                      <Text className="text-gray-600 text-sm">
                        Pagamento: {selectedOrder.paymentMethod}
                      </Text>
                    </View>
                  </View>

                  {/* Serviços adicionais */}
                  {selectedOrder.additionalServices.length > 0 && (
                    <View className="bg-gray-50 rounded-2xl p-4 mb-4">
                      <Text className="text-gray-800 font-bold mb-2">
                        Serviços Adicionais:
                      </Text>
                      {selectedOrder.additionalServices.map((service, index) => (
                        <Text key={index} className="text-gray-600 text-sm">
                          • {service}
                        </Text>
                      ))}
                    </View>
                  )}

                  {/* Profissional */}
                  {selectedOrder.professional && (
                    <View className="bg-gray-50 rounded-2xl p-4 mb-4">
                      <Text className="text-gray-800 font-bold mb-2">
                        Profissional:
                      </Text>
                      <View className="flex-row items-center">
                        <View className="w-10 h-10 bg-[#39B2A7] rounded-full items-center justify-center mr-3">
                          <Feather name="user" size={18} color="#FFFFFF" />
                        </View>
                        <View className="flex-1">
                          <Text className="text-gray-800 font-semibold">
                            {selectedOrder.professional.name}
                          </Text>
                          <View className="flex-row items-center">
                            <Feather name="star" size={14} color="#FFA500" />
                            <Text className="text-gray-600 text-sm ml-1">
                              {selectedOrder.professional.rating}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  )}

                  {/* Timeline completa */}
                  <View className="bg-gray-50 rounded-2xl p-4 mb-4">
                    <Text className="text-gray-800 font-bold mb-4">
                      Status do Pedido:
                    </Text>
                    
                    <View className="space-y-3">
                      {statusTimeline.map((status, index) => {
                        const currentStatusIndex = getStatusIndex(selectedOrder.status);
                        const isCompleted = index < currentStatusIndex;
                        const isActive = index === currentStatusIndex;
                        const isLast = index === statusTimeline.length - 1;
                        
                        return (
                          <TimelineStep
                            key={status}
                            status={status as OrderStatus}
                            isActive={isActive}
                            isCompleted={isCompleted}
                            isLast={isLast}
                          />
                        );
                      })}
                    </View>
                  </View>

                  {/* Ações */}
                  <View className="flex-row space-x-3 mt-4">
                    {selectedOrder.status === "pending" && (
                      <TouchableOpacity className="flex-1 bg-red-500 p-4 rounded-2xl">
                        <Text className="text-white font-bold text-center">
                          Cancelar
                        </Text>
                      </TouchableOpacity>
                    )}
                    
                    {selectedOrder.status === "completed" && (
                      <TouchableOpacity className="flex-1 bg-[#39B2A7] p-4 rounded-2xl">
                        <Text className="text-white font-bold text-center">
                          Avaliar Serviço
                        </Text>
                      </TouchableOpacity>
                    )}
                    
                    <TouchableOpacity className="flex-1 bg-gray-500 p-4 rounded-2xl">
                      <Text className="text-white font-bold text-center">
                        Repetir Pedido
                      </Text>
                    </TouchableOpacity>
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