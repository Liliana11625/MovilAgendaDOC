import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export function DashboardView() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-semibold mb-4">Panel del Paciente</Text>
      <Button title="Buscar Doctores" onPress={() => router.push("/patient/searchdoctors")} />
      <Button title="Mis Citas" onPress={() => router.push("/citas/miscitas")} />
      <Button title="Perfil" onPress={() => router.push("/patient/profile")} />
    </View>
  );
}
