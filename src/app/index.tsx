import { useState } from "react";
import {
  Alert,
  FlatList,
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
  const [studentId, setStudentId] = useState("");
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");
  const [yearLevel, setYearLevel] = useState("");

  const [students, setStudents] = useState<Student[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [searchText, setSearchText] = useState("");

  const clearForm = () => {
    setStudentId("");
    setFullName("");
    setAge("");
    setCourse("");
    setYearLevel("");
    setEditingId(null);
  };

  const filteredStudents = students.filter((student) => {
    const search = searchText.toLowerCase();

    return (
      student.studentId.toLowerCase().includes(search) ||
      student.fullName.toLowerCase().includes(search) ||
      student.course.toLowerCase().includes(search) ||
      student.yearLevel.toLowerCase().includes(search)
    );
  });
  // const addStudent = () => {
  //   // Check if fields are empty
  //   if (
  //     studentId.trim() === "" ||
  //     fullName.trim() === "" ||
  //     age.trim() === "" ||
  //     course.trim() === "" ||
  //     yearLevel.trim() === ""
  //   ) {
  //     Alert.alert("Incomplete Information", "Please fill in all fields.");

  //     return;
  //   }

  //   // Create new student
  //   const newStudent: Student = {
  //     id: Date.now().toString(),
  //     studentId: studentId,
  //     fullName: fullName,
  //     age: age,
  //     course: course,
  //     yearLevel: yearLevel,
  //   };

  //   // Add student to the list
  //   setStudents([...students, newStudent]);

  //   // Clear the form
  //   setStudentId("");
  //   setFullName("");
  //   setAge("");
  //   setCourse("");
  //   setYearLevel("");

  //   Alert.alert("Success", "Student successfully registered!");
  // };

  const addStudent = () => {
    // Check if fields are empty
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

    // If we are editing a student
    if (editingId !== null) {
      setStudents(
        students.map((student) =>
          student.id === editingId
            ? {
                ...student,
                studentId: studentId,
                fullName: fullName,
                age: age,
                course: course,
                yearLevel: yearLevel,
              }
            : student,
        ),
      );

      setEditingId(null);

      clearForm();

      Alert.alert("Success", "Student information updated!");

      return;
    }

    // Create new student
    const newStudent: Student = {
      id: Date.now().toString(),
      studentId: studentId,
      fullName: fullName,
      age: age,
      course: course,
      yearLevel: yearLevel,
    };

    // Add student
    setStudents([...students, newStudent]);

    clearForm();

    Alert.alert("Success", "Student successfully registered!");
  };

  const editStudent = (student: Student) => {
    setStudentId(student.studentId);
    setFullName(student.fullName);
    setAge(student.age);
    setCourse(student.course);
    setYearLevel(student.yearLevel);

    setEditingId(student.id);
  };

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

  const renderStudent = ({ item }: { item: Student }) => {
    return (
      <View style={styles.studentCard}>
        <Text style={styles.studentName}>{item.fullName}</Text>

        <Text>Student ID: {item.studentId}</Text>

        <Text>Age: {item.age}</Text>

        <Text>Course: {item.course}</Text>

        <Text>Year Level: {item.yearLevel}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => editStudent(item)}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteStudent(item.id)}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Registration System</Text>

      {/* FORM */}

      <View style={styles.form}>
        <Text style={styles.label}>Student ID</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter student ID"
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
          placeholder="Enter course"
          value={course}
          onChangeText={setCourse}
        />

        <Text style={styles.label}>Year Level</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter year level"
          value={yearLevel}
          onChangeText={setYearLevel}
        />

        <TouchableOpacity style={styles.addButton} onPress={addStudent}>
          <Text style={styles.addButtonText}>
            {editingId !== null ? "Update Student" : "+ Register Student"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* STUDENT RECORDS */}

      <Text style={styles.recordsTitle}>Registered Students</Text>

      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={renderStudent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No students registered yet.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  form: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },

  label: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "white",
  },

  addButton: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 6,
    alignItems: "center",
  },

  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  recordsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  studentCard: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  studentName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },

  deleteButton: {
    flex: 1,
    backgroundColor: "#dc2626",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },

  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },

  emptyText: {
    textAlign: "center",
    color: "#777",
    marginTop: 20,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },

  editButton: {
    flex: 1,
    backgroundColor: "#f59e0b",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
