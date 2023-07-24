import React from 'react';
import {View, SafeAreaView, LogBox} from 'react-native';
import {
  screenWidth,
  Header2,
  screenHeight,
} from '../Utilities/Component/Helpers';
import styles from './style';
import {Colors} from '../Utilities/Component/Colors';

LogBox.ignoreAllLogs();

function CompleteSurvey({navigation}) {
  return (
    <View style={{backgroundColor: Colors.backcolor, flex: 1}}>
      <SafeAreaView>
        <Header2
          title="Complete Survey"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View
          style={{
            width: screenWidth / 1.05,
            height: screenHeight / 1.32,
            backgroundColor: Colors.Background,
            alignSelf: 'center',
            borderRadius: 6,
            paddingTop: 10,
          }}></View>
      </SafeAreaView>
    </View>
  );
}

export default CompleteSurvey;
