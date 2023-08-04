import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

// TRPC
import { trpc } from "./src/utils/trpc";
import { httpBatchLink } from "@trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Context
import { ThemeContext, Colors } from "@/context/theme";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Fonts
import { useFonts } from "expo-font";

// Components
import Dashboard from "@/screens/Dashboard";

const Tab = createBottomTabNavigator();

const Theme = {
  dark: true,
  colors: {
    background: "transparent",
    text: Colors.stone[50],
    card: Colors.stone[700],
    border: Colors.stone[700],
    primary: Colors.indigo[500],
    notification: Colors.stone[700],
  },
};

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:8124",
          async headers() {
            return {};
          },
        }),
      ],
    })
  );

  const [fontsLoaded] = useFonts({
    Quicksand: require("./assets/fonts/Quicksand.ttf"),
  });

  // if (!fontsLoaded) {
  //   return null;
  // }

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <LinearGradient
          style={{ flex: 1 }}
          colors={[Colors.stone[950], Colors.stone[900]]}
        >
          <ThemeContext.Provider value={{ colors: Colors }}>
            <NavigationContainer theme={Theme}>
              <Tab.Navigator
                screenOptions={{
                  headerShown: false,
                  tabBarStyle: {
                    backgroundColor: Colors.stone[950],
                  },
                }}
                initialRouteName="Dashboard"
              >
                <Tab.Screen name="Dashboard" component={Dashboard} />
              </Tab.Navigator>
            </NavigationContainer>
          </ThemeContext.Provider>
        </LinearGradient>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
