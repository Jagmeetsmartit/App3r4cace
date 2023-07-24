import {takeEvery, put, call} from 'redux-saga/effects';
import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL} from './constants';
import axios from 'axios';
import AsyncStorageUtil from '../Utilities/Component/AsyncStorage';
import {LoginApi} from '../Utilities/Component/api';

function* onLoginRequested({email, password, navigator}) {
  try {
    const Data = yield call(axios.post, LoginApi, {
      email: email,
      password: password,
      // device_token: devicetoken,
      // device_type: devicetype,
      // device_id: deviceid,
    });
    console.log(Data.data);
    if (Data.data.error === '0' && Data.data.status === '1') {
      yield call(AsyncStorageUtil.storelogindata, Data);
      yield put({type: LOGIN_SUCCESS});
      navigator.navigate('Home', {screen: 'Explore'});
    } else if (Data.data.error === '0' && Data.data.status === '0') {
      yield call(AsyncStorageUtil.storelogindata, Data);
      yield put({type: LOGIN_SUCCESS});
      navigator.navigate('Auth', {screen: 'MatchingQuestion'});
    } else {
      yield put({type: LOGIN_FAIL, error: Data.data.message});
    }
  } catch (error) {
    yield put({type: LOGIN_FAIL, error: 'something went wrong ! !'});
    console.log(error);
  }
}

function* sagaLogin() {
  yield takeEvery(LOGIN_REQUEST, onLoginRequested);
}
export default sagaLogin;
