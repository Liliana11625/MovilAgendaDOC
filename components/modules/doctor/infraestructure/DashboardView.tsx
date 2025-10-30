import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export function DashboardView() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-semibold mb-4">Panel del Doctor</Text>
      <Button title="Mis Citas" onPress={() => router.push("/citas/miscitas")} />
      <Button title="Perfil" onPress={() => router.push("/doctor/profile")} />
    </View>
  );
}
