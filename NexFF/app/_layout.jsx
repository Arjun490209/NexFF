import { Stack } from "expo-router";
import "../global.css";
import Toast from "react-native-toast-message"; // ✅ FIXED
import { Provider, useDispatch } from "react-redux";
import store from "../src/redux/store/store";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser } from "../src/redux/slices/userSlice";
import { SafeAreaProvider } from "react-native-safe-area-context"; // ✅ IMPORTANT

// export const API = "http://192.168.239.227:3000/api";
export const API = "https://nexff.onrender.com/api";

// 🔥 Outer Component
export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </Provider>
  );
}

// 🔥 Inner Component
function AppContent() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem("user");

        if (savedUser) {
          dispatch(setUser(JSON.parse(savedUser)));
        }
      } catch (error) {
        console.log("Storage Error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) return null;

  return (
    <>
      <StatusBar style="light" />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
      </Stack>

      {/* 🔥 Toast MUST be here */}
      <Toast />
    </>
  );
}
