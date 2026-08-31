import { useState } from "react";

import {
    Alert,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { router } from "expo-router";

import { Student, useStudents } from "../context/StudentContext";

export default function Students() {
  const { students, deleteStudent } = useStudents();

  const [searchText, setSearchText] = useState("");

  const filteredStudents = students.filter((student) => {
    const search = searchText.toLowerCase();

    return (
      student.studentId.toLowerCase().includes(search) ||
      student.fullName.toLowerCase().includes(search) ||
      student.course.toLowerCase().includes(search) ||
      student.yearLevel.toLowerCase().includes(search)
    );
  });

  const handleDelete = (id: string) => {
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
            deleteStudent(id);
          },
        },
      ],
    );
  };

  const renderStudent = ({ item }: { item: Student }) => {
    return (
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {item.fullName.charAt(0).toUpperCase()}
            </Text>
          </View>

          <View style={styles.nameContainer}>
            <Text style={styles.name}>{item.fullName}</Text>

            <Text style={styles.id}>ID: {item.studentId}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Age</Text>

          <Text style={styles.value}>{item.age}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Course</Text>

          <Text style={styles.value}>{item.course}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Year Level</Text>

          <Text style={styles.value}>{item.yearLevel}</Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              router.push({
                pathname: "/register",
                params: {
                  id: item.id,
                },
              })
            }
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(item.id)}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* SEARCH */}

        <TextInput
          style={styles.search}
          placeholder="🔍 Search students..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />

        {/* COUNT */}

        <Text style={styles.count}>{filteredStudents.length} student(s)</Text>

        {/* LIST */}

        <FlatList
          data={filteredStudents}
          keyExtractor={(item) => item.id}
          renderItem={renderStudent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyIcon}>📋</Text>

              <Text style={styles.emptyTitle}>No students found</Text>

              <Text style={styles.emptyText}>
                Register a student to see the records here.
              </Text>

              <TouchableOpacity
                style={styles.emptyButton}
                onPress={() => router.push("/register")}
              >
                <Text style={styles.emptyButtonText}>Register Student</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },

  container: {
    flex: 1,
    padding: 20,
  },

  search: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    marginBottom: 10,
  },

  count: {
    color: "#6b7280",
    fontSize: 13,
    marginBottom: 12,
  },

  listContainer: {
    paddingBottom: 30,
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 25,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  avatarText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },

  nameContainer: {
    flex: 1,
  },

  name: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#111827",
  },

  id: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 3,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },

  label: {
    color: "#6b7280",
  },

  value: {
    fontWeight: "600",
    color: "#111827",
  },

  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
  },

  editButton: {
    flex: 1,
    backgroundColor: "#f59e0b",
    padding: 11,
    borderRadius: 8,
    alignItems: "center",
  },

  deleteButton: {
    flex: 1,
    backgroundColor: "#ef4444",
    padding: 11,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },

  empty: {
    alignItems: "center",
    paddingTop: 60,
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
    textAlign: "center",
    color: "#9ca3af",
    marginTop: 5,
  },

  emptyButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 15,
  },

  emptyButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});
