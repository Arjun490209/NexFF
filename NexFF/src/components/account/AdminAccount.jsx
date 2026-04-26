import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const AdminAccount = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // 🔥 LOGOUT FUNCTION
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");

      dispatch(logout());

      Toast.show({
        type: "success",
        text1: "Logout Successful 👋",
      });

      navigation.reset({
        index: 0,
        routes: [{ name: "login" }],
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Logout Failed ❌",
      });
    }
  };

  // 🔥 CONFIRM POPUP
  const confirmLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: handleLogout },
    ]);
  };

  const stats = [
    { label: "Users", value: "1200", icon: "people-outline", color: "#3b82f6" },
    {
      label: "Matches",
      value: "85",
      icon: "game-controller-outline",
      color: "#f59e0b",
    },
    { label: "Revenue", value: "₹45K", icon: "cash-outline", color: "#22c55e" },
    {
      label: "Withdraw",
      value: "32",
      icon: "wallet-outline",
      color: "#ef4444",
    },
  ];

  const actions = [
    { label: "Users", icon: "people-outline", screen: "ManageUsers" },
    { label: "Create", icon: "add-circle-outline", screen: "CreateTournament" },
    { label: "Analytics", icon: "bar-chart-outline", screen: "Analytics" },
    { label: "Payments", icon: "card-outline", screen: "Transactions" },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* 🔥 HEADER */}
        <LinearGradient
          colors={["#0f2027", "#203a43", "#2c5364"]}
          style={{
            paddingHorizontal: 16,
            paddingVertical: 20,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 22, fontWeight: "bold" }}>
            Admin Dashboard 👑
          </Text>
          <Text style={{ color: "#d1d5db", fontSize: 13, marginTop: 4 }}>
            Manage your platform
          </Text>
        </LinearGradient>

        {/* MAIN */}
        <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
          {/* 📊 STATS */}
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {stats.map((item, index) => (
              <View
                key={index}
                style={{
                  width: "48%",
                  backgroundColor: "#111827",
                  padding: 16,
                  borderRadius: 16,
                  marginBottom: 12,
                }}
              >
                <Ionicons name={item.icon} size={22} color={item.color} />
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 18,
                    fontWeight: "bold",
                    marginTop: 8,
                  }}
                >
                  {item.value}
                </Text>
                <Text style={{ color: "#9ca3af", fontSize: 12 }}>
                  {item.label}
                </Text>
              </View>
            ))}
          </View>

          {/* ⚡ ACTIONS */}
          <Text style={{ color: "#9ca3af", marginTop: 10, marginBottom: 8 }}>
            Quick Actions
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {actions.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate(item.screen)}
                style={{
                  width: "48%",
                  backgroundColor: "#1f2937",
                  padding: 16,
                  borderRadius: 14,
                  marginBottom: 12,
                  alignItems: "center",
                }}
              >
                <Ionicons name={item.icon} size={24} color="#facc15" />
                <Text style={{ color: "#fff", marginTop: 6 }}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* 📋 ACTIVITY */}
          <View
            style={{
              backgroundColor: "#111827",
              padding: 16,
              borderRadius: 16,
              marginTop: 10,
            }}
          >
            <Text style={{ color: "#9ca3af", marginBottom: 8 }}>
              Recent Activity
            </Text>

            <Text style={{ color: "#fff", fontSize: 13 }}>
              • User joined tournament
            </Text>
            <Text style={{ color: "#fff", fontSize: 13, marginTop: 4 }}>
              • ₹500 withdrawal request
            </Text>
            <Text style={{ color: "#fff", fontSize: 13, marginTop: 4 }}>
              • New match created
            </Text>
          </View>

          {/* 🔥 LOGOUT BUTTON */}
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
            <Text
              style={{ color: "#ef4444", marginLeft: 8, fontWeight: "bold" }}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminAccount;
