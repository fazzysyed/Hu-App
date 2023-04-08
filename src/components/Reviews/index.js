import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import {Rating, AirbnbRating} from 'react-native-ratings';

const ReviewItem = ({name, profilePicture, reviewText, rating, date}) => {
  return (
    <View style={styles.reviewItemContainer}>
      <Image source={profilePicture} style={styles.profilePicture} />
      <View style={styles.reviewInfoContainer}>
        <View style={styles.nameDateContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.dateText}>{date}</Text>
        </View>

        <Text style={styles.reviewText}>{reviewText}</Text>

        <Rating
          // onFinishRating={this.ratingCompleted}
          imageSize={20}
          style={{
            marginVertical: 2,
            alignSelf: 'flex-start',
            marginVertical: 10,
          }}
        />
      </View>
    </View>
  );
};

export default ReviewItem;

const styles = StyleSheet.create({
  reviewItemContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    borderWidth: 0.6,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
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
    marginVertical: 5,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  reviewInfoContainer: {
    flex: 1,
  },
  nameDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  dateText: {
    color: '#888',
    fontSize: 12,
    alignSelf: 'flex-start',
  },
  ratingContainer: {
    alignSelf: 'flex-start',
    marginVertical: 5,
  },
  reviewText: {
    marginTop: 5,
  },
});
