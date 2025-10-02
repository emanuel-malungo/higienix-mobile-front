import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Text style={{ fontFamily: "Poppins_700Bold" }} className="text-2xl" >
		Hello, World!
	  </Text>
    </View>
  );
}
