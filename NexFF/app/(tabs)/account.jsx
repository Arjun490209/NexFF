import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import defaultAvatar from "../../assets/images/avatar.png";

const Account = () => {
  const user = useSelector((state) => state?.user?.user);

  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-black justify-center items-center">
        <Text className="text-white">Loading...</Text>
      </SafeAreaView>
    );
  }

  const role = user?.role || "user";

  const avatarSource =
    user?.avatar && user.avatar.startsWith("http")
      ? { uri: user.avatar }
      : defaultAvatar;

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
        {/* 🔥 PROFILE */}
        <View className="items-center mt-6 mb-6">
          <Image
            source={avatarSource}
            className="h-24 w-24 rounded-full border-4 border-yellow-400"
          />

          <Text className="text-white text-xl font-bold mt-3">{user.name}</Text>

          <Text className="text-gray-400 text-sm">@{user.username}</Text>

          {/* Role Badge */}
          <View className="mt-2 px-3 py-1 rounded-full bg-gray-800 border border-gray-700">
            <Text className="text-yellow-400 text-xs uppercase">{role}</Text>
          </View>
        </View>

        {/* ================= USER UI ================= */}
        {role === "user" && (
          <>
            {/* 💰 WALLET */}
            <View className="bg-gray-900 rounded-2xl p-4 mb-5">
              <Text className="text-gray-400">Balance</Text>
              <Text className="text-yellow-400 text-3xl font-bold">
                ₹{user.walletBalance}
              </Text>

              <View className="flex-row mt-4 space-x-3">
                <TouchableOpacity className="flex-1 bg-yellow-400 py-2 rounded-xl items-center">
                  <Text className="text-black font-bold">Add Money</Text>
                </TouchableOpacity>

                <TouchableOpacity className="flex-1 bg-gray-800 py-2 rounded-xl items-center">
                  <Text className="text-white">Withdraw</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* 📊 STATS */}
            <View className="bg-gray-900 rounded-2xl p-4 mb-5">
              <Text className="text-gray-400 mb-3">Stats</Text>

              <View className="flex-row justify-between">
                <Text className="text-white">
                  Matches: {user.matchesPlayed}
                </Text>
                <Text className="text-green-400">Wins: {user.matchesWon}</Text>
              </View>
            </View>
          </>
        )}

        {/* ================= WORKER UI ================= */}
        {role === "worker" && (
          <>
            <View className="bg-gray-900 rounded-2xl p-4 mb-5">
              <Text className="text-yellow-400 font-bold mb-3">
                Worker Panel
              </Text>

              <TouchableOpacity className="py-2 border-b border-gray-700">
                <Text className="text-white">📋 Manage Matches</Text>
              </TouchableOpacity>

              <TouchableOpacity className="py-2 border-b border-gray-700">
                <Text className="text-white">✅ Verify Results</Text>
              </TouchableOpacity>

              <TouchableOpacity className="py-2">
                <Text className="text-white">💰 Approve Withdrawals</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* ================= ADMIN UI ================= */}
        {role === "admin" && (
          <>
            <View className="bg-gray-900 rounded-2xl p-4 mb-5">
              <Text className="text-red-400 font-bold mb-3">
                Admin Panel 👑
              </Text>

              <TouchableOpacity className="py-2 border-b border-gray-700">
                <Text className="text-white">👥 Manage Users</Text>
              </TouchableOpacity>

              <TouchableOpacity className="py-2 border-b border-gray-700">
                <Text className="text-white">🎮 Create Tournament</Text>
              </TouchableOpacity>

              <TouchableOpacity className="py-2 border-b border-gray-700">
                <Text className="text-white">📊 Analytics</Text>
              </TouchableOpacity>

              <TouchableOpacity className="py-2">
                <Text className="text-white">💰 All Transactions</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* ⚙️ COMMON SETTINGS */}
        <View className="bg-gray-900 rounded-2xl p-4 mb-6">
          <Text className="text-gray-400 mb-3">Account Info</Text>

          <Text className="text-white">📧 {user.email}</Text>
          <Text className="text-white mt-1">📱 {user.phone}</Text>
          <Text className="text-white mt-1">🌍 {user.country}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;
