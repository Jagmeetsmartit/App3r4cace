import React from 'react';
import {View, SafeAreaView, LogBox, Text} from 'react-native';
import {
  screenWidth,
  Header2,
  screenHeight,
  TouchableComponent,
  ImageComponent,
} from '../Utilities/Component/Helpers';
import styles from './style';
import {Colors} from '../Utilities/Component/Colors';
import Modal from 'react-native-modal';
LogBox.ignoreAllLogs();

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
            <Text style={styles.modalbtntxt}>Okay</Text>
          </TouchableComponent>
        </View>
      </View>
    </Modal>
  );
};
function CompleteSurvey({navigation}) {
  const [modal, setModal] = React.useState(false);
  return (
    <View style={{backgroundColor: Colors.backcolor, flex: 1}}>
      <SafeAreaView>
        <Header2
          title=""
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
          <TouchableComponent
            style={styles.startview}
            onPress={() => {
              navigation.navigate('Info');
            }}>
            <ImageComponent
              source={require('../Utilities/Images/info.png')}
              style={{width: 50, height: 50}}
            />
            <Text style={{fontSize: 18}}>
              Information on Community Feedback{' '}
            </Text>
          </TouchableComponent>
          <TouchableComponent
            style={styles.startview}
            onPress={() => {
              navigation.navigate('Feedback');
            }}>
            <ImageComponent
              source={require('../Utilities/Images/feed.png')}
              style={{width: 50, height: 50}}
            />
            <Text style={{fontSize: 18}}>Community Feedback</Text>
          </TouchableComponent>
          <TouchableComponent
            style={styles.startview}
            onPress={() => {
              setModal(true);
            }}>
            <ImageComponent
              source={require('../Utilities/Images/res.png')}
              style={{width: 50, height: 50}}
            />
            <Text style={{fontSize: 18}}>Response from Project Team</Text>
          </TouchableComponent>
        </View>
        <Modl
          isVisible={modal}
          onyespress={() => {
            setModal(false);
          }}
          Title={
            'No response received for your feedback as of now please check again. '
          }
        />
      </SafeAreaView>
    </View>
  );
}

export default CompleteSurvey;
