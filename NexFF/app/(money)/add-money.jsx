import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Dimensions,
} from "react-native";

import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";
import axios from "axios";
import RazorpayCheckout from "react-native-razorpay";

import { useSelector } from "react-redux";

import { API } from "../../src/config/api";

const { width } = Dimensions.get("window");

const AddMoney = () => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state?.user?.user);
  const token = useSelector((state) => state?.user?.token);

  const quickAmounts = [100, 200, 500, 1000, 2000, 5000];

  const MIN_AMOUNT = 50;
  const MAX_AMOUNT = 10000;

  // ==========================
  // HANDLE INPUT
  // ==========================
  const handleAmountChange = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "");

    if (Number(numericValue) > MAX_AMOUNT) {
      setAmount(MAX_AMOUNT.toString());

      return Toast.show({
        type: "error",
        text1: "Limit Exceeded",
        text2: `Maximum amount is ₹${MAX_AMOUNT}`,
      });
    }

    setAmount(numericValue);
  };

  // ==========================
  // HANDLE PAYMENT
  // ==========================
  const handlePayment = async () => {
    try {
      const numericAmount = Number(amount);

      if (!amount || numericAmount < MIN_AMOUNT) {
        return Toast.show({
          type: "error",
          text1: "Invalid Amount",
          text2: `Minimum amount is ₹${MIN_AMOUNT}`,
        });
      }

      if (numericAmount > MAX_AMOUNT) {
        return Toast.show({
          type: "error",
          text1: "Limit Exceeded",
          text2: `Maximum amount is ₹${MAX_AMOUNT}`,
        });
      }

      setLoading(true);

      // CREATE ORDER
      const { data } = await axios.post(
        `${API}/payment/create-order`,
        {
          amount: numericAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const options = {
        description: "Add Cash To Wallet",

        image: "https://cdn-icons-png.flaticon.com/512/217/217853.png",

        currency: "INR",

        key: "rzp_test_Sp3d5I4jQQ6SIO",

        amount: data?.order?.amount,

        name: "NexFF",

        order_id: data?.order?.id,

        prefill: {
          email: user?.email || "demo@gmail.com",

          contact: user?.phone || "9999999999",

          name: user?.name || "User",
        },

        theme: {
          color: "#14b8a6",
        },

        // ✅ ENABLE UPI
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
        },

        // ✅ OPEN UPI FIRST
        config: {
          display: {
            blocks: {
              upi: {
                name: "Pay Using UPI",
                instruments: [
                  {
                    method: "upi",
                  },
                ],
              },

              cards: {
                name: "Pay Using Cards",
                instruments: [
                  {
                    method: "card",
                  },
                ],
              },
            },

            sequence: ["block.upi", "block.cards"],

            preferences: {
              show_default_blocks: true,
            },
          },
        },
      };

      RazorpayCheckout.open(options)

        .then(async (paymentData) => {
          try {
            const verifyRes = await axios.post(
              `${API}/payment/verify-payment`,
              {
                razorpay_order_id: paymentData?.razorpay_order_id,

                razorpay_payment_id: paymentData?.razorpay_payment_id,

                razorpay_signature: paymentData?.razorpay_signature,

                amount: numericAmount,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );

            setLoading(false);

            if (verifyRes?.data?.success) {
              Toast.show({
                type: "success",
                text1: "Cash Added 💰",
                text2: `₹${numericAmount} added successfully`,
              });

              setAmount("");
            }
          } catch (error) {
            setLoading(false);

            Toast.show({
              type: "error",
              text1: "Verification Failed",
              text2: "Payment verification failed",
            });
          }
        })

        .catch(() => {
          setLoading(false);

          Toast.show({
            type: "error",
            text1: "Payment Cancelled",
            text2: "Transaction cancelled",
          });
        });
    } catch (error) {
      setLoading(false);

      Toast.show({
        type: "error",
        text1: "Payment Failed",
        text2: "Something went wrong",
      });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f3f4f6",
      }}
    >
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      >
        {/* HEADER */}
        <LinearGradient
          colors={["#14b8a6", "#0f766e"]}
          style={{
            paddingTop: 58,
            paddingHorizontal: 18,
            paddingBottom: 28,
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
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
                  color: "#fff",
                  fontSize: 24,
                  fontWeight: "800",
                }}
              >
                Add Cash
              </Text>

              <Text
                style={{
                  color: "#ccfbf1",
                  marginTop: 3,
                  fontSize: 11,
                }}
              >
                Secure & Instant Payments
              </Text>
            </View>

            <View
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                padding: 12,
                borderRadius: 16,
              }}
            >
              <Ionicons name="wallet" size={22} color="#fff" />
            </View>
          </View>

          {/* BALANCE CARD */}
          <View
            style={{
              backgroundColor: "#fff",
              marginTop: 22,
              borderRadius: 18,
              padding: 18,
            }}
          >
            <Text
              style={{
                color: "#6b7280",
                fontSize: 11,
                fontWeight: "700",
              }}
            >
              CURRENT BALANCE
            </Text>

            <Text
              style={{
                color: "#111827",
                fontSize: 28,
                fontWeight: "900",
                marginTop: 8,
              }}
            >
              ₹{user?.walletBalance?.toFixed(2) || "0.00"}
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Ionicons name="checkmark-circle" size={14} color="#22c55e" />

              <Text
                style={{
                  color: "#22c55e",
                  marginLeft: 5,
                  fontSize: 11,
                  fontWeight: "700",
                }}
              >
                Trusted Payments
              </Text>
            </View>
          </View>
        </LinearGradient>

        <View
          style={{
            paddingHorizontal: 16,
            marginTop: 20,
          }}
        >
          {/* BONUS */}
          <LinearGradient
            colors={["#f97316", "#ea580c"]}
            style={{
              borderRadius: 18,
              padding: 18,
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                color: "#fff7ed",
                fontWeight: "700",
                fontSize: 11,
              }}
            >
              BONUS OFFER 🎁
            </Text>

            <Text
              style={{
                color: "#fff",
                fontSize: 22,
                fontWeight: "900",
                marginTop: 4,
              }}
            >
              Get ₹50 Bonus
            </Text>

            <Text
              style={{
                color: "#ffedd5",
                marginTop: 5,
                fontSize: 12,
                lineHeight: 18,
              }}
            >
              Add ₹100 or more and unlock bonus cash.
            </Text>
          </LinearGradient>

          {/* ENTER AMOUNT */}
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 18,
              padding: 18,
            }}
          >
            <Text
              style={{
                color: "#111827",
                fontSize: 15,
                fontWeight: "800",
                marginBottom: 14,
              }}
            >
              Enter Amount
            </Text>

            <View
              style={{
                height: 68,
                borderRadius: 18,
                borderWidth: 1.5,
                borderColor: "#14b8a6",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
              }}
            >
              <Text
                style={{
                  color: "#14b8a6",
                  fontSize: 28,
                  fontWeight: "900",
                  marginRight: 8,
                }}
              >
                ₹
              </Text>

              <TextInput
                placeholder="0"
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
                value={amount}
                onChangeText={handleAmountChange}
                style={{
                  flex: 1,
                  color: "#111827",
                  fontSize: 24,
                  fontWeight: "800",
                }}
              />
            </View>

            <Text
              style={{
                color: "#6b7280",
                marginTop: 10,
                fontSize: 11,
              }}
            >
              Minimum ₹50 • Maximum ₹10,000
            </Text>
          </View>

          {/* QUICK ADD */}
          <View
            style={{
              marginTop: 22,
            }}
          >
            <Text
              style={{
                color: "#111827",
                fontSize: 15,
                fontWeight: "800",
                marginBottom: 14,
              }}
            >
              Quick Add
            </Text>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {quickAmounts.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={() => setAmount(item.toString())}
                  style={{
                    width: width * 0.28,
                    backgroundColor: "#fff",
                    height: 65,
                    borderRadius: 16,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 14,
                    borderWidth: 1,
                    borderColor: "#e5e7eb",
                  }}
                >
                  <Text
                    style={{
                      color: "#111827",
                      fontSize: 18,
                      fontWeight: "800",
                    }}
                  >
                    ₹{item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* PAYMENT METHODS */}
          {/* PAYMENT METHODS */}
          <View
            style={{
              marginTop: 8,
            }}
          >
            <Text
              style={{
                color: "#111827",
                fontSize: 15,
                fontWeight: "800",
                marginBottom: 14,
              }}
            >
              Payment Methods
            </Text>

            {/* UPI APPS */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              {[
                {
                  name: "GPay",
                  icon: (
                    <Ionicons name="logo-google" size={24} color="#4285F4" />
                  ),
                },

                {
                  name: "PhonePe",
                  icon: (
                    <MaterialCommunityIcons
                      name="cellphone"
                      size={24}
                      color="#5f259f"
                    />
                  ),
                },

                {
                  name: "Paytm",
                  icon: (
                    <Ionicons name="wallet-outline" size={24} color="#00baf2" />
                  ),
                },
              ].map((item, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  style={{
                    width: width * 0.27,
                    backgroundColor: "#fff",
                    paddingVertical: 16,
                    borderRadius: 16,
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#e5e7eb",
                  }}
                >
                  {item.icon}

                  <Text
                    style={{
                      marginTop: 8,
                      fontSize: 12,
                      fontWeight: "700",
                      color: "#111827",
                    }}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* METHODS */}
            {[
              {
                title: "UPI",
                subtitle: "PhonePe • GPay • Paytm",
                icon: (
                  <MaterialCommunityIcons
                    name="qrcode-scan"
                    size={20}
                    color="#14b8a6"
                  />
                ),
              },

              {
                title: "Cards",
                subtitle: "Visa • Mastercard",
                icon: (
                  <Ionicons name="card-outline" size={20} color="#14b8a6" />
                ),
              },
            ].map((item, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 16,
                  padding: 14,
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#ecfeff",
                    padding: 12,
                    borderRadius: 14,
                  }}
                >
                  {item.icon}
                </View>

                <View
                  style={{
                    marginLeft: 12,
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      color: "#111827",
                      fontWeight: "800",
                      fontSize: 14,
                    }}
                  >
                    {item.title}
                  </Text>

                  <Text
                    style={{
                      color: "#6b7280",
                      marginTop: 2,
                      fontSize: 11,
                    }}
                  >
                    {item.subtitle}
                  </Text>
                </View>

                <Feather name="check-circle" size={18} color="#22c55e" />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* BUTTON */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#fff",
          paddingHorizontal: 16,
          paddingVertical: 14,
          borderTopWidth: 1,
          borderTopColor: "#e5e7eb",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handlePayment}
          disabled={loading}
        >
          <LinearGradient
            colors={["#14b8a6", "#0f766e"]}
            style={{
              height: 56,
              borderRadius: 16,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "800",
              }}
            >
              {loading ? "Processing..." : `Add Cash ₹${amount || "0"}`}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddMoney;
