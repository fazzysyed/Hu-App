import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

export default function Addresses({route, data}) {
  const {addresses} = route.params;
  return (
    <View style={{flex: 1}}>
      <Text style={[styles.userName, {marginVertical: 20, fontSize: 23}]}>
        Addresses
      </Text>
      <FlatList
        data={addresses}
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
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.heading}>Address 1:</Text>
                <Text style={styles.subHeading}>{item.address_1}</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.heading}>Address 2:</Text>
                <Text style={styles.subHeading}>{item.address_2}</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <>
                  <Text style={styles.heading}>City:</Text>
                  <Text style={styles.subHeading}>{item.city}</Text>
                </>
                <>
                  <Text style={[styles.heading, {width: undefined}]}>
                    State:
                  </Text>
                  <Text style={styles.subHeading}>{item.state}</Text>
                </>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                // style={{marginRight: 16}}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 15,
    color: 'grey',
    fontFamily: 'Poppins-SemiBold',
    width: 80,
    marginVertical: 3,
  },
  subHeading: {
    fontSize: 14,
    color: 'grey',
    fontFamily: 'Poppins-Regular',
    marginHorizontal: 10,
  },
  userName: {
    marginBottom: 2,
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: 'grey',
    marginHorizontal: 10,
  },
});
