import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker from "@react-native-community/datetimepicker";
import { API } from "../../../src/config/api.js";
import { useRouter } from "expo-router";

const CreateTournament = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    entryFee: "",
    prizePool: "",
    perKillReward: "",
    totalSlots: "",
    roomId: "",
    roomPassword: "",
    map: "",
    mode: "",
  });

  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const isInvalid =
    !form.title ||
    isNaN(form.entryFee) ||
    isNaN(form.prizePool) ||
    isNaN(form.totalSlots);

  // 🔥 CREATE API
  const handleCreate = async () => {
    if (isInvalid) {
      Toast.show({
        type: "error",
        text1: "Enter valid details ❌",
      });
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${API}/tournament/create`, {
        ...form,
        entryFee: Number(form.entryFee),
        prizePool: Number(form.prizePool),
        perKillReward: Number(form.perKillReward),
        totalSlots: Number(form.totalSlots),
        startTime: date,
      });

      Toast.show({
        type: "success",
        text1: "Tournament Created 🎉",
      });

      // reset
      setForm({
        title: "",
        entryFee: "",
        prizePool: "",
        perKillReward: "",
        totalSlots: "",
        roomId: "",
        roomPassword: "",
        map: "",
        mode: "",
      });

      setDate(new Date());
      router.push("/account");
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Error ❌",
        text2: err.message,
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
          colors={["#facc15", "#fde047"]}
          className="p-4 rounded-2xl mt-4 mb-5"
        >
          <Text className="text-black text-lg font-bold">
            🎮 Create Tournament
          </Text>
          <Text className="text-black text-xs mt-1">Setup your match 🚀</Text>
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

          {/* 🔥 DATE PICKER */}
          <Text className="text-gray-400 mt-4 mb-1">Start Time</Text>

          <TouchableOpacity
            onPress={() => setShowDate(true)}
            className="bg-black border border-gray-700 p-3 rounded-lg"
          >
            <Text className="text-white">{date.toLocaleString()}</Text>
          </TouchableOpacity>

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

          {/* BUTTON */}
          <TouchableOpacity
            onPress={handleCreate}
            disabled={loading}
            className="bg-yellow-400 mt-6 py-3 rounded-xl items-center"
          >
            <Text className="text-black font-bold">
              {loading ? "Creating..." : "🚀 Create Tournament"}
            </Text>
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

export default CreateTournament;
