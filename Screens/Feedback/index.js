import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Platform,
  Text,
  BackHandler,
  Image,
} from 'react-native';
import {
  CommonInput,
  AppText,
  TextBtncomponent,
  Loadingcomponent,
  ImageComponent,
  screenWidth,
  screenHeight,
  TouchableComponent,
} from '../Utilities/Component/Helpers';
import styles from './style';
import Modal from 'react-native-modal';
import {useFocusEffect} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS, check, RESULTS} from 'react-native-permissions';
import ImagePicker from 'react-native-image-crop-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors} from '../Utilities/Component/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DateInputBtn, Input} from '../Utilities/Component/Input';
import moment from 'moment';
const Modl = ({isVisible, onyespress, onnopress, Title, yes, no}) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modal2}>
        <Text style={styles.modaltxt2}>{Title}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <TouchableComponent style={styles.modalbtn} onPress={onyespress}>
            <Text style={styles.modalbtntxt}>{yes}</Text>
          </TouchableComponent>
          <TouchableComponent style={styles.modalbtn} onPress={onnopress}>
            <Text style={styles.modalbtntxt}>{no}</Text>
          </TouchableComponent>
        </View>
      </View>
    </Modal>
  );
};
function SignIn(props) {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [feed, setFeed] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [imp, setImp] = useState('');
  const [image, setImage] = useState('');
  const [pass, setPass] = useState('');
  const [state, setState] = useState(false);
  const [date, setdate] = useState('');
  const [showpass, setShowpass] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const validation = () => {
    let error = {};
    if (name === '') {
      error.name = 'Name Is Required';
    }
    if (feed === '') {
      error.feed = 'Feedback is Required';
    }
    if (imp === '') {
      error.imp = 'Improvements Is Required';
    }
    if (Object.keys(error).length === 0) {
      submit();
    }
    return error;
  };

  const OnSubmit = () => {
    setError(validation());
  };
  useFocusEffect(
    React.useCallback(() => {
      checkadd();
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => {};
    }, []),
  );
  const handleBackPress = () => {
    setModal(true);
  };
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
            setLat(String(NY?.lat));
            setLong(String(NY?.lng));
          }
        },
        error => {
          console.log('Error:', error.message);
        },
      );
    }, 500);
  };
  const submit = () => {
    setLoading(true);
    var formdata = new FormData();
    formdata.append('c_name', name);
    formdata.append('c_feedback', feed);
    formdata.append('d_date', date);
    formdata.append('c_improvement_points', imp);
    formdata.append('n_lat', lat);
    formdata.append('n_long', long);
    if (image) {
      formdata.append('c_docfiles', {
        uri: image.path,
        type: image.mime,
        name: image.modificationDate + '.' + image.mime.split('/')[1],
      });
    }
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };
    console.log(formdata);
    fetch(
      'https://3r4cace.pmis.app:1837/api/community_feedback/add',
      requestOptions,
    )
      .then(response => response.json())
      .then(async result => {
        setLoading(false);
        setName('');
        setFeed('');
        setImp('');
        setImage('');
        alert(JSON.stringify(result));
      })
      .catch(async error => {
        setLoading(false);
        if (error.toString().includes('Network request failed') === true) {
          alert('Network request failed');
        }
        console.log('error', error);
      });
  };
  const uploadimage = index => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: false,
      mediaType: 'photo',
    }).then(image => {
      setImage(image);
    });
  };
  return (
    <View style={{backgroundColor: Colors.backcolor, flex: 1}}>
      <SafeAreaView>
        {loading ? <Loadingcomponent /> : null}
        <View>
          <KeyboardAwareScrollView>
            <ImageComponent
              source={require('../Utilities/Images/logoo.png')}
              style={{
                width: screenWidth / 1.8,
                height: screenWidth / 2.8,
                alignSelf: 'center',
                resizeMode: 'contain',
                marginBottom: 25,
                borderRadius: 15,
                marginTop: Platform.OS === 'android' ? 30 : 20,
              }}
            />
            <View
              style={{
                width: screenWidth / 1.05,
                // height: screenHeight / 1.28,
                backgroundColor: Colors.Background,
                alignSelf: 'center',
                borderRadius: 6,
                paddingTop: 10,
                marginBottom: 30,
              }}>
              <AppText style={styles.btntxt}>Project Form</AppText>
              <View style={styles.sub}>
                <DateInputBtn
                  title2={'Date'}
                  edit={true}
                  drop={state}
                  onPress={() => {
                    setState(true);
                  }}
                  onCancel={() => {
                    setState(false);
                  }}
                  onConfirm={date => {
                    var newdate = moment(date).format('YYYY-MM-DD');
                    setdate(newdate);
                    setState(false);
                  }}
                  text={date !== '' ? date : 'Select Date'}
                  color={'black'}
                />
                <Input
                  title2="Name"
                  editable={true}
                  onChangeText={text => {
                    setName(text);
                  }}
                  valmsg={error?.name}
                  value={name}
                  placeholder={'Enter Name'}
                />
                <Input
                  title2="Project Information"
                  editable={true}
                  onChangeText={text => {
                    setImp(text);
                  }}
                  valmsg={error?.imp}
                  value={imp}
                  placeholder={'Enter Project Information'}
                />
                <Input
                  title2="Feedback"
                  editable={true}
                  onChangeText={text => {
                    setFeed(text);
                  }}
                  valmsg={error?.feed}
                  value={feed}
                  placeholder={'Enter Feedback'}
                />

                <View style={{marginBottom: 14}}>
                  <Text
                    style={{
                      ...styles.titleinput2,
                    }}>
                    Upload Image
                  </Text>
                  {!image?.path ? (
                    <TouchableComponent
                      style={styles.textinput2}
                      onPress={() => {
                        uploadimage();
                      }}>
                      <AppText
                        style={{
                          width: screenWidth / 1.26,
                          color: Colors.black,

                          left: 10,
                        }}>
                        {image ? image?.path : 'Upload'}
                      </AppText>
                    </TouchableComponent>
                  ) : (
                    <Image
                      style={{
                        width: screenWidth / 1.5,
                        height: 200,
                        borderRadius: 5,
                        borderWidth: 1,
                        resizeMode: 'stretch',
                      }}
                      source={{uri: image?.path}}></Image>
                  )}
                </View>
                <Input
                  title2="Latitude"
                  editable={false}
                  onChangeText={text => {
                    setLat(text);
                  }}
                  value={lat}
                  placeholder={'Latitude'}
                />
                <Input
                  title2="Longitude"
                  editable={false}
                  onChangeText={text => {
                    setLong(text);
                  }}
                  value={long}
                  placeholder={'Longitude'}
                />
              </View>
              <TextBtncomponent
                title={'SAVE'}
                onPress={() => {
                  OnSubmit();
                }}></TextBtncomponent>
            </View>
          </KeyboardAwareScrollView>
        </View>
        <Modl
          isVisible={modal}
          yes="Yes"
          no="No"
          onyespress={async () => {
            setModal(false);
            props.navigation.goBack();
          }}
          onnopress={() => {
            setModal(false);
          }}
          Title={
            'Are you sure you want to leave this page, data will be lost if you will leave this page'
          }
        />
      </SafeAreaView>
    </View>
  );
}

export default SignIn;
