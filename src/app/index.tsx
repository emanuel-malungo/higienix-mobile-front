import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <ImageBackground
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20
      }}
      source={require("../assets/images/background-onboarding.png")}
      resizeMode="cover"
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%" }}>
        
		<Image
          source={require("../assets/images/icon2.png")}
          style={{ width: 100, marginBottom: 20 }}
        />
        
       <MaskedView
      maskElement={
        <Text style={styles.text}>
          Agende sua limpeza {"\n"} em minutos
        </Text>
      }
    >
      <LinearGradient
        colors={["#66C17E", "#E6FFED"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={[styles.text, { opacity: 0 }]}>
          Agende sua limpeza {"\n"} em minutos
        </Text>
      </LinearGradient>
    </MaskedView>

        <Text className="text-center text-white mb-10">
          Prático, rápido e do jeito que {`\n`}
          você precisa.
        </Text>

        {/* Botão ENTRAR com gradiente */}
        <TouchableOpacity style={{ width: "100%", marginBottom: 15 }}>
          <LinearGradient
            colors={["#66C17E", "#4DADA7", "#3498D0"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              paddingVertical: 15,
              paddingHorizontal: 30,
              borderRadius: 25,
              alignItems: "center"
            }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              ENTRAR
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Botão CRIAR CONTA com texto em gradiente e fundo branco */}
        <TouchableOpacity 
          style={{ 
            width: "100%", 
            backgroundColor: "white", 
            paddingVertical: 15,
            paddingHorizontal: 30,
            borderRadius: 25,
            alignItems: "center"
          }}
        >
          <MaskedView
            maskElement={
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                CRIAR CONTA
              </Text>
            }
          >
            <LinearGradient
              colors={["#66C17E", "#4DADA7", "#3498D0"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ paddingVertical: 3 }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold", opacity: 0 }}>
                CRIAR CONTA
              </Text>
            </LinearGradient>
          </MaskedView>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 26,
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
  },
});