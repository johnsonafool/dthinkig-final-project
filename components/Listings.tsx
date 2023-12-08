import {
  View,
  Text,
  StyleSheet,
  ListRenderItem,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { useEffect, useRef, useState } from "react";
// import {
//   BottomSheetFlatList,
//   BottomSheetFlatListMethods,
// } from "@gorhom/bottom-sheet";
// import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const cardGap = 16;

export const cardWidth = (Dimensions.get("window").width - cardGap * 3) / 2;

interface Props {
  listings: any[];
  refresh: number;
  category: string;
}

const Listings = ({ listings: items, refresh, category }: Props) => {
  const listRef = useRef<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const subjects = [
    { id: 1, name: "modal" },
    { id: 2, name: "Card 2" },
  ];

  // Update the view to scroll the list back top
  useEffect(() => {
    if (refresh) {
      scrollListTop();
    }
  }, [refresh]);

  const scrollListTop = () => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  // Use for "updating" the views data after category changed
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  // Render one listing row for the FlatList
  const RenderRow: any = ({ item }: { item: any }) => (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <Animated.View
          style={styles.listing}
          entering={FadeInRight}
          exiting={FadeOutLeft}
        >
          <ScrollView>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {subjects.map((subject, i) => {
                return (
                  <View
                    key={subject.id}
                    style={{
                      marginTop: cardGap,
                      marginLeft: i % 2 !== 0 ? cardGap : 0,
                      width: cardWidth,
                      height: 180,
                      backgroundColor: "white",
                      borderRadius: 16,
                      shadowOpacity: 0.1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity>
                      <Text>{subject.name}</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </ScrollView>
          <View style={styles.noRecord}>
            <MaterialCommunityIcons
              name="file-document-edit-outline"
              size={96}
              color="#DEDEDE"
            />
            <View>
              <Text style={styles.noRecordText}>No Record</Text>
              <Text style={styles.noRecordText}>
                Click + Icon to Add New Expense Record
              </Text>
            </View>

            {/* <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode as any}
              is24Hour={true}
              onChange={onChange}
            />
          </View>
          <View>
            <Text>date</Text> */}
          </View>

          {/* <Animated.Image source={{ uri: item.medium_url }} style={styles.image} />        <TouchableOpacity style={{ position: 'absolute', right: 30, top: 30 }}>
            <Ionicons name="heart-outline" size={24} color="#000" />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, fontFamily: 'mon-sb' }}>{item.name}</Text>
            <View style={{ flexDirection: 'row', gap: 4 }}>
              <Ionicons name="star" size={16} />
              <Text style={{ fontFamily: 'mon-sb' }}>{item.review_scores_rating / 20}</Text>
            </View>
          </View>
          <Text style={{ fontFamily: 'mon' }}>{item.room_type}</Text>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <Text style={{ fontFamily: 'mon-sb' }}>€ {item.price}</Text>
            <Text style={{ fontFamily: 'mon' }}>night</Text>
          </View> */}
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={defaultStyles.container}>
      <RenderRow item={items[0]} />
    </View>
  );
};

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 10,
    marginVertical: 16,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  info: {
    // textAlign: "center",
    fontFamily: "mon-sb",
    fontSize: 16,
    marginTop: 4,
  },
  advanced: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  noRecord: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  noRecordText: {
    textAlign: "center",
    fontFamily: "mon-sb",
    fontSize: 16,
    marginTop: 4,
    color: "#DEDEDE",
  },
});

export default Listings;
