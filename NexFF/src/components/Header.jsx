import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import defaultAvatar from "../../assets/images/avatar.png";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);

  const avatarSource =
    user?.avatar && user.avatar.trim() !== "" && user.avatar.startsWith("http")
      ? { uri: user.avatar }
      : defaultAvatar;

  return (
    <View
      style={{
        height: 65,
        backgroundColor: "black",
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#1f2937",
      }}
    >
      {/* LEFT */}
      <TouchableOpacity>
        <Image
          source={avatarSource}
          style={{
            height: 44,
            width: 44,
            borderRadius: 22,
            borderWidth: 2,
            borderColor: "#facc15",
          }}
          resizeMode="cover"
        />
      </TouchableOpacity>

      {/* CENTER */}
      <View style={{ alignItems: "center" }}>
        <Text style={{ color: "#facc15", fontWeight: "bold", fontSize: 18 }}>
          NexFF
        </Text>
        <Text style={{ color: "#6b7280", fontSize: 10 }}>Tournament Arena</Text>
      </View>

      {/* RIGHT */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        {/* 🔔 */}
        <TouchableOpacity
          style={{
            backgroundColor: "#1f2937",
            padding: 8,
            borderRadius: 20,
          }}
        >
          <Ionicons name="notifications" size={18} color="#facc15" />
        </TouchableOpacity>

        {/* 💰 */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#facc15",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 20,
          }}
        >
          <Ionicons name="wallet" size={14} color="black" />

          <Text
            style={{ color: "black", fontWeight: "bold", marginHorizontal: 4 }}
          >
            ₹{user?.walletBalance?.toFixed(2) || "0.00"}
          </Text>

          <Ionicons name="add" size={16} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
