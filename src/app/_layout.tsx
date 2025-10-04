import { Stack } from "expo-router";
import "../assets/styles/global.css";
import { useFonts } from 'expo-font';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout() {

	const [fontsLoaded] = useFonts({
		Poppins_400Regular,
		Poppins_500Medium,
		Poppins_600SemiBold,
		Poppins_700Bold,
	});

	if (!fontsLoaded) {
		return null;
	}

  return (
	<AuthProvider>
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" options={{ title: "Onboarding" }} />
			<Stack.Screen name="(auth)" options={{ title: "Auth" }} />
			<Stack.Screen name="(client)" options={{ title: "Client" }} />
		</Stack>
	</AuthProvider>
  );
}
