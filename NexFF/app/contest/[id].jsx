import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";

import { useLocalSearchParams } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useSelector } from "react-redux";

import { API } from "../../src/config/api.js";

const ContestDetails = () => {
  const params = useLocalSearchParams();

  const id = params?.id;

  // ✅ USER
  const reduxUser = useSelector((state) => state.user.user);

  const user = reduxUser?.user || reduxUser;

  const [contest, setContest] = useState(null);

  const [loading, setLoading] = useState(true);

  const [joining, setJoining] = useState(false);

  // 🔥 FETCH CONTEST
  const fetchContest = async () => {
    try {
      const response = await fetch(`${API}/tournament/${id}`);

      const data = await response.json();

      console.log("DETAIL DATA:", data);

      setContest(data?.tournament);
    } catch (err) {
      console.log("DETAIL ERROR:", err);

      Alert.alert("Error", "Failed to load contest");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchContest();
    }
  }, [id]);

  // ✅ CHECK JOINED
  const isJoined = contest?.joinedPlayers?.some(
    (playerId) => String(playerId) === String(user?._id),
  );

  // 🔥 JOIN CONTEST
  const joinContest = async () => {
    try {
      setJoining(true);

      const token = await AsyncStorage.getItem("token");

      // ❌ NO TOKEN
      if (!token) {
        Alert.alert("Login Required", "Please login again");

        return;
      }

      // ❌ ALREADY JOINED
      if (isJoined) {
        Alert.alert("Already Joined", "You already joined this contest");

        return;
      }

      const response = await fetch(`${API}/tournament/join/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      // ❌ FAILED
      if (!response.ok) {
        Alert.alert("Error", data?.message || "Failed to join contest");

        return;
      }

      // ✅ SUCCESS
      Alert.alert("Success 🚀", data?.message || "Contest Joined Successfully");

      fetchContest();
    } catch (err) {
      console.log(err);

      Alert.alert("Error", "Something went wrong");
    } finally {
      setJoining(false);
    }
  };

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
        <ActivityIndicator size="large" color="#FFD700" />

        <Text
          style={{
            color: "#fff",
            marginTop: 15,
            fontSize: 15,
          }}
        >
          Loading Contest...
        </Text>
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
        <Ionicons name="warning-outline" size={70} color="red" />

        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            marginTop: 15,
            fontWeight: "bold",
          }}
        >
          Contest Not Found
        </Text>
      </View>
    );
  }

  // 🔥 DATA
  const joined = contest?.joinedPlayers?.length || 0;

  const percent = (joined / contest.totalSlots) * 100;

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#000",
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* 🔥 HERO */}
      <LinearGradient
        colors={["#1a1a1a", "#000"]}
        style={{
          paddingTop: 70,
          paddingHorizontal: 20,
          paddingBottom: 35,
          borderBottomLeftRadius: 35,
          borderBottomRightRadius: 35,
        }}
      >
        {/* STATUS */}
        <View
          style={{
            alignSelf: "flex-start",
            backgroundColor: contest.status === "live" ? "#22c55e" : "#FFD700",

            paddingHorizontal: 15,
            paddingVertical: 6,
            borderRadius: 50,
            marginBottom: 18,
          }}
        >
          <Text
            style={{
              color: "#000",
              fontWeight: "bold",
              fontSize: 11,
            }}
          >
            {contest.status.toUpperCase()}
          </Text>
        </View>

        {/* TITLE */}
        <Text
          style={{
            color: "#fff",
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          {contest.title}
        </Text>

        {/* MODE */}
        <Text
          style={{
            color: "#aaa",
            marginTop: 10,
            fontSize: 15,
          }}
        >
          {contest.gameType} • {contest.mode}
        </Text>

        {/* MAP */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 12,
          }}
        >
          <Ionicons name="location" size={18} color="#FFD700" />

          <Text
            style={{
              color: "#fff",
              marginLeft: 6,
              fontSize: 14,
            }}
          >
            {contest.map}
          </Text>
        </View>
      </LinearGradient>

      {/* 🔥 CARD */}
      <View
        style={{
          marginTop: -20,
          marginHorizontal: 18,
          backgroundColor: "#111",
          borderRadius: 30,
          padding: 20,
          borderWidth: 1,
          borderColor: "#1f1f1f",
        }}
      >
        {/* 🔥 TOP STATS */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {/* ENTRY */}
          <StatCard
            icon="wallet"
            color="#FFD700"
            title="ENTRY"
            value={`₹${contest.entryFee}`}
          />

          {/* PRIZE */}
          <StatCard
            icon="trophy"
            color="#22c55e"
            title="PRIZE"
            value={`₹${contest.prizePool}`}
          />

          {/* KILL */}
          <KillCard value={`₹${contest.perKillReward}`} />
        </View>

        {/* 🔥 SLOT */}
        <View
          style={{
            marginTop: 35,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "600",
              }}
            >
              Slots Filled
            </Text>

            <Text
              style={{
                color: "#FFD700",
                fontWeight: "bold",
              }}
            >
              {joined}/{contest.totalSlots}
            </Text>
          </View>

          {/* PROGRESS */}
          <View
            style={{
              width: "100%",
              height: 12,
              backgroundColor: "#222",
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            <LinearGradient
              colors={["#FFD700", "#ff9900"]}
              style={{
                width: `${percent}%`,
                height: 12,
              }}
            />
          </View>

          <Text
            style={{
              color: "#777",
              marginTop: 8,
              fontSize: 12,
            }}
          >
            {Math.floor(percent)}% slots filled
          </Text>
        </View>

        {/* 🔥 START TIME */}
        <InfoCard
          icon="calendar"
          title="MATCH START TIME"
          value={new Date(contest.startTime).toLocaleString()}
        />

        {/* 🔥 ROOM */}
        <InfoCard
          icon="lock"
          title="ROOM DETAILS"
          value={`Room ID: ${
            contest.roomId || "Will reveal before match"
          }\nPassword: ${contest.roomPassword || "Will reveal before match"}`}
        />

        {/* 🔥 JOIN BUTTON */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={joinContest}
          disabled={joining || isJoined}
          style={{
            marginTop: 30,
            overflow: "hidden",
            borderRadius: 22,
            opacity: isJoined ? 0.9 : 1,
          }}
        >
          <LinearGradient
            colors={isJoined ? ["#22c55e", "#16a34a"] : ["#FFD700", "#ffb300"]}
            style={{
              paddingVertical: 17,
              borderRadius: 22,
              alignItems: "center",
            }}
          >
            {joining ? (
              <ActivityIndicator color="#000" />
            ) : isJoined ? (
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 17,
                }}
              >
                Joined ✅
              </Text>
            ) : (
              <Text
                style={{
                  color: "#000",
                  fontWeight: "bold",
                  fontSize: 17,
                }}
              >
                Join Contest 🚀
              </Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={{ height: 80 }} />
    </ScrollView>
  );
};

/* 🔥 STAT CARD */
const StatCard = ({ icon, color, title, value }) => {
  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: "rgba(255,255,255,0.05)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons name={icon} size={28} color={color} />
      </View>

      <Text
        style={{
          color: "#777",
          marginTop: 10,
          fontSize: 11,
        }}
      >
        {title}
      </Text>

      <Text
        style={{
          color,
          marginTop: 5,
          fontWeight: "bold",
          fontSize: 18,
        }}
      >
        {value}
      </Text>
    </View>
  );
};

/* 🔥 KILL CARD */
const KillCard = ({ value }) => {
  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: "rgba(255,255,255,0.05)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialIcons name="local-fire-department" size={28} color="#fff" />
      </View>

      <Text
        style={{
          color: "#777",
          marginTop: 10,
          fontSize: 11,
        }}
      >
        PER KILL
      </Text>

      <Text
        style={{
          color: "#fff",
          marginTop: 5,
          fontWeight: "bold",
          fontSize: 18,
        }}
      >
        {value}
      </Text>
    </View>
  );
};

/* 🔥 INFO CARD */
const InfoCard = ({ icon, title, value }) => {
  return (
    <View
      style={{
        backgroundColor: "#181818",
        marginTop: 20,
        borderRadius: 20,
        padding: 16,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Feather name={icon} size={16} color="#FFD700" />

        <Text
          style={{
            color: "#888",
            fontSize: 12,
            marginLeft: 8,
          }}
        >
          {title}
        </Text>
      </View>

      <Text
        style={{
          color: "#fff",
          marginTop: 12,
          fontSize: 15,
          lineHeight: 24,
        }}
      >
        {value}
      </Text>
    </View>
  );
};

export default ContestDetails;
