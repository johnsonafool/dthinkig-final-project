import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Animated from "react-native-reanimated";

import * as Progress from "react-native-progress";

type Props = {
  rate: number;
};

const AppProgressBar = (props: Props) => {
  return (
    <Progress.Bar progress={props.rate / 100} width={100} color="#0D9E00" />
  );
};

export default AppProgressBar;

const styles = StyleSheet.create({
  progressBar: {
    height: 20,
    width: "100%",
    backgroundColor: "white",
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 5,
  },
});
