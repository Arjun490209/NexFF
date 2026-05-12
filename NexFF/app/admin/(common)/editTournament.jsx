import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import React, { useState } from "react";

import axios from "axios";

import Toast from "react-native-toast-message";

import { SafeAreaView } from "react-native-safe-area-context";

import { StatusBar } from "expo-status-bar";

import { LinearGradient } from "expo-linear-gradient";

import DateTimePicker from "@react-native-community/datetimepicker";

import { API } from "../../../src/config/api.js";

import { router, useLocalSearchParams } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";

const EditTournament = () => {
  const params = useLocalSearchParams();

  const tournament = JSON.parse(params.tournament);

  const [form, setForm] = useState({
    title: tournament?.title || "",
    entryFee: String(tournament?.entryFee || ""),
    prizePool: String(tournament?.prizePool || ""),
    perKillReward: String(tournament?.perKillReward || ""),
    totalSlots: String(tournament?.totalSlots || ""),
    roomId: tournament?.roomId || "",
    roomPassword: tournament?.roomPassword || "",
    map: tournament?.map || "",
    mode: tournament?.mode || "",
  });

  const [date, setDate] = useState(
    tournament?.startTime ? new Date(tournament.startTime) : new Date(),
  );

  const [showDate, setShowDate] = useState(false);

  const [showTime, setShowTime] = useState(false);

  const [loading, setLoading] = useState(false);

  // 🔥 HANDLE CHANGE
  const handleChange = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  // 🔥 VALIDATION
  const isInvalid =
    !form.title ||
    isNaN(form.entryFee) ||
    isNaN(form.prizePool) ||
    isNaN(form.totalSlots);

  // 🔥 UPDATE API
  const handleUpdate = async () => {
    if (isInvalid) {
      Toast.show({
        type: "error",
        text1: "Enter valid details ❌",
      });

      return;
    }

    try {
      setLoading(true);

      const saved = await AsyncStorage.getItem("user");

      const parsed = saved ? JSON.parse(saved) : null;

      const token = parsed?.token;

      if (!token) {
        Toast.show({
          type: "error",
          text1: "Login Required ❌",
        });

        return;
      }

      const body = {
        ...form,
        entryFee: Number(form.entryFee),
        prizePool: Number(form.prizePool),
        perKillReward: Number(form.perKillReward),
        totalSlots: Number(form.totalSlots),
        startTime: date,
      };

      const { data } = await axios.put(
        `${API}/tournament/update/${tournament._id}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      Toast.show({
        type: "success",
        text1: "Tournament Updated 🎉",
        text2: data?.message,
      });

      router.back();
    } catch (err) {
      console.log(err?.response?.data || err.message);

      Toast.show({
        type: "error",
        text1: "Update Failed ❌",
        text2: err?.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar style="light" />

      <ScrollView className="px-4">
        {/* 🔥 HEADER */}
        <LinearGradient
          colors={["#38bdf8", "#0ea5e9"]}
          className="p-4 rounded-2xl mt-4 mb-5"
        >
          <Text className="text-white text-lg font-bold">
            ✏️ Edit Tournament
          </Text>

          <Text className="text-white text-xs mt-1">
            Update your tournament 🚀
          </Text>
        </LinearGradient>

        {/* FORM */}
        <View className="bg-gray-900 p-4 rounded-2xl">
          <Input
            label="Title"
            value={form.title}
            onChange={(t) => handleChange("title", t)}
          />

          <Row>
            <Input
              label="Entry Fee"
              value={form.entryFee}
              onChange={(t) => handleChange("entryFee", t)}
              numeric
            />

            <Input
              label="Prize Pool"
              value={form.prizePool}
              onChange={(t) => handleChange("prizePool", t)}
              numeric
            />
          </Row>

          <Row>
            <Input
              label="Per Kill"
              value={form.perKillReward}
              onChange={(t) => handleChange("perKillReward", t)}
              numeric
            />

            <Input
              label="Slots"
              value={form.totalSlots}
              onChange={(t) => handleChange("totalSlots", t)}
              numeric
            />
          </Row>

          <Row>
            <Input
              label="Map"
              value={form.map}
              onChange={(t) => handleChange("map", t)}
            />

            <Input
              label="Mode"
              value={form.mode}
              onChange={(t) => handleChange("mode", t)}
            />
          </Row>

          <Input
            label="Room ID"
            value={form.roomId}
            onChange={(t) => handleChange("roomId", t)}
          />

          <Input
            label="Room Password"
            value={form.roomPassword}
            onChange={(t) => handleChange("roomPassword", t)}
          />

          {/* DATE */}
          <Text className="text-gray-400 mt-4 mb-1">Start Time</Text>

          <TouchableOpacity
            onPress={() => setShowDate(true)}
            className="bg-black border border-gray-700 p-3 rounded-lg"
          >
            <Text className="text-white">{date.toLocaleString()}</Text>
          </TouchableOpacity>

          {/* DATE PICKER */}
          {showDate && (
            <DateTimePicker
              value={date}
              mode="date"
              minimumDate={new Date()}
              display="default"
              onChange={(event, selectedDate) => {
                if (selectedDate) {
                  setDate(selectedDate);

                  setShowDate(false);

                  setShowTime(true);
                }
              }}
            />
          )}

          {/* TIME PICKER */}
          {showTime && (
            <DateTimePicker
              value={date}
              mode="time"
              display="default"
              onChange={(event, selectedTime) => {
                if (selectedTime) {
                  const updated = new Date(date);

                  updated.setHours(selectedTime.getHours());

                  updated.setMinutes(selectedTime.getMinutes());

                  setDate(updated);

                  setShowTime(false);
                }
              }}
            />
          )}

          {/* UPDATE BUTTON */}
          <TouchableOpacity
            onPress={handleUpdate}
            disabled={loading}
            className="bg-blue-500 mt-6 py-3 rounded-xl items-center"
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold">🚀 Update Tournament</Text>
            )}
          </TouchableOpacity>
        </View>

        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
};

/* 🔥 ROW */
const Row = ({ children }) => (
  <View className="flex-row gap-2">{children}</View>
);

/* 🔥 INPUT */
const Input = ({ label, value, onChange, numeric }) => (
  <View className="flex-1 mb-3">
    <Text className="text-gray-400 text-xs mb-1">{label}</Text>

    <TextInput
      placeholder={label}
      placeholderTextColor="#666"
      value={value}
      onChangeText={onChange}
      keyboardType={numeric ? "numeric" : "default"}
      className="bg-black text-white px-3 py-2 rounded-lg border border-gray-700"
    />
  </View>
);

export default EditTournament;
