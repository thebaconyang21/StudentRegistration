// Navigation
import { Stack } from "expo-router";
import { StudentProvider } from "../context/StudentContext";

export default function RootLayout() {
  return (
    <StudentProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </StudentProvider>
  );
}
