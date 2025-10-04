import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";

export default function Onboarding() {
  return (
    <ImageBackground
      className="flex-1 justify-center items-center"
      source={require("../assets/images/background-onboarding.png")}
      resizeMode="cover"
    >
      <View className="flex-1 justify-center items-center w-full px-6">
        {/* Logo */}
        <Image
          source={require("../assets/images/icon2.png")}
          className="w-[180px] h-[120px] mb-8"
          resizeMode="contain"
        />
        
        {/* Título com gradiente */}
        <MaskedView
          maskElement={
            <Text className="text-[32px] font-bold text-center mb-4 leading-[40px]" style={{ fontFamily: "Poppins_700Bold" }}>
              Agende sua limpeza {"\n"} em minutos
            </Text>
          }
        >
          <LinearGradient
            colors={["#65BF7A", "#E6FFED"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text className="text-[32px] font-bold text-center mb-4 leading-[40px] opacity-0" style={{ fontFamily: "Poppins_700Bold" }}>
              Agende sua limpeza {"\n"} em minutos
            </Text>
          </LinearGradient>
        </MaskedView>

        {/* Subtítulo */}
        <Text className="text-base text-center text-white mb-12 leading-6 opacity-95" style={{ fontFamily: "Poppins_400Regular" }}>
          Prático, rápido e do jeito que {"\n"}
          você precisa.
        </Text>

        {/* Botões */}
        <View className="w-full gap-4">
          {/* Botão ENTRAR com gradiente */}
          <TouchableOpacity 
            className="w-full rounded-[28px] overflow-hidden shadow-lg"
            activeOpacity={0.8}
            onPress={() => router.push("/(client)")}
          >
            <LinearGradient
              colors={["#65BF7A", "#39B2A7", "#3290CD"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="py-[18px] px-8 items-center justify-center"
            >
              <Text className="text-white text-base font-bold tracking-wider" style={{ fontFamily: "Poppins_700Bold" }}>
                ENTRAR
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Botão CRIAR CONTA com texto em gradiente e fundo branco */}
          <TouchableOpacity 
            className="w-full bg-white py-[18px] px-8 rounded-[28px] items-center justify-center shadow-md"
            activeOpacity={0.8}
            onPress={() => router.push("/(employee)")}
          >
            <MaskedView
              maskElement={
                <Text className="text-base font-bold tracking-wider" style={{ fontFamily: "Poppins_700Bold" }}>
                  CRIAR CONTA
                </Text>
              }
            >
              <LinearGradient
                colors={["#65BF7A", "#39B2A7", "#3290CD"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text className="text-base font-bold tracking-wider opacity-0" style={{ fontFamily: "Poppins_700Bold" }}>
                  CRIAR CONTA
                </Text>
              </LinearGradient>
            </MaskedView>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}