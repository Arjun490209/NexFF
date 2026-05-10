import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { registerSchema } from "../src/validation/registerSchema";
import axios from "axios";
import { API } from "../src/config/api.js";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { setUser } from "../src/redux/slices/userSlice";
import { StatusBar } from "expo-status-bar";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    referralCode: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // 🔥 LIVE VALIDATION (IMPORTANT)
  const handleChange = async (key, value) => {
    const updatedForm = { ...form, [key]: value };
    setForm(updatedForm);

    try {
      await registerSchema.validateAt(key, updatedForm);

      setErrors((prev) => ({ ...prev, [key]: "" }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, [key]: err.message }));
    }
  };

  // 🔥 FINAL SUBMIT VALIDATION
  const handleRegister = async () => {
    try {
      setErrors({});

      await registerSchema.validate(form, { abortEarly: false });

      setLoading(true);

      const res = await axios.post(`${API}/auth/register`, form, {
        withCredentials: true,
      });
      const user = res.data.user;

      Toast.show({
        type: "success",
        text1: "Success 🎉",
        text2: res.data.message,
      });
      setForm({});

      router.push("/login");
    } catch (err) {
      if (err.inner) {
        const newErrors = {};

        err.inner.forEach((e) => {
          newErrors[e.path] = e.message;

          Toast.show({
            type: "error",
            text1: "Validation Error",
            text2: e.message,
          });
        });

        setErrors(newErrors);
      } else {
        Toast.show({
          type: "error",
          text1: "Error ❌",
          text2: err.response?.data?.message || err.message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-gray-900 flex-1">
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          >
            <View className="px-4 items-center gap-3">
              <Text className="text-white text-2xl font-bold mb-3">
                Create Account 🚀
              </Text>

              {/* Name */}
              <TextInput
                placeholder="Full Name"
                placeholderTextColor="#ccc"
                value={form.name}
                onChangeText={(t) => handleChange("name", t)}
                className={`border w-full px-4 py-3 rounded-xl text-white ${
                  errors.name ? "border-red-500" : "border-white"
                }`}
              />
              {errors.name && (
                <Text className="text-red-500 text-left">{errors.name}</Text>
              )}

              {/* Username */}
              <TextInput
                placeholder="Username"
                placeholderTextColor="#ccc"
                value={form.username}
                onChangeText={(t) => handleChange("username", t)}
                className={`border w-full px-4 py-3 rounded-xl text-white ${
                  errors.username ? "border-red-500" : "border-white"
                }`}
              />
              {errors.username && (
                <Text className="text-red-500">{errors.username}</Text>
              )}

              {/* Email */}
              <TextInput
                placeholder="Email"
                placeholderTextColor="#ccc"
                value={form.email}
                onChangeText={(t) => handleChange("email", t)}
                className={`border w-full px-4 py-3 rounded-xl text-white ${
                  errors.email ? "border-red-500" : "border-white"
                }`}
              />
              {errors.email && (
                <Text className="text-red-500">{errors.email}</Text>
              )}

              {/* Phone */}
              <TextInput
                placeholder="Phone Number"
                placeholderTextColor="#ccc"
                keyboardType="numeric"
                value={form.phone}
                onChangeText={(t) => handleChange("phone", t)}
                className={`border w-full px-4 py-3 rounded-xl text-white ${
                  errors.phone ? "border-red-500" : "border-white"
                }`}
              />
              {errors.phone && (
                <Text className="text-red-500">{errors.phone}</Text>
              )}

              {/* Password */}
              <View className="w-full relative">
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#ccc"
                  secureTextEntry={!showPassword}
                  value={form.password}
                  onChangeText={(t) => handleChange("password", t)}
                  className={`border w-full px-4 py-3 rounded-xl pr-12 text-white ${
                    errors.password ? "border-red-500" : "border-white"
                  }`}
                />

                <TouchableOpacity
                  className="absolute right-4 top-1/2"
                  style={{ transform: [{ translateY: -12 }] }}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye" : "eye-off"}
                    size={22}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text className="text-red-500">{errors.password}</Text>
              )}

              {/* Referral */}
              <TextInput
                placeholder="Referral Code (optional)"
                placeholderTextColor="#ccc"
                value={form.referralCode}
                onChangeText={(t) => handleChange("referralCode", t)}
                className="border border-white w-full px-4 py-3 rounded-xl text-white"
              />

              {/* Button */}
              <TouchableOpacity
                onPress={handleRegister}
                className="bg-yellow-500 w-full py-3 rounded-xl items-center mt-3"
              >
                {loading ? (
                  <ActivityIndicator color="black" />
                ) : (
                  <Text className="text-black font-bold text-lg">Register</Text>
                )}
              </TouchableOpacity>

              {/* Login */}
              <TouchableOpacity onPress={() => router.push("/login")}>
                <Text className="text-white mt-3">
                  Already have an account?{" "}
                  <Text className="text-yellow-400">Login</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;
