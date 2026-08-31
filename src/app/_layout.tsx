import { Stack } from "expo-router";
import { StudentProvider } from "../context/StudentContext";

export default function RootLayout() {
  return (
    <StudentProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Dashboard",
          }}
        />

        <Stack.Screen
          name="students"
          options={{
            title: "Student Records",
          }}
        />

        <Stack.Screen
          name="register"
          options={{
            title: "Register Student",
          }}
        />
      </Stack>
    </StudentProvider>
  );
}
