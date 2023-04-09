import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import {Input} from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';

// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Layout from '../../components/Layout';

import Button from '../../components/Button';
import CustomInput from '../../components/CustomInput';

// import {InternetCheck} from '../Helper/NetworkCheck';
import {validateEmail, validatePassword} from '../../Helper/Vilidator';
import {handleAPIRequest} from '../../Helper/ApiHandler';
import {showMessage} from 'react-native-flash-message';

const CreateAccount = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phone, setPhone] = useState('');
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [nameError, setNameError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [addressError, setAddressError] = useState('');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [items, setItems] = useState([
    {label: 'Professional', value: 'pro'},
    {label: 'Business', value: 'bus'},
  ]);
  const [typeError, setTypeError] = useState('');
  //Register Handler
  const registerHandler = async () => {
    if (!firstName.length) {
      setFirstNameError('First name is required');
    }
    if (!lastName.length) {
      setLastNameError('Last name is required');
    }
    if (!email.length) {
      setEmailError('Email is required');
    }
    if (!password.length) {
      setPasswordError('Password is required');
    }
    if (!confirmPassword.length) {
      setConfirmPasswordError('Confrim password is required');
    }
    if (!phone.length) {
      setPhoneError('Phone is required');
    }
    if (!address.length) {
      setAddressError('Address is required');
    }
    if (!value.length) {
      setTypeError('Type is required');
    }

    if (
      firstName.length &&
      lastName.length &&
      email.length &&
      password.length &&
      confirmPassword.length &&
      phone.length &&
      address.length &&
      value.length
    ) {
      setLoading(true);
      setFirstNameError('');
      setLastNameError('');
      setEmailError('');
      setPasswordError('');
      setConfirmPasswordError('');
      setAddressError('');
      setPhoneError('');
      setTypeError('');
      handleAPIRequest('post', 'register', {
        type: value,
        firstname: firstName,
        lastname: lastName,
        email: email,
        phone: phone,
        password: password,
      })
        .then(response => {
          showMessage({
            message: `Congratulations ${firstName} ${lastName}`,
            description: 'your account created successfully.',
            type: 'success',
          });
          setLoading(false);
        })
        .catch(e => {
          setLoading(false);
        });
    }
  };
  useEffect(() => {
    const updateEmailErrMessage = async () => {
      if (email.length && !validateEmail(email)) {
        setEmailError('Invalid Email');
        return null;
      }

      setEmailError('');
      return null;
    };
    updateEmailErrMessage();
  }, [email]);

  useEffect(() => {
    const updatePasswordErrMessage = async () => {
      if (password.length && !validatePassword(password)) {
        setPasswordError(
          'Your password must be more than 8 characters long,should contain at-least 1 Uppercase, 1 Lowercase, 1 Numeric and 1 special character',
        );
        return null;
      }
      setPasswordError('');
      return null;
    };
    updatePasswordErrMessage();
  }, [password]);
  return (
    <Layout navigation={navigation} back style={styles.container}>
      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.screenTitleWraper}>
            <Text allowFontScaling={false} style={styles.screenTitle}>
              {'Create your account'}
            </Text>
          </View>
          <View style={styles.topSpacing} />
          <CustomInput
            label={'First Name'}
            onChangeText={text => setFirstName(text)}
            value={firstName}
            errorMessage={firstNameError}
          />
          <CustomInput
            label={'Last Name'}
            onChangeText={text => setLastName(text)}
            value={lastName}
            errorMessage={lastNameError}
          />

          <CustomInput
            label={'Email'}
            onChangeText={text => setEmail(text)}
            value={email}
            errorMessage={emailError}
          />
          <CustomInput
            label={'Password'}
            value={password}
            secureTextEntry
            errorMessage={passwordError}
            onChangeText={text => setPassword(text)}
          />
          <CustomInput
            label={'Confirm Password'}
            value={confirmPassword}
            secureTextEntry
            errorMessage={confirmPasswordError}
            onChangeText={text => setConfirmPassword(text)}
          />
          <CustomInput
            label={'Phone number'}
            keyboardType="number-pad"
            onChangeText={text => {
              if (phone.length === 0) {
                setPhone(`+${text}`);
              } else {
                setPhone(text);
              }
            }}
            value={phone}
            errorMessage={phoneError}
          />

          <CustomInput
            label={'Address'}
            onChangeText={text => setAddress(text)}
            value={address}
            errorMessage={addressError}
          />

          <View
            style={{
              marginHorizontal: 10,

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
              {'User Type'}
            </Text>

            <DropDownPicker
              dropDownDirection="BOTTOM"
              style={{borderColor: '#E4E4E4', fontFamily: 'Poppins-Regular'}}
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
          {typeError.length ? (
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
          ) : null}

          <Button
            title={'Register'}
            onPress={registerHandler}
            loading={loading}
            color={'#1C75BC'}
          />
          <View style={styles.createAccountContainer}>
            <Text allowFontScaling={false} style={styles.already}>
              {'Already Have The Account?'}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text allowFontScaling={false} style={styles.login}>
                {'Login'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.spacing} />
        </ScrollView>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: hp(1.5),
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  body: {
    backgroundColor: '#fff',
    width: '100%',
  },
  screenTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#000',
    // fontWeight:"bold"
  },
  screenTitleWraper: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  createAccountContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: hp(1),
  },
  already: {
    fontSize: hp(1.5),
    color: '#212120',
    fontFamily: 'Poppins-Regular',
  },
  login: {
    fontSize: hp(1.5),
    color: '#1C75BC',
    marginLeft: wp(2),
    fontFamily: 'Poppins-Bold',
  },
  spacing: {marginBottom: 100},
  topSpacing: {
    marginTop: hp(3),
  },
});
export default CreateAccount;
