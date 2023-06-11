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
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/Button';
import {useSelector} from 'react-redux';

const Contracts = ({navigation}) => {
  const [reservations, setReservartions] = useState([]);
  const user = useSelector(state => state.Reducer.user);

  useEffect(() => {
    handleAPIRequest('get', 'contract', null)
      .then(response => {
        if (response) {
          console.log(response.data);
          setReservartions(response.data.contracts);
          // console.warn(response);

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
      case 'Additional Terms:':
        return (
          <Material
            name="file-document-edit"
            size={20}
            color="#1C75BC"
            style={styles.icon}
          />
        );

        Material;
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 8,
        }}>
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',

            width: 250,
            fontSize: 17,
          }}>
          Contract between {item.business.firstname} {item.business.lastname} &{' '}
          {item.pro.firstname} {item.pro.lastname}{' '}
        </Text>

        <View style={styles.innerContainer}>
          <Image
            source={require('../../assets/images/placeholderimage.jpeg')}
            style={styles.image}
          />
          <Image
            source={require('../../assets/images/placeholderimage.jpeg')}
            style={styles.image}
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
        <Text style={styles.subTitle} numberOfLines={2} ellipsizeMode="tail">
          {item.description}
        </Text>
      </View>
      <Text style={styles.label}>{renderLabel('Additional Terms:')}</Text>
      <View style={styles.innerContainer}>
        <Text style={styles.subTitle} numberOfLines={2} ellipsizeMode="tail">
          {item.additional_terms}
        </Text>
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.label}>{renderLabel('Created At:')}</Text>
        <Text style={styles.subTitle}>
          {moment(item.created_at).format('MMM DD, YYYY h:mm A')}
        </Text>
      </View>

      {user.type === 'pro' && item.pro_acceptance === null && (
        <TouchableOpacity
          onPress={() => {
            handleApprove(item.uuid);
          }}
          style={[styles.button, {alignSelf: 'center', width: 150}]}>
          <Text style={styles.buttonTitle}>Approve</Text>
        </TouchableOpacity>
      )}

      {user.type === 'bus' && item.bus_acceptance === null && (
        <TouchableOpacity
          onPress={() => {
            handleApprove(item.uuid);
          }}
          style={[styles.button, {alignSelf: 'center', width: 150}]}>
          <Text style={styles.buttonTitle}>Approve</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const handleApprove = uuid => {
    handleAPIRequest('post', `approve-contract/${uuid}`, null).then(
      response => {
        console.log(response);
      },
    );
  };
  return (
    <Layout>
      <Text style={styles.reservations}>My Contracts</Text>
      <FlatList
        data={reservations}
        renderItem={renderItem}
        // keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.container}
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
    marginBottom: 3,
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
    width: 30,
    height: 30,
    borderRadius: 30,
    marginRight: 5,
    marginBottom: 5,
  },
  offeredByName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    alignSelf: 'center',
  },
});

export default Contracts;
