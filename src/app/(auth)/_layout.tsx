import { Stack } from "expo-router";

export default function AuthLayoutRoot (){
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name="(auth)/index"
				options={{ title: "Login" }}
			/>
			<Stack.Screen
				name="(auth)/register"
				options={{ title: "Register" }}
			/>	
			<Stack.Screen
				name="(auth)/forgot-password"
				options={{ title: "Forgot Password" }}
			/>
		</Stack>
	)
}