import { Tabs } from "expo-router";
import { FontAwesome, Ionicons, Octicons } from "@expo/vector-icons";

import Test from "@/assets/icon/learn_Vector.svg";
import Plan from "@/assets/icon/plan_Vector.svg";
import Profile from "@/assets/icon/profile_Vector.svg";
import Record from "@/assets/icon/record_Vector.svg";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0D9E00",
        tabBarLabelStyle: {
          fontFamily: "mon-sb",
        },
        tabBarInactiveTintColor: "black",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "記帳",
          tabBarIcon: ({ size, color }) => (
            <Record name="sticky-note-2" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="plan"
        options={{
          tabBarLabel: "計畫",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Plan name="project" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          tabBarLabel: "學習",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Test name="book" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "我的",

          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Profile name="person-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
