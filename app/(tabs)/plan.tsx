import {
  View,
  Text,
  SafeAreaView,
  Switch,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { defaultStyles } from "@/constants/Styles";
import { Octicons } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import { Col, Row } from "../new";
import { cardWidth } from "@/components/Listings";
import ProgressBar from "@/components/ProgressBar";

// const RenderRow = ({ item, text }: { item: any; text?: string }) => (
const RenderRow = ({ avaImg, postImg, title }: any) => (
  // <Link href={`/listing/${item.id}`} asChild>
  <TouchableOpacity>
    <Animated.View
      style={styles.listing}
      // entering={FadeInRight}
      // exiting={FadeOutLeft}
    >
      <View
        style={{
          display: "flex",
          gap: 10,
          borderColor: "#D9D9D9",
          borderWidth: 1,
          borderRadius: 10,
          width: cardWidth,
        }}
      >
        <Animated.Image
          source={{
            // uri: "https://a0.muscache.com/im/pictures/bced1392-9538-41df-92d9-f058a7188b0f.jpg?aki_policy=medium",
            uri: postImg,
          }}
          style={styles.image}
        />
        <TouchableOpacity style={{ position: "absolute", right: 30, top: 30 }}>
          {/* <Ionicons name="heart-outline" size={24} color="#000" /> */}
        </TouchableOpacity>
        <View style={{ display: "flex", padding: 10, gap: 10 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "mon-sb",
              }}
            >
              {`旅遊`}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "mon-sb",
              }}
            >
              {`$45,000`}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* <Text
              style={{
                fontSize: 16,
                fontFamily: "mon-sb",
              }}
            >
              {`60%`}
            </Text> */}
            <ProgressBar />
          </View>
        </View>
      </View>
    </Animated.View>
  </TouchableOpacity>
  // </Link>
);

const Page = () => {
  const subjects = [
    {
      id: 1,
      name: "旅遊",
      url: "https://media.istockphoto.com/id/1164049513/photo/airplane-taking-off-from-the-airport.webp?b=1&s=170667a&w=0&k=20&c=ZL25hKR74ZmYpOgrpHjAphEEJpwcOPuV1FSU0v-Gky8=",
    },
    {
      id: 2,
      name: "教育",
      url: "https://media.istockphoto.com/id/1164049513/photo/airplane-taking-off-from-the-airport.webp?b=1&s=170667a&w=0&k=20&c=ZL25hKR74ZmYpOgrpHjAphEEJpwcOPuV1FSU0v-Gky8=",
    },
    { id: 3, name: "Card 3" },
    {
      id: 4,
      name: "整牙",
      url: "https://media.istockphoto.com/id/1164049513/photo/airplane-taking-off-from-the-airport.webp?b=1&s=170667a&w=0&k=20&c=ZL25hKR74ZmYpOgrpHjAphEEJpwcOPuV1FSU0v-Gky8=",
    },
    // {
    //   id: 5,
    //   name: "Card 3",
    //   url: "https://media.istockphoto.com/id/1164049513/photo/airplane-taking-off-from-the-airport.webp?b=1&s=170667a&w=0&k=20&c=ZL25hKR74ZmYpOgrpHjAphEEJpwcOPuV1FSU0v-Gky8=",
    // },
    // {
    //   id: 6,
    //   name: "Card 4",
    //   url: "https://media.istockphoto.com/id/1164049513/photo/airplane-taking-off-from-the-airport.webp?b=1&s=170667a&w=0&k=20&c=ZL25hKR74ZmYpOgrpHjAphEEJpwcOPuV1FSU0v-Gky8=",
    // },
  ];

  const cardGap = 16;

  const cardWidth = (Dimensions.get("window").width - cardGap * 3) / 2;

  return (
    <SafeAreaView style={defaultStyles.container}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.header}>我的計畫</Text>
          <Text style={styles.subHeader}>{`追蹤並管理你的財務目標`}</Text>
        </View>
        <Octicons name="pencil" size={24} color="black" />
      </View>
      <View style={styles.lineStyle} />
      <ScrollView>
        <View
          // style={{
          //   flexDirection: "row",
          //   flexWrap: "wrap",
          //   justifyContent: "center",
          // }}
          style={styles.grid}
        >
          <Row>
            <Col numRows={2}>
              <RenderRow
                // item={[]}
                // text="ETF是什麼？怎麼買？認識台股最紅兩支ETF，被動投資學習"
                title="ETF是什麼？怎麼買？認識台股最紅兩支ETF，被動投資學習"
                postImg="https://media.istockphoto.com/id/1442529985/photo/business-partners-in-meeting.webp?b=1&s=170667a&w=0&k=20&c=jJOruR74VemjhH9_C3o4sbpVevuMB99zNTymWq6FUfc="
              />
            </Col>
            <Col numRows={2}>
              <RenderRow
                // item={[]}
                // text="ETF是什麼？怎麼買？認識台股最紅兩支ETF，被動投資學習"
                title="ETF是什麼？怎麼買？認識台股最紅兩支ETF，被動投資學習"
                postImg="https://media.istockphoto.com/id/1442529985/photo/business-partners-in-meeting.webp?b=1&s=170667a&w=0&k=20&c=jJOruR74VemjhH9_C3o4sbpVevuMB99zNTymWq6FUfc="
              />
            </Col>
          </Row>
          <Row>
            <Col numRows={2}>
              <RenderRow
                // item={[]}
                // text="ETF是什麼？怎麼買？認識台股最紅兩支ETF，被動投資學習"
                title="ETF是什麼？怎麼買？認識台股最紅兩支ETF，被動投資學習"
                postImg="https://media.istockphoto.com/id/1442529985/photo/business-partners-in-meeting.webp?b=1&s=170667a&w=0&k=20&c=jJOruR74VemjhH9_C3o4sbpVevuMB99zNTymWq6FUfc="
              />
            </Col>
            <Col numRows={2}>
              <RenderRow
                // item={[]}
                // text="ETF是什麼？怎麼買？認識台股最紅兩支ETF，被動投資學習"
                title="ETF是什麼？怎麼買？認識台股最紅兩支ETF，被動投資學習"
                postImg="https://media.istockphoto.com/id/1442529985/photo/business-partners-in-meeting.webp?b=1&s=170667a&w=0&k=20&c=jJOruR74VemjhH9_C3o4sbpVevuMB99zNTymWq6FUfc="
              />
            </Col>
          </Row>
          {subjects.map((subject, i) => {
            return (
              <></>
              // <View
              //   key={subject.id}
              //   style={{
              //     marginTop: cardGap,
              //     marginLeft: i % 2 !== 0 ? cardGap : 0,
              //     // width: cardWidth,
              //     height: cardWidth * 1.38,
              //     backgroundColor: "white",
              //     // backgroundColor: "red",
              //     borderRadius: 16,
              //     shadowOpacity: 0.1,
              //     justifyContent: "center",
              //     alignItems: "center",
              //   }}
              // >
              //   <TouchableOpacity>
              //     <View style={{ backgroundColor: "blue", width: cardWidth }}>
              //       <Animated.Image
              //         source={{
              //           uri: "https://media.istockphoto.com/id/1442529985/photo/business-partners-in-meeting.webp?b=1&s=170667a&w=0&k=20&c=jJOruR74VemjhH9_C3o4sbpVevuMB99zNTymWq6FUfc=",
              //         }}
              //         style={styles.image}
              //       />
              //     </View>
              //     <Text style={{ backgroundColor: "blue" }}>
              //       {subject.name}
              //     </Text>
              //   </TouchableOpacity>
              // </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  header: {
    fontFamily: "mon-b",
    fontSize: 24,
  },
  subHeader: {
    fontFamily: "mon-b",
    fontSize: 12,
    color: "#0D9E00",
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: "#D9D9D9",
    margin: 24,
  },
  listing: {
    padding: 16,
    gap: 10,
    marginVertical: 16,
  },
  image: {
    width: "100%",
    height: 150,
    // borderRadius: 10,
  },
  ////////////////////////////
  // lineStyle: {
  //   borderWidth: 0.5,
  //   borderColor: "#D9D9D9",
  //   marginHorizontal: 24,
  //   marginBottom: 16,
  // },
  avatarImage: {
    width: 40,
    height: 40,
    // borderColor: "red",
    // borderWidth: 2,
    borderRadius: 75,
  },
  grid: {
    flex: 4, // the number of columns you want to devide the screen into
    marginHorizontal: "auto",
    width: 400,
    // backgroundColor: "red",
  },
});

export default Page;
