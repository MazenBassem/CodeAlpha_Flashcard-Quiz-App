import { FlashcardProvider } from "@/context/FlashcardContext";
import { Stack } from "expo-router";
import { LogBox } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
LogBox.ignoreAllLogs(true);

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <SafeAreaProvider>
          <FlashcardProvider>
            <Stack>
              <Stack.Screen
                name="(tabs)"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="_editCard"
                options={{
                  headerTitle: "Edit Page",
                  headerTitleAlign: "center",
                  headerLeft: () => <></>,
                  headerShadowVisible: false,
                  headerTintColor: "#fff",
                  headerStyle: {
                    backgroundColor: "#25292e",
                  },
                }}
              />
            </Stack>
          </FlashcardProvider>
        </SafeAreaProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
