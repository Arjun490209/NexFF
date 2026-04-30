import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const AdminAccount = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    dispatch(logout());

    Toast.show({ type: "success", text1: "Logout Successful 👋" });
    router.replace("/login");
  };

  const confirmLogout = () => {
    Alert.alert("Logout", "Are you sure?", [
      { text: "Cancel" },
      { text: "Logout", onPress: handleLogout },
    ]);
  };

  // 🔥 IMPORTANT ACTION BUTTONS
  const actions = [
    {
      title: "Create Tournament",
      icon: "add-circle",
      color: "#facc15",
      onPress: () => router.push("/admin/create"), // ✅ FIXED
    },
    {
      title: "All Tournaments",
      icon: "list",
      color: "#3b82f6",
      onPress: () => router.push("/admin/tournaments"),
    },
    {
      title: "Users",
      icon: "people",
      color: "#22c55e",
      onPress: () => router.push("/admin/users"),
    },
    // {
    //   title: "Transactions",
    //   icon: "card",
    //   color: "#f59e0b",
    //   onPress: () => router.push("/transactions"),
    // },
    // {
    //   title: "Analytics",
    //   icon: "bar-chart",
    //   color: "#ef4444",
    //   onPress: () => router.push("/analytics"),
    // },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* HEADER */}
        <LinearGradient
          colors={["#0f2027", "#203a43", "#2c5364"]}
          style={{ padding: 20, borderRadius: 20 }}
        >
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
            Admin Dashboard 👑
          </Text>
        </LinearGradient>

        {/* 🔥 ACTION GRID */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          {actions.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={item.onPress}
              style={{
                width: "48%",
                backgroundColor: "#1f2937",
                padding: 16,
                borderRadius: 14,
                marginBottom: 12,
                alignItems: "center",
              }}
            >
              <Ionicons name={item.icon} size={26} color={item.color} />
              <Text style={{ color: "#fff", marginTop: 8, fontSize: 13 }}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* LOGOUT BUTTON */}
        <TouchableOpacity
          onPress={confirmLogout}
          style={{
            backgroundColor: "#1f2937",
            padding: 14,
            borderRadius: 12,
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="log-out-outline" size={18} color="#ef4444" />
          <Text style={{ color: "#ef4444", marginLeft: 8, fontWeight: "bold" }}>
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminAccount;
