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
import { FontAwesome, Octicons } from "@expo/vector-icons";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { Col, Row } from "../new";
import { cardWidth } from "@/components/Listings";
import ProgressBar from "@/components/ProgressBar";
import { useRouter } from "expo-router";

const RenderGrid = ({ avaImg, postImg, title }: any) => (
  // <Link href={`/listing/${item.id}`} asChild>
  <TouchableOpacity>
    <Animated.View
      style={styles.listing}
      entering={FadeInRight}
      exiting={FadeOutLeft}
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
            uri: postImg,
          }}
          style={styles.image}
        />
        {/* <TouchableOpacity
          style={{ position: "absolute", right: 30, top: 30 }}
        ></TouchableOpacity> */}
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
                fontSize: 20,
                fontFamily: "mon-sb",
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                fontFamily: "mon-sb",
                color: "#0D9E00",
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
            <ProgressBar />
            <Text style={{ fontFamily: "mon-b" }}>30%</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  </TouchableOpacity>
  // </Link>
);

const AddPlanGrid = ({ avaImg, postImg, title }: any) => {
  const router = useRouter();
  return (
    // <Link href={`/listing/${item.id}`} asChild>
    <TouchableOpacity>
      <Animated.View
        style={styles.listing}
        entering={FadeInRight}
        exiting={FadeOutLeft}
      >
        <View
          style={{
            display: "flex",
            gap: 10,
            borderColor: "#D9D9D9",
            borderWidth: 1,
            borderRadius: 10,
            width: cardWidth,
            backgroundColor: "#CEEAC5",
          }}
        >
          <Animated.Image
            source={{
              uri: postImg,
            }}
            style={styles.imageTwo}
          />
          <TouchableOpacity
            style={{ position: "absolute", right: 65, top: 90 }}
            onPress={() => router.push("/new/add-new")}
          >
            <FontAwesome name="plus" size={48} color="white" />
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
                  fontSize: 20,
                  fontFamily: "mon-sb",
                  color: "transparent",
                }}
              >
                {title}
              </Text>
              <Text
                style={{
                  fontFamily: "mon-sb",
                  color: "transparent",
                  // color: "#0D9E00",
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
              {/* <ProgressBar /> */}
              <Text style={{ fontFamily: "mon-b", color: "transparent" }}>
                30%
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
    // </Link>
  );
};

const InfoGrid = ({ avaImg, postImg, title }: any) => {
  const router = useRouter();
  return (
    // <Link href={`/listing/${item.id}`} asChild>
    <TouchableOpacity>
      <Animated.View
        style={styles.listing}
        entering={FadeInRight}
        exiting={FadeOutLeft}
      >
        <Text>134</Text>
      </Animated.View>
    </TouchableOpacity>
    // </Link>
  );
};

const Page = () => {
  const cardGap = 16;

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
        <View style={styles.grid}>
          <Row>
            <Col numRows={2}>
              <RenderGrid
                title="旅遊"
                postImg="https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D"
              />
            </Col>
            <Col numRows={2}>
              <RenderGrid
                title="教育"
                postImg="https://media.istockphoto.com/id/1431839160/photo/university-campus-and-young-japanese-student.webp?b=1&s=170667a&w=0&k=20&c=R6y034F0VX_S4A30SBV7yxn6ROaC_4Gy3xORHIQQv_A="
              />
            </Col>
          </Row>
          <Row>
            <Col numRows={2}>
              <RenderGrid
                title="整牙"
                postImg="https://media.istockphoto.com/id/1468244705/photo/close-up-of-dentist-using-dental-drill-while-working-with-patient-at-dental-clinic.webp?b=1&s=170667a&w=0&k=20&c=QzZBcv9jjQfFX5AGQVD4m8AHQeXrM7X9ysAq-989Bmw="
              />
            </Col>
            <Col numRows={2}>
              <AddPlanGrid
                title="AddNew"
                postImg="https://media.istockphoto.com/id/1442529985/photo/business-partners-in-meeting.webp?b=1&s=170667a&w=0&k=20&c=jJOruR74VemjhH9_C3o4sbpVevuMB99zNTymWq6FUfc="
              />
            </Col>
          </Row>

          <Row>
            <Col numRows={1}>
              <InfoGrid
                title="info"
                postImg="https://media.istockphoto.com/id/1468244705/photo/close-up-of-dentist-using-dental-drill-while-working-with-patient-at-dental-clinic.webp?b=1&s=170667a&w=0&k=20&c=QzZBcv9jjQfFX5AGQVD4m8AHQeXrM7X9ysAq-989Bmw="
              />
            </Col>
          </Row>
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
    // padding: 16,
    gap: 10,
    marginVertical: 8,
  },
  image: {
    width: "100%",
    height: 150,
  },
  imageTwo: {
    width: "100%",
    height: 150,
    opacity: 0,
  },

  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 75,
  },
  grid: {
    flex: 4,
    marginHorizontal: "auto",
    width: 400,
  },
});

export default Page;
