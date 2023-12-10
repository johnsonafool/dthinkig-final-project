import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Share,
} from "react-native";
import listingsData from "@/assets/data/airbnb-listings.json";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { defaultStyles } from "@/constants/Styles";

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 300;

const DetailsPage = () => {
  //   const { id } = useLocalSearchParams();
  const id = "1563562";
  const listing = (listingsData as any[]).find((item) => item.id === id);
  const navigation = useNavigation();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const shareListing = async () => {
    try {
      await Share.share({
        title: listing.name,
        url: listing.listing_url,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerTransparent: true,

      headerBackground: () => (
        <Animated.View
          style={[headerAnimatedStyle, styles.header]}
        ></Animated.View>
      ),
      headerRight: () => (
        <View style={styles.bar}>
          <TouchableOpacity style={styles.roundButton} onPress={shareListing}>
            <Ionicons name="share-outline" size={22} color={"#fff"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundButton}>
            <Ionicons name="heart-outline" size={22} color={"#fff"} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={styles.roundButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={"#fff"} />
          <View
            style={{
              position: "absolute",
              backgroundColor: "#0D9E00",
              borderRadius: 100,
              top: 190,
              left: 5,
              display: "flex",
              flexDirection: "row",
              height: 40,
              padding: 8,
              alignContent: "center",
              justifyContent: "space-between",
              gap: 8,
              width: 140,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                // gap: 4,
                // padding: 10,
              }}
            >
              {/* <Text style={{ fontFamily: "mon-b", color: "white" }}>124</Text> */}
              <Image
                style={styles.avatarImage}
                source={{
                  uri: "https://images.unsplash.com/photo-1609741199878-3e8ebdb1dbc7?q=80&w=3027&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                }}
                resizeMode={"cover"}
              />
            </View>
            <View
              style={{
                height: "100%",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "mon-b",
                  color: "white",
                }}
              >
                Kevin Smith
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ),
    });
  }, []);

  const scrollOffset = useScrollViewOffset(scrollRef);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    };
  }, []);

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        ref={scrollRef}
        scrollEventThrottle={16}
      >
        <Animated.Image
          //   source={{ uri: listing?.xl_picture_url }}
          source={{
            uri: "https://media.istockphoto.com/id/1442529985/photo/business-partners-in-meeting.webp?b=1&s=170667a&w=0&k=20&c=jJOruR74VemjhH9_C3o4sbpVevuMB99zNTymWq6FUfc=",
          }}
          style={[styles.image, imageAnimatedStyle]}
          resizeMode="cover"
        ></Animated.Image>

        <View style={styles.infoContainer}>
          <Text style={styles.rooms}>15 May 2020｜8:00 pm</Text>
          <Text
            style={styles.name}
          >{`ETF是什麼？怎麼買？認識台股最紅兩支ETF，學習被動投資學習`}</Text>
          {/* <Text style={styles.location}>
            {listing.room_type} in {listing.smart_location}
          </Text>
          <Text style={styles.rooms}>
            {listing.guests_included} guests · {listing.bedrooms} bedrooms ·{" "}
            {listing.beds} bed · {listing.bathrooms} bathrooms
          </Text>
          <View style={{ flexDirection: "row", gap: 4 }}>
            <Ionicons name="star" size={16} />
            <Text style={styles.ratings}>
              {listing.review_scores_rating / 20} · {listing.number_of_reviews}{" "}
              reviews
            </Text>
          </View> */}
          {/* <View style={styles.divider} /> */}

          {/* <View style={styles.hostView}>
            <Image
              source={{ uri: listing.host_picture_url }}
              style={styles.host}
            />

            <View>
              <Text style={{ fontWeight: "500", fontSize: 16 }}>
                Hosted by {listing.host_name}
              </Text>
              <Text>Host since {listing.host_since}</Text>
            </View>
          </View> */}

          <View style={styles.divider} />

          <Text
            style={styles.description}
          >{`比起傳統共同基金由基金經理人或團隊主動選擇要投資的股票，以創造比市場更好的表現為目標，ETF 是跟著追蹤指數的漲跌、隨市場波動，屬於被動投資。

ETF有個優點是，透過分散投資一籃子股票，創造穩定但風險不高的長短期收入，相當適合財務獨立計畫。 《跟著柴鼠學FQ，做自己的提款機》以便當比喻，一般股票就像菜色完全自選的自助餐便當，而一般基金像是組合好的經典台鐵便當，菜色不能更換。而 ETF 則是兩者折衷的「指定型便當」。

指定型便當沒有固定菜色，便當裝什麼菜會依照設定的條件更動，假設條件是「前 5 名熱門菜色」「蛋奶素」「不要海鮮」，那便當菜色就會拿餐廳每季的前 5 名熱銷菜色，再剔除掉海鮮、非蛋奶素的菜，最後`}</Text>
        </View>
      </Animated.ScrollView>

      {/* <Animated.View
        style={defaultStyles.footer}
        entering={SlideInDown.delay(200)}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={styles.footerText}>
            <Text style={styles.footerPrice}>€{listing.price}</Text>
            <Text>night</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 20 }]}
          >
            <Text style={defaultStyles.btnText}>Reserve</Text>
          </TouchableOpacity>
        </View>
      </Animated.View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    height: IMG_HEIGHT,
    width: width,
  },
  infoContainer: {
    padding: 24,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "mon-sb",
  },
  location: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: "mon-sb",
  },
  rooms: {
    fontSize: 16,
    // color: Colors.grey,
    color: "#0D9E00",
    marginVertical: 4,
    fontFamily: "mon",
  },
  ratings: {
    fontSize: 16,
    fontFamily: "mon-sb",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.grey,
    marginVertical: 16,
  },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  hostView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  footerText: {
    height: "100%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerPrice: {
    fontSize: 18,
    fontFamily: "mon-sb",
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "#0D9E00",
    alignItems: "center",
    justifyContent: "center",
    // color: Colors.primary,
    color: Colors.primary,
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  header: {
    backgroundColor: "#fff",
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: "mon",
  },
  avatarImage: {
    width: 25,
    height: 25,
    borderRadius: 75,
  },
});

export default DetailsPage;
