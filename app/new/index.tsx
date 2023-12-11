import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { memo, useEffect, useRef, useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import { Marker } from "react-native-maps";
import MapView from "react-native-map-clustering";
import { useRouter } from "expo-router";
import { Ionicons, AntDesign, Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import * as Location from "expo-location";
import { ScrollView } from "react-native";
import { cardGap, cardWidth } from "../../components/Listings";
import { TextInput } from "react-native";
// import { Button } from "../components/Button";
import { Modal } from "@/components/GenreModal";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppIcon, { CusPlusIcon } from "@/components/AppIcon";
// import DropDownPicker from "react-native-dropdown-picker";
import { Dropdown } from "react-native-element-dropdown";

const data = [
  { label: "無特別計畫", value: "1" },
  { label: "旅遊", value: "2" },
  { label: "教育", value: "3" },
  { label: "整牙", value: "4" },
  // { label: "Item 5", value: "5" },
  // { label: "Item 6", value: "6" },
  // { label: "Item 7", value: "7" },
  // { label: "Item 8", value: "8" },
];

// RN Code
export const Col = ({ numRows, children }: { numRows: any; children: any }) => {
  return <View style={styles[`${numRows}col`]}>{children}</View>;
};

export const Row = ({ children }: { children: any }) => (
  <View style={styles.row}>{children}</View>
);

const categories = [
  {
    name: "支出",
    icon: "home",
  },
  {
    name: "收入",
    icon: "house-siding",
  },
  {
    name: "轉帳",
    icon: "local-fire-department",
  },
];

interface Props {
  listings: any;
}

const INITIAL_REGION = {
  latitude: 37.33,
  longitude: -122,
  latitudeDelta: 9,
  longitudeDelta: 9,
};

const Page = memo(({ listings }: Props) => {
  const router = useRouter();
  const mapRef = useRef<any>(null);
  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [day, setDay] = useState(10);
  const [open, setOpen] = useState(false);
  // const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Pear", value: "pear" },
  ]);

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);
    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
    });
    // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // onCategoryChanged(categories[index].name);
  };

  // When the component mounts, locate the user
  useEffect(() => {
    onLocateMe();
  }, []);

  // When a marker is selected, navigate to the listing page
  const onMarkerSelected = (event: any) => {
    router.push(`/listing/${event.properties.id}`);
  };

  // Focus the map on the user's location
  const onLocateMe = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 7,
      longitudeDelta: 7,
    };

    mapRef.current?.animateToRegion(region);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // Overwrite the renderCluster function to customize the cluster markers
  const renderCluster = (cluster: any) => {
    const { id, geometry, onPress, properties } = cluster;

    const points = properties.point_count;
    return (
      <Marker
        key={`cluster-${id}`}
        coordinate={{
          longitude: geometry.coordinates[0],
          latitude: geometry.coordinates[1],
        }}
        onPress={onPress}
      >
        <View style={styles.marker}>
          <Text
            style={{
              color: "#000",
              textAlign: "center",
              fontFamily: "mon-sb",
            }}
          >
            {points}
          </Text>
        </View>
      </Marker>
    );
  };

  const handleAddNewName = () => {
    router.push("/new/add-new");
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View>
        <ScrollView
          horizontal
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
            width: "100%",

            // paddingHorizontal: 16,
          }}
        >
          {categories.map((item, index) => (
            <TouchableOpacity
              ref={(el) => (itemsRef.current[index] = el)}
              key={index}
              style={
                activeIndex === index
                  ? styles.categoriesBtnActive
                  : styles.categoriesBtn
              }
              onPress={() => selectCategory(index)}
            >
              <Text
                style={
                  activeIndex === index
                    ? styles.categoryTextActive
                    : styles.categoryText
                }
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <ScrollView>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: cardGap,
            }}
          >
            <View
              style={{
                marginLeft: 0,
                width: cardWidth / 1.4,
                height: cardWidth / 1.4,
                backgroundColor: "white",
                borderRadius: 16,
                justifyContent: "center",
                alignItems: "center",
                borderColor: "#DEDEDE",
                borderWidth: 1,
                gap: 4,
                // padding: 20,
              }}
            >
              <View
                style={{
                  backgroundColor: "#489C2C",
                  padding: 8,
                  borderRadius: "50%",
                }}
              >
                <MaterialIcons name="local-dining" size={24} color="white" />
              </View>
              <Text
                style={{ fontFamily: "mon-sb", fontSize: 12 }}
              >{`飲食`}</Text>
              <Text
                style={{ fontFamily: "mon-b", fontSize: 16 }}
              >{`早餐`}</Text>
              <AntDesign name={"down"} size={16} color="black" />
            </View>
            <View
              style={{
                justifyContent: "flex-end",
                height: cardWidth / 1.5,
              }}
            >
              <Text style={{ fontFamily: "mon-b", fontSize: 40 }}>$100</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: cardGap * 2,
            marginLeft: 0,
            width: "100%",
            height: 40,
            backgroundColor: "white",
            borderRadius: 8,
            borderColor: "#DEDEDE",
            borderWidth: 1,
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 16,
          }}
        >
          <TouchableOpacity>
            <AntDesign
              name="caretleft"
              size={16}
              color="black"
              onPress={() => setDay(day - 1)}
            />
          </TouchableOpacity>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "mon-sb",
              fontSize: 16,
            }}
          >
            {`2023/12/${day}`}
          </Text>
          <TouchableOpacity>
            <AntDesign
              name="caretright"
              size={16}
              color="black"
              onPress={() => setDay(day + 1)}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: cardGap }}>
          <Text style={styles.info}>帳戶</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: cardGap / 2,
              marginLeft: 0,
              width: "100%",
              height: 40,
              backgroundColor: "white",
              borderRadius: 8,
              // shadowOpacity: 0.1,
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 16,
              borderColor: "#DEDEDE",
              borderWidth: 1,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "mon-sb",
                fontSize: 16,
              }}
            >
              現金
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "mon-sb",
                fontSize: 16,
                display: "flex",
              }}
            >
              <Text>餘額</Text>
              <Text style={{ color: "#ED7B75" }}>{"-44"}</Text>
            </Text>
          </View>
        </View>
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              // flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                marginTop: cardGap,
                // marginLeft: i % 2 !== 0 ? cardGap : 0,
                width: "35%",
                height: 130,
                backgroundColor: "white",
                borderRadius: 16,
                // shadowOpacity: 0.1,
                justifyContent: "center",
                alignItems: "center",
                borderColor: "#DEDEDE",
                borderWidth: 1,
              }}
            >
              <TouchableOpacity>
                <Feather name="camera" size={24} color="#DEDEDE" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: cardGap,
                marginLeft: cardGap,
                width: "60%",
                height: 130,
                backgroundColor: "white",
                borderRadius: 16,
                // justifyContent: "center",
                // alignItems: "center",
                borderColor: "#DEDEDE",
                borderWidth: 1,
                padding: 8,
              }}
            >
              <TouchableOpacity>
                <Text
                  style={{ color: "#5F5F5F", fontFamily: "mon-sb" }}
                >{`請輸入備註`}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.advanced}>
          <Text style={styles.info}>進階設定</Text>
          <TouchableOpacity onPress={() => setShowAdvanced(!showAdvanced)}>
            <AntDesign
              name={showAdvanced ? "caretup" : "caretdown"}
              size={16}
              color="black"
              style={{ marginTop: "auto" }}
              // onPress={() => setShowAdvanced(!showAdvanced)}
            />
          </TouchableOpacity>
        </View>
        {showAdvanced && (
          <>
            <View
              style={{
                display: "flex",
                gap: 10,
                marginTop: cardGap / 2,
                padding: 8,
                width: "100%",
                backgroundColor: "white",
                borderRadius: 8,
                paddingHorizontal: 16,
                paddingBottom: 16,
                borderColor: "#DEDEDE",
                borderWidth: 1,
              }}
            >
              <View>
                <Text style={styles.subText}>計畫</Text>
                {/* <TextInput
                  style={styles.input}
                  // onChangeText={onChangeText}
                  // value={text}
                  placeholder="Please enter project"
                /> */}
                {/* {renderLabel()} */}
                <Dropdown
                  style={[
                    styles.dropdown,
                    isFocus && { borderColor: "#DEDEDE" },
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={data}
                  // search
                  // maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? "無特別計畫" : "..."}
                  searchPlaceholder="Search..."
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setValue(item.value);
                    setIsFocus(false);
                  }}
                  // renderLeftIcon={() => (
                  //   <AntDesign
                  //     style={styles.icon}
                  //     color={isFocus ? "blue" : "black"}
                  //     name="Safety"
                  //     size={20}
                  //   />
                  // )}
                />
              </View>
              {/* <View style={{ display: "flex", flexDirection: "row", gap: 10 }}> */}
              <View>
                <Text style={styles.subText}>發票號碼</Text>
                <View
                  style={
                    {
                      // display: "flex",
                      // flexDirection: "row",
                      // justifyContent: "space-between",
                      // width: "50%",
                    }
                  }
                >
                  <TextInput
                    style={styles.halfInput}
                    // onChangeText={onChangeText}
                    // value={text}
                    placeholder="手輸發票"
                  />
                  <MaterialCommunityIcons
                    name="qrcode-scan"
                    size={24}
                    color="black"
                    // color="#DEDEDE"
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                    }}
                  />
                </View>
              </View>
              <View style={{}}>
                <Text style={styles.subText}>商家</Text>
                <TextInput
                  style={styles.halfInput}
                  // onChangeText={onChangeText}
                  // value={text}
                  placeholder="商家名稱"
                />
              </View>
              {/* </View> */}
              <View>
                <Text style={styles.subText}>消費地點</Text>
                <TextInput
                  style={styles.input}
                  // onChangeText={onChangeText}
                  // value={text}
                  placeholder="請輸入地址"
                />
              </View>
            </View>
          </>
        )}
      </ScrollView>
      <Modal isVisible={isModalVisible}>
        <Modal.Container>
          <Modal.Header
            title="選擇分類"
            onClose={handleCloseModal}
            onEdit={handleAddNewName}
          />
          <Modal.Body>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                // fontFamily: "mon-sb",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <View
                style={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                  margin: 10,
                  width: "40%",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontFamily: "mon-sb", fontSize: 18 }}>
                  主分類
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                  margin: 10,
                  width: "40%",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontFamily: "mon-sb", fontSize: 18 }}>
                  子分類
                </Text>
              </View>
            </View>
            <View
              style={{
                borderBottomColor: "#DEDEDE",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            <ScrollView>
              <View>
                <Row>
                  <Col numRows={2}>
                    {Array.from(Array(10)).map((i, k) => {
                      return (
                        <AppIcon key={k} isSelect={k === 0}>
                          <MaterialIcons
                            name="local-dining"
                            size={24}
                            color="white"
                          />
                        </AppIcon>
                      );
                    })}
                  </Col>
                  <Col numRows={2}>
                    {Array.from(Array(10)).map((i, k) => {
                      if (k === 10 - 1) {
                        return (
                          <CusPlusIcon key={k} isSelect={true} text="新增">
                            <AntDesign name="plus" size={24} color="#fff" />
                          </CusPlusIcon>
                        );
                      }
                      return (
                        <AppIcon key={k} isSelect={true} text="晚餐">
                          <MaterialIcons
                            name="local-dining"
                            size={24}
                            color="white"
                          />
                        </AppIcon>
                      );
                    })}
                  </Col>
                </Row>
              </View>
            </ScrollView>
          </Modal.Body>
          {/* <Modal.Footer>
            <Button title="I agree" onPress={handleModal} />
          </Modal.Footer> */}
        </Modal.Container>
      </Modal>
      <View
        style={{
          padding: 20,
          paddingVertical: 30,
          // backgroundColor: "red",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity style={{}}>
          <Text>設為範本</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>再記一筆</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>儲存</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    padding: 16,
    gap: 10,
    backgroundColor: "#fff",
    // marginVertical: 16,
  },
  marker: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderColor: "#DEDEDE",
    borderWidth: 1,
  },
  markerText: {
    fontSize: 14,
    fontFamily: "mon-sb",
  },
  locateBtn: {
    position: "absolute",
    top: 70,
    right: 20,
    padding: 10,
    borderRadius: 10,
    borderColor: "#DEDEDE",
    borderWidth: 1,
  },
  info: {
    // textAlign: "center",
    fontFamily: "mon-sb",
    fontSize: 16,
    marginTop: 4,
  },
  subText: {
    // textAlign: "center",
    fontFamily: "mon-sb",
    fontSize: 14,
    marginTop: 4,
  },
  advanced: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: cardGap * 2,
  },
  // container: {
  //   backgroundColor: "#fff",
  //   height: 130,
  //   elevation: 2,
  //   shadowColor: "#000",
  //   shadowOpacity: 0.1,
  //   shadowRadius: 6,
  //   shadowOffset: {
  //     width: 1,
  //     height: 10,
  //   },
  // },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 16,
  },

  searchBtn: {
    backgroundColor: "#fff",
    flexDirection: "row",
    gap: 10,
    padding: 14,
    alignItems: "center",
    width: 280,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#c2c2c2",
    borderRadius: 30,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  filterBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#A2A0A2",
    borderRadius: 24,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: "mon-sb",
    // color: Colors.grey,
    color: "#B0B0B0",
  },
  categoryTextActive: {
    fontSize: 14,
    fontFamily: "mon-sb",
    color: "#000",
  },
  categoriesBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8,
    color: "#B0B0B0",
  },
  categoriesBtnActive: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#0D9E00",
    borderBottomWidth: 2,
    paddingBottom: 8,
  },
  input: {
    // margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 8,
    // paddingHorizontal: 16,
    borderColor: "#DEDEDE",
    height: 40,
    color: "#DEDEDE",
    fontWeight: "bold",
  },
  halfInput: {
    // margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 8,
    // paddingHorizontal: 16,
    borderColor: "#DEDEDE",
    height: 40,
    color: "#DEDEDE",
    fontWeight: "bold",
  },
  twoColGrid: {
    borderColor: "#fff",
    borderWidth: 1,
    flex: 2,
    alignItems: "center",
    marginVertical: 10,
    gap: 10,
  },
  row: {
    // gap: 10,
    flexDirection: "row",
  },
  app: {
    flex: 4, // the number of columns you want to devide the screen into
    marginHorizontal: "auto",
    width: 400,
    backgroundColor: "red",
  },
  // row: {
  //   flexDirection: "row",
  // },
  "1col": {
    // backgroundColor: "lightblue",
    borderColor: "#fff",
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  "2col": {
    // backgroundColor: "green",
    borderColor: "#fff",
    borderWidth: 1,
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    gap: 10,
  },
  "3col": {
    backgroundColor: "orange",
    borderColor: "#fff",
    borderWidth: 1,
    flex: 3,
  },
  "4col": {
    flex: 4,
  },
  dropdown: {
    height: 40,
    borderColor: "#DEDEDE",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
    color: "#CECED0",
    fontWeight: "bold",
  },
  selectedTextStyle: {
    // fontSize: 16,
    fontSize: 14,
    // color: "#CECED0",
    // fontWeight: "bold",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default Page;
