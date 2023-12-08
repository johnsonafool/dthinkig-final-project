import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { defaultStyles } from "@/constants/Styles";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";

const Page = () => {
  const { signOut, isSignedIn } = useAuth();
  // const { user } = useUser();
  const user = {
    firstName: "John",
    lastName: "Doe",
    // emailAddresses: [{ emailAddress: '
    // ' }],
    createdAt: new Date(),
    imageUrl: "https://avatars.githubusercontent.com/u/88415078?v=4",
    update: () => {},
    setProfileImage: () => {},
  };

  const eAddress = "foo@gmail.com";

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  // const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);
  const [email, setEmail] = useState(eAddress);
  const [edit, setEdit] = useState(false);

  // Load user data on mount
  useEffect(() => {
    if (!user) {
      return;
    }

    setFirstName(user.firstName);
    setLastName(user.lastName);
    // setEmail(user.emailAddresses[0].emailAddress);
    setEmail(eAddress);
  }, [user]);

  // Update Clerk user data
  const onSaveUser = async () => {
    // try {
    //   await user?.update({
    //     firstName: firstName!,
    //     lastName: lastName!,
    //   });
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setEdit(false);
    // }
  };

  // Capture image from camera roll
  // Upload to Clerk as avatar
  const onCaptureImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.75,
      base64: true,
    });

    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`;
      // user?.setProfileImage({
      //   file: base64,
      // });
    }
  };

  return (
    <SafeAreaView style={defaultStyles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>我的</Text>
          <Ionicons name="notifications-outline" size={26} />
        </View>
        {user && (
          <View style={styles.card}>
            <TouchableOpacity onPress={onCaptureImage}>
              <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
            </TouchableOpacity>
            <View style={{ flexDirection: "row", gap: 6 }}>
              {!edit && (
                <View style={styles.editRow}>
                  <Text style={{ fontFamily: "mon-b", fontSize: 22 }}>
                    {firstName}
                    {/* {lastName} */}
                  </Text>
                  {/* <TouchableOpacity onPress={() => setEdit(true)}>
                    <Ionicons
                      name="create-outline"
                      size={24}
                      color={Colors.dark}
                    />
                  </TouchableOpacity> */}
                </View>
              )}
              {edit && (
                <View style={styles.editRow}>
                  <TextInput
                    placeholder="First Name"
                    value={firstName || ""}
                    onChangeText={setFirstName}
                    style={[defaultStyles.inputField, { width: 100 }]}
                  />
                  <TextInput
                    placeholder="Last Name"
                    value={lastName || ""}
                    onChangeText={setLastName}
                    style={[defaultStyles.inputField, { width: 100 }]}
                  />
                  <TouchableOpacity onPress={onSaveUser}>
                    <Ionicons
                      name="checkmark-outline"
                      size={24}
                      color={Colors.dark}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            {/* <Text>{email}</Text>
          <Text>Since {user?.createdAt!.toLocaleDateString()}</Text> */}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 20,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  // borderWidth: 2,
                  borderRadius: 10,
                  padding: 10,
                  // backgroundColor: "#E3F0AC",
                }}
              >
                {/* <Text style={{ textAlign: "center" }}>記帳</Text> */}
                <AntDesign name="setting" size={24} color="black" />
                <Text style={{ textAlign: "center" }}>記帳</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  // borderWidth: 2,
                  borderRadius: 10,
                  padding: 10,
                  // borderColor: "#A7C32E",
                  // backgroundColor: "#E3F0AC",
                }}
              >
                <Feather name="bookmark" size={24} color="black" />
                <Text style={{ textAlign: "center" }}>收藏</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  // borderWidth: 2,
                  borderRadius: 10,
                  padding: 10,
                  // backgroundColor: "#E3F0AC",
                }}
              >
                <MaterialCommunityIcons
                  name="foot-print"
                  size={24}
                  color="black"
                />
                <Text style={{ textAlign: "center" }}>足跡</Text>
              </View>
            </View>
          </View>
        )}
        <View style={{ gap: 20, padding: 26 }}>
          {/* <TouchableOpacity
          style={styles.btnOutline}
          // onPress={() => onSelectAuth(Strategy.Apple)}
        >
          <Ionicons name="bookmark" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>帳號內容</Text>
        </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.functionBtn}
            // onPress={() => onSelectAuth(Strategy.Apple)}
          >
            {/* <Ionicons name="bookmark" size={24} style={defaultStyles.btnIcon} /> */}
            <Text style={styles.btnOutlineText}>帳號內容</Text>
            <AntDesign name="right" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.functionBtn}
            // onPress={() => onSelectAuth(Strategy.Apple)}
          >
            {/* <Ionicons name="bookmark" size={24} style={defaultStyles.btnIcon} /> */}
            <Text style={styles.btnOutlineText}>偏好設定</Text>
            <AntDesign name="right" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.functionBtn}
            // onPress={() => onSelectAuth(Strategy.Apple)}
          >
            {/* <Ionicons name="bookmark" size={24} style={defaultStyles.btnIcon} /> */}
            <Text style={styles.btnOutlineText}>進階功能</Text>
            <AntDesign name="right" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.functionBtn}
            // onPress={() => onSelectAuth(Strategy.Apple)}
          >
            {/* <Ionicons name="bookmark" size={24} style={defaultStyles.btnIcon} /> */}
            <Text style={styles.btnOutlineText}>資訊與支援</Text>
            <AntDesign name="right" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {!isSignedIn && (
          <Button
            title="Log Out"
            onPress={() => signOut()}
            color={Colors.dark}
          />
        )}
        {/* {!isSignedIn && (
        <Link href={"/(modals)/login"} asChild>
          <Button title="Log In" color={Colors.dark} />
        </Link>
      )} */}
      </ScrollView>
    </SafeAreaView>
  );
};

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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 24,
  },
  header: {
    fontFamily: "mon-b",
    fontSize: 24,
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
  btnOutlineText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "mon-b",
  },
  functionBtn: {
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    // borderWidth: 1,
    // borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
});

export default Page;
