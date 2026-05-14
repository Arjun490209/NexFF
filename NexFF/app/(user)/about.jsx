import React from "react";

import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Linking,
} from "react-native";

import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";

import { useRouter } from "expo-router";

const About = () => {
  const router = useRouter();

  const features = [
    "Free Fire Tournaments",
    "Instant Wallet Recharge",
    "Real-Time Match Updates",
    "Secure Payments",
    "Winning Rewards",
    "Smooth Gameplay Experience",
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
            paddingBottom: 30,
            paddingHorizontal: 18,
            borderBottomLeftRadius: 28,
            borderBottomRightRadius: 28,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
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

            <Text
              style={{
                color: "#fff",
                fontSize: 24,
                fontWeight: "900",
                marginLeft: 14,
              }}
            >
              About NexFF
            </Text>
          </View>

          <Text
            style={{
              color: "#ccfbf1",
              marginTop: 14,
              fontSize: 13,
              lineHeight: 22,
            }}
          >
            NexFF is a premium esports tournament platform built for Free Fire
            players to compete, win rewards, and enjoy smooth gaming
            tournaments.
          </Text>
        </LinearGradient>

        <View
          style={{
            paddingHorizontal: 16,
            marginTop: 22,
          }}
        >
          {/* APP CARD */}
          <View
            style={{
              backgroundColor: "#111827",
              borderRadius: 22,
              padding: 22,
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 90,
                width: 90,
                borderRadius: 45,
                backgroundColor: "#14b8a620",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name="gamepad-variant"
                size={42}
                color="#14b8a6"
              />
            </View>

            <Text
              style={{
                color: "#fff",
                fontSize: 24,
                fontWeight: "900",
                marginTop: 16,
              }}
            >
              NexFF
            </Text>

            <Text
              style={{
                color: "#94a3b8",
                marginTop: 6,
                fontSize: 13,
              }}
            >
              Esports Tournament Platform
            </Text>

            <View
              style={{
                marginTop: 18,
                backgroundColor: "#14b8a6",
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
                Version 1.0.0
              </Text>
            </View>
          </View>

          {/* FEATURES */}
          <View
            style={{
              marginTop: 24,
              backgroundColor: "#111827",
              borderRadius: 22,
              padding: 20,
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
              App Features
            </Text>

            {features.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <View
                  style={{
                    height: 34,
                    width: 34,
                    borderRadius: 17,
                    backgroundColor: "#14b8a620",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="checkmark" size={18} color="#14b8a6" />
                </View>

                <Text
                  style={{
                    color: "#fff",
                    marginLeft: 14,
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  {item}
                </Text>
              </View>
            ))}
          </View>

          {/* DEVELOPER */}
          <View
            style={{
              marginTop: 24,
              backgroundColor: "#111827",
              borderRadius: 22,
              padding: 20,
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
              Developer Info
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Ionicons
                name="person-circle-outline"
                size={26}
                color="#14b8a6"
              />

              <Text
                style={{
                  color: "#fff",
                  marginLeft: 12,
                  fontSize: 14,
                }}
              >
                Arjun Prajapati
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Ionicons name="mail-outline" size={22} color="#14b8a6" />

              <Text
                style={{
                  color: "#fff",
                  marginLeft: 12,
                  fontSize: 14,
                }}
              >
                support@nexff.com
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons name="globe-outline" size={22} color="#14b8a6" />

              <Text
                style={{
                  color: "#fff",
                  marginLeft: 12,
                  fontSize: 14,
                }}
              >
                www.nexff.com
              </Text>
            </View>
          </View>

          {/* CONTACT BUTTONS */}
          <View
            style={{
              marginTop: 24,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => Linking.openURL("mailto:support@nexff.com")}
              style={{
                width: "48%",
              }}
            >
              <LinearGradient
                colors={["#14b8a6", "#0f766e"]}
                style={{
                  height: 54,
                  borderRadius: 18,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="mail-outline" size={18} color="#fff" />

                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "800",
                    marginLeft: 8,
                  }}
                >
                  Contact
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => Linking.openURL("https://nexff.com")}
              style={{
                width: "48%",
                backgroundColor: "#111827",
                height: 54,
                borderRadius: 18,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                borderWidth: 1,
                borderColor: "#1e293b",
              }}
            >
              <Feather name="external-link" size={18} color="#14b8a6" />

              <Text
                style={{
                  color: "#14b8a6",
                  fontWeight: "800",
                  marginLeft: 8,
                }}
              >
                Website
              </Text>
            </TouchableOpacity>
          </View>

          {/* FOOTER */}
          <Text
            style={{
              color: "#64748b",
              textAlign: "center",
              marginTop: 30,
              fontSize: 11,
              lineHeight: 20,
            }}
          >
            © 2026 NexFF. All rights reserved.{"\n"}
            Built for esports players with ❤️
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default About;
