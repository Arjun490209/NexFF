import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Loader = () => {
  return (
    <SafeAreaView className="flex-1 bg-black justify-center items-center">
      <View className="bg-gray-900 px-6 py-6 rounded-2xl items-center">
        <ActivityIndicator size="large" color="#facc15" />

        <Text className="text-white mt-3 font-bold">Please wait...</Text>

        <Text className="text-gray-400 text-xs mt-1">
          Fetching your game data 🎮
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Loader;
