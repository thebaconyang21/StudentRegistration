import { ScrollView, StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useStudents } from "../../context/StudentContext";

export default function Home() {
  const { students } = useStudents();

  // TOTAL STUDENTS
  const totalStudents = students.length;

  // COURSE COUNTS
  const courseCounts: {
    [key: string]: number;
  } = {};

  students.forEach((student) => {
    const course = student.course.trim();

    if (course !== "") {
      courseCounts[course] = (courseCounts[course] || 0) + 1;
    }
  });

  // YEAR LEVEL COUNTS
  const firstYear = students.filter(
    (student) => student.yearLevel.toLowerCase() === "1st year",
  ).length;

  const secondYear = students.filter(
    (student) => student.yearLevel.toLowerCase() === "2nd year",
  ).length;

  const thirdYear = students.filter(
    (student) => student.yearLevel.toLowerCase() === "3rd year",
  ).length;

  const fourthYear = students.filter(
    (student) => student.yearLevel.toLowerCase() === "4th year",
  ).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <Text style={styles.title}>🎓 Student System</Text>

          <Text style={styles.subtitle}>Student Registration Management</Text>
        </View>

        {/* TOTAL STUDENTS */}

        <View style={styles.totalCard}>
          <View>
            <Text style={styles.totalLabel}>Total Students</Text>

            <Text style={styles.totalNumber}>{totalStudents}</Text>

            <Text style={styles.totalDescription}>Registered students</Text>
          </View>

          <Text style={styles.bigIcon}>👨‍🎓</Text>
        </View>

        {/* STATISTICS TITLE */}

        <Text style={styles.sectionTitle}>Student Statistics</Text>

        {/* STATISTICS GRID */}

        <View style={styles.grid}>
          {/* COURSE STATISTICS */}

          {Object.entries(courseCounts).map(([course, count]) => (
            <View style={styles.statCard} key={course}>
              <Text style={styles.statIcon}>💻</Text>

              <Text style={styles.statNumber}>{count}</Text>

              <Text style={styles.statLabel}>{course}</Text>
            </View>
          ))}

          {/* 1ST YEAR */}

          <View style={styles.statCard}>
            <Text style={styles.statIcon}>1️⃣</Text>

            <Text style={styles.statNumber}>{firstYear}</Text>

            <Text style={styles.statLabel}>1st Year</Text>
          </View>

          {/* 2ND YEAR */}

          <View style={styles.statCard}>
            <Text style={styles.statIcon}>2️⃣</Text>

            <Text style={styles.statNumber}>{secondYear}</Text>

            <Text style={styles.statLabel}>2nd Year</Text>
          </View>

          {/* 3RD YEAR */}

          <View style={styles.statCard}>
            <Text style={styles.statIcon}>3️⃣</Text>

            <Text style={styles.statNumber}>{thirdYear}</Text>

            <Text style={styles.statLabel}>3rd Year</Text>
          </View>

          {/* 4TH YEAR */}

          <View style={styles.statCard}>
            <Text style={styles.statIcon}>4️⃣</Text>

            <Text style={styles.statNumber}>{fourthYear}</Text>

            <Text style={styles.statLabel}>4th Year</Text>
          </View>
        </View>

        {/* QUICK INFORMATION */}

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Quick Information</Text>

          <Text style={styles.infoText}>
            Use the Add tab to register a new student.
          </Text>

          <Text style={styles.infoText}>
            Use the Students tab to view, search, edit, or delete student
            records.
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
    paddingBottom: 40,
  },

  header: {
    marginBottom: 20,
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

  totalCard: {
    backgroundColor: "#2563eb",
    borderRadius: 16,
    padding: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  totalLabel: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },

  totalNumber: {
    color: "#ffffff",
    fontSize: 42,
    fontWeight: "bold",
    marginTop: 3,
  },

  totalDescription: {
    color: "#dbeafe",
    fontSize: 13,
  },

  bigIcon: {
    fontSize: 55,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 12,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  statCard: {
    backgroundColor: "#ffffff",
    width: "48%",
    borderRadius: 14,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  statIcon: {
    fontSize: 28,
    marginBottom: 8,
  },

  statNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
  },

  statLabel: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 3,
  },

  infoCard: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginTop: 12,
  },

  infoTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 10,
  },

  infoText: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 21,
    marginBottom: 8,
  },
});
