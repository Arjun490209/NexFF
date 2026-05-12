import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import avatar from "../../../assets/images/avatar.png";
import { useRouter } from "expo-router";

const WorkerAccount = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const worker = useSelector((state) => state?.user?.user);

  // 🔥 LOGOUT
  const handleLogout = async () => {
    await AsyncStorage.clear();
    dispatch(logout());

    Toast.show({
      type: "success",
      text1: "Logout Successful 👋",
    });

    navigation.reset({
      index: 0,
      routes: [{ name: "login" }],
    });
  };

  const confirmLogout = () => {
    Alert.alert("Logout", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: handleLogout },
    ]);
  };

  // 🔥 WORKER ACTIONS (MINI ADMIN POWER)
  const actions = [
    {
      title: "Create Tournament",
      icon: "add-circle",
      color: "#22c55e",
      onPress: () => router.push("/admin/create"),
    },
    {
      title: "Manage Matches",
      icon: "game-controller",
      color: "#3b82f6",
      onPress: () => router.push("/admin/tournaments"),
    },
    {
      title: "Add Winner Amount",
      icon: "cash",
      color: "#10b981",
      onPress: () => router.push("/admin/create"),
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* 🔥 PROFILE HEADER */}
        <LinearGradient
          colors={["#0f2027", "#203a43"]}
          style={{
            padding: 24,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            alignItems: "center",
          }}
        >
          <Image
            source={
              worker?.avatar && worker.avatar.startsWith("http")
                ? { uri: worker.avatar }
                : avatar
            }
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
              borderWidth: 3,
              borderColor: "#facc15",
            }}
          />

          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            {worker?.name}
          </Text>

          <Text style={{ color: "#9ca3af", fontSize: 13 }}>
            @{worker?.username}
          </Text>

          <Text style={{ color: "#facc15", fontSize: 12, marginTop: 4 }}>
            Worker Panel (Mini Admin)
          </Text>
        </LinearGradient>

        <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
          {/* 💰 QUICK WALLET */}
          <View
            style={{
              backgroundColor: "#111827",
              padding: 16,
              borderRadius: 16,
              marginBottom: 12,
            }}
          >
            <Text style={{ color: "#9ca3af" }}>Wallet Balance</Text>
            <Text
              style={{ color: "#facc15", fontSize: 22, fontWeight: "bold" }}
            >
              ₹{worker?.walletBalance || 0}
            </Text>
          </View>

          {/* ⚡ MINI ADMIN ACTION GRID */}
          <Text style={{ color: "#9ca3af", marginBottom: 10 }}>
            Control Panel
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
                <Text style={{ color: "#fff", marginTop: 6, fontSize: 12 }}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* 📊 QUICK STATS */}
          <View
            style={{
              backgroundColor: "#111827",
              padding: 16,
              borderRadius: 16,
              marginTop: 10,
            }}
          >
            <Text style={{ color: "#9ca3af", marginBottom: 6 }}>
              Worker Stats
            </Text>

            <Text style={{ color: "#fff" }}>
              Matches Managed: {worker?.matchesPlayed || 0}
            </Text>
            <Text style={{ color: "#22c55e", marginTop: 4 }}>
              Wins Verified: {worker?.matchesWon || 0}
            </Text>
          </View>

          {/* 🚪 LOGOUT */}
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

export default WorkerAccount;
