import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import logo from "../assets/images/logo.png";
import { API } from "../src/config/api.js";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { setUser } from "../src/redux/slices/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const login = () => {
  const user = useSelector((state) => state.user.user);

  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!identifier || !password) {
      Toast.show({
        type: "error",
        text1: "Error ❌",
        text2: "Please enter email & password",
      });
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${API}/auth/login`, {
        identifier,
        password,
      });

      // Redux me save
      dispatch(
        setUser({
          user: res.data.user,
          token: res.data.token,
        }),
      );

      // 🔥 AsyncStorage me save
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({
          user: res.data.user,
          token: res.data.token,
        }),
      );

      // ✅ Toast success
      Toast.show({
        type: "success",
        text1: "Login Successful 🎉",
        text2: `Welcome ${res.data.user.name}`,
      });

      // ✅ Redirect
      router.replace("/home");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Login Failed ❌",
        text2: error.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-gray-900 flex-1 ">
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            keyboardShouldPersistTaps="handled"
          >
            <View className="items-center px-4">
              {/* Logo */}
              <Image source={logo} className="w-28 h-28 mb-2" />

              <Text className="text-white text-2xl font-semibold mb-4">
                Welcome To NexFF
              </Text>

              {/* Inputs */}
              <View className="w-full items-center gap-4">
                {/* Email */}
                <TextInput
                  value={identifier}
                  onChangeText={setIdentifier}
                  className="border border-white/80 text-white px-4 py-3 w-11/12 rounded-xl text-lg"
                  placeholder="Enter Email or Username or Phone number"
                  placeholderTextColor="#ccc"
                  keyboardType="email-address"
                />

                {/* Password */}
                <View className="w-full items-center relative">
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    className="border border-white/80 text-white px-4 py-3 w-11/12 rounded-xl text-lg pr-12"
                    placeholder="Enter Password"
                    placeholderTextColor="#ccc"
                    secureTextEntry={!showPassword}
                  />

                  <TouchableOpacity
                    className="absolute right-8 top-1/2"
                    style={{ transform: [{ translateY: -12 }] }}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? "eye" : "eye-off"}
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>

                {/* Login Button */}
                <TouchableOpacity
                  onPress={handleLogin}
                  className="bg-yellow-500 w-11/12 py-3 rounded-xl items-center mt-2"
                >
                  {loading ? (
                    <ActivityIndicator color="black" />
                  ) : (
                    <Text className="text-black font-bold text-lg">Login</Text>
                  )}
                </TouchableOpacity>

                {/* Register */}
                <View className="flex-row gap-2 mt-3">
                  <Text className="text-gray-300">Don't have an account?</Text>

                  <TouchableOpacity onPress={() => router.push("/register")}>
                    <Text className="text-yellow-400 font-semibold">
                      Register
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default login;
