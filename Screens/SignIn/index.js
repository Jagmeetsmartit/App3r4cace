import React, {useState} from 'react';
import {View, SafeAreaView, Platform} from 'react-native';
import {
  CommonInput,
  AppText,
  TextBtncomponent,
  Loadingcomponent,
  ImageComponent,
  screenWidth,
  screenHeight,
} from '../Utilities/Component/Helpers';
import styles from './style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors} from '../Utilities/Component/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SignIn(props) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [showpass, setShowpass] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const validation = () => {
    let error = {};
    if (email === '') {
      error.mail = 'Email Is Required';
    } else if (emailPattern.test(email) === false) {
      error.mail = 'Email is Invalid';
    }
    if (pass === '') {
      error.pass = 'Password Is Required';
    } else if (pass.length < 6) {
      error.pass = 'Password must contain at least 6 characters';
    }
    if (Object.keys(error).length === 0) {
      submit();
    }
    return error;
  };

  const OnSubmit = () => {
    setError(validation());
  };

  const submit = () => {
    setLoading(true);
    var formdata = new FormData();
    formdata.append('email', email);
    formdata.append('password', pass);
    formdata.append('key', 'HV0fO#$%986TRU2AhNgw=');

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch('https://3r4cace.pmis.app:1837/api/auth/signin', requestOptions)
      .then(response => response.json())
      .then(async result => {
        setLoading(false);
        if (result?.[0] !== undefined) {
          await AsyncStorage.setItem('token', result[0].accessToken);
          await AsyncStorage.setItem('Id', String(result[0].id));
          await AsyncStorage.setItem('n_gp', String(result[0].n_gp));
          await AsyncStorage.setItem('email', email);
          await AsyncStorage.setItem('password', pass);
          props.navigation.navigate('Surveys');
        } else {
          alert(result.message);
        }
      })
      .catch(async error => {
        setLoading(false);
        if (error.toString().includes('Network request failed') === true) {
          let em = await AsyncStorage.getItem('email');
          let pw = await AsyncStorage.getItem('password');
          if (em === email && pw === pass) {
            props.navigation.navigate('Surveys');
          } else {
            alert('unauthorised');
          }
        }
        console.log('error', error);
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
                width: screenWidth / 3,
                height: screenWidth / 2.8,
                alignSelf: 'center',
                resizeMode: 'contain',
                marginBottom: 25,
                // backgroundColor: 'white',

                marginTop: Platform.OS === 'android' ? 30 : 20,
              }}
            />
            <View
              style={{
                width: screenWidth / 1.05,
                height: screenHeight / 1.28,
                backgroundColor: Colors.Background,
                alignSelf: 'center',
                borderRadius: 6,
                paddingTop: 10,
              }}>
              <AppText style={styles.btntxt}>Sign in to account</AppText>
              <View style={styles.sub}>
                <CommonInput
                  label="Email"
                  onChangeText={text => {
                    setEmail(text), setError('');
                  }}
                  value={email}
                  error={error.mail}
                  placeholder={'Enter Email'}
                />
                <CommonInput
                  label="Password"
                  onChangeText={text => {
                    setPass(text), setError('');
                  }}
                  value={pass}
                  error={error.pass}
                  placeholder={'Enter Password'}
                  secureTextEntry={showpass}
                  eye={'YES'}
                  eyename={showpass ? 'eye-off' : 'eye'}
                  iconcolor={showpass ? Colors.icons : Colors.black}
                  hidepass={() => {
                    setShowpass(!showpass);
                  }}
                />
              </View>
              <TextBtncomponent
                title={'LOGIN'}
                onPress={() => {
                  OnSubmit();
                }}></TextBtncomponent>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default SignIn;
