import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TouchableHighlight,
  Alert,
} from "react-native";

import getInfoStyle from "../../styles/screens/InfoStyle";
import getCafeTableStyle from "../../styles/components/CafeTableStyle";
import getFindStyle from "../../styles/components/FindStyle";
import getBusinessInfoStyle from "../../styles/screens/BusinessInfoStyle";
import getPicManageStyle from "../../styles/screens/PicManageStyle";

import Ionicons from "react-native-vector-icons/Ionicons";
import { ReviewService } from "../../lib/ReviewService";

// Array that bring cafe's image
const imgArr = [
  require("../../img/coffeebayLogo_test.jpg"),
  require("../../img/coffeebayLogo_test.jpg"),
  require("../../img/coffeebayLogo_test.jpg"),
  require("../../img/coffeebayLogo_test.jpg"),
  require("../../img/coffeebayLogo_test.jpg"),
  require("../../img/coffeebayLogo_test.jpg"),
];

function CafePicManageScreen({ navigation, route }) {
  // const { cafeData: cafe_Data, userData: user_data } = route.params;
  // const [cafeData, setCafeData] = useState(cafe_Data);
  // const [userData, setUserData] = useState(user_data);
  const [direction, setDirection] = useState("사진");
  // const [seatImage, setSeatImage] = useState(cafe_Data.getSeatImage());

  // useEffect(()=>{
  //   //리뷰 및 사진 불러오기
  //   //

  // },[])

  // const loadreview = () => {
  //   let Review = ReviewService(cafeData.id);

  // }

  const longPressButton = () =>
    Alert.alert("경고", "사진이 삭제됩니다.", [
      {
        text: "취소",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "확인", onPress: () => console.log("OK Pressed") },
    ]);

  return (
    <>
      <View style={getInfoStyle.container}>
        <View style={getFindStyle.container}>
          <View style={getFindStyle.contentContainer}>
            <CafeTable
              name={"--카페 이름--"}
              location={"--카페 위치--"}
              image={require("../../img/coffeebayLogo_test.jpg")}
              information={"--카페 정보--"}
              // cafeData={cafeData}
              navigation={navigation}
            />
          </View>
        </View>

        <View style={{ flex: 4.5 }}>
          <PreviewLayout
            selectedValue={direction}
            values={["사진", "좌석"]}
            setSelectedValue={setDirection}
            style={getInfoStyle.contentLayout}
            // cafeData={cafeData}
          >
            <FlatList
              keyExtractor={(item) => item.idx}
              data={imgArr}
              style={getInfoStyle.picArea}
              renderItem={({ item }) => (
                <TouchableHighlight
                  onPress={() =>
                    navigation.navigate("사진 확대", {
                      // source: "../../img/coffeebayLogo_test.jpg",
                    })
                  }
                  onLongPress={longPressButton}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "column",
                    }}
                  >
                    <Image style={getInfoStyle.image} source={{}} />
                  </View>
                </TouchableHighlight>
              )}
              numColumns={3}
            />
          </PreviewLayout>
        </View>

        <View style={getInfoStyle.btnContainer}>
          <TouchableOpacity
            style={getInfoStyle.reserveButton}
            onPress={() =>
              navigation.navigate("Auth", {
                // cafeData: cafeData,
                // userData: userData,
              })
            }
          >
            <Text style={{ color: "white", fontSize: 21 }}>사진 추가하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

//카페 테이블
function CafeTable(props) {
  // const cafeData = props.cafeData;
  const [cafeName, setCafeName] = useState(props.name);
  const [cafeLocation, setCafeLocation] = useState(props.location);
  const [cafeInformation, setCafeInformaion] = useState(props.information);
  const [cafeLogoImage, setCafeLogoImage] = useState(props.image);

  return (
    <>
      <View style={getCafeTableStyle.container}>
        <View style={getCafeTableStyle.imageContainer}>
          <View style={getCafeTableStyle.image}>
            <Image source={cafeLogoImage} style={getInfoStyle.cafeLogo} />
          </View>
        </View>
        <View style={getCafeTableStyle.contentContainer}>
          <View style={getCafeTableStyle.textContent}>
            <Text style={getCafeTableStyle.nameText}>{cafeName}</Text>
            <Text style={getCafeTableStyle.contentText}>{cafeLocation}</Text>
            <Text style={getCafeTableStyle.contentText}>{cafeInformation}</Text>
          </View>
          <View style={getCafeTableStyle.logoPickerContainer}>
            <TouchableOpacity style={getCafeTableStyle.LogoImagePicker}>
              <Text style={{ color: "white", fontSize: 18 }}>
                로고 변경하기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

const PreviewLayout = ({
  children,
  values,
  selectedValue,
  setSelectedValue,
  // cafeData,
}) => (
  <View style={{ paddingHorizontal: 10, flex: 1 }}>
    <Text style={{ marginBottom: 10, fontSize: 24 }}></Text>
    <View style={getInfoStyle.row}>
      {values.map((value) => (
        <TouchableOpacity
          key={value}
          onPress={() => setSelectedValue(value)}
          style={[
            getPicManageStyle.button,
            selectedValue === value && getInfoStyle.selected,
          ]}
        >
          <Text
            style={[
              getInfoStyle.buttonLabel,
              selectedValue === value && getInfoStyle.selectedLabel,
            ]}
          >
            {value}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
    {(() => {
      if (selectedValue === "사진")
        return <View style={getInfoStyle.container}>{children}</View>;
      else
        return (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Image
              source={require("../../img/anySeatPic_text.png")}
              style={getInfoStyle.seatPic}
            />
          </View>
        );
    })()}
  </View>
);

export default CafePicManageScreen;
