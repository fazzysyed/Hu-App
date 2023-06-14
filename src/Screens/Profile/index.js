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
  Platform,
  ActivityIndicator,
} from 'react-native';
import mime from 'mime';
import CustomLabel from '../../components/Label';

import MultiSlider from '@ptomasroos/react-native-multi-slider';

import {launchImageLibrary} from 'react-native-image-picker';

import DropDownPicker from 'react-native-dropdown-picker';

import Icon from 'react-native-vector-icons/AntDesign';
import License from 'react-native-vector-icons/FontAwesome';

import moment from 'moment';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {useFocusEffect} from '@react-navigation/native';

import Enc from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import Layout from '../../components/Layout';
import CustomInput from '../../components/CustomInput';
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
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
import {handleAPIRequest} from '../../Helper/ApiHandler';
import {validatePassword} from '../../Helper/Vilidator';
import {useSelector} from 'react-redux';
import AnimatedLoader from '../../components/Loader';
import axios from 'axios';
const width = Dimensions.get('window').width;

const licenseData = [
  {id: '1', type: 'Type 1', number: '12345', state: 'Active'},
  {id: '2', type: 'Type 2', number: '67890', state: 'Inactive'},
  {id: '3', type: 'Type 3', number: '24680', state: 'Active'},
  {id: '4', type: 'Type 4', number: '13579', state: 'Inactive'},
];
const ProfileScreen = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [index, setIndex] = useState('profile');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addLicense, setAddLicense] = useState(false);
  const [item, setItem] = useState({});
  const [switchValue, setSwitchValue] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const user = useSelector(state => state.Reducer.user);
  const [profileLoading, setProfileLoading] = useState(false);

  const [licenses, setLicenses] = useState(licenseData);

  const [days, setDays] = useState(WEEK_DAYS);
  const [preferences, setPreferences] = useState({
    hourly_rate: '',
    daily_rate: '',
    radius: '',
  });
  //Address State

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [items, setItems] = useState([
    {label: 'faraz', value: 'faraz'},
    {label: 'mathew', value: 'mathew'},
  ]);

  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState('');
  const [items1, setItems1] = useState([
    {label: 'faraz', value: 'faraz'},
    {label: 'mathew', value: 'mathew'},
  ]);

  const [address, setAddress] = useState({
    country: '',
    state: '',
    city: '',
    zip: '',
    address_1: '',
    address_2: '',
    type: 'mailing',
    uuid: '',
  });

  const [business, setBusiness] = useState({
    name: '',
    url: '',
    about: '',
    public_phone: '',
    bus_logo: '',
  });
  const [fromTime, setFromTime] = useState('');
  const [whichtime, setWhichtime] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [toTime, setToTime] = useState('');
  const [notification, setNotifications] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [profileImage, setProfileImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [businessLoading, setBusinessLoading] = useState(false);
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '95%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  const AddLicenseHandler = () => {
    // handleAPIRequest('get', `user`, {
    //   'license_type' : value,
    //   'license_state' :$request->license_state,
    //   'license_id'=>$request->license_id,
    // }).then((response)=>{
    //   Alert.alert(response)
    // })
  };

  // renders

  const renderItem = ({item}) => (
    <View
      style={{
        borderWidth: 0.5,
        padding: 10,
        marginHorizontal: 10,
        borderColor: '#ccc',
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
      }}>
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.heading}>Type:</Text>
          <Text numberOfLines={3} style={styles.subHeading}>
            {item.type}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.heading}>Number:</Text>
          <Text style={styles.subHeading}>{item.number}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.heading}>State:</Text>
          <Text style={styles.subHeading}>{item.state}</Text>
        </View>
      </View>
      <View
        style={{
          alignSelf: 'flex-end',
          flexDirection: 'row',
          marginBottom: 5,
        }}>
        <Icon name="edit" size={24} color="#1C75BC" style={{marginRight: 16}} />
        <Icon name="delete" size={24} color="red" />
      </View>
    </View>
  );

  const businessProfileHandler = () => {
    setLoading(true);
    handleAPIRequest('post', `bus-profile`, {
      company_name: business.name,
      about: business.about,
      website_url: business.url,
      public_phone: business.public_phone,
    }).then(response => {
      if (response === 'success') {
        setLoading(false);
        showMessage({
          message: 'Success',
          description: 'Business profile updated successfully',
          type: 'success',
        });
      }
      setLoading(false);
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      handleAPIRequest('get', `user`, null)
        .then(response => {
          if (response) {
            // dispatch(getAllPros(response));
            setUserProfile(response.user.profile);

            if (response.user.profile.type === 'pro') {
              setDays(
                response.user.profile.pro_profile
                  ? response.user.profile.pro_profile.working_hours
                  : days,
              );
              setPreferences({
                radius: response.user.profile.pro_profile.radius.toString(),
                hourly_rate:
                  response.user.profile.pro_profile.hourly_rate.toString(),
                daily_rate:
                  response.user.profile.pro_profile.daily_rate.toString(),
              });
            } else {
              setBusiness({
                name: response.user.profile.bus_profile.company_name,
                url: response.user.profile.bus_profile.website_url,
                about: response.user.profile.bus_profile.about,
                public_phone: response.user.profile.bus_profile.public_phone,
                bus_logo: response.user.profile.bus_profile.logo_url,
              });
            }

            setLoading(false);

            // AsyncStorage.setItem('User', JSON.stringify(response.user));
          }
        })
        .catch(e => {
          console.log(e);
          setLoading(false);
        });
    }, []),
  );

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

  const proProfileHandler = () => {
    handleAPIRequest('post', `pro-profile`, {
      ...preferences,
      working_hours: days,
    }).then(response => {
      Alert.alert(response);
    });
  };

  useEffect(() => {
    const updatePasswordErrMessage = async () => {
      if (password.length && !validatePassword(password)) {
        setPasswordError(
          'Your password must be more than 8 characters long, should contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
        );
        return null;
      }
      setPasswordError('');
      return null;
    };
    updatePasswordErrMessage();
  }, [password]);

  useEffect(() => {
    const updatePasswordErrMessage = async () => {
      if (password != confirmPassword && confirmPassword.length != 7) {
        setPasswordError(
          `The confirmed password does not match the new password`,
        );
        return null;
      }
      setPasswordError('');
      return null;
    };
    updatePasswordErrMessage();
  }, [confirmPassword]);

  const updateProfile = () => {
    setLoading(true);
    handleAPIRequest(
      'put',
      `user`,
      password
        ? {
            firtname: firstName,
            email: email,
            password: password,
            lastname: lastName,
          }
        : {
            firtname: firstName,
            email: email,

            lastname: lastName,
          },
    )
      .then(response => {
        if (response) {
          console.warn(response);
          // setUserProfile(response.data);
          // dispatch(getAllPros(response));
          setLoading(false);

          // AsyncStorage.setItem('User', JSON.stringify(response.user));
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleProfileImage = async () => {
    launchImageLibrary({noData: true, quality: 0.2}, async response => {
      if (response.didCancel) {
        console.log('Image picker cancelled');
      } else if (response.error) {
        console.log('Image picker error:', response.error);
      } else {
        setProfileLoading(true);
        setProfileImage(response.assets[0].uri);

        const uri =
          Platform.OS === 'android'
            ? response.assets[0].uri
            : response.assets[0].uri.replace('file://', '');
        const filename = response.assets[0].uri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename);
        const ext = match?.[1];
        const type = match ? `image/${match[1]}` : `image`;
        const formData = new FormData();
        formData.append('image', {
          uri,
          name: `image.${ext}`,
          type,
        });
        try {
          const {data} = await axios.post(
            `https://app.healthcare-up.com/api/v1/user-photo`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${user.token}`,
              },
            },
          );
          if (!data.isSuccess) {
            setProfileLoading(false);
            showMessage({
              message: 'Alert',
              description: 'Image not uploaded.',
              type: 'danger',
            });

            return;
          }
          setProfileLoading(false);
          showMessage({
            message: 'success',
            description: 'profile picture updated',
            type: 'success',
          });
        } catch (err) {
          console.log(err);
          showMessage({
            message: 'Alert',
            description: 'Image not uploaded.',
            type: 'danger',
          });
          setProfileLoading(false);
        } finally {
          // setSelectedImage(undefined);
        }
      }
    });
  };

  const handleBusinessProfile = () => {
    launchImageLibrary({noData: true, quality: 0.2}, async response => {
      if (response.didCancel) {
        console.log('Image picker cancelled');
      } else if (response.error) {
        console.log('Image picker error:', response.error);
      } else {
        setBusinessLoading(true);

        const uri =
          Platform.OS === 'android'
            ? response.assets[0].uri
            : response.assets[0].uri.replace('file://', '');
        const filename = response.assets[0].uri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename);
        const ext = match?.[1];
        const type = match ? `image/${match[1]}` : `image`;
        const formData = new FormData();
        formData.append('image', {
          uri,
          name: `image.${ext}`,
          type,
        });
        try {
          const {data} = await axios.post(
            `https://app.healthcare-up.com/api/v1/bus-logo`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${user.token}`,
              },
            },
          );
          if (!data.isSuccess) {
            setBusinessLoading(false);
            showMessage({
              message: 'Alert',
              description: 'Image not uploaded.',
              type: 'danger',
            });

            return;
          }
          setBusiness({...business, bus_logo: data.url});
          setBusinessLoading(false);
          showMessage({
            message: 'Success',
            description: 'Image uploaded successfully.',
            type: 'success',
          });
        } catch (err) {
          console.log(err);
          showMessage({
            message: 'Alert',
            description: 'Image not uploaded.',
            type: 'danger',
          });
          setBusinessLoading(false);
        } finally {
          // setSelectedImage(undefined);
        }
      }
    });
  };
  const createAddress = () => {
    console.warn(address);
    handleAPIRequest('post', `address`, address)
      .then(response => {
        Alert.alert('Done');
      })
      .catch(e => console.log(e));
  };

  const updateAddress = () => {
    handleAPIRequest('put', `address/${address.uuid}`, address)
      .then(response => {
        Alert.alert(JSON.stringify(response));
      })
      .catch(e => console.log(e));
  };
  return (
    <BottomSheetModalProvider>
      <Layout noMargin>
        {userProfile && (
          <>
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
                  source={
                    userProfile.photo_url
                      ? {uri: userProfile.photo_url}
                      : require('../../assets/images/placeholderimage.jpeg')
                  }
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
                  <Text
                    style={
                      styles.userName
                    }>{`${userProfile.firstname} ${userProfile.lastname}`}</Text>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: 'grey',
                      marginHorizontal: 10,
                    }}>
                    {userProfile.email}
                  </Text>
                </View>
              </View>
              <Right
                onPress={() => {
                  setIndex('profile');

                  setFirstName(userProfile.firstname);
                  setLastName(userProfile.lastname);
                  setEmail(userProfile.email);
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
                  // navigation.navigate('address', {
                  //   addresses: userProfile.addresses,
                  // });
                }}
                name="chevron-right"
                size={30}
                color="grey"
                style={{marginHorizontal: 15}}
              />
            </TouchableOpacity>

            {userProfile.type === 'bus' && (
              <TouchableOpacity style={styles.row}>
                <View style={styles.innerRow}>
                  <View style={styles.iconContainer}>
                    <Business
                      name="business-center"
                      color={'#FFFFFF'}
                      size={20}
                    />
                  </View>
                  <Text style={styles.settingTitle}>Business Profile</Text>
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
            )}

            {userProfile.type === 'pro' && (
              <TouchableOpacity style={styles.row}>
                <View style={styles.innerRow}>
                  <View style={styles.iconContainer}>
                    <Hours name="hours-24" color={'#FFFFFF'} size={20} />
                  </View>
                  <Text style={styles.settingTitle}>Job Preferences</Text>
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
            )}

            {userProfile.type === 'pro' && (
              <TouchableOpacity style={styles.row}>
                <View style={styles.innerRow}>
                  <View style={styles.iconContainer}>
                    <License
                      name="drivers-license"
                      color={'#FFFFFF'}
                      size={20}
                    />
                  </View>
                  <Text style={styles.settingTitle}>My Linceses</Text>
                </View>
                <Right
                  onPress={() => {
                    setIndex('licenses');
                    handlePresentModalPress();
                  }}
                  name="chevron-right"
                  size={30}
                  color="grey"
                  style={{marginHorizontal: 15}}
                />
              </TouchableOpacity>
            )}

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
              enableContentPanningGesture={false}
              ref={bottomSheetModalRef}
              index={1}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}>
              {index === 'profile' && (
                <ScrollView style={styles.container}>
                  <View
                    style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <View style={styles.imageContainer}>
                      <TouchableOpacity
                        onPress={handleProfileImage}
                        style={styles.editIconContainer}>
                        <Edit name="edit" size={17} style={styles.editIcon} />
                      </TouchableOpacity>
                      {profileLoading ? (
                        <ActivityIndicator
                          style={styles.loader}
                          size="small"
                          color="#000000"
                        />
                      ) : (
                        <Image
                          source={
                            profileImage
                              ? {uri: profileImage}
                              : require('../../assets/images/pro.png')
                          }
                          style={styles.profilePicture}
                        />
                      )}
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
                  {/* <CustomInput
                    label={'Phone'}
                    value={phone}
                    onChangeText={text => setPhone(text)}
                  /> */}

                  <CustomInput
                    secureTextEntry
                    label={'Password'}
                    value={password}
                    onChangeText={text => setPassword(text)}
                  />
                  <CustomInput
                    secureTextEntry
                    errorMessage={passwordError}
                    label={'Confrim Password'}
                    value={confirmPassword}
                    onChangeText={text => setConfirmPassword(text)}
                  />

                  <Button title={'Update'} onPress={updateProfile} />
                  <View style={{height: 120}} />
                </ScrollView>
              )}

              <>
                {index === 'business' && (
                  <ScrollView style={styles.container}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}>
                      <View style={styles.imageContainer}>
                        <TouchableOpacity
                          onPress={handleBusinessProfile}
                          style={styles.editIconContainer}>
                          <Edit name="edit" size={17} style={styles.editIcon} />
                        </TouchableOpacity>
                        {businessLoading ? (
                          <ActivityIndicator
                            style={styles.loader}
                            size="small"
                            color="#000000"
                          />
                        ) : (
                          <Image
                            source={
                              business.bus_logo
                                ? {uri: business.bus_logo}
                                : require('../../assets/images/pro.png')
                            }
                            style={styles.profilePicture}
                          />
                        )}
                      </View>
                    </View>

                    <CustomInput
                      label={'Business Name'}
                      value={business.name}
                      onChangeText={text =>
                        setBusiness({...business, name: text})
                      }
                    />

                    <CustomInput
                      label={'Company Url'}
                      value={business.url}
                      onChangeText={text =>
                        setBusiness({...business, url: text})
                      }
                    />

                    <CustomInput
                      label={'Public Phone'}
                      keyboardType={'number-pad'}
                      value={business.public_phone}
                      onChangeText={text =>
                        setBusiness({...business, public_phone: text})
                      }
                    />
                    <CustomInput
                      label={'About Business'}
                      value={business.about}
                      onChangeText={text =>
                        setBusiness({...business, about: text})
                      }
                    />

                    <Button title={'Update'} onPress={businessProfileHandler} />
                    <View style={{height: 120}} />
                  </ScrollView>
                )}
              </>

              {index === 'address' && (
                <View style={{flex: 1}}>
                  <Text
                    style={[
                      styles.userName,
                      {marginVertical: 20, fontSize: 23},
                    ]}>
                    Addresses
                  </Text>
                  <BottomSheetFlatList
                    data={userProfile.addresses}
                    ListFooterComponent={() => <View style={{height: 50}} />}
                    style={{height: 400}}
                    renderItem={({item}) => (
                      <View
                        style={{
                          borderWidth: 0.5,
                          padding: 6,
                          marginHorizontal: 15,
                          borderColor: '#ccc',
                          borderRadius: 6,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginVertical: 10,
                        }}>
                        <View style={{width: '90%'}}>
                          <View style={{}}>
                            <Text style={styles.heading}>Address 1:</Text>
                            <Text style={[styles.subHeading]}>
                              {item.address_1}
                            </Text>
                          </View>
                          {item.address_2 ? (
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <Text style={styles.heading}>Address 2:</Text>
                              <Text style={styles.subHeading}>
                                {item.address_2}
                              </Text>
                            </View>
                          ) : null}
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text style={[styles.heading, {width: undefined}]}>
                              City:
                            </Text>
                            <Text style={styles.subHeading}>{item.city}</Text>
                          </View>

                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text style={[styles.heading, {width: undefined}]}>
                              State:
                            </Text>
                            <Text style={styles.subHeading}>{item.state}</Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text style={styles.heading}>Zip:</Text>
                            <Text style={styles.subHeading}>{item.zip}</Text>
                          </View>
                        </View>
                        <View
                          style={{
                            alignSelf: 'flex-start',
                            flexDirection: 'row',
                            marginBottom: 5,
                          }}>
                          <Icon
                            name="edit"
                            size={22}
                            color="#1C75BC"
                            onPress={() => {
                              setIndex('updateAddress');
                              // console.warn(item);

                              setAddress({
                                city: item.city,
                                address_1: item.address_1,
                                address_2: item.address_2,
                                state: item.state,
                                zip: item.zip,
                                uuid: item.uuid,
                                type: item.type,
                                country: item.country,
                              });
                            }}
                            // style={{marginRight: 16}}
                          />
                        </View>
                      </View>
                    )}
                  />
                  <View style={{bottom: 40}}>
                    <Button
                      title={'Add New'}
                      onPress={() => {
                        setIndex('createAddress');
                      }}
                    />
                  </View>
                </View>
              )}

              {index === 'updateAddress' && (
                <ScrollView style={styles.container}>
                  {/* <CustomInput
                    label={'Country'}
                    value={address.country}
                    onChangeText={text =>
                      setAddress({...address, country: text})
                    }
                  /> */}

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
                    keyboardType="number-pad"
                    label={'Zip'}
                    value={address.zip}
                    onChangeText={text => setAddress({...address, zip: text})}
                  />
                  <CustomInput
                    label={'Address 1'}
                    height
                    value={address.address_1}
                    onChangeText={text =>
                      setAddress({...address, address_1: text})
                    }
                  />
                  <CustomInput
                    label={'Address 2'}
                    height
                    value={address.address_2}
                    onChangeText={text =>
                      setAddress({...address, address_2: text})
                    }
                  />

                  <Button title={'Update'} onPress={updateAddress} />
                  <View style={{height: 120}} />
                </ScrollView>
              )}
              {index === 'createAddress' && (
                <ScrollView style={styles.container}>
                  {/* <CustomInput
                    label={'Country'}
                    value={address.country}
                    onChangeText={text =>
                      setAddress({...address, country: text})
                    }
                  /> */}

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
                    keyboardType="number-pad"
                    label={'Zip'}
                    value={address.zip}
                    onChangeText={text => setAddress({...address, zip: text})}
                  />

                  <CustomInput
                    label={'Address 1'}
                    height
                    value={address.address_1}
                    onChangeText={text =>
                      setAddress({...address, address_1: text})
                    }
                  />
                  <CustomInput
                    label={'Address 2'}
                    height
                    value={address.address_2}
                    onChangeText={text =>
                      setAddress({...address, address_2: text})
                    }
                  />

                  <Button title={'Create'} onPress={createAddress} />
                  <View style={{height: 120}} />
                </ScrollView>
              )}

              {index === 'hours' && (
                <ScrollView>
                  <Text
                    style={[
                      styles.userName,
                      {marginVertical: 20, fontSize: 23},
                    ]}>
                    Job preferences
                  </Text>

                  <View style={{marginTop: 10}}>
                    <CustomInput
                      keyboardType={'number-pad'}
                      label={'Hourly Rate'}
                      value={preferences.hourly_rate}
                      onChangeText={text =>
                        setPreferences({...preferences, hourly_rate: text})
                      }
                    />
                    <CustomInput
                      keyboardType={'number-pad'}
                      label={'Daily Rate'}
                      value={preferences.daily_rate}
                      onChangeText={text =>
                        setPreferences({...preferences, daily_rate: text})
                      }
                    />
                    <CustomInput
                      keyboardType={'number-pad'}
                      label={'Radius'}
                      value={preferences.radius}
                      onChangeText={text =>
                        setPreferences({...preferences, radius: text})
                      }
                    />
                  </View>

                  {/* <View
                    style={{
                      marginTop: 10,
                      alignSelf: 'center',
                    }}>
                    <MultiSlider
                      sliderLength={330}
                      selectedStyle={{
                        backgroundColor: '#1C75BC',
                      }}
                      unselectedStyle={{
                        backgroundColor: '#ccc',
                      }}
                      containerStyle={{
                        height: 40,
                      }}
                      trackStyle={{
                        height: 3,
                        backgroundColor: '#1C75BC',
                      }}
                      touchDimensions={{
                        height: 40,
                        width: 40,
                        borderRadius: 20,
                        slipDisplacement: 40,
                      }}
                      values={100}
                      enableLabel
                      customLabel={CustomLabel}
                      customMarker={e => {
                        return (
                          <View
                            style={styles.nobeContainer}
                            currentValue={e.currentValue}></View>
                        );
                      }}
                    />
                  </View> */}
                  <Text
                    style={{
                      marginBottom: 2,
                      fontSize: 16,
                      fontFamily: 'Poppins-Regular',
                      color: '#000',
                      marginHorizontal: 10,
                    }}>
                    Visiting Hours
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
                            backgroundColor: item.toTime
                              ? '#1C75BC'
                              : '#FFFFFF',
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
                  <View style={{height: 20}} />
                  <Button title={'Update'} onPress={proProfileHandler} />
                </ScrollView>
              )}

              {index === 'licenses' && (
                <View style={{flex: 1}}>
                  <Text
                    style={[
                      styles.userName,
                      {marginVertical: 20, fontSize: 23},
                    ]}>
                    My Licenses
                  </Text>
                  <BottomSheetFlatList
                    data={licenses}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{height: 200}}
                  />
                  <View style={{bottom: 40}}>
                    <Button
                      title={'Add New'}
                      onPress={() => {
                        setAddLicense(true);
                      }}
                    />
                  </View>
                </View>
              )}
            </BottomSheetModal>

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
                  {'Working Hours For'} {item.name}
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

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginBottom: 10,

                    // marginHorizontal: wp(6),
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
                    style={{
                      width: '40%',
                      borderWidth: 2,
                      borderColor: '#1C75BC',
                      borderRadius: 10,
                      backgroundColor: '#fff',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 50,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#1C75BC',
                        fontFamily: 'Poppins-SemiBold',
                      }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
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
                    style={{
                      width: '40%',
                      borderWidth: 2,
                      borderColor: '#1C75BC',
                      borderRadius: 10,
                      backgroundColor: '#1C75BC',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 50,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#fff',
                        fontFamily: 'Poppins-SemiBold',
                      }}>
                      Add
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{flexDirection: 'row', marginVertical: hp(2)}}></View>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="time"
                  onConfirm={handleConfirm}
                  date={moment('2000-01-01T20:00:00').toDate()}
                  onCancel={hideDatePicker}
                />
              </View>
            </Modal>

            <Modal isVisible={addLicense}>
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
                  Add new license
                </Text>
              </View>
              <View style={[styles.viewModal, {paddingHorizontal: 0}]}>
                <View
                  style={{
                    marginHorizontal: 10,
                    marginVertical: 10,

                    // zIndex: Platform.OS === 'ios' ? 10 : null,
                    zIndex: Platform.OS === 'ios' ? 10 : 100,
                  }}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontSize: hp(1.8),
                      color: '#000',
                      fontFamily: 'Poppins-Regular',

                      marginBottom: 10,
                    }}>
                    {'License Type'}
                  </Text>

                  <DropDownPicker
                    dropDownDirection="TOP"
                    style={{
                      borderColor: '#E4E4E4',
                      fontFamily: 'Poppins-Regular',
                    }}
                    placeholder="Select Type"
                    placeholderStyle={{fontFamily: 'Poppins-Regular'}}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                  />
                </View>
                {/* {typeError.length ? (
            <Text
              allowFontScaling={false}
              style={{
                color: 'red',
                fontSize: 12,
                marginHorizontal: 15,
                marginVertical: 5,
                marginTop: 10,
                fontFamily: 'Poppins-Regular',
              }}>
              {typeError}
            </Text>
          ) : null} */}

                <View
                  style={{
                    marginHorizontal: 10,
                    marginVertical: 10,

                    // zIndex: Platform.OS === 'ios' ? 10 : null,
                    zIndex: Platform.OS === 'ios' ? 10 : 100,
                  }}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontSize: hp(1.8),
                      color: '#000',
                      fontFamily: 'Poppins-Regular',

                      marginBottom: 10,
                    }}>
                    {'State'}
                  </Text>

                  <DropDownPicker
                    dropDownDirection="BOTTOM"
                    style={{
                      borderColor: '#E4E4E4',
                      fontFamily: 'Poppins-Regular',
                    }}
                    placeholder="Select Type"
                    placeholderStyle={{fontFamily: 'Poppins-Regular'}}
                    open={open1}
                    value={value1}
                    items={items1}
                    setOpen={setOpen1}
                    setValue={setValue1}
                    setItems={setItems1}
                  />
                </View>

                <View
                  style={{
                    marginVertical: 10,
                  }}>
                  <CustomInput label={'Number'} />

                  <TouchableOpacity
                    onPress={() => {
                      // let newPin = `${Generate()}`;
                      // setPin(newPin);
                    }}>
                    <Text
                      allowFontScaling={false}
                      style={{
                        marginHorizontal: 15,
                        fontFamily: 'Poppins-Bold',
                        textDecorationLine: 'underline',
                        color: '#1C75BC',
                      }}>
                      Generate
                    </Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    backgroundColor: '#ccc',
                    width: '75%',
                    height: '0.6%',
                    alignSelf: 'center',
                    marginTop: hp(2),
                    marginBottom: hp(3),
                  }}></View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginBottom: 10,

                    // marginHorizontal: wp(6),
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setAddLicense(false);
                    }}
                    style={{
                      width: '40%',
                      borderWidth: 2,
                      borderColor: '#1C75BC',
                      borderRadius: 10,
                      backgroundColor: '#fff',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 50,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#1C75BC',
                        fontFamily: 'Poppins-SemiBold',
                      }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: '40%',
                      borderWidth: 2,
                      borderColor: '#1C75BC',
                      borderRadius: 10,
                      backgroundColor: '#1C75BC',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 50,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#fff',
                        fontFamily: 'Poppins-SemiBold',
                      }}>
                      Add
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </>
        )}
      </Layout>
      {loading && <AnimatedLoader />}
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
  heading: {
    fontSize: 15,
    color: 'grey',
    fontFamily: 'Poppins-SemiBold',

    marginVertical: 3,
    marginHorizontal: 5,
  },
  subHeading: {
    fontSize: 14,
    color: 'grey',
    fontFamily: 'Poppins-Regular',
    marginHorizontal: 3,
  },
  nobeContainer: {
    backgroundColor: 'white',
    borderWidth: 2,
    height: 25,
    width: 25,
    borderRadius: 25,
    borderColor: '#1C75BC',
  },
});

export default ProfileScreen;
