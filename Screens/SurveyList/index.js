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
      console.log('hhhhhhss  ', strEncode('view_user_wise_forms'));
      console.log('hhhhhhuser  ', strEncode('n_user=3'));
      console.log(strEncode('view_user_wise_form_mst'));
      console.log(
        'hhhhhhuser2  ',
        strEncode("n_user=3 and c_form_name='House Hold Survey'"),
      );
      console.log(
        'hhhhhhuser2dd  ',
        strEncode("n_user=3 and c_form_name='HH Survey Family Members'"),
      );
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
    setData(res);
  };

  return (
    <View style={{backgroundColor: Colors.backcolor, flex: 1}}>
      <SafeAreaView>
        {loading && <Loadingcomponent></Loadingcomponent>}
        <Header2
          title="Survey List"
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
                    }}>
                    {item.c_form_name}
                  </Text>
                  <Text style={{color: Colors.black, fontWeight: '500'}}>
                    {item.length}
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
