import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

// Pantalla principal (Splash)
export default function IndexScreen() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Simular inicialización de la app
  useEffect(() => {
    setMounted(true); // marcar que la app ya está lista
  }, []);

  // Redireccionar solo cuando mounted sea true
  useEffect(() => {
    if (mounted) {
      router.replace("/home"); // redirige a /home
    }
  }, [mounted]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Thinking...</Text>
    </View>
  );
}
