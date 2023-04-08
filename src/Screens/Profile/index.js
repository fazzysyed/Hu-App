import React, {useState, useRef, useMemo, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';

import moment from 'moment';
import {showMessage, hideMessage} from 'react-native-flash-message';

import Enc from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import Layout from '../../components/Layout';
import CustomInput from '../../components/CustomInput';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import Right from 'react-native-vector-icons/Entypo';
import Business from 'react-native-vector-icons/MaterialIcons';
import SwitchWithIcons from 'react-native-switch-with-icons';
import Edit from 'react-native-vector-icons/AntDesign';
import Hours from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/Button';
import {WEEK_DAYS} from '../../Constants/WeekDays';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {getCurrentDate} from '../../Helper/GetCurrentDate';
const width = Dimensions.get('window').width;
const ProfileScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [index, setIndex] = useState('profile');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [item, setItem] = useState({});
  const [switchValue, setSwitchValue] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const [days, setDays] = useState(WEEK_DAYS);

  //Address State

  const [address, setAddress] = useState({
    country: 'Pak',
    state: 'pak',
    city: 'pak',
    zip: 2500,
    Address: 'street 120 islamabad',
  });

  const [business, setBusiness] = useState({
    name: 'business',
    url: 'url',
    about: 'about',
    public_phone: '232332',
  });
  const [fromTime, setFromTime] = useState('');
  const [whichtime, setWhichtime] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [toTime, setToTime] = useState('');
  const [notification, setNotifications] = useState(false);

  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(
    () => ['25%', index === 'hours' ? '40%' : '40%'],
    [],
  );

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  // renders

  useEffect(() => {}, []);

  const itemHandler = item => {
    setItem(item);
    setIsModalVisible(true);
    setFromTime(item.fromTime);
    setToTime(item.toTime);
  };

  const showDatePicker = item => {
    setWhichtime(item);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setWhichtime('');
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    let timeStringLocal = moment(date).format('LT'); // "10:00"

    console.log(timeStringLocal);
    if (whichtime === 'to') {
      setToTime(timeStringLocal);
    } else {
      let today = getCurrentDate();

      console.log(today);
      let date = new Date(`${today} ${toTime}`);
      let date2 = new Date(`${today} ${timeStringLocal}`);

      var startTime = new Date(date).getTime();
      var endTime = new Date(date2).getTime();
      console.log(new Date().getTime());

      if (startTime < endTime) {
        console.log('a happened before b');
        setFromTime(timeStringLocal);
      } else if (startTime > endTime) {
        console.log('a happend after b');

        showMessage({
          message: 'Alert',
          description: 'End time should be greater then start time',
          type: 'danger',
        });
      } else {
        // setFromTime(timeStringLocal);

        showMessage({
          message: 'Alert',
          description: "End time and start time couldn't be the same.",
          type: 'danger',
        });
      }
    }
    hideDatePicker();
  };
  return (
    <BottomSheetModalProvider>
      <Layout noMargin>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 15,
            borderBottomWidth: 0.3,
            backgroundColor: '#Fcfcfc',
            borderColor: 'grey',
            height: 120,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              // alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Image
              source={require('../../assets/images/placeholderimage.jpeg')}
              style={{
                width: 80,
                height: 80,
                borderRadius: 50,
                borderWidth: 2,
                borderColor: '#1C75BC',
              }}
            />
            <View
              style={{
                justifyContent: 'center',
                width: 200,
              }}>
              <Text style={styles.userName}>Faraz Syed</Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: 'grey',
                  marginHorizontal: 10,
                }}>
                Fazzy@yopmail.com
              </Text>
            </View>
          </View>
          <Right
            onPress={() => {
              setIndex('profile');
              handlePresentModalPress();
            }}
            name="chevron-right"
            size={30}
            color="grey"
          />
        </View>

        <View style={{height: 20}} />

        <TouchableOpacity style={styles.row}>
          <View style={styles.innerRow}>
            <View style={styles.iconContainer}>
              <Right name="address" color={'#FFFFFF'} size={20} />
            </View>
            <Text style={styles.settingTitle}>Address</Text>
          </View>
          <Right
            onPress={() => {
              setIndex('address');
              handlePresentModalPress();
            }}
            name="chevron-right"
            size={30}
            color="grey"
            style={{marginHorizontal: 15}}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <View style={styles.innerRow}>
            <View style={styles.iconContainer}>
              <Business name="business-center" color={'#FFFFFF'} size={20} />
            </View>
            <Text style={styles.settingTitle}>Busniess Profile</Text>
          </View>
          <Right
            onPress={() => {
              setIndex('business');
              handlePresentModalPress();
            }}
            name="chevron-right"
            size={30}
            color="grey"
            style={{marginHorizontal: 15}}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <View style={styles.innerRow}>
            <View style={styles.iconContainer}>
              <Hours name="hours-24" color={'#FFFFFF'} size={20} />
            </View>
            <Text style={styles.settingTitle}>Visiting Hours</Text>
          </View>
          <Right
            onPress={() => {
              setIndex('hours');
              handlePresentModalPress();
            }}
            name="chevron-right"
            size={30}
            color="grey"
            style={{marginHorizontal: 15}}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <View style={styles.innerRow}>
            <View style={styles.iconContainer}>
              <Edit name="notification" color={'#FFFFFF'} size={20} />
            </View>
            <Text style={styles.settingTitle}>Notifications</Text>
          </View>
          <SwitchWithIcons
            // icon = {
            //   {  true: on,
            //     false: "",}
            //   }
            trackColor={{false: '#EBEBEB', true: '#C8CFF6'}}
            thumbColor={{false: '#FFFFFF', true: '#1C75BC'}}
            //  thumbColor="white"
            value={notification}
            onValueChange={() => setNotifications(!notification)}
            style={{marginHorizontal: 20}}
          />
        </TouchableOpacity>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          {index === 'profile' && (
            <ScrollView style={styles.container}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <View style={styles.imageContainer}>
                  <TouchableOpacity style={styles.editIconContainer}>
                    <Edit name="edit" size={17} style={styles.editIcon} />
                  </TouchableOpacity>
                  <Image
                    source={require('../../assets/images/pro.png')}
                    style={[styles.profilePicture]}
                  />
                </View>
              </View>

              <CustomInput
                label={'First Name'}
                value={firstName}
                onChangeText={text => setFirstName(text)}
              />

              <CustomInput
                label={'Last Name'}
                value={lastName}
                onChangeText={text => setLastName(text)}
              />
              <CustomInput
                label={'Email'}
                value={email}
                onChangeText={text => setEmail(text)}
              />
              <CustomInput
                label={'Phone'}
                value={phone}
                onChangeText={text => setPhone(text)}
              />

              <CustomInput
                label={'Password'}
                value={password}
                onChangeText={text => setPassword(text)}
              />
              <CustomInput
                label={'Confrim Password'}
                value={confirmPassword}
                onChangeText={text => setConfirmPassword(text)}
              />

              <Button title={'Update'} />
              <View style={{height: 120}} />
            </ScrollView>
          )}

          {index === 'business' && (
            <ScrollView style={styles.container}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <View style={styles.imageContainer}>
                  <TouchableOpacity style={styles.editIconContainer}>
                    <Edit name="edit" size={17} style={styles.editIcon} />
                  </TouchableOpacity>
                  <Image
                    source={require('../../assets/images/pro.png')}
                    style={[styles.profilePicture]}
                  />
                </View>
              </View>

              <CustomInput
                label={'Business Name'}
                value={business.name}
                onChangeText={text => setBusiness({...business, name: text})}
              />

              <CustomInput
                label={'Company Url'}
                value={business.url}
                onChangeText={text => setBusiness({...business, url: text})}
              />

              <CustomInput
                label={'Public Phone'}
                value={business.public_phone}
                onChangeText={text =>
                  setBusiness({...business, public_phone: text})
                }
              />
              <CustomInput
                label={'About Business'}
                value={business.about}
                onChangeText={text => setBusiness({...business, about: text})}
              />

              <Button title={'Update'} />
              <View style={{height: 120}} />
            </ScrollView>
          )}

          {index === 'address' && (
            <View style={styles.container}>
              <View
                style={{flexDirection: 'row', justifyContent: 'center'}}></View>

              <CustomInput
                label={'Country'}
                value={address.country}
                onChangeText={text => setAddress({...address, country: text})}
              />

              <CustomInput
                label={'State'}
                value={address.state}
                onChangeText={text => setAddress({...address, state: text})}
              />
              <CustomInput
                label={'City'}
                value={address.city}
                onChangeText={text => setAddress({...address, city: text})}
              />
              <CustomInput
                label={'Address'}
                height
                value={address.Address}
                onChangeText={text => setAddress({...address, address: text})}
              />

              <Button title={'Update'} />
              <View style={{height: 120}} />
            </View>
          )}

          {index === 'hours' && (
            <View>
              <Text
                style={[styles.userName, {marginVertical: 20, fontSize: 23}]}>
                Visitng Hours
              </Text>
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                numColumns={4}
                data={days}
                style={styles.flatListStyle}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => itemHandler(item)}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 2,
                        borderColor: '#E4E4E4',
                        padding: 5,
                        backgroundColor: item.toTime ? '#1C75BC' : '#FFFFFF',
                        width: width / 4.5,
                        borderRadius: 7,
                        height: 60,
                        marginHorizontal: 2,
                        marginVertical: 5,
                        marginTop: 10,
                      }}>
                      {item.toTime ? (
                        <View
                          style={{
                            borderRadius: 50,
                            overflow: 'hidden',
                            alignSelf: 'flex-end',
                            bottom: 4,
                            left: 5,
                          }}>
                          <Enc
                            onPress={() => {
                              let newArray = [...days];
                              let change = newArray[index];
                              (change.toTime = ''), (change.fromTime = '');
                              setDays(newArray);
                              // setList1(List1);
                            }}
                            name="circle-with-cross"
                            size={20}
                            color={'#707070'}
                            style={{
                              // opacity: 1,
                              // position: 'absolute',
                              // right: 0,
                              // left: 5,
                              bottom: 0,
                              backgroundColor: '#FFFFFF',
                              // borderRadius: 50,
                              // bottom: -1,
                            }}
                          />
                        </View>
                      ) : null}
                      <Text
                        allowFontScaling={false}
                        style={{
                          color: item.toTime ? '#FFFFFF' : '#000',
                          fontFamily: 'Poppins-Regular',
                        }}>
                        {item.day}
                      </Text>
                      <Text
                        allowFontScaling={false}
                        style={{
                          fontSize: 7,
                          color: item.toTime ? '#FFFFFF' : '#000',
                          fontFamily: 'Poppins-SemiBold',
                          marginVertical: 5,
                          marginBottom: 5,
                        }}>
                        {item.toTime}-{item.fromTime}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          )}
        </BottomSheetModal>

        <View style={{}}>
          <Modal isVisible={isModalVisible}>
            <View
              style={{
                backgroundColor: '#1C75BC',
                width: '100%',
                borderWidth: 0,
                borderTopRightRadius: hp(2),
                borderTopLeftRadius: hp(2),
                borderColor: ' #1C75BC',
              }}>
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: hp(2.5),
                  color: '#fff',
                  textAlign: 'center',
                  paddingVertical: hp(2),
                  fontFamily: 'Poppins-SemiBold',
                }}>
                {'Visiting Hours For'} {item.name}
              </Text>
            </View>
            <View style={styles.viewModal}>
              <View
                style={{
                  paddingBottom: hp(2),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View />
                <View style={{flexDirection: 'row', marginVertical: 10}}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontSize: hp(2),
                      color: '#000',
                      fontFamily: 'Poppins-Regular',
                      marginHorizontal: 10,
                    }}>
                    {'Do this for all days'}
                  </Text>
                  <SwitchWithIcons
                    // icon = {
                    //   {  true: on,
                    //     false: "",}
                    //   }
                    trackColor={{false: '#EBEBEB', true: '#C8CFF6'}}
                    thumbColor={{false: '#FFFFFF', true: '#1C75BC'}}
                    //  thumbColor="white"
                    value={switchValue}
                    onValueChange={() => setSwitchValue(!switchValue)}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => showDatePicker('to')}
                    style={{alignSelf: 'center', flexDirection: 'row'}}>
                    <View
                      style={{
                        width: 40,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        height: 40,
                        marginHorizontal: 5,
                      }}>
                      <Text
                        allowFontScaling={false}
                        style={{
                          fontSize: hp(2.5),
                          color: '#000',

                          textAlign: 'center',
                        }}>
                        {toTime ? toTime.split(':')[0].trim() : '00'}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: 40,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 40,
                        borderRadius: 10,
                        marginHorizontal: 5,
                      }}>
                      <Text
                        allowFontScaling={false}
                        style={{
                          fontSize: hp(2.5),
                          color: '#000',

                          textAlign: 'center',
                        }}>
                        {toTime
                          ? toTime
                              .split(':')[1]
                              .trim()
                              .split(
                                toTime.split(':')[1].trim().includes('PM')
                                  ? 'PM'
                                  : 'AM',
                              )
                          : '00'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View>
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontSize: hp(2.5),
                      color: '#000',
                      fontFamily: 'Poppins-SemiBold',
                    }}>
                    to
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => {
                      if (toTime.length) {
                        showDatePicker('from');
                      } else {
                        showMessage({
                          message: 'Alert',
                          description: 'Please select the start time first.',
                          type: 'danger',
                        });
                      }
                    }}
                    style={{alignSelf: 'center', flexDirection: 'row'}}>
                    <View
                      style={{
                        width: 40,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        height: 40,
                        marginHorizontal: 5,
                      }}>
                      <Text
                        allowFontScaling={false}
                        style={{
                          fontSize: hp(2.5),
                          color: '#000',

                          textAlign: 'center',
                        }}>
                        {fromTime ? fromTime.split(':')[0].trim() : '00'}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: 40,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        height: 40,
                        marginHorizontal: 5,
                      }}>
                      <Text
                        allowFontScaling={false}
                        style={{
                          fontSize: hp(2.5),
                          color: '#000',

                          textAlign: 'center',
                        }}>
                        {fromTime
                          ? fromTime
                              .split(':')[1]
                              .trim()
                              .split(
                                fromTime.split(':')[1].trim().includes('PM')
                                  ? 'PM'
                                  : 'AM',
                              )
                          : '00'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              {toTime || fromTime ? (
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: hp(2.3),
                    color: '#000',
                    borderRadius: 10,
                    marginTop: 30,
                    textAlign: 'center',
                  }}>
                  {toTime} {''} to {''} {fromTime}
                </Text>
              ) : null}
              <View
                style={{
                  backgroundColor: '#ccc',
                  width: '75%',
                  height: '0.6%',
                  alignSelf: 'center',
                  marginTop: hp(2),
                  marginBottom: hp(3),
                }}></View>
              <View style={{flexDirection: 'row', marginVertical: hp(2)}}>
                <View
                  style={{
                    width: '50%',
                    borderWidth: 2,
                    borderColor: '#1C75BC',
                    borderRadius: 10,
                    backgroundColor: '#fff',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      if (item.toTime) {
                        delete item.toTime;
                        delete item.fromTime;
                        setIsModalVisible(false);
                      } else {
                        setIsModalVisible(false);
                      }
                    }}
                    style={styles.otCancel}>
                    <Text allowFontScaling={false} style={styles.textCancel}>
                      {item.toTime ? 'Clear' : 'Cancel'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: '50%',
                    alignSelf: 'center',
                    borderWidth: 1,
                    borderColor: '#1C75BC',
                    borderRadius: 10,
                    backgroundColor: '#1C75BC',
                    marginLeft: wp(4),
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      if (switchValue) {
                        if (fromTime && toTime) {
                          const newArray = [...days];
                          let selectedIds = [];
                          newArray.map(item => {
                            item.toTime = toTime;
                            item.fromTime = fromTime;
                            selectedIds.push(item.id);
                          });
                          setSelectedIds(selectedIds);

                          setDays(newArray);
                          setFromTime('');
                          setToTime('');

                          setIsModalVisible(false);
                        } else {
                          showMessage({
                            message: 'Alert',
                            description: 'Please select start and end time',
                            type: 'danger',
                          });
                        }
                      } else {
                        if (fromTime && toTime) {
                          const newArray = [...days];
                          let objIndex = newArray.findIndex(
                            obj => obj.id === item.id,
                          );

                          newArray[objIndex].toTime = toTime;
                          newArray[objIndex].fromTime = fromTime;
                          setDays(newArray);
                          setFromTime('');
                          setToTime('');
                          // handleSelectionMultiple(item);
                          setIsModalVisible(false);
                        } else {
                          showMessage({
                            message: 'Alert',
                            description: 'Please select start and end time',
                            type: 'danger',
                          });
                        }
                      }
                    }}
                    style={styles.otCancel}>
                    <Text allowFontScaling={false} style={styles.textCancel1}>
                      {'Add'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="time"
                onConfirm={handleConfirm}
                date={moment('2000-01-01T20:00:00').toDate()}
                onCancel={hideDatePicker}
              />
            </View>
          </Modal>
        </View>
      </Layout>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    // padding: 20,
    // flex: 1,
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  editIconContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    width: 20,
    height: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  inputContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  imageContainer: {
    height: 140,
    width: 140,
    backgroundColor: '#d3d3d3',
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 100,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 10,
    // margin: 10,
  },
  innerImageContainer: {
    height: 100,
    width: 100,
    backgroundColor: '#d3d3d3',
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 10,
    // margin: 10,
  },
  userName: {
    marginBottom: 2,
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: 'grey',
    marginHorizontal: 10,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C75BC',
    height: 40,
    width: 40,
    borderRadius: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.2,
    borderColor: 'grey',
    marginBottom: 5,
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 7,
  },
  settingTitle: {
    fontFamily: 'Poppins-Regular',
    color: 'grey',
    fontSize: 16,
    marginHorizontal: 20,
  },
  textCancel: {
    fontSize: hp(2.4),
    fontWeight: '700',
    textAlign: 'center',
    color: '#1C75BC',
    paddingVertical: hp(2),
  },
  textCancel1: {
    fontSize: hp(2.4),
    fontWeight: '700',
    textAlign: 'center',
    color: '#fff',
    paddingVertical: hp(2),
  },
  otCancel: {
    // backgroundColor: 'red',
    elevation: 2,
  },
  viewModal: {
    backgroundColor: '#fff',
    paddingHorizontal: wp(6),
    // paddingVertical: hp(3),
    // height:200,
    width: '100%',
    alignSelf: 'center',
  },
  flatListStyle: {marginTop: 15},
});

export default ProfileScreen;
