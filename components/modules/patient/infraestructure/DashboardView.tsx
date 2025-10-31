import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function DashboardView() {
  return (
    <SafeAreaView style={styles.container}>
      {/* 🔵 Barra superior con buscador e ícono de perfil */}
      <View style={styles.navbar}>
        <TextInput
          placeholder="Buscar servicios médicos..."
          placeholderTextColor="#888"
          style={styles.searchInput}
        />
        <TouchableOpacity onPress={() => router.push("/patient/profile")}>
          <Ionicons name="person-circle-outline" size={34} color="#0047ab" />
        </TouchableOpacity>
      </View>

      {/* Contenido central */}
      <View style={styles.body}>
        <Text style={styles.text}>Bienvenido Paciente 🩺</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f8ff",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    color: "#003366",
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#0047ab",
    fontSize: 18,
    fontWeight: "600",
  },
});
