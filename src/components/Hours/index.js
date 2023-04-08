import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const WeeklyWorkingHours = () => {
  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const workingHours = [
    {day: 'Monday', hours: '8:00 AM - 5:00 PM'},
    {day: 'Tuesday', hours: '8:00 AM - 5:00 PM'},
    {day: 'Wednesday', hours: '8:00 AM - 5:00 PM'},
    {day: 'Thursday', hours: '8:00 AM - 5:00 PM'},
    {day: 'Friday', hours: '8:00 AM - 5:00 PM'},
    {day: 'Saturday', hours: '10:00 AM - 3:00 PM'},
    {day: 'Sunday', hours: 'Closed'},
  ];

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Weekly Working Hours</Text> */}
      <View style={styles.table}>
        {daysOfWeek.map(day => (
          <View key={day} style={styles.row}>
            <Text style={styles.cell}>{day}</Text>
            <Text style={styles.cell}>
              {workingHours.find(item => item.day === day).hours}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  cell: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    fontFamily: 'Poppins-Regular',
  },
});

export default WeeklyWorkingHours;
