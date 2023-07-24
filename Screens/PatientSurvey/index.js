import React, {useState} from 'react';
import {View, SafeAreaView, Text, FlatList} from 'react-native';

import {
  AppText,
  TextBtncomponent,
  Header,
  Loadingcomponent,
  TouchableComponent,
} from '../Utilities/Component/Helpers';
import styles from './style';
import {Colors} from '../Utilities/Component/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {DateInputBtn, Input} from '../Utilities/Component/Input';
import RBSheet from 'react-native-raw-bottom-sheet';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {strEncode} from '../Utilities/Component/encrptm';
import moment from 'moment';
import RNFS from 'react-native-fs';
import {screenHeight, screenWidth} from '../Utilities/Component/Helpers';
import VectorIcon from '../Utilities/Component/vectorIcons';

function MemberSurvey({navigation}) {
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
  const [loading, setLoading] = useState(false);
  const [data3, setData3] = useState([]);
  const [drop, setDrop] = useState([]);
  const [index, setIndex] = useState('');
  const [label, setLabel] = useState('');
  const [token, setToken] = useState('');
  const [subforms, setSubforms] = useState([]);
  const [isfiles, setIsfiles] = useState(false);
  const rbsheet = React.useRef();
  useFocusEffect(
    React.useCallback(async () => {
      checkFilesInDirectory();
      getdata();
      return () => {};
    }, []),
  );

  const checkFilesInDirectory = async directoryPath => {
    try {
      const files = await RNFS.readdir(RNFS.DocumentDirectoryPath);
      if (files.length === 0) {
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

  const getdata = async () => {
    setLoading(true);
    let data = await AsyncStorage.getItem('Form');
    let mdata = await AsyncStorage.getItem('Master');
    let data21 = JSON.parse(data);
    if (mdata) {
      setData(data21);
      console.log('dkkdkkdkd', data21);
      let mdata2 = JSON.parse(mdata);
      setData3(mdata2);
    } else {
      setData(data21);
      getdata3(data21);
    }

    setLoading(false);

    let subform = await AsyncStorage.getItem('subform');
    if (subform) {
      let forms = JSON.parse(subform);
      setSubforms(forms);
    } else {
      setSubforms([]);
    }
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
        await AsyncStorage.setItem('Form', JSON.stringify(result));
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
            console.log('jjjj', result);

            console.log('indexxxx', ind);
            let array = {
              key: item.c_select_option_table,
              data: result,
            };
            data3.push(array);
            setData3([...data3]);
            console.log(data3);
            console.log('fkkff', data);
            await AsyncStorage.setItem('Master', JSON.stringify(data3));

            if (ind > 87) {
              setLoading(false);
            }
          })
          .catch(error => {
            setLoading(false);
            console.log('error', error);
          });
      }
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
        />
      );
    } else if (item.c_type === 'text') {
      return (
        <Input
          title1={item.n_sequence}
          title2={item.c_display_name}
          placeholder={'Enter Text here ...'}
          onChangeText={txt => {
            data[index].c_dependent_target_field = txt;
            setData([...data]);
          }}
          value={item.c_dependent_target_field}
        />
      );
    } else if (item.c_type === 'select') {
      return (
        <>
          <View style={styles.inputview2}>
            <View style={{flexDirection: 'row', width: screenWidth / 1.1}}>
              <Text style={styles.titleinput2}>{item.n_sequence}</Text>
              <Text style={styles.titleinput2}>{item.c_display_name}</Text>
            </View>

            <TouchableComponent
              style={styles.textinput2}
              onPress={() => {
                let label = 'c_name';
                console.log(data);
                let title1 = item.n_sequence;
                let data2 = data3.find(
                  n => n.key === item.c_select_option_table,
                )?.data;
                if (title1 === 91) {
                  data2 = data2?.slice(0, 30);
                  label = item.c_select_option_col_name;
                }
                if (title1 === 5) {
                  data2 = data2?.slice(0, 30);
                  label = item.c_select_option_col_name;
                }
                if (title1 === 71) {
                  label = item.c_select_option_col_name;
                }
                if (title1 === 87) {
                  data2 = data2?.slice(0, 30);
                  label = item.c_select_option_col_name;
                }
                setLabel(label);
                setDrop(data2);
                setIndex(index);
                rbsheet.current.open();
              }}>
              <AppText
                style={{
                  width: screenWidth / 1.26,
                  color: item.c_dependent_target_field.c_name
                    ? Colors.black
                    : Colors.plhdr,
                }}>
                {item.c_dependent_target_field.c_name
                  ? item.c_dependent_target_field.c_name
                  : 'Select...'}
              </AppText>
              <VectorIcon
                name={'down'}
                size={20}
                color={Colors.black}
                groupName={'AntDesign'}
              />
            </TouchableComponent>
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
          value={item.c_dependent_target_field}
        />
      );
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {loading && <Loadingcomponent></Loadingcomponent>}
      <KeyboardAwareScrollView>
        <Header
          title="Survey"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-end',
            marginRight: 20,
            marginTop: -20,
          }}>
          {isfiles ? (
            <View
              style={{
                height: 30,
                width: 70,
                alignSelf: 'center',
                marginRight: 10,
                justifyContent: 'center',
                backgroundColor: Colors.mainColor,
                borderRadius: 3,
                opacity: 0.5,
              }}>
              <AppText
                style={{textAlign: 'center', color: 'white', fontSize: 16}}>
                Form
              </AppText>
            </View>
          ) : (
            <TouchableComponent
              onPress={() => {
                setLoading(true);
                getdata2();
              }}
              style={{
                height: 30,
                width: 70,
                alignSelf: 'center',
                marginRight: 10,
                justifyContent: 'center',
                backgroundColor: Colors.mainColor,
                borderRadius: 3,
              }}>
              <AppText
                style={{textAlign: 'center', color: 'white', fontSize: 16}}>
                Form
              </AppText>
            </TouchableComponent>
          )}
          <TouchableComponent
            onPress={() => {
              setLoading(true);
              getdata3(data);
            }}
            style={{
              height: 30,
              width: 70,
              alignSelf: 'center',
              marginRight: 10,
              justifyContent: 'center',
              backgroundColor: Colors.mainColor,
              borderRadius: 3,
            }}>
            <AppText
              style={{textAlign: 'center', color: 'white', fontSize: 16}}>
              Master
            </AppText>
          </TouchableComponent>
        </View>
        {data.length !== 0 && data3.length !== 0 ? (
          <FlatList data={data} numColumns={2} renderItem={RenderItem} />
        ) : null}
        <TextBtncomponent
          title={'SAVE'}
          onPress={async () => {
            let newarray = [];
            let array = {
              data: data,
              headers: data,
            };

            let date = {
              date: date2,
            };
            newarray.push(date);
            let arrays = subforms.concat(newarray);
            setSubforms(arrays);
            await AsyncStorage.setItem('subform', JSON.stringify(arrays));
            createJSONFile(date.date, array);
            // newarray.push(array);
            // let arrays = subforms.concat(newarray);
            // setSubforms(arrays);
            // await AsyncStorage.setItem('subform', JSON.stringify(subforms));
            navigation.navigate('Surveys');
          }}
        />
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
            backgroundColor: Colors.black,
            // backgroundColor: Colors.white,
          },
          container: {
            backgroundColor: '#87CEFA',
            // backgroundColor: Colors.mainColor,
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

                setData([...data]);
                rbsheet.current.close();
              }}>
              <AppText
                style={{color: Colors.black, fontWeight: '600', fontSize: 15}}>
                {item[label]}
              </AppText>
            </TouchableComponent>
          )}
        />
      </RBSheet>
    </SafeAreaView>
  );
}

export default MemberSurvey;
