import React, {Component, useState} from 'react';
import {
  View,
  SafeAreaView,
  Platform,
  LogBox,
  Text,
  BackHandler,
  Alert,
} from 'react-native';
import {
  CommonInput,
  AppText,
  TextBtncomponent,
  LogoCommon,
  screenWidth,
  TouchableComponent,
  ImageComponent,
  Loadingcomponent,
  screenHeight,
} from '../Utilities/Component/Helpers';
import styles from './style';
LogBox.ignoreAllLogs();

import RNFS from 'react-native-fs';
import VectorIcon from '../Utilities/Component/vectorIcons';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {Colors} from '../Utilities/Component/Colors';
import {strEncode} from '../Utilities/Component/encrptm';

const Listitem = ({onPress, title, name, gname, size}) => {
  return (
    <TouchableComponent
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignContent: 'center',
        borderBottomWidth: 1,
        alignItems: 'center',
        borderBottomColor: 'grey',
        width: screenWidth / 1.05,
        paddingVertical: 8,
      }}>
      <VectorIcon
        name={name}
        size={size}
        color={'#D2042D'}
        groupName={gname}
        style={{marginLeft: 15, marginRight: 8}}
      />
      <Text>{title}</Text>
    </TouchableComponent>
  );
};
function Surveys({navigation}) {
  const [swich, setSwich] = useState(0);
  const [logoutmodal, setLogoutmodal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [exptk, setExptk] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => {};
    }, []),
  );

  const fetchData = async () => {
    getdata();
    setLoading(true);
  };

  const handleBackPress = () => {
    if (navigation.isFocused()) {
      Alert.alert(
        'Exit App',
        'Do you want to exit?',
        [
          {
            text: 'No',
            onPress: () => {
              // console.log("Cancel Pressed")
            },
            style: 'cancel',
          },
          {text: 'Yes', onPress: () => BackHandler.exitApp()},
        ],
        {cancelable: false},
      );
      return true;
    } else {
      return false;
    }
  };
  const createJSONFile = async (fileName, jsonData, name) => {
    console.log('fileNamesss', jsonData.length, name);
    let fname = fileName;
    if (name) {
      fname = fileName + name;
    }
    try {
      const path = RNFS.DocumentDirectoryPath + `/${fname}.json`;
      await RNFS.writeFile(path, JSON.stringify(jsonData));
      console.log('JSON file created successfully!' + name);
    } catch (error) {
      console.log('Error creating JSON file:', error);
    }
  };
  const getdata = async () => {
    let tk = await AsyncStorage.getItem('token');
    let Id = await AsyncStorage.getItem('Id');
    setToken(tk);
    setLoading(true);
    console.log('tokennnn', tk);
    var myHeaders = new Headers();
    myHeaders.append('X-Access-Token', tk);
    var formdata = new FormData();
    let str = strEncode('view_user_wise_forms');
    let user = strEncode(`n_user=${Id}`);
    formdata.append('t', str);
    formdata.append('whrc', user);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch('https://3r4cace.pmis.app:1837/api/custom/selectall', requestOptions)
      .then(response => response.json())
      .then(async result => {
        console.log(result);
        if (result?.message === 'Unauthorized!') {
          Alert.alert('Your session has expired login again');
          navigation.navigate('SignIn');
          setLoading(false);
        }

        await AsyncStorage.setItem('mainform', JSON.stringify(result));
        console.log('done1');

        let aa = await AsyncStorage.getItem('Form');
        let bb = await AsyncStorage.getItem('Master');
        if (aa === null || bb === null) {
          for (let i = 0; i <= result.length - 1; i++) {
            getdata2(result[i].c_form_name, i, result.length);
          }
        } else {
          setLoading(false);
          setExptk(true);
        }
      })
      .catch(async error => {
        setExptk(true);
        setLoading(false);
        console.log('error', error);
      });
  };

  const getdata2 = async (name, i, len) => {
    let tk = await AsyncStorage.getItem('token');
    let id = await AsyncStorage.getItem('Id');
    setToken(tk);
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append('X-Access-Token', tk);
    let str = strEncode('view_user_wise_form_mst');
    console.log(name);
    console.log('formname', str);
    let user = strEncode(`n_user=${id} and c_form_name='${name}'`);
    console.log(user);
    var formdata = new FormData();
    formdata.append('t', str);
    formdata.append('whrc', user);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch('https://3r4cace.pmis.app:1837/api/custom/selectall', requestOptions)
      .then(response => response.json())
      .then(async result => {
        createJSONFile('NewForm', result, name);
        console.log('NewFormssss', name);
        await AsyncStorage.setItem('Form', 'saved');
        let arrayres = result.filter(n => n.c_type === 'select');
        if (arrayres.length !== 0) {
          getdata3(result, name, i, len);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log('error', error);
      });
  };

  const getdata3 = async (res, name, inde, len) => {
    setLoading(true);
    let tk = await AsyncStorage.getItem('token');
    let ngp = await AsyncStorage.getItem('n_gp');
    let key = 'n_gp=' + ngp;
    console.log(key);
    console.log('hhhhhh', strEncode(key));
    let newArray = [];
    let arrayres = res.filter(n => n.c_type === 'select');
    res.map(async (item, ind) => {
      if (item.c_type === 'select') {
        setLoading(true);
        var myHeaders = new Headers();
        myHeaders.append('X-Access-Token', tk);
        console.log(
          'youuusssdddd',
          item.c_display_name,
          item.c_select_option_table,
          strEncode(item.c_select_option_table),
        );
        var formdata = new FormData();
        formdata.append('t', strEncode(item.c_select_option_table));
        // formdata.append('whrc', strEncode(key));
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow',
        };

        fetch(
          'https://3r4cace.pmis.app:1837/api/custom/selectall',
          requestOptions,
        )
          .then(response => response.json())
          .then(async result => {
            // console.log(
            //   'youuusssdddd',
            //   item.c_select_option_table,
            //   strEncode(item.c_select_option_table),
            // );
            // console.log('indexxxx', ind);
            let array = {
              key: item.c_select_option_table,
              data: result,
            };
            newArray.push(array);
            setData3([...newArray]);

            console.log('done3', arrayres.length);
            console.log('done5', newArray.length + 'dnndn' + inde);
            console.log(item.c_display_name + 'fjjf');
            console.log(result);
            if (arrayres.length === newArray.length) {
              console.log('dkkd', inde);
              console.log('dkkd', len);
              setLoading(false);
              if (inde === len - 1) {
                setLoading(false);
              }

              createJSONFile('Master', newArray, name);
              newArray = [];

              await AsyncStorage.setItem('Master', 'saved');
            }
          })
          .catch(error => {
            Alert.alert('Data is not saved');
            setLoading(false);
            console.log('error', error);
          });
      }
    });
  };
  const [data3, setData3] = useState([]);
  return (
    <View style={{backgroundColor: Colors.backcolor, flex: 1}}>
      <SafeAreaView>
        {loading && (
          <>
            <Loadingcomponent></Loadingcomponent>
            <Text>
              Do not turn off the internet or close the app, data is loading
            </Text>
          </>
        )}
        <ImageComponent
          source={require('../Utilities/Images/logoo.png')}
          style={{
            width: screenWidth / 1.8,
            height: screenWidth / 2.8,
            alignSelf: 'center',
            marginBottom: 25,
            borderRadius: 15,
            marginTop: Platform.OS === 'android' ? 30 : 20,
          }}
        />
        <View
          style={{
            width: screenWidth / 1.05,
            height: screenHeight / 1.45,
            backgroundColor: Colors.Background,
            alignSelf: 'center',
            borderRadius: 6,
          }}>
          {/* <View style={styles.btnview}>
            <TouchableComponent
              onPress={() => {
                setSwich(0);
              }}
              style={{
                ...styles.btn,
                backgroundColor: swich === 0 ? Colors.mainColor : Colors.white,
              }}>
              <Text
                style={{
                  ...styles.btntxt,
                  color: swich === 0 ? Colors.white : Colors.black,
                }}>
                English
              </Text>
            </TouchableComponent>
            <TouchableComponent
              onPress={() => {
                setSwich(1);
              }}
              style={{
                ...styles.btn,
                backgroundColor: swich === 1 ? Colors.mainColor : Colors.white,
              }}>
              <Text
                style={{
                  ...styles.btntxt,
                  color: swich === 1 ? Colors.white : Colors.black,
                }}>
                Hindi
              </Text>
            </TouchableComponent>
          </View> */}
          <Text style={styles.title}> Please select menu option</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <TouchableComponent
              style={styles.startview}
              onPress={() => {
                navigation.navigate('IncompleteSurvey');
              }}>
              <ImageComponent
                source={require('../Utilities/Images/complete.png')}
                style={{width: 42, height: 47}}
              />
              <Text> Saved Data Forms</Text>
            </TouchableComponent>
          </View>
          <TouchableComponent
            onPress={() => {
              navigation.navigate('SurveyList');
            }}
            style={styles.startview}>
            <ImageComponent
              source={require('../Utilities/Images/start.png')}
              style={{width: 38, height: 50}}
            />
            <Text>Start a new Data Form</Text>
          </TouchableComponent>
          <TextBtncomponent
            title={'LOGOUT'}
            onPress={() => setLogoutmodal(true)}
          />
        </View>
        <Modal isVisible={logoutmodal}>
          <View style={styles.modal}>
            <Text style={styles.modaltxt1}>Come Back Soon !</Text>
            <Text style={styles.modaltxt2}>
              Are you sure you Want to Logout ?
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <TouchableComponent
                style={styles.modalbtn}
                onPress={() => {
                  setLogoutmodal(false);
                  navigation.navigate('SignIn');
                }}>
                <Text style={styles.modalbtntxt}>YES</Text>
              </TouchableComponent>
              <TouchableComponent
                style={styles.modalbtn}
                onPress={() => {
                  setLogoutmodal(false);
                }}>
                <Text style={styles.modalbtntxt}>NO</Text>
              </TouchableComponent>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
}

export default Surveys;
