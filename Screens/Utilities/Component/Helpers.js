import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  FlatList,
  ImageBackground,
  ActivityIndicator,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import {Colors} from './Colors';
import LinearGradient from 'react-native-linear-gradient';
// import LottieView from 'lottie-react-native';
import FastImage from 'react-native-fast-image';
import VectorIcon from '../Component/vectorIcons';
export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;
import Modal from 'react-native-modal';
// import {BarIndicator} from 'react-native-indicators';

const STATUSBAR_DEFAULT_HEIGHT = 20;
const STATUSBAR_X_HEIGHT = 44;
const STATUSBAR_IP12_HEIGHT = 47;
const STATUSBAR_IP12MAX_HEIGHT = 47;

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const IP12_WIDTH = 390;
const IP12_HEIGHT = 844;

const IP12MAX_WIDTH = 428;
const IP12MAX_HEIGHT = 926;

const {height: W_HEIGHT, width: W_WIDTH} = Dimensions.get('window');

let statusBarHeight = STATUSBAR_DEFAULT_HEIGHT;
let isIPhoneX_v = false;
let isIPhoneXMax_v = false;
let isIPhone12_v = false;
let isIPhone12Max_v = false;
let isIPhoneWithMonobrow_v = false;

if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS) {
  if (W_WIDTH === X_WIDTH && W_HEIGHT === X_HEIGHT) {
    isIPhoneWithMonobrow_v = true;
    isIPhoneX_v = true;
    statusBarHeight = STATUSBAR_X_HEIGHT;
  } else if (W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT) {
    isIPhoneWithMonobrow_v = true;
    isIPhoneXMax_v = true;
    statusBarHeight = STATUSBAR_X_HEIGHT;
  } else if (W_WIDTH === IP12_WIDTH && W_HEIGHT === IP12_HEIGHT) {
    isIPhoneWithMonobrow_v = true;
    isIPhone12_v = true;
    statusBarHeight = STATUSBAR_IP12_HEIGHT;
  } else if (W_WIDTH === IP12MAX_WIDTH && W_HEIGHT === IP12MAX_HEIGHT) {
    isIPhoneWithMonobrow_v = true;
    isIPhone12Max_v = true;
    statusBarHeight = STATUSBAR_IP12MAX_HEIGHT;
  }
}

export const isIPhoneX = () => isIPhoneX_v;
export const isIPhoneXMax = () => isIPhoneXMax_v;
export const isIPhone12 = () => isIPhone12_v;
export const isIPhone12Max = () => isIPhone12Max_v;
export const isIPhoneWithMonobrow = () => isIPhoneWithMonobrow_v;

const getExpoRoot = () => global.Expo || global.__expo || global.__exponent;

export const isExpo = () => getExpoRoot() !== undefined;

export const getStatusBarHeight = Platform.select({
  ios: statusBarHeight,
  android: StatusBar.currentHeight,
  default: 0,
});

export const months = [
  {label: '01', value: '01'},
  {label: '02', value: '02'},
  {label: '03', value: '03'},
  {label: '04', value: '04'},
  {label: '05', value: '05'},
  {label: '06', value: '06'},
  {label: '07', value: '07'},
  {label: '08', value: '08'},
  {label: '09', value: '09'},
  {label: '10', value: '10'},
  {label: '11', value: '11'},
  {label: '12', value: '12'},
];

// import ShadowView from '@vikasrg/react-native-simple-shadow-view';
import RBSheet from 'react-native-raw-bottom-sheet';
export function CommonModelComponent({isVisible, children}) {
  return (
    <Modal
      isVisible={isVisible}
      backdropColor="#4f4f4f"
      backdropOpacity={0.9}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}>
      {children}
    </Modal>
  );
}

export function ImageComponent({style, source}) {
  return <Image source={source} style={style} />;
}

export function FastImageComponent({style, source, resizeMode}) {
  return <FastImage source={source} style={style} resizeMode={resizeMode} />;
}

export function AppText({style, children, numberOfLines}) {
  return (
    <Text style={style} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
}

export function Header({onPress, title}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TouchableComponent
        style={{
          height: 40,
          width: 70,

          justifyContent: 'center',
        }}
        onPress={onPress}>
        <VectorIcon
          name={'keyboard-backspace'}
          size={30}
          style={{marginLeft: 15, marginRight: 15}}
          groupName={'MaterialIcons'}
          color={'black'}
        />
      </TouchableComponent>
      <Text style={{fontSize: 18, fontWeight: '600'}}>{title}</Text>
    </View>
  );
}
export function Header2({onPress, title}) {
  return (
    <>
      <ImageComponent
        source={require('../Images/logoo.png')}
        style={{
          width: screenWidth / 3.4,
          height: screenWidth / 4.8,
          alignSelf: 'center',
          resizeMode: 'contain',
          marginTop: Platform.OS === 'android' ? 15 : 15,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableComponent
          style={{
            height: 40,
            width: 70,
            justifyContent: 'center',
          }}
          onPress={onPress}>
          <VectorIcon
            name={'keyboard-backspace'}
            size={30}
            style={{marginLeft: 15, marginRight: 15}}
            groupName={'MaterialIcons'}
            color={'white'}
          />
        </TouchableComponent>
        <Text style={{fontSize: 18, fontWeight: '600', color: Colors.white}}>
          {title}
        </Text>
      </View>
    </>
  );
}

export function TouchableComponent({
  onPress,
  style,
  children,
  activeOpacity,
  onLongPress,
  hitSlop,
  onPressIn,
}) {
  return (
    <TouchableOpacity
      style={style}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={1}
      hitSlop={hitSlop}
      onPressIn={onPressIn}>
      {children}
    </TouchableOpacity>
  );
}

export function TextInputComponent({
  placeholder,
  style,
  secureTextEntry,
  keyboardType,
  editable,
  maxLength,
  onChangeText,
  value,
  returnKeyType,
  onBlur,
  onFocus,
  onSubmitEditing,
  onChange,
  multiline,
  blurOnSubmit,
  textAlignVertical,
  placeholderTextColor,
}) {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      style={style}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      editable={editable}
      maxLength={maxLength}
      onChangeText={onChangeText}
      value={value}
      returnKeyType={returnKeyType}
      autoCapitalize="none"
      onFocus={onFocus}
      onBlur={onBlur}
      onSubmitEditing={onSubmitEditing}
      onChange={onChange}
      multiline={multiline}
      blurOnSubmit={blurOnSubmit}
      textAlignVertical={textAlignVertical}
      // autoCapitalize="sentences"
    />
  );
}

export function Internetcomponent() {
  return (
    <View style={styles.intcontainer}>
      <Text style={styles.inttext}>No Internet Connection</Text>
    </View>
  );
}

export const Sheet = React.forwardRef((props, ref) => (
  <RBSheet
    ref={ref}
    closeOnDragDown
    height={props.height}
    customStyles={{
      container: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      },
    }}>
    <ScrollView>
      {props.Data.length > 0 ? (
        <View style={styles.gridContainer}>
          {props.Data.map((grid, index) => (
            <TouchableComponent
              key={grid.label}
              onPress={() => props.onPress(grid.label)}
              style={styles.gridButtonContainer}>
              <View
                style={[
                  styles.gridButton,
                  {
                    backgroundColor:
                      index % 2 ? Colors.black : Colors.themeColor,
                  },
                ]}>
                <VectorIcon
                  name={grid.icon}
                  style={styles.gridIcon}
                  groupName={props.groupName}
                />
              </View>
              <AppText style={[styles.gridLabel, {textAlign: 'center'}]}>
                {grid.label}
              </AppText>
            </TouchableComponent>
          ))}
        </View>
      ) : (
        <AppText>something went wrong please try again later...</AppText>
      )}
    </ScrollView>
  </RBSheet>
));

export const SheetOther = React.forwardRef((props, ref) => (
  <RBSheet
    ref={ref}
    closeOnDragDown
    height={props.height}
    customStyles={{
      container: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      },
    }}>
    <ScrollView>
      {props.Data.length > 0 ? (
        <View>
          <View style={styles.gridContainer}>
            {props.Data.map((grid, index) => (
              <TouchableComponent
                key={grid.label}
                onPress={() => props.onPress(grid.label)}
                style={styles.gridButtonContainer}>
                <View
                  style={[
                    styles.gridButton,
                    {
                      backgroundColor:
                        index % 2 ? Colors.black : Colors.themeColor,
                    },
                  ]}>
                  <VectorIcon
                    name={grid.icon}
                    style={styles.gridIcon}
                    groupName={props.groupName}
                  />
                </View>
                <AppText style={[styles.gridLabel, {textAlign: 'center'}]}>
                  {grid.label}
                </AppText>
              </TouchableComponent>
            ))}
          </View>
          {/* <TouchableComponent
            onPress={() => props.oncheckBoxPress()}
            activeOpacity={1}>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginVertical: 15,
              }}>
              <ImageComponent
                style={{width: 20, height: 20, resizeMode: 'contain'}}
                source={
                  props.show === false
                    ? require('../Images/outer.png')
                    : require('../Images/horigin.png')
                }
              />
              <AppText
                style={{
                  marginHorizontal: 10,
                  color: Colors.black,
                  fontSize: 16,
                  fontFamily: 'SFProDisplay-Regular',
                }}>
                Show on my profile
              </AppText>
            </View>
          </TouchableComponent> */}
        </View>
      ) : (
        <AppText>something went wrong please try again later...</AppText>
      )}
    </ScrollView>
  </RBSheet>
));

export const UploadSheet = React.forwardRef((props, ref) => (
  <RBSheet
    ref={ref}
    closeOnDragDown
    height={props.height}
    customStyles={{
      container: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      },
    }}>
    <ScrollView>
      <View style={styles.flexx}>
        {props.picOptions.map(grid => (
          <TouchableComponent
            key={grid.label}
            onPress={() => props.onPress(grid)}
            style={styles.btnoption}>
            <View style={styles.optionsub}>
              <ImageComponent source={grid.path} style={styles.optionImg} />
              <AppText style={[styles.optionTxt, {color: grid.color}]}>
                {grid.label}
              </AppText>
            </View>
          </TouchableComponent>
        ))}
      </View>
    </ScrollView>
  </RBSheet>
));

export const OptionsSheet = React.forwardRef((props, ref) => (
  <RBSheet
    ref={ref}
    closeOnDragDown
    height={props.height}
    customStyles={{
      container: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      },
    }}>
    <View style={styles.flexx}>
      <FlatList
        data={props.data}
        renderItem={({item}) => (
          <TouchableComponent
            onPress={() => props.onPress(item)}
            style={[
              styles.opbtn,
              {backgroundColor: item.isSelect ? Colors.redColor : Colors.white},
            ]}>
            <AppText
              style={{
                color: item.isSelect ? Colors.white : Colors.black,
                // fontFamily: 'SFProDisplay-Regular',
                textAlign: 'center',
              }}>
              {item.label}
            </AppText>
          </TouchableComponent>
        )}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        style={{alignSelf: 'center'}}
        showsVerticalScrollIndicator={false}
      />
    </View>
  </RBSheet>
));

export function TextBtncomponent({onPress, title}) {
  return (
    <TouchableComponent style={styles.linear} onPress={onPress}>
      <Text style={styles.btntxt}>{title}</Text>
    </TouchableComponent>
  );
}

export function Loadingcomponent({isVisible}) {
  return (
    <Modal
      isVisible={true}
      backdropOpacity={0.5}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}>
      <View
        style={{
          width: 200,
          height: 200,
          backgroundColor: 'trasnsparent',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <ActivityIndicator size={'large'} color={Colors.mainColor} />
      </View>
    </Modal>
  );
}

// export function Alertcomponent({onPress, message}) {
//   return (
//     <AwesomeAlert
//       show={true}
//       showProgress={false}
//       message={message}
//       closeOnTouchOutside={false}
//       closeOnHardwareBackPress={false}
//       showCancelButton={true}
//       cancelText="Close"
//       cancelButtonColor="#000000"
//       onCancelPressed={onPress}
//     />
//   );
// }

export function CloseBtn({onPress}) {
  return (
    <TouchableComponent style={{alignSelf: 'flex-end'}} onPress={onPress}>
      <ImageComponent
        source={require('../Images/cross.png')}
        style={{height: 35, width: 35}}
      />
    </TouchableComponent>
  );
}

export function CommonBtn({onPress, title, bottom, arrow}) {
  return (
    <TouchableComponent
      style={[styles.btn, {marginBottom: bottom === 'yes' ? 0 : 20}]}
      onPress={onPress}
      activeOpacity={0.5}>
      {arrow === 'yes' ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <AppText
            style={[styles.btntxt, {color: Colors.black, marginRight: 10}]}>
            {title}
          </AppText>
          <VectorIcon
            name={'arrowright'}
            size={15}
            color={Colors.black}
            groupName={'AntDesign'}
          />
        </View>
      ) : (
        <AppText style={[styles.btntxt, {color: Colors.black}]}>
          {title}
        </AppText>
      )}
    </TouchableComponent>
  );
}

export function LogoCommon() {
  return (
    <ImageComponent
      source={require('../Images/logo.png')}
      style={{
        height: 120,
        width: screenWidth / 2,
        resizeMode: 'contain',
        alignSelf: 'center',
      }}
    />
  );
}

export function TouchableInputComponent({
  label,
  onPress,
  title,
  iconSource,
  error,
  errorspacing,
  source,
  lefticon,
  multi,
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View>
        <AppText style={styles.label}>{label}</AppText>
        <View style={styles.textBoxBtnHolder}>
          <View
            style={[
              styles.textBox,
              {
                paddingLeft: lefticon === 'no' ? 10 : 55,
                paddingRight: lefticon === 'no' ? 58 : 58,
                minHeight: multi === 'yes' ? 120 : 49,
                justifyContent: 'center',
              },
            ]}>
            <ImageComponent source={iconSource} style={styles.icon} />
            <AppText
              style={{
                color: '#3f3f3f',
                // fontFamily: 'SFProDisplay-Regular',
              }}>
              {title}
            </AppText>
          </View>
          <View style={styles.visibilityBtn}>
            <ImageComponent
              source={source}
              style={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
                alignItems: 'center',
              }}
            />
          </View>
        </View>

        <AppText
          style={[
            styles.errortxt,
            {marginVertical: errorspacing === 'yes' ? 0 : 5},
          ]}>
          {error}
        </AppText>
      </View>
    </TouchableWithoutFeedback>
  );
}

export function CommonInput({
  label,
  iconSource,
  secureTextEntry,
  onChangeText,
  value,
  onPress,
  source,
  error,
  showlabel,
  errorspacing,
  placeholder,
  lefticon,
  keyboardType,
  maxLength,
  returnKeyType,
  editable,
  multiline,
  blurOnSubmit,
  onFocus,
  onBlur,
  multi,
  textAlignVertical,
  placeholderTextColor,
  eye,
  hidepass,
  eyename,
  iconcolor,
}) {
  return (
    <View>
      {showlabel === 'no' ? null : (
        <AppText style={styles.label}>{label}</AppText>
      )}
      <View style={styles.textBoxBtnHolder}>
        <TextInputComponent
          underlineColorAndroid="transparent"
          placeholderTextColor="grey"
          secureTextEntry={secureTextEntry}
          style={[
            styles.textBox,
            {
              paddingRight: lefticon === 'no' ? 10 : 10,
              paddingLeft: lefticon === 'no' ? 58 : 10,
              minHeight: multi === 'yes' ? 120 : 49,
              paddingVertical: multi === 'yes' ? 10 : 0,
            },
          ]}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType}
          maxLength={maxLength}
          returnKeyType={returnKeyType}
          editable={editable}
          multiline={multiline}
          blurOnSubmit={blurOnSubmit}
          onFocus={onFocus}
          onBlur={onBlur}
          textAlignVertical={textAlignVertical}
        />
        {eye !== 'NO' ? (
          <TouchableComponent style={styles.visibilityBtn} onPress={hidepass}>
            <VectorIcon
              groupName={'Ionicons'}
              name={eyename}
              size={25}
              color={iconcolor}
            />
          </TouchableComponent>
        ) : null}
      </View>

      <AppText
        style={[
          styles.errortxt,
          {marginVertical: errorspacing === 'yes' ? 0 : 5},
        ]}>
        {error}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  intcontainer: {
    height: 20,
    backgroundColor: Colors.redColor,
    width: screenWidth,
  },
  inttext: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.white,
  },
  btn: {
    width: screenWidth / 1.1,
    height: 45,
    backgroundColor: Colors.themeColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 3,
    marginTop: 15,
    alignSelf: 'center',
  },
  btntxt: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '800',
    // fontFamily: 'SFProDisplay-Bold',
  },
  shadowbtn: {
    shadowColor: Colors.shadow,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 0},
    backgroundColor: Colors.white,
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  label: {
    fontSize: 16,
    color: Colors.inputlabel,
    marginBottom: 5,
    // fontFamily: 'SFProDisplay-Regular',
  },
  textBoxBtnHolder: {
    position: 'relative',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    borderColor: Colors.shadow,
    borderWidth: 0.5,
    backgroundColor: Colors.white,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 0},
    elevation: 3,
  },

  textBox: {
    fontSize: 14,
    height: 40,
    paddingVertical: 0,
    width: screenWidth / 1.15,
    borderRadius: 13,
  },
  visibilityBtn: {
    position: 'absolute',
    right: 0,
    height: 55,
    width: 55,
    resizeMode: 'contain',
    backgroundColor: Colors.themeColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },

  btnImage: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
  },
  errortxt: {
    fontSize: 12,
    color: Colors.error,
    marginVertical: 5,
    color: 'red',
  },

  icon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    position: 'absolute',
    left: 15,
    top: 10,
  },
  linear: {
    width: screenWidth / 1.15,
    alignSelf: 'center',
    height: 51,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 17,
    borderRadius: 10,
    backgroundColor: Colors.backcolor,
  },
  forgotpass: {
    alignSelf: 'center',
  },
  forgotpasstxt: {
    color: Colors.white,
    fontSize: screenWidth / 28,
    // fontFamily: 'SFProDisplay-Regular',
  },
  bottomcont: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.white,
    padding: 5,
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomimg: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  iconarrow: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    position: 'absolute',
    right: 20,
    top: 16,
  },
  load: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  gridButtonContainer: {
    flexBasis: '33%',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridIcon: {
    fontSize: 30,
    color: Colors.white,
  },
  gridLabel: {
    fontSize: 14,
    paddingTop: 10,
    color: Colors.gridlabel,
    // fontFamily: 'SFProDisplay-Regular',
  },
  btnoption: {
    height: 45,
    width: screenWidth,
    borderBottomColor: Colors.opt,
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  optionsub: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  optionImg: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  optionTxt: {
    fontSize: 18,
    // fontFamily: 'SFProDisplay-Regular',
    marginLeft: 10,
  },
  opbtn: {
    minHeight: 40,
    width: screenWidth / 2.5,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 0},
    elevation: 3,
  },
  sel: {
    backgroundColor: Colors.themeColor,
  },
  track: {
    backgroundColor: Colors.black,
  },
  touch: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  iosstyle: {
    height: 30,
    width: 30,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 1,
    shadowOpacity: 0.1,
  },
  and: {
    height: 30,
    width: 30,
    borderRadius: 50,
    backgroundColor: Colors.themeColor,
  },
  press: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: Colors.black,
  },
  slideCont: {
    alignItems: 'center',
    marginTop: 60,
  },
  instaselected: {backgroundColor: '#FA7B5F'},
  instalist: {
    backgroundColor: '#192338',
    justifyContent: 'center',
    alignItems: 'center',
  },
  instalistCont: {
    flex: 1,
    margin: 1,
  },
  gridImg: {
    height: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneBtn: {
    alignSelf: 'center',
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 20,
    backgroundColor: Colors.redColor,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeImg: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  flexx: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: screenHeight / 4,
  },
  visibilityBtn: {
    position: 'absolute',
    right: 10,
  },
});
