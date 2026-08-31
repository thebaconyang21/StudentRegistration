import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { router, useLocalSearchParams } from "expo-router";

import { useStudents } from "../context/StudentContext";

export default function StudentDetails() {
  const { id } = useLocalSearchParams();

  const { students } = useStudents();

  const student = students.find((item) => item.id === id);

  // STUDENT NOT FOUND
  if (!student) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundIcon}>🔍</Text>

          <Text style={styles.notFoundTitle}>Student Not Found</Text>

          <Text style={styles.notFoundText}>
            The student record could not be found.
          </Text>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>← Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* BACK BUTTON */}

        <TouchableOpacity style={styles.backRow} onPress={() => router.back()}>
          <Text style={styles.backArrow}>←</Text>

          <Text style={styles.backText}>Student Details</Text>
        </TouchableOpacity>

        {/* PROFILE */}

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {student.fullName.charAt(0).toUpperCase()}
            </Text>
          </View>

          <Text style={styles.studentName}>{student.fullName}</Text>

          <Text style={styles.studentId}>Student ID: {student.studentId}</Text>
        </View>

        {/* PERSONAL INFORMATION */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Full Name</Text>

              <Text style={styles.infoValue}>{student.fullName}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Age</Text>

              <Text style={styles.infoValue}>{student.age}</Text>
            </View>
          </View>
        </View>

        {/* ACADEMIC INFORMATION */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Academic Information</Text>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Student ID</Text>

              <Text style={styles.infoValue}>{student.studentId}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Course</Text>

              <Text style={styles.infoValue}>{student.course}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Year Level</Text>

              <Text style={styles.infoValue}>{student.yearLevel}</Text>
            </View>
          </View>
        </View>

        {/* EDIT BUTTON */}

        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            router.push({
              pathname: "/register",
              params: {
                id: student.id,
              },
            })
          }
        >
          <Text style={styles.editButtonText}>✏️ Edit Student</Text>
        </TouchableOpacity>
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
    paddingBottom: 40,
  },

  backRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  backArrow: {
    fontSize: 25,
    color: "#111827",
    marginRight: 8,
  },

  backText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },

  profileCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 25,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 25,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#dbeafe",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  avatarText: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#2563eb",
  },

  studentName: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
  },

  studentId: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 5,
  },

  section: {
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 10,
  },

  infoCard: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },

  infoLabel: {
    fontSize: 14,
    color: "#6b7280",
  },

  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    maxWidth: "55%",
    textAlign: "right",
  },

  editButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },

  editButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
  },

  notFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },

  notFoundIcon: {
    fontSize: 50,
    marginBottom: 15,
  },

  notFoundTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
  },

  notFoundText: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 20,
  },

  backButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 8,
  },

  backButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});
