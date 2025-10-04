import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Onboarding() {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/images/background-onboarding.png")}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Logo */}
        <Image
          source={require("../assets/images/icon2.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        
        {/* Título com gradiente */}
        <MaskedView
          maskElement={
            <Text style={styles.title}>
              Agende sua limpeza {"\n"} em minutos
            </Text>
          }
        >
          <LinearGradient
            colors={["#65BF7A", "#E6FFED"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={[styles.title, { opacity: 0 }]}>
              Agende sua limpeza {"\n"} em minutos
            </Text>
          </LinearGradient>
        </MaskedView>

        {/* Subtítulo */}
        <Text style={styles.subtitle}>
          Prático, rápido e do jeito que {"\n"}
          você precisa.
        </Text>

        {/* Botões */}
        <View style={styles.buttonsContainer}>
          {/* Botão ENTRAR com gradiente */}
          <TouchableOpacity 
            style={styles.button}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#65BF7A", "#39B2A7", "#3290CD"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              <Text style={styles.buttonTextWhite}>
                ENTRAR
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Botão CRIAR CONTA com texto em gradiente e fundo branco */}
          <TouchableOpacity 
            style={styles.buttonWhite}
            activeOpacity={0.8}
          >
            <MaskedView
              maskElement={
                <Text style={styles.buttonTextGradient}>
                  CRIAR CONTA
                </Text>
              }
            >
              <LinearGradient
                colors={["#65BF7A", "#39B2A7", "#3290CD"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={[styles.buttonTextGradient, { opacity: 0 }]}>
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

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 24,
  },
  logo: {
    width: 180,
    height: 120,
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    color: "#FFFFFF",
    marginBottom: 48,
    lineHeight: 24,
    opacity: 0.95,
  },
  buttonsContainer: {
    width: "100%",
    gap: 16,
  },
  button: {
    width: "100%",
    borderRadius: 28,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  gradientButton: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWhite: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  buttonTextWhite: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    letterSpacing: 1,
  },
  buttonTextGradient: {
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    letterSpacing: 1,
  },
});