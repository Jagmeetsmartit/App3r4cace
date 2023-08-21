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
  titleinput2: {
    marginLeft: 7,
    fontSize: 14,
    color: 'blue',
    fontWeight: '500',
    marginBottom: 10,
  },
  textinput2: {
    backgroundColor: Colors.white,
    height: 43,
    width: screenWidth / 1.15,
    alignSelf: 'center',
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
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
