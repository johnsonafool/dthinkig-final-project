import { Tabs } from "expo-router";
import { FontAwesome, Ionicons, Octicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0D9E00",
        tabBarLabelStyle: {
          fontFamily: "mon-sb",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "記帳",
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="sticky-note-2" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="plan"
        options={{
          tabBarLabel: "計畫",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            // <Ionicons name="heart-outline" size={size} color={color} />
            <Octicons name="project" size={24} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          tabBarLabel: "學習",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="book" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "我的",

          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
