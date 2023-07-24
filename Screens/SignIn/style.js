import {StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from '../Utilities/Component/Helpers';
import {Colors} from '../Utilities/Component/Colors';
const styles = StyleSheet.create({
  btntxt: {
    // fontFamily: 'SFProDisplay-Regular',
    marginLeft: 25,
    marginTop: 20,
    color: 'black',
    fontWeight: '600',
    fontSize: 20,
  },

  bottom: {
    height: 40,
    top: 10,
    alignSelf: 'center',
    borderRadius: 5,
    width: screenWidth / 1.15,
    backgroundColor: '#0047ab',
    justifyContent: 'center',
    marginBottom: 10,
  },
  safe: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.baseColor,
  },
  sub: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 40,
    width: screenWidth,
    justifyContent: 'center',
    marginBottom: screenHeight / 25,
  },
});
export default styles;
