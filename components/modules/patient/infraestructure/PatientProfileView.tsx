import { Text, View } from "react-native";

export function PatientProfileView() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-lg font-semibold mb-4">Perfil del Paciente</Text>
      <Text>Nombre: María López</Text>
      <Text>Correo: maria@example.com</Text>
      {/* Aquí podrías agregar botón para editar */}
    </View>
  );
}
