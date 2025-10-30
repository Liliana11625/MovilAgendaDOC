import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export function DoctorDetailView() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-lg font-semibold mb-4">Detalle del Doctor</Text>
      <Text>Nombre: Dr. Juan Pérez</Text>
      <Text>Especialidad: Cardiología</Text>
      <Button title="Agendar Cita" onPress={() => router.push("/citas/agendar")} />
    </View>
  );
}
