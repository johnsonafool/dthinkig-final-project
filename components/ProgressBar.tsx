import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Animated from "react-native-reanimated";

import * as Progress from "react-native-progress";

type Props = {};

const AppProgressBar = (props: Props) => {
  //   const countInterval = useRef(null as any);
  //   const [count, setCount] = useState(0);

  //   useEffect(() => {
  //     countInterval.current = setInterval(() => setCount((old) => old + 5), 1000);
  //     return () => {
  //       clearInterval(countInterval as any); //when user exits, clear this interval.
  //     };
  //   }, []);

  return (
    <View>
      {/* <Text>Loading.....</Text>
      <View style={styles.progressBar}>
        <View style={{ backgroundColor: "#8BED4F", width: "50%" }} />
      </View> */}
      <Progress.Bar progress={0.3} width={200} />
    </View>
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
