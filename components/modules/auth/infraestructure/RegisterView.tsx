import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export function RegisterView() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-semibold mb-4">Registro de Usuario</Text>
      {/* Aquí irían los campos para nombre, correo, contraseña, etc. */}
      <Button title="Crear cuenta" onPress={() => router.replace("/login")} />
    </View>
  );
}