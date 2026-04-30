import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Header from "../../src/components/Header.jsx";
import Loader from "../../src/components/Loader.jsx";
import { LinearGradient } from "expo-linear-gradient";
import { API } from "../_layout.jsx";

const Home = () => {
  const user = useSelector((state) => state?.user?.user);

  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState("upcoming");

  // 🔥 ONLY STATUS TABS
  const tabs = ["upcoming", "live", "completed"];

  const fetchTournaments = async (isRefresh = false) => {
    try {
      isRefresh ? setRefreshing(true) : setLoading(true);

      const { data } = await axios.get(`${API}/tournament`);
      setTournaments(data?.tournaments || []);
    } catch (err) {
      console.log("Error:", err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  if (!user) return <Loader />;

  // 🔥 FILTER BY STATUS
  const filtered = useMemo(() => {
    return tournaments.filter((t) => t.status?.trim() === selectedTab);
  }, [tournaments, selectedTab]);

  // 🎯 STATUS COLOR
  const getStatusColor = (status) => {
    const s = status?.trim();
    if (s === "live") return "bg-green-500";
    if (s === "upcoming") return "bg-yellow-400";
    return "bg-gray-500";
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar style="light" />
      <Header />

      <ScrollView
        className="px-4"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchTournaments(true)}
          />
        }
      >
        {loading && <ActivityIndicator size="large" color="yellow" />}

        {/* 🔥 TABS */}
        <ScrollView horizontal className="mb-4 mt-4">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setSelectedTab(tab)}
              className={`px-5 py-2 mr-2 rounded-full ${
                selectedTab === tab ? "bg-yellow-400" : "bg-gray-800"
              }`}
            >
              <Text
                className={`text-xs font-bold ${
                  selectedTab === tab ? "text-black" : "text-white"
                }`}
              >
                {tab.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 🎮 DREAM11 STYLE CARDS */}
        {filtered.map((item) => {
          const percent = (item.joinedPlayers.length / item.totalSlots) * 100;

          return (
            <View
              key={item._id}
              className="bg-gray-900 rounded-2xl p-4 mb-4 border border-gray-700"
            >
              {/* HEADER */}
              <View className="flex-row justify-between items-center">
                <Text className="text-white font-bold text-lg">
                  {item.title}
                </Text>

                <View
                  className={`px-2 py-1 rounded ${getStatusColor(item.status)}`}
                >
                  <Text className="text-black text-[10px] font-bold">
                    {item.status.toUpperCase()}
                  </Text>
                </View>
              </View>

              {/* GAME INFO */}
              <Text className="text-gray-400 text-xs mt-1">
                {item.mode} • {item.map}
              </Text>

              {/* PRIZE + ENTRY */}
              <View className="flex-row justify-between mt-3">
                <View>
                  <Text className="text-gray-400 text-[10px]">Entry</Text>
                  <Text className="text-yellow-400 font-bold">
                    ₹{item.entryFee}
                  </Text>
                </View>

                <View>
                  <Text className="text-gray-400 text-[10px]">Prize Pool</Text>
                  <Text className="text-green-400 font-bold">
                    ₹{item.prizePool}
                  </Text>
                </View>

                <View>
                  <Text className="text-gray-400 text-[10px]">Per Kill</Text>
                  <Text className="text-white font-bold">
                    ₹{item.perKillReward}
                  </Text>
                </View>
              </View>

              {/* PROGRESS BAR */}
              <View className="mt-3">
                <View className="bg-gray-700 h-2 rounded">
                  <View
                    className="bg-yellow-400 h-2 rounded"
                    style={{ width: `${percent}%` }}
                  />
                </View>

                <Text className="text-gray-400 text-[10px] mt-1">
                  {item.joinedPlayers.length}/{item.totalSlots} Joined
                </Text>
              </View>

              {/* TIME */}
              <Text className="text-gray-500 text-[10px] mt-2">
                Starts: {new Date(item.startTime).toLocaleString()}
              </Text>

              {/* BUTTON */}
              <TouchableOpacity className="bg-yellow-400 mt-4 py-3 rounded-xl items-center">
                <Text className="text-black font-bold">Join Contest 🚀</Text>
              </TouchableOpacity>
            </View>
          );
        })}

        {!loading && filtered.length === 0 && (
          <Text className="text-gray-400 text-center mt-10">
            No tournaments 😢
          </Text>
        )}

        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
