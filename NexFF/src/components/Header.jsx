import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
  Animated,
  Dimensions,
} from "react-native";

import React, { useState, useRef } from "react";

import { useSelector } from "react-redux";

import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";

import defaultAvatar from "../../assets/images/avatar.png";

import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const Header = () => {
  const router = useRouter();

  const [drawerVisible, setDrawerVisible] = useState(false);

  // SMOOTH ANIMATION
  const slideAnim = useRef(new Animated.Value(-width)).current;

  const user = useSelector((state) => state?.user?.user);

  const avatarSource =
    user?.avatar && user.avatar.trim() !== "" && user.avatar.startsWith("http")
      ? { uri: user.avatar }
      : defaultAvatar;

  // OPEN DRAWER
  const openDrawer = () => {
    setDrawerVisible(true);

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // CLOSE DRAWER
  const closeDrawer = () => {
    Animated.timing(slideAnim, {
      toValue: -width,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setDrawerVisible(false);
    });
  };

  const menuItems = [
    {
      title: "My Profile",
      icon: "person-outline",
      route: "/profile",
    },

    {
      title: "Wallet",
      icon: "wallet-outline",
      route: "/wallet",
    },

    // {
    //   title: "Transactions",
    //   icon: "time-outline",
    //   route: "/transactions",
    // },

    {
      title: "Settings",
      icon: "settings-outline",
      route: "/settings",
    },

    {
      title: "About App",
      icon: "information-circle-outline",
      route: "/about",
    },
  ];

  return (
    <>
      {/* HEADER */}
      <View
        style={{
          height: 70,
          backgroundColor: "#0f172a",
          paddingHorizontal: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottomWidth: 1,
          borderBottomColor: "#1e293b",
        }}
      >
        {/* LEFT */}
        <TouchableOpacity activeOpacity={0.8} onPress={openDrawer}>
          <Image
            source={avatarSource}
            style={{
              height: 46,
              width: 46,
              borderRadius: 23,
              borderWidth: 2,
              borderColor: "#14b8a6",
            }}
            resizeMode="cover"
          />
        </TouchableOpacity>

        {/* CENTER */}
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              color: "#14b8a6",
              fontWeight: "900",
              fontSize: 20,
              letterSpacing: 0.5,
            }}
          >
            NexFF
          </Text>

          <Text
            style={{
              color: "#94a3b8",
              fontSize: 10,
              marginTop: 2,
            }}
          >
            Tournament Arena
          </Text>
        </View>

        {/* RIGHT */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* NOTIFICATION */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              backgroundColor: "#1e293b",
              padding: 9,
              borderRadius: 20,
              marginRight: 10,
            }}
          >
            <Ionicons name="notifications-outline" size={18} color="#14b8a6" />
          </TouchableOpacity>

          {/* WALLET */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push("/add-money")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#14b8a6",
              paddingHorizontal: 10,
              paddingVertical: 7,
              borderRadius: 20,
            }}
          >
            <Ionicons name="wallet-outline" size={14} color="#fff" />

            <Text
              style={{
                color: "#fff",
                fontWeight: "800",
                marginHorizontal: 5,
                fontSize: 12,
              }}
            >
              ₹{user?.walletBalance?.toFixed(2) || "0.00"}
            </Text>

            <AntDesign name="plus" size={12} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* DRAWER */}
      <Modal visible={drawerVisible} transparent>
        <Pressable
          onPress={closeDrawer}
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.45)",
            flexDirection: "row",
          }}
        >
          {/* DRAWER CONTENT */}
          <Animated.View
            style={{
              width: "78%",
              backgroundColor: "#0f172a",
              paddingTop: 60,
              paddingHorizontal: 18,
              transform: [{ translateX: slideAnim }],
              shadowColor: "#000",
              shadowOpacity: 0.5,
              shadowRadius: 20,
              elevation: 20,
            }}
          >
            {/* USER INFO */}
            <View
              style={{
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: "#1e293b",
                paddingBottom: 24,
              }}
            >
              <Image
                source={avatarSource}
                style={{
                  height: 90,
                  width: 90,
                  borderRadius: 45,
                  borderWidth: 3,
                  borderColor: "#14b8a6",
                }}
              />

              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                  fontWeight: "900",
                  marginTop: 14,
                }}
              >
                {user?.name || "NexFF User"}
              </Text>

              <Text
                style={{
                  color: "#94a3b8",
                  marginTop: 4,
                  fontSize: 12,
                }}
              >
                {user?.email || "demo@gmail.com"}
              </Text>

              <View
                style={{
                  marginTop: 14,
                  backgroundColor: "#14b8a6",
                  paddingHorizontal: 16,
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
                  Wallet ₹{user?.walletBalance?.toFixed(2) || "0.00"}
                </Text>
              </View>
            </View>

            {/* MENU */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                marginTop: 18,
              }}
            >
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={() => {
                    closeDrawer();

                    setTimeout(() => {
                      router.push(item.route);
                    }, 250);
                  }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#111827",
                    paddingVertical: 6,
                    paddingHorizontal: 16,
                    borderRadius: 16,
                    marginBottom: 10,
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: "#1e293b",
                    borderBlockStartWidth: index === 0 ? 0 : 1,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#14b8a620",
                      padding: 10,
                      borderRadius: 12,
                    }}
                  >
                    <Ionicons name={item.icon} size={16} color="#14b8a6" />
                  </View>

                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 15,
                      fontWeight: "700",
                      marginLeft: 14,
                      flex: 1,
                    }}
                  >
                    {item.title}
                  </Text>

                  <Feather name="chevron-right" size={18} color="#64748b" />
                </TouchableOpacity>
              ))}

              {/* ABOUT APP */}
              <View
                style={{
                  marginTop: 10,
                  padding: 18,
                  backgroundColor: "#111827",
                  borderRadius: 18,
                  marginBottom: 40,
                }}
              >
                <Text
                  style={{
                    color: "#14b8a6",
                    fontSize: 15,
                    fontWeight: "800",
                  }}
                >
                  About NexFF
                </Text>

                <Text
                  style={{
                    color: "#94a3b8",
                    marginTop: 8,
                    lineHeight: 20,
                    fontSize: 12,
                  }}
                >
                  NexFF is an esports tournament platform where players can join
                  Free Fire contests, win rewards, and compete with pro gamers.
                </Text>

                <Text
                  style={{
                    color: "#475569",
                    marginTop: 14,
                    fontSize: 11,
                  }}
                >
                  Version 1.0.0
                </Text>
              </View>
            </ScrollView>
          </Animated.View>
        </Pressable>
      </Modal>
    </>
  );
};

export default Header;
