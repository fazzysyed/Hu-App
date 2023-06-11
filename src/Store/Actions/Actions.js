import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';
import {GET_ALL_PROS, SET_USER, LOGOUT, APPLOADING} from './actionTypes';

export const setUser = payload => async dispatch => {
  dispatch({
    type: SET_USER,
    payload: payload,
  });
};
export const setAppLoading = payload => async dispatch => {
  dispatch({
    type: APPLOADING,
    payload: payload,
  });
};
export const getAllPros = payload => async dispatch => {
  dispatch({
    type: GET_ALL_PROS,
    payload: payload,
  });
};
export const logout = payload => async dispatch => {
  const asyncStorageKeys = await AsyncStorage.getAllKeys();
  if (asyncStorageKeys.length > 0) {
    if (Platform.OS === 'android') {
      await AsyncStorage.clear();
      dispatch({
        type: logout,
        payload: payload,
      });
    }
    if (Platform.OS === 'ios') {
      await AsyncStorage.multiRemove(asyncStorageKeys);
      dispatch({
        type: logout,
        payload: payload,
      });
    }
  }
};
