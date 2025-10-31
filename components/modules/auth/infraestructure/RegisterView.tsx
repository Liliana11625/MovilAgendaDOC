import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

export function RegisterView() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [roleId, setRoleId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword || !age || !roleId) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(process.env.API_URL + "auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          age: Number(age),
          role_id: Number(roleId),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al registrar el usuario");
      }

      Alert.alert("Éxito", "Registro completado correctamente");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAge("");
      setRoleId("");

      router.push("/auth/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", "Ocurrió un error durante el registro");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={style.container}>
      <Text style={style.title}>Crear cuenta</Text>
      <Text style={style.subtitle}>
        Regístrate para comenzar tu experiencia.
      </Text>

      <TextInput
        placeholder="Nombre completo"
        placeholderTextColor="#aaa"
        style={style.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Correo electrónico"
        placeholderTextColor="#aaa"
        style={style.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Edad"
        placeholderTextColor="#aaa"
        style={style.input}
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="ID de rol (ej. 1 para usuario)"
        placeholderTextColor="#aaa"
        style={style.input}
        value={roleId}
        onChangeText={setRoleId}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
        style={style.input}
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        placeholder="Confirmar contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
        style={style.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity
        style={[style.button, loading && { backgroundColor: "#1c1c1c" }]}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={style.buttonText}>
          {loading ? "Registrando..." : "Registrarme"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/auth/login")}
        style={{ marginTop: 20 }}
      >
        <Text style={style.footerText}>
          ¿Ya tienes cuenta? <Text style={style.link}>Inicia sesión</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// 🎨 Estilos azules y blancos (sin cambios)
const style = StyleSheet.create({
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
  footerText: {
    color: "#336699",
    textAlign: "center",
    marginTop: 20,
  },
});