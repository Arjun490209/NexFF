import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import avatar from "../../../assets/images/avatar.png";
import { Ionicons } from "@expo/vector-icons";
import { logout } from "../../redux/slices/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Toast } from "react-native-toast-message";

const UserAccount = () => {
  const user = useSelector((state) => state?.user?.user);

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      // 🔥 1. AsyncStorage clear
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");

      // 🔥 2. Redux clear (correct way)
      dispatch(logout());

      // 🔥 3. Toast message
      Toast.show({
        type: "success",
        text1: "Logout Successful 👋",
        text2: "See you again!",
        position: "top",
      });

      // 🔥 4. Navigation reset (IMPORTANT)
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });

      console.log("✅ Logout Success");
    } catch (error) {
      console.log("❌ Logout Error:", error);

      Toast.show({
        type: "error",
        text1: "Logout Failed ❌",
        text2: "Try again",
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 🔥 HEADER */}
        <LinearGradient
          colors={["#141E30", "#243B55"]}
          style={{
            padding: 24,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            marginBottom: 20,
          }}
        >
          <View className="items-center mt-4">
            {/* 🔥 Avatar with Glow */}
            <View
              style={{
                padding: 3,
                borderRadius: 60,
                backgroundColor: "#facc15",
              }}
            >
              <Image
                source={
                  user?.avatar && user.avatar.startsWith("http")
                    ? { uri: user.avatar }
                    : avatar
                }
                style={{
                  height: 90,
                  width: 90,
                  borderRadius: 50,
                }}
              />
            </View>

            {/* 👤 Name */}
            <Text className="text-white text-xl font-bold mt-3">
              {user?.name}
            </Text>

            {/* 🆔 Username */}
            <Text className="text-gray-400 text-sm mt-1">
              @{user?.username}
            </Text>

            {/* 🎮 UID (optional future use) */}
            <Text style={{ color: "#6b7280", fontSize: 12, marginTop: 4 }}>
              UID: {user?._id?.slice(-6)}
            </Text>

            {/* 🟢 KYC BADGE (Dynamic Color) */}
            <View
              style={{
                marginTop: 10,
                paddingHorizontal: 12,
                paddingVertical: 4,
                borderRadius: 20,
                backgroundColor:
                  user?.kycStatus === "verified"
                    ? "#00C853"
                    : user?.kycStatus === "pending"
                      ? "#FF9800"
                      : "#D32F2F",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              >
                {user?.kycStatus === "verified"
                  ? "✔ Verified"
                  : user?.kycStatus === "pending"
                    ? "⏳ Pending"
                    : "❌ Rejected"}
              </Text>
            </View>
          </View>
        </LinearGradient>

        <View
          className="px-4 mt-5"
          style={{
            marginBottom: 20,
          }}
        >
          {/* 💰 WALLET CARD */}
          <LinearGradient
            colors={["#232526", "#414345"]}
            style={{ borderRadius: 20, padding: 16 }}
          >
            <Text className="text-gray-400 text-sm">Total Balance</Text>

            <Text className="text-yellow-400 text-3xl font-bold mt-1">
              ₹{user?.walletBalance?.toFixed(2)}
            </Text>

            {/* SUB BALANCES */}
            <View
              className="flex-row justify-between mt-4"
              style={{
                marginTop: 20,
              }}
            >
              <View>
                <Text className="text-gray-400 text-xs">Deposited</Text>
                <Text className="text-white font-bold">
                  ₹{user?.totalDeposited}
                </Text>
              </View>

              <View>
                <Text className="text-gray-400 text-xs">Winnings</Text>
                <Text className="text-green-400 font-bold">
                  ₹{user?.totalWinnings}
                </Text>
              </View>

              <View>
                <Text className="text-gray-400 text-xs">Withdrawn</Text>
                <Text className="text-red-400 font-bold">
                  ₹{user?.totalWithdrawn}
                </Text>
              </View>
            </View>

            {/* BUTTONS */}
            <View className="flex-row mt-4 space-x-3 gap-3">
              <TouchableOpacity className="flex-1 bg-yellow-400 py-3 rounded-xl items-center">
                <Text className="text-black font-bold">Add Money</Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-1 bg-gray-800 py-3 rounded-xl items-center">
                <Text className="text-white">Withdraw</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>

          {/* 📊 STATS GRID */}
          <View
            className="flex-row flex-wrap justify-between mt-5"
            style={{
              marginTop: 20,
            }}
          >
            {[
              { label: "Matches", value: user?.matchesPlayed },
              { label: "Wins", value: user?.matchesWon },
              { label: "Kills", value: user?.kills },
              { label: "Win Rate", value: `${user?.winRate}%` },
            ].map((item, index) => (
              <View
                key={index}
                className="bg-gray-900 w-10 p-4 rounded-xl mb-3 items-center"
                style={{
                  width: 80,
                }}
              >
                <Text className="text-white text-lg font-bold">
                  {item.value}
                </Text>
                <Text className="text-gray-400 text-xs mt-1">{item.label}</Text>
              </View>
            ))}
          </View>

          {/* ⚙️ INFO */}

          <View
            style={{
              backgroundColor: "#111827",
              borderRadius: 20,
              padding: 16,
              marginTop: 12,
              marginBottom: 20,
              borderWidth: 1,
              borderColor: "#1f2937",
            }}
          >
            {/* Title */}
            <Text
              style={{
                color: "#9ca3af",
                fontSize: 13,
                marginBottom: 12,
                fontWeight: "600",
              }}
            >
              Account Info
            </Text>

            {/* Email */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Ionicons name="mail-outline" size={18} color="#9ca3af" />
              <Text style={{ color: "#fff", marginLeft: 10, fontSize: 14 }}>
                {user?.email || "Not Added"}
              </Text>
            </View>

            {/* Phone */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Ionicons name="call-outline" size={18} color="#9ca3af" />
              <Text style={{ color: "#fff", marginLeft: 10, fontSize: 14 }}>
                {user?.phone}
              </Text>
            </View>

            {/* Country */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Ionicons name="globe-outline" size={18} color="#9ca3af" />
              <Text style={{ color: "#fff", marginLeft: 10, fontSize: 14 }}>
                {user?.country}
              </Text>
            </View>

            {/* Referral */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
                paddingTop: 10,
                borderTopWidth: 1,
                borderTopColor: "#1f2937",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="gift-outline" size={18} color="#9ca3af" />
                <Text style={{ color: "#fff", marginLeft: 10, fontSize: 14 }}>
                  {user?.referralCode}
                </Text>
              </View>

              {/* Copy Button */}
              <TouchableOpacity
                style={{
                  backgroundColor: "#facc15",
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 8,
                }}
                onPress={() => {
                  // future: copy to clipboard
                  console.log("Copied!");
                }}
              >
                <Text
                  style={{ color: "#000", fontSize: 12, fontWeight: "bold" }}
                >
                  COPY
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* LogOut */}

          <TouchableOpacity
            style={{
              backgroundColor: "#1f2937",
              padding: 14,
              borderRadius: 12,
              marginTop: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={18} color="#ef4444" />
            <Text
              style={{
                color: "#ef4444",
                marginLeft: 8,
                fontWeight: "bold",
                fontSize: 14,
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserAccount;
