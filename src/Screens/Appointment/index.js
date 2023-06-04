import axios from 'axios';
import moment from 'moment';
import React, {useState} from 'react';

import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Alert,
} from 'react-native';
import {Input} from 'react-native-elements';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/Fontisto';
import Time from 'react-native-vector-icons/Ionicons';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Button from '../../components/Button';
import {handleAPIRequest} from '../../Helper/ApiHandler';

const Appointment = ({navigation, route}) => {
  const {uuid, counter} = route.params;

  const [isDatePickerVisible, setIsDataPickerVisible] = useState(false);
  const [timeModal, setTimeModal] = useState(false);
  const [endTimeModal, setEndTimeModal] = useState(false);

  const [endTime, setEndTime] = useState('');
  const [startTime, setStartTime] = useState('');
  const [currentDate, setCurrentData] = useState('');
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState(null);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [items, setItems] = useState([
    {label: 'Hourly', value: 'hourly'},
    {label: 'Daily', value: 'daily'},
    {label: 'Fixed', value: 'fixed'},

    // {label: 'March', value: 'March'},
    // {label: 'April', value: 'April'},
    // {label: 'May', value: 'May'},
    // {label: 'June', value: 'June'},
    // {label: 'July', value: 'July'},
    // {label: 'August', value: 'August'},
    // {label: 'September', value: 'September'},
    // {label: 'October', value: 'October'},
    // {label: 'November', value: 'November'},
    // {label: 'December', value: 'December'},
  ]);

  const makeAppointment = () => {
    let data = {
      uuid: uuid,
      start_date: startTime,
      end_date: endTime,
      pay_rate: price,
      pay_duration: value,
      location: location,
      description: description,
    };
    console.warn(data);
    handleAPIRequest('post', 'reservation', data)
      .then(response => {
        if (response) {
          dispatch(setUser(response.user));
          console.log(response.user);
          AsyncStorage.setItem('User', JSON.stringify(response.user));
        }
      })
      .catch(e => {
        console.log(e.response);
      });
  };

  const counterOfferHandler = id => {
    console.warn(`counter-offer/${id}`, {
      start_date: startTime,
      end_date: endTime,
      pay_rate: price,
      pay_duration: value,
      location: location,
      description: description,
    });
    let data = {
      start_date: startTime,
      end_date: endTime,
      pay_rate: price,
      pay_duration: value,
      location: location,
      description: description,
    };
    handleAPIRequest('post', `counter-offer/${id}`, data)
      .then(response => {
        if (response) {
          console.warn(response);
          Alert.alert('Done');
          // console.warn(response);

          // AsyncStorage.setItem('User', JSON.stringify(response.user));
        }
      })
      .catch(e => {
        console.log(e, 'Error');
      });
  };

  const handleConfirmStartTime = date => {
    console.warn(date);
    let timeStringLocal = moment(date).format('DD-MM-YYYY'); // "10:00"
    setTime({...time, startTime: date});
    setStartTime(timeStringLocal);
    setTimeModal(false);
  };

  const handleConfirmEndTime = date => {
    // let timeStringLocal = moment(date).format('LT');
    // setEndTime(timeStringLocal); // "10:00"
    // setEndTimeModal(false);
    // console.log(timeStringLocal, 'Time', date);
    let timeStringLocal = moment(date).format('DD-MM-YYYY');
    setTime({...time, endTime: date});
    setEndTime(timeStringLocal);
    setEndTimeModal(false);
  };
  const handleConfirmDate = date => {
    let timeStringLocal = moment(date).format('DD-MM-YYYY');
    setCurrentData(timeStringLocal);
    setIsDataPickerVisible(false);
    setTimeModal(false);
    setEndTimeModal(false);
    // "10:00"
    console.log(timeStringLocal, 'Time');
  };

  return (
    <Layout>
      <Header />

      <View style={styles.spacingTop}>
        {/* <Image source={Constants.MEETING} style={styles.meeting} /> */}

        <Text style={styles.make}>
          {route.params.counter ? 'Make a Counter Offer' : 'Make a Reservation'}{' '}
        </Text>

        <View style={styles.startEndContainer}>
          <View style={{width: '50%'}}>
            <Text allowFontScaling={false} style={styles.startTime}>
              Start Date
            </Text>

            <TouchableOpacity
              onPress={() => {
                setTimeModal(true);
                setEndTime(false);
                setIsDataPickerVisible(false);
              }}
              style={styles.startButton}>
              <Text allowFontScaling={false} style={styles.startTile}>
                {startTime ? startTime : 'Select Date'}
              </Text>
              <View style={styles.dateIcon}>
                <Icon
                  name="date"
                  color={'#fff'}
                  size={16}
                  style={{padding: 5}}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{width: '50%'}}>
            <Text allowFontScaling={false} style={styles.endTimeText}>
              End Date
            </Text>

            <TouchableOpacity
              onPress={() => {
                setEndTimeModal(true);
                setTimeModal(false);
                setIsDataPickerVisible(false);
              }}
              style={styles.endButton}>
              <Text allowFontScaling={false} style={styles.endButtonTitle}>
                {endTime ? endTime : 'Select Date'}
              </Text>
              <View style={styles.dateIcon}>
                <Icon
                  name="date"
                  color={'#fff'}
                  size={16}
                  style={{padding: 5}}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Text allowFontScaling={false} style={styles.dateText}>
          Location
        </Text>
        <View style={styles.currentDate}>
          <Input
            placeholder={'Location'}
            value={location}
            onChangeText={text => setLocation(text)}
            // errorMessage={errorMessage}
            inputContainerStyle={{borderBottomWidth: 0}}
            // onChangeText={text => onChangeText(text)}
            // keyboardType={keyboardType}
            style={[
              styles.input,
              {
                height: 50,
              },
            ]}
          />
        </View>

        <Text allowFontScaling={false} style={styles.dateText}>
          Price per hour
        </Text>
        <View style={styles.currentDate}>
          <Input
            placeholder={'Price'}
            value={price}
            onChangeText={text => setPrice(text)}
            // errorMessage={errorMessage}
            inputContainerStyle={{borderBottomWidth: 0}}
            // onChangeText={text => onChangeText(text)}
            // keyboardType={keyboardType}
            style={[
              styles.input,
              {
                height: 50,
              },
            ]}
          />
        </View>
        <View
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 5,
            marginHorizontal: 10,
            marginVertical: 5,

            padding: 8,

            // zIndex: Platform.OS === 'ios' ? 10 : null,
            zIndex: Platform.OS === 'ios' ? 10 : 100,
          }}>
          <Text
            allowFontScaling={false}
            style={{
              color: 'grey',
              fontFamily: 'Poppins-Bold',

              marginBottom: 5,

              fontSize: 15,
            }}>
            {'Pay Duration'}
          </Text>

          <DropDownPicker
            dropDownDirection="BOTTOM"
            style={{borderColor: '#E4E4E4', fontFamily: 'Poppins-Regular'}}
            placeholder="Select Type"
            placeholderStyle={{fontFamily: 'Poppins-SemiBold', color: 'grey'}}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </View>

        <Text allowFontScaling={false} style={styles.dateText}>
          Description
        </Text>
        <View style={styles.currentDate}>
          <Input
            placeholder={'Description'}
            value={description}
            onChangeText={text => setDescription(text)}
            // errorMessage={errorMessage}
            inputContainerStyle={{borderBottomWidth: 0}}
            // onChangeText={text => onChangeText(text)}
            // keyboardType={keyboardType}
            style={[
              styles.input,
              {
                height: 50,
              },
            ]}
          />
        </View>

        <Button
          title={'Make'}
          loading={loading}
          onPress={() => {
            if (route.params.counter) {
              counterOfferHandler(route.params.uuid);
            } else {
              makeAppointment();
            }
          }}
        />

        {isDatePickerVisible && (
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmDate}
            date={moment(new Date()).toDate()}
            onCancel={() => {
              setIsDataPickerVisible(false);
              setTimeModal(false);
              setEndTimeModal(false);
            }}
          />
        )}
        {timeModal && (
          <DateTimePickerModal
            isVisible={timeModal}
            mode="date"
            onConfirm={handleConfirmStartTime}
            date={moment(new Date()).toDate()}
            onCancel={() => {
              setTimeModal(false);
            }}
          />
        )}
        {endTimeModal && (
          <DateTimePickerModal
            isVisible={endTimeModal}
            mode="date"
            onConfirm={handleConfirmEndTime}
            date={moment(new Date()).toDate()}
            onCancel={() => {
              setEndTimeModal(false);
            }}
          />
        )}
      </View>
    </Layout>
  );
};

export default Appointment;

const styles = StyleSheet.create({
  meeting: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginVertical: 10,
  },
  dateText: {
    color: 'grey',
    fontFamily: 'Poppins-Bold',
    marginTop: 5,
    marginHorizontal: 20,
    fontSize: 15,
  },
  input: {
    color: '#000',
    // padding: 10,
    // height: 50,

    fontSize: 15,

    fontFamily: 'Poppins-Regular',
  },
  currentDate: {
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    marginHorizontal: 20,
    marginVertical: 5,
    marginBottom: 15,

    borderWidth: 0.6,
    borderColor: '#ccc',

    alignItems: 'center',
  },
  currentDateText: {
    fontFamily: 'Poppins-SemiBold',
    color: 'grey',
  },
  dateIcon: {
    backgroundColor: '#1C75BC',
    height: 30,
    width: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startEndContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: 10,
    marginBottom: 15,
  },
  startTime: {
    color: 'grey',
    fontFamily: 'Poppins-Bold',
    marginTop: 10,
    marginHorizontal: 20,
    fontSize: 15,
  },
  startButton: {
    height: 50,

    backgroundColor: '#ffffff',
    borderRadius: 5,
    marginHorizontal: 20,
    marginVertical: 5,

    borderWidth: 0.6,
    borderColor: '#ccc',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
  },
  make: {
    marginHorizontal: 10,

    marginBottom: 15,
    fontSize: 23,
    fontFamily: 'Poppins-SemiBold',
    color: 'grey',
  },
  startTile: {
    fontFamily: 'Poppins-SemiBold',
    color: 'grey',
  },
  timeIconContainer: {
    backgroundColor: '#1C75BC',
    height: 30,
    width: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  endTimeText: {
    color: 'grey',
    fontFamily: 'Poppins-Bold',
    marginTop: 10,
    marginHorizontal: 20,
    fontSize: 15,
  },
  endButton: {
    height: 50,

    backgroundColor: '#ffffff',
    borderRadius: 5,
    marginHorizontal: 20,
    marginVertical: 5,

    borderWidth: 0.6,
    borderColor: '#ccc',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
  },
  endButtonTitle: {
    fontFamily: 'Poppins-SemiBold',
    color: 'grey',
  },
  timerContainer: {
    backgroundColor: '#1C75BC',
    height: 30,
    width: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
