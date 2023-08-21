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
  CommonInput,
  AppText,
  TextBtncomponent,
  LogoCommon,
  screenWidth,
  TouchableComponent,
  ImageComponent,
  Header,
  Loadingcomponent,
  screenHeight,
  Header2,
} from '../Utilities/Component/Helpers';
import styles from './style';
import {Colors} from '../Utilities/Component/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import RNFS from 'react-native-fs';
import {confirmButtonStyles} from 'react-native-modal-datetime-picker';

const Btn = ({onPress, Text, backgroundColor}) => {
  return (
    <TouchableComponent
      onPress={onPress}
      style={{
        height: 25,
        width: 70,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: backgroundColor,
        borderRadius: 3,
      }}>
      <AppText
        style={{
          textAlign: 'center',
          color: 'white',
          fontSize: 14,
          fontWeight: '600',
        }}>
        {Text}
      </AppText>
    </TouchableComponent>
  );
};

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
            <Text style={styles.modalbtntxt}>YES</Text>
          </TouchableComponent>
          <TouchableComponent style={styles.modalbtn} onPress={onnopress}>
            <Text style={styles.modalbtntxt}>NO</Text>
          </TouchableComponent>
        </View>
      </View>
    </Modal>
  );
};
import Modal from 'react-native-modal';
function IncompleteSurvey({navigation}) {
  useFocusEffect(
    React.useCallback(() => {
      setForms([]);
      getdata();
      getdata1();
      setSubforms([]);
      return () => {};
    }, []),
  );
  const [token, setToken] = useState('');
  const [ids, setids] = useState('');
  const [loading, setLoading] = useState('');
  const [msg, setMsg] = useState('');
  const [date, setDate] = useState('');
  const [data, setData] = useState('');

  const [modal, setModal] = useState(false);
  const [logoutmodal, setLogoutmodal] = useState(false);
  const [deletemodal, setDeletemodal] = useState(false);
  const [editmodal, setEditmodal] = useState(false);
  const [subforms, setSubforms] = useState([]);
  const [forms, setForms] = useState([]);
  const [paramdata, setParamdata] = useState();
  const getdata1 = async () => {
    let m = await AsyncStorage.getItem('mainform');
    let res = JSON.parse(m);
    setData(res);
  };
  const getdata = async () => {
    setForms([]);
    let tk = await AsyncStorage.getItem('token');
    console.log('oken', tk);
    let subform = await AsyncStorage.getItem('subform');
    let forms1 = JSON.parse(subform);
    console.log('ormmmmlengthssxxx', forms1);
    if (subform) {
      readJSONFile(forms1);
      setSubforms(forms1);
    } else {
      setSubforms([]);
    }
  };

  const deleteFile = async (id, form, dt) => {
    let subform = subforms[id];
    let n = dt ? dt + ' ' + form : date + ' ' + form;
    dt1 = dt ? dt : date;

    const filePath = RNFS.DocumentDirectoryPath + `/${n}.json`; // Replace with the actual file path
    console.log(filePath);
    try {
      await RNFS.unlink(filePath);
      console.log('File deleted successfully.');
      getdata();
      let index = subforms.findIndex(n => n.date === n);
      // Remove one elemen at the specified index

      if (index !== -1) {
        subforms.splice(index, 1);
        await AsyncStorage.setItem('subform', JSON.stringify(subforms));
        setSubforms(subforms);
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };
  const readJSONFile = async subfo => {
    setForms([]);
    let array = [];
    subfo.map(async item => {
      try {
        const path = RNFS.DocumentDirectoryPath + `/${item.date}.json`;
        const fileContent = await RNFS.readFile(path);
        const jsonData = JSON.parse(fileContent);
        array.push(jsonData);
        console.log('arrrattt', array);
        array = array.filter(
          (array, index, self) =>
            index === self.findIndex(t => t.date === array.date),
        );
        setForms(array);
        return jsonData;
      } catch (error) {
        console.log('Error reading JSON file:', error);
        return null;
      }
    });
  };
  const uploadAll = () => {
    for (let i = 0; i <= forms.length - 1; i++) {
      setLoading(true);
      setDate(forms[i].date);
      clickfun(i, forms[i].date);
    }
  };
  const clickfun = (id, date) => {
    console.log('dkdkkdkeee', forms[id].data);
    let newdata = forms[id].data;
    let filterData = newdata.map(val => ({
      c_dependent_target_field: val.c_dependent_target_field,
      c_field_name: val.c_field_name,
      c_form_name: data.find(n => n.c_form_name === val.c_form_name)
        ?.c_route_name,
      c_form: val.c_form_name,
      image: val?.imagesrc,
    }));

    console.log('filtrData', filterData);
    getdata2(filterData, id, date);
    if (forms[id]?.sub) {
      let newdata1 = forms[id].sub;
      for (let i = 0; i <= newdata1.length - 1; i++) {
        let filterData1 = newdata1[i].map(val => ({
          c_dependent_target_field: val.c_dependent_target_field,
          c_field_name: val.c_field_name,
          c_form_name: data.find(n => n.c_form_name === val.c_form_name)
            ?.c_route_name,
          c_form: val.c_form_name,
          image: val?.imagesrc,
        }));

        getdata3(filterData1, id, date);
      }
    }
  };
  const getdata3 = async (data, id, date) => {
    setLoading(true);
    let tk = await AsyncStorage.getItem('token');
    let id1 = await AsyncStorage.getItem('Id');

    setToken(tk);
    var myHeaders = new Headers();
    myHeaders.append('X-Access-Token', tk);
    myHeaders.append('Content-Type', 'application/json');
    let raw = {};
    let formname = data[0].c_form_name;
    let form = data[0].c_form;

    for (let i = 0; i <= data.length - 1; i++) {
      let newk = data[i];
      let element = newk.c_dependent_target_field;
      let key = newk.c_dependent_target_field;
      if (typeof element === 'object') {
        key = element?.c_name;
      }
      if (newk?.image) {
        key = newk?.image.path;
      }
      let obj = `${newk.c_field_name}`;
      raw[obj] = key ? key : null;
    }
    raw.n_user_id = parseInt(id1);
    raw = JSON.stringify(raw);
    console.log('rawffkkfkk', raw);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    fetch(`https://3r4cace.pmis.app:1837/api/add/${formname}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setLoading(false);
        if (result?.result === 'success') {
          deleteFile(id, form, date);
        }

        if (result?.message === 'Unauthorized!') {
          Alert.alert('Your session has expired login again');
          navigation.navigate('SignIn');
        }

        console.log('resulttt', result);
      })
      .catch(error => {
        setLoading(false);
        console.log('error', error);
      });
  };
  const getdata2 = async (data, id, date) => {
    setLoading(true);
    let tk = await AsyncStorage.getItem('token');
    let id1 = await AsyncStorage.getItem('Id');

    setToken(tk);
    var myHeaders = new Headers();
    myHeaders.append('X-Access-Token', tk);
    myHeaders.append('Content-Type', 'application/json');
    let raw = {};
    let formname = data[0].c_form_name;
    let form = data[0].c_form;
    for (let i = 0; i <= data.length - 1; i++) {
      let newk = data[i];
      let element = newk.c_dependent_target_field;
      let key = newk.c_dependent_target_field;
      if (typeof element === 'object') {
        key = element?.c_name;
      }
      if (newk?.image) {
        key = newk?.image.path;
      }
      let obj = `${newk.c_field_name}`;
      raw[obj] = key ? key : null;
    }
    raw.n_user_id = parseInt(id1);
    raw = JSON.stringify(raw);
    console.log('rawffkkfkk', raw);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    fetch(`https://3r4cace.pmis.app:1837/api/add/${formname}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setLoading(false);
        console.log('resulttt', result);
        if (result?.result === 'success') {
          alert(JSON.stringify(result));
          deleteFile(id, form, date);
        }

        if (result?.message === 'Unauthorized!') {
          Alert.alert('Your session has expired login again');
          navigation.navigate('SignIn');
        }
        // setModal(true);
        // setTimeout(() => {
        //   setModal(false);
        // }, 1000);
      })
      .catch(error => {
        setLoading(false);
        console.log('error', error);
        setModal(true);
        setMsg('Network Error');
        setTimeout(() => {
          setModal(false);
        }, 1000);
      });
  };
  const render = (item, id, ite) => {
    if (item?.c_field_name) {
      let enabled = data.find(
        n => n.c_form_name === item.c_form_name,
      )?.c_enable_edit;
      console.log(enabled);
      if (item?.c_field_name === ite.data[0]?.c_field_name) {
        return (
          <View style={styles.mainview}>
            <View style={{marginLeft: 35}}>
              <Text style={{fontWeight: '600', fontSize: 19, marginBottom: 5}}>
                {ite?.date}
              </Text>
              <Text style={{fontWeight: '600', fontSize: 19, marginBottom: 5}}>
                {item?.c_form_name}
              </Text>
              <Text style={{fontWeight: '300', fontSize: 12, marginBottom: 5}}>
                Sub forms -{forms[id]?.sub?.length}
              </Text>
              {/* <Text>{item?.c_dependent_target_field}</Text> */}
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <Btn
                onPress={() => {
                  let index = forms.findIndex(n => n.date === ite.date);
                  setids(index);

                  setDate(ite.date);
                  setLogoutmodal(true);
                }}
                Text="Sync"
                backgroundColor={'#E50045'}
              />
              {enabled === 'true' && (
                <Btn
                  Text="Edit"
                  onPress={() => {
                    let index = forms.findIndex(n => n.date === ite.date);

                    setids(index);

                    setDate(ite.date);
                    let data = item;
                    setParamdata(data);
                    setEditmodal(true);
                  }}
                  backgroundColor={'#9FC300'}
                />
              )}
              <Btn
                Text="Delete"
                onPress={() => {
                  let index = forms.findIndex(n => n.date === ite.date);
                  setids(index);

                  setDate(ite.date);
                  setDeletemodal(true);
                }}
                backgroundColor={'#FF0606'}
              />
            </View>
          </View>
        );
      }
    }
  };
  return (
    <View style={{backgroundColor: Colors.backcolor, flex: 1}}>
      <SafeAreaView>
        <Header2
          title="Saved Survey"
          onPress={() => {
            navigation.navigate('Surveys');
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-end',
            marginRight: 20,
            marginTop: -30,
            marginBottom: 15,
          }}>
          <TouchableComponent
            onPress={() => {
              uploadAll();
            }}
            style={styles.headrbtn}>
            <AppText
              style={{textAlign: 'center', color: 'white', fontSize: 16}}>
              Upload All
            </AppText>
          </TouchableComponent>
        </View>
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
            data={forms}
            renderItem={({item, index}) => (
              <View>
                {item?.data.map(itm => {
                  return render(itm, index, item);
                })}
              </View>
            )}
          />
        </View>
        <Modal isVisible={modal}>
          <View style={styles.modal}>
            <Text style={styles.modaltxt1}>{msg}</Text>
          </View>
        </Modal>
        <Modl
          isVisible={logoutmodal}
          onyespress={() => {
            setLogoutmodal(false);
            setLoading(true);
            clickfun(ids);
          }}
          onnopress={() => {
            setLogoutmodal(false);
          }}
          Title={'Are you sure you want to to upload  data file to server ?'}
        />
        <Modl
          isVisible={deletemodal}
          onyespress={() => {
            setDeletemodal(false);
            if (forms[ids]?.sub) {
              let formname = forms[ids]?.sub[0][0]?.c_form_name;
              deleteFile(ids, formname);
            } else {
              let formname = forms[ids]?.data[0][0]?.c_form_name;
              deleteFile(ids, formname);
            }
          }}
          onnopress={() => {
            setDeletemodal(false);
          }}
          Title={'Are you sure you want to Delete this Survey ?'}
        />
        <Modl
          isVisible={editmodal}
          onyespress={() => {
            setEditmodal(false);
            let subform = subforms[ids];
            let d = forms[ids].data;
            let sub = forms[ids]?.sub;
            let date = forms[ids].date;
            navigation.navigate('EditSurvey', {data: d, date: date, sub});
          }}
          onnopress={() => {
            setEditmodal(false);
          }}
          Title={'Are you sure you want to Edit this Survey ?'}
        />
      </SafeAreaView>
    </View>
  );
}

export default IncompleteSurvey;
