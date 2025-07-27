import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffd33d",
        headerStyle: {
          backgroundColor: "#25292e",
        },
        headerTitleAlign: "center",

        headerShadowVisible: false,
        headerTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#25292e",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Flash Quiz Home",
          // headerLeft: () => <></>,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={24}
            />
          ),
          tabBarLabel: "Quiz",
        }}
      />
      <Tabs.Screen
        name="add-card"
        options={{
          headerTitle: "Add Card",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "add" : "add-circle"}
              color={color}
              size={24}
            />
          ),
          tabBarLabel: "Add Question",
        }}
      />
      <Tabs.Screen
        name="view-cards"
        options={{
          headerTitle: "View Cards",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "list" : "list-outline"}
              color={color}
              size={24}
            />
          ),
          tabBarLabel: "View Cards",
        }}
      />
    </Tabs>
  );
}
