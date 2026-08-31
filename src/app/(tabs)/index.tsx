// Dashboard
import { router } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useStudents } from "../context/StudentContext";

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

        {/* REGISTER */}

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => router.push("/register")}
        >
          <Text style={styles.registerButtonText}>+ Register Student</Text>
        </TouchableOpacity>

        {/* VIEW STUDENTS */}

        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => router.push("/students")}
        >
          <Text style={styles.viewButtonText}>👨‍🎓 View Student Records</Text>
        </TouchableOpacity>

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

  registerButton: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },

  registerButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },

  viewButton: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2563eb",
    marginBottom: 20,
  },

  viewButtonText: {
    color: "#2563eb",
    fontWeight: "bold",
    fontSize: 16,
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
