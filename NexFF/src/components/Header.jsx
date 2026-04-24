import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import defaultAvatar from "../../assets/images/avatar.png";

const Header = () => {
  const user = useSelector((state) => state.user.user);

  const avatarSource =
    user?.avatar && user.avatar.trim() !== "" && user.avatar.startsWith("http")
      ? { uri: user.avatar }
      : defaultAvatar;

  return (
    <View className="pt-6 pb-3 px-4 bg-black flex-row items-center justify-between border-b border-gray-800">
      {/* LEFT */}
      <TouchableOpacity activeOpacity={0.8}>
        <View className="relative">
          <Image
            source={avatarSource}
            className="h-11 w-11 rounded-full border-2 border-yellow-400"
          />
          <View className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border border-black" />
        </View>
      </TouchableOpacity>

      {/* CENTER */}
      <View className="items-center">
        <Text className="text-yellow-400 text-lg font-extrabold tracking-[2px]">
          NexFF
        </Text>
        <Text className="text-[9px] text-gray-500 -mt-1">Tournament Arena</Text>
      </View>

      {/* RIGHT */}
      <TouchableOpacity
        activeOpacity={0.85}
        className="flex-row items-center bg-yellow-400 px-3 py-2 rounded-full"
      >
        <Ionicons name="wallet" size={14} color="black" />

        <Text className="text-black font-bold text-xs mx-1">
          ₹{user?.walletBalance?.toFixed(2) || "0.00"}
        </Text>

        <Ionicons name="add" size={16} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
