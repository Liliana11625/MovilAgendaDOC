import { useAuth } from "@/components/context/AuthContext";
import axios from "axios";
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

export default function DoctorProfileView() {
  const { user, token } = useAuth(); 
  const [consultationAmount, setConsultationAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "http://192.168.1.17:3000/doctors/register";

  const handleSaveProfile = async () => {
    if (!user?.id) {
      Alert.alert("Error", "No se encontró el ID del usuario. Inicia sesión nuevamente.");
      router.replace("/auth/login");
      return;
    }

    if (!consultationAmount) {
      Alert.alert("Error", "Por favor ingresa el monto de consulta.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        API_URL,
        {
          user_id: user.id,
          consultationAmount: Number(consultationAmount),
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // 👈 token desde el context
        }
      );

      Alert.alert("Éxito", "Perfil de doctor guardado correctamente.");
      router.replace("/doctor/dashboard");
    } catch (error: any) {
      console.error("Error al guardar perfil del doctor:", error.response?.data || error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "No se pudo guardar el perfil."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={style.container}>
      <Text style={style.title}>Hola Dr. {user?.name || "Usuario"} 👋</Text>
      <Text style={style.subtitle}>Actualiza tu información profesional</Text>

      <TextInput
        placeholder="Correo electrónico"
        placeholderTextColor="#aaa"
        style={style.input}
        value={user?.email || ""}
        editable={false}
      />

      <TextInput
        placeholder="Edad"
        placeholderTextColor="#aaa"
        style={style.input}
        value={user?.age?.toString() || ""}
        editable={false}
      />

      <TextInput
        placeholder="Monto de consulta (MXN)"
        placeholderTextColor="#aaa"
        style={style.input}
        value={consultationAmount}
        onChangeText={setConsultationAmount}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={[style.button, loading && { backgroundColor: "#1c1c1c" }]}
        onPress={handleSaveProfile}
        disabled={loading}
      >
        <Text style={style.buttonText}>
          {loading ? "Guardando..." : "Guardar Perfil"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace("/doctor/dashboard")}>
        <Text style={style.footerText}>
          ← Volver al <Text style={style.link}>Dashboard</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f4f8ff",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    color: "#003366",
    fontWeight: "bold",
    marginBottom: 5,
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
