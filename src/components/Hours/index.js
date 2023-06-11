import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Item} from 'react-native-paper/lib/typescript/src/components/Drawer/Drawer';

const WeeklyWorkingHours = ({workingHours}) => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Weekly Working Hours</Text> */}
      <View style={styles.table}>
        {workingHours.map(day => (
          <View key={day} style={styles.row}>
            <Text style={styles.cell}>{day.name}</Text>
            <Text style={styles.cell}>
              {day.open != 0 && day.close != 0
                ? `${day.toTime} -${day.fromTime}`
                : 'closed'}
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
