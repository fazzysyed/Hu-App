import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Rating, AirbnbRating} from 'react-native-ratings';

import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import Layout from '../../components/Layout';
import Checkbox from '../../components/Checkbox';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Star from 'react-native-vector-icons/AntDesign';
import HomeSearch from '../../components/Search';
import CustomLabel from '../../components/Label';
import Pill from '../../components/Pills';
import Button from '../../components/Button';
import {handleAPIRequest} from '../../Helper/ApiHandler';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {getAllPros, setAppLoading} from '../../Store/Actions/Actions';
import index from '../Login';
import AnimatedLoader from '../../components/Loader';

const data = {
  uuid: 'b94a089b-6779-47a7-b5e4-9096c78392f3',
  type: 'pro',
  agency_id: 5,
  firstname: 'Faraz',
  lastname: 'Bryant',
  status: 'active',
  about_me: null,
  verified: 'yes',
  photo_url: 'dh38JPwORyV0jx8uST2LzbSrybkhqQufKre6NK7i.png',
  licenses: [
    {
      id: 1,
      abbrev: 'APRN',
      name: 'Advanced Practice Registered Nurses',
      state: 'CT',
    },
  ],
  pro_profile: {
    id: 1,
    user_id: 2,
    hourly_rate: 50,
    daily_rate: 500,
    radius: 100,
    working_hours: {
      hours: {
        friday: {
          open: '8:00',
          close: '5:00',
        },
        monday: {
          open: '8:00',
          close: '5:00',
        },
        sunday: {
          open: '0',
          close: '0',
        },
        tuesday: {
          open: '8:00',
          close: '5:00',
        },
        saturday: {
          open: '8:00',
          close: '5:00',
        },
        thursday: {
          open: '8:00',
          close: '5:00',
        },
        wednesday: {
          open: '8:00',
          close: '5:00',
        },
      },
    },
    created_at: '2022-10-20T13:30:59.000000Z',
    updated_at: '2022-10-20T17:50:41.000000Z',
  },
};

const DATA = [
  {id: '1', label: 'Fazzy'},
  {id: '2', label: 'Mat'},
  {id: '3', label: 'Heath App'},
  {id: '4', label: 'Mobile'},
];

const App = ({navigation}) => {
  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();
  const profressionals = useSelector(state => state.Reducer.pros);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    handleAPIRequest('get', 'pros', null)
      .then(response => {
        if (response) {
          // console.warn(response);
          dispatch(getAllPros(response));
          setLoading(false);

          // AsyncStorage.setItem('User', JSON.stringify(response.user));
        }
      })
      .catch(e => {
        setLoading(false);
      });
  }, []);

  const handlePress = id => {
    setSelected(prevState => {
      if (prevState.includes(id)) {
        return prevState.filter(item => item !== id);
      } else {
        return [...prevState, id];
      }
    });
  };

  const renderItem = ({item}) => {
    const isSelected = selected.includes(item.id);
    return (
      <Pill
        label={item.label}
        selected={isSelected}
        onPress={() => handlePress(item.id)}
      />
    );
  };
  const data = [1, 2, 3, 4, 5];
  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '70%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  // renders
  return (
    <BottomSheetModalProvider>
      <Layout>
        <Text style={styles.professionals}>Search for Professionals</Text>

        <HomeSearch filterPress={handlePresentModalPress} />

        <View style={{marginTop: 40}}>
          <FlatList
            data={profressionals}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() =>
                  navigation.navigate('Details', {
                    proId: item.uuid,
                  })
                }>
                <ImageBackground
                  style={styles.triangle}
                  source={
                    item.verified === 'yes'
                      ? require('../../assets/images/shape.png')
                      : require('../../assets/images/shape2.png')
                  }>
                  <Icon
                    name="verified"
                    color={'#FFFFFF'}
                    size={20}
                    style={{
                      position: 'absolute',
                      right: 5,
                      top: 0,
                      marginTop: 10,
                    }}
                  />
                </ImageBackground>
                <>
                  <Image
                    style={styles.image}
                    source={
                      item.photo_url
                        ? item.photo_url
                        : require('../../assets/images/pro.png')
                    }
                  />

                  <View style={styles.details}>
                    <Text style={styles.name}>
                      {item.firstname} {item.lastname}
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {item.licenses.map((item, index) => (
                        <Text style={styles.address}>{item.abbrev}, </Text>
                      ))}
                    </View>

                    <Text style={styles.rates}>
                      Rates: $
                      {item.pro_profile ? item.pro_profile.hourly_rate : '0'}
                      /Hour, $
                      {item.pro_profile ? item.pro_profile.daily_rate : '0'}
                      /Daily
                    </Text>
                    <Text style={styles.rates}>
                      Radius : {item.radius ? item.radius : 0} miles away
                    </Text>
                  </View>
                  <View style={styles.lastContainer}>
                    <View style={styles.ratingContainer}>
                      <Rating
                        // onFinishRating={this.ratingCompleted}
                        imageSize={25}
                        style={{marginVertical: 2}}
                      />
                      {/* <Text style={styles.rating}>4.3</Text>
                      <Star name="star" color={'#ffe234'} size={20} /> */}
                    </View>
                  </View>
                </>
              </TouchableOpacity>
            )}
          />
        </View>
      </Layout>
      {/* <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <View style={styles.contentContainer}>
          <Text style={styles.label}>Hourly Rate</Text>
          <View
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
              values={[0, 100]}
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
          </View>
          <View style={{marginTop: 20}}>
            <Text style={styles.label}>License Type</Text>

            <View style={{marginTop: 20}}>
              <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={3}
              />
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <Text style={styles.label}>Tags</Text>
            <View style={{marginTop: 20}}>
              <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={3}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                bottomSheetModalRef.current?.close();
              }}
              title={'Show Results'}
              style={{
                backgroundColor: '#1C75BC',
                height: 50,
                borderRadius: 5,
                justifyContent: 'center',

                alignItems: 'center',
                width: '80%',
                marginTop: 10,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 17,
                  fontFamily: 'Poppins-Regular',
                }}>
                Show Results
              </Text>
            </TouchableOpacity>
            <Text
              style={[
                styles.professionals,
                {marginTop: 20, fontSize: 18, alignSelf: 'flex-end'},
              ]}>
              Clear
            </Text>
          </View>
        </View>
      </BottomSheetModal> */}
      {loading && <AnimatedLoader />}
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 30,
  },
  label: {
    fontSize: 17,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
  nobeContainer: {
    backgroundColor: 'white',
    borderWidth: 2,
    height: 25,
    width: 25,
    borderRadius: 25,
    borderColor: '#1C75BC',
  },

  professionals: {
    marginHorizontal: 10,
    marginTop: 25,
    marginBottom: 15,
    fontSize: 23,
    fontFamily: 'Poppins-SemiBold',
    color: 'grey',
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 10,
    borderRadius: 15,
    marginHorizontal: 10,
    alignItems: 'center',
    // justifyContent: 'center',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
  },

  image: {
    height: 80,
    width: 80,
    resizeMode: 'contain',
    borderRadius: 50,
    marginTop: 20,
  },
  details: {
    margin: 10,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 17,
    fontFamily: 'Poppins-SemiBold',
    color: '#10274F',
    marginBottom: 4,
    textAlign: 'center',
  },
  address: {
    color: 'grey',
    fontSize: 15,
    marginBottom: 3,
    fontFamily: 'Poppins-Regular',
    alignSelf: 'center',
  },
  rates: {
    color: 'grey',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    alignSelf: 'center',
    marginVertical: 3,
  },
  licensesName: {
    color: 'grey',
    fontSize: 17,
    fontWeight: '400',
    marginVertical: 3,
  },
  rating: {
    color: 'grey',
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 3,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 10,
  },
  lastContainer: {
    margin: 10,
    justifyContent: 'space-between',
  },

  triangle: {
    alignSelf: 'flex-end',
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    // alignItems: 'center',
    position: 'absolute',
  },
  status: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 0.4,
    backgroundColor: '#1C75BC',
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
});

export default App;
