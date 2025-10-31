import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-semibold mb-4">Bienvenido a tu agenda médica</Text>
      <Button title="Perfil" onPress={() => router.push("/patient/profile")} />
    </View>
  );
}
