import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  ImageBackground,
} from 'react-native';
import Modal from 'react-native-modal';
import Cross from 'react-native-vector-icons/Entypo';
import Send from 'react-native-vector-icons/Feather';
const ImageView = ({isVisible, onClose, onSend, image}) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    // Handle sending the text input
    console.log(text);
    setText('');
  };

  return (
    <ImageBackground source={{uri: image}} style={styles.container}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Cross name="circle-with-cross" color={'#fff'} size={35} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.inputContainer} onPress={onSend}>
        <Text
          style={{fontFamily: 'Poppins-Regular', color: 'white', fontSize: 16}}>
          Send
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    flex: 1,
    // width: '100%',
  },
  image: {
    flex: 1,

    resizeMode: 'contain',
    alignSelf: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    // ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    opacity: 0.5,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    // Style your cross icon button
  },
  inputContainer: {
    position: 'absolute',

    bottom: 20,

    width: 120,
    height: 40,
    flexDirection: 'row',
    backgroundColor: '#1C75BC',
    borderWidth: 0.2,
    borderColor: '#fff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 5,
  },
  textInput: {
    flex: 1,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  sendButton: {
    // marginLeft: 10,
    marginHorizontal: 10,
    // Style your send icon button
  },
});

export default ImageView;
