import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export function SearchDoctorsView() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-lg font-semibold mb-4">Buscar Doctores</Text>
      {/* Aquí iría la lista de doctores */}
      <Button title="Ver Detalle del Doctor" onPress={() => router.push("/patient/doctordetail")} />
    </View>
  );
}
