import { View, Text, Image, TouchableOpacity, Animated } from "react-native";
import React, { useEffect, useRef, useMemo } from "react";
import { LinearGradient } from "expo-linear-gradient";

const TournamentCard = ({ tournament, onJoin }) => {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [timeLeft, setTimeLeft] = React.useState("");

  const filledSlots = tournament.joinedPlayers?.length || 0;
  const totalSlots = tournament.totalSlots || 0;

  const progress = totalSlots ? filledSlots / totalSlots : 0;

  // 🔥 STATUS SYSTEM (ULTRA)
  const { isLive, isFull, isUpcoming } = useMemo(() => {
    const now = Date.now();
    const start = new Date(tournament.startTime).getTime();

    return {
      isLive: now >= start,
      isFull: filledSlots >= totalSlots,
      isUpcoming: now < start,
    };
  }, [tournament.startTime, filledSlots, totalSlots]);

  // ⏳ SMOOTH TIMER (NO LAG)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const start = new Date(tournament.startTime).getTime();
      const diff = start - now;

      if (diff <= 0) {
        setTimeLeft("LIVE");
        return;
      }

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${h}h ${m}m ${s}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [tournament.startTime]);

  // 🎯 PROGRESS ANIMATION
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const widthInterpolated = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  // 🚀 BUTTON STATE
  let buttonText = "Join Now";
  let disabled = false;

  if (isFull) {
    buttonText = "Full";
    disabled = true;
  } else if (isLive) {
    buttonText = "Live";
    disabled = true;
  }

  return (
    <View
      style={{
        backgroundColor: "#12121C",
        borderRadius: 20,
        marginVertical: 12,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#2A2A40",
        shadowColor: "#000",
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 6,
      }}
    >
      {/* 🖼 Banner */}
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
        }}
        style={{ width: "100%", height: 150 }}
      />

      {/* 🔥 Gradient Overlay */}
      <LinearGradient
        colors={["transparent", "#000"]}
        style={{
          position: "absolute",
          width: "100%",
          height: 150,
        }}
      />

      {/* 🟢 STATUS BADGE */}
      <View
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          flexDirection: "row",
          gap: 6,
        }}
      >
        <View
          style={{
            backgroundColor: isLive ? "#00E676" : "#FF9800",
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 11, fontWeight: "bold" }}>
            {isLive ? "LIVE" : "UPCOMING"}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "#000000aa",
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 11 }}>{tournament.mode}</Text>
        </View>
      </View>

      {/* 📦 CONTENT */}
      <View style={{ padding: 14 }}>
        <Text style={{ color: "#fff", fontSize: 17, fontWeight: "bold" }}>
          {tournament.title}
        </Text>

        {/* TIMER */}
        <Text style={{ color: "#aaa", marginTop: 4 }}>
          {isLive ? "Match Started" : `Starts in ${timeLeft}`}
        </Text>

        {/* 💰 ROW */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text style={{ color: "#00E676" }}>₹{tournament.entryFee}</Text>
          <Text style={{ color: "#FFD700" }}>₹{tournament.prizePool}</Text>
        </View>

        {/* 🎯 PER KILL */}
        <Text style={{ color: "#29B6F6", marginTop: 4 }}>
          +₹{tournament.perKillReward} / kill
        </Text>

        {/* 📊 PROGRESS */}
        <View
          style={{
            height: 6,
            backgroundColor: "#2A2A40",
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <Animated.View
            style={{
              width: widthInterpolated,
              height: "100%",
              backgroundColor: "#FF3D00",
              borderRadius: 10,
            }}
          />
        </View>

        <Text style={{ color: "#aaa", marginTop: 4, fontSize: 12 }}>
          {filledSlots}/{totalSlots} Slots
        </Text>

        {/* 🚀 BUTTON */}
        <TouchableOpacity
          disabled={disabled}
          style={{ marginTop: 14, opacity: disabled ? 0.6 : 1 }}
          onPress={() => onJoin && onJoin(tournament)}
        >
          <LinearGradient
            colors={disabled ? ["#444", "#444"] : ["#FF512F", "#DD2476"]}
            style={{
              padding: 14,
              borderRadius: 14,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>
              {buttonText}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(TournamentCard);
