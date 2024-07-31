"use client";

import userAPI from "@/apis/usersAPI";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    const fetchDataTest = async () => {
      const response = await userAPI.getUsers();
      return response;
    };

    fetchDataTest();
  }, []);
  return <div>Home</div>;
}
export default Home;
