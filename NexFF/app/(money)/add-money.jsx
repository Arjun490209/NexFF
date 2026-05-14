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

import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
  Feather,
} from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

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

  const quickAmounts = [50, 100, 200, 500, 1000, 2000];

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

      // VALIDATION
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

      // ==========================
      // CREATE ORDER
      // ==========================
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

      // ==========================
      // RAZORPAY OPTIONS
      // ==========================
      const options = {
        description: "Add Money To Wallet",
        image: "https://cdn-icons-png.flaticon.com/512/217/217853.png",

        currency: "INR",

        key: "RAZORPAY_KEY_ID", // replace with your real key

        amount: data?.order?.amount,

        name: "NexFF",

        order_id: data?.order?.id,

        prefill: {
          email: user?.email || "demo@gmail.com",
          contact: user?.phone || "9999999999",
          name: user?.name || "User",
        },

        theme: {
          color: "#facc15",
        },
      };

      // ==========================
      // OPEN RAZORPAY
      // ==========================
      RazorpayCheckout.open(options)

        .then(async (paymentData) => {
          try {
            // ==========================
            // VERIFY PAYMENT
            // ==========================
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

            // ==========================
            // SUCCESS
            // ==========================
            if (verifyRes?.data?.success) {
              Toast.show({
                type: "success",
                text1: "Payment Successful",
                text2: `₹${numericAmount} added successfully`,
              });

              setAmount("");
            }
          } catch (error) {
            setLoading(false);

            console.log(error);

            Toast.show({
              type: "error",
              text1: "Verification Failed",
              text2: "Payment verification failed",
            });
          }
        })

        .catch((error) => {
          setLoading(false);

          console.log(error);

          Toast.show({
            type: "error",
            text1: "Payment Cancelled",
            text2: "Transaction cancelled by user",
          });
        });
    } catch (error) {
      setLoading(false);

      console.log(error);

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
        backgroundColor: "#030303",
      }}
    >
      <StatusBar barStyle="light-content" />

      {/* GLOW */}
      <View
        style={{
          position: "absolute",
          top: -120,
          right: -100,
          height: 300,
          width: 300,
          borderRadius: 200,
          backgroundColor: "#facc15",
          opacity: 0.15,
        }}
      />

      <View
        style={{
          position: "absolute",
          bottom: -120,
          left: -100,
          height: 250,
          width: 250,
          borderRadius: 200,
          backgroundColor: "#eab308",
          opacity: 0.08,
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 140,
        }}
      >
        {/* HEADER */}
        <LinearGradient
          colors={["#151515", "#080808"]}
          style={{
            paddingTop: 65,
            paddingHorizontal: 22,
            paddingBottom: 30,
            borderBottomLeftRadius: 35,
            borderBottomRightRadius: 35,
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
                  fontSize: 34,
                  fontWeight: "900",
                  letterSpacing: 1,
                }}
              >
                Add Money
              </Text>

              <Text
                style={{
                  color: "#9ca3af",
                  marginTop: 6,
                  fontSize: 13,
                }}
              >
                Instant wallet recharge for tournaments
              </Text>
            </View>

            <LinearGradient
              colors={["#facc15", "#eab308"]}
              style={{
                height: 65,
                width: 65,
                borderRadius: 35,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="wallet" size={30} color="#000" />
            </LinearGradient>
          </View>
        </LinearGradient>

        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 25,
          }}
        >
          {/* WALLET CARD */}
          <LinearGradient
            colors={["#1f2937", "#111827", "#0f172a"]}
            style={{
              borderRadius: 30,
              padding: 25,
              overflow: "hidden",
              marginBottom: 28,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={{
                    color: "#9ca3af",
                    fontSize: 13,
                  }}
                >
                  WALLET BALANCE
                </Text>

                <Text
                  style={{
                    color: "#fff",
                    fontSize: 40,
                    fontWeight: "900",
                    marginTop: 12,
                  }}
                >
                  ₹{user?.walletBalance?.toFixed(2) || "0.00"}
                </Text>
              </View>

              <BlurView
                intensity={30}
                tint="dark"
                style={{
                  height: 55,
                  width: 55,
                  borderRadius: 18,
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <Feather name="zap" size={28} color="#facc15" />
              </BlurView>
            </View>
          </LinearGradient>

          {/* AMOUNT */}
          <BlurView
            intensity={20}
            tint="dark"
            style={{
              borderRadius: 30,
              overflow: "hidden",
              marginBottom: 28,
            }}
          >
            <View
              style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                padding: 22,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 19,
                  fontWeight: "bold",
                  marginBottom: 20,
                }}
              >
                Enter Amount
              </Text>

              <LinearGradient
                colors={["#1f2937", "#111827"]}
                style={{
                  borderRadius: 24,
                  paddingHorizontal: 20,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#facc15",
                    fontSize: 36,
                    fontWeight: "900",
                    marginRight: 12,
                  }}
                >
                  ₹
                </Text>

                <TextInput
                  placeholder="0"
                  placeholderTextColor="#6b7280"
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={handleAmountChange}
                  style={{
                    flex: 1,
                    color: "#fff",
                    fontSize: 34,
                    fontWeight: "900",
                    height: 85,
                  }}
                />
              </LinearGradient>

              <Text
                style={{
                  color: "#9ca3af",
                  marginTop: 12,
                  fontSize: 12,
                }}
              >
                Minimum ₹50 • Maximum ₹10,000
              </Text>
            </View>
          </BlurView>

          {/* QUICK */}
          <View
            style={{
              marginBottom: 30,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 18,
              }}
            >
              Quick Select
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
                  onPress={() => setAmount(item.toString())}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={["#111827", "#1f2937"]}
                    style={{
                      width: width * 0.27,
                      height: 75,
                      borderRadius: 24,
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: 16,
                    }}
                  >
                    <Text
                      style={{
                        color: "#facc15",
                        fontWeight: "900",
                        fontSize: 22,
                      }}
                    >
                      ₹{item}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
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
          paddingHorizontal: 20,
          paddingVertical: 20,
          backgroundColor: "rgba(3,3,3,0.95)",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handlePayment}
          disabled={loading}
        >
          <LinearGradient
            colors={["#facc15", "#eab308"]}
            style={{
              height: 68,
              borderRadius: 24,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "#000",
                fontSize: 20,
                fontWeight: "900",
              }}
            >
              {loading ? "Processing..." : `Add ₹${amount || "0"} to Wallet`}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddMoney;
