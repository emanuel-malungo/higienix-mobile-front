import React, { useState } from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  StatusBar, 
  TouchableOpacity, 
  TextInput,
  Modal,
  FlatList
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

// Dados dos serviços
const servicesData = [
  {
    id: 1,
    name: "Limpeza Residencial",
    icon: "home",
    description: "Limpeza completa da sua casa",
    basePrice: 80,
    duration: "2-4 horas"
  },
  {
    id: 2,
    name: "Limpeza Comercial",
    icon: "briefcase",
    description: "Escritórios e estabelecimentos",
    basePrice: 120,
    duration: "3-6 horas"
  },
  {
    id: 3,
    name: "Limpeza Pós-Obra",
    icon: "tool",
    description: "Remoção de entulhos e sujeira",
    basePrice: 150,
    duration: "4-8 horas"
  },
  {
    id: 4,
    name: "Limpeza de Carpetes",
    icon: "layers",
    description: "Higienização profunda",
    basePrice: 60,
    duration: "1-2 horas"
  },
  {
    id: 5,
    name: "Limpeza de Vidros",
    icon: "square",
    description: "Janelas e superfícies de vidro",
    basePrice: 40,
    duration: "1-3 horas"
  },
  {
    id: 6,
    name: "Limpeza Pesada",
    icon: "zap",
    description: "Para situações extremas",
    basePrice: 200,
    duration: "6-8 horas"
  }
];

// Horários disponíveis
const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "12:00", 
  "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
];

// Métodos de pagamento
const paymentMethods = [
  { id: 1, name: "Cartão de Crédito", icon: "credit-card" },
  { id: 2, name: "Cartão de Débito", icon: "credit-card" },
  { id: 3, name: "Pix", icon: "smartphone" },
  { id: 4, name: "Dinheiro", icon: "dollar-sign" }
];

export default function SchedulePage() {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [address, setAddress] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<number | null>(null);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [roomSize, setRoomSize] = useState(1);
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);

  // Calcular preço estimado
  const calculatePrice = () => {
    if (!selectedService) return 0;
    const service = servicesData.find(s => s.id === selectedService);
    if (!service) return 0;
    
    let price = service.basePrice;
    price *= roomSize; // Multiplicar por número de cômodos
    
    // Adicionar serviços extras
    if (additionalServices.includes("deep")) price += 30;
    if (additionalServices.includes("products")) price += 20;
    if (additionalServices.includes("organization")) price += 40;
    
    return price;
  };

  const toggleAdditionalService = (service: string) => {
    setAdditionalServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleConfirmSchedule = () => {
    if (!selectedService || !address || !selectedDate || !selectedTime || !selectedPayment) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    
    // Aqui você implementaria a lógica de confirmação
    alert("Agendamento confirmado! Você será redirecionado para o pagamento.");
    router.push("/(client)/my-orders");
  };

  const selectedServiceData = servicesData.find(s => s.id === selectedService);

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
            <View className="flex-row items-center mb-4">
              <TouchableOpacity 
                onPress={() => router.back()}
                className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mr-3"
              >
                <Feather name="arrow-left" size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <View className="flex-1">
                <Text className="text-white text-2xl font-bold">
                  Agendar Serviço
                </Text>
                <Text className="text-white/80 text-sm">
                  Preencha os dados para agendar
                </Text>
              </View>
            </View>
          </View>

          {/* Seleção do Tipo de Serviço */}
          <View className="mb-6">
            <View className="bg-white/95 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20">
              <View className="items-center mb-4">
                <View className="w-12 h-1 bg-gradient-to-r from-[#65BF7A] to-[#39B2A7] rounded-full" />
              </View>
              <Text className="text-gray-800 text-lg font-bold mb-4">
                1. Escolha o Serviço
              </Text>
              
              <View className="gap-3">
                {servicesData.map((service) => (
                  <TouchableOpacity
                    key={service.id}
                    onPress={() => setSelectedService(service.id)}
                    className={`p-4 rounded-2xl border-2 ${
                      selectedService === service.id 
                        ? 'border-[#39B2A7] bg-[#39B2A7]/10' 
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <View className="flex-row items-center">
                      <View className={`w-10 h-10 rounded-xl items-center justify-center mr-3 ${
                        selectedService === service.id ? 'bg-[#39B2A7]' : 'bg-gray-300'
                      }`}>
                        <Feather 
                          name={service.icon as any} 
                          size={18} 
                          color={selectedService === service.id ? "#FFFFFF" : "#666666"} 
                        />
                      </View>
                      <View className="flex-1">
                        <Text className="text-gray-800 font-semibold mb-1">
                          {service.name}
                        </Text>
                        <Text className="text-gray-600 text-xs mb-1">
                          {service.description}
                        </Text>
                        <View className="flex-row justify-between">
                          <Text className="text-[#39B2A7] text-sm font-bold">
                            A partir de R$ {service.basePrice}
                          </Text>
                          <Text className="text-gray-500 text-xs">
                            {service.duration}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Detalhes do Serviço */}
          {selectedService && (
            <View className="mb-6">
              <View className="bg-white/95 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20">
                <Text className="text-gray-800 text-lg font-bold mb-4">
                  2. Detalhes do Serviço
                </Text>
                
                {/* Número de cômodos */}
                <View className="mb-4">
                  <Text className="text-gray-700 font-semibold mb-2">
                    Número de cômodos/ambientes:
                  </Text>
                  <View className="flex-row items-center">
                    <TouchableOpacity 
                      onPress={() => setRoomSize(Math.max(1, roomSize - 1))}
                      className="w-10 h-10 bg-gray-200 rounded-full items-center justify-center"
                    >
                      <Feather name="minus" size={16} color="#666666" />
                    </TouchableOpacity>
                    <Text className="mx-4 text-lg font-bold text-gray-800">
                      {roomSize}
                    </Text>
                    <TouchableOpacity 
                      onPress={() => setRoomSize(roomSize + 1)}
                      className="w-10 h-10 bg-[#39B2A7] rounded-full items-center justify-center"
                    >
                      <Feather name="plus" size={16} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Serviços adicionais */}
                <View className="mb-4">
                  <Text className="text-gray-700 font-semibold mb-2">
                    Serviços adicionais:
                  </Text>
                  
                  <TouchableOpacity 
                    onPress={() => toggleAdditionalService("deep")}
                    className={`p-3 rounded-xl mb-2 border ${
                      additionalServices.includes("deep") 
                        ? 'border-[#39B2A7] bg-[#39B2A7]/10' 
                        : 'border-gray-200'
                    }`}
                  >
                    <View className="flex-row justify-between items-center">
                      <Text className="text-gray-700">Limpeza profunda (+R$ 30)</Text>
                      <Feather 
                        name={additionalServices.includes("deep") ? "check-circle" : "circle"} 
                        size={20} 
                        color={additionalServices.includes("deep") ? "#39B2A7" : "#CCCCCC"} 
                      />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    onPress={() => toggleAdditionalService("products")}
                    className={`p-3 rounded-xl mb-2 border ${
                      additionalServices.includes("products") 
                        ? 'border-[#39B2A7] bg-[#39B2A7]/10' 
                        : 'border-gray-200'
                    }`}
                  >
                    <View className="flex-row justify-between items-center">
                      <Text className="text-gray-700">Produtos premium (+R$ 20)</Text>
                      <Feather 
                        name={additionalServices.includes("products") ? "check-circle" : "circle"} 
                        size={20} 
                        color={additionalServices.includes("products") ? "#39B2A7" : "#CCCCCC"} 
                      />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    onPress={() => toggleAdditionalService("organization")}
                    className={`p-3 rounded-xl border ${
                      additionalServices.includes("organization") 
                        ? 'border-[#39B2A7] bg-[#39B2A7]/10' 
                        : 'border-gray-200'
                    }`}
                  >
                    <View className="flex-row justify-between items-center">
                      <Text className="text-gray-700">Organização (+R$ 40)</Text>
                      <Feather 
                        name={additionalServices.includes("organization") ? "check-circle" : "circle"} 
                        size={20} 
                        color={additionalServices.includes("organization") ? "#39B2A7" : "#CCCCCC"} 
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {/* Endereço */}
          <View className="mb-6">
            <View className="bg-white/95 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20">
              <Text className="text-gray-800 text-lg font-bold mb-4">
                3. Endereço
              </Text>
              
              <View className="mb-4">
                <Text className="text-gray-700 font-semibold mb-2">
                  Endereço completo:
                </Text>
                <TextInput
                  value={address}
                  onChangeText={setAddress}
                  placeholder="Rua, número, bairro, cidade"
                  className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-gray-800"
                  multiline
                  numberOfLines={3}
                />
              </View>
            </View>
          </View>

          {/* Data e Hora */}
          <View className="mb-6">
            <View className="bg-white/95 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20">
              <Text className="text-gray-800 text-lg font-bold mb-4">
                4. Data e Horário
              </Text>
              
              <View className="flex-row gap-3">
                <View className="flex-1">
                  <Text className="text-gray-700 font-semibold mb-2">Data:</Text>
                  <TextInput
                    value={selectedDate}
                    onChangeText={setSelectedDate}
                    placeholder="DD/MM/AAAA"
                    className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-gray-800"
                  />
                </View>
                
                <View className="flex-1">
                  <Text className="text-gray-700 font-semibold mb-2">Horário:</Text>
                  <TouchableOpacity
                    onPress={() => setShowTimeModal(true)}
                    className="bg-gray-50 p-4 rounded-xl border border-gray-200"
                  >
                    <Text className="text-gray-800">
                      {selectedTime || "Selecionar"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Estimativa de Preço */}
          {selectedService && (
            <View className="mb-6">
              <View className="bg-white/95 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20">
                <Text className="text-gray-800 text-lg font-bold mb-4">
                  5. Estimativa de Preço
                </Text>
                
                <View className="space-y-2">
                  <View className="flex-row justify-between">
                    <Text className="text-gray-600">Serviço base:</Text>
                    <Text className="text-gray-800">R$ {selectedServiceData?.basePrice}</Text>
                  </View>
                  
                  <View className="flex-row justify-between">
                    <Text className="text-gray-600">Cômodos ({roomSize}x):</Text>
                    <Text className="text-gray-800">R$ {selectedServiceData?.basePrice! * roomSize}</Text>
                  </View>
                  
                  {additionalServices.map(service => (
                    <View key={service} className="flex-row justify-between">
                      <Text className="text-gray-600">
                        {service === "deep" ? "Limpeza profunda" : 
                         service === "products" ? "Produtos premium" : "Organização"}:
                      </Text>
                      <Text className="text-gray-800">
                        +R$ {service === "deep" ? 30 : service === "products" ? 20 : 40}
                      </Text>
                    </View>
                  ))}
                  
                  <View className="border-t border-gray-200 pt-2">
                    <View className="flex-row justify-between">
                      <Text className="text-gray-800 text-lg font-bold">Total:</Text>
                      <Text className="text-[#39B2A7] text-xl font-bold">
                        R$ {calculatePrice()}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Método de Pagamento */}
          <View className="mb-6">
            <View className="bg-white/95 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20">
              <Text className="text-gray-800 text-lg font-bold mb-4">
                6. Método de Pagamento
              </Text>
              
              <TouchableOpacity
                onPress={() => setShowPaymentModal(true)}
                className="bg-gray-50 p-4 rounded-xl border border-gray-200"
              >
                <View className="flex-row items-center justify-between">
                  <Text className="text-gray-800">
                    {selectedPayment 
                      ? paymentMethods.find(p => p.id === selectedPayment)?.name 
                      : "Selecionar método"
                    }
                  </Text>
                  <Feather name="chevron-down" size={20} color="#666666" />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Botão de Confirmar */}
          <View className="mb-6">
            <TouchableOpacity
              onPress={handleConfirmSchedule}
              className="bg-gradient-to-r from-[#65BF7A] to-[#39B2A7] p-6 rounded-3xl shadow-2xl"
            >
              <LinearGradient
                colors={["#65BF7A", "#39B2A7"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="p-4"
                style={{ borderRadius: 50 }}
              >
                <View className="flex-row items-center justify-center">
                  <Feather name="check-circle" size={24} color="#FFFFFF" />
                  <Text className="text-white text-lg font-bold ml-3">
                    Confirmar Agendamento
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Modal de Horários */}
        <Modal
          visible={showTimeModal}
          transparent
          animationType="slide"
        >
          <View className="flex-1 bg-black/50 justify-end">
            <View className="bg-white rounded-t-3xl p-6">
              <Text className="text-gray-800 text-lg font-bold mb-4 text-center">
                Selecionar Horário
              </Text>
              
              <FlatList
                data={timeSlots}
                numColumns={3}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedTime(item);
                      setShowTimeModal(false);
                    }}
                    className="flex-1 p-3 m-1 bg-gray-100 rounded-xl items-center"
                  >
                    <Text className="text-gray-800 font-semibold">{item}</Text>
                  </TouchableOpacity>
                )}
              />
              
              <TouchableOpacity
                onPress={() => setShowTimeModal(false)}
                className="mt-4 p-4 bg-gray-200 rounded-xl"
              >
                <Text className="text-center text-gray-600 font-semibold">
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal de Pagamento */}
        <Modal
          visible={showPaymentModal}
          transparent
          animationType="slide"
        >
          <View className="flex-1 bg-black/50 justify-end">
            <View className="bg-white rounded-t-3xl p-6">
              <Text className="text-gray-800 text-lg font-bold mb-4 text-center">
                Método de Pagamento
              </Text>
              
              {paymentMethods.map((method) => (
                <TouchableOpacity
                  key={method.id}
                  onPress={() => {
                    setSelectedPayment(method.id);
                    setShowPaymentModal(false);
                  }}
                  className="flex-row items-center p-4 border-b border-gray-200"
                >
                  <View className="w-10 h-10 bg-[#39B2A7] rounded-full items-center justify-center mr-3">
                    <Feather name={method.icon as any} size={18} color="#FFFFFF" />
                  </View>
                  <Text className="text-gray-800 font-semibold flex-1">
                    {method.name}
                  </Text>
                  {selectedPayment === method.id && (
                    <Feather name="check" size={20} color="#39B2A7" />
                  )}
                </TouchableOpacity>
              ))}
              
              <TouchableOpacity
                onPress={() => setShowPaymentModal(false)}
                className="mt-4 p-4 bg-gray-200 rounded-xl"
              >
                <Text className="text-center text-gray-600 font-semibold">
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </LinearGradient>
    </SafeAreaView>
  );
}