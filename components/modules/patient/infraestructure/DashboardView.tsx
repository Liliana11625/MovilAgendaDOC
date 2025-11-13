import { useAuth } from "@/components/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DashboardView() {
  const { user } = useAuth();

  const handleSearchDoctors = () => {
    router.push("/patient/searchDoctors"); // Va directamente a la lista de doctores
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Barra superior */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearchDoctors}>
          <Text style={styles.searchButtonText}>Doctores</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/patient/profile")}>
          <Ionicons name="person-circle-outline" size={34} color="#0047ab" />
        </TouchableOpacity>
      </View>

      {/* Bienvenida */}
      <View style={styles.body}>
        <Text style={styles.text}>Bienvenido {user?.name || "Paciente"} 🩺</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f8ff", paddingHorizontal: 16, paddingTop: 20 },
  navbar: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#fff", borderRadius: 12, paddingHorizontal: 10, paddingVertical: 8 },
  searchButton: { flex: 1, backgroundColor: "#0047ab", paddingVertical: 10, borderRadius: 8, alignItems: "center", marginRight: 10 },
  searchButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  body: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { color: "#0047ab", fontSize: 18, fontWeight: "600" }
});
