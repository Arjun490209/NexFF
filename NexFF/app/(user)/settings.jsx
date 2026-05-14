import React, { useState } from "react";

import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";

import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";

import { useRouter } from "expo-router";

const Settings = () => {
  const router = useRouter();

  const [notifications, setNotifications] = useState(true);

  const [darkMode, setDarkMode] = useState(true);

  const [sound, setSound] = useState(true);

  const settingsItems = [
    {
      title: "Edit Profile",
      subtitle: "Update your personal information",
      icon: "person-outline",
    },

    {
      title: "Security",
      subtitle: "Password & account protection",
      icon: "shield-checkmark-outline",
    },

    {
      title: "Privacy Policy",
      subtitle: "Read our privacy policy",
      icon: "document-text-outline",
    },

    {
      title: "Terms & Conditions",
      subtitle: "Read app terms and conditions",
      icon: "reader-outline",
    },

    {
      title: "Help & Support",
      subtitle: "Contact support team",
      icon: "help-circle-outline",
    },
  ];

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },

      {
        text: "Logout",
        style: "destructive",

        onPress: () => {
          router.replace("/login");
        },
      },
    ]);
  };

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
            paddingBottom: 32,
            paddingHorizontal: 18,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
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
              Settings
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
            Manage your account preferences, privacy, notifications, and app
            settings.
          </Text>
        </LinearGradient>

        <View
          style={{
            paddingHorizontal: 16,
            marginTop: 24,
          }}
        >
          {/* PREFERENCES */}
          <View
            style={{
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
              Preferences
            </Text>

            {/* NOTIFICATIONS */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 14,
                borderBottomWidth: 1,
                borderBottomColor: "#1e293b",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#14b8a620",
                    padding: 10,
                    borderRadius: 14,
                  }}
                >
                  <Ionicons
                    name="notifications-outline"
                    size={20}
                    color="#14b8a6"
                  />
                </View>

                <View
                  style={{
                    marginLeft: 14,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 14,
                      fontWeight: "700",
                    }}
                  >
                    Notifications
                  </Text>

                  <Text
                    style={{
                      color: "#94a3b8",
                      fontSize: 11,
                      marginTop: 3,
                    }}
                  >
                    Match & payment alerts
                  </Text>
                </View>
              </View>

              <Switch
                value={notifications}
                onValueChange={setNotifications}
                thumbColor="#fff"
                trackColor={{
                  false: "#475569",
                  true: "#14b8a6",
                }}
              />
            </View>

            {/* DARK MODE */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 14,
                borderBottomWidth: 1,
                borderBottomColor: "#1e293b",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#14b8a620",
                    padding: 10,
                    borderRadius: 14,
                  }}
                >
                  <Ionicons name="moon-outline" size={20} color="#14b8a6" />
                </View>

                <View
                  style={{
                    marginLeft: 14,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 14,
                      fontWeight: "700",
                    }}
                  >
                    Dark Mode
                  </Text>

                  <Text
                    style={{
                      color: "#94a3b8",
                      fontSize: 11,
                      marginTop: 3,
                    }}
                  >
                    Enable dark appearance
                  </Text>
                </View>
              </View>

              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                thumbColor="#fff"
                trackColor={{
                  false: "#475569",
                  true: "#14b8a6",
                }}
              />
            </View>

            {/* SOUND */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 14,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#14b8a620",
                    padding: 10,
                    borderRadius: 14,
                  }}
                >
                  <Ionicons
                    name="volume-high-outline"
                    size={20}
                    color="#14b8a6"
                  />
                </View>

                <View
                  style={{
                    marginLeft: 14,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 14,
                      fontWeight: "700",
                    }}
                  >
                    Sound Effects
                  </Text>

                  <Text
                    style={{
                      color: "#94a3b8",
                      fontSize: 11,
                      marginTop: 3,
                    }}
                  >
                    Game & UI sounds
                  </Text>
                </View>
              </View>

              <Switch
                value={sound}
                onValueChange={setSound}
                thumbColor="#fff"
                trackColor={{
                  false: "#475569",
                  true: "#14b8a6",
                }}
              />
            </View>
          </View>

          {/* ACCOUNT */}
          <View
            style={{
              marginTop: 24,
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
              Account & Support
            </Text>

            {settingsItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 16,
                  borderBottomWidth: index !== settingsItems.length - 1 ? 1 : 0,
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

                <View
                  style={{
                    marginLeft: 14,
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 14,
                      fontWeight: "700",
                    }}
                  >
                    {item.title}
                  </Text>

                  <Text
                    style={{
                      color: "#94a3b8",
                      fontSize: 11,
                      marginTop: 3,
                    }}
                  >
                    {item.subtitle}
                  </Text>
                </View>

                <Feather name="chevron-right" size={18} color="#64748b" />
              </TouchableOpacity>
            ))}
          </View>

          {/* APP INFO */}
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
                marginBottom: 18,
              }}
            >
              <MaterialCommunityIcons
                name="information-outline"
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
                App Information
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
                Version
              </Text>

              <Text
                style={{
                  color: "#fff",
                  fontWeight: "700",
                  fontSize: 13,
                }}
              >
                1.0.0
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
                Platform
              </Text>

              <Text
                style={{
                  color: "#fff",
                  fontWeight: "700",
                  fontSize: 13,
                }}
              >
                Android
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
                Stable
              </Text>
            </View>
          </View>

          {/* LOGOUT */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleLogout}
            style={{
              marginTop: 30,
              backgroundColor: "#dc2626",
              height: 56,
              borderRadius: 18,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Ionicons name="log-out-outline" size={22} color="#fff" />

            <Text
              style={{
                color: "#fff",
                fontWeight: "800",
                fontSize: 16,
                marginLeft: 10,
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>

          {/* FOOTER */}
          <Text
            style={{
              color: "#64748b",
              textAlign: "center",
              marginTop: 28,
              fontSize: 11,
              lineHeight: 20,
            }}
          >
            NexFF Esports Platform{"\n"}
            Built for gamers with ❤️
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Settings;
