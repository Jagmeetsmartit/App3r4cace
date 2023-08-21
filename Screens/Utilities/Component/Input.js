import {
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import {Colors, Fonts} from './Colors';
import {AppText, ImageComponent, TouchableComponent} from './Helpers';
import VectorIcon from './vectorIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;
import Modal from 'react-native-modal';
import {Dropdown} from 'react-native-element-dropdown';
import moment from 'moment';
export function Input({
  title1,
  title2,
  valmsg,
  onChangeText,
  value,
  placeholder,
  keyboardType,
  maxLength,
  returnKeyType,
  onFocus,
  autoFocus,
  multiline,
  blurOnSubmit,
  ref,
  vali,
  editable,
  onchange,
  onSubmitEditing,
  numberOfLines,
  autoCapitalize,
  onBlur,
  defaultValue,
  autoComplete,
  help,
}) {
  return (
    <View style={{marginBottom: 14}}>
      <Text style={{...styles.titleinput, color: editable ? 'blue' : 'orange'}}>
        {title2}
      </Text>
      {help && (
        <Text
          style={{...styles.titleinput, color: editable ? 'green' : 'orange'}}>
          {help}
        </Text>
      )}
      <TextInput
        underlineColorAndroid="transparent"
        style={{...styles.textinput, color: editable ? 'black' : 'orange'}}
        onChangeText={onChangeText}
        value={value}
        placeholderTextColor={editable ? 'black' : 'orange'}
        placeholder={placeholder}
        keyboardType={keyboardType}
        maxLength={maxLength}
        returnKeyType={returnKeyType}
        onFocus={onFocus}
        autoFocus={autoFocus}
        multiline={multiline}
        blurOnSubmit={blurOnSubmit}
        selectionColor={Colors.mainColor}
        editable={editable}
        ref={ref}
        onSubmitEditing={onSubmitEditing}
        numberOfLines={numberOfLines}
        autoCapitalize={autoCapitalize}
        onBlur={onBlur}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
      />
      {valmsg && <Text style={{color: 'red', marginLeft: 20}}>{valmsg}</Text>}
    </View>
  );
}

export const InputBtn1 = ({title1, title2, onPress, value}) => {
  return (
    <View style={styles.inputview2}>
      <View style={{flexDirection: 'row', width: screenWidth / 1.1}}>
        <Text style={styles.titleinput2}>{title1}</Text>
        <Text style={styles.titleinput2}>{title2}</Text>
      </View>

      <TouchableComponent onPress={onPress} style={styles.textinput}>
        <AppText
          style={{
            alignSelf: 'flex-start',
            justifyContent: 'center',
            marginTop: 15,
          }}>
          kkk {value}
        </AppText>
      </TouchableComponent>
    </View>
  );
};
export const InputBtn = ({
  onChange,
  title1,
  title2,
  title3,
  placeholder,
  onPress,
  value,
  data,
}) => {
  let label = 'c_name';

  let data2 = data.find(n => n.key === title3)?.data;
  if (title1 === 91) {
    data2 = data2?.slice(0, 30);
    label = 'c_school_name';
  }
  if (title1 === 71) {
    label = 'c_awc_name';
  }
  if (title1 === 87) {
    data2 = data2?.slice(0, 30);
    label = 'c_school_name';
  }
  return (
    <View style={styles.inputview2}>
      <View style={{flexDirection: 'row', width: screenWidth / 1.1}}>
        <Text style={styles.titleinput2}>{title1}</Text>
        <Text style={styles.titleinput2}>{title2}</Text>
      </View>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={data2}
        maxHeight={300}
        labelField={label}
        valueField={label}
        placeholder={placeholder}
        value={value}
        onChange={() => onChange}
      />
    </View>
  );
};
function isValidJSON(jsonString) {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (error) {
    return false;
  }
}
export function DateInputBtn({
  drop,
  vali,
  valmsg,
  title1,
  title2,
  text,
  data,
  name,
  onPress,
  onItemPress,
  onCancel,
  onConfirm,
  color,
  edit,
  help,
}) {
  let maxDate = new Date();
  let minDate = new Date('2020-05-23');

  if (vali) {
    let valid;
    if (isValidJSON(vali) === true) {
      valid = JSON.parse(vali);
    }

    if (valid?.validation?.date_range?.validation_check) {
      maxDate =
        valid?.validation?.date_range?.validation_check?.upto === 'CURRENT_DATE'
          ? new Date()
          : new Date(valid?.validation.date_range?.validation_check?.upto);
      minDate = new Date(valid?.validation.date_range?.validation_check?.from);
    }
  }
  return (
    <View style={{marginBottom: 14}}>
      <Text style={{...styles.titleinput2, color: edit ? 'blue' : 'orange'}}>
        {title2}
      </Text>
      {help && (
        <Text
          style={{...styles.titleinput2, color: editable ? 'green' : 'orange'}}>
          {help}
        </Text>
      )}
      <TouchableComponent style={styles.textinput2} onPress={onPress}>
        <Text
          style={{width: screenWidth / 1.26, color: edit ? 'black' : 'orange'}}>
          {text}
        </Text>
        {drop ? (
          <VectorIcon
            name={'up'}
            size={20}
            color={edit ? Colors.black : 'orange'}
            groupName={'AntDesign'}
          />
        ) : (
          <VectorIcon
            name={'down'}
            size={20}
            color={edit ? Colors.black : 'orange'}
            groupName={'AntDesign'}
          />
        )}
      </TouchableComponent>

      <DateTimePickerModal
        isVisible={drop}
        mode="date"
        maximumDate={maxDate}
        minimumDate={minDate}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
      {valmsg && <Text style={{color: 'red', marginLeft: 20}}>{valmsg}</Text>}
    </View>
  );
}

export function Singleselect({data, name, title}) {
  return (
    <View style={styles.inputview2}>
      <Text style={styles.titleinput2}>{title}</Text>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <TouchableComponent
            style={{
              flexDirection: 'row',
              left: 15,
              alignItems: 'center',
            }}>
            {select ? (
              <VectorIcon
                name={'dot-circle-o'}
                size={25}
                color={Colors.black}
                groupName={'FontAwesome'}
              />
            ) : (
              <VectorIcon
                name={'circle-o'}
                size={25}
                color={Colors.black}
                groupName={'FontAwesome'}
              />
            )}
            <Text style={{left: 10}}>{item.title}</Text>
          </TouchableComponent>
        )}
      />
    </View>
  );
}

export function Multiselect({data, name, title, select, onPress}) {
  return (
    <View style={styles.inputview2}>
      <Text style={styles.titleinput2}>{title}</Text>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <TouchableComponent
            onPress={onPress}
            style={{
              flexDirection: 'row',
              left: 15,
              alignItems: 'center',
            }}>
            {select ? (
              <VectorIcon
                name={'check-square-o'}
                size={25}
                color={Colors.black}
                groupName={'FontAwesome'}
              />
            ) : (
              <VectorIcon
                name={'square-o'}
                size={25}
                color={Colors.black}
                groupName={'FontAwesome'}
              />
            )}
            <Text style={{left: 10}}>{item.title}</Text>
          </TouchableComponent>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputview: {
    backgroundColor: Colors.grey,
    width: screenWidth / 1.02,
    alignSelf: 'center',
    height: 105,
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  textinput: {
    backgroundColor: Colors.white,
    height: 43,
    width: screenWidth / 1.15,
    alignSelf: 'center',
    borderRadius: 22,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    paddingLeft: 10,
  },
  titleinput: {
    marginLeft: 7,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
  },

  inputview2: {
    backgroundColor: Colors.grey,
    width: screenWidth / 1.02,

    height: 105,
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  textinput2: {
    backgroundColor: Colors.white,
    height: 43,
    width: screenWidth / 1.15,
    alignSelf: 'center',
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
  },
  dropdown: {
    backgroundColor: Colors.white,
    height: 50,
    width: screenWidth / 1.1,
    alignSelf: 'center',
    borderRadius: 13,
    alignItems: 'center',
    paddingHorizontal: 10,
    shadowColor: Colors.black,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 2},
  },
  titleinput2: {
    marginLeft: 7,
    fontSize: 14,
    color: 'blue',
    fontWeight: '500',
    marginBottom: 10,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    color: Colors.plhdr,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 30,
    height: 30,
  },
});
