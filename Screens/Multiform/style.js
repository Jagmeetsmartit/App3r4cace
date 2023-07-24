import {StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from '../Utilities/Component/Helpers';
import {Colors} from '../Utilities/Component/Colors';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    width: 200,
    height: 40,
  },
  dropdown: {
    backgroundColor: '#fafafa',
  },
  dropdownItem: {
    justifyContent: 'center',
  },
  rowview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    zIndex: 1000000,
  },
  pickerbtn: {
    height: 45,
    width: screenWidth / 2.2,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  inputview2: {
    backgroundColor: Colors.grey,
    width: screenWidth / 1.02,

    height: 105,
    justifyContent: 'space-evenly',
    marginVertical: 10,
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
  dropdown: {
    backgroundColor: Colors.white,
    height: 45,
    width: screenWidth / 1.05,
    alignSelf: 'flex-start',
    borderRadius: 13,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    shadowColor: Colors.black,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 2},
    alignSelf: 'center',
    marginBottom: 8,
    paddingLeft: 20,
    // alignItems: 'center',
    borderBottomColor: Colors.black,
  },
  titleinput2: {
    marginLeft: 7,
    fontSize: 14,
    color: 'blue',
    fontWeight: '500',
    marginBottom: 10,
  },
  headrbtn: {
    height: 24,
    width: 70,
    alignSelf: 'center',
    marginRight: 10,
    justifyContent: 'center',
    backgroundColor: Colors.mainColor,
    borderRadius: 13,
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
