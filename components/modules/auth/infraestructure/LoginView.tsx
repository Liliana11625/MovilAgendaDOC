import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export function LoginView() {
  const [username, setUsername] = useState(""); // ← Cambié el nombre para mayor claridad
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "http://192.168.1.17:3000/auth/login";

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Por favor ingresa tu correo y contraseña.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(API_URL, {
        username,
        password,
      });

      const { access_token, user } = response.data;

      console.log("🔑 Token recibido:", access_token);
      console.log("👤 Usuario:", user);

      // ✅ Guarda token y ID como strings
      await AsyncStorage.setItem("token", access_token);
      await AsyncStorage.setItem("id", user.id.toString());
      await AsyncStorage.setItem("name", user.name); 
      
      // 🚦 Redirección según el rol
      if (user.roleId === 1) {
        router.replace("/doctor/dashboard");
      } else if (user.roleId === 2) {
        router.replace("/patient/dashboard");
      } else {
        Alert.alert("Error", "Rol de usuario no válido.");
      }

    } catch (error: any) {
      console.error("Error al iniciar sesión:", error.response?.data || error);

      if (error.response?.status === 401) {
        Alert.alert("Error", "Usuario o contraseña incorrectos.");
      } else {
        Alert.alert("Error", "No se pudo iniciar sesión. Inténtalo de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Bienvenido 👋</Text>
      <Text style={styles.subtitle}>
        Inicia sesión para continuar con tu experiencia.
      </Text>

      <TextInput
        placeholder="Correo electrónico"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.row}>
        <Text style={styles.link}>Recordarme</Text>
        <TouchableOpacity>
          <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.or}>O continúa con</Text>

      <View style={styles.row}>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialText}>Apple</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.push("/auth/register")}>
        <Text style={styles.footerText}>
          ¿No tienes cuenta? <Text style={styles.link}>Regístrate</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// 🎨 Estilos
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f4f8ff",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    color: "#003366",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#336699",
    marginBottom: 25,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#ffffff",
    color: "#000",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#b0c4de",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  link: {
    color: "#0047ab",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#0047ab",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  or: {
    textAlign: "center",
    color: "#336699",
    marginVertical: 10,
  },
  socialButton: {
    backgroundColor: "#ffffff",
    flex: 1,
    marginHorizontal: 5,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#0047ab",
  },
  socialText: {
    color: "#0047ab",
    fontWeight: "600",
  },
  footerText: {
    color: "#336699",
    textAlign: "center",
    marginTop: 20,
  },
});
