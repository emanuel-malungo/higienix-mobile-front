import { Tabs } from "expo-router";
import { View, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";

export default function EmployeeLayout() {
  return (
    <Tabs 
      screenOptions={{ 
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: Platform.OS === 'ios' ? 90 : 70,
          paddingBottom: Platform.OS === 'ios' ? 30 : 10,
          paddingTop: 15,
          paddingHorizontal: 10,
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarBackground: () => (
          <View style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderTopLeftRadius: 24, 
            borderTopRightRadius: 24,
            overflow: 'hidden'
          }}>
            <LinearGradient
              colors={["#65BF7A", "#39B2A7", "#3290CD"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ flex: 1 }}
            />
          </View>
        ),
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#FFFFFF99',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginTop: 4,
          marginBottom: 0,
        },
        tabBarIconStyle: {
          marginTop: 0,
          marginBottom: 4,
        },
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, focused }) => (
            <View style={{ 
              padding: 6, 
              borderRadius: 12,
              width: 42,
              height: 42,
              backgroundColor: focused ? 'rgba(255,255,255,0.2)' : 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Feather name="activity" size={20} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen 
        name="service" 
        options={{
          title: "Serviços",
          tabBarIcon: ({ color, focused }) => (
            <View style={{ 
              padding: 6, 
              borderRadius: 12,
              width: 42,
              height: 42,
              backgroundColor: focused ? 'rgba(255,255,255,0.2)' : 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Feather name="briefcase" size={20} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen 
        name="schedule" 
        options={{
          title: "Agenda",
          tabBarIcon: ({ color, focused }) => (
            <View style={{ 
              padding: 6, 
              borderRadius: 12,
              width: 42,
              height: 42, 
              backgroundColor: focused ? 'rgba(255,255,255,0.2)' : 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Feather name="calendar" size={20} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen 
        name="profile" 
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, focused }) => (
            <View style={{ 
              padding: 6, 
              borderRadius: 12,
              width: 42,
              height: 42,
              backgroundColor: focused ? 'rgba(255,255,255,0.2)' : 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Feather name="user" size={20} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}