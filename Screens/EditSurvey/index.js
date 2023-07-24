import React, {useState} from 'react';
import {View, SafeAreaView, Text, FlatList} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {
  AppText,
  TextBtncomponent,
  Loadingcomponent,
  TouchableComponent,
  Header2,
} from '../Utilities/Component/Helpers';
import styles from './style';
import {Colors} from '../Utilities/Component/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {DateInputBtn, Input} from '../Utilities/Component/Input';
import RBSheet from 'react-native-raw-bottom-sheet';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import moment from 'moment';
import RNFS from 'react-native-fs';
import {screenHeight, screenWidth} from '../Utilities/Component/Helpers';
import VectorIcon from '../Utilities/Component/vectorIcons';

function EditSurvey(props, {navigation}) {
  const date2 = moment(new Date()).format('YYYYMMDDhhmmss');
  const createJSONFile = async jsonData => {
    let date2 = date + ' ' + 'House Hold Survey';
    try {
      const path = RNFS.DocumentDirectoryPath + `/${date2}.json`;
      await RNFS.writeFile(path, JSON.stringify(jsonData));
      console.log('JSON file created successfully!');
      props.navigation.replace('IncompleteSurvey');
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
  const [date, setDate] = useState('');
  const rbsheet = React.useRef();
  useFocusEffect(
    React.useCallback(() => {
      callfun();
      return () => {};
    }, []),
  );
  const callfun = async () => {
    setLoading(true);
    let hi = props.route.params.data;
    let dt = props.route.params.date;
    let name = hi[0].c_form_name;
    let mdata = await AsyncStorage.getItem('Master');
    if (mdata) {
      let mdata2 = await readJSONFile('Master' + name);
      setData3(mdata2);
      setLoading(false);
    }
    setData(hi);
    setDate(dt);
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
      setData([...data]);
    });
  };
  const readJSONFile = async name => {
    try {
      const path = RNFS.DocumentDirectoryPath + `/${name}.json`;
      const fileContent = await RNFS.readFile(path);
      const jsonData = JSON.parse(fileContent);
      console.log(jsonData);
      return jsonData;
    } catch (error) {
      setLoading(false);
      console.log('Error reading JSON file:', error);
      return null;
    }
  };
  const deleteFile = async array => {
    let date2 = date + ' ' + 'House Hold Survey';
    const filePath = RNFS.DocumentDirectoryPath + `/${date2}.json`; // Replace with the actual file path
    try {
      await RNFS.unlink(filePath);
      console.log('File deleted successfully.');
      createJSONFile(array);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  // const readJSONFile = async item => {
  //   try {
  //     const path = RNFS.DocumentDirectoryPath + `/${item}.json`;
  //     const fileContent = await RNFS.readFile(path);
  //     const jsonData = JSON.parse(fileContent);
  //     setForms(jsonData);
  //     console.log(' ', jsonData);
  //     return jsonData;
  //   } catch (error) {
  //     console.log('Error reading JSON file:', error);
  //     return null;
  //   }
  // };

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
          vali={item.validation}
          valmsg={item?.valmsg}
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
            setData([...data]);
          }}
          editable={item?.edit}
          value={item.c_dependent_target_field}
          valmsg={item?.valmsg}
        />
      );
    } else if (item.c_type === 'select') {
      return (
        <>
          <View style={{marginBottom: 14}}>
            <Text style={styles.titleinput2}>{item.c_display_name}</Text>
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
            {item?.valmsg && (
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
            title="Edit Survey"
            onPress={() => {
              props.navigation.goBack();
            }}
          />
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
              <FlatList data={data} renderItem={RenderItem} />
            ) : null}

            <TextBtncomponent
              title={'SAVE'}
              onPress={async () => {
                // let newarray = [];
                let array = {
                  data: data,
                  date: date,
                };

                // let date = {
                //   date: date2,
                // };
                // newarray.push(date);
                // let arrays = subforms.concat(newarray);
                // setSubforms(arrays);
                // await AsyncStorage.setItem('subform', JSON.stringify(arrays));
                if (props.route.params.sub) {
                  let sub = props.route.params.sub;
                  props.navigation.navigate('EditForm', {
                    name: 'HH Survey Family Members',
                    times: sub.length,
                    main: data,
                    date: date,
                    sub: sub,
                  });
                } else {
                  deleteFile(array);
                }
              }}
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
                      console.log(true);
                    }
                  }

                  let parseData = JSON.parse(data[index].vali);

                  if (parseData?.event?.disable_if?.disable_check) {
                    let field =
                      parseData?.event?.disable_if?.disable_check?._field_1;
                    let fieldn =
                      parseData?.event?.disable_if?.disable_check
                        ?._field_equal_to;
                    let i = data.findIndex(n => n.c_field_name === field);
                    let field2 = data[i]?.c_dependent_target_field?.c_name;
                    if (field2 === fieldn) {
                      let darray = parseData?.event?.disable_if?.disable_fields;
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
                    console.log(parseData?.event?.enable_if?.enable_fields);
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
      </SafeAreaView>
    </View>
  );
}

export default EditSurvey;
