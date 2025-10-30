import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Bienvenido a la Agenda Médica
      </Text>
      <Button title="Ir a Login" onPress={() => router.push("/login")} />
    </View>
  );
}
