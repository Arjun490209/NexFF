import React from "react";
import { useSelector } from "react-redux";

import UserAccount from "../../src/components/account/UserAccount";
import WorkerAccount from "../../src/components/account/WorkerAccount";
import AdminAccount from "../../src/components/account/AdminAccount";

const Account = () => {
  const user = useSelector((state) => state?.user?.user);
  console.log(user);

  if (!user) {
    return null; // ya loader
  }

  // 🔥 ROLE BASED SWITCH (YAHAN LAGANA HAI)
  if (user.role === "admin") return <AdminAccount />;
  if (user.role === "worker") return <WorkerAccount />;
  return <UserAccount />;
};

export default Account;
