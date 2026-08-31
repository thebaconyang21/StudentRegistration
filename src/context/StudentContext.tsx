// Shared student data
import { createContext, ReactNode, useContext, useState } from "react";

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

export function StudentProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>([]);

  const addStudent = (student: Omit<Student, "id">) => {
    const newStudent: Student = {
      id: Date.now().toString(),
      ...student,
    };

    setStudents((currentStudents) => [...currentStudents, newStudent]);
  };

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
