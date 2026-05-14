import React from "react";

import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";

import { useRouter } from "expo-router";

import { useSelector } from "react-redux";

const Wallet = () => {
  const router = useRouter();

  const user = useSelector((state) => state?.user?.user);

  const transactions = [
    {
      type: "Deposit",
      amount: "+₹500",
      date: "Today • 10:20 AM",
      status: "Success",
      icon: "arrow-down-circle-outline",
      color: "#22c55e",
    },

    {
      type: "Entry Fee",
      amount: "-₹50",
      date: "Yesterday • 08:15 PM",
      status: "Paid",
      icon: "game-controller-outline",
      color: "#f59e0b",
    },

    {
      type: "Winning",
      amount: "+₹1200",
      date: "Yesterday • 07:00 PM",
      status: "Credited",
      icon: "trophy-outline",
      color: "#14b8a6",
    },

    {
      type: "Withdrawal",
      amount: "-₹300",
      date: "2 Days Ago",
      status: "Processing",
      icon: "cash-outline",
      color: "#ef4444",
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
            paddingBottom: 34,
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
              Wallet
            </Text>
          </View>

          {/* BALANCE */}
          <View
            style={{
              alignItems: "center",
              marginTop: 34,
            }}
          >
            <Text
              style={{
                color: "#ccfbf1",
                fontSize: 13,
                fontWeight: "600",
              }}
            >
              TOTAL BALANCE
            </Text>

            <Text
              style={{
                color: "#fff",
                fontSize: 42,
                fontWeight: "900",
                marginTop: 12,
              }}
            >
              ₹{user?.walletBalance?.toFixed(2) || "0.00"}
            </Text>

            <View
              style={{
                flexDirection: "row",
                marginTop: 24,
              }}
            >
              {/* ADD CASH */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => router.push("/add-money")}
                style={{
                  backgroundColor: "#fff",
                  height: 48,
                  paddingHorizontal: 20,
                  borderRadius: 16,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  marginRight: 12,
                }}
              >
                <Ionicons name="add-circle-outline" size={20} color="#14b8a6" />

                <Text
                  style={{
                    color: "#14b8a6",
                    fontWeight: "800",
                    marginLeft: 8,
                  }}
                >
                  Add Cash
                </Text>
              </TouchableOpacity>

              {/* WITHDRAW */}
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  height: 48,
                  paddingHorizontal: 20,
                  borderRadius: 16,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <Ionicons name="cash-outline" size={20} color="#fff" />

                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "800",
                    marginLeft: 8,
                  }}
                >
                  Withdraw
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        <View
          style={{
            paddingHorizontal: 16,
            marginTop: 24,
          }}
        >
          {/* WALLET STATS */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {/* WINNING */}
            <View
              style={{
                width: "48%",
                backgroundColor: "#111827",
                borderRadius: 22,
                padding: 18,
              }}
            >
              <View
                style={{
                  backgroundColor: "#14b8a620",
                  padding: 12,
                  borderRadius: 16,
                  alignSelf: "flex-start",
                }}
              >
                <Ionicons name="trophy-outline" size={22} color="#14b8a6" />
              </View>

              <Text
                style={{
                  color: "#94a3b8",
                  marginTop: 14,
                  fontSize: 12,
                }}
              >
                Total Winning
              </Text>

              <Text
                style={{
                  color: "#fff",
                  fontSize: 22,
                  fontWeight: "900",
                  marginTop: 6,
                }}
              >
                ₹2,450
              </Text>
            </View>

            {/* BONUS */}
            <View
              style={{
                width: "48%",
                backgroundColor: "#111827",
                borderRadius: 22,
                padding: 18,
              }}
            >
              <View
                style={{
                  backgroundColor: "#f59e0b20",
                  padding: 12,
                  borderRadius: 16,
                  alignSelf: "flex-start",
                }}
              >
                <MaterialCommunityIcons
                  name="gift-outline"
                  size={22}
                  color="#f59e0b"
                />
              </View>

              <Text
                style={{
                  color: "#94a3b8",
                  marginTop: 14,
                  fontSize: 12,
                }}
              >
                Bonus Cash
              </Text>

              <Text
                style={{
                  color: "#fff",
                  fontSize: 22,
                  fontWeight: "900",
                  marginTop: 6,
                }}
              >
                ₹150
              </Text>
            </View>
          </View>

          {/* TRANSACTIONS */}
          <View
            style={{
              marginTop: 28,
              backgroundColor: "#111827",
              borderRadius: 24,
              padding: 18,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 18,
              }}
            >
              <Text
                style={{
                  color: "#14b8a6",
                  fontSize: 18,
                  fontWeight: "800",
                }}
              >
                Recent Transactions
              </Text>

              <TouchableOpacity activeOpacity={0.8}>
                <Text
                  style={{
                    color: "#14b8a6",
                    fontSize: 12,
                    fontWeight: "700",
                  }}
                >
                  View All
                </Text>
              </TouchableOpacity>
            </View>

            {transactions.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 14,
                  borderBottomWidth: index !== transactions.length - 1 ? 1 : 0,
                  borderBottomColor: "#1e293b",
                }}
              >
                {/* ICON */}
                <View
                  style={{
                    backgroundColor: `${item.color}20`,
                    padding: 12,
                    borderRadius: 16,
                  }}
                >
                  <Ionicons name={item.icon} size={22} color={item.color} />
                </View>

                {/* INFO */}
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
                    {item.type}
                  </Text>

                  <Text
                    style={{
                      color: "#94a3b8",
                      fontSize: 11,
                      marginTop: 4,
                    }}
                  >
                    {item.date}
                  </Text>
                </View>

                {/* AMOUNT */}
                <View
                  style={{
                    alignItems: "flex-end",
                  }}
                >
                  <Text
                    style={{
                      color: item.color,
                      fontSize: 15,
                      fontWeight: "900",
                    }}
                  >
                    {item.amount}
                  </Text>

                  <Text
                    style={{
                      color: "#94a3b8",
                      fontSize: 10,
                      marginTop: 3,
                    }}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* SECURITY */}
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
              <Ionicons
                name="shield-checkmark-outline"
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
                Secure Wallet
              </Text>
            </View>

            <Text
              style={{
                color: "#94a3b8",
                fontSize: 12,
                lineHeight: 20,
              }}
            >
              Your wallet transactions are protected with secure payment
              gateways and encrypted systems for safe gaming payments.
            </Text>
          </View>

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
            NexFF Wallet • Secure Gaming Payments
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Wallet;
