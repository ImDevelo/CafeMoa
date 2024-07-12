import React, { useRef, useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, KeyboardAvoidingView, StyleSheet } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";

const HomeScreen = ({ navigation, route }) => {
  const [userData, setUserData] = useState("");
  const [reserveCafeInfo, setReserveCafeInfo] = useState();
  const [bookMarkList, setBookMarkList] = useState();
  const [isBookMark, setIsBookMark] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadHomePage();
    });
    return unsubscribe;
  }, [navigation, userData]);

  const loadHomePage = async () => {
    // 세션 데이터 기반으로 사용자 정보 및 북마크 데이터 설정
    if (userData) {
      setReserveCafeInfo(dummyReservationData);
      setBookMarkList(dummyBookmarkData);
    }
  };

  const dummyReservationData = {
    cafeId: 'dummy-cafe-id',
    cafeName: 'Dummy Cafe',
    cafeLocation: '123 Dummy Street',
    rating: 4.5,
    logo: 'https://example.com/dummy-logo.png',
  };

  const dummyBookmarkData = [
    {
      id: 'bookmark-1',
      name: 'Cafe One',
      address: 'Address One',
      rating: 4.7,
      logo: 'https://example.com/logo1.png',
    },
    {
      id: 'bookmark-2',
      name: 'Cafe Two',
      address: 'Address Two',
      rating: 4.3,
      logo: 'https://example.com/logo2.png',
    },
  ];

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.topView}>
        <View style={styles.topTitle}>
          <Text style={styles.titleText}>M O A</Text>
        </View>
      </View>
      <View style={styles.mainView}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ReservationView cafeData={reserveCafeInfo} navigation={navigation} />
          <View style={styles.bookmarkArea}>
            <View style={styles.bookmarkTitleContainer}>
              <Text style={styles.areaTitle}>My 모아</Text>
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {dummyBookmarkData.map((cafe) => (
                <BookMarkPanel key={cafe.id} cafeData={cafe} navigation={navigation} />
              ))}
              {!isBookMark && (
                <Text style={styles.noBookmarkText}></Text>
              )}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const ReservationView = ({ cafeData, navigation }) => {
  if (!cafeData) {
    return null;
  }

  return (
    <View style={styles.reserveArea}>
      <View style={styles.reserveAreaTop}>
        <Text style={styles.areaTitle}>현재 예약 내역</Text>
      </View>
      <View style={styles.reserveAreaContent}>
        <View style={styles.reserveCafeContainer}>
          <CafeTable cafeData={cafeData} navigation={navigation} />
        </View>
        <View style={styles.reserveBtnContainer}>
          <TouchableOpacity
            style={styles.reserveBtn}
            onPress={() =>
              navigation.navigate('ConfirmReservation', { cafeData })
            }
          >
            <Text style={styles.reserveBtnText}>예약 내역 확인</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.reserveBtn}
            onPress={() =>
              navigation.navigate('카페 정보', { cafeData })
            }
          >
            <Text style={styles.reserveBtnText}>카페 정보</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const BookMarkPanel = ({ cafeData, navigation }) => (
  <TouchableOpacity
    style={styles.bookmarkContainer}
    onPress={() => navigation.navigate('카페 정보', { cafeData })}
  >
    <View style={styles.bookmarkImageArea}>
      <Image
        resizeMode="contain"
        source={{ uri: cafeData.logo }}
        style={styles.bookmarkImage}
      />
    </View>
    <View style={styles.bookmarkTextArea}>
      <View style={styles.bookmarkTextAreaTop}>
        <Text style={styles.cafeName}>{cafeData.name}</Text>
        <Text style={styles.rating}>
          <Ionicons name="star" style={styles.starIcon} /> {cafeData.rating}
        </Text>
      </View>
      <View style={styles.cafeLocationContainer}>
        <Text style={styles.cafeLocation}>{cafeData.address}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topView: {
    flex: 1,
    backgroundColor: '#fdfdfd',
    borderBottomColor: '#dddddd',
    borderBottomWidth: 3,
  },
  topTitle: {
    flex: 4,
    backgroundColor: '#fdfdfd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: '#001D44',
    fontWeight: '900',
    fontSize: 60,
  },
  mainView: {
    flex: 3,
    backgroundColor: '#ffffff',
  },
  reserveArea: {
    marginTop: 25,
    height: 260,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 30,
  },
  reserveAreaTop: {
    height: 50,
  },
  reserveAreaContent: {
    flex: 1,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  reserveCafeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  reserveBtnContainer: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
  },
  reserveBtn: {
    width: '45%',
    height: '95%',
    marginBottom: '3%',
    backgroundColor: '#001D44',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reserveBtnText: {
    color: '#fff',
    fontSize: 18,
  },
  bookmarkArea: {
    marginTop: 10,
    height: 270,
    width: '100%',
    backgroundColor: '#fff',
  },
  bookmarkTitleContainer: {
    height: 50,
    flexDirection: 'row',
  },
  areaTitle: {
    fontSize: 23,
    fontWeight: '600',
    paddingLeft: 15,
    paddingBottom: 10,
  },
  bookmarkContainer: {
    height: 210,
    width: 160,
    marginHorizontal: 4,
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 5,
  },
  bookmarkImageArea: {
    flex: 7,
    margin: '5%',
    borderRadius: 10,
  },
  bookmarkImage: {
    width: '100%',
    height: '100%',
  },
  bookmarkTextArea: {
    flex: 3,
    paddingHorizontal: '5%',
  },
  bookmarkTextAreaTop: {
    flex: 1,
    flexDirection: 'row',
  },
  cafeName: {
    flex: 2,
    paddingLeft: '4%',
    fontSize: 17,
    fontWeight: '700',
  },
  rating: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    color: 'gold',
  },
  cafeLocationContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cafeLocation: {
    paddingLeft: '3%',
    color: '#aaa',
    fontSize: 12,
  },
  noBookmarkText: {
    alignSelf: 'center',
    fontSize: 20,
    paddingLeft: 20,
  },
});

export default HomeScreen;
