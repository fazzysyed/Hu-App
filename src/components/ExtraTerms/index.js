import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Input} from 'react-native-elements';

const index = ({
  isModalVisible,
  onCancel,
  onSuccess,
  note,
  setNote,

  noteError,
  loading,
}) => {
  return (
    <Modal isVisible={isModalVisible}>
      <View style={styles.viewModal}>
        <View style={styles.textModal1}>
          <View style={{marginHorizontal: 10}} />
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: 'Poppins-SemiBold',
              color: '#FFFFFF',
              fontSize: 20,
            }}>
            {'Additional Terms'}
          </Text>

          <AntDesign
            color={'#FFFFFF'}
            name="closecircle"
            size={25}
            onPress={() => {
              onCancel();
            }}
            style={{marginHorizontal: 10}}
          />
        </View>
        <View>
          <>
            <View
              style={{
                marginTop: hp(2),
                width: '100%',
                alignSelf: 'center',
              }}>
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: hp(1.8),
                  color: '#000',
                  fontFamily: 'Poppins-SemiBold',
                  marginHorizontal: 10,
                }}>
                {'Terms'}
              </Text>
              <Input
                errorMessage={noteError}
                errorStyle={{top: 30, fontSize: 10}}
                value={note}
                placeholder="Optional"
                // maxLength={6}
                onChangeText={text => setNote(text)}
                inputContainerStyle={{
                  borderBottomWidth: 0,
                  marginBottom: -30,
                }}
                style={{
                  color: '#000',
                  padding: 10,
                  height: 100,
                  borderWidth: 1,
                  borderRadius: 8,
                  borderColor: '#E4E4E4',
                  marginTop: 10,
                  fontSize: hp(1.8),
                  textAlignVertical: 'top',
                }}
              />
            </View>
          </>
        </View>

        <TouchableOpacity style={styles.otCancel} onPress={onSuccess}>
          {loading ? (
            <ActivityIndicator color={'#FFFFFF'} />
          ) : (
            <Text allowFontScaling={false} style={styles.textCancel}>
              {'Done'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default index;

const styles = StyleSheet.create({
  viewModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    // paddingHorizontal: wp(6),
    // marginTop: hp(10),
    // paddingVertical: hp(3),
  },
  textModal2: {
    fontSize: hp(2.2),
    color: '#000',
    marginVertical: hp(0.5),
    fontFamily: 'Poppins-SemiBold',
  },
  textModal3: {
    fontSize: hp(2.4),
    color: '#1C75BC',

    fontFamily: 'Poppins-SemiBold',
  },
  textModal1: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
    backgroundColor: '#1C75BC',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    flexDirection: 'row',

    borderColor: '#1C75BC',
  },
  textCancel: {
    fontSize: hp(2),
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  textCancel1: {
    fontSize: hp(2),

    fontFamily: 'Poppins-Regular',

    textAlign: 'center',
    color: '#fff',
  },
  otCancel: {
    // backgroundColor: 'red',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    width: '50%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#1C75BC',
    borderRadius: 5,
    backgroundColor: '#1C75BC',
  },
});
