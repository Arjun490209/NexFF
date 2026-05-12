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
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { API } from "../../../src/config/api.js";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const Tournaments = () => {
  const router = useRouter();
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("upcoming");
  const [token, setToken] = useState("");

  const user = useSelector((state) => state?.user?.user);

  const tabs = ["upcoming", "live", "completed", "cancelled"];

  // 🔥 GET TOKEN
  const loadUser = async () => {
    try {
      const saved = await AsyncStorage.getItem("user");

      if (saved) {
        const parsed = JSON.parse(saved);

        setToken(parsed?.token || "");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 🔥 FETCH TOURNAMENTS
  const fetchTournaments = async () => {
    try {
      setLoading(true);

      const endpoint =
        user?.role === "admin" || user?.role === "mini-admin"
          ? `${API}/tournament/my`
          : `${API}/tournament`;

      const { data } = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTournaments(data?.tournaments || []);
    } catch (error) {
      console.log(error);

      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to fetch tournaments",
      });
    } finally {
      setLoading(false);
    }
  };

  // 🔥 INITIAL LOAD
  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (token !== "") {
      fetchTournaments();
    }
  }, [token]);

  // 🔥 JOIN TOURNAMENT
  const handleJoin = async (id) => {
    try {
      const { data } = await axios.post(
        `${API}/tournament/join/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      Toast.show({
        type: "success",
        text1: "Success",
        text2: data?.message,
      });

      fetchTournaments();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Join Failed",
        text2: error?.response?.data?.message || "Something went wrong",
      });
    }
  };

  // 🔥 DELETE
  const handleDelete = (id) => {
    Alert.alert("Delete Tournament", "Are you sure you want to delete?", [
      {
        text: "Cancel",
        style: "cancel",
      },

      {
        text: "Delete",

        onPress: async () => {
          try {
            const { data } = await axios.delete(
              `${API}/tournament/delete/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );

            setTournaments((prev) => prev.filter((item) => item._id !== id));

            Toast.show({
              type: "success",
              text1: "Success",
              text2: data?.message,
            });
          } catch (error) {
            Toast.show({
              type: "error",
              text1: "Delete Failed",
              text2: error?.response?.data?.message || "Something went wrong",
            });
          }
        },
      },
    ]);
  };

  // 🔥 CANCEL
  const handleCancel = async (id) => {
    try {
      const { data } = await axios.put(
        `${API}/tournament/cancel/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      Toast.show({
        type: "success",
        text1: "Success",
        text2: data?.message,
      });

      fetchTournaments();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Cancel Failed",
        text2: error?.response?.data?.message || "Something went wrong",
      });
    }
  };

  // ✏️ EDIT
  const handleEdit = (item) => {
    router.push({
      pathname: "/admin/(common)/editTournament",

      params: {
        tournament: JSON.stringify(item),
      },
    });
  };

  // 🔥 FILTER DATA
  const filteredData = tournaments.filter(
    (t) => t.status?.trim() === selectedTab,
  );

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar style="light" />

      <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <LinearGradient
          colors={["#facc15", "#fde047"]}
          className="p-4 rounded-3xl mt-4 mb-5"
        >
          <Text className="text-black text-xl font-bold">🎮 Tournaments</Text>

          <Text className="text-black text-xs mt-1">Join and win big 💰</Text>
        </LinearGradient>

        {/* TABS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
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
        {loading && (
          <ActivityIndicator size="large" color="yellow" className="mt-10" />
        )}

        {/* NO DATA */}
        {!loading && filteredData.length === 0 && (
          <Text className="text-gray-400 text-center mt-10">
            No tournaments found 😢
          </Text>
        )}

        {/* TOURNAMENT LIST */}
        {filteredData.map((item) => (
          <View
            key={item._id}
            className="bg-[#111827] p-4 rounded-3xl mb-4 border border-gray-800"
          >
            {/* TOP */}
            <View className="flex-row justify-between items-center">
              <Text className="text-white text-lg font-bold">
                🎮 {item.title}
              </Text>

              <View
                className={`px-3 py-1 rounded-full ${
                  item.status === "upcoming"
                    ? "bg-green-500"
                    : item.status === "live"
                      ? "bg-red-500"
                      : item.status === "completed"
                        ? "bg-blue-500"
                        : "bg-gray-500"
                }`}
              >
                <Text className="text-white text-[10px] font-bold uppercase">
                  {item.status}
                </Text>
              </View>
            </View>

            {/* DETAILS */}
            <View className="mt-3">
              <Text className="text-gray-300 text-xs">🗺 Map: {item.map}</Text>

              <Text className="text-gray-300 text-xs mt-1">
                ⚔ Mode: {item.mode}
              </Text>

              <Text className="text-yellow-400 text-xs mt-1">
                💰 Entry Fee: ₹{item.entryFee}
              </Text>

              <Text className="text-green-400 text-xs mt-1">
                🏆 Prize Pool: ₹{item.prizePool}
              </Text>

              <Text className="text-red-400 text-xs mt-1">
                🔫 Per Kill: ₹{item.perKillReward}
              </Text>

              <Text className="text-cyan-400 text-xs mt-1">
                👥 Slots: {item.joinedPlayers?.length || 0}/{item.totalSlots}
              </Text>

              <Text className="text-gray-400 text-xs mt-1">
                ⏰ {new Date(item.startTime).toLocaleString()}
              </Text>

              <Text className="text-purple-400 text-xs mt-1">
                👤 Created By: {item?.createdBy?.name}
              </Text>
            </View>

            {/* USER JOIN */}
            {user?.role === "user" && (
              <TouchableOpacity
                onPress={() => handleJoin(item._id)}
                className="bg-yellow-400 mt-4 py-3 rounded-2xl items-center"
              >
                <Text className="text-black font-bold">Join Tournament 🚀</Text>
              </TouchableOpacity>
            )}

            {/* ADMIN PANEL */}
            {(user?.role === "admin" || user?.role === "mini-admin") && (
              <View className="flex-row mt-4">
                {/* EDIT */}
                <TouchableOpacity
                  onPress={() => handleEdit(item)}
                  className="flex-1 bg-blue-500 py-3 rounded-2xl mr-2 items-center"
                >
                  <Text className="text-white font-bold">✏️ Edit</Text>
                </TouchableOpacity>

                {/* DELETE */}
                <TouchableOpacity
                  onPress={() => handleDelete(item._id)}
                  className="flex-1 bg-red-500 py-3 rounded-2xl mr-2 items-center"
                >
                  <Text className="text-white font-bold">🗑 Delete</Text>
                </TouchableOpacity>

                {/* CANCEL */}
                <TouchableOpacity
                  onPress={() => handleCancel(item._id)}
                  className="flex-1 bg-gray-700 py-3 rounded-2xl items-center"
                >
                  <Text className="text-white font-bold">❌ Cancel</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}

        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Tournaments;
