import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Platform,
  Text,
  FlatList,
  Alert,
} from 'react-native';
import {
  screenWidth,
  TouchableComponent,
  Loadingcomponent,
  Header2,
  screenHeight,
} from '../Utilities/Component/Helpers';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS, check, RESULTS} from 'react-native-permissions';
import {Colors} from '../Utilities/Component/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {strEncode} from '../Utilities/Component/encrptm';

// import RNFS from 'react-native-fs';

function SurveyList(props) {
  const [data, setData] = useState([]);

  const [lat, setLan] = useState('');
  const [lon, setLon] = useState('');
  const [loading, setLoading] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      getdata1();

      checkadd();
      return () => {};
    }, []),
  );
  const checkadd = () => {
    setTimeout(() => {
      if (Platform.OS === 'android') {
        check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)
          .then(result => {
            switch (result) {
              case RESULTS.UNAVAILABLE:
                request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION).then(
                  result => {
                    if (result === 'granted') {
                      getlocation();
                    } else {
                      getlocation();
                    }
                  },
                );
                break;
              case RESULTS.DENIED:
                request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION).then(
                  result => {
                    if (result === 'granted') {
                      getlocation();
                    } else {
                      getlocation();
                    }
                  },
                );
                break;
              case RESULTS.GRANTED:
                getlocation();
                break;
              case RESULTS.BLOCKED:
                request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION).then(
                  result => {
                    if (result === 'granted') {
                      getlocation();
                    } else {
                      getlocation();
                    }
                  },
                );
                break;
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
          .then(result => {
            switch (result) {
              case RESULTS.UNAVAILABLE:
                request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
                  if (result === 'granted') {
                    getlocation();
                  } else {
                    getlocation();
                  }
                });
                break;
              case RESULTS.DENIED:
                request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
                  if (result === 'granted') {
                    getlocation();
                  } else {
                    getlocation();
                  }
                });
                break;
              case RESULTS.GRANTED:
                getlocation();
                break;
              case RESULTS.BLOCKED:
                request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
                  if (result === 'granted') {
                    getlocation();
                  } else {
                    getlocation();
                  }
                });
                break;
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    }, 500);
  };
  const getlocation = () => {
    setTimeout(() => {
      Geolocation.getCurrentPosition(
        info => {
          console.log(info);
          var NY = {
            lat: info.coords.latitude,
            lng: info.coords.longitude,
          };
          if (NY?.lat) {
            setLan(NY?.lat);
            setLon(NY?.lng);
          }
        },
        error => {
          console.log('Error:', error.message);
        },
      );
    }, 500);
  };
  const getdata1 = async () => {
    let m = await AsyncStorage.getItem('mainform');
    let res = JSON.parse(m);
    console.log('hhhhh', res);
    setData(res);
  };

  return (
    <View style={{backgroundColor: Colors.backcolor, flex: 1}}>
      <SafeAreaView>
        {loading && <Loadingcomponent></Loadingcomponent>}
        <Header2
          title=" Data Forms"
          onPress={() => {
            props.navigation.goBack();
          }}
        />
        <View
          style={{
            width: screenWidth / 1.05,
            height: screenHeight / 1.32,
            backgroundColor: Colors.Background,
            alignSelf: 'center',
            borderRadius: 6,
            paddingTop: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',

              //  width: screenWidth /2,
              //  marginLeft:screenWidth/2.5,
            }}>
            <Text
              style={{
                color: Colors.red,
                fontWeight: '600',
                fontSize: 15,
                width: screenWidth / 1.8,
                marginLeft: 30,
              }}>
              Name
            </Text>
            <Text
              style={{
                color: Colors.red,
                fontWeight: '600',
                fontSize: 15,
              }}>
              Edit
            </Text>
            <Text
              style={{color: Colors.red, fontWeight: '500', marginRight: 30}}>
              Back
            </Text>
          </View>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <TouchableComponent
                onPress={() => {
                  props.navigation.navigate('MemberSurvey', {
                    name: item.c_form_name,
                    lat: String(lat),
                    lon: String(lon),
                  });
                }}
                style={{
                  backgroundColor: Colors.white,
                  width: screenWidth / 1.11,
                  height: 55,
                  borderRadius: 6,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 20,
                  shadowColor: Colors.black,
                  shadowOpacity: 0.1,
                  shadowOffset: {width: 0, height: 0},
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontWeight: '600',
                      fontSize: 15,
                      width: screenWidth / 1.8,
                    }}>
                    {item.c_form_name}
                  </Text>
                  <Text style={{color: Colors.black, fontWeight: '500'}}>
                    {item.c_enable_edit}
                  </Text>
                  <Text style={{color: Colors.black, fontWeight: '500'}}>
                    {item.c_enable_back}
                  </Text>
                </View>
              </TouchableComponent>
            )}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

export default SurveyList;
