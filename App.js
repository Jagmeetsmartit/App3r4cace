import React from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from './Screens/SignIn';
import Survey from './Screens/Surveys';
import Loading from './Screens/Loading';
import SurveyList from './Screens/SurveyList';
import CompleteSurvey from './Screens/CompleteSurvey';
import IncompleteSurvey from './Screens/IncompleteSurvey';
import MemberSurvey from './Screens/MemberSurvey';
import Multiform from './Screens/Multiform';
import PatientSurvey from './Screens/PatientSurvey';
import EditSurvey from './Screens/EditSurvey';
import EditForm from './Screens/EditForm';
//Redux saga
import createSagaMiddleware from 'redux-saga';

import {legacy_createStore as createStore, applyMiddleware} from 'redux';

import allReducers from './reducers';
LogBox.ignoreAllLogs();
const Stack = createNativeStackNavigator();

const sagaMiddleware = createSagaMiddleware();
let store = createStore(allReducers, applyMiddleware(sagaMiddleware));
const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Loading"
            component={Loading}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Surveys"
            component={Survey}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SurveyList"
            component={SurveyList}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CompleteSurvey"
            component={CompleteSurvey}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="IncompleteSurvey"
            component={IncompleteSurvey}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MemberSurvey"
            component={MemberSurvey}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Multiform"
            component={Multiform}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="EditForm"
            component={EditForm}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PatientSurvey"
            component={PatientSurvey}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="EditSurvey"
            component={EditSurvey}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
