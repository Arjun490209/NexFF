import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import { API } from "../../src/config/api.js";

const ContestDetails = () => {
  // ✅ CORRECT
  const params = useLocalSearchParams();

  const id = params?.id;

  const [contest, setContest] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchContest = async () => {
    try {
      const { data } = await axios.get(`${API}/tournament/${id}`);

      setContest(data?.tournament);
    } catch (err) {
      console.log("DETAIL ERROR:", err?.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchContest();
    }
  }, [id]);

  // 🔄 LOADING
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#000",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="yellow" />

        <Text style={{ color: "#fff", marginTop: 10 }}>Loading Contest...</Text>
      </View>
    );
  }

  // ❌ NOT FOUND
  if (!contest) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#000",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "red", fontSize: 18 }}>Contest Not Found</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#000",
        padding: 20,
      }}
    >
      {/* TITLE */}
      <Text
        style={{
          color: "#fff",
          fontSize: 26,
          fontWeight: "bold",
        }}
      >
        {contest.title}
      </Text>

      {/* INFO */}
      <Text
        style={{
          color: "#999",
          marginTop: 8,
          fontSize: 14,
        }}
      >
        {contest.mode} • {contest.map}
      </Text>

      {/* PRIZE CARD */}
      <View
        style={{
          backgroundColor: "#111",
          padding: 20,
          borderRadius: 20,
          marginTop: 25,
        }}
      >
        <Text style={{ color: "#FFD700", fontSize: 18 }}>
          Entry Fee: ₹{contest.entryFee}
        </Text>

        <Text
          style={{
            color: "#22c55e",
            fontSize: 18,
            marginTop: 10,
          }}
        >
          Prize Pool: ₹{contest.prizePool}
        </Text>

        <Text
          style={{
            color: "#fff",
            fontSize: 18,
            marginTop: 10,
          }}
        >
          Per Kill: ₹{contest.perKillReward}
        </Text>

        <Text
          style={{
            color: "#aaa",
            marginTop: 15,
          }}
        >
          Joined: {contest.joinedPlayers?.length}/{contest.totalSlots}
        </Text>
      </View>
    </ScrollView>
  );
};

export default ContestDetails;
