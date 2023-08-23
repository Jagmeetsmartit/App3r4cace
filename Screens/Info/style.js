import {StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from '../Utilities/Component/Helpers';
import {Colors} from '../Utilities/Component/Colors';
const styles = StyleSheet.create({
  startview: {
    height: screenHeight / 7.7,
    backgroundColor: Colors.white,
    width: screenWidth / 1.2,
    alignSelf: 'center',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 22,
    marginBottom: 20,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 0},
  },
});
export default styles;
