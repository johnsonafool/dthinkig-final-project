import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useMemo, useRef, useState } from "react";
// import BottomSheet from "@gorhom/bottom-sheet";
import Listings from "@/components/Listings";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { router } from "expo-router";

interface Props {
  listings: any[];
  category: string;
}

// Bottom sheet that wraps our Listings component
const ListingsBottomSheet = ({ listings, category }: Props) => {
  const snapPoints = useMemo(() => ["5%", "100%"], []);
  const bottomSheetRef = useRef<any>(null);
  const [refresh, setRefresh] = useState<number>(0);

  const onShowMap = () => {
    bottomSheetRef.current?.collapse();
    setRefresh(refresh + 1);
  };

  return (
    // <BottomSheet
    //   ref={bottomSheetRef}
    //   index={1}
    //   snapPoints={snapPoints}
    //   enablePanDownToClose={false}
    //   handleIndicatorStyle={{ backgroundColor: Colors.grey }}
    //   style={styles.sheetContainer}
    // >
    <View style={styles.contentContainer}>
      <Listings listings={listings} refresh={refresh} category={category} />
      <View style={styles.absoluteView}>
        {/* <TouchableOpacity onPress={onShowMap} style={styles.btn}> */}
        <TouchableOpacity
          onPress={() => router.push("/new/")}
          // style={styles.btn}
        >
          {/* <Text style={{ fontFamily: "mon-sb", color: "#fff" }}>Add</Text> */}
          {/* <Ionicons
              name="plus"
              size={20}
              style={{ marginLeft: 10 }}
              color={"#fff"}
            /> */}
          {/* <AntDesign
            name="plus"
            size={20}
            // style={{ marginLeft: 10 }}
            color={"#fff"}
          /> */}
          <Ionicons name="add-circle-outline" size={48} color="#0D9E00" />
        </TouchableOpacity>
      </View>
    </View>
    // </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  absoluteView: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    alignItems: "center",
  },
  btn: {
    // backgroundColor: Colors.dark,
    backgroundColor: "#0D9E00",
    padding: 14,
    height: 50,
    borderRadius: 30,
    flexDirection: "row",
    marginHorizontal: "auto",
    alignItems: "center",
  },
  sheetContainer: {
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});

export default ListingsBottomSheet;
