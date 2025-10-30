import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export function AgendarCitaView() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-lg font-semibold mb-4">Agendar Nueva Cita</Text>
      {/* Aquí iría el formulario para seleccionar doctor, fecha y hora */}
      <Button title="Guardar Cita" onPress={() => router.push("/citas/miscitas")} />
    </View>
  );
}
