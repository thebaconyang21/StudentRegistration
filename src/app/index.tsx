import { useState } from "react";

import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Student = {
  id: string;
  studentId: string;
  fullName: string;
  age: string;
  course: string;
  yearLevel: string;
};

export default function HomeScreen() {
  // =========================
  // FORM STATES
  // =========================

  const [studentId, setStudentId] = useState("");
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");
  const [yearLevel, setYearLevel] = useState("");

  // =========================
  // STUDENT RECORDS
  // =========================

  const [students, setStudents] = useState<Student[]>([]);

  // =========================
  // EDITING
  // =========================

  const [editingId, setEditingId] = useState<string | null>(null);

  // =========================
  // SEARCH
  // =========================

  const [searchText, setSearchText] = useState("");

  // =========================
  // MODAL
  // =========================

  const [modalVisible, setModalVisible] = useState(false);

  // =========================
  // CLEAR FORM
  // =========================

  const clearForm = () => {
    setStudentId("");
    setFullName("");
    setAge("");
    setCourse("");
    setYearLevel("");
    setEditingId(null);
  };

  // =========================
  // OPEN REGISTER FORM
  // =========================

  const openRegisterForm = () => {
    clearForm();
    setModalVisible(true);
  };

  // =========================
  // CLOSE FORM
  // =========================

  const closeForm = () => {
    clearForm();
    setModalVisible(false);
  };

  // =========================
  // ADD / UPDATE STUDENT
  // =========================

  const saveStudent = () => {
    // Validation
    if (
      studentId.trim() === "" ||
      fullName.trim() === "" ||
      age.trim() === "" ||
      course.trim() === "" ||
      yearLevel.trim() === ""
    ) {
      Alert.alert("Incomplete Information", "Please fill in all fields.");

      return;
    }

    // UPDATE STUDENT
    if (editingId !== null) {
      setStudents(
        students.map((student) =>
          student.id === editingId
            ? {
                ...student,
                studentId: studentId.trim(),
                fullName: fullName.trim(),
                age: age.trim(),
                course: course.trim(),
                yearLevel: yearLevel.trim(),
              }
            : student,
        ),
      );

      setModalVisible(false);
      clearForm();

      Alert.alert("Success", "Student information updated successfully!");

      return;
    }

    // ADD NEW STUDENT
    const newStudent: Student = {
      id: Date.now().toString(),
      studentId: studentId.trim(),
      fullName: fullName.trim(),
      age: age.trim(),
      course: course.trim(),
      yearLevel: yearLevel.trim(),
    };

    setStudents([...students, newStudent]);

    setModalVisible(false);
    clearForm();

    Alert.alert("Success", "Student successfully registered!");
  };

  // =========================
  // EDIT STUDENT
  // =========================

  const editStudent = (student: Student) => {
    setStudentId(student.studentId);
    setFullName(student.fullName);
    setAge(student.age);
    setCourse(student.course);
    setYearLevel(student.yearLevel);

    setEditingId(student.id);

    setModalVisible(true);
  };

  // =========================
  // DELETE STUDENT
  // =========================

  const deleteStudent = (id: string) => {
    Alert.alert(
      "Delete Student",
      "Are you sure you want to delete this student?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setStudents(students.filter((student) => student.id !== id));
          },
        },
      ],
    );
  };

  // =========================
  // SEARCH
  // =========================

  const filteredStudents = students.filter((student) => {
    const search = searchText.toLowerCase();

    return (
      student.studentId.toLowerCase().includes(search) ||
      student.fullName.toLowerCase().includes(search) ||
      student.course.toLowerCase().includes(search) ||
      student.yearLevel.toLowerCase().includes(search)
    );
  });

  // =========================
  // STUDENT CARD
  // =========================

  const renderStudent = ({ item }: { item: Student }) => {
    return (
      <View style={styles.studentCard}>
        <View style={styles.studentHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {item.fullName.charAt(0).toUpperCase()}
            </Text>
          </View>

          <View style={styles.studentHeaderText}>
            <Text style={styles.studentName}>{item.fullName}</Text>

            <Text style={styles.studentId}>ID: {item.studentId}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Age</Text>

          <Text style={styles.infoValue}>{item.age}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Course</Text>

          <Text style={styles.infoValue}>{item.course}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Year Level</Text>

          <Text style={styles.infoValue}>{item.yearLevel}</Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => editStudent(item)}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteStudent(item.id)}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // =========================
  // MAIN SCREEN
  // =========================

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* HEADER */}

        <View style={styles.header}>
          <Text style={styles.title}>🎓 Student System</Text>

          <Text style={styles.subtitle}>
            Manage student registration and records
          </Text>
        </View>

        {/* DASHBOARD */}

        <View style={styles.dashboardCard}>
          <View>
            <Text style={styles.dashboardLabel}>Total Students</Text>

            <Text style={styles.dashboardNumber}>{students.length}</Text>
          </View>

          <View style={styles.dashboardIcon}>
            <Text style={styles.dashboardIconText}>👨‍🎓</Text>
          </View>
        </View>

        {/* SEARCH */}

        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>

          <TextInput
            style={styles.searchInput}
            placeholder="Search students..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* REGISTER BUTTON */}

        <TouchableOpacity
          style={styles.registerButton}
          onPress={openRegisterForm}
        >
          <Text style={styles.registerButtonText}>+ Register Student</Text>
        </TouchableOpacity>

        {/* RECORD TITLE */}

        <View style={styles.recordsHeader}>
          <Text style={styles.recordsTitle}>Student Records</Text>

          <Text style={styles.recordsCount}>
            {filteredStudents.length} record(s)
          </Text>
        </View>

        {/* STUDENT LIST */}

        <FlatList
          data={filteredStudents}
          keyExtractor={(item) => item.id}
          renderItem={renderStudent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>📋</Text>

              <Text style={styles.emptyTitle}>No students found</Text>

              <Text style={styles.emptyText}>
                Register a student to see the record here.
              </Text>
            </View>
          }
        />
      </View>

      {/* =========================
          REGISTRATION MODAL
         ========================= */}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeForm}
      >
        <KeyboardAvoidingView
          style={styles.modalBackground}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.modalContainer}>
            {/* MODAL HEADER */}

            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>
                  {editingId !== null ? "Edit Student" : "Register Student"}
                </Text>

                <Text style={styles.modalSubtitle}>
                  {editingId !== null
                    ? "Update student information"
                    : "Enter student information"}
                </Text>
              </View>

              <TouchableOpacity style={styles.closeButton} onPress={closeForm}>
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>

            {/* FORM */}

            <View style={styles.form}>
              <Text style={styles.label}>Student ID</Text>

              <TextInput
                style={styles.input}
                placeholder="Example: 2026-001"
                value={studentId}
                onChangeText={setStudentId}
              />

              <Text style={styles.label}>Full Name</Text>

              <TextInput
                style={styles.input}
                placeholder="Enter full name"
                value={fullName}
                onChangeText={setFullName}
              />

              <Text style={styles.label}>Age</Text>

              <TextInput
                style={styles.input}
                placeholder="Enter age"
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
              />

              <Text style={styles.label}>Course</Text>

              <TextInput
                style={styles.input}
                placeholder="Example: BSIT"
                value={course}
                onChangeText={setCourse}
              />

              <Text style={styles.label}>Year Level</Text>

              <TextInput
                style={styles.input}
                placeholder="Example: 3rd Year"
                value={yearLevel}
                onChangeText={setYearLevel}
              />

              {/* SAVE BUTTON */}

              <TouchableOpacity style={styles.saveButton} onPress={saveStudent}>
                <Text style={styles.saveButtonText}>
                  {editingId !== null ? "Update Student" : "Register Student"}
                </Text>
              </TouchableOpacity>

              {/* CANCEL BUTTON */}

              <TouchableOpacity style={styles.cancelButton} onPress={closeForm}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

// =========================
// STYLES
// =========================

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
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
    marginTop: 4,
  },

  // DASHBOARD

  dashboardCard: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  dashboardLabel: {
    fontSize: 14,
    color: "#6b7280",
  },

  dashboardNumber: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#2563eb",
    marginTop: 3,
  },

  dashboardIcon: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: "#eff6ff",
    justifyContent: "center",
    alignItems: "center",
  },

  dashboardIconText: {
    fontSize: 28,
  },

  // SEARCH

  searchContainer: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 12,
  },

  searchIcon: {
    fontSize: 17,
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    paddingVertical: 13,
    fontSize: 15,
    color: "#111827",
  },

  // REGISTER BUTTON

  registerButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },

  registerButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },

  // RECORD HEADER

  recordsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  recordsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },

  recordsCount: {
    fontSize: 12,
    color: "#6b7280",
  },

  // LIST

  listContainer: {
    paddingBottom: 30,
  },

  // STUDENT CARD

  studentCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
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
    borderRadius: 25,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatarText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },

  studentHeaderText: {
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
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },

  infoLabel: {
    color: "#6b7280",
    fontSize: 14,
  },

  infoValue: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "600",
  },

  // BUTTONS

  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
  },

  editButton: {
    flex: 1,
    backgroundColor: "#f59e0b",
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: "center",
  },

  editButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },

  deleteButton: {
    flex: 1,
    backgroundColor: "#ef4444",
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: "center",
  },

  deleteButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },

  // EMPTY STATE

  emptyContainer: {
    alignItems: "center",
    paddingVertical: 50,
    paddingHorizontal: 20,
  },

  emptyIcon: {
    fontSize: 45,
    marginBottom: 10,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#374151",
  },

  emptyText: {
    fontSize: 14,
    color: "#9ca3af",
    textAlign: "center",
    marginTop: 5,
  },

  // MODAL

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },

  modalContainer: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    maxHeight: "90%",
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
  },

  modalSubtitle: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 3,
  },

  closeButton: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
  },

  closeButtonText: {
    fontSize: 25,
    color: "#374151",
    lineHeight: 27,
  },

  // FORM

  form: {
    paddingBottom: 10,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 9,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 14,
    backgroundColor: "#ffffff",
    fontSize: 15,
  },

  saveButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 9,
    alignItems: "center",
    marginTop: 5,
  },

  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },

  cancelButton: {
    paddingVertical: 13,
    borderRadius: 9,
    alignItems: "center",
    marginTop: 8,
  },

  cancelButtonText: {
    color: "#6b7280",
    fontSize: 15,
    fontWeight: "600",
  },
});
