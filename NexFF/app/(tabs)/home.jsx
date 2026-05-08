import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  FlatList,
} from "react-native";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Header from "../../src/components/Header.jsx";
import Loader from "../../src/components/Loader.jsx";
import { API } from "../_layout.jsx";

const Home = () => {
  const user = useSelector((state) => state?.user?.user);

  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState("upcoming");
  const [error, setError] = useState("");

  const tabs = ["upcoming", "live", "completed"];

  // 🔥 FAST FETCH
  const fetchTournaments = async (isRefresh = false) => {
    try {
      setError("");

      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const { data } = await axios.get(`${API}/tournament`, {
        timeout: 5000,
      });

      setTournaments(data?.tournaments || []);
    } catch (err) {
      console.log(err.message);
      setError("Failed to load tournaments");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  if (!user) return <Loader />;

  // 🔥 FILTER
  const filtered = useMemo(() => {
    return tournaments.filter((t) => t.status?.trim() === selectedTab);
  }, [tournaments, selectedTab]);

  // 🎨 STATUS COLOR
  const getStatusColor = (status) => {
    const s = status?.trim();

    if (s === "live") return "#22c55e";
    if (s === "upcoming") return "#facc15";

    return "#6b7280";
  };

  // 🎮 CARD
  const renderItem = useCallback(({ item }) => {
    const joined = item.joinedPlayers?.length || 0;

    const percent = (joined / item.totalSlots) * 100;

    return (
      <View className="bg-gray-900 rounded-3xl p-4 mb-4 border border-gray-800">
        {/* HEADER */}
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-white text-lg font-bold">{item.title}</Text>

            <Text className="text-gray-400 text-xs mt-1">
              {item.mode} • {item.map}
            </Text>
          </View>

          {/* STATUS */}
          <View
            style={{
              backgroundColor: getStatusColor(item.status),
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 999,
            }}
          >
            <Text className="text-black text-[10px] font-bold">
              {item.status.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* MONEY */}
        <View className="flex-row justify-between mt-5">
          <View className="items-center">
            <Text className="text-gray-500 text-[10px]">ENTRY</Text>

            <Text className="text-yellow-400 font-bold text-base">
              ₹{item.entryFee}
            </Text>
          </View>

          <View className="items-center">
            <Text className="text-gray-500 text-[10px]">PRIZE</Text>

            <Text className="text-green-400 font-bold text-base">
              ₹{item.prizePool}
            </Text>
          </View>

          <View className="items-center">
            <Text className="text-gray-500 text-[10px]">PER KILL</Text>

            <Text className="text-white font-bold text-base">
              ₹{item.perKillReward}
            </Text>
          </View>
        </View>

        {/* PROGRESS */}
        <View className="mt-5">
          <View className="bg-gray-700 h-2 rounded-full overflow-hidden">
            <View
              style={{
                width: `${percent}%`,
                backgroundColor: "#facc15",
                height: 8,
              }}
            />
          </View>

          <View className="flex-row justify-between mt-1">
            <Text className="text-gray-400 text-[10px]">
              {joined}/{item.totalSlots} Joined
            </Text>

            <Text className="text-gray-400 text-[10px]">
              {Math.floor(percent)}%
            </Text>
          </View>
        </View>

        {/* TIME */}
        <Text className="text-gray-500 text-[11px] mt-4">
          Starts: {new Date(item.startTime).toLocaleString()}
        </Text>

        {/* BUTTON */}
        <TouchableOpacity
          className="bg-yellow-400 mt-5 py-3 rounded-2xl items-center"
          activeOpacity={0.8}
        >
          <Text className="text-black font-bold">Join Contest 🚀</Text>
        </TouchableOpacity>
      </View>
    );
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar style="light" />

      <Header />

      {/* 🔥 TABS */}
      <View className="flex-row px-4 mt-4 mb-2">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelectedTab(tab)}
            className={`px-5 py-2 rounded-full mr-2 ${
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
      </View>

      {/* 🔄 LOADING */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#facc15" />

          <Text className="text-gray-400 mt-3">Loading tournaments...</Text>
        </View>
      ) : error ? (
        // ❌ ERROR UI
        <View className="flex-1 justify-center items-center px-5">
          <Text className="text-red-400 text-lg font-bold">
            ⚠️ Failed to Load
          </Text>

          <Text className="text-gray-400 text-center mt-2">
            Check internet or server connection
          </Text>

          {/* 🔥 RELOAD BUTTON */}
          <TouchableOpacity
            onPress={() => fetchTournaments()}
            className="bg-yellow-400 mt-5 px-6 py-3 rounded-2xl"
          >
            <Text className="text-black font-bold">Reload 🔄</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // 🚀 FAST LIST
        <FlatList
          data={filtered}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 100,
            paddingTop: 10,
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => fetchTournaments(true)}
            />
          }
          showsVerticalScrollIndicator={false}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={5}
          removeClippedSubviews
          ListEmptyComponent={
            <View className="items-center mt-20">
              <Text className="text-gray-400">No tournaments found 😢</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default Home;
