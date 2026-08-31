// The (tabs) section will handle our main application screens.
// Dashboard

import { ScrollView, StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useStudents } from "../../context/StudentContext";

export default function Dashboard() {
  const { students } = useStudents();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* HEADER */}

        <View style={styles.header}>
          <Text style={styles.title}>🎓 Student System</Text>

          <Text style={styles.subtitle}>Student Registration Management</Text>
        </View>

        {/* STAT CARD */}

        <View style={styles.statCard}>
          <View>
            <Text style={styles.statLabel}>Total Students</Text>

            <Text style={styles.statNumber}>{students.length}</Text>
          </View>

          <Text style={styles.statIcon}>👨‍🎓</Text>
        </View>

        {/* QUICK INFORMATION */}

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Quick Information</Text>

          <Text style={styles.infoText}>
            Manage your student registration records using this simple system.
          </Text>

          <Text style={styles.infoText}>
            You can register, search, edit, and delete student records.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },

  container: {
    padding: 20,
  },

  header: {
    marginBottom: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
  },

  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 5,
  },

  statCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 15,
  },

  statLabel: {
    color: "#6b7280",
    fontSize: 14,
  },

  statNumber: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#2563eb",
    marginTop: 5,
  },

  statIcon: {
    fontSize: 40,
  },

  infoCard: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#111827",
  },

  infoText: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 21,
    marginBottom: 8,
  },
});
