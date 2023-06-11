import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CheckBox from '../../components/Checkbox';
import Layout from '../../components/Layout';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import {handleAPIRequest} from '../../Helper/ApiHandler';
import Button from '../../components/Button';
import ExtraTerms from '../../components/ExtraTerms';

const ReservationDetails = ({navigation, route}) => {
  const {uuid} = route.params;
  const [reservations, setReservartions] = useState(null);
  const [headerDetails, setHeaderDetails] = useState(null);
  const [note, setNote] = useState('');
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleAccept = () => {
    if (selectedItem) {
      handleAPIRequest('post', `accept-offer/${selectedItem.uuid}`, {
        additional_terms: note,
      }).then(response => {
        console.warn(response);
      });
    }
  };
  useEffect(() => {
    handleAPIRequest('get', `reservation/${uuid}`, null)
      .then(response => {
        if (response) {
          if (response.data.reservation) {
            setHeaderDetails(response.data.reservation);
            let newValue = [response.data.reservation];

            let counter = response.data.reservation.counterOffers;

            console.log(counter);

            if (counter.length) {
              counter.map(item => {
                newValue.push(item);
              });
            }

            console.warn(newValue);

            setReservartions(newValue);
          }

          // AsyncStorage.setItem('User', JSON.stringify(response.user));
        }
      })
      .catch(e => {
        console.log(e, 'Error');
      });
  }, []);

  const evaluateLabel = label => {
    switch (label) {
      case 'Location:':
        return (
          <Icon
            name="map-marker"
            size={20}
            color="#1C75BC"
            style={styles.icon}
          />
        );
      case 'Description:':
        return (
          <Icon
            name="file-text"
            size={20}
            color="#1C75BC"
            style={styles.icon}
          />
        );
      case 'Created At:':
        return (
          <Icon name="clock-o" size={20} color="#1C75BC" style={styles.icon} />
        );
      case 'Start Date:':
        return (
          <Icon name="calendar" size={20} color="#1C75BC" style={styles.icon} />
        );
      case 'End Date:':
        return (
          <Icon name="calendar" size={20} color="#1C75BC" style={styles.icon} />
        );
      case 'Pay Rate:':
        return (
          <Icon name="dollar" size={20} color="#1C75BC" style={styles.icon} />
        );
      default:
        return null;
    }
  };

  const renderLabel = label => {
    return (
      <View style={styles.innerContainer}>
        {evaluateLabel(label)}
        <Text style={styles.label}>{label}</Text>
      </View>
    );
  };
  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {item.offered_by_me ? (
          <View style={styles.innerContainer}>
            <Image
              source={require('../../assets/images/placeholderimage.jpeg')}
              style={styles.image}
            />
            <View>
              <Text style={[styles.label, {fontFamily: 'Poppins-Regular'}]}>
                Offered to :
              </Text>
              <Text
                style={
                  styles.offeredByName
                }>{`${item.offered_to.firstname} ${item.offered_to.lastname}`}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.innerContainer}>
            <Image
              source={require('../../assets/images/placeholderimage.jpeg')}
              style={styles.image}
            />
            <View>
              <Text style={[styles.label, {fontFamily: 'Poppins-Regular'}]}>
                Offered by :
              </Text>
              <Text
                style={
                  styles.offeredByName
                }>{`${item.offered_by.firstname} ${item.offered_by.lastname}`}</Text>
            </View>
          </View>
        )}

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={{fontFamily: 'Poppins-Regular', marginHorizontal: 5}}>
            {item.status}
          </Text>
          <View
            style={{
              height: 10,
              width: 10,
              backgroundColor:
                item.status === 'open'
                  ? 'green'
                  : item.status === 'closed'
                  ? 'grey'
                  : 'red',
              borderRadius: 10,
              marginTop: 5,
            }}
          />
        </View>
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.label}>{renderLabel('Location:')}</Text>
        <Text style={styles.subTitle}>{item.location}</Text>
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.label}>{renderLabel('Start Date:')}</Text>
        <Text style={styles.subTitle}>{item.start_date}</Text>
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.label}>{renderLabel('End Date:')}</Text>
        <Text style={styles.subTitle}>{item.end_date}</Text>
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.label}>{renderLabel('Pay Rate:')}</Text>
        <Text style={styles.subTitle}>
          ${item.pay_rate} ({item.pay_duration})
        </Text>
      </View>
      <Text style={styles.label}>{renderLabel('Description:')}</Text>
      <View style={styles.innerContainer}>
        <Text style={styles.subTitle}>{item.description}</Text>
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.label}>{renderLabel('Created At:')}</Text>
        <Text style={styles.subTitle}>
          {moment(item.created_at).format('MMM DD, YYYY h:mm A')}
        </Text>
      </View>

      {item.status === 'open' && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 5,
          }}>
          {!item.offered_by_me && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Appointment', {
                  uuid: reservations[0].uuid,
                  counter: true,
                });
              }}
              style={styles.button}>
              <Text style={styles.buttonTitle}>Re Offer</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonTitle}>Chat</Text>
          </TouchableOpacity>
          {item.offered_by_me ? (
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonTitle}>Update</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setSelectedItem(item);
                setModal(true);
              }}>
              <Text style={styles.buttonTitle}>Accept</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );

  return (
    <Layout>
      {headerDetails && (
        <>
          {headerDetails.offered_by_me ? (
            <Text
              style={
                styles.reservations
              }>{`Offer to ${headerDetails.offered_to.firstname} ${headerDetails.offered_to.lastname}`}</Text>
          ) : (
            <Text
              style={
                styles.reservations
              }>{`Offer by ${headerDetails.offered_by.firstname} ${headerDetails.offered_by.lastname}`}</Text>
          )}
        </>
      )}

      {reservations && (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{marginBottom: 100}}
          data={reservations}
          renderItem={renderItem}
          // keyExtractor={item => reservations.id.toString()}
          contentContainerStyle={styles.container}
        />
      )}
      <ExtraTerms
        isModalVisible={modal}
        note={note}
        setNote={text => setNote(text)}
        onCancel={() => setModal(false)}
        onSuccess={() => {
          handleAccept();
        }}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#1C75BC',
    height: 40,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: '#fff',
  },
  reservations: {
    marginHorizontal: 10,

    marginBottom: 15,
    fontSize: 23,
    fontFamily: 'Poppins-SemiBold',
    color: 'grey',
  },
  icon: {
    marginRight: 5,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 10,
    borderRadius: 15,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  innerContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginRight: 5,

    // marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,

    // marginBottom: 2,
  },
  description: {
    fontSize: 14,
  },
  date: {
    fontSize: 14,

    fontStyle: 'italic',
  },
  dates: {
    fontSize: 14,
  },
  payRate: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    marginBottom: 5,
  },
  offeredByName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    alignSelf: 'center',
  },
});

export default ReservationDetails;
