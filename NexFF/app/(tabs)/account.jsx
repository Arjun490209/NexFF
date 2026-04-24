import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

const Account = () => {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  return (
    <SafeAreaView>
      <Text>Account</Text>
    </SafeAreaView>
  );
};

export default Account;
