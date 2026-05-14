import React from "react";

import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";

import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";

import { useRouter } from "expo-router";

import { useSelector } from "react-redux";

import defaultAvatar from "../../assets/images/avatar.png";

const Profile = () => {
  const router = useRouter();

  const user = useSelector((state) => state?.user?.user);

  const avatarSource =
    user?.avatar && user.avatar.trim() !== "" && user.avatar.startsWith("http")
      ? { uri: user.avatar }
      : defaultAvatar;

  const stats = [
    {
      title: "Matches",
      value: user?.matchesPlayed || 0,
      icon: "game-controller-outline",
    },

    {
      title: "Wins",
      value: user?.wins || 0,
      icon: "trophy-outline",
    },

    {
      title: "Kills",
      value: user?.kills || 0,
      icon: "flash-outline",
    },
  ];

  const menuItems = [
    {
      title: "Edit Profile",
      icon: "create-outline",
    },

    {
      title: "Transaction History",
      icon: "time-outline",
    },

    {
      title: "Joined Contests",
      icon: "game-controller-outline",
    },

    {
      title: "Support",
      icon: "help-circle-outline",
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0f172a",
      }}
    >
      <StatusBar barStyle="light-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >
        {/* HEADER */}
        <LinearGradient
          colors={["#14b8a6", "#0f766e"]}
          style={{
            paddingTop: 60,
            paddingBottom: 40,
            paddingHorizontal: 18,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}
        >
          {/* TOP */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.back()}
              style={{
                height: 42,
                width: 42,
                borderRadius: 21,
                backgroundColor: "rgba(255,255,255,0.2)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="arrow-back" size={20} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                height: 42,
                width: 42,
                borderRadius: 21,
                backgroundColor: "rgba(255,255,255,0.2)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feather name="edit-2" size={18} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* PROFILE */}
          <View
            style={{
              alignItems: "center",
              marginTop: 28,
            }}
          >
            <Image
              source={avatarSource}
              style={{
                height: 110,
                width: 110,
                borderRadius: 55,
                borderWidth: 4,
                borderColor: "#fff",
              }}
            />

            <Text
              style={{
                color: "#fff",
                fontSize: 24,
                fontWeight: "900",
                marginTop: 16,
              }}
            >
              {user?.name || "NexFF User"}
            </Text>

            <Text
              style={{
                color: "#ccfbf1",
                marginTop: 5,
                fontSize: 13,
              }}
            >
              {user?.email || "demo@gmail.com"}
            </Text>

            <View
              style={{
                marginTop: 16,
                backgroundColor: "#ffffff20",
                paddingHorizontal: 18,
                paddingVertical: 8,
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "800",
                  fontSize: 12,
                }}
              >
                UID : {user?._id?.slice(0, 8) || "NEX001"}
              </Text>
            </View>
          </View>
        </LinearGradient>

        <View
          style={{
            paddingHorizontal: 16,
            marginTop: 24,
          }}
        >
          {/* WALLET CARD */}
          <LinearGradient
            colors={["#111827", "#1e293b"]}
            style={{
              borderRadius: 24,
              padding: 22,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  style={{
                    color: "#94a3b8",
                    fontSize: 12,
                    fontWeight: "700",
                  }}
                >
                  WALLET BALANCE
                </Text>

                <Text
                  style={{
                    color: "#fff",
                    fontSize: 30,
                    fontWeight: "900",
                    marginTop: 10,
                  }}
                >
                  ₹{user?.walletBalance?.toFixed(2) || "0.00"}
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: "#14b8a620",
                  padding: 16,
                  borderRadius: 18,
                }}
              >
                <Ionicons name="wallet-outline" size={28} color="#14b8a6" />
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push("/add-money")}
              style={{
                marginTop: 20,
                backgroundColor: "#14b8a6",
                height: 50,
                borderRadius: 16,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "800",
                  fontSize: 15,
                }}
              >
                Add Cash
              </Text>
            </TouchableOpacity>
          </LinearGradient>

          {/* STATS */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 24,
            }}
          >
            {stats.map((item, index) => (
              <View
                key={index}
                style={{
                  width: "31%",
                  backgroundColor: "#111827",
                  borderRadius: 20,
                  paddingVertical: 20,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#14b8a620",
                    padding: 12,
                    borderRadius: 16,
                  }}
                >
                  <Ionicons name={item.icon} size={22} color="#14b8a6" />
                </View>

                <Text
                  style={{
                    color: "#fff",
                    fontSize: 20,
                    fontWeight: "900",
                    marginTop: 12,
                  }}
                >
                  {item.value}
                </Text>

                <Text
                  style={{
                    color: "#94a3b8",
                    fontSize: 11,
                    marginTop: 4,
                  }}
                >
                  {item.title}
                </Text>
              </View>
            ))}
          </View>

          {/* MENU */}
          <View
            style={{
              marginTop: 28,
              backgroundColor: "#111827",
              borderRadius: 24,
              padding: 18,
            }}
          >
            <Text
              style={{
                color: "#14b8a6",
                fontSize: 18,
                fontWeight: "800",
                marginBottom: 18,
              }}
            >
              Account
            </Text>

            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 16,
                  borderBottomWidth: index !== menuItems.length - 1 ? 1 : 0,
                  borderBottomColor: "#1e293b",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#14b8a620",
                    padding: 10,
                    borderRadius: 14,
                  }}
                >
                  <Ionicons name={item.icon} size={20} color="#14b8a6" />
                </View>

                <Text
                  style={{
                    color: "#fff",
                    marginLeft: 14,
                    fontSize: 14,
                    fontWeight: "700",
                    flex: 1,
                  }}
                >
                  {item.title}
                </Text>

                <Feather name="chevron-right" size={18} color="#64748b" />
              </TouchableOpacity>
            ))}
          </View>

          {/* GAMER INFO */}
          <View
            style={{
              marginTop: 24,
              backgroundColor: "#111827",
              borderRadius: 24,
              padding: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <MaterialCommunityIcons
                name="gamepad-variant"
                size={24}
                color="#14b8a6"
              />

              <Text
                style={{
                  color: "#14b8a6",
                  fontSize: 18,
                  fontWeight: "800",
                  marginLeft: 10,
                }}
              >
                Gamer Info
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 14,
              }}
            >
              <Text
                style={{
                  color: "#94a3b8",
                  fontSize: 13,
                }}
              >
                Game
              </Text>

              <Text
                style={{
                  color: "#fff",
                  fontWeight: "700",
                  fontSize: 13,
                }}
              >
                Free Fire
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 14,
              }}
            >
              <Text
                style={{
                  color: "#94a3b8",
                  fontSize: 13,
                }}
              >
                Rank
              </Text>

              <Text
                style={{
                  color: "#fff",
                  fontWeight: "700",
                  fontSize: 13,
                }}
              >
                Pro Player
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "#94a3b8",
                  fontSize: 13,
                }}
              >
                Status
              </Text>

              <Text
                style={{
                  color: "#22c55e",
                  fontWeight: "700",
                  fontSize: 13,
                }}
              >
                Active
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
