import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

import { useAuth } from "@/components/context/AuthContext";
import axios from "axios";
import { router } from "expo-router";

export default function PatientProfileView() {
  const { user, token } = useAuth(); 
  const [bloodType, setBloodType] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "http://192.168.1.17:3000/patients/register";

  const handleSaveProfile = async () => {
    if (!user?.id || !token) {
      Alert.alert("Error", "Debes iniciar sesión nuevamente.");
      router.replace("/auth/login");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        API_URL,
        {
          user_id: user.id,
          blood_type: bloodType,
          weight: Number(weight),
          height: Number(height),
          medical_history: medicalHistory,
          emergency_contact: emergencyContact,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Alert.alert("Éxito", "Tu perfil se guardó correctamente.");
      router.replace("/patient/dashboard");
    } catch (error: any) {
      console.log("❌ Error completo:", JSON.stringify(error.response?.data || error, null, 2));
      Alert.alert(
        "Error",
        error.response?.data?.message || "No se pudo guardar el perfil."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Hola, {user?.name || "Paciente"} 👋</Text>
      <Text style={styles.subtitle}>Por favor rellena la siguiente información médica.</Text>

      <TextInput placeholder="Tipo de sangre (A+, O-, etc.)" style={styles.input} value={bloodType} onChangeText={setBloodType} />
      <TextInput placeholder="Peso (kg)" style={styles.input} value={weight} onChangeText={setWeight} keyboardType="numeric" />
      <TextInput placeholder="Estatura (cm)" style={styles.input} value={height} onChangeText={setHeight} keyboardType="numeric" />
      <TextInput placeholder="Historial médico" style={[styles.input, { height: 100 }]} value={medicalHistory} onChangeText={setMedicalHistory} multiline />
      <TextInput placeholder="Contacto de emergencia" style={styles.input} value={emergencyContact} onChangeText={setEmergencyContact} />

      <TouchableOpacity style={styles.button} onPress={handleSaveProfile} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Guardando..." : "Guardar Información"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#f4f8ff", padding: 20 },
  title: { fontSize: 28, color: "#003366", fontWeight: "bold", textAlign: "center", marginBottom: 5 },
  subtitle: { fontSize: 14, color: "#336699", textAlign: "center", marginBottom: 25 },
  input: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginBottom: 15, borderColor: "#b0c4de", borderWidth: 1 },
  button: { backgroundColor: "#0047ab", padding: 15, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
