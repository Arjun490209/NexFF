import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  Alert,
} from "react-native";

import React, { useEffect, useState } from "react";

import axios from "axios";

import { SafeAreaView } from "react-native-safe-area-context";

import { StatusBar } from "expo-status-bar";

import { API } from "../../../src/config/api.js";

const Users = () => {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState("");

  // 🔥 FETCH
  const fetchUsers = async (refresh = false) => {
    try {
      refresh ? setRefreshing(true) : setLoading(true);

      const { data } = await axios.get(`${API}/auth/users`);

      setUsers(data.users || []);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔥 DELETE
  const handleDelete = async (id) => {
    Alert.alert("Delete", "Delete this user?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: async () => {
          try {
            await axios.delete(`${API}/auth/user/${id}`);

            setUsers((prev) => prev.filter((u) => u._id !== id));
          } catch (err) {
            Alert.alert("Error");
          }
        },
      },
    ]);
  };

  // 🔥 CHANGE ROLE
  const handleRole = async (id, role) => {
    try {
      await axios.put(`${API}/auth/user/role/${id}`, {
        role,
      });

      fetchUsers(true);
    } catch (err) {
      Alert.alert("Role update failed");
    }
  };

  // 🔥 ADD MONEY
  const handleWallet = async (id) => {
    try {
      await axios.put(`${API}/auth/user/wallet/${id}`, {
        amount: 100,
      });

      fetchUsers(true);
    } catch (err) {
      Alert.alert("Wallet update failed");
    }
  };

  // 🔥 SEARCH
  const filtered = users.filter((u) =>
    u.name?.toLowerCase().includes(search.toLowerCase()),
  );

  // 🔥 CARD
  const renderItem = ({ item }) => (
    <View className="bg-gray-900 p-4 rounded-3xl mb-4">
      {/* HEADER */}
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-white font-bold text-lg">{item.name}</Text>

          <Text className="text-gray-400 text-xs mt-1">{item.email}</Text>
        </View>

        <View className="bg-yellow-400 px-3 py-1 rounded-full">
          <Text className="text-black text-[10px] font-bold">{item.role}</Text>
        </View>
      </View>

      {/* WALLET */}
      <View className="mt-4">
        <Text className="text-gray-400 text-xs">Wallet Balance</Text>

        <Text className="text-green-400 text-lg font-bold">
          ₹{item.walletBalance || 0}
        </Text>
      </View>

      {/* ACTIONS */}
      <View className="flex-row flex-wrap mt-4">
        {/* ADMIN */}
        <TouchableOpacity
          onPress={() => handleRole(item._id, "admin")}
          className="bg-blue-500 px-4 py-2 rounded-xl mr-2 mb-2"
        >
          <Text className="text-white text-xs font-bold">Make Admin</Text>
        </TouchableOpacity>

        {/* MINI */}
        <TouchableOpacity
          onPress={() => handleRole(item._id, "mini-admin")}
          className="bg-green-500 px-4 py-2 rounded-xl mr-2 mb-2"
        >
          <Text className="text-white text-xs font-bold">Mini Admin</Text>
        </TouchableOpacity>

        {/* MONEY */}
        <TouchableOpacity
          onPress={() => handleWallet(item._id)}
          className="bg-yellow-400 px-4 py-2 rounded-xl mr-2 mb-2"
        >
          <Text className="text-black text-xs font-bold">+₹100</Text>
        </TouchableOpacity>

        {/* DELETE */}
        <TouchableOpacity
          onPress={() => handleDelete(item._id)}
          className="bg-red-500 px-4 py-2 rounded-xl mb-2"
        >
          <Text className="text-white text-xs font-bold">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar style="light" />

      {/* 🔥 SEARCH */}
      <View className="p-4">
        <TextInput
          placeholder="Search users..."
          placeholderTextColor="#777"
          value={search}
          onChangeText={setSearch}
          className="bg-gray-900 text-white px-4 py-3 rounded-2xl"
        />
      </View>

      {/* 🔄 LOADING */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="yellow" />
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={{
            padding: 16,
            paddingBottom: 100,
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => fetchUsers(true)}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default Users;
