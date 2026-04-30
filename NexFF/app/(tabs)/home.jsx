import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Header from "../../src/components/Header.jsx";
import TournamentCard from "../../src/components/TournamentCard.jsx";
import Loader from "../../src/components/Loader.jsx";
import { LinearGradient } from "expo-linear-gradient";

const tournaments = [
  {
    _id: "1",
    title: "Solo Clash",
    mode: "Solo",
    entryFee: 50,
    prizePool: 1000,
    perKillReward: 10,
    totalSlots: 50,
    joinedPlayers: Array(30).fill({}),
    status: "upcoming",
    startTime: new Date(),
  },
  {
    _id: "2",
    title: "Squad Battle",
    mode: "Squad",
    entryFee: 100,
    prizePool: 5000,
    perKillReward: 20,
    totalSlots: 48,
    joinedPlayers: Array(48).fill({}),
    status: "live",
    startTime: new Date(),
  },
  {
    _id: "3",
    title: "Duo Fight",
    mode: "Duo",
    entryFee: 70,
    prizePool: 2000,
    perKillReward: 15,
    totalSlots: 40,
    joinedPlayers: Array(20).fill({}),
    status: "upcoming",
    startTime: new Date(),
  },
];

const Home = () => {
  const user = useSelector((state) => state?.user?.user);
  const [selectedTab, setSelectedTab] = useState("All");

  if (!user) return <Loader />;

  const filteredTournaments =
    selectedTab === "All"
      ? tournaments
      : tournaments.filter((t) => t.mode === selectedTab);

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar style="light" />

      <Header />

      <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
        {/* ⭐ FEATURED BANNER */}
        <LinearGradient
          colors={["#facc15", "#fde047"]}
          style={{
            borderRadius: 20,
            padding: 16,
            marginTop: 16,
            marginBottom: 20,
          }}
        >
          <Text className="text-black font-bold text-lg">
            ⭐ Featured Tournament
          </Text>
          <Text className="text-black text-xs mt-1">
            Win ₹5000 in Squad Battle 🔥
          </Text>

          <TouchableOpacity className="mt-3 bg-black px-3 py-2 rounded-lg self-start">
            <Text className="text-yellow-400 text-xs font-bold">Join Now</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* 🎯 CATEGORY TABS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          {["All", "Solo", "Duo", "Squad"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setSelectedTab(tab)}
              className={`px-4 py-2 mr-2 rounded-full ${
                selectedTab === tab ? "bg-yellow-400" : "bg-gray-800"
              }`}
            >
              <Text
                className={`text-xs font-bold ${
                  selectedTab === tab ? "text-black" : "text-white"
                }`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 🎮 HORIZONTAL SLIDER */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-5"
        >
          {filteredTournaments.map((item) => (
            <View key={item._id} style={{ width: 280, marginRight: 12 }}>
              <TournamentCard
                tournament={item}
                onJoin={() => console.log("Join:", item._id)}
              />
            </View>
          ))}
        </ScrollView>

        {/* 🔥 ALL TOURNAMENTS */}
        <Text className="text-white text-lg font-bold mb-3">
          All Tournaments
        </Text>

        {filteredTournaments.map((item) => (
          <TournamentCard
            key={item._id}
            tournament={item}
            onJoin={() => console.log("Join:", item._id)}
          />
        ))}

        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
