import {StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from '../Utilities/Component/Helpers';
import {Colors} from '../Utilities/Component/Colors';
const styles = StyleSheet.create({
  inputview2: {
    backgroundColor: Colors.grey,
    width: screenWidth / 1.02,
    alignSelf: 'center',
    height: 105,
    justifyContent: 'space-evenly',
  },
  textinput2: {
    backgroundColor: Colors.white,
    height: 50,
    width: screenWidth / 1.1,
    alignSelf: 'center',
    borderRadius: 13,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    shadowColor: Colors.black,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 2},
  },
  titleinput2: {},
});
export default styles;
