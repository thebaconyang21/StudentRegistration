import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: () => "🏠",
        }}
      />

      <Tabs.Screen
        name="students"
        options={{
          title: "Students",
          tabBarLabel: "Students",
          tabBarIcon: () => "👨‍🎓",
        }}
      />

      <Tabs.Screen
        name="register"
        options={{
          title: "Register",
          tabBarLabel: "Add",
          tabBarIcon: () => "➕",
        }}
      />
    </Tabs>
  );
}
