import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

type Props = { children: React.ReactNode; isSelect: boolean; text?: string };

const AppIcon = (props: Props) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
    >
      <View
        style={{
          backgroundColor: "#489C2C",
          padding: 8,
          borderRadius: "50%",
        }}
      >
        {/* <MaterialIcons name="local-dining" size={24} color="white" /> */}
        {props.children}
      </View>
      <Text
        style={{
          color: props.isSelect ? "#5F5F5F" : "#BDBDBD",
          fontFamily: "mon-sb",
        }}
      >
        {props.text ?? `飲食`}
      </Text>
    </View>
  );
};

export const CusPlusIcon = (props: Props) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
    >
      <View
        style={{
          backgroundColor: "#BDBDBD",
          padding: 8,
          borderRadius: "50%",
        }}
      >
        {/* <MaterialIcons name="local-dining" size={24} color="white" /> */}
        {props.children}
      </View>
      <Text
        style={{
          color: props.isSelect ? "#5F5F5F" : "#DEDEDE",
          fontFamily: "mon-sb",
        }}
      >
        {props.text ?? `飲食`}
      </Text>
    </View>
  );
};

export default AppIcon;

const styles = StyleSheet.create({});
