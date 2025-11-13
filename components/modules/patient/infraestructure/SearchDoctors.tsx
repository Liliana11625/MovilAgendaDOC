import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const API_URL = "http://192.168.1.17:3000/doctors/with-user";

type Doctor = {
  id: number;
  name: string;
  email: string;
};

export default function DoctorsListView() {
  const [loading, setLoading] = useState(true);
  const [doctorList, setDoctorList] = useState<Doctor[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(API_URL);

        // 🔥 Transformamos la respuesta del backend
        const mappedDoctors = response.data.map((item: any) => ({
          id: item.user.id,        // El ID real del doctor que quieres mostrar
          name: item.user.name,    // Nombre del User
          email: item.user.email,  // Email del User
        }));

        setDoctorList(mappedDoctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        Alert.alert("Error", "No se pudo cargar la lista de doctores.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0047ab" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {doctorList.map((doctor) => (
          <View key={doctor.id} style={styles.card}>
            <Text style={styles.name}>{doctor.name}</Text>
            <Text style={styles.email}>{doctor.email}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f8ff", padding: 16 },
  scroll: { paddingBottom: 20 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  name: { fontSize: 18, fontWeight: "600", color: "#003366", marginBottom: 4 },
  email: { fontSize: 14, color: "#555" },
});
