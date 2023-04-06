import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const Pill = ({label, selected, onPress}) => {
  return (
    <TouchableOpacity
      style={[
        styles.pill,
        {
          backgroundColor: selected ? '#1C75BC' : '#fff',
          borderColor: selected ? '#e0e0e0' : '#ccc',
        },
      ]}
      onPress={onPress}>
      <Text style={[styles.label, {color: selected ? '#fff' : '#999'}]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pill: {
    backgroundColor: '#1C75BC',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderWidth: 0.5,

    marginBottom: 8,
  },
  label: {
    color: '#999',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Pill;
