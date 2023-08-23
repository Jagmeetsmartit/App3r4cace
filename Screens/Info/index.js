import React from 'react';
import {View, SafeAreaView, LogBox, Text, Linking} from 'react-native';
import {
  screenWidth,
  Header2,
  screenHeight,
  TouchableComponent,
  ImageComponent,
} from '../Utilities/Component/Helpers';
// import styles from './style';
import {Colors} from '../Utilities/Component/Colors';

LogBox.ignoreAllLogs();

function Info({navigation}) {
  const handleLinkPress = () => {
    const url = 'https://3r4cace.pmis.app';
    Linking.openURL(url);
  };

  return (
    <View style={{backgroundColor: Colors.backcolor, flex: 1}}>
      <SafeAreaView>
        <Header2
          title="Information on Community Feedback"
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
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              width: screenWidth / 1.2,
              marginTop: 50,
            }}>
            <Text style={{textAlign: 'center', fontSize: 20}}>
              The project 3-R-4-CACE support unit looking for feedback on
              project activities in project implementation area. Please use this
              app to submit feedback on project activities. User can use
              Community feedback form to send feedback. Feedback should be sent
              only for activities getting covered under project 3-R-4-CACE.
              Other activities may not be responded back. For more information
              please visit site
              <Text
                style={{color: 'blue', textDecorationLine: 'underline'}}
                onPress={handleLinkPress}>
                {' '}
                https://3r4cace.pmis.app
              </Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default Info;
