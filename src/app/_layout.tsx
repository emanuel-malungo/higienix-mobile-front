import { Stack } from "expo-router";
import "@/assets/styles/global.css";
import { useFonts } from '@expo-google-fonts/poppins/useFonts';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

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
	<Stack screenOptions={{ headerShown: false }}>
		<Stack.Screen name="index" />
		<Stack.Screen name="(auth)" />
	</Stack>
  );
}
