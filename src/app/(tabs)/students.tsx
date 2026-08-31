// Student Records
import { useMemo, useState } from "react";

import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";

import { Student, useStudents } from "../../context/StudentContext";

export default function Students() {
  const { students, deleteStudent } = useStudents();

  const [searchText, setSearchText] = useState("");
  const [selectedYear, setSelectedYear] = useState("All");

  // FILTER STUDENTS
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const search = searchText.toLowerCase().trim();

      const matchesSearch =
        student.fullName.toLowerCase().includes(search) ||
        student.studentId.toLowerCase().includes(search) ||
        student.course.toLowerCase().includes(search);

      const matchesYear =
        selectedYear === "All" || student.yearLevel === selectedYear;

      return matchesSearch && matchesYear;
    });
  }, [students, searchText, selectedYear]);

  // DELETE CONFIRMATION
  const handleDelete = (student: Student) => {
    Alert.alert(
      "Delete Student",
      `Are you sure you want to delete ${student.fullName}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteStudent(student.id);
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <Text style={styles.title}>Student Records</Text>

          <Text style={styles.subtitle}>
            View and manage registered students
          </Text>
        </View>

        {/* SEARCH */}

        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>

          <TextInput
            style={styles.searchInput}
            placeholder="Search name, ID, or course..."
            placeholderTextColor="#9ca3af"
            value={searchText}
            onChangeText={setSearchText}
          />

          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText("")}>
              <Text style={styles.clearButton}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* YEAR FILTER */}

        <Text style={styles.filterTitle}>Year Level</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
        >
          {["All", "1st Year", "2nd Year", "3rd Year", "4th Year"].map(
            (year) => (
              <TouchableOpacity
                key={year}
                style={[
                  styles.filterButton,
                  selectedYear === year && styles.filterButtonActive,
                ]}
                onPress={() => setSelectedYear(year)}
              >
                <Text
                  style={[
                    styles.filterText,
                    selectedYear === year && styles.filterTextActive,
                  ]}
                >
                  {year}
                </Text>
              </TouchableOpacity>
            ),
          )}
        </ScrollView>

        {/* RESULT COUNT */}

        <Text style={styles.resultCount}>
          {filteredStudents.length} student
          {filteredStudents.length !== 1 ? "s" : ""} found
        </Text>

        {/* STUDENT LIST */}

        {filteredStudents.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>🔎</Text>

            <Text style={styles.emptyTitle}>No Students Found</Text>

            <Text style={styles.emptyText}>
              Try changing your search or filter.
            </Text>
          </View>
        ) : (
          filteredStudents.map((student) => (
            <View key={student.id} style={styles.studentCard}>
              {/* STUDENT HEADER */}

              <View style={styles.studentHeader}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {student.fullName.charAt(0).toUpperCase()}
                  </Text>
                </View>

                <View style={styles.studentTitleArea}>
                  <Text style={styles.studentName}>{student.fullName}</Text>

                  <Text style={styles.studentId}>ID: {student.studentId}</Text>
                </View>
              </View>

              {/* INFORMATION */}

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Age</Text>

                <Text style={styles.infoValue}>{student.age}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Course</Text>

                <Text style={styles.infoValue}>{student.course}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Year Level</Text>

                <Text style={styles.infoValue}>{student.yearLevel}</Text>
              </View>

              {/* ACTION BUTTONS */}

              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.viewButton}
                  onPress={() =>
                    router.push({
                      pathname: "/student-details",
                      params: {
                        id: student.id,
                      },
                    })
                  }
                >
                  <Text style={styles.viewText}>👁 View</Text>
                </TouchableOpacity>

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
                  <Text style={styles.editText}>✏️ Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(student)}
                >
                  <Text style={styles.deleteText}>🗑 Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
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

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#111827",
  },

  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 5,
  },

  searchContainer: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 20,
  },

  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    paddingVertical: 13,
    fontSize: 15,
    color: "#111827",
  },

  clearButton: {
    fontSize: 18,
    color: "#6b7280",
    padding: 5,
  },

  filterTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 8,
  },

  filterScroll: {
    marginBottom: 15,
  },

  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    marginRight: 8,
  },

  filterButtonActive: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },

  filterText: {
    fontSize: 13,
    color: "#4b5563",
  },

  filterTextActive: {
    color: "#ffffff",
    fontWeight: "bold",
  },

  resultCount: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 12,
  },

  studentCard: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  studentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#dbeafe",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatarText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2563eb",
  },

  studentTitleArea: {
    flex: 1,
  },

  studentName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#111827",
  },

  studentId: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 3,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 7,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
  },

  infoLabel: {
    fontSize: 14,
    color: "#6b7280",
  },

  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
  },

  viewButton: {
    flex: 1,
    backgroundColor: "#f0fdf4",
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: "center",
  },

  viewText: {
    color: "#16a34a",
    fontWeight: "bold",
  },

  editButton: {
    flex: 1,
    backgroundColor: "#eff6ff",
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: "center",
  },

  editText: {
    color: "#2563eb",
    fontWeight: "bold",
  },

  deleteButton: {
    flex: 1,
    backgroundColor: "#fef2f2",
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: "center",
  },

  deleteText: {
    color: "#dc2626",
    fontWeight: "bold",
  },

  emptyCard: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 35,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  emptyIcon: {
    fontSize: 45,
    marginBottom: 10,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },

  emptyText: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 5,
    textAlign: "center",
  },
});
