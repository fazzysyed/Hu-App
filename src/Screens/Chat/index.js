import React, {useEffect, useReducer, useState} from 'react';
import {Alert, Button, Image, View} from 'react-native';
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
import storage from '@react-native-firebase/storage';
import ImageView from '../../components/FullScreen';

function ChatScreen({route}) {
  const {proId} = route.params;
  const user = useSelector(state => state.Reducer.user);
  const [messages, setMessages] = useState([]);
  // const [chatId, setChatId] = useState(`${user.uuid}-${proId}`);
  const [chatId, setChatId] = useState('12345678');

  const [image, setImage] = useState(null);

  useEffect(() => {
    firestore()
      .collection('Chats')
      .get()
      .then(querySnapshot => {
        console.log(querySnapshot, 'alskfjalskfjalskj');
        querySnapshot.forEach(documentSnapshot => {
          console.log(documentSnapshot, 'faslkfhasfhjk');

          const documentId = documentSnapshot.id;

          firestore()
            .collection('Chats')
            .doc(documentId)
            .collection('messages')
            .where('sentBy', '==', user.uuid)
            .get()
            .then(messagesQuerySnapshot => {
              messagesQuerySnapshot.forEach(messageSnapshot => {
                const messageData = messageSnapshot.data();
                console.warn(messageData, 'fakjsfhaksjfhaksjfhaksfha');
                // Do something with the message data
              });
            })
            .catch(error => {
              console.log('Error getting messages:', error);
            });
        });
      })
      .catch(error => {
        console.log('Error getting documents:', error);
      });
  }, []);
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

  const onSend = async (newMessages = []) => {
    console.log(user.token);
    // if (image) {
    //   const formData = new FormData();
    //   formData.append('image', {
    //     uri: image.uri,
    //     type: image.type,
    //     name: image.fileName,
    //   });

    //   var requestOptions = {
    //     method: 'POST',
    //     body: formData,
    //     headers: {
    //       'Content-Type': 'multipart/form-data;',
    //       Authorization: `Bearer ${user.token}`,
    //     },
    //   };
    //   fetch('https://app.healthcare-up.com/api/v1/chat-image', requestOptions)
    //     .then(response => response.text())
    //     .then(response => {
    //       console.log(response);
    //       // setImage(null);

    //       // firestore()
    //       // .collection('Chats')
    //       // .doc(chatId)
    //       // .collection('messages')
    //       // .add({
    //       //   image: imageUrl,
    //       //   createdAt: firestore.FieldValue.serverTimestamp(),
    //       //   user: {
    //       //     _id: user.uuid,
    //       //     name: `${user.firstname} ${user.lastname}`,
    //       //   },
    //       // });
    //     })
    //     .catch(e => {
    //       console.log(JSON.stringify(e), 'Fazzysye');
    //     });

    //   // Upload the image to Firebase Storage
    // } else {
    const message = newMessages[0];
    const {text} = message;
    firestore()
      .collection('Chats')
      .doc(chatId)
      .collection('messages')
      .add({
        text: text,
        createdAt: firestore.Timestamp.fromDate(message.createdAt),
        sentBy: user.uuid,
        sentTo: proId,
        user: {
          _id: message.user._id,
          name: message.user.name,
          avatar: user.photo_url
            ? user.photo_url
            : 'https://kristalle.com/wp-content/uploads/2020/07/dummy-profile-pic-1.jpg',
        },
      });
    // }
  };

  const handleImagePicker = () => {
    // launchImageLibrary({noData: true, quality: 0.8}, response => {
    //   if (response.didCancel) {
    //     console.log('Image picker cancelled');
    //   } else if (response.error) {
    //     console.log('Image picker error:', response.error);
    //   } else {
    //     const imagenew = {
    //       uri: response.assets[0].uri,
    //       width: response.assets[0].width,
    //       height: response.assets[0].height,
    //       fileName: response.assets[0].fileName,
    //       type: response.assets[0].type,
    //     };
    //     setImage(imagenew);
    //   }
    // });
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
    if (image) {
    } else {
      return <InputToolbar {...props} />;
    }
  };

  return (
    <View style={{flex: 1}}>
      <GiftedChat
        // renderMessage={renderMessage}

        renderInputToolbar={renderInputToolbar}
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
        // renderActions={() => (
        //   <Button onPress={handleImagePicker} title="Choose Image" />
        // )}
        renderBubble={renderBubble}
      />
      {image && (
        <ImageView
          onSend={onSend}
          image={image.uri}
          onClose={() => {
            setImage(null);
          }}
        />
      )}
    </View>
  );
}

export default ChatScreen;
