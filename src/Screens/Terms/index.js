import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import CheckBox from '../../components/Checkbox';
import Layout from '../../components/Layout';

const TermsAndConditionsScreen = () => {
  return (
    <Layout>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/terms-and-conditions.png')}
          style={styles.image}
        />
        <Text style={styles.heading}>Terms and Conditions</Text>
        <Text style={styles.text}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Text>
        <Text style={styles.linkText}>Read full Terms and Conditions</Text>
        <View style={styles.checkboxContainer}>
          <View style={styles.checkboxRow}>
            {/* First checkbox */}
            <CheckBox checked={true} />
            <Text style={styles.checkboxLabel}>
              I agree with the Terms and Conditions
            </Text>
          </View>
          <View style={styles.checkboxRow}>
            {/* Second checkbox */}
            <CheckBox />
            <Text style={styles.checkboxLabel}>
              I agree with the Privacy Policy
            </Text>
          </View>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  heading: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    marginBottom: 10,
  },
  text: {
    marginBottom: 10,
    color: '#000',
    fontFamily: 'Poppins-Regular',
  },
  linkText: {
    color: '#3370FF',
    marginBottom: 10,
    fontFamily: 'Poppins-SemiBold',
  },
  checkboxContainer: {
    alignItems: 'center',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default TermsAndConditionsScreen;
