import {
  View,
  Switch,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ListRenderItem,
  Image,
} from "react-native";
import React, { useMemo, useRef, useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { Link } from "expo-router";

type RenderRowProps = {
  postImg?: string;
  avaImg?: string;
  title: string;
};

const categories = [
  {
    name: "熱門",
    icon: "home",
  },
  {
    name: "最新",
    icon: "house-siding",
  },
  {
    name: "儲蓄記帳",
    icon: "videogame-asset",
  },
  {
    name: "股票",
    icon: "apartment",
  },
  {
    name: "基金",
    icon: "beach-access",
  },
  {
    name: "ETF",
    icon: "beach-access",
  },
  {
    name: "保險",
    icon: "nature-people",
  },
];

const Page = () => {
  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const RenderRow = ({ avaImg, postImg, title }: RenderRowProps) => (
    <Link href={`/videos/`} asChild>
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
            }}
          >
            <Animated.Image
              source={{
                uri: postImg,
              }}
              style={styles.image}
            />
            <TouchableOpacity
              style={{ position: "absolute", right: 30, top: 30 }}
            ></TouchableOpacity>
            <View style={{ flexDirection: "row", display: "flex" }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 4,
                  padding: 10,
                }}
              >
                <Image
                  style={styles.avatarImage}
                  source={{
                    uri:
                      avaImg ??
                      "https://images.unsplash.com/photo-1609741199878-3e8ebdb1dbc7?q=80&w=3027&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  }}
                  resizeMode={"cover"}
                />
              </View>
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 300,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "mon-sb",
                  }}
                >
                  {title ??
                    `ETF是什麼？怎麼買？認識台股最紅兩支ETF，學習被動投資學習`}
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <SafeAreaView style={defaultStyles.container}>
      <View style={styles.headerContainer}>
        <View
          style={{
            display: "flex",
            gap: 10,
            flexDirection: "row",
            alignItems: "baseline",
          }}
        >
          <Text style={isEnabled ? styles.header : styles.headerArticles}>
            {isEnabled ? `文章` : `影片`}
          </Text>
          <Text style={{ color: "#000000", fontSize: 16, fontFamily: "mon-b" }}>
            {isEnabled ? `影片` : `文章`}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Switch
            trackColor={{ false: "#767577", true: "#A7C32E" }}
            thumbColor={isEnabled ? "#FFFFFF" : "#FFFFFF"}
            ios_backgroundColor="#0D9E00"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
      <View style={styles.lineStyle} />
      <View>
        <ScrollView
          horizontal
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            gap: 40,
            paddingHorizontal: 16,
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
              // onPress={() => selectCategory(index)}
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
      <View>
        <ScrollView>
          {!isEnabled ? (
            <>
              <RenderRow
                title="ETF是什麼？怎麼買？認識台股最紅兩支ETF，被動投資學習"
                postImg="https://media.istockphoto.com/id/1442529985/photo/business-partners-in-meeting.webp?b=1&s=170667a&w=0&k=20&c=jJOruR74VemjhH9_C3o4sbpVevuMB99zNTymWq6FUfc="
              />
              <RenderRow
                postImg="https://media.istockphoto.com/id/1255580364/photo/orange-colored-toy-house-sitting-over-coin-stacks-insurance-and-real-estate-concept.webp?b=1&s=170667a&w=0&k=20&c=-qjp_jA0OzVNe2TEIpz23nt4c6KtkMMKOwiX28S0vRg="
                title="連三月虧損！連三月虧損！勞動基金虧損753億收益率降至7.6%"
                avaImg="https://images.unsplash.com/photo-1565363410878-d7dd2e0d4e6f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZhbW91cyUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
              />
              <RenderRow
                postImg="https://media.istockphoto.com/id/877278518/photo/financial-and-technical-data-analysis-graph-showing-search-findings.webp?b=1&s=170667a&w=0&k=20&c=Iok7L36bJ6k9ZOuJbG0G2s0sJnS3rG_OO4dduZA_0s0="
                title="滿手日圓不如投資日股基金 績效前10強名單出爐"
              />
            </>
          ) : null}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 24,
  },
  header: {
    fontFamily: "mon-b",
    fontSize: 24,
    color: "#A7C32E",
  },
  headerArticles: {
    fontFamily: "mon-b",
    fontSize: 24,
    color: "#0D9E00",
  },
  card: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    marginHorizontal: 24,
    marginTop: 24,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    alignItems: "center",
    gap: 14,
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  editRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  container: {
    backgroundColor: "#fff",
    height: 130,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
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
    borderBottomColor: "#000",
    borderBottomWidth: 2,
    paddingBottom: 8,
  },
  listing: {
    padding: 16,
    gap: 10,
    marginVertical: 16,
  },
  image: {
    width: "100%",
    height: 150,
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: "#D9D9D9",
    marginHorizontal: 24,
    marginBottom: 16,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 75,
  },
});

export default Page;
