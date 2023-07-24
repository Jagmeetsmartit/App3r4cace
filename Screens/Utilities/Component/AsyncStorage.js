import AsyncStorage from '@react-native-async-storage/async-storage';

class AsyncStorageUtil {
  static async clear() {
    AsyncStorage.clear();
  }

  static async storelogindata(Data) {
    const log = ['Token', Data.data.data];
    const one = ['status', Data.data.status];
    const two = ['userid', Data.data.userid];
    const three = ['profilepic', Data.data.profile_pic];
    const four = ['name', Data.data.name];
    try {
      await AsyncStorage.multiSet([log, one, two, three, four]);
    } catch (e) {
      // saving error
    }
  }

  static async storeregisterdata(Data) {
    const login = ['Token', Data.data.token];
    const one = ['status', Data.data.user_profile.status];
    const two = ['userid', Data.data.user_profile.userid];
    const three = ['profilepic', Data.data.user_profile.profile_pic];
    const four = ['name', Data.data.user_profile.name];
    try {
      await AsyncStorage.multiSet([login, one, two, three, four]);
    } catch (e) {
      // saving error
    }
  }

  static async updatestageone(Data) {
    const ups = ['status', Data.data.status];
    try {
      await AsyncStorage.multiSet([ups]);
    } catch (e) {
      // saving error
    }
  }
  static async updatestageone1(Data) {
    const count = ['countStatus', Data];
    try {
      await AsyncStorage.multiSet([count]);
    } catch (e) {
      // saving error
    }
  }
  static async updateProfilepic(Data) {
    const ups = ['profilepic', Data];
    try {
      await AsyncStorage.multiSet([ups]);
    } catch (e) {
      // saving error
    }
  }
  static async updateusername(Data) {
    const ups = ['name', Data];
    try {
      await AsyncStorage.multiSet([ups]);
    } catch (e) {
      // saving error
    }
  }
}

export default AsyncStorageUtil;
