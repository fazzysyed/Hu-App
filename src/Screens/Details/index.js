import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
} from 'react-native';
import {FAB} from 'react-native-paper';

import {Rating, AirbnbRating} from 'react-native-ratings';

import Layout from '../../components/Layout';
import {Calendar, LocaleConfig} from 'react-native-calendars';

import Icon from 'react-native-vector-icons/Octicons';
import Star from 'react-native-vector-icons/AntDesign';

import Pill from '../../components/Pills';
import ReviewItem from '../../components/Reviews';

import CustomRatingBar from '../../components/RatingBar';
import Hours from '../../components/Hours';
import Button from '../../components/Button';
import {handleAPIRequest} from '../../Helper/ApiHandler';
import AnimatedLoader from '../../components/Loader';

const reviewsData = [
  {
    id: '1',
    name: 'John Doe',
    profilePicture: require('../../assets/images/pro.png'),
    reviewText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    rating: 4,
    date: 'April 3, 2023',
  },
  {
    id: '2',
    name: 'Jane Smith',
    profilePicture: require('../../assets/images/pro.png'),
    reviewText:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    rating: 5,
    date: 'April 1, 2023',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    profilePicture: require('../../assets/images/pro.png'),
    reviewText:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.',
    rating: 3,
    date: 'March 29, 2023',
  },
];

const App = ({navigation, route}) => {
  const {proId} = route.params;
  const [selected, setSelected] = useState([]);
  const [index, setIndex] = useState('Hours');
  const [scroll, setScroll] = useState(false);
  const [loading, setLoading] = useState(false);

  const [item, setItem] = useState(null);
  const [pro, setPro] = useState(null);

  const [routes, setRoutes] = React.useState([
    // {key: 'first1', title: 'Licenses'},

    {key: 'first', title: 'Hours'},
    {key: 'second', title: 'Schedule'},
    {
      key: 'third',
      title: 'Reviews',
    },
  ]);

  useEffect(() => {
    setLoading(true);
    handleAPIRequest('get', `pros/${proId}`, null)
      .then(response => {
        if (response) {
          console.log(response);
          // dispatch(getAllPros(response));
          // console.warn(
          //   hoursToArray(response.data.user.pro_profile.working_hours),
          //   'fakjfbruyebfeyrty',
          // );

          setItem(response.data.user);
          setLoading(false);
          // AsyncStorage.setItem('User', JSON.stringify(response.user));
        }
      })
      .catch(e => {
        console.log(e);
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
  const data = [1];

  const renderReviews = ({item}) => (
    <ReviewItem
      name={item.name}
      profilePicture={item.profilePicture}
      reviewText={item.reviewText}
      rating={item.rating}
      date={item.date}
    />
  );

  return (
    <Layout>
      {item ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={scroll}
          style={{marginTop: 20}}>
          <View style={styles.itemContainer}>
            <View
              style={{
                flexDirection: 'row',
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
                  <Text style={styles.name}>
                    {item.firstname} {item.lastname}
                  </Text>
                  <View style={styles.status}>
                    <Icon name="verified" color={'#FFFFFF'} size={14} />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  {item.licenses.map((item, index) => (
                    <Text style={styles.address}>{item.abbrev}, </Text>
                  ))}
                </View>
                <Text style={styles.rates}>
                  Rates: $
                  {item.pro_profile ? item.pro_profile.hourly_rate : '0'}
                  /Hour, ${item.pro_profile ? item.pro_profile.daily_rate : '0'}
                  /Daily
                </Text>
                <Text style={styles.rates}>
                  Radius : {item.radius ? item.radius : 0} miles away
                </Text>

                <View style={styles.ratingContainer}>
                  <Text style={styles.rating}>4.8</Text>
                  <Rating
                    // onFinishRating={this.ratingCompleted}
                    imageSize={20}
                    style={{marginVertical: 2}}
                  />
                </View>
              </View>
            </View>
            <View style={{height: 10}} />

            <Text style={styles.aboutName}>About {item.firstname}</Text>

            <Text
              style={[
                styles.address,
                {textAlign: 'center', padding: 5, lineHeight: 25},
              ]}>
              {item.about_me ? item.about_me : 'Nothing'}
            </Text>
            {/* <Button title={'Contact this pro'} color="#1C75BC" /> */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Appointment', {
                    uuid: proId,
                  });
                }}
                style={{
                  backgroundColor: '#1C75BC',
                  width: 150,
                  height: 45,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 6,
                  marginHorizontal: 10,
                }}>
                <Text style={{fontFamily: 'Poppins-Regular', color: '#fff'}}>
                  Make Offer
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Chat', {
                    proId: proId,
                  });
                }}
                style={{
                  backgroundColor: '#1C75BC',
                  width: 150,
                  height: 45,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 6,
                  marginHorizontal: 10,
                }}>
                <Text style={{fontFamily: 'Poppins-Regular', color: '#fff'}}>
                  Contact
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: 'white',

                borderWidth: 0.5,
                borderColor: '#ccc',
                height: 60,

                marginBottom: 10,

                justifyContent: 'space-around',

                flexDirection: 'row',
              }}>
              {routes.map(route => (
                <TouchableOpacity
                  onPress={() => {
                    setIndex(route.title);
                    if (route.title === 'Schedule') {
                      setScroll(true);
                    }
                  }}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    borderBottomWidth: index === route.title ? 2 : 0,
                    width: Dimensions.get('window').width / 4,
                    borderBottomColor:
                      index === route.title ? '#1C75BC' : 'white',
                    alignItems: 'center',
                  }}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: '#000',
                      fontSize: 15,
                      textAlign: 'center',

                      fontFamily: 'Poppins-SemiBold',
                      margin: 8,
                    }}>
                    {route.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {index === 'Hours' && (
              <>
                {item.pro_profile.working_hours && (
                  <ScrollView>
                    <Hours workingHours={item.pro_profile.working_hours} />
                    <View style={{height: 50}} />
                  </ScrollView>
                )}
              </>
            )}
            {index === 'Schedule' && (
              <Calendar
                // Customize the appearance of the calendar
                style={
                  {
                    // borderWidth: 1,
                    // borderColor: 'gray',
                    // width: 200,
                  }
                }
                // Specify the current date
                current={'2023-04-06'}
                theme={{
                  arrowColor: '#1C75BC',
                }}
                // Callback that gets called when the user selects a day
                onDayPress={day => {
                  console.log('selected day', day);
                }}
                // Mark specific dates as marked
                markedDates={{
                  '2023-04-06': {
                    selected: true,
                    marked: true,
                    selectedColor: '#1C75BC',
                  },
                  '2012-03-02': {marked: true},
                  '2012-03-03': {
                    selected: true,
                    marked: true,
                    selectedColor: '#1C75BC',
                  },
                }}
              />
            )}

            {index === 'Reviews' && (
              <FlatList
                data={reviewsData}
                renderItem={renderReviews}
                keyExtractor={item => item.id}
              />
            )}

            <View style={{height: 20}} />
          </View>
        </ScrollView>
      ) : (
        <AnimatedLoader />
      )}
    </Layout>
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
    marginVertical: 2,
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
    height: 120,
    width: 120,
    backgroundColor: '#d3d3d3',
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    // margin: 10,
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
    borderRadius: 80,
  },
  details: {
    // margin: 10,
    // width: '50%',
    marginHorizontal: 10,
  },
  name: {
    fontSize: 17,
    fontFamily: 'Poppins-Bold',
    color: '#000',
    marginBottom: 4,
  },
  address: {
    color: 'grey',
    fontSize: 15,
    marginVertial: 5,
    fontFamily: 'Poppins-Regular',
  },
  rates: {
    color: 'grey',
    fontSize: 14,

    fontFamily: 'Poppins-SemiBold',
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
    fontSize: 17,
    fontFamily: 'Poppins-SemiBold',

    marginHorizontal: 3,
  },
  ratingContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    marginVertical: 2,
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
