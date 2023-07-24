import React, {Component, useState} from 'react';
import {
  View,
  SafeAreaView,
  Platform,
  LogBox,
  Text,
  FlatList,
  Alert,
} from 'react-native';
import {
  AppText,
  TextBtncomponent,
  Loadingcomponent,
  TouchableComponent,
  Header2,
} from '../Utilities/Component/Helpers';
import Modal from 'react-native-modal';
import styles from './style';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS, check, RESULTS} from 'react-native-permissions';
import {Colors} from '../Utilities/Component/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {DateInputBtn, Input} from '../Utilities/Component/Input';
import ImagePicker from 'react-native-image-crop-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {strEncode} from '../Utilities/Component/encrptm';
import moment from 'moment';
import RNFS from 'react-native-fs';
import {screenHeight, screenWidth} from '../Utilities/Component/Helpers';
import VectorIcon from '../Utilities/Component/vectorIcons';
const Modl = ({isVisible, onyespress, onnopress, Title}) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modal2}>
        {/* <Text style={styles.modaltxt1}>Are you Sure?</Text>
        <Text style={styles.modaltxt2}>
          You are trying to upload incomplete data file to server
        </Text> */}
        <Text style={styles.modaltxt2}>{Title}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <TouchableComponent style={styles.modalbtn} onPress={onyespress}>
            <Text style={styles.modalbtntxt}>Okay</Text>
          </TouchableComponent>
          <TouchableComponent style={styles.modalbtn} onPress={onnopress}>
            <Text style={styles.modalbtntxt}>Cancel</Text>
          </TouchableComponent>
        </View>
      </View>
    </Modal>
  );
};
function MemberSurvey({navigation, route}) {
  const date2 = moment(new Date()).format('YYYYMMDDhhmmss');
  const createJSONFile = async (fileName, jsonData) => {
    try {
      const path = RNFS.DocumentDirectoryPath + `/${fileName}.json`;
      await RNFS.writeFile(path, JSON.stringify(jsonData));
      console.log('JSON file created successfully!');
    } catch (error) {
      console.log('Error creating JSON file:', error);
    }
  };
  const [data, setData] = useState([]);
  const [selecthhid, setSelecthhid] = useState([]);
  const [subb, setsub] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data3, setData3] = useState([]);
  const [drop, setDrop] = useState([]);
  const [index, setIndex] = useState('');
  const [btn, setBtn] = useState();
  const [time, setTime] = useState();
  const [farray1, setfarray1] = useState([]);
  const [farray, setfarray] = useState([]);
  const [first, setFirst] = useState(false);
  const [label, setLabel] = useState('');
  const [lat, setLan] = useState('');
  const [lon, setLon] = useState('');
  const [modal, setModal] = useState(false);
  const [token, setToken] = useState('');
  const [subforms, setSubforms] = useState([]);
  const [isfiles, setIsfiles] = useState(false);
  const rbsheet = React.useRef();
  const flatListRef = React.useRef(null);
  useFocusEffect(
    React.useCallback(() => {
      if (route.params.times) {
        if (first === false) {
          setTime(Number(route.params.times));
          setFirst(true);
        }
      }
      getdata();
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
    }, 1000);
  };
  const getlocation = () => {
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
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  const checkFilesInDirectory = async directoryPath => {
    try {
      const files = await RNFS.readdir(RNFS.DocumentDirectoryPath);

      if (files.length === 2) {
        setIsfiles(false);
        console.log('No files found in the directory');
      } else {
        setIsfiles(true);
        console.log('Files found:', files);
      }
    } catch (error) {
      console.log('Error checking files in directory:', error);
    }
  };
  const readJSONFile = async name => {
    console.log(name);
    try {
      const path = RNFS.DocumentDirectoryPath + `/${name}.json`;
      const fileContent = await RNFS.readFile(path);
      const jsonData = JSON.parse(fileContent);
      return jsonData;
    } catch (error) {
      setLoading(false);
      console.log('Error reading JSON file:', error);
      return null;
    }
  };
  const getdata = async () => {
    setLoading(true);
    console.log(route.params.name);
    if (route?.params?.hhid) {
      let data = await AsyncStorage.getItem('hhid');

      if (data) {
        let pdata = JSON.parse(data);
        setSelecthhid([...route?.params?.hhid, ...pdata]);
      } else {
        setSelecthhid(route?.params?.hhid);
      }
    }
    let mdata = await AsyncStorage.getItem('Master');
    let data21 = await readJSONFile('NewForm' + route.params.name);
    var plaintext1 = await readJSONFile('Master' + route.params.name);

    if (mdata) {
      let datap = data21.map(e => ({
        ...e,
        state: false,
        vali: e?.validation,
        valmsg: '',
        edit: true,
      }));

      for (let i = 0; i <= datap.length; i++) {
        let vali = datap[i]?.validation;
        console.log(datap[i]?.c_field_name);

        if (datap[i]?.c_field_name === 'c_hh_family_id') {
          let num = Number(route.params.times);
          let num2 = num + 1;
          let time2 = time - 1;
          datap[i].c_dependent_target_field = time ? String(num2 - time2) : '1';
        }
        if (datap[i]?.c_field_name === 'c_hh_id') {
          datap[i].c_type = 'select';
        }

        if (datap[i]?.c_type === 'lat') {
          datap[i].c_dependent_target_field = String(lat);
        }
        if (datap[i]?.c_type === 'long') {
          datap[i].c_dependent_target_field = String(lon);
        }
        if (vali) {
          const date2 = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
          let valid = isValidJSON(vali) ? JSON.parse(vali) : '';
          if (valid?.event?.get_fill_color) {
            console.log('dkkddk', valid?.event?.get_fill_color);
            datap[i].color = valid?.event?.get_fill_color._fill_font._get_color;
            datap[i].back = valid?.event?.get_fill_color._fill_back._get_color;
          }
          if (valid?.validation?.no_user_input) {
            console.log('kkk', valid?.validation?.no_user_input);
            if (valid?.validation?.no_user_input?.disabled === 'true') {
              datap[i].edit = false;
            }
          }
          if (valid?.event) {
            if (valid?.event?.auto_fill_timestamp) {
              if (valid?.event?.auto_fill_timestamp?.datetimefill?._date) {
                console.log(
                  valid?.event?.auto_fill_timestamp?.datetimefill?._date,
                );
                datap[i].c_dependent_target_field = date2;
                let field =
                  valid?.event?.auto_fill_timestamp?.return_field?.value;
                datap[i][field] = date2;
              }
            }
            if (valid?.event?.auto_fill_randonno) {
              if (valid?.event?.auto_fill_randonno?.randonno?._random_number) {
                let number =
                  valid?.event?.auto_fill_randonno?.randonno?._random_number;
                let y = parseInt(number);
                const min = Math.pow(10, y - 1); // Minimum n-digit number
                const max = Math.pow(10, y) - 1; // Maximum n-digit number
                let x = Math.floor(Math.random() * (max - min + 1)) + min;

                datap[i].c_dependent_target_field = String(x);
                let field =
                  valid?.event?.auto_fill_randonno?.return_field?.value;
                datap[i][field] = String(x);
              }
              if (
                valid?.event?.auto_fill_randonno?.randonno?._random_alphanumber
              ) {
                let number =
                  valid?.event?.auto_fill_randonno?.randonno
                    ?._random_alphanumber;
                let y = parseInt(number);
                const alphanumericChars =
                  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let result = '';

                for (let i = 0; i < y; i++) {
                  const randomIndex = Math.floor(
                    Math.random() * alphanumericChars.length,
                  );
                  result += alphanumericChars.charAt(randomIndex);
                }

                datap[i].c_dependent_target_field = String(result);
                let field =
                  valid?.event?.auto_fill_randonno?.return_field?.value;
                datap[i][field] = String(result);
              }
            }
          }
        }
      }
      datap.sort(function (a, b) {
        return a.n_sequence - b.n_sequence;
      });

      setData(datap);
      setData3(plaintext1);
      setLoading(false);
    }

    let subform = await AsyncStorage.getItem('subform');
    if (subform) {
      let forms = JSON.parse(subform);
      setSubforms(forms);
    } else {
      setSubforms([]);
    }
    checkFilesInDirectory();
  };
  const getdata2 = async () => {
    setLoading(true);
    let tk = await AsyncStorage.getItem('token');
    setToken(tk);
    var myHeaders = new Headers();
    myHeaders.append('X-Access-Token', tk);

    var formdata = new FormData();
    formdata.append(
      't',
      ' VTFZVEpXV0U1WGFHbFdNbmh4VjBSS1lXUnRUblJOVjFwcFYwVTBkMWwzUFQxU2VnPT1SbmQ=WmVr',
    );
    formdata.append(
      'whrc',
      ' UkxZekZ3VjA5WVZscFdla1p6VTFWUmQxb3diM3BSYmxKb1YwVTFiVmxWWkc5bGJWSlpVMnBLWVZkSGVHMVpiR2hQVFVWd05WRnJTbFZoTVVadVdXMTNOV1Z0VWtoU2FrSnJWMFV4YmxWR1RrSmtNR3hHVDFaT1UxSldXbFJUVlZaTFYydHNTRTVYV21wTmJGbzBXa1prVjJSV2EzbFdWMlJhVFZRPWEzZA==WFZt',
    );

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch('https://3r4cace.pmis.app:1937/api/custom/selectall', requestOptions)
      .then(response => response.json())
      .then(async result => {
        let res = result.map(e => ({
          ...e,
          state: false,
        }));
        setData(res);
        createJSONFile('NewForm', result);
        await AsyncStorage.setItem('Form', 'saved');
        getdata3(result);
      })
      .catch(error => {
        console.log('erroryyyy', error);
      });
  };
  const getdata3 = async res => {
    let tk = await AsyncStorage.getItem('token');
    setToken(tk);
    setData(res);
    res.map(async (item, ind) => {
      if (item.c_type === 'select') {
        setLoading(true);
        var myHeaders = new Headers();
        myHeaders.append('X-Access-Token', tk);

        var formdata = new FormData();
        formdata.append('t', strEncode(item.c_select_option_table));

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow',
        };

        fetch(
          'https://3r4cace.pmis.app:1937/api/custom/selectall',
          requestOptions,
        )
          .then(response => response.json())
          .then(async result => {
            let array = {
              key: item.c_select_option_table,
              data: result,
            };
            data3.push(array);
            setData3([...data3]);
            console.log(data3);
            console.log('fkkff', data);

            await AsyncStorage.setItem('Master', 'saved');

            if (ind > 87) {
              setLoading(false);
              createJSONFile('Master', data3);
            }
          })
          .catch(error => {
            setLoading(false);
            console.log('error', error);
          });
      }
    });
  };
  function isValidJSON(jsonString) {
    try {
      JSON.parse(jsonString);
      return true;
    } catch (error) {
      return false;
    }
  }
  const onsave = async () => {
    let t;
    let nav;
    let h;
    for (let i = 0; i <= data.length - 1; i++) {
      if (data[i].edit === true) {
        if (data[i].validation) {
          let valis;
          if (isValidJSON(data[i].validation) === true) {
            valis = JSON.parse(data[i].validation);
          }
          console.log(data[i].validation);
          if (valis?.event?.store_data) {
            console.log(valis?.event?.store_data?.store_array);
            console.log(JSON.stringify(data[i].c_display_name));
            let index1 = data.findIndex(
              n =>
                n.c_field_name ===
                valis?.event?.store_data?.store_array?._field_1,
            );
            let index2 = data.findIndex(
              n =>
                n.c_field_name ===
                valis?.event?.store_data?.store_array?._field_2,
            );
            let index3 = data.findIndex(
              n =>
                n.c_field_name ===
                valis?.event?.store_data?.store_array?._field_3,
            );
            console.log(index1, index2, index3);
            let string1 =
              index1 > 0
                ? data[index1]?.c_dependent_target_field?.c_name
                  ? data[index1]?.c_dependent_target_field?.c_name +
                    valis?.event?.store_data?.store_array?._field_separator_1
                  : data[index1]?.c_dependent_target_field +
                    valis?.event?.store_data?.store_array?._field_separator_1
                : '';
            let string2 =
              index2 > 0 ? data[index2]?.c_dependent_target_field : '';

            h = [string1 + string2];

            console.log(h);
            setfarray1(h);
          }
          if (valis?.buttons) {
            let field = valis?.buttons?.add_buttons?.button_1?._run_times_field;
            console.log(field);
            let index = data.findIndex(n => n.c_field_name === field);
            console.log(index);

            console.log(JSON.stringify(data[i].c_display_name));
            setTime(data[index].c_dependent_target_field);
            t = data[index].c_dependent_target_field;
            nav = valis?.buttons?.add_buttons?.button_1?._open_form_multi_entry;
            setBtn(valis?.buttons?.add_buttons?.button_1);
          }

          // console.log(JSON.stringify(data[i].c_display_name));
          if (valis) {
            if (
              valis?.validation?.is_blank &&
              data[i].c_dependent_target_field === ''
            ) {
              data[i].valmsg = 'Please enter something';
            } else if (
              valis?.validation?._is_only_text &&
              data[i].c_dependent_target_field
            ) {
              var isTextNaN = isNaN(data[i].c_dependent_target_field);
              console.log('jjjjj', isTextNaN);
              if (isTextNaN === false) {
                data[i].valmsg = 'Please enter only text';
              } else {
                data[i].valmsg = '';
              }
            } else if (
              valis?.validation?.number_range &&
              data[i].c_dependent_target_field
            ) {
              let num =
                valis?.validation?.number_range?.validation_check
                  ?.validation_fields;
              let num2 = Number(data[i].c_dependent_target_field);

              if (num?.from) {
                if (num2 > Number(num?.from) && num2 < Number(num?.upto)) {
                  data[i].valmsg = '';
                } else {
                  data[i].valmsg =
                    'Number range should be from ' +
                    num.from +
                    ' to ' +
                    num.upto;
                }
              }
            } else if (
              valis?.validation?.if_valid_value &&
              data[i].c_dependent_target_field
            ) {
              console.log('jjjj', valis?.validation?.if_valid_value);
              let fieldName =
                valis?.validation?.if_valid_value?.validation_check
                  ?.ifValidField?.check_1?.check_field;
              let fieldType =
                valis?.validation?.if_valid_value?.validation_check
                  ?.ifValidField?.check_1?.check_value;
              console.log('filedName', fieldType);
              let index = data.findIndex(n => n.c_field_name === fieldName);
              console.log('filedName1', data[index].c_dependent_target_field);
              if (data[index].c_dependent_target_field?.c_name !== fieldType) {
                data[index].valmsg = 'Select ' + fieldType;
              } else {
                data[index].valmsg = '';
              }
            } else {
              data[i].valmsg = '';
            }
          }
        }
      }
    }

    setData([...data]);
    let data2 = data.map(n => n.valmsg);
    console.log(data2);
    let state = data2.every(n => n === '');

    if (state) {
      let su = subb;
      su.push(data);
      setsub(su);
      let newarray = [];
      let array = {
        data: route.params.main,
        date: date2,
        sub: su,
      };

      let date = {
        date: date2 + ' ' + route.params.name,
      };
      newarray.push(date);
      let arrays = subforms.concat(newarray);
      setSubforms(arrays);

      if (time) {
        if (time !== 1) {
          setTime(time - 1);
          getdata();
          setfarray([...farray, ...h]);
          let num = Number(route.params.times) + 1 - time;
          if (flatListRef.current) {
            flatListRef.current.scrollToOffset({offset: 0});
          }
          Alert.alert(`Saved form for family member ${num}`);
        } else {
          await AsyncStorage.setItem('subform', JSON.stringify(arrays));
          await AsyncStorage.setItem('hhid', JSON.stringify(selecthhid));
          createJSONFile(date.date, array);
          navigation.navigate('Surveys');
        }
      } else {
        await AsyncStorage.setItem('subform', JSON.stringify(arrays));

        createJSONFile(date.date, array);
        navigation.navigate('Surveys');
      }
    } else {
      setModal(true);
    }
  };
  const uploadimage = index => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
      mediaType: 'photo',
    }).then(image => {
      console.log(image.filename);
      data[index].image = image.filename;
      setData([...data]);
    });
  };
  const RenderItem = ({item, index}) => {
    if (item.c_type === 'date') {
      return (
        <DateInputBtn
          title1={item.n_sequence}
          title2={item.c_display_name}
          drop={item.state}
          onPress={() => {
            data[index].state = true;

            setData([...data]);
          }}
          onCancel={() => {
            data[index].state = !data[index].state;
            setData([...data]);
          }}
          onConfirm={date => {
            var newdate = moment(date).format('YYYY-MM-DD');
            let parseData = JSON.parse(data[index].vali);
            if (parseData?.event?.get_year_from_date) {
              console.log(
                'dkdk',
                parseData?.event?.get_year_from_date?.return_field?.value,
              );
              let field =
                parseData?.event?.get_year_from_date?.return_field?.value;
              let inde = data.findIndex(n => n.c_field_name === field);
              var now = moment();
              var dateOfBirth = moment(date).format('YYYY-MM-DD');
              var birthDate = moment(dateOfBirth);

              var age = now.diff(birthDate, 'years');
              console.log(age);
              data[inde].c_dependent_target_field = String(age);
            }

            data[index].c_dependent_target_field = newdate;
            setData([...data]);
            data[index].state = !data[index].state;
            setData([...data]);
          }}
          text={
            item.c_dependent_target_field !== ''
              ? item.c_dependent_target_field
              : 'Select Date'
          }
          color={
            item.c_dependent_target_field !== '' ? Colors.black : Colors.plhdr
          }
          vali={item.vali}
          valmsg={item.edit ? item?.valmsg : ''}
        />
      );
    } else if (
      item.c_type === 'text' ||
      item.c_type === 'lat' ||
      item.c_type === 'long'
    ) {
      return (
        <Input
          title1={item.n_sequence}
          title2={item.c_display_name}
          placeholder={'Enter Text here ...'}
          onChangeText={txt => {
            data[index].c_dependent_target_field = txt;
            let parseData = JSON.parse(data[index].vali);
            if (parseData?.event) {
              console.log('dkdk', parseData?.event);
            }
            setData([...data]);
          }}
          editable={item?.edit}
          value={item.c_dependent_target_field}
          valmsg={item.edit ? item?.valmsg : ''}
          vali={item.vali}
        />
      );
    } else if (item.c_type === 'select') {
      return (
        <>
          <View style={{marginBottom: 14}}>
            <Text
              style={{
                ...styles.titleinput2,
                color: item.edit ? 'blue' : 'grey',
              }}>
              {item.c_display_name}
            </Text>
            <TouchableComponent
              style={styles.textinput2}
              onPress={() => {
                if (item?.edit === true) {
                  if (item.c_field_name === 'c_hh_id') {
                    let data = selecthhid.map(n => ({
                      c_name: n,
                    }));
                    setLabel('c_name');
                    setDrop(data);
                  } else if (
                    item.c_field_name === 'n_father' ||
                    item.c_field_name === 'n_mother' ||
                    item.c_field_name === 'n_spouse'
                  ) {
                    let data = farray.map(n => ({
                      c_name: n,
                    }));
                    setLabel('c_name');
                    setDrop(data);
                  } else {
                    let label = 'c_name';
                    console.log(data);
                    let title1 = item.n_sequence;
                    let data2 = data3?.find(
                      n => n.key === item.c_select_option_table,
                    )?.data;

                    label = item.c_select_option_col_name;

                    setLabel(label);
                    setDrop(data2);
                  }
                  setIndex(index);
                  rbsheet.current.open();
                }
              }}>
              <AppText
                style={{
                  width: screenWidth / 1.26,
                  color: item.c_dependent_target_field.c_name
                    ? Colors.black
                    : Colors.plhdr,
                  left: 10,
                }}>
                {item.c_dependent_target_field.c_name
                  ? item.c_dependent_target_field.c_name
                  : 'Select...'}
              </AppText>
              {item.c_dependent_target_field.c_name ? (
                <TouchableComponent
                  onPress={() => {
                    data[index].c_dependent_target_field = '';
                    setData([...data]);
                  }}>
                  <VectorIcon
                    name={'close'}
                    size={20}
                    color={Colors.black}
                    groupName={'AntDesign'}
                  />
                </TouchableComponent>
              ) : (
                <VectorIcon
                  name={'down'}
                  size={20}
                  color={item.edit ? 'black' : 'grey'}
                  groupName={'AntDesign'}
                />
              )}
            </TouchableComponent>
            {item?.edit === true && item?.valmsg && (
              <AppText style={{color: 'red', marginLeft: 20}}>
                {item.valmsg}
              </AppText>
            )}
          </View>
        </>
      );
    } else if (item.c_type === 'img') {
      return (
        <>
          <View style={{marginBottom: 14}}>
            <Text style={styles.titleinput2}>{item.c_display_name}</Text>
            <TouchableComponent
              style={styles.textinput2}
              onPress={() => {
                uploadimage(index);
                setIndex(index);
              }}>
              <AppText
                style={{
                  width: screenWidth / 1.26,
                  color: item.c_dependent_target_field
                    ? Colors.black
                    : Colors.plhdr,
                  left: 10,
                }}>
                {item?.image ? item?.image : 'Upload'}
              </AppText>
            </TouchableComponent>
            {item?.valmsg && (
              <AppText style={{color: 'red', marginLeft: 20}}>
                {item.valmsg}
              </AppText>
            )}
          </View>
        </>
      );
    } else if (item.c_type === 'number') {
      return (
        <Input
          title1={item.n_sequence}
          title2={item.c_display_name}
          keyboardType={'numeric'}
          placeholder={'Enter Text here ...'}
          onChangeText={txt => {
            data[index].c_dependent_target_field = txt;

            setData([...data]);
          }}
          editable={item?.edit}
          value={item.c_dependent_target_field}
          valmsg={item.edit ? item?.valmsg : ''}
          vali={item.vali}
        />
      );
    } else if (item.c_type === 'label') {
      return (
        <View
          style={{
            justifyContent: 'center',
            margin: 10,

            backgroundColor: item.back,
            borderRadius: 5,
          }}>
          <Text
            numberOfLines={65}
            style={{
              fontSize: 14,
              padding: 10,
              color: item.color,
            }}>
            {item.c_display_name}
          </Text>
        </View>
      );
    }
  };

  return (
    <View style={{backgroundColor: Colors.backcolor, flex: 1}}>
      <SafeAreaView>
        {loading && <Loadingcomponent></Loadingcomponent>}
        <KeyboardAwareScrollView>
          <Header2
            title="Survey Form"
            onPress={() => {
              navigation.goBack();
            }}
          />
          <AppText style={{color: 'white', marginLeft: 15}}>
            {route.params.name}
            {'   '}Family Member -{' '}
            {String(Number(route.params.times) - (time - 1))}/
            {route.params.times}
          </AppText>
          <View
            style={{
              width: screenWidth / 1.05,
              height: screenHeight / 1.34,
              backgroundColor: Colors.Background,
              alignSelf: 'center',
              borderRadius: 6,
              paddingTop: 20,
            }}>
            {data.length !== 0 && data3.length !== 0 ? (
              <FlatList ref={flatListRef} data={data} renderItem={RenderItem} />
            ) : null}

            <TextBtncomponent
              title={btn ? btn?._burron_name_1 : 'SAVE'}
              onPress={() => onsave()}
            />
          </View>
        </KeyboardAwareScrollView>
        <RBSheet
          ref={rbsheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={screenHeight / 2}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              // backgroundColor: Colors.black,
              backgroundColor: Colors.white,
            },
            container: {
              // backgroundColor: '#87CEFA',
              backgroundColor: Colors.backcolor,
            },
          }}>
          <FlatList
            data={drop}
            renderItem={({item}) => (
              <TouchableComponent
                style={styles.dropdown}
                onPress={() => {
                  item.c_name = item[label];
                  data[index].c_dependent_target_field = item;
                  console.log(data[index].c_dependent_target_field);
                  if (data[index].c_field_name === 'n_member_migrated') {
                    let parseData = JSON.parse(data[index].vali);
                    console.log(parseData.event.disable_if.disable_fields);
                    let field =
                      parseData?.event?.disable_if?.disable_check?._field_1;
                    let fieldn =
                      parseData?.event?.disable_if?.disable_check
                        ?._field_grater_then;
                    let i = data.findIndex(n => n.c_field_name === field);
                    let field2 = data[i].c_dependent_target_field;

                    if (field2 > Number(fieldn)) {
                      let darray = parseData.event.disable_if.disable_fields;
                      for (let j = 0; j <= darray.length - 1; j++) {
                        let ji = data.findIndex(
                          n => n.c_field_name === darray[j]._field_name,
                        );
                        data[ji].edit = false;
                        data[ji].valmsg = '';
                      }
                    } else {
                      let darray = parseData.event.disable_if.disable_fields;
                      for (let j = 0; j <= darray.length - 1; j++) {
                        let ji = data.findIndex(
                          n => n.c_field_name === darray[j]._field_name,
                        );
                        data[ji].edit = true;
                      }
                    }
                  } else {
                    let parseData = JSON.parse(data[index].vali);

                    if (parseData?.event?.disable_if?.disable_check) {
                      let field =
                        parseData?.event?.disable_if?.disable_check?._field_1;
                      let fieldn =
                        parseData?.event?.disable_if?.disable_check
                          ?._field_equal_to;
                      let i = data.findIndex(n => n.c_field_name === field);
                      let field2 = data[i].c_dependent_target_field.c_name;
                      console.log(field2);
                      console.log(fieldn);
                      if (field2 === fieldn) {
                        let darray =
                          parseData?.event?.disable_if?.disable_fields;
                        for (let j = 0; j <= darray.length - 1; j++) {
                          let ji = data.findIndex(
                            n => n.c_field_name === darray[j]._field_name,
                          );
                          data[ji].edit = false;
                          data[ji].valmsg = '';
                        }
                        console.log(true);
                      }
                    }
                    if (parseData?.event?.enable_if?.enable_check) {
                      let field =
                        parseData?.event?.enable_if?.enable_check?._field_1;
                      let fieldn =
                        parseData?.event?.enable_if?.enable_check
                          ?._field_equal_to;
                      let i = data.findIndex(n => n.c_field_name === field);
                      let field2 = data[i]?.c_dependent_target_field?.c_name;
                      if (field2 === fieldn) {
                        let darray = parseData?.event?.enable_if?.enable_fields;
                        for (let j = 0; j <= darray.length - 1; j++) {
                          let ji = data.findIndex(
                            n => n.c_field_name === darray[j]._field_name,
                          );
                          data[ji].edit = true;
                        }
                        console.log(true);
                      }
                    }
                  }
                  let parseData = JSON.parse(data[index].vali);
                  if (parseData?.event?.multi_enable_disable) {
                    let schearray = parseData?.event?.multi_enable_disable;
                    for (let s = 0; s <= schearray.length - 1; s++) {
                      let field = schearray[s];
                      let fieldName = field[0]?.field_name;
                      let fieldn = field[0]?.equal_to;
                      let i = data.findIndex(n => n.c_field_name === fieldName);

                      let field2 = data[i]?.c_dependent_target_field?.c_name;

                      if (fieldn === field2) {
                        let darray = field[0]?.enable_fields;
                        let earray = field[0]?.disable_fields;
                        for (let j = 0; j <= darray.length - 1; j++) {
                          let ji = data.findIndex(
                            n =>
                              n.c_select_option_table === darray[j]._field_name,
                          );
                          data[ji].edit = true;
                        }
                        for (let e = 0; e <= earray.length - 1; e++) {
                          let ef = data.findIndex(
                            n =>
                              n.c_select_option_table === earray[e]._field_name,
                          );

                          data[ef].edit = false;
                        }
                      }
                    }
                  }
                  setData([...data]);
                  rbsheet.current.close();
                }}>
                <AppText
                  style={{
                    color: Colors.black,
                    fontWeight: '600',
                    fontSize: 15,
                  }}>
                  {item[label]}
                </AppText>
              </TouchableComponent>
            )}
          />
        </RBSheet>
        <Modl
          isVisible={modal}
          onyespress={async () => {
            setModal(false);
            // let newarray = [];
            // let array = {
            //   data: data,
            //   date: date2,
            // };
            // let date = {
            //   date: date2,
            // };
            // newarray.push(date);
            // let arrays = subforms.concat(newarray);
            // setSubforms(arrays);

            // if (time) {
            //   if (time !== 1) {
            //     setTime(time - 1);
            //     let num = Number(route.params.times) + 1 - time;
            //     Alert.alert(`Saved form for family member ${num}`);
            //     getdata();
            //     setfarray([...farray, ...farray1]);
            //   } else {
            //     navigation.navigate('Surveys');
            //     await AsyncStorage.setItem('subform', JSON.stringify(arrays));
            //     await AsyncStorage.setItem('hhid', JSON.stringify(selecthhid));
            //     createJSONFile(date.date, array);
            //   }
            // } else {
            //   navigation.navigate('Surveys');
            //   await AsyncStorage.setItem('subform', JSON.stringify(arrays));
            //   createJSONFile(date.date, array);
            // }
          }}
          onnopress={() => {
            setModal(false);
          }}
          Title={'Please add all the mandatory details'}
        />
      </SafeAreaView>
    </View>
  );
}

export default MemberSurvey;
