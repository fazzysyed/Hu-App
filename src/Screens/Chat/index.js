import React, {useEffect, useReducer, useState} from 'react';
import {Button, View} from 'react-native';
import {
  GiftedChat,
  InputToolbar,
  Send,
  Bubble,
  Composer,
} from 'react-native-gifted-chat';

import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Feather';
import {launchImageLibrary} from 'react-native-image-picker';
import Layout from '../../components/Layout';
import {useSelector} from 'react-redux';

function ChatScreen({route}) {
  const {proId} = route.params;
  const user = useSelector(state => state.Reducer.user);
  const [messages, setMessages] = useState([]);
  //   const [chatId, setChatId] = useState(`${user.id}-${proId}`);
  const [chatId, setChatId] = useState(`fazzzyy`);

  useEffect(() => {
    console.warn(user, 'fafaf');
    const unsubscribe = firestore()
      .collection('Chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const messagesFirestore = querySnapshot.docs.map(documentSnapshot => {
          const data = documentSnapshot.data();
          return {
            _id: documentSnapshot.id,
            text: data.text,
            createdAt: data.createdAt.toDate(),
            user: data.user,
            image: data.image,
          };
        });
        setMessages(messagesFirestore);
      });

    return () => unsubscribe();
  }, [chatId]);

  const uploadImageToStorage = async imgURI => {
    const ref = `messages/${[FILE_REFERENCE_HERE]}`;

    const imgRef = storage().ref(ref);

    const metadata = {contentType: 'image/jpg'};

    // Fetch image data as BLOB from device file manager

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', imgURI, true);
      xhr.send(null);
    });

    // Put image Blob data to firebase servers
    await imgRef.put(blob, metadata);

    // We're done with the blob, close and release it
    blob.close();

    // Image permanent URL
    const url = await imgRef.getDownloadURL();

    return url;
  };
  const onSend = async (newMessages = []) => {
    const message = newMessages[0];
    const {text, image} = message;

    const userIds = [message.user._id, 1]; // Assuming 1 is the ID of the other user
    const combinedId = userIds.sort().join('_'); // Combine user IDs and sort them

    if (image) {
      //   const response = await fetch(image.uri);
      //   const blob = await response.blob();
      //   const imageRef = storage().ref().child(`images/${Date.now()}`);
      //   await imageRef.put(blob);
      //   const imageUrl = await imageRef.getDownloadURL();

      firestore()
        .collection('Chats')
        .doc(chatId)
        .collection('messages')
        .add({
          image: imageUrl,
          createdAt: firebase.firestore.Timestamp.fromDate(message.createdAt),
          user: {
            _id: message.user._id,
            name: message.user.name,
          },
        });
    } else {
      firestore()
        .collection('Chats')
        .doc(chatId)
        .collection('messages')
        .add({
          text: text,
          createdAt: firestore.Timestamp.fromDate(message.createdAt),
          user: {
            _id: message.user._id,
            name: message.user.name,
          },
        });
    }
  };

  const handleImagePicker = () => {
    launchImageLibrary({noData: true, quality: 0.8}, response => {
      if (response.didCancel) {
        console.log('Image picker cancelled');
      } else if (response.error) {
        console.log('Image picker error:', response.error);
      } else {
        const image = {
          uri: response.uri,
          width: response.width,
          height: response.height,
        };

        onSend([{image, createdAt: new Date(), user: {_id: 1, name: 'John'}}]);
      }
    });
  };

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            // Here is the color change
            backgroundColor: '#A3D6EE',
            borderRadius: 6,
            padding: 4,
          },
          left: {
            backgroundColor: '#E7F5FB',
            borderRadius: 6,
            padding: 4,
          },
        }}
        textStyle={{
          right: {
            color: '#000',
            fontFamily: 'Poppins-Regular',
            fontSize: 15,
          },

          left: {
            color: '#000',
            fontFamily: 'Poppins-Regular',
            fontSize: 15,
          },
        }}
      />
    );
  };
  const renderInputToolbar = props => {
    return (
      <>
        <InputToolbar
          {...props}
          containerStyle={{
            backgroundColor: '#FFFFFF',
            borderTopWidth: 0,
            height: 50,
            justifyContent: 'center',

            borderRadius: 40,
            marginBottom: 10,
          }}
          textInputProps={{
            style: {
              color: '#000',
              flex: 1,
              alignItems: 'center',
              paddingHorizontal: 20,
              marginBottom: Platform.OS === 'ios' ? 15 : 0,
            },
            multiline: false,
            returnKeyType: 'go',
            onSubmitEditing: () => {
              if (props.text && props.onSend) {
                let text = props.text;
                props.onSend({text: text.trim()}, true);
              }
            },
          }}
        />
      </>
    );
  };

  return (
    <View style={{flex: 1}}>
      <GiftedChat
        // renderInputToolbar={renderInputToolbar}
        // renderMessage={renderMessage}
        // renderSend={renderSend}
        showUserAvatar
        scrollToBottom
        messages={messages}
        onSend={onSend}
        alwaysShowSend
        user={{
          _id: user.uuid,
          name: `${user.firstname} ${user.lastname}`,
          avatar:
            'https://kristalle.com/wp-content/uploads/2020/07/dummy-profile-pic-1.jpg',
          //   avatar: user
          //     ? user.photo_url
          //     : 'https://kristalle.com/wp-content/uploads/2020/07/dummy-profile-pic-1.jpg',
        }}
        renderActions={() => (
          <Button onPress={handleImagePicker} title="Choose Image" />
        )}
        renderBubble={renderBubble}
      />
    </View>
  );
}

export default ChatScreen;
