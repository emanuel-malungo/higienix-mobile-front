import React, { useState } from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  StatusBar, 
  TouchableOpacity, 
  TextInput, 
  Image,
  Modal,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

// Interface para endereços
interface Address {
  id: string;
  type: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

// Interface para métodos de pagamento
interface PaymentMethod {
  id: string;
  type: "credit" | "debit" | "pix" | "cash";
  name: string;
  details: string;
  isDefault: boolean;
}

// Dados mock do usuário
const userData = {
  name: "Emanuel Malungo",
  email: "emanuel.malungo@gmail.com",
  phone: "(11) 99999-9999",
  cpf: "123.456.789-00",
  birthDate: "15/05/1990",
  avatar: "https://avatars.githubusercontent.com/u/147757794?s=400&u=2b5f19c75d05e46e21b822bcf87059a961fbf2c7&v=4"
};

// Endereços mock
const addressesData: Address[] = [
  {
    id: "1",
    type: "Casa",
    street: "Rua das Flores",
    number: "123",
    complement: "Apt 45",
    neighborhood: "Centro",
    city: "São Paulo",
    state: "SP",
    zipCode: "01234-567",
    isDefault: true
  },
  {
    id: "2",
    type: "Trabalho",
    street: "Av. Paulista",
    number: "1000",
    complement: "Sala 1001",
    neighborhood: "Bela Vista",
    city: "São Paulo",
    state: "SP",
    zipCode: "01310-100",
    isDefault: false
  }
];

// Métodos de pagamento mock
const paymentMethodsData: PaymentMethod[] = [
  {
    id: "1",
    type: "credit",
    name: "Cartão de Crédito",
    details: "**** **** **** 1234",
    isDefault: true
  },
  {
    id: "2",
    type: "pix",
    name: "PIX",
    details: "emanuel.malungo@gmail.com",
    isDefault: false
  },
  {
    id: "3",
    type: "debit",
    name: "Cartão de Débito",
    details: "**** **** **** 5678",
    isDefault: false
  }
];

export default function SettingsPage() {
  const [editingProfile, setEditingProfile] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [addresses, setAddresses] = useState(addressesData);
  const [paymentMethods, setPaymentMethods] = useState(paymentMethodsData);
  const [userInfo, setUserInfo] = useState(userData);

  // Função para obter ícone do tipo de pagamento
  const getPaymentIcon = (type: string) => {
    switch (type) {
      case "credit":
      case "debit":
        return "credit-card";
      case "pix":
        return "smartphone";
      case "cash":
        return "dollar-sign";
      default:
        return "credit-card";
    }
  };

  // Função para definir endereço padrão
  const setDefaultAddress = (addressId: string) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    })));
  };

  // Função para definir método de pagamento padrão
  const setDefaultPayment = (paymentId: string) => {
    setPaymentMethods(prev => prev.map(payment => ({
      ...payment,
      isDefault: payment.id === paymentId
    })));
  };

  // Função para remover endereço
  const removeAddress = (addressId: string) => {
    Alert.alert(
      "Remover Endereço",
      "Tem certeza que deseja remover este endereço?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Remover", 
          style: "destructive",
          onPress: () => setAddresses(prev => prev.filter(addr => addr.id !== addressId))
        }
      ]
    );
  };

  // Função para remover método de pagamento
  const removePaymentMethod = (paymentId: string) => {
    Alert.alert(
      "Remover Método de Pagamento",
      "Tem certeza que deseja remover este método de pagamento?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Remover", 
          style: "destructive",
          onPress: () => setPaymentMethods(prev => prev.filter(payment => payment.id !== paymentId))
        }
      ]
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
            <View className="flex-row items-center mb-4">
              <TouchableOpacity 
                onPress={() => router.back()}
                className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mr-3"
              >
                <Feather name="arrow-left" size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <View className="flex-1">
                <Text className="text-white text-2xl font-bold">
                  Meu Perfil
                </Text>
                <Text className="text-white/80 text-sm">
                  Gerencie suas informações
                </Text>
              </View>
            </View>
          </View>

          {/* Foto do Cliente e Informações Básicas */}
          <View className="bg-white/95 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20 mb-6">
            <View className="items-center mb-6">
              <View className="w-12 h-1 bg-gradient-to-r from-[#65BF7A] to-[#39B2A7] rounded-full mb-6" />
              
              <View className="relative mb-4">
                <Image
                  source={{ uri: userInfo.avatar }}
                  className="w-24 h-24 rounded-full border-4 border-[#39B2A7]/20"
                />
                <TouchableOpacity className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#39B2A7] rounded-full items-center justify-center">
                  <Feather name="camera" size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              
              <Text className="text-gray-800 text-xl font-bold mb-1">
                {userInfo.name}
              </Text>
              <Text className="text-gray-600 text-sm mb-4">
                {userInfo.email}
              </Text>
              
              <TouchableOpacity
                onPress={() => setEditingProfile(!editingProfile)}
                className="bg-[#39B2A7] px-6 py-3 rounded-2xl"
              >
                <View className="flex-row items-center">
                  <Feather name="edit-2" size={16} color="#FFFFFF" />
                  <Text className="text-white font-semibold ml-2">
                    {editingProfile ? "Salvar" : "Editar Perfil"}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Informações do Perfil */}
            <View className="space-y-4">
              <View>
                <Text className="text-gray-700 font-semibold mb-2">Nome completo:</Text>
                {editingProfile ? (
                  <TextInput
                    value={userInfo.name}
                    onChangeText={(text) => setUserInfo(prev => ({ ...prev, name: text }))}
                    className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-gray-800"
                  />
                ) : (
                  <Text className="text-gray-600 text-sm bg-gray-50 p-3 rounded-xl">
                    {userInfo.name}
                  </Text>
                )}
              </View>

              <View>
                <Text className="text-gray-700 font-semibold mb-2">E-mail:</Text>
                {editingProfile ? (
                  <TextInput
                    value={userInfo.email}
                    onChangeText={(text) => setUserInfo(prev => ({ ...prev, email: text }))}
                    className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-gray-800"
                    keyboardType="email-address"
                  />
                ) : (
                  <Text className="text-gray-600 text-sm bg-gray-50 p-3 rounded-xl">
                    {userInfo.email}
                  </Text>
                )}
              </View>

              <View>
                <Text className="text-gray-700 font-semibold mb-2">Telefone:</Text>
                {editingProfile ? (
                  <TextInput
                    value={userInfo.phone}
                    onChangeText={(text) => setUserInfo(prev => ({ ...prev, phone: text }))}
                    className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-gray-800"
                    keyboardType="phone-pad"
                  />
                ) : (
                  <Text className="text-gray-600 text-sm bg-gray-50 p-3 rounded-xl">
                    {userInfo.phone}
                  </Text>
                )}
              </View>

              <View>
                <Text className="text-gray-700 font-semibold mb-2">CPF:</Text>
                <Text className="text-gray-600 text-sm bg-gray-50 p-3 rounded-xl">
                  {userInfo.cpf}
                </Text>
              </View>
            </View>
          </View>

          {/* Endereços */}
          <View className="bg-white/95 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20 mb-6">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center">
                <Feather name="map-pin" size={20} color="#39B2A7" />
                <Text className="text-gray-800 text-lg font-bold ml-2">
                  Meus Endereços
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowAddressModal(true)}
                className="w-8 h-8 bg-[#39B2A7] rounded-full items-center justify-center"
              >
                <Feather name="plus" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <View className="space-y-3">
              {addresses.map((address) => (
                <View key={address.id} className="bg-gray-50 p-4 rounded-2xl">
                  <View className="flex-row items-start justify-between mb-2">
                    <View className="flex-1">
                      <View className="flex-row items-center mb-1">
                        <Text className="text-gray-800 font-semibold">
                          {address.type}
                        </Text>
                        {address.isDefault && (
                          <View className="ml-2 px-2 py-1 bg-[#39B2A7] rounded-full">
                            <Text className="text-white text-xs font-semibold">
                              Padrão
                            </Text>
                          </View>
                        )}
                      </View>
                      <Text className="text-gray-600 text-sm leading-5">
                        {address.street}, {address.number}
                        {address.complement && `, ${address.complement}`}
                        {"\n"}{address.neighborhood}, {address.city} - {address.state}
                        {"\n"}CEP: {address.zipCode}
                      </Text>
                    </View>
                    
                    <View className="flex-row items-center ml-3">
                      {!address.isDefault && (
                        <TouchableOpacity
                          onPress={() => setDefaultAddress(address.id)}
                          className="p-2"
                        >
                          <Feather name="star" size={16} color="#CCCCCC" />
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity
                        onPress={() => removeAddress(address.id)}
                        className="p-2"
                      >
                        <Feather name="trash-2" size={16} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Métodos de Pagamento */}
          <View className="bg-white/95 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20 mb-6">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center">
                <Feather name="credit-card" size={20} color="#39B2A7" />
                <Text className="text-gray-800 text-lg font-bold ml-2">
                  Métodos de Pagamento
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowPaymentModal(true)}
                className="w-8 h-8 bg-[#39B2A7] rounded-full items-center justify-center"
              >
                <Feather name="plus" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <View className="space-y-3">
              {paymentMethods.map((payment) => (
                <View key={payment.id} className="bg-gray-50 p-4 rounded-2xl">
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center flex-1">
                      <View className="w-10 h-10 bg-[#39B2A7] rounded-lg items-center justify-center mr-3">
                        <Feather name={getPaymentIcon(payment.type) as any} size={18} color="#FFFFFF" />
                      </View>
                      <View className="flex-1">
                        <View className="flex-row items-center">
                          <Text className="text-gray-800 font-semibold">
                            {payment.name}
                          </Text>
                          {payment.isDefault && (
                            <View className="ml-2 px-2 py-1 bg-[#39B2A7] rounded-full">
                              <Text className="text-white text-xs font-semibold">
                                Padrão
                              </Text>
                            </View>
                          )}
                        </View>
                        <Text className="text-gray-600 text-sm">
                          {payment.details}
                        </Text>
                      </View>
                    </View>
                    
                    <View className="flex-row items-center">
                      {!payment.isDefault && (
                        <TouchableOpacity
                          onPress={() => setDefaultPayment(payment.id)}
                          className="p-2"
                        >
                          <Feather name="star" size={16} color="#CCCCCC" />
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity
                        onPress={() => removePaymentMethod(payment.id)}
                        className="p-2"
                      >
                        <Feather name="trash-2" size={16} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Configurações Gerais */}
          <View className="bg-white/95 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20 mb-6">
            <View className="flex-row items-center mb-4">
              <Feather name="settings" size={20} color="#39B2A7" />
              <Text className="text-gray-800 text-lg font-bold ml-2">
                Configurações
              </Text>
            </View>

            <View className="space-y-3">
              <TouchableOpacity className="flex-row items-center justify-between p-3 bg-gray-50 rounded-xl">
                <View className="flex-row items-center">
                  <Feather name="bell" size={18} color="#666666" />
                  <Text className="text-gray-700 font-semibold ml-3">
                    Notificações
                  </Text>
                </View>
                <Feather name="chevron-right" size={18} color="#CCCCCC" />
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center justify-between p-3 bg-gray-50 rounded-xl">
                <View className="flex-row items-center">
                  <Feather name="shield" size={18} color="#666666" />
                  <Text className="text-gray-700 font-semibold ml-3">
                    Privacidade
                  </Text>
                </View>
                <Feather name="chevron-right" size={18} color="#CCCCCC" />
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center justify-between p-3 bg-gray-50 rounded-xl">
                <View className="flex-row items-center">
                  <Feather name="help-circle" size={18} color="#666666" />
                  <Text className="text-gray-700 font-semibold ml-3">
                    Ajuda e Suporte
                  </Text>
                </View>
                <Feather name="chevron-right" size={18} color="#CCCCCC" />
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center justify-between p-3 bg-red-50 rounded-xl">
                <View className="flex-row items-center">
                  <Feather name="log-out" size={18} color="#EF4444" />
                  <Text className="text-red-600 font-semibold ml-3">
                    Sair da Conta
                  </Text>
                </View>
                <Feather name="chevron-right" size={18} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Modal para Adicionar Endereço */}
        <Modal
          visible={showAddressModal}
          transparent
          animationType="slide"
        >
          <View className="flex-1 bg-black/50 justify-end">
            <View className="bg-white rounded-t-3xl p-6 max-h-4/5">
              <View className="flex-row items-center justify-between mb-6">
                <Text className="text-gray-800 text-xl font-bold">
                  Adicionar Endereço
                </Text>
                <TouchableOpacity onPress={() => setShowAddressModal(false)}>
                  <Feather name="x" size={24} color="#666666" />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <View className="space-y-4">
                  <View>
                    <Text className="text-gray-700 font-semibold mb-2">Tipo:</Text>
                    <TextInput
                      placeholder="Ex: Casa, Trabalho, etc."
                      className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-gray-800"
                    />
                  </View>

                  <View>
                    <Text className="text-gray-700 font-semibold mb-2">CEP:</Text>
                    <TextInput
                      placeholder="00000-000"
                      className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-gray-800"
                      keyboardType="numeric"
                    />
                  </View>

                  <View>
                    <Text className="text-gray-700 font-semibold mb-2">Rua:</Text>
                    <TextInput
                      placeholder="Nome da rua"
                      className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-gray-800"
                    />
                  </View>

                  <View className="flex-row space-x-3">
                    <View className="flex-1">
                      <Text className="text-gray-700 font-semibold mb-2">Número:</Text>
                      <TextInput
                        placeholder="123"
                        className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-gray-800"
                        keyboardType="numeric"
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-gray-700 font-semibold mb-2">Complemento:</Text>
                      <TextInput
                        placeholder="Apt, sala, etc."
                        className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-gray-800"
                      />
                    </View>
                  </View>

                  <View>
                    <Text className="text-gray-700 font-semibold mb-2">Bairro:</Text>
                    <TextInput
                      placeholder="Nome do bairro"
                      className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-gray-800"
                    />
                  </View>

                  <View className="flex-row space-x-3">
                    <View className="flex-1">
                      <Text className="text-gray-700 font-semibold mb-2">Cidade:</Text>
                      <TextInput
                        placeholder="Nome da cidade"
                        className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-gray-800"
                      />
                    </View>
                    <View style={{ width: 80 }}>
                      <Text className="text-gray-700 font-semibold mb-2">Estado:</Text>
                      <TextInput
                        placeholder="UF"
                        className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-gray-800"
                        maxLength={2}
                      />
                    </View>
                  </View>

                  <TouchableOpacity className="bg-[#39B2A7] p-4 rounded-2xl mt-6">
                    <Text className="text-white font-bold text-center">
                      Salvar Endereço
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* Modal para Adicionar Método de Pagamento */}
        <Modal
          visible={showPaymentModal}
          transparent
          animationType="slide"
        >
          <View className="flex-1 bg-black/50 justify-end">
            <View className="bg-white rounded-t-3xl p-6">
              <View className="flex-row items-center justify-between mb-6">
                <Text className="text-gray-800 text-xl font-bold">
                  Adicionar Pagamento
                </Text>
                <TouchableOpacity onPress={() => setShowPaymentModal(false)}>
                  <Feather name="x" size={24} color="#666666" />
                </TouchableOpacity>
              </View>

              <View className="space-y-4">
                <TouchableOpacity className="flex-row items-center p-4 bg-gray-50 rounded-xl">
                  <View className="w-10 h-10 bg-[#39B2A7] rounded-lg items-center justify-center mr-3">
                    <Feather name="credit-card" size={18} color="#FFFFFF" />
                  </View>
                  <Text className="text-gray-800 font-semibold flex-1">
                    Cartão de Crédito
                  </Text>
                  <Feather name="chevron-right" size={18} color="#CCCCCC" />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row items-center p-4 bg-gray-50 rounded-xl">
                  <View className="w-10 h-10 bg-[#39B2A7] rounded-lg items-center justify-center mr-3">
                    <Feather name="credit-card" size={18} color="#FFFFFF" />
                  </View>
                  <Text className="text-gray-800 font-semibold flex-1">
                    Cartão de Débito
                  </Text>
                  <Feather name="chevron-right" size={18} color="#CCCCCC" />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row items-center p-4 bg-gray-50 rounded-xl">
                  <View className="w-10 h-10 bg-[#39B2A7] rounded-lg items-center justify-center mr-3">
                    <Feather name="smartphone" size={18} color="#FFFFFF" />
                  </View>
                  <Text className="text-gray-800 font-semibold flex-1">
                    PIX
                  </Text>
                  <Feather name="chevron-right" size={18} color="#CCCCCC" />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row items-center p-4 bg-gray-50 rounded-xl">
                  <View className="w-10 h-10 bg-[#39B2A7] rounded-lg items-center justify-center mr-3">
                    <Feather name="dollar-sign" size={18} color="#FFFFFF" />
                  </View>
                  <Text className="text-gray-800 font-semibold flex-1">
                    Dinheiro
                  </Text>
                  <Feather name="chevron-right" size={18} color="#CCCCCC" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </LinearGradient>
    </SafeAreaView>
  );
}