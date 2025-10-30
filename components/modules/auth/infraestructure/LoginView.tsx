import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export function LoginView() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-semibold mb-4">Iniciar Sesión</Text>
      {/* Aquí irían los campos de correo y contraseña */}
      <Button title="Entrar" onPress={() => router.replace("/home")} />
      <Button
        title="Registrarse"
        onPress={() => router.push("/auth/register")}
      />
    </View>
  );
}
