import React from 'react';
import {SafeAreaView} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from '../Utilities/Component/Colors';
import {useFocusEffect} from '@react-navigation/native';
import {
  AppText,
  ImageComponent,
  screenWidth,
  TouchableComponent,
  screenHeight,
} from '../Utilities/Component/Helpers';
function Loading({navigation}) {
  useFocusEffect(
    React.useCallback(() => {
      // checkdata();
      setTimeout(() => {
        SplashScreen.hide();
      }, 1000);
      return () => {};
    }, []),
  );

  const checkdata = async () => {
    try {
      let tk = await AsyncStorage.getItem('token');
      if (tk !== null) {
        navigation.navigate('Surveys');
      } else {
        navigation.navigate('SignIn');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableComponent
        onPress={() => {
          checkdata();
        }}>
        <ImageComponent
          source={require('../Utilities/Images/logoo.png')}
          style={{
            width: screenWidth / 2.2,
            height: 200,
            marginTop: screenHeight / 5,
            alignSelf: 'center',
            resizeMode: 'contain',
          }}></ImageComponent>
        <AppText
          style={{
            color: 'black',
            fontSize: 30,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 30,
          }}>
          3r4cace
        </AppText>
      </TouchableComponent>
      <TouchableComponent
        onPress={() => {
          checkdata();
        }}
        style={{
          height: 45,
          marginTop: screenHeight / 6,
          alignSelf: 'center',
          borderRadius: 24,
          width: screenWidth / 1.2,
          backgroundColor: Colors.backcolor,
          justifyContent: 'center',
          marginBottom: 10,
        }}
        activeOpacity={1}>
        <AppText
          style={{
            color: 'white',
            // fontFamily: 'SFProDisplay-Regular',
            textAlign: 'center',
            fontSize: 18,
          }}>
          User Login
        </AppText>
      </TouchableComponent>
      <TouchableComponent
        onPress={() => {
          navigation.navigate('CompleteSurvey');
        }}
        style={{
          height: 45,
          marginTop: 40,
          alignSelf: 'center',
          borderRadius: 24,
          width: screenWidth / 1.2,
          backgroundColor: Colors.backcolor,
          justifyContent: 'center',
          marginBottom: 10,
        }}
        activeOpacity={1}>
        <AppText
          style={{
            color: 'white',
            // fontFamily: 'SFProDisplay-Regular',
            textAlign: 'center',
            fontSize: 18,
          }}>
          Community Feedback
        </AppText>
      </TouchableComponent>
    </SafeAreaView>
  );
}

export default Loading;
