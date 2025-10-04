import React, { useState } from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  StatusBar, 
  TouchableOpacity, 
  Modal,
  Alert,
  FlatList
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

// Interface para eventos da agenda
interface ScheduleEvent {
  id: string;
  type: string;
  icon: string;
  clientName: string;
  clientPhone: string;
  address: string;
  date: string;
  time: string;
  endTime: string;
  status: "pending" | "accepted" | "declined" | "completed";
  price: number;
  estimatedDuration: string;
  priority: "low" | "medium" | "high";
  description: string;
  canAcceptDecline: boolean;
}

// Interface para dias do calendário
interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  hasEvents: boolean;
  eventCount: number;
}

// Dados mock dos eventos da agenda
const scheduleEventsData: ScheduleEvent[] = [
  {
    id: "EVT001",
    type: "Limpeza Residencial",
    icon: "home",
    clientName: "Maria Silva",
    clientPhone: "(11) 99999-9999",
    address: "Rua das Flores, 123 - Centro",
    date: "2025-10-04",
    time: "14:00",
    endTime: "17:00",
    status: "accepted",
    price: 120,
    estimatedDuration: "3h",
    priority: "high",
    description: "Limpeza completa do apartamento",
    canAcceptDecline: false
  },
  {
    id: "EVT002",
    type: "Limpeza Comercial",
    icon: "briefcase",
    clientName: "Empresa XYZ Ltda",
    clientPhone: "(11) 88888-8888",
    address: "Av. Paulista, 1000 - Bela Vista",
    date: "2025-10-04",
    time: "16:30",
    endTime: "20:30",
    status: "pending",
    price: 200,
    estimatedDuration: "4h",
    priority: "medium",
    description: "Limpeza do escritório e salas de reunião",
    canAcceptDecline: true
  },
  {
    id: "EVT003",
    type: "Limpeza Pós-Obra",
    icon: "tool",
    clientName: "João Santos",
    clientPhone: "(11) 77777-7777",
    address: "Rua Nova, 456 - Vila Nova",
    date: "2025-10-05",
    time: "09:00",
    endTime: "15:00",
    status: "pending",
    price: 300,
    estimatedDuration: "6h",
    priority: "high",
    description: "Limpeza após reforma de cozinha",
    canAcceptDecline: true
  },
  {
    id: "EVT004",
    type: "Limpeza de Carpetes",
    icon: "layers",
    clientName: "Ana Costa",
    clientPhone: "(11) 66666-6666",
    address: "Rua do Comércio, 789 - Centro",
    date: "2025-10-05",
    time: "15:00",
    endTime: "17:00",
    status: "accepted",
    price: 80,
    estimatedDuration: "2h",
    priority: "low",
    description: "Higienização de carpetes da sala",
    canAcceptDecline: false
  },
  {
    id: "EVT005",
    type: "Limpeza Residencial",
    icon: "home",
    clientName: "Carlos Mendes",
    clientPhone: "(11) 55555-5555",
    address: "Av. Central, 321 - Jardim",
    date: "2025-10-06",
    time: "10:00",
    endTime: "13:00",
    status: "pending",
    price: 150,
    estimatedDuration: "3h",
    priority: "medium",
    description: "Limpeza geral da casa",
    canAcceptDecline: true
  }
];

export default function EmployeeSchedulePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState<ScheduleEvent[]>(scheduleEventsData);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Obter eventos do dia selecionado
  const getEventsForDate = (date: Date): ScheduleEvent[] => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  // Gerar calendário do mês atual
  const generateCalendar = (): CalendarDay[] => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const calendar: CalendarDay[] = [];
    const today = new Date();
    
    for (let i = 0; i < 42; i++) { // 6 semanas
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const dateString = date.toISOString().split('T')[0];
      const dayEvents = events.filter(event => event.date === dateString);
      
      calendar.push({
        date: date.getDate(),
        isCurrentMonth: date.getMonth() === month,
        isToday: date.toDateString() === today.toDateString(),
        isSelected: date.toDateString() === selectedDate.toDateString(),
        hasEvents: dayEvents.length > 0,
        eventCount: dayEvents.length
      });
    }
    
    return calendar;
  };

  // Navegar mês anterior/próximo
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentMonth(newMonth);
  };

  // Selecionar dia
  const selectDay = (day: CalendarDay) => {
    if (!day.isCurrentMonth) return;
    
    const newDate = new Date(currentMonth);
    newDate.setDate(day.date);
    setSelectedDate(newDate);
  };

  // Obter cor do status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "#FFA500";
      case "accepted": return "#4CAF50";
      case "declined": return "#F44336";
      case "completed": return "#2196F3";
      default: return "#CCCCCC";
    }
  };

  // Obter label do status
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending": return "Pendente";
      case "accepted": return "Aceito";
      case "declined": return "Recusado";
      case "completed": return "Concluído";
      default: return "Desconhecido";
    }
  };

  // Obter cor da prioridade
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "#EF4444";
      case "medium": return "#FFA500";
      case "low": return "#4CAF50";
      default: return "#CCCCCC";
    }
  };

  // Aceitar pedido
  const acceptEvent = (eventId: string) => {
    Alert.alert(
      "Aceitar Pedido",
      "Tem certeza que deseja aceitar este pedido?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Aceitar", 
          onPress: () => {
            setEvents(prev => prev.map(event =>
              event.id === eventId 
                ? { ...event, status: "accepted", canAcceptDecline: false }
                : event
            ));
            setShowEventModal(false);
            Alert.alert("Sucesso!", "Pedido aceito com sucesso!");
          }
        }
      ]
    );
  };

  // Recusar pedido
  const declineEvent = (eventId: string) => {
    Alert.alert(
      "Recusar Pedido",
      "Tem certeza que deseja recusar este pedido?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Recusar", 
          style: "destructive",
          onPress: () => {
            setEvents(prev => prev.map(event =>
              event.id === eventId 
                ? { ...event, status: "declined", canAcceptDecline: false }
                : event
            ));
            setShowEventModal(false);
            Alert.alert("Pedido Recusado", "O pedido foi recusado.");
          }
        }
      ]
    );
  };

  // Abrir detalhes do evento
  const openEventDetails = (event: ScheduleEvent) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  // Renderizar dia do calendário
  const renderCalendarDay = (day: CalendarDay, index: number) => (
    <TouchableOpacity
      key={index}
      onPress={() => selectDay(day)}
      className={`w-12 h-12 items-center justify-center m-0.5 rounded-lg ${
        day.isSelected 
          ? 'bg-[#39B2A7]' 
          : day.isToday 
            ? 'bg-[#39B2A7]/20 border border-[#39B2A7]'
            : day.hasEvents 
              ? 'bg-blue-100'
              : 'bg-transparent'
      }`}
      disabled={!day.isCurrentMonth}
    >
      <Text className={`text-sm font-semibold ${
        day.isSelected 
          ? 'text-white' 
          : day.isToday 
            ? 'text-[#39B2A7]'
            : day.isCurrentMonth 
              ? 'text-gray-800' 
              : 'text-gray-300'
      }`}>
        {day.date}
      </Text>
      {day.hasEvents && (
        <View className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
          day.isSelected ? 'bg-white' : 'bg-[#39B2A7]'
        }`} />
      )}
    </TouchableOpacity>
  );

  // Renderizar evento da lista
  const renderEventItem = ({ item }: { item: ScheduleEvent }) => (
    <TouchableOpacity
      onPress={() => openEventDetails(item)}
      className="bg-white/95 backdrop-blur-lg rounded-2xl p-4 mb-3 shadow-lg border border-white/20"
    >
      {/* Header do evento */}
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
              {item.time} - {item.endTime}
            </Text>
          </View>
        </View>
        
        {/* Status e prioridade */}
        <View className="items-end">
          <View 
            className="px-2 py-1 rounded-full mb-1"
            style={{ backgroundColor: `${getStatusColor(item.status)}20` }}
          >
            <Text 
              className="text-xs font-semibold"
              style={{ color: getStatusColor(item.status) }}
            >
              {getStatusLabel(item.status)}
            </Text>
          </View>
          <View 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: getPriorityColor(item.priority) }}
          />
        </View>
      </View>

      {/* Informações do cliente */}
      <View className="mb-3">
        <Text className="text-gray-800 text-sm font-semibold mb-1">
          {item.clientName}
        </Text>
        <Text className="text-gray-600 text-xs" numberOfLines={1}>
          {item.address}
        </Text>
      </View>

      {/* Preço e duração */}
      <View className="flex-row items-center justify-between">
        <Text className="text-gray-600 text-xs">
          {item.estimatedDuration}
        </Text>
        <Text className="text-[#39B2A7] text-sm font-bold">
          R$ {item.price}
        </Text>
      </View>

      {/* Botões de ação para pedidos pendentes */}
      {item.canAcceptDecline && item.status === "pending" && (
        <View className="flex-row gap-2 mt-3 pt-3 border-t border-gray-200">
          <TouchableOpacity
            onPress={() => declineEvent(item.id)}
            className="flex-1 bg-red-100 p-2 rounded-lg"
          >
            <Text className="text-red-600 text-xs font-semibold text-center">
              Recusar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => acceptEvent(item.id)}
            className="flex-1 bg-green-100 p-2 rounded-lg"
          >
            <Text className="text-green-600 text-xs font-semibold text-center">
              Aceitar
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  const todayEvents = getEventsForDate(selectedDate);
  const pendingEvents = events.filter(e => e.status === "pending" && e.canAcceptDecline);
  const calendarDays = generateCalendar();

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

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
                  Minha Agenda
                </Text>
                <Text className="text-white/80 text-sm">
                  Gerencie seus compromissos
                </Text>
              </View>
              <TouchableOpacity className="w-10 h-10 bg-white/20 rounded-full items-center justify-center relative">
                <Feather name="bell" size={20} color="#FFFFFF" />
                {pendingEvents.length > 0 && (
                  <View className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full items-center justify-center">
                    <Text className="text-white text-xs font-bold">
                      {pendingEvents.length}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Resumo Rápido */}
          <View className="bg-white/95 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20 mb-6">
            <View className="items-center mb-4">
              <View className="w-12 h-1 bg-gradient-to-r from-[#65BF7A] to-[#39B2A7] rounded-full" />
            </View>
            
            <Text className="text-gray-800 text-lg font-bold mb-4 text-center">
              Resumo da Agenda
            </Text>
            
            <View className="flex-row justify-between">
              <View className="items-center flex-1">
                <View className="w-12 h-12 bg-orange-100 rounded-full items-center justify-center mb-2">
                  <Text className="text-orange-600 text-lg font-bold">
                    {pendingEvents.length}
                  </Text>
                </View>
                <Text className="text-gray-600 text-xs text-center">Pendentes</Text>
              </View>
              
              <View className="items-center flex-1">
                <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mb-2">
                  <Text className="text-green-600 text-lg font-bold">
                    {events.filter(e => e.status === "accepted").length}
                  </Text>
                </View>
                <Text className="text-gray-600 text-xs text-center">Aceitos</Text>
              </View>
              
              <View className="items-center flex-1">
                <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mb-2">
                  <Text className="text-blue-600 text-lg font-bold">
                    {todayEvents.length}
                  </Text>
                </View>
                <Text className="text-gray-600 text-xs text-center">Hoje</Text>
              </View>
            </View>
          </View>

          {/* Calendário */}
          <View className="bg-white/95 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20 mb-6">
            <View className="flex-row items-center justify-between mb-4">
              <TouchableOpacity
                onPress={() => navigateMonth('prev')}
                className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center"
              >
                <Feather name="chevron-left" size={16} color="#666666" />
              </TouchableOpacity>
              
              <Text className="text-gray-800 text-lg font-bold">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </Text>
              
              <TouchableOpacity
                onPress={() => navigateMonth('next')}
                className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center"
              >
                <Feather name="chevron-right" size={16} color="#666666" />
              </TouchableOpacity>
            </View>

            {/* Cabeçalho dos dias da semana */}
            <View className="flex-row justify-center mb-2">
              {dayNames.map((day, index) => (
                <View key={index} className="w-12 items-center">
                  <Text className="text-gray-500 text-xs font-semibold">
                    {day}
                  </Text>
                </View>
              ))}
            </View>

            {/* Grade do calendário */}
            <View className="flex-row flex-wrap justify-center">
              {calendarDays.map((day, index) => renderCalendarDay(day, index))}
            </View>
          </View>

          {/* Eventos do Dia Selecionado */}
          <View className="mb-6">
            <Text className="text-white text-xl font-bold mb-4">
              Eventos de {selectedDate.toLocaleDateString('pt-BR')}
            </Text>
            
            {todayEvents.length > 0 ? (
              <FlatList
                data={todayEvents}
                renderItem={renderEventItem}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
              />
            ) : (
              <View className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20">
                <View className="items-center">
                  <Feather name="calendar" size={48} color="#CCCCCC" />
                  <Text className="text-gray-500 text-lg font-semibold mt-2">
                    Nenhum evento hoje
                  </Text>
                  <Text className="text-gray-400 text-sm text-center mt-1">
                    Aproveite seu dia livre!
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* Pedidos Pendentes */}
          {pendingEvents.length > 0 && (
            <View className="mb-6">
              <Text className="text-white text-xl font-bold mb-4">
                Pedidos Pendentes ({pendingEvents.length})
              </Text>
              
              <FlatList
                data={pendingEvents}
                renderItem={renderEventItem}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
              />
            </View>
          )}
        </ScrollView>

        {/* Modal de Detalhes do Evento */}
        <Modal
          visible={showEventModal}
          transparent
          animationType="slide"
        >
          <View className="flex-1 bg-black/50 justify-end">
            <View className="bg-white rounded-t-3xl p-6 max-h-4/5">
              <View className="flex-row items-center justify-between mb-6">
                <Text className="text-gray-800 text-xl font-bold">
                  Detalhes do Evento
                </Text>
                <TouchableOpacity onPress={() => setShowEventModal(false)}>
                  <Feather name="x" size={24} color="#666666" />
                </TouchableOpacity>
              </View>

              {selectedEvent && (
                <ScrollView showsVerticalScrollIndicator={false}>
                  {/* Informações básicas */}
                  <View className="bg-gray-50 rounded-2xl p-4 mb-4">
                    <View className="flex-row items-center mb-3">
                      <View className="w-12 h-12 bg-[#39B2A7] rounded-xl items-center justify-center mr-3">
                        <Feather name={selectedEvent.icon as any} size={20} color="#FFFFFF" />
                      </View>
                      <View className="flex-1">
                        <Text className="text-gray-800 text-lg font-bold">
                          {selectedEvent.type}
                        </Text>
                        <Text className="text-gray-600 text-sm">
                          #{selectedEvent.id}
                        </Text>
                      </View>
                      <Text className="text-[#39B2A7] text-xl font-bold">
                        R$ {selectedEvent.price}
                      </Text>
                    </View>
                    
                    <View className="gap-2">
                      <Text className="text-gray-600 text-sm">
                        Cliente: {selectedEvent.clientName}
                      </Text>
                      <Text className="text-gray-600 text-sm">
                        Telefone: {selectedEvent.clientPhone}
                      </Text>
                      <Text className="text-gray-600 text-sm">
                        Local: {selectedEvent.address}
                      </Text>
                      <Text className="text-gray-600 text-sm">
                        Horário: {selectedEvent.time} - {selectedEvent.endTime}
                      </Text>
                      <Text className="text-gray-600 text-sm">
                        Duração: {selectedEvent.estimatedDuration}
                      </Text>
                    </View>
                  </View>

                  {/* Status atual */}
                  <View className="bg-gray-50 rounded-2xl p-4 mb-4">
                    <Text className="text-gray-800 font-bold mb-2">Status Atual:</Text>
                    <View className="flex-row items-center">
                      <View 
                        className="px-3 py-2 rounded-full"
                        style={{ backgroundColor: `${getStatusColor(selectedEvent.status)}20` }}
                      >
                        <Text 
                          className="text-sm font-semibold"
                          style={{ color: getStatusColor(selectedEvent.status) }}
                        >
                          {getStatusLabel(selectedEvent.status)}
                        </Text>
                      </View>
                      <View className="ml-3">
                        <Text className="text-gray-600 text-xs">Prioridade:</Text>
                        <View 
                          className="w-4 h-4 rounded-full mt-1"
                          style={{ backgroundColor: getPriorityColor(selectedEvent.priority) }}
                        />
                      </View>
                    </View>
                  </View>

                  {/* Descrição */}
                  <View className="bg-gray-50 rounded-2xl p-4 mb-4">
                    <Text className="text-gray-800 font-bold mb-2">Descrição:</Text>
                    <Text className="text-gray-600 text-sm">
                      {selectedEvent.description}
                    </Text>
                  </View>

                  {/* Ações */}
                  <View className="gap-3 mt-4">
                    <View className="flex-row gap-3">
                      <TouchableOpacity className="flex-1 bg-blue-100 p-3 rounded-xl">
                        <View className="flex-row items-center justify-center">
                          <Feather name="phone" size={18} color="#2196F3" />
                          <Text className="text-blue-600 font-semibold ml-2">
                            Ligar Cliente
                          </Text>
                        </View>
                      </TouchableOpacity>
                      
                      <TouchableOpacity className="flex-1 bg-green-100 p-3 rounded-xl">
                        <View className="flex-row items-center justify-center">
                          <Feather name="message-circle" size={18} color="#4CAF50" />
                          <Text className="text-green-600 font-semibold ml-2">
                            Mensagem
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                    {/* Botões de aceitar/recusar */}
                    {selectedEvent.canAcceptDecline && selectedEvent.status === "pending" && (
                      <View className="flex-row gap-3 pt-3 border-t border-gray-200">
                        <TouchableOpacity
                          onPress={() => declineEvent(selectedEvent.id)}
                          className="flex-1 bg-red-500 p-4 rounded-xl"
                        >
                          <Text className="text-white font-bold text-center">
                            Recusar Pedido
                          </Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                          onPress={() => acceptEvent(selectedEvent.id)}
                          className="flex-1 bg-green-500 p-4 rounded-xl"
                        >
                          <Text className="text-white font-bold text-center">
                            Aceitar Pedido
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
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
