import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DoctorDashboardView() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Barra superior */}
      <View style={styles.navbar}>
        <Text style={styles.title}>Panel del Doctor</Text>
        <TouchableOpacity onPress={() => router.push("/doctor/profile")}>
          <Ionicons name="person-circle-outline" size={34} color="#0047ab" />
        </TouchableOpacity>
      </View>

      {/* Contenido principal */}
      <View style={styles.body}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>📅 Mis Citas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/doctor/profile")}
        >
          <Text style={styles.buttonText}>👨‍⚕️ Ver Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f8ff", paddingHorizontal: 16, paddingTop: 20 },
  navbar: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 },
  title: { fontSize: 24, color: "#0047ab", fontWeight: "bold" },
  body: { flex: 1, justifyContent: "center", alignItems: "center" },
  button: { backgroundColor: "#0047ab", padding: 15, borderRadius: 10, marginBottom: 15 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
})