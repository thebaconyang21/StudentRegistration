// Register/Edit
import { useEffect, useState } from "react";

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

import { router, useLocalSearchParams } from "expo-router";

import { useStudents } from "../../context/StudentContext";

export default function RegisterStudent() {
  const params = useLocalSearchParams();

  const studentIdParam = typeof params.id === "string" ? params.id : undefined;

  const { students, addStudent, updateStudent } = useStudents();

  const editingStudent = students.find(
    (student) => student.id === studentIdParam,
  );

  const isEditing = editingStudent !== undefined;

  const [studentId, setStudentId] = useState("");
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");
  const [yearLevel, setYearLevel] = useState("");

  // Load information only when EDITING
  useEffect(() => {
    if (editingStudent) {
      setStudentId(editingStudent.studentId);
      setFullName(editingStudent.fullName);
      setAge(editingStudent.age);
      setCourse(editingStudent.course);
      setYearLevel(editingStudent.yearLevel);
    } else {
      // Empty form when registering a new student
      clearForm();
    }
  }, [studentIdParam]);

  // Clear all fields
  const clearForm = () => {
    setStudentId("");
    setFullName("");
    setAge("");
    setCourse("");
    setYearLevel("");
  };

  const saveStudent = () => {
    // Check if all fields are filled
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

    const studentData = {
      studentId: studentId.trim(),
      fullName: fullName.trim(),
      age: age.trim(),
      course: course.trim(),
      yearLevel: yearLevel.trim(),
    };

    // EDIT STUDENT
    if (isEditing && editingStudent) {
      updateStudent(editingStudent.id, studentData);

      Alert.alert("Success", "Student information updated!", [
        {
          text: "OK",
          onPress: () => {
            clearForm();
            router.replace("/students");
          },
        },
      ]);

      return;
    }

    // REGISTER NEW STUDENT
    addStudent(studentData);

    // Clear the form immediately
    clearForm();

    Alert.alert("Success", "Student successfully registered!", [
      {
        text: "OK",
        onPress: () => {
          router.replace("/students");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>
          {isEditing ? "Edit Student" : "Register Student"}
        </Text>

        <Text style={styles.subtitle}>
          {isEditing
            ? "Update student information"
            : "Enter the student's information"}
        </Text>

        <View style={styles.form}>
          {/* STUDENT ID */}

          <Text style={styles.label}>Student ID</Text>

          <TextInput
            style={styles.input}
            placeholder="Example: 2026-001"
            value={studentId}
            onChangeText={setStudentId}
          />

          {/* FULL NAME */}

          <Text style={styles.label}>Full Name</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter full name"
            value={fullName}
            onChangeText={setFullName}
          />

          {/* AGE */}

          <Text style={styles.label}>Age</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter age"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
          />

          {/* COURSE */}

          <Text style={styles.label}>Course</Text>

          <TextInput
            style={styles.input}
            placeholder="Example: BSIT"
            value={course}
            onChangeText={setCourse}
          />

          {/* YEAR LEVEL */}

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
              {isEditing ? "Update Student" : "Register Student"}
            </Text>
          </TouchableOpacity>

          {/* CANCEL BUTTON */}

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              clearForm();
              router.back();
            }}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
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
    paddingBottom: 40,
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
    marginBottom: 25,
  },

  form: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
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
    paddingVertical: 13,
    fontSize: 15,
    marginBottom: 16,
    backgroundColor: "#ffffff",
  },

  saveButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 15,
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
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 5,
  },

  cancelButtonText: {
    color: "#6b7280",
    fontSize: 15,
    fontWeight: "600",
  },
});
