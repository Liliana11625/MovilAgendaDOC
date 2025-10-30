import { Text, View } from "react-native";

export function DoctorProfileView() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-lg font-semibold mb-4">Perfil del Doctor</Text>
      <Text>Nombre: Dr. Juan Pérez</Text>
      <Text>Especialidad: Cardiología</Text>
      {/* Aquí se podrían mostrar horarios o información editable */}
    </View>
  );
}
