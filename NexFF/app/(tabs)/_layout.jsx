import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import { Tabs, Redirect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const TabsLayout = () => {
  const user = useSelector((state) => state.user.user);
  const insets = useSafeAreaInsets();

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          position: "absolute",
          bottom: 10 + insets.bottom,
          left: 16,
          right: 16,
          height: 65,
          backgroundColor: "#121212",
          borderRadius: 30,
          borderWidth: 1,
          borderColor: "#1f1f1f",

          elevation: 20,
          shadowColor: "#000",
          shadowOpacity: 0.25,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
        },

        // 🔥 THIS IS THE REAL FIX
        tabBarItemStyle: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 12,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabItem icon="home" label="Home" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="account"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabItem icon="person" label="Account" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

/* 🔥 ULTRA PREMIUM TAB ITEM */
const TabItem = ({ icon, label, focused }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const glow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: focused ? 1.1 : 1,
        useNativeDriver: true,
      }),
      Animated.timing(glow, {
        toValue: focused ? 1 : 0,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start();
  }, [focused]);

  const glowOpacity = glow.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.25],
  });

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* 🔥 Glow */}
      {focused && (
        <Animated.View
          style={{
            position: "absolute",
            width: 95,
            height: 45,
            borderRadius: 25,
            backgroundColor: "#FFD700",
            opacity: glowOpacity,
          }}
        />
      )}

      {/* 🔥 Background */}
      {focused && (
        <LinearGradient
          colors={["#2a2a2a", "#1a1a1a"]}
          style={{
            position: "absolute",
            width: 95,
            height: 40,
            borderRadius: 20,
          }}
        />
      )}

      {/* 🔥 Content */}
      <Animated.View
        style={{
          alignItems: "center",
          justifyContent: "center",
          transform: [{ scale }],
        }}
      >
        <Ionicons
          name={icon}
          size={22}
          style={{ marginBottom: 2 }}
          color={focused ? "#FFD700" : "#777"}
        />

        <Text
          numberOfLines={1} // 🔥 NO WRAP FIX
          style={{
            fontSize: 11,
            color: focused ? "#FFD700" : "#777",
            fontWeight: "600",
            textAlign: "center",
            width: 90, // 🔥 CONTROL WIDTH
          }}
        >
          {label}
        </Text>
      </Animated.View>
    </View>
  );
};
