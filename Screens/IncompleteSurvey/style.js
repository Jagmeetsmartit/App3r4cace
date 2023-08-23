import {StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from '../Utilities/Component/Helpers';
import {Colors} from '../Utilities/Component/Colors';
const styles = StyleSheet.create({
  mainview: {
    backgroundColor: Colors.white,
    width: screenWidth / 1.11,
    alignSelf: 'center',
    marginVertical: 8,
    borderRadius: 6,
    justifyContent: 'space-evenly',
    // paddingHorizontal: 10,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 0},
    height: 106,
    marginBottom: 14,
  },
  headrbtn: {
    height: 24,
    width: 90,
    alignSelf: 'center',
    marginRight: 5,
    justifyContent: 'center',
    backgroundColor: Colors.mainColor,
    borderRadius: 13,
  },
  modal: {
    backgroundColor: 'white',
    height: 60,
    justifyContent: 'space-evenly',
    borderRadius: 24,
  },
  modaltxt1: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: '600',
  },
  modaltxt2: {
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: '500',
    textAlign: 'center',
    width: screenWidth / 1.15,
  },
  modalbtn: {
    backgroundColor: Colors.mainColor,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 8,
  },
  modalbtntxt: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '500',
  },
  modal2: {
    backgroundColor: 'white',
    height: 150,
    justifyContent: 'space-evenly',
    borderRadius: 24,
    width: screenWidth / 1.1,
  },
});
export default styles;
