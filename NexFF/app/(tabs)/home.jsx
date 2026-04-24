import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Header from "../../src/components/Header";
import Loader from "../../src/components/Loader";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const Home = () => {
  const user = useSelector((state) => state.user.user);

  if (!user) return <Loader />;

  return (
    <SafeAreaView className="flex-1 bg-black" edges={["top"]}>
      <StatusBar style="light" />

      <Header />

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Welcome */}
        <View className="mt-3 mb-4">
          <Text className="text-gray-400 text-sm">Welcome back 👋</Text>
          <Text className="text-white text-xl font-bold">{user.username}</Text>
        </View>

        {/* Banner */}
        <LinearGradient
          colors={["#facc15", "#fde047"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ borderRadius: 16, padding: 16, marginBottom: 16 }}
        >
          <Text className="text-black font-bold text-lg">
            Join Tournaments 🏆
          </Text>

          <Text className="text-black text-xs mt-1">Win real cash daily</Text>

          <TouchableOpacity className="mt-3 bg-black px-3 py-2 rounded-lg self-start">
            <Text className="text-yellow-400 text-xs font-bold">
              Explore Now
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Wallet */}
        <View className="bg-gray-900 rounded-2xl p-4 mb-4 border border-gray-800">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-gray-400 text-sm">Total Balance</Text>

              <Text className="text-yellow-400 text-2xl font-bold">
                ₹{user.walletBalance?.toFixed(2)}
              </Text>

              <Text className="text-gray-500 text-xs">
                Bonus: ₹{user.bonusBalance}
              </Text>
            </View>

            <Ionicons name="wallet" size={30} color="#facc15" />
          </View>

          <View className="flex-row mt-4 space-x-3">
            <TouchableOpacity className="flex-1 bg-yellow-400 py-2 rounded-xl items-center">
              <Text className="text-black font-bold text-sm">Add Money</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 bg-gray-800 py-2 rounded-xl items-center border border-gray-700">
              <Text className="text-white text-sm">Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="flex-row justify-between mb-4">
          {[
            { name: "Tournaments", icon: "trophy" },
            { name: "Leaderboard", icon: "podium" },
            { name: "History", icon: "time" },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              className="bg-gray-900 flex-1 mx-1 py-4 rounded-2xl items-center border border-gray-800"
            >
              <Ionicons name={item.icon} size={20} color="#facc15" />
              <Text className="text-gray-300 text-xs mt-2">{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats */}
        <View className="flex-row justify-between bg-gray-900 p-4 rounded-2xl border border-gray-800">
          <View className="items-center">
            <Text className="text-white font-bold text-lg">
              {user.matchesPlayed}
            </Text>
            <Text className="text-gray-400 text-xs">Matches</Text>
          </View>

          <View className="items-center">
            <Text className="text-green-400 font-bold text-lg">
              {user.matchesWon}
            </Text>
            <Text className="text-gray-400 text-xs">Wins</Text>
          </View>

          <View className="items-center">
            <Text className="text-red-400 font-bold text-lg">{user.kills}</Text>
            <Text className="text-gray-400 text-xs">Kills</Text>
          </View>
        </View>

        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
