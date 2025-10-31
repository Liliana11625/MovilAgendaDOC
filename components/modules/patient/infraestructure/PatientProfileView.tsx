import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function PatientProfileView() {
  const [userId, setUserId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "http://192.168.1.17:3000/patients/register";

  // 🔹 Recuperar el ID del usuario al montar el componente
  useEffect(() => {
  const loadUserData = async () => {
    try {
      const id = await AsyncStorage.getItem("id");
      const storedName = await AsyncStorage.getItem("name");

      if (id) {
        setUserId(Number(id)); // convierte a número
      } else {
        Alert.alert("Error", "No se encontró el ID del usuario. Inicia sesión nuevamente.");
        router.replace("/auth/login");
        return; // detenemos ejecución
      }

      if (storedName) {
        setName(storedName);
      }
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
      Alert.alert("Error", "Hubo un problema al cargar los datos del usuario.");
    }
  };

  loadUserData();
}, []);


  const handleSaveProfile = async () => {
    if (!userId) {
      Alert.alert("Error", "No se encontró el ID del usuario.");
      return;
    }

    if (!bloodType || !weight || !height || !medicalHistory) {
      Alert.alert("Error", "Por favor completa todos los campos obligatorios.");
      return;
    }

    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Error", "No se encontró el token. Inicia sesión nuevamente.");
        return;
      }

      console.log("🔹 Enviando datos:", {
        user_id: userId,
        blood_type: bloodType,
        weight: Number(weight),
        height: Number(height),
        medical_history: medicalHistory,
        emergency_contact: emergencyContact,
      });

      const response = await axios.post(
        API_URL,
        {
          user_id: userId,
          blood_type: bloodType,
          weight: Number(weight),
          height: Number(height),
          medical_history: medicalHistory,
          emergency_contact: emergencyContact,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert("Éxito", "Tu perfil se guardó correctamente.");
      router.replace("/patient/dashboard");
    } catch (error: any) {
      console.error("Error al guardar perfil:", error.response?.data || error);
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
      <Text style={style.title}>Hola, {name} 👋</Text>
      <Text style={style.subtitle}>
        Por favor rellena la siguiente información médica.
      </Text>

      <TextInput
        placeholder="Tipo de sangre (A+, O-, etc.)"
        placeholderTextColor="#aaa"
        style={style.input}
        value={bloodType}
        onChangeText={setBloodType}
      />

      <TextInput
        placeholder="Peso (kg)"
        placeholderTextColor="#aaa"
        style={style.input}
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Estatura (cm)"
        placeholderTextColor="#aaa"
        style={style.input}
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Historial médico"
        placeholderTextColor="#aaa"
        style={[style.input, { height: 100, textAlignVertical: "top" }]}
        value={medicalHistory}
        onChangeText={setMedicalHistory}
        multiline
      />

      <TextInput
        placeholder="Contacto de emergencia"
        placeholderTextColor="#aaa"
        style={style.input}
        value={emergencyContact}
        onChangeText={setEmergencyContact}
      />

      <TouchableOpacity
        style={[style.button, loading && { backgroundColor: "#1c1c1c" }]}
        onPress={handleSaveProfile}
        disabled={loading}
      >
        <Text style={style.buttonText}>
          {loading ? "Guardando..." : "Guardar Información"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace("/patient/dashboard")}>
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
