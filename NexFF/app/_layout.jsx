import { Stack, Redirect, useSegments } from "expo-router";
import "../global.css";
import Toast from "react-native-toast-message";
import { Provider, useDispatch } from "react-redux";
import store from "../src/redux/store/store";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser } from "../src/redux/slices/userSlice";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, ActivityIndicator } from "react-native";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </Provider>
  );
}

function AppContent() {
  const dispatch = useDispatch();
  const segments = useSegments(); // 🔥 important
  const [loading, setLoading] = useState(true);
  const [user, setUserState] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem("user");

        if (savedUser) {
          const parsed = JSON.parse(savedUser);
          dispatch(setUser(parsed));
          setUserState(parsed);
        }
      } catch (e) {
        console.log("Storage Error:", e);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        <ActivityIndicator size="large" color="yellow" />
      </View>
    );
  }

  const inAuthScreen = segments[0] === "login" || segments[0] === "register";

  // 🔥 FIX: prevent redirect loop
  if (!user && !inAuthScreen) {
    return <Redirect href="/login" />;
  }

  if (user && inAuthScreen) {
    return <Redirect href="/(tabs)/home" />;
  }

  return (
    <>
      <StatusBar style="light" />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="contest/[id]" />
      </Stack>

      <Toast />
    </>
  );
}
