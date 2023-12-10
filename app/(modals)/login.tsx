import Colors from "@/constants/Colors";
import { useOAuth } from "@clerk/clerk-expo";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";

// https://github.com/clerkinc/clerk-expo-starter/blob/main/components/OAuth.tsx
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { defaultStyles } from "@/constants/Styles";
import { Image } from "react-native";
import Animated, {
  FadeInDown,
  FadeInRight,
  FadeOutLeft,
  FadeOutUp,
  interpolate,
} from "react-native-reanimated";
import { useCallback, useState } from "react";
import { Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const STEPS = ["資產配置", "記帳（所得分配）", "理財學習", "開始計畫"];
const LANGUAGES = [
  "ようこそ ClimbFin",
  "Welcome ClimbFin",
  "歡迎使用 ClimbFin",
  "웰컴 ClimbFin",
];

enum Strategy {
  Google = "oauth_google",
  Apple = "oauth_apple",
  Facebook = "oauth_facebook",
}
const Page = () => {
  const SLIDER_WIDTH = Dimensions.get("window").width;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
  const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);

  const DATA = [];
  for (let i = 0; i < 10; i++) {
    DATA.push(i);
  }

  useWarmUpBrowser();

  const router = useRouter();
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: "oauth_facebook",
  });

  const onSelectAuth = async (strategy: Strategy) => {
    setIsShowingTutorial(true);
    return;
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
      [Strategy.Facebook]: facebookAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.back();
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  const [isChooseAuthOptions, setIsChooseAuthOptions] = useState(false);
  const [isShowingTutorial, setIsShowingTutorial] = useState(false);
  const PAGE_WIDTH = Dimensions.get("window").width;

  const animationStyle = useCallback((value: number) => {
    "worklet";

    const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30]);
    // console.log({ value });
    const translateX = interpolate(
      value,
      [-2, 0, 1],
      [-PAGE_WIDTH * 1.4, 0, PAGE_WIDTH * 1.4]
    );

    return {
      transform: [{ translateX }],
      zIndex,
    };
  }, []);
  const animationStyleTwo = useCallback((value: number) => {
    "worklet";

    const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30]);
    // console.log({ value });
    const translateX = interpolate(
      value,
      [-2, 0, 1],
      [-PAGE_WIDTH * 1.8, 0, PAGE_WIDTH * 1.8]
    );

    return {
      transform: [{ translateX }],
      zIndex,
    };
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);

  if (isChooseAuthOptions && !isShowingTutorial) {
    return (
      <Animated.View
        entering={FadeInDown}
        exiting={FadeOutUp}
        style={styles.containerTwo}
      >
        <View>
          <Animated.View
            style={{ display: "flex", alignItems: "center", gap: 10 }}
          >
            <Animated.View>
              <Image
                style={{ width: 250, height: 250 }}
                source={require("./White_Green_Simple_and_Professional_Business_Pitch_Deck_Presentation.png")}
              />
            </Animated.View>
          </Animated.View>

          <View style={{ gap: 20 }}>
            <TouchableOpacity
              style={styles.btnOutline}
              onPress={() => onSelectAuth(Strategy.Facebook)}
            >
              <Ionicons
                name="md-logo-facebook"
                size={24}
                style={defaultStyles.btnIcon}
              />
              <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnOutline}
              onPress={() => onSelectAuth(Strategy.Google)}
            >
              <Ionicons
                name="md-logo-google"
                size={24}
                style={defaultStyles.btnIcon}
              />
              <Text style={styles.btnOutlineText}>Continue with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnOutline}
              onPress={() => onSelectAuth(Strategy.Apple)}
            >
              <Ionicons
                name="md-logo-apple"
                size={24}
                style={defaultStyles.btnIcon}
              />
              <Text style={styles.btnOutlineText}>Continue with Apple</Text>
            </TouchableOpacity>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
              }}
            >
              <Text style={{ fontFamily: "mon-sb" }}>
                By continuing, you agree to our
              </Text>
              <Text style={{ fontFamily: "mon-b" }}>Terms of Service</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              <Text style={{ fontFamily: "mon-sb" }}>
                "Note for using ClimbFin"
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>
    );
  } else if (isShowingTutorial) {
    return (
      <Animated.View
        entering={FadeInRight}
        exiting={FadeOutLeft}
        style={styles.containerTwo}
      >
        <View style={styles.stepsFlexContainer}>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Text style={styles.welcomeText}>歡迎使用 ClimbFin</Text>
            <View>
              <Text style={styles.welcomeDesc}>
                {`The gateway to navigate your financial journey\n`}
              </Text>
              <Text style={styles.welcomeDesc}>
                {`Our mantra, "Climb to your financial summit!", resonates with our goal financial success!`}
              </Text>
            </View>

            <View>
              <Image
                style={{ width: 250, height: 250 }}
                source={require("./White_Green_Simple_and_Professional_Business_Pitch_Deck_Presentation.png")}
              />
            </View>

            <View>
              <Carousel
                loop={true}
                style={{ width: PAGE_WIDTH, height: 130 }}
                width={PAGE_WIDTH}
                data={[...new Array(4).keys()]}
                onScrollEnd={() => {
                  setActiveIndex(activeIndex + 1);
                }}
                renderItem={({ index }) => {
                  return (
                    <View
                      style={{
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: 20,
                          height: "100%",
                          padding: 40,
                          paddingHorizontal: 80,
                        }}
                      >
                        <View>
                          <Text style={styles.welcomeText}>{`Step ${
                            index + 1
                          }`}</Text>
                        </View>
                        <View>
                          <Text
                            style={styles.welcomeDesc}
                          >{`${STEPS[index]}`}</Text>
                        </View>
                      </View>
                    </View>
                  );
                }}
                customAnimation={animationStyle}
                scrollAnimationDuration={600}
              />
            </View>
            <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
              <Octicons
                name="dot-fill"
                size={24}
                color={activeIndex % 4 !== 0 ? "#DEDEDE" : "black"}
              />
              <Octicons
                name="dot-fill"
                size={24}
                color={activeIndex % 4 !== 1 ? "#DEDEDE" : "black"}
              />
              <Octicons
                name="dot-fill"
                size={24}
                color={activeIndex % 4 !== 2 ? "#DEDEDE" : "black"}
              />
              <Octicons
                name="dot-fill"
                size={24}
                color={activeIndex % 4 !== 3 ? "#DEDEDE" : "black"}
              />
            </View>
          </View>

          <View>
            <View style={{ gap: 20 }}>
              <TouchableOpacity
                style={styles.btnStPro}
                onPress={() => router.push("/")}
              >
                <Text
                  style={styles.btnOutlineTextMain}
                  // onPress={() => setIsChooseAuthOptions(true)}
                  // TODO: route to /new-project page to directly add a new expense
                >
                  {`開始計畫`}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>
    );
  } else {
    return (
      <Animated.View
        entering={FadeInDown}
        exiting={FadeOutLeft}
        style={styles.container}
      >
        <Animated.View
          style={{ display: "flex", alignItems: "center", gap: 10 }}
          entering={FadeInDown}
          // exiting={FadeOutUp}
        >
          <Animated.View entering={FadeInDown}>
            <Image
              style={{ width: 250, height: 250 }}
              source={require("./White_Green_Simple_and_Professional_Business_Pitch_Deck_Presentation.png")}
            />
          </Animated.View>
          <Animated.View entering={FadeInDown}>
            <Carousel
              loop={true}
              autoPlay={true}
              style={{ width: PAGE_WIDTH, height: 40 }}
              width={PAGE_WIDTH}
              // height={PAGE_WIDTH}
              data={[...new Array(4).keys()]}
              renderItem={({ index }) => {
                return (
                  // <CarouselItem
                  //   key={index}
                  //   index={index}
                  //   animationValue={animationValue}
                  // />
                  <View
                    style={{
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.welcomeText}>{LANGUAGES[index]}</Text>
                  </View>
                );
              }}
              customAnimation={animationStyleTwo}
              scrollAnimationDuration={1200}
            />
          </Animated.View>
          <View>
            <Text style={styles.welcomeDesc}>
              {`The gateway to navigate your financial journey\n`}
            </Text>
            <Text style={styles.welcomeDesc}>
              {`Our mantra, "Climb to your financial summit!", resonates with our goal financial success!`}
            </Text>
          </View>
        </Animated.View>
        <View style={{ gap: 20, marginTop: 40 }}>
          <TouchableOpacity style={styles.btnOutlineMain}>
            <Text
              style={styles.btnOutlineTextMain}
              onPress={() => setIsChooseAuthOptions(true)}
            >
              {`註冊 / 登入開啟自動同步`}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnOutline}
            onPress={() => setIsShowingTutorial(true)}
          >
            {/* <Ionicons
            name="mail-outline"
            size={24}
            style={defaultStyles.btnIcon}
          /> */}
            <Text style={styles.btnOutlineText}>不同步，直接開始</Text>
          </TouchableOpacity>
        </View>

        {/* <TextInput
        autoCapitalize="none"
        placeholder="Email"
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
      />

      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.seperatorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.seperator}>or</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>

      <View style={{ gap: 20 }}>
        <TouchableOpacity style={styles.btnOutline}>
          <Ionicons name="mail-outline" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Phone</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Apple)}>
          <Ionicons name="md-logo-apple" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Google)}>
          <Ionicons name="md-logo-google" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Facebook)}>
          <Ionicons name="md-logo-facebook" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View> */}
      </Animated.View>
    );
  }
};

export default Page;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#fff",
    padding: 26,
    paddingVertical: 50,
    justifyContent: "space-between",
    height: "100%",
  },
  containerTwo: {
    display: "flex",
    flex: 1,
    backgroundColor: "#fff",
    padding: 26,
    paddingVertical: 50,
    // justifyContent: "space-between",
  },

  seperatorView: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 30,
  },
  seperator: {
    fontFamily: "mon-sb",
    color: Colors.grey,
    fontSize: 16,
  },
  btnOutline: {
    backgroundColor: "#DEDEDE",
    // borderWidth: 1,
    // borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  btnOutlineMain: {
    backgroundColor: "#0D9E00",
    // borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    width: "100%",
  },
  btnStPro: {
    backgroundColor: "#0D9E00",
    // borderWidth: 1,
    // borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    width: "100%",
  },
  btnOutlineText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "mon-b",
  },
  btnOutlineTextMain: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "mon-b",
  },
  welcomeText: {
    fontFamily: "mon-b",
    fontSize: 24,
  },
  welcomeDesc: {
    // fontFamily: "mon-b",
    fontSize: 16,
    textAlign: "center",
  },
  stepsFlexContainer: {
    display: "flex",
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginVertical: 10,
    // backgroundColor: "red",
    height: "100%",
  },
});
