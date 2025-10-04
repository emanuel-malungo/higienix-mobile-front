import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  StatusBar, 
  TouchableOpacity, 
  Alert,
  Modal,
  TextInput
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

// Interface para serviço em execução
interface ServiceExecution {
  id: string;
  type: string;
  icon: string;
  clientName: string;
  clientPhone: string;
  address: string;
  date: string;
  time: string;
  status: "assigned" | "started" | "in_progress" | "paused" | "completed";
  price: number;
  estimatedDuration: string;
  actualDuration?: string;
  startTime?: string;
  endTime?: string;
  priority: "low" | "medium" | "high";
  description: string;
  specialInstructions?: string;
  materials: string[];
  checklistItems: ChecklistItem[];
}

// Interface para itens do checklist
interface ChecklistItem {
  id: string;
  description: string;
  isCompleted: boolean;
  category: "cleaning" | "materials" | "finish";
}

// Dados mock do serviço em execução
const currentServiceData: ServiceExecution = {
  id: "SRV001",
  type: "Limpeza Residencial",
  icon: "home",
  clientName: "Maria Silva",
  clientPhone: "(11) 99999-9999",
  address: "Rua das Flores, 123, Apt 45 - Centro, São Paulo - SP",
  date: "04/10/2025",
  time: "14:00",
  status: "assigned",
  price: 120,
  estimatedDuration: "3h",
  priority: "high",
  description: "Limpeza completa do apartamento de 2 quartos, incluindo cozinha, banheiros e sala.",
  specialInstructions: "Cliente possui gato. Cuidado com produtos químicos fortes. Chaves estão com a portaria.",
  materials: [
    "Aspirador de pó",
    "Produtos de limpeza multiuso",
    "Panos de microfibra",
    "Detergente neutro",
    "Desinfetante",
    "Luvas de proteção"
  ],
  checklistItems: [
    { id: "1", description: "Aspirar todos os cômodos", isCompleted: false, category: "cleaning" },
    { id: "2", description: "Limpar banheiros completamente", isCompleted: false, category: "cleaning" },
    { id: "3", description: "Organizar cozinha e lavar louças", isCompleted: false, category: "cleaning" },
    { id: "4", description: "Passar pano nos móveis", isCompleted: false, category: "cleaning" },
    { id: "5", description: "Limpar vidros e espelhos", isCompleted: false, category: "cleaning" },
    { id: "6", description: "Conferir materiais utilizados", isCompleted: false, category: "materials" },
    { id: "7", description: "Tirar fotos do antes/depois", isCompleted: false, category: "finish" },
    { id: "8", description: "Solicitar assinatura do cliente", isCompleted: false, category: "finish" }
  ]
};

export default function ServiceExecutionPage() {
  const [service, setService] = useState<ServiceExecution>(currentServiceData);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completionNotes, setCompletionNotes] = useState("");
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [pauseReason, setPauseReason] = useState("");

  // Timer para contar tempo decorrido
  useEffect(() => {
    let interval: any;
    
    if (service.status === "started" || service.status === "in_progress") {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [service.status]);

  // Formatar tempo decorrido
  const formatElapsedTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  // Obter cor do status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "assigned": return "#FFA500";
      case "started": return "#2196F3";
      case "in_progress": return "#39B2A7";
      case "paused": return "#FF9800";
      case "completed": return "#4CAF50";
      default: return "#CCCCCC";
    }
  };

  // Obter label do status
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "assigned": return "Atribuído";
      case "started": return "Iniciado";
      case "in_progress": return "Em Andamento";
      case "paused": return "Pausado";
      case "completed": return "Concluído";
      default: return "Desconhecido";
    }
  };

  // Iniciar serviço
  const handleStartService = () => {
    Alert.alert(
      "Iniciar Serviço",
      "Tem certeza que deseja iniciar este serviço?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Iniciar", 
          onPress: () => {
            setService(prev => ({
              ...prev,
              status: "started",
              startTime: new Date().toLocaleTimeString()
            }));
            setElapsedTime(0);
          }
        }
      ]
    );
  };

  // Pausar serviço
  const handlePauseService = () => {
    setShowPauseModal(true);
  };

  // Continuar serviço
  const handleResumeService = () => {
    setService(prev => ({ ...prev, status: "in_progress" }));
  };

  // Finalizar serviço
  const handleCompleteService = () => {
    const incompleteItems = service.checklistItems.filter(item => !item.isCompleted);
    
    if (incompleteItems.length > 0) {
      Alert.alert(
        "Checklist Incompleto",
        `Ainda há ${incompleteItems.length} item(ns) pendente(s) no checklist. Deseja continuar mesmo assim?`,
        [
          { text: "Voltar", style: "cancel" },
          { text: "Finalizar", onPress: () => setShowCompletionModal(true) }
        ]
      );
    } else {
      setShowCompletionModal(true);
    }
  };

  // Confirmar finalização
  const confirmCompletion = () => {
    setService(prev => ({
      ...prev,
      status: "completed",
      endTime: new Date().toLocaleTimeString(),
      actualDuration: formatElapsedTime(elapsedTime)
    }));
    setShowCompletionModal(false);
    
    Alert.alert(
      "Serviço Concluído!",
      "O serviço foi finalizado com sucesso. O cliente será notificado.",
      [
        { text: "OK", onPress: () => router.back() }
      ]
    );
  };

  // Toggle item do checklist
  const toggleChecklistItem = (itemId: string) => {
    setService(prev => ({
      ...prev,
      checklistItems: prev.checklistItems.map(item =>
        item.id === itemId ? { ...item, isCompleted: !item.isCompleted } : item
      )
    }));
    
    // Atualizar status para "em andamento" quando começar a marcar itens
    if (service.status === "started") {
      setService(prev => ({ ...prev, status: "in_progress" }));
    }
  };

  // Calcular progresso do checklist
  const completedItems = service.checklistItems.filter(item => item.isCompleted).length;
  const progressPercentage = (completedItems / service.checklistItems.length) * 100;

  // Renderizar botão de ação principal
  const renderActionButton = () => {
    switch (service.status) {
      case "assigned":
        return (
          <TouchableOpacity
            onPress={handleStartService}
            className="bg-gradient-to-r from-[#65BF7A] to-[#39B2A7] p-6 rounded-3xl shadow-2xl mb-6"
          >
            <LinearGradient
              colors={["#65BF7A", "#39B2A7"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="p-4 rounded-2xl"
            >
              <View className="flex-row items-center justify-center">
                <Feather name="play" size={24} color="#FFFFFF" />
                <Text className="text-white text-lg font-bold ml-3">
                  Iniciar Serviço
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        );
      
      case "started":
      case "in_progress":
        return (
          <View className="flex-row space-x-3 mb-6">
            <TouchableOpacity
              onPress={handlePauseService}
              className="flex-1 bg-orange-500 p-4 rounded-2xl"
            >
              <View className="flex-row items-center justify-center">
                <Feather name="pause" size={20} color="#FFFFFF" />
                <Text className="text-white font-bold ml-2">Pausar</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={handleCompleteService}
              className="flex-1 bg-green-500 p-4 rounded-2xl"
            >
              <View className="flex-row items-center justify-center">
                <Feather name="check" size={20} color="#FFFFFF" />
                <Text className="text-white font-bold ml-2">Finalizar</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      
      case "paused":
        return (
          <TouchableOpacity
            onPress={handleResumeService}
            className="bg-blue-500 p-6 rounded-3xl shadow-2xl mb-6"
          >
            <View className="flex-row items-center justify-center">
              <Feather name="play" size={24} color="#FFFFFF" />
              <Text className="text-white text-lg font-bold ml-3">
                Continuar Serviço
              </Text>
            </View>
          </TouchableOpacity>
        );
      
      case "completed":
        return (
          <View className="bg-green-100 p-6 rounded-3xl shadow-lg mb-6">
            <View className="flex-row items-center justify-center">
              <Feather name="check-circle" size={24} color="#4CAF50" />
              <Text className="text-green-600 text-lg font-bold ml-3">
                Serviço Concluído
              </Text>
            </View>
          </View>
        );
      
      default:
        return null;
    }
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
            <View className="flex-row items-center mb-4">
              <TouchableOpacity 
                onPress={() => router.back()}
                className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mr-3"
              >
                <Feather name="arrow-left" size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <View className="flex-1">
                <Text className="text-white text-2xl font-bold">
                  Execução do Serviço
                </Text>
                <Text className="text-white/80 text-sm">
                  #{service.id} - {service.type}
                </Text>
              </View>
            </View>
          </View>

          {/* Status e Timer */}
          <View className="bg-white/95 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20 mb-6">
            <View className="items-center mb-4">
              <View className="w-12 h-1 bg-gradient-to-r from-[#65BF7A] to-[#39B2A7] rounded-full" />
            </View>
            
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-1">
                <View 
                  className="px-3 py-1 rounded-full self-start mb-2"
                  style={{ backgroundColor: `${getStatusColor(service.status)}20` }}
                >
                  <Text 
                    className="text-sm font-semibold"
                    style={{ color: getStatusColor(service.status) }}
                  >
                    {getStatusLabel(service.status)}
                  </Text>
                </View>
                
                {(service.status === "started" || service.status === "in_progress" || service.status === "paused") && (
                  <View>
                    <Text className="text-gray-600 text-sm">Tempo decorrido:</Text>
                    <Text className="text-gray-800 text-2xl font-bold">
                      {formatElapsedTime(elapsedTime)}
                    </Text>
                  </View>
                )}
                
                {service.status === "completed" && service.actualDuration && (
                  <View>
                    <Text className="text-gray-600 text-sm">Tempo total:</Text>
                    <Text className="text-gray-800 text-2xl font-bold">
                      {service.actualDuration}
                    </Text>
                  </View>
                )}
              </View>
              
              <View className="w-16 h-16 bg-gradient-to-r from-[#65BF7A] to-[#39B2A7] rounded-2xl items-center justify-center">
                <Feather name={service.icon as any} size={28} color="#FFFFFF" />
              </View>
            </View>
            
            {/* Informações do cliente */}
            <View className="bg-gray-50 rounded-2xl p-4">
              <Text className="text-gray-800 text-lg font-bold mb-2">
                👤 {service.clientName}
              </Text>
              <Text className="text-gray-600 text-sm mb-2">
                📞 {service.clientPhone}
              </Text>
              <Text className="text-gray-600 text-sm mb-2">
                📍 {service.address}
              </Text>
              <Text className="text-gray-600 text-sm">
                🕐 {service.date} às {service.time} | R$ {service.price}
              </Text>
            </View>
          </View>

          {/* Botão de Ação Principal */}
          {renderActionButton()}

          {/* Checklist de Execução */}
          <View className="bg-white/95 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20 mb-6">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-gray-800 text-lg font-bold">
                Checklist de Execução
              </Text>
              <Text className="text-[#39B2A7] text-sm font-semibold">
                {completedItems}/{service.checklistItems.length} ({Math.round(progressPercentage)}%)
              </Text>
            </View>
            
            {/* Barra de progresso */}
            <View className="bg-gray-200 rounded-full h-2 mb-4">
              <View 
                className="bg-[#39B2A7] h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </View>
            
            {/* Lista do checklist */}
            <View className="space-y-3">
              {service.checklistItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => toggleChecklistItem(item.id)}
                  className={`p-3 rounded-xl border-2 ${
                    item.isCompleted 
                      ? 'border-[#39B2A7] bg-[#39B2A7]/10' 
                      : 'border-gray-200 bg-gray-50'
                  }`}
                  disabled={service.status === "completed"}
                >
                  <View className="flex-row items-center">
                    <View className={`w-6 h-6 rounded-full border-2 items-center justify-center mr-3 ${
                      item.isCompleted 
                        ? 'border-[#39B2A7] bg-[#39B2A7]' 
                        : 'border-gray-300'
                    }`}>
                      {item.isCompleted && (
                        <Feather name="check" size={14} color="#FFFFFF" />
                      )}
                    </View>
                    <Text className={`flex-1 ${
                      item.isCompleted 
                        ? 'text-[#39B2A7] line-through' 
                        : 'text-gray-700'
                    }`}>
                      {item.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Descrição e Instruções */}
          <View className="bg-white/95 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20 mb-6">
            <Text className="text-gray-800 text-lg font-bold mb-4">
              Detalhes do Serviço
            </Text>
            
            <View className="mb-4">
              <Text className="text-gray-700 font-semibold mb-2">Descrição:</Text>
              <Text className="text-gray-600 text-sm leading-5">
                {service.description}
              </Text>
            </View>
            
            {service.specialInstructions && (
              <View className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 mb-4">
                <View className="flex-row items-center mb-2">
                  <Feather name="alert-triangle" size={16} color="#F59E0B" />
                  <Text className="text-yellow-800 font-semibold ml-2">
                    Instruções Especiais:
                  </Text>
                </View>
                <Text className="text-yellow-700 text-sm">
                  {service.specialInstructions}
                </Text>
              </View>
            )}
            
            <View>
              <Text className="text-gray-700 font-semibold mb-2">Materiais Necessários:</Text>
              <View className="space-y-1">
                {service.materials.map((material, index) => (
                  <Text key={index} className="text-gray-600 text-sm">
                    • {material}
                  </Text>
                ))}
              </View>
            </View>
          </View>

          {/* Ações Rápidas */}
          <View className="bg-white/95 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20 mb-6">
            <Text className="text-gray-800 text-lg font-bold mb-4">
              Ações Rápidas
            </Text>
            
            <View className="flex-row space-x-3">
              <TouchableOpacity className="flex-1 bg-blue-100 p-4 rounded-xl">
                <View className="items-center">
                  <Feather name="phone" size={20} color="#2196F3" />
                  <Text className="text-blue-600 text-sm font-semibold mt-1">
                    Ligar Cliente
                  </Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity className="flex-1 bg-green-100 p-4 rounded-xl">
                <View className="items-center">
                  <Feather name="message-circle" size={20} color="#4CAF50" />
                  <Text className="text-green-600 text-sm font-semibold mt-1">
                    Enviar Mensagem
                  </Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity className="flex-1 bg-purple-100 p-4 rounded-xl">
                <View className="items-center">
                  <Feather name="camera" size={20} color="#9C27B0" />
                  <Text className="text-purple-600 text-sm font-semibold mt-1">
                    Tirar Foto
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Modal de Pausa */}
        <Modal
          visible={showPauseModal}
          transparent
          animationType="slide"
        >
          <View className="flex-1 bg-black/50 justify-end">
            <View className="bg-white rounded-t-3xl p-6">
              <Text className="text-gray-800 text-xl font-bold mb-4 text-center">
                Pausar Serviço
              </Text>
              
              <Text className="text-gray-600 text-sm mb-4">
                Informe o motivo da pausa (opcional):
              </Text>
              
              <TextInput
                value={pauseReason}
                onChangeText={setPauseReason}
                placeholder="Ex: Pausa para almoço, problema técnico..."
                className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-gray-800 mb-6"
                multiline
                numberOfLines={3}
              />
              
              <View className="flex-row space-x-3">
                <TouchableOpacity
                  onPress={() => setShowPauseModal(false)}
                  className="flex-1 bg-gray-200 p-4 rounded-xl"
                >
                  <Text className="text-center text-gray-600 font-semibold">
                    Cancelar
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={() => {
                    setService(prev => ({ ...prev, status: "paused" }));
                    setShowPauseModal(false);
                    setPauseReason("");
                  }}
                  className="flex-1 bg-orange-500 p-4 rounded-xl"
                >
                  <Text className="text-center text-white font-semibold">
                    Pausar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Modal de Finalização */}
        <Modal
          visible={showCompletionModal}
          transparent
          animationType="slide"
        >
          <View className="flex-1 bg-black/50 justify-end">
            <View className="bg-white rounded-t-3xl p-6">
              <Text className="text-gray-800 text-xl font-bold mb-4 text-center">
                Finalizar Serviço
              </Text>
              
              <Text className="text-gray-600 text-sm mb-4">
                Adicione observações sobre o serviço realizado (opcional):
              </Text>
              
              <TextInput
                value={completionNotes}
                onChangeText={setCompletionNotes}
                placeholder="Ex: Serviço concluído conforme solicitado, cliente satisfeito..."
                className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-gray-800 mb-6"
                multiline
                numberOfLines={4}
              />
              
              <View className="flex-row space-x-3">
                <TouchableOpacity
                  onPress={() => setShowCompletionModal(false)}
                  className="flex-1 bg-gray-200 p-4 rounded-xl"
                >
                  <Text className="text-center text-gray-600 font-semibold">
                    Cancelar
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={confirmCompletion}
                  className="flex-1 bg-green-500 p-4 rounded-xl"
                >
                  <Text className="text-center text-white font-semibold">
                    Finalizar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </LinearGradient>
    </SafeAreaView>
  );
}