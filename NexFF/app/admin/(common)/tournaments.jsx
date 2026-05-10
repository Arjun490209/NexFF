import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { API } from "../../../src/config/api.js";
import { useSelector } from "react-redux";

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("upcoming");

  const user = useSelector((state) => state?.user?.user); // 👈 user role

  const tabs = ["upcoming", "live", "completed", "cancelled"];

  // 🔥 FETCH API
  const fetchTournaments = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/tournament`);
      setTournaments(data?.tournaments || []);
    } catch (error) {
      console.log("Fetch Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  // 🔥 DELETE API
  const handleDelete = (id) => {
    Alert.alert("Delete Tournament", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: async () => {
          try {
            await axios.delete(`${API}/tournament/${id}`);

            // UI update
            setTournaments((prev) => prev.filter((t) => t._id !== id));
          } catch (err) {
            console.log("Delete Error:", err.message);
          }
        },
      },
    ]);
  };

  // ✏️ EDIT
  const handleEdit = (item) => {
    console.log("Edit:", item);
    // 👉 navigation to edit screen (baad me bana denge)
  };

  // 🔥 FILTER
  const filteredData = tournaments.filter(
    (t) => t.status?.trim() === selectedTab,
  );

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar style="light" />

      <ScrollView className="px-4">
        {/* HEADER */}
        <LinearGradient
          colors={["#facc15", "#fde047"]}
          className="p-4 rounded-2xl mt-4 mb-5"
        >
          <Text className="text-black text-lg font-bold">🎮 Tournaments</Text>
          <Text className="text-black text-xs mt-1">Join and win big 💰</Text>
        </LinearGradient>

        {/* TABS */}
        <ScrollView horizontal className="mb-4">
          {tabs.map((tab) => (
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
                {tab.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* LOADING */}
        {loading && <ActivityIndicator size="large" color="yellow" />}

        {/* NO DATA */}
        {!loading && filteredData.length === 0 && (
          <Text className="text-gray-400 text-center mt-10">
            No tournaments found 😢
          </Text>
        )}

        {/* LIST */}
        {filteredData.map((item) => (
          <View key={item._id} className="bg-gray-900 p-4 rounded-2xl mb-3">
            <Text className="text-white font-bold text-lg">{item.title}</Text>

            <Text className="text-gray-400 text-xs mt-1">
              Mode: {item.mode} | Map: {item.map}
            </Text>

            <View className="flex-row justify-between mt-2">
              <Text className="text-yellow-400 text-xs">
                Entry: ₹{item.entryFee}
              </Text>
              <Text className="text-green-400 text-xs">
                Prize: ₹{item.prizePool}
              </Text>
            </View>

            <Text className="text-gray-400 text-xs mt-1">
              Slots: {item.joinedPlayers?.length || 0}/{item.totalSlots}
            </Text>

            <Text className="text-gray-500 text-xs mt-1">
              Start: {new Date(item.startTime).toLocaleString()}
            </Text>

            {/* 🔥 JOIN BUTTON */}
            <TouchableOpacity className="bg-yellow-400 mt-3 py-2 rounded-lg items-center">
              <Text className="text-black text-xs font-bold">Join Now 🚀</Text>
            </TouchableOpacity>

            {/* 🔐 ADMIN BUTTONS */}
            {(user?.role === "admin" || user?.role === "mini-admin") && (
              <View className="flex-row mt-3">
                {/* EDIT */}
                <TouchableOpacity
                  onPress={() => handleEdit(item)}
                  className="flex-1 bg-blue-500 py-2 rounded-lg mr-2 items-center"
                >
                  <Text className="text-white text-xs font-bold">✏️ Edit</Text>
                </TouchableOpacity>

                {/* DELETE */}
                <TouchableOpacity
                  onPress={() => handleDelete(item._id)}
                  className="flex-1 bg-red-500 py-2 rounded-lg ml-2 items-center"
                >
                  <Text className="text-white text-xs font-bold">
                    🗑 Delete
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}

        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Tournaments;
