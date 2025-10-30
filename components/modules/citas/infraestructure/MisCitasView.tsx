import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export function MisCitasView() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-lg font-semibold mb-4">Mis Citas</Text>
      {/* Aquí mostrarías la lista de citas */}
      <Button title="Agendar otra Cita" onPress={() => router.push("/citas/agendar")} />
    </View>
  );
}
