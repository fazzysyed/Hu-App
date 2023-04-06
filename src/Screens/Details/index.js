import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
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
import CustomRatingBar from '../../components/RatingBar';

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
const App = () => {
  const [selected, setSelected] = useState([]);
  const [index, setIndex] = useState('');

  const [routes, setRoutes] = React.useState([
    {key: 'first', title: 'Hours'},
    {key: 'second', title: 'Schedule'},
    {
      key: 'third',
      title: 'Review',
    },
  ]);

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
  const data = [1];
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
        <View style={{marginTop: 10}}>
          <View style={styles.itemContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={require('../../assets/images/pro.png')}
                />
              </View>
              <View style={styles.details}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.name}>Mathew Bryant</Text>
                  <View style={styles.status}>
                    <Icon name="verified" color={'#FFFFFF'} size={14} />
                  </View>
                </View>
                <Text style={styles.address}>Islamabad Pakistan</Text>
                <Text style={styles.rates}>$12/Hour,$50/Daily</Text>
                <Text style={styles.rates}>50 Miles away</Text>

                <View style={styles.ratingContainer}>
                  <Text style={styles.rating}>4.8</Text>
                  <CustomRatingBar />
                </View>
              </View>
            </View>
            <Text style={styles.aboutName}>About Mathew</Text>
            <Text
              style={[
                styles.address,
                {textAlign: 'center', padding: 10, lineHeight: 25},
              ]}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book
            </Text>

            <View
              style={{
                backgroundColor: 'white',

                borderWidth: 0.5,
                borderColor: '#ccc',
                height: 60,
                elevation: 4,
                marginBottom: 10,

                justifyContent: 'space-around',

                flexDirection: 'row',
              }}>
              {routes.map(route => (
                <TouchableOpacity
                  onPress={() => {
                    setIndex(route.title);
                  }}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    borderBottomWidth: index === route.title ? 2 : 0,
                    width: Dimensions.get('window').width / 3.2,
                    borderBottomColor:
                      index === route.title ? '#1A98D5' : 'white',
                    alignItems: 'center',
                  }}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: '#000',
                      fontSize: 15,
                      textAlign: 'center',
                      fontWeight: '500',
                      //   fontFamily: 'Poppins-Regular',
                      margin: 8,
                    }}>
                    {route.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={{height: 300}} />
          </View>
        </View>
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
  aboutName: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginVertical: 5,
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
    fontSize: 24,
    fontWeight: '600',
    color: 'grey',
  },
  itemContainer: {
    // borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 5,
    borderRadius: 10,
    // marginHorizontal: 4,

    // justifyContent: 'space-between',
  },
  imageContainer: {
    height: 140,
    width: 140,
    backgroundColor: '#d3d3d3',
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  image: {
    height: 120,
    width: 120,
    resizeMode: 'contain',
    borderRadius: 80,
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
    fontSize: 15,
    marginVertial: 5,
  },
  rates: {
    color: 'grey',
    fontSize: 14,
    fontWeight: '700',
    marginVertical: 5,
  },
  licensesName: {
    color: 'grey',
    fontSize: 17,
    fontWeight: '400',
    marginVertical: 3,
  },
  rating: {
    color: 'grey',
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 3,
  },
  ratingContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    marginVertical: 5,
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
    height: 20,
    width: 20,
    borderRadius: 15,
    borderWidth: 0.4,
    backgroundColor: '#1C75BC',
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 4,
    marginHorizontal: 6,
  },
});

export default App;
