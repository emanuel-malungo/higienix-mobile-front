import { Stack } from "expo-router";

export default function AuthLayoutRoot() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name="index"
				options={{ title: "Login" }}
			/>
			<Stack.Screen
				name="register"
				options={{ title: "Register" }}
			/>	
			<Stack.Screen
				name="forgot-password"
				options={{ title: "Forgot Password" }}
			/>
		</Stack>
	)
}