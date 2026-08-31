// Shared student data
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

export type Student = {
  id: string;
  studentId: string;
  fullName: string;
  age: string;
  course: string;
  yearLevel: string;
};

type StudentContextType = {
  students: Student[];
  addStudent: (student: Omit<Student, "id">) => void;
  updateStudent: (id: string, student: Omit<Student, "id">) => void;
  deleteStudent: (id: string) => void;
};

const StudentContext = createContext<StudentContextType | undefined>(undefined);

const STORAGE_KEY = "@student_registration_data";

export function StudentProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  // LOAD STUDENTS WHEN APP STARTS
  useEffect(() => {
    loadStudents();
  }, []);

  // LOAD DATA FROM PHONE STORAGE
  const loadStudents = async () => {
    try {
      const savedStudents = await AsyncStorage.getItem(STORAGE_KEY);

      if (savedStudents !== null) {
        setStudents(JSON.parse(savedStudents));
      }
    } catch (error) {
      console.log("Error loading students:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // SAVE DATA TO PHONE STORAGE
  useEffect(() => {
    if (!isLoading) {
      saveStudents();
    }
  }, [students, isLoading]);

  const saveStudents = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    } catch (error) {
      console.log("Error saving students:", error);
    }
  };

  // ADD STUDENT
  const addStudent = (student: Omit<Student, "id">) => {
    const newStudent: Student = {
      id: Date.now().toString(),
      ...student,
    };

    setStudents((currentStudents) => [...currentStudents, newStudent]);
  };

  // UPDATE STUDENT
  const updateStudent = (id: string, updatedStudent: Omit<Student, "id">) => {
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === id
          ? {
              id,
              ...updatedStudent,
            }
          : student,
      ),
    );
  };

  // DELETE STUDENT
  const deleteStudent = (id: string) => {
    setStudents((currentStudents) =>
      currentStudents.filter((student) => student.id !== id),
    );
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        addStudent,
        updateStudent,
        deleteStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudents() {
  const context = useContext(StudentContext);

  if (!context) {
    throw new Error("useStudents must be used inside StudentProvider");
  }

  return context;
}
