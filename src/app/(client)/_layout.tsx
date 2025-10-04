import { Tabs } from "expo-router";

export default function ClientLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="my-orders" />
      <Tabs.Screen name="schedule" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}