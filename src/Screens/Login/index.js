import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import CustomInput from '../../components/CustomInput';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Card} from 'react-native-paper';
import Email from 'react-native-vector-icons/Entypo';
import {validateEmail, validatePassword} from '../../Helper/Vilidator';
import {handleAPIRequest} from '../../Helper/ApiHandler';
import {useDispatch} from 'react-redux';
import {setUser} from '../../Store/Actions/Actions';

const index = ({navigation}) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('emerge2001@gmail.com');
  const [password, setPassword] = useState('Testing123');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [disabledButton, setButtonDisabled] = useState(true);

  const loginHandler = () => {
    handleAPIRequest('post', 'login', {email: email, password: password})
      .then(response => {
        if (response) {
          console.log(response.user);
          dispatch(setUser(response.user));
          console.log(response.user);
          AsyncStorage.setItem('User', JSON.stringify(response.user));
        }
      })
      .catch(e => {
        console.log(e);
      });
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

  // useEffect(() => {
  //   const updatePasswordErrMessage = async () => {
  //     if (password.length && !validatePassword(password)) {
  //       setPasswordError('Invalid Password');
  //       return null;
  //     }
  //     setPasswordError('');
  //     return null;
  //   };
  //   updatePasswordErrMessage();
  // }, [password]);

  useEffect(() => {
    const updateDisabledButton = async () => {
      if (password.length && email.length && validateEmail(email)) {
        console.log('Yesss');
        setButtonDisabled(false);
        return null;
      }
      setButtonDisabled(true);
      return null;
    };
    updateDisabledButton();
  }, [password, email]);
  return (
    <Layout>
      <View style={styles.body}>
        <View style={styles.screenTitleWraper}>
          <Text allowFontScaling={false} style={styles.screenTitle}>
            {'Log in to your account'}
          </Text>
        </View>

        <View style={{marginTop: hp(3)}}>
          <CustomInput
            label={'Email'}
            value={email}
            errorMessage={emailError}
            onChangeText={text => setEmail(text)}
            keyboardType={'email-address'}
          />

          <CustomInput
            label={'Password'}
            value={password}
            secureTextEntry
            errorMessage={passwordError}
            onChangeText={text => setPassword(text)}
            keyboardType="default"
          />
        </View>

        <View style={styles.textContainer}>
          <View style={{}}>
            <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
              <Text allowFontScaling={false} style={styles.forgetPassword}>
                {'Forgot Password?'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Button
          title={'Login'}
          onPress={() => {
            loginHandler();
          }}
          loading={loading}
          color={disabledButton ? '#1C75BC' : null}
        />
        <View
          style={{
            paddingVertical: hp(0.8),
            alignSelf: 'center',
            flexDirection: 'row',
          }}>
          <Text style={styles.noAccount}>{"Don't have an account?"}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text allowFontScaling={false} style={styles.createAccount}>
              {'Create new account'}
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.orContainer}>
          <View style={styles.freeBox} />
          <View style={{width: '10%', alignSelf: 'center'}}>
            <Text allowFontScaling={false} style={styles.orText}>
              {'OR'}
            </Text>
          </View>
          <View style={styles.freeBox} />
        </View> */}
      </View>
    </Layout>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',
  },
  body: {
    backgroundColor: '#fff',
    // flex: 1,
  },
  screenTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    // fontWeight:"bold"
    color: '#000',
  },
  screenTitleWraper: {
    marginHorizontal: 10,
    marginTop: 20,
  },
  textContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginHorizontal: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  loginWithFacebook: {
    flexDirection: 'row',
    width: '45%',
    borderWidth: 1,
    borderColor: '#3B5998',
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: '#3B5998',
    paddingVertical: hp(1.4),

    justifyContent: 'center',
    marginLeft: wp(6),
  },
  loginWithGoogle: {
    flexDirection: 'row',
    width: '45%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#1fb141',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    paddingVertical: hp(1.3),
    justifyContent: 'center',
  },
  facebookText: {
    fontSize: hp(2),
    color: '#fff',
    textAlign: 'center',
    marginLeft: wp(2),
    fontFamily: 'Poppins-Regular',
  },
  googleText: {
    fontSize: hp(2),
    color: '#000',
    textAlign: 'center',
    marginLeft: wp(2),
    fontFamily: 'Poppins-Regular',
  },
  googleImage: {alignSelf: 'center', height: 25, width: 30},
  row: {flexDirection: 'row', alignItems: 'center'},
  socialContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: hp(2),
  },
  freeBox: {
    width: '45%',
    alignSelf: 'center',
    backgroundColor: '#aaa',
    height: 1,
  },
  orContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: hp(2),
    flexDirection: 'row',
  },
  createAccount: {
    fontSize: hp(1.5),
    color: '#1C75BC',

    textAlign: 'center',
    marginHorizontal: 5,
    fontFamily: 'Poppins-SemiBold',
  },
  noAccount: {
    fontSize: hp(1.5),
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  orText: {
    fontSize: hp(1.6),
    color: '#aaa',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  forgetPassword: {
    fontSize: hp(1.5),
    color: '#1C75BC',
    fontFamily: 'Poppins-Regular',
  },
});
