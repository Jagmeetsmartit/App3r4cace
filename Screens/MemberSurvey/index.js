import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  BackHandler,
  FlatList,
  Alert,
  Image,
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
  const [gp, setGp] = useState('');
  const [enabled, setEnabled] = useState('false');
  const [loading, setLoading] = useState(false);
  const [data3, setData3] = useState([]);
  const [drop, setDrop] = useState([]);
  const [name, setName] = useState('');
  const [index, setIndex] = useState('');
  const [hhid, setHhid] = useState('');
  const [btn, setBtn] = useState();
  const [time, setTime] = useState('');
  const [label, setLabel] = useState('');
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [token, setToken] = useState('');
  const [subforms, setSubforms] = useState([]);
  const [isfiles, setIsfiles] = useState(false);
  const rbsheet = React.useRef();
  useFocusEffect(
    React.useCallback(() => {
      getdata();
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => {};
    }, []),
  );
  const handleBackPress = () => {
    setModal1(true);
  };
  const checkFilesInDirectory = async directoryPath => {
    try {
      const files = await RNFS.readdir(RNFS.DocumentDirectoryPath);

      if (files.length === 4) {
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
      return [];
    }
  };
  const getdata = async () => {
    setLoading(true);
    console.log(route.params.name);
    let mdata = await AsyncStorage.getItem('Master');
    let gp = await AsyncStorage.getItem('n_gp');
    setGp(gp);

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
        if (datap[i]?.c_type === 'lat') {
          datap[i].c_dependent_target_field = route?.params?.lat;
        }
        if (datap[i]?.c_type === 'long') {
          datap[i].c_dependent_target_field = route?.params?.lon;
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

      // Convert the sorted array back to JSON string

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
    let m = await AsyncStorage.getItem('mainform');
    let res = JSON.parse(m);
    let name = route.params.name;
    let enabled = res.find(n => n.c_form_name === name)?.c_enable_back;
    console.log('enabled', enabled);
    setEnabled(enabled);
  };
  const getdata1 = async () => {
    let tk = await AsyncStorage.getItem('token');
    let Id = await AsyncStorage.getItem('Id');
    setToken(tk);
    setLoading(true);
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

        for (let i = 0; i <= result.length - 1; i++) {
          getdata2(result[i].c_form_name, i, result.length);
        }
      })
      .catch(async error => {
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
    let user = strEncode(`n_user=${id} and c_form_name='${name}'`);
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
        createJSONFile1('NewForm', result, name);
        await AsyncStorage.setItem('Form', 'saved');
        getdata3(result, name, i, len);
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
              if (inde === len - 1) {
                setLoading(false);
              }

              createJSONFile1('Master', newArray, name);
              newArray = [];

              await AsyncStorage.setItem('Master', 'saved');
              getdata();
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
  const createJSONFile1 = async (fileName, jsonData, name) => {
    console.log('fileName', jsonData.length);
    let fname = fileName;
    if (name) {
      fname = fileName + name;
    }
    try {
      const path = RNFS.DocumentDirectoryPath + `/${fname}.json`;
      await RNFS.writeFile(path, JSON.stringify(jsonData));
      console.log('JSON file created successfully!');
    } catch (error) {
      console.log('Error creating JSON file:', error);
    }
  };
  function isValidJSON(jsonString) {
    try {
      JSON.parse(jsonString);
      return true;
    } catch (error) {
      return false;
    }
  }
  function containsOnlyCharacters(str) {
    return /^[A-Za-z]+$/.test(str);
  }
  function isNumberString(str) {
    return /^[0-9]+$/.test(str);
  }
  const onsave = async () => {
    let t;
    let nav;
    let h = [];
    let harray = '';
    let consent = true;
    for (let i = 0; i <= data.length - 1; i++) {
      if (data[i].edit === true) {
        if (data[i]?.c_type === 'lat') {
          data[i].c_dependent_target_field = String(route.params.lat);
        }
        if (data[i]?.c_type === 'long') {
          data[i].c_dependent_target_field = String(route.params.lon);
        }
        if (data[i].validation) {
          let valis;
          if (isValidJSON(data[i].validation) === true) {
            valis = JSON.parse(data[i].validation);
          }
          console.log('numberssss', valis?.validation);
          if (valis?.buttons) {
            let field = valis?.buttons?.add_buttons?.button_1?._run_times_field;

            let index = data.findIndex(n => n.c_field_name === field);

            setTime(data[index].c_dependent_target_field);
            t = data[index].c_dependent_target_field;
            nav = valis?.buttons?.add_buttons?.button_1?._open_form_multi_entry;
            // alert(nav)
            setBtn(valis?.buttons?.add_buttons?.button_1);
          }

          if (valis?.event?.data_event) {
            console.log('consenr', valis?.event?.data_event);
            console.log(data[i]?.c_dependent_target_field?.c_name);
            if (valis?.event?.data_event?.stop_entry_if?.n_consent_data) {
              if (
                valis?.event?.data_event?.stop_entry_if?.n_consent_data ===
                data[i]?.c_dependent_target_field?.c_name
              ) {
                consent = false;
              }
            }
          }

          if (valis?.event?.store_data) {
            harray = valis?.event?.store_data?.store_name?._save_name;
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
              index2 > 0
                ? data[index2]?.c_dependent_target_field +
                  valis?.event?.store_data?.store_array?._field_separator_2
                : '';
            let string3 =
              index3 > 0 ? data[index3]?.c_dependent_target_field : '';
            h = [string1 + string2 + string3];
            setHhid(h);
            console.log(h);
          }

          if (valis) {
            if (
              valis?.validation?.is_blank &&
              data[i].c_dependent_target_field === '' &&
              data[i].edit === true
            ) {
              data[i].valmsg = 'Please enter something';
            } else if (
              valis?.validation?._is_only_text &&
              data[i].c_dependent_target_field
            ) {
              let character = data[i].c_dependent_target_field.replace(
                /\s/g,
                '',
              );
              var isTextNaN = containsOnlyCharacters(character);

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
              console.log('number', num);
              let nnum = data[i].c_dependent_target_field;
              let isnum = isNumberString(nnum);
              if (isnum) {
                let num2 = Number(nnum);

                if (num?.from) {
                  if (num2 >= Number(num?.from) && num2 <= Number(num?.upto)) {
                    data[i].valmsg = '';
                  } else {
                    data[i].valmsg =
                      'Number range should be from ' +
                      num.from +
                      ' to ' +
                      num.upto;
                  }
                }
              } else {
                data[i].valmsg = 'Please enter only numbers';
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
    console.log(state);
    console.log(consent);

    if (consent === true) {
      if (state) {
        let newarray = [];
        let array = {
          data: data,
          date: date2,
        };
        let date = {
          date: date2 + ' ' + route.params.name,
        };
        newarray.push(date);
        let arrays = subforms.concat(newarray);
        setSubforms(arrays);

        if (nav) {
          let index1 = data.findIndex(n => n.c_field_name === 'c_hh_id');
          let arrayh = [data[index1].c_dependent_target_field];
          navigation.navigate('Multiform', {
            name: nav,
            times: t,
            main: data,
            hhid: h,
            arrayname: harray,
          });
        } else {
          await AsyncStorage.setItem('subform', JSON.stringify(arrays));
          createJSONFile(date.date, array);
          navigation.navigate('Surveys');
        }
      } else {
        setModal(true);
      }
    } else {
      let newarray = [];
      let array = {
        data: data,
        date: date2,
      };
      let date = {
        date: date2 + ' ' + route.params.name,
      };
      newarray.push(date);
      let arrays = subforms.concat(newarray);
      setSubforms(arrays);
      await AsyncStorage.setItem('subform', JSON.stringify(arrays));
      createJSONFile(date.date, array);
      navigation.navigate('Surveys');
    }
  };
  const uploadimage = index => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: false,
      mediaType: 'photo',
    }).then(image => {
      console.log(image);
      data[index].image = `${image.path.substring(
        image.path.lastIndexOf('/') + 1,
      )}`;
      data[index].imagesrc = image;
      console.log(data[index]);
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
            if (item?.edit === true) {
              data[index].state = true;
              setData([...data]);
            }
          }}
          onCancel={() => {
            data[index].state = !data[index].state;
            setData([...data]);
          }}
          onConfirm={date => {
            var newdate = moment(date).format('YYYY-MM-DD');
            data[index].c_dependent_target_field = newdate;
            if (data[index]?.vali) {
              console.log('djjdjjd', data[index]);
              let parseData = JSON.parse(data[index].vali);
              if (parseData?.validation?.event?.get_year_from_date) {
                console.log(
                  'dkdk',
                  parseData?.validation?.event?.get_year_from_date?.return_field
                    ?.value,
                );
                let field =
                  parseData?.validation?.event?.get_year_from_date?.return_field
                    ?.value;
                let inde = data.findIndex(n => n.c_field_name === field);
                var now = moment();
                var dateOfBirth = moment(date).format('YYYY-MM-DD');
                var birthDate = moment(dateOfBirth);

                var age = now.diff(birthDate, 'years');
                console.log(age);
                data[inde].c_dependent_target_field = String(age);
              }
            }
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
          edit={item.edit}
          help={item?.validationfl1}
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
            if (data[index]?.vali) {
              console.log(data[index].vali);
              let parseData = JSON.parse(data[index].vali);
              if (parseData?.event) {
                if (parseData?.event?.display_in_title) {
                  setName(txt);
                }
              }
            }
            setData([...data]);
          }}
          editable={item?.edit}
          value={item.c_dependent_target_field}
          valmsg={item.edit ? item?.valmsg : ''}
          vali={item.vali}
          help={item?.validationfl1}
        />
      );
    } else if (item.c_type === 'select') {
      return (
        <>
          <View style={{marginBottom: 14}}>
            <Text
              style={{
                ...styles.titleinput2,
                color: item.edit ? 'blue' : 'orange',
              }}>
              {item.c_display_name}
            </Text>
            {item?.validationfl1 && (
              <Text
                style={{
                  ...styles.titleinput2,
                  color: item.edit ? 'green' : 'orange',
                }}>
                {item.validationfl1}
              </Text>
            )}
            <TouchableComponent
              style={styles.textinput2}
              onPress={() => {
                console.log('fjfj', JSON.stringify(item));

                let parseArray;
                if (item?.validation) {
                  parseArray = JSON.parse(item.validation);
                }

                if (item?.edit === true) {
                  let label = 'c_name';
                  console.log(data);
                  let title1 = item.n_sequence;
                  let data2 = data3?.find(
                    n => n.key === item.c_select_option_table,
                  )?.data;
                  if (parseArray?.validation?._filter_list?.filter_data) {
                    let fieldName =
                      parseArray?.validation?._filter_list?.filter_data
                        ?.filter_column?._field_name_1;
                    data2 = data2.filter(n => n.n_gp == gp);
                  }
                  label = item.c_select_option_col_name;

                  setLabel(label);
                  setDrop(data2);
                  setIndex(index);
                  rbsheet.current.open();
                }
              }}>
              <AppText
                style={{
                  width: screenWidth / 1.26,
                  color: item.c_dependent_target_field?.c_name
                    ? Colors.black
                    : item.edit
                    ? Colors.plhdr
                    : 'orange',
                  left: 10,
                }}>
                {item.c_dependent_target_field?.c_name
                  ? item.c_dependent_target_field?.c_name
                  : 'Select...'}
              </AppText>
              {item.c_dependent_target_field?.c_name ? (
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
                  color={item.edit ? 'black' : 'orange'}
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
          <View
            style={{marginBottom: 14, height: item?.imagesrc?.path ? 160 : 70}}>
            <Text
              style={{
                ...styles.titleinput2,
                color: item.edit ? 'blue' : 'orange',
              }}>
              {item.c_display_name}
            </Text>
            {item?.validationfl1 && (
              <Text
                style={{
                  ...styles.titleinput2,
                  color: item.edit ? 'green' : 'orange',
                }}>
                {item.validationfl1}
              </Text>
            )}
            {!item?.image ? (
              <>
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
              </>
            ) : (
              <Image
                style={{
                  width: screenWidth / 1.5,
                  height: 150,

                  alignSelf: 'center',
                  borderRadius: 5,
                  borderWidth: 1,
                  resizeMode: 'stretch',
                }}
                source={{uri: item?.imagesrc.path}}></Image>
            )}

            {item?.edit === true && item?.valmsg && (
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
          help={item?.validationfl1}
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
            numberOfLines={60}
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
        {/* <KeyboardAwareScrollView> */}
        <Header2
          title="Survey Form"
          enabled={enabled}
          onPress={() => {
            setModal1(true);
          }}
        />
        <AppText style={{color: 'white', marginLeft: 15}}>
          {route.params.name}
        </AppText>
        <AppText style={{color: 'white', marginLeft: 15, fontSize: 22}}>
          {name}
        </AppText>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-end',
            marginRight: 20,
            marginTop: -30,
            marginBottom: 15,
          }}>
          {isfiles ? (
            <View style={{...styles.headrbtn, opacity: 0.5}}>
              <AppText
                style={{textAlign: 'center', color: 'white', fontSize: 16}}>
                Form
              </AppText>
            </View>
          ) : (
            <TouchableComponent
              onPress={() => {
                setLoading(true);
                getdata1();
              }}
              style={styles.headrbtn}>
              <AppText
                style={{textAlign: 'center', color: 'white', fontSize: 16}}>
                Form
              </AppText>
            </TouchableComponent>
          )}
          <TouchableComponent
            onPress={() => {
              setLoading(true);
              getdata1(data);
            }}
            style={styles.headrbtn}>
            <AppText
              style={{textAlign: 'center', color: 'white', fontSize: 16}}>
              Master
            </AppText>
          </TouchableComponent>
        </View>
        <View
          style={{
            width: screenWidth / 1.05,
            height: screenHeight / 1.34,
            backgroundColor: Colors.Background,
            alignSelf: 'center',
            borderRadius: 6,
            paddingTop: 20,
          }}>
          {data.length !== 0 ? (
            <FlatList data={data} renderItem={RenderItem} />
          ) : null}

          <TextBtncomponent
            title={btn ? btn?._burron_name_1 : 'SAVE'}
            onPress={() => onsave()}
          />
        </View>
        {/* </KeyboardAwareScrollView> */}
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
                  if (data[index]?.vali) {
                    if (data[index].c_field_name === 'c_mother_occupationdd') {
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
                          if (ji !== -1) {
                            data[ji].edit = false;
                            data[ji].valmsg = '';
                          }
                        }
                      } else {
                        let darray = parseData.event.disable_if.disable_fields;
                        for (let j = 0; j <= darray.length - 1; j++) {
                          let ji = data.findIndex(
                            n => n.c_field_name === darray[j]._field_name,
                          );
                          console.log(
                            'disablefields',
                            ji,
                            darray[j]._field_name,
                          );
                          if (ji !== -1) {
                            data[ji].edit = true;
                          }
                        }
                      }
                    } else {
                      console.log('sksksksss', data[index].vali);
                      let parseData = JSON.parse(data[index].vali);

                      if (parseData?.event?.disable_if?.disable_check) {
                        let field =
                          parseData?.event?.disable_if?.disable_check?._field_1;
                        let fieldn =
                          parseData?.event?.disable_if?.disable_check
                            ?._field_equal_to;
                        let i = data.findIndex(n => n.c_field_name === field);
                        let field2 = data[i].c_dependent_target_field?.c_name;
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
                        console.log(
                          'dkdkkkdkdk',
                          JSON.stringify(parseData?.event),
                        );
                        let field =
                          parseData?.event?.enable_if?.enable_check?._field_1;
                        let fieldn =
                          parseData?.event?.enable_if?.enable_check
                            ?._field_equal_to;
                        let i = data.findIndex(n => n.c_field_name === field);
                        let field2 = data[i]?.c_dependent_target_field?.c_name;
                        if (field2 === fieldn) {
                          let darray =
                            parseData?.event?.enable_if?.enable_fields;
                          for (let j = 0; j <= darray.length - 1; j++) {
                            let ji = data.findIndex(
                              n => n.c_field_name === darray[j]._field_name,
                            );
                            data[ji].edit = true;
                            console.log('clled');
                          }
                          console.log(true);
                        }
                      }
                    }
                    let parseData = JSON.parse(data[index].vali);
                    if (parseData?.event?.multi_enable_disable) {
                      let schearray = parseData?.event?.multi_enable_disable;
                      console.log('dnjdjjdj', schearray);
                      for (let s = 0; s <= schearray.length - 1; s++) {
                        let field = schearray[s];
                        let fieldName = field[0]?.field_name;
                        let fieldn = field[0]?.equal_to;
                        let fieldis = field[0]?.between_nos;
                        console.log('djjdjd', fieldis);
                        console.log('djjdjd', fieldn);
                        let i = data.findIndex(
                          n => n.c_field_name === fieldName,
                        );

                        let field2 = data[i]?.c_dependent_target_field?.c_name;
                        console.log(field2);
                        if (fieldn) {
                          if (fieldn === field2) {
                            let darray = field[0]?.enable_fields;

                            let earray = field[0]?.disable_fields;
                            console.log(darray);
                            console.log(earray);
                            for (let j = 0; j <= darray.length - 1; j++) {
                              let ji = data.findIndex(
                                n => n.c_field_name === darray[j]._field_name,
                              );
                              data[ji].edit = true;
                            }
                            for (let e = 0; e <= earray.length - 1; e++) {
                              let ef = data.findIndex(
                                n => n.c_field_name === earray[e]._field_name,
                              );

                              data[ef].edit = false;
                              data[ef].valmsg = '';
                            }
                          }
                        }
                        if (fieldis) {
                          let field3 = data[i]?.c_dependent_target_field;
                          let num1 = fieldis.split(',')[0];
                          let num2 = fieldis.split(',')[1];

                          if (
                            Number(field3) >= Number(num1) &&
                            Number(field3) <= Number(num2)
                          ) {
                            let darray = field[0]?.enable_fields;
                            let earray = field[0]?.disable_fields;
                            for (let j = 0; j <= darray.length - 1; j++) {
                              let ji = data.findIndex(
                                n => n.c_field_name === darray[j]._field_name,
                              );
                              data[ji].edit = true;
                            }
                            for (let e = 0; e <= earray.length - 1; e++) {
                              let ef = data.findIndex(
                                n => n.c_field_name === earray[e]._field_name,
                              );

                              data[ef].edit = false;
                              data[ef].valmsg = '';
                            }
                          }
                        }
                      }
                    }
                    if (parseData?._fill_timestamp) {
                      let fieldName =
                        parseData?._fill_timestamp?.fill_timestamp
                          ?._fill_in_fileds._field_name_1;
                      let index = data.findIndex(
                        n => n.c_field_name === fieldName,
                      );
                      if (fieldName) {
                        data[index].c_dependent_target_field = moment(
                          new Date(),
                        ).format('YYYY-MM-DD hh:mm:ss');
                      }
                      console.log(JSON.stringify(parseData?._fill_timestamp));
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
          yes="Okay"
          no="Cancel"
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
            //   let index1 = data.findIndex(n => n.c_field_name === 'c_hh_id');
            //   let arrayh = [data[index1].c_dependent_target_field];
            //   navigation.navigate('Multiform', {
            //     name: btn?._open_form_multi_entry,
            //     times: time,
            //     main: data,
            //     hhid: hhid,
            //   });
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
        <Modl
          isVisible={modal1}
          yes="Yes"
          no="No"
          onyespress={async () => {
            setModal1(false);
            navigation.goBack();
          }}
          onnopress={() => {
            setModal1(false);
          }}
          Title={
            'Are you sure you want to leave this page, data will be lost if you will leave this page'
          }
        />
      </SafeAreaView>
    </View>
  );
}

export default MemberSurvey;
