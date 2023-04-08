import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import Layout from '../../components/Layout';
import Checkbox from '../../components/Checkbox';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Icon from 'react-native-vector-icons/Octicons';
import Star from 'react-native-vector-icons/AntDesign';
import HomeSearch from '../../components/Search';
import CustomLabel from '../../components/Label';
import Pill from '../../components/Pills';
import Button from '../../components/Button';

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

const SideDrawer = ({onClose}) => {
  return (
    <View style={styles.container}>
      <Text>Navigation Link 1</Text>
      <Text>Navigation Link 2</Text>
      <Text>User Profile Information</Text>
      <TouchableHighlight onPress={onClose}>
        <Text>Close Drawer</Text>
      </TouchableHighlight>
    </View>
  );
};
const App = ({navigation}) => {
  const [selected, setSelected] = useState([]);

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
            data={data}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => navigation.navigate('Details')}>
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.image}
                    source={require('../../assets/images/pro.png')}
                  />
                </View>
                <View style={styles.details}>
                  <Text style={styles.name}>Mathew Bryant</Text>
                  <Text style={styles.address}>Address Here</Text>
                  <Text style={styles.rates}>$10/Hour</Text>
                  <Text style={styles.rates}>$100/Daily</Text>
                </View>
                <View style={styles.lastContainer}>
                  <View style={styles.status}>
                    <Icon name="verified" color={'#FFFFFF'} size={17} />
                  </View>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.rating}>4.3</Text>
                    <Star name="star" color={'#ffe234'} size={20} />
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <View style={styles.contentContainer}>
            <Text style={styles.label}>Hourly Rate</Text>
            <View style={{marginTop: 20}}>
              <MultiSlider
                sliderLength={350}
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
              <Text style={styles.label}>Hourly Rate</Text>
              <View style={{marginTop: 20}}>
                <FlatList
                  data={DATA}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                  numColumns={3}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity
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
                  {marginTop: 20, fontSize: 20, alignSelf: 'center'},
                ]}>
                Clear
              </Text>
            </View>
          </View>
        </BottomSheetModal>
      </Layout>
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
    fontSize: 18,
    fontWeight: '600',
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
    borderRadius: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  imageContainer: {
    height: 60,
    width: 60,
    backgroundColor: '#d3d3d3',
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    borderRadius: 40,
  },
  details: {
    margin: 10,
    width: '50%',
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  address: {
    color: 'grey',
    fontSize: 14,
    marginBottom: 3,
  },
  rates: {
    color: 'grey',
    fontSize: 13,
    fontWeight: '700',
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
  },
  lastContainer: {
    margin: 10,
    justifyContent: 'space-between',
  },

  triangle: {
    width: 30,
    height: 30,
    borderTopRightRadius: 10,
    borderLeftWidth: 80,
    borderTopWidth: 80,
    borderStyle: 'solid',
    backgroundColor: 'green',
    borderLeftColor: 'transparent',
    borderTopColor: 'green',
    borderBottomColor: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
    // alignItems: 'center',
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
