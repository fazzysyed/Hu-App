// import crashlytics from '@react-native-firebase/crashlytics';
// import firestore from '@react-native-firebase/firestore';

// import axios from 'axios';
// import React, {useEffect, useLayoutEffect, useState, useRef} from 'react';
// import Sound from 'react-native-sound';

// import {useTranslation} from 'react-i18next';
// import {
//   Alert,
//   Image,
//   PermissionsAndroid,
//   Platform,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import AwesomeAlert from 'react-native-awesome-alerts';
// import uuid from 'react-native-uuid';
// import {
//   RTCPeerConnection,
//   RTCView,
//   mediaDevices,
//   RTCIceCandidate,
//   MediaStream,
//   RTCSessionDescription,
// } from 'react-native-webrtc';

// import {getUniqueId} from 'react-native-device-info';
// import {Header} from 'react-native-elements';
// import {GiftedChat, InputToolbar, Send} from 'react-native-gifted-chat';
// import PushNotification from 'react-native-push-notification';
// import {
//   default as SimpleToast,
//   default as Toast,
// } from 'react-native-simple-toast';

// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Icon from 'react-native-vector-icons/Feather';
// import {useDispatch, useSelector} from 'react-redux';
// import {BASE_URL} from '../Api/BaseUrl';
// import Notification from 'react-native-vector-icons/Ionicons';
// import {
//   BLOCK_STATUS,
//   GET_ALL_HOSTS_FCM,
//   GET_DOORS_DETAILS_FOR_CHAT,
//   GET_SINGLE_DOOR,
//   GET_USER_BY_ID,
//   RING_THE_DOOR,
//   SAVE_CHAT,
// } from '../Api/EndPoints';
// import AnimatedLoader from '../components/AnimatedLoader';
// import {renderBubble, renderMessage} from '../components/Message';
// import Constants from '../Constants/Constants';
// import {getCurrentDate} from '../Helper/GetDate';
// import {InternetCheck} from '../Helper/NetworkCheck';
// import {NotificationCreator} from '../Helper/NotificationCreator';
// import {makeRoomId} from '../Helper/RoomIdGenerator';
// import {sendMessageNotification} from '../Helper/SendFirebaseNotification';
// import {
//   changeNotification,
//   makeCallDataHandler,
//   setPeerConnection,
// } from '../Store/Actions/actions';
// import DropDownPicker from 'react-native-dropdown-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {configuration} from '../Api/WebRTC';
// import {playSound} from '../Helper/PlaySound';

// const GroupChat = ({navigation, route}) => {
//   // const {user_id} = route.params;
//   const [messageCount, setMessageCount] = useState(0);

//   const {t, i18n} = useTranslation();

//   const userDoors = useSelector(state => state.Reducer.userDoors);

//   const dispatch = useDispatch();
//   const user = useSelector(state => state.Reducer.user);
//   const [isBlocked, setIsBlocked] = useState(false);

//   const isMountedRef = useRef(false);

//   const [messages, setMessages] = useState([]);

//   const [fetchedUser, setFetchedUser] = useState(null);
//   const [ringedOnStartUp, setRingOnStartUp] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [doorToSave, setDoorToSave] = useState(null);
//   const [ringCount, setRingCount] = useState(0);
//   const [ringing, setRinging] = useState(false);
//   const [notRing, setNotRing] = useState(false);
//   const [showAlert, setShowAlert] = useState(false);
//   const [allFcms, setAllFcms] = useState([]);
//   const [people, setPeople] = useState([]);
//   const [notifications, setNotifications] = useState(false);
//   const [sendNotificationTo, setSendNotificationTo] = useState([]);
//   const [theVisitor, setTheVisitor] = useState(null);
//   const [ringIsAlloweed, setRingIsAllowed] = useState(false);
//   const [callingAllowed, setCallingAllowed] = useState(false);
//   const [messageFromPreviousScreen, setMessageFromPreviousScreen] =
//     useState(false);
//   const [chatId, setChatId] = useState(
//     route.params.newUser != undefined
//       ? `${route.params.door_id}-${user ? user.id : getUniqueId()}`
//       : `${route.params.door_id}`,
//   );

//   const changeChatNotification = () => {
//     dispatch(changeNotification(false));
//   };

//   useEffect(() => {
//     changeChatNotification();
//     return () => {
//       dispatch(changeNotification(true));
//     };
//   }, []);

//   useEffect(() => {
//     if (route.params.chatgroupid) {
//       let newString = route.params.chatgroupid;
//       const myArray = newString.split('-');

//       console.log(myArray[1], 'MySUERUSUREU', newString);

//       if (myArray[1]) {
//         var config = {
//           method: 'get',
//           url: `${BASE_URL}${'fetch/user/'}${myArray[1]}`,
//           headers: {
//             // Authorization: `Bearer ${user.token}`,
//           },
//         };

//         axios(config)
//           .then(function (response) {
//             console.log(response.data.data, 'Hello Gutysysys');

//             if (response.data.meta.responseCode === 200) {
//               setTheVisitor(response.data.data);
//             }
//           })
//           .catch(function (error) {
//             console.log(
//               error.response.data,
//               'Fazzydataaa',
//               myArray.slice(1).join('-'),
//             );

//             var config = {
//               method: 'post',
//               url: 'https://doorbellap.com/api/get/single/anonymous',
//               headers: {},
//               data: {
//                 id: myArray[1],
//               },
//             };

//             axios(config)
//               .then(function (response) {
//                 console.log(response.data, 'THEANNOYMOUSESFJSJFJ');

//                 let anonymousUser = {
//                   username: 'Annonymous',
//                   profile:
//                     'https://kristalle.com/wp-content/uploads/2020/07/dummy-profile-pic-1.jpg',
//                   fcm_token: response.data.data.fcm_token,
//                   id: response.data.data.id,
//                 };

//                 console.log(anonymousUser, 'Eminem');
//                 setTheVisitor(anonymousUser);
//               })
//               .catch(function (error) {
//                 var config = {
//                   method: 'post',
//                   url: 'https://doorbellap.com/api/get/single/anonymous',
//                   headers: {},
//                   data: {
//                     id: myArray.slice(1).join('-'),
//                   },
//                 };

//                 axios(config)
//                   .then(function (response) {
//                     console.log(response.data, 'THEANNOYMOUSESFJSJFJ');

//                     let anonymousUser = {
//                       username: 'Annonymous',
//                       profile:
//                         'https://kristalle.com/wp-content/uploads/2020/07/dummy-profile-pic-1.jpg',
//                       fcm_token: response.data.data.fcm_token,
//                       id: response.data.data.id,
//                     };

//                     console.log(anonymousUser, 'Eminem');
//                     setTheVisitor(anonymousUser);
//                   })
//                   .catch(function (error) {
//                     console.log(error.response, 'FArazzzzzz');
//                   });

//                 console.log(error.response, 'FArazzzzzz');
//               });
//           });
//       } else {
//         setTheVisitor(null);
//       }
//     }

//     if (user) {
//       let docid = route.params.chatgroupid ? route.params.chatgroupid : chatId;
//       firestore()
//         .collection('chatrooms')
//         .doc(docid)
//         .onSnapshot(snap => {
//           if (snap.exists) {
//             let newArray = [...snap.data().users];
//             let FitleredArray = newArray.filter(
//               e => e.user_id === user.id.toString(),
//             );

//             if (FitleredArray) {
//               if (FitleredArray[0].notifications) {
//                 setNotifications(true);
//               } else {
//                 setNotifications(false);
//               }
//             } else {
//               setNotifications(true);
//             }
//           } else {
//             setNotifications(true);
//           }
//         });
//     }
//   }, []);

//   const getAllDetails = loading => {
//     setLoading(loading);
//     var time = new Date();

//     let config2 = {
//       method: 'post',
//       url: `${BASE_URL}${GET_DOORS_DETAILS_FOR_CHAT}`,
//       data: {
//         door_id: route.params.door_id,
//         visitor_id: route.params.chatgroupid
//           ? route.params.chatgroupid.split('-')[1]
//           : user
//           ? user.id
//           : getUniqueId(),
//       },
//     };

//     console.warn(
//       route.params.chatgroupid,
//       'ajachangdafafa',
//       {
//         door_id: route.params.door_id,
//         visitor_id: route.params.chatgroupid
//           ? route.params.chatgroupid.split('-')[1]
//           : user
//           ? user.id
//           : getUniqueId(),
//       },
//       'ryyrryryryry',
//     );
//     axios(config2)
//       .then(response => {
//         if (response.data.meta.responseCode === 200) {
//           console.log(response.data.data, 'chat data');
//           setDoorToSave(response.data.data.Door_Detail);
//           setFetchedUser(response.data.data.Owner);
//           setIsBlocked(response.data.data.is_blocked);

//           console.log(response.data.data.Hosts, 'TEstingFazzy');

//           callingIsAllowedHandler(response.data.data.Door_Detail);

//           let newArray = [];

//           console.warn(response.data.data.Hosts, 'FArazzzzzzBadaljaiga');
//           if (response.data.data.Hosts.length > 0) {
//             for (let item of response.data.data.Hosts) {
//               newArray.push({
//                 user_id: item.id,
//                 type: item.type === 'host' ? 'Host' : 'Visitor',
//                 notifications: true,
//                 is_seen: user
//                   ? Number(item.id) === Number(user.id)
//                     ? true
//                     : false
//                   : false,
//               });
//             }
//           }

//           setPeople(newArray);

//           setAllFcms(response.data.data.Hosts);
//           is_SeenHandler(true);
//           setLoading(false);
//         }
//       })
//       .catch(e => {
//         console.log(e.response, 'HGeajlfkajfaklfjalfjkalfkjaa');
//         SimpleToast.show(e.response.data, 'FarazShahahshshsh');
//         if (
//           e.response.data.meta.message[0] === 'The selected door id is invalid.'
//         ) {
//           navigation.goBack();
//         }
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     setShowAlert(false);
//     PushNotification.cancelLocalNotification('message');
//     if (route.params) {
//       getAllDetails(true);
//     }
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => getAllDetails(false), 5000);
//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   const setNotification = () => {
//     let docid = route.params.chatgroupid ? route.params.chatgroupid : chatId;
//     firestore()
//       .collection('chatrooms')
//       .doc(docid)
//       .get()
//       .then(snap => {
//         if (snap.exists) {
//           let newArray = [...snap.data().users];

//           let FitleredArray = newArray.filter(
//             e => e.user_id === user.id.toString(),
//           );
//           let ArrayWithoutTheUser = newArray.filter(
//             e => e.user_id != user.id.toString(),
//           );

//           if (FitleredArray) {
//             if (notifications) {
//               ArrayWithoutTheUser.push({
//                 user_id: FitleredArray[0].user_id,
//                 type: FitleredArray[0].type,
//                 notifications: false,
//               });
//             } else {
//               ArrayWithoutTheUser.push({
//                 user_id: FitleredArray[0].user_id,
//                 type: FitleredArray[0].type,
//                 notifications: true,
//               });
//             }
//           }

//           firestore()
//             .collection('chatrooms')
//             .doc(docid)
//             .update({
//               users: ArrayWithoutTheUser,
//               user_id: user ? user.id : getUniqueId(),
//               door_id: docid,
//               doorname: doorToSave.name,
//               screentoNavigate: 'RealDoorVisitorChat',

//               doorimage: doorToSave.image,
//             });
//         }
//       });
//   };

//   const is_SeenHandler = seen => {
//     let docid = route.params.chatgroupid ? route.params.chatgroupid : chatId;
//     firestore()
//       .collection('chatrooms')
//       .doc(docid)
//       .get()
//       .then(snap => {
//         if (snap.exists) {
//           if (user) {
//             let newArray = [...snap.data().users];

//             let FitleredArray = newArray.filter(
//               e => e.user_id === user.id.toString(),
//             );
//             let ArrayWithoutTheUser = newArray.filter(
//               e => e.user_id != user.id.toString(),
//             );

//             if (FitleredArray) {
//               ArrayWithoutTheUser.push({
//                 user_id: FitleredArray[0].user_id,
//                 type: FitleredArray[0].type,
//                 notifications: FitleredArray[0].notifications,
//                 is_seen: seen,
//               });
//             }

//             console.log(ArrayWithoutTheUser, 'Arraywithouttheser');

//             firestore().collection('chatrooms').doc(docid).update({
//               users: ArrayWithoutTheUser,
//             });
//           }
//         }
//       });
//   };

//   useEffect(() => {
//     let docid = route.params.chatgroupid ? route.params.chatgroupid : chatId;

//     const unsubscribe = firestore()
//       .collection('chatrooms')
//       .doc(docid)
//       .collection('messages')
//       .orderBy('createdAt', 'desc')

//       .onSnapshot(snapshot => {
//         const newMessages = snapshot.docs.map(doc => {
//           const data = doc.data();
//           // console.log(data, 'HHHHHH');
//           if (data.createdAt) {
//             return {
//               ...data,
//               createdAt: data.createdAt.toDate(),
//             };
//           } else {
//             return {
//               ...data,
//               createdAt: new Date(),
//             };
//           }
//         });

//         // Only play the sound if there are new messages from other users
//         if (user) {
//           const hasNewMessages = snapshot
//             .docChanges()
//             .some(
//               change =>
//                 change.type === 'added' &&
//                 Number(change.doc.data().user._id) !== Number(user.id),
//             );
//           if (hasNewMessages) {
//             console.log('Hello');
//             playSound();
//           }
//         }

//         setMessages(newMessages);
//       });

//     return () => unsubscribe();
//   }, []);

//   // useEffect(() => {
//   //   let docid = route.params.chatgroupid ? route.params.chatgroupid : chatId;

//   //   firestore()
//   //     .collection('chatrooms')
//   //     .doc(docid)
//   //     .collection('messages')
//   //     .orderBy('createdAt', 'desc')
//   //     .onSnapshot(querySnapshot => {
//   //       const messages = [];
//   //       querySnapshot.forEach(doc => {
//   //         if (messages.length > messageCount) {
//   //           if (user) {
//   //             if (Number(user.id) != Number(doc.data().user._id)) {
//   //               playSound();
//   //               setMessageCount(messages.length);
//   //             }
//   //           } else {
//   //             if (getUniqueId() != Number(doc.data().user._id)) {
//   //               playSound();
//   //               setMessageCount(messages.length);
//   //             }
//   //           }
//   //         }

//   //         if (doc.data().createdAt) {
//   //           messages.push({
//   //             id: doc.id,
//   //             ...doc.data(),
//   //             createdAt: doc.data().createdAt.toDate(),
//   //           });
//   //         } else {
//   //           messages.push({id: doc.id, ...doc.data(), createdAt: new Date()});
//   //         }
//   //       });

//   //       setMessages(messages);
//   //     });
//   // }, []);

//   // useLayoutEffect(() => {
//   //   console.log(chatId, 'Chatidddd');
//   //   let docid = route.params.chatgroupid ? route.params.chatgroupid : chatId;

//   //   console.log(chatId, 'GGKGKGKGKSGKSGK', route.params.chatgroupid);
//   //   // console.log(docid, 'jjjj', fetchedUser);

//   //   const messageRef = firestore()
//   //     .collection('chatrooms')
//   //     .doc(docid)
//   //     .collection('messages')
//   //     .orderBy('createdAt', 'desc');

//   //   // messageRef.onSnapshot(snapshot => {
//   //   //   const newMessages = snapshot
//   //   //     .docChanges()
//   //   //     .filter(change => change.type === 'added')
//   //   //     .map(change => ({
//   //   //       id: change.doc.id,
//   //   //       ...change.doc.data(),
//   //   //     }));
//   //   //   setMessages(prevMessages => [...prevMessages, ...newMessages]);
//   //   //   if (newMessages.length > 0) {
//   //   //     // playSound();
//   //   //   }
//   //   // });

//   //   messageRef.onSnapshot(querySnap => {
//   //     querySnap.docChanges().forEach(change => {
//   //       if (change.type === 'added') {
//   //         // Play the sound when a new message is added to the collection
//   //       }
//   //     });
//   //     const allmsg = querySnap.docs.map(docSanp => {
//   //       const data = docSanp.data();
//   //       // console.log(data, 'HHHHHH');
//   //       if (data.createdAt) {
//   //         return {
//   //           ...docSanp.data(),
//   //           createdAt: docSanp.data().createdAt.toDate(),
//   //         };
//   //       } else {
//   //         return {
//   //           ...docSanp.data(),
//   //           createdAt: new Date(),
//   //         };
//   //       }
//   //     });

//   //     setMessages(allmsg);

//   //     console.log(allmsg, 'HHHHHHKing', docid);
//   //   });
//   // }, []);

//   const onSend = async messageArray => {
//     if (isBlocked === false) {
//       const internet = await InternetCheck();
//       if (!internet) {
//         return;
//       }
//       const msg = messageArray[0];

//       let id = getUniqueId();
//       const mymsg = {
//         ...msg,
//         sentBy: user ? user.id : id,
//         sentTo: chatId,
//         createdAt: new Date(),
//       };
//       console.log(msg, 'HelloG', id, user);
//       setMessages(previousMessages => {
//         console.log(previousMessages, 'Previous');
//         GiftedChat.append(previousMessages, mymsg);
//       });
//       let docid = route.params.chatgroupid ? route.params.chatgroupid : chatId;

//       console.log(chatId, 'ChatOD');
//       firestore()
//         .collection('chatrooms')
//         .doc(docid)
//         .collection('messages')
//         .add({...mymsg, createdAt: firestore.FieldValue.serverTimestamp()})
//         .then(() => {
//           firestore()
//             .collection('chatrooms')
//             .doc(docid)
//             .get()
//             .then(snap => {
//               if (!snap.exists) {
//                 firestore()
//                   .collection('chatrooms')
//                   .doc(docid)
//                   .set({
//                     users: people,
//                     user_id: user ? user.id : getUniqueId(),
//                     door_id: docid,
//                     doorname: doorToSave.name,
//                     screentoNavigate: 'RealDoorVisitorChat',

//                     real_door: doorToSave.id,
//                     doorimage: doorToSave.image,

//                     last_message: {
//                       ...mymsg,
//                     },
//                     createdAt: new Date().getTime(),
//                   });
//               } else {
//                 let newArray = [...snap.data().users];

//                 if (newArray.length != allFcms.length) {
//                   firestore().collection('chatrooms').doc(docid).update({
//                     users: people,
//                   });
//                 } else {
//                   let updatedArray = [];

//                   newArray.map(item => {
//                     updatedArray.push({
//                       ...item,
//                       is_seen: false,
//                     });
//                   });
//                   firestore()
//                     .collection('chatrooms')
//                     .doc(docid)
//                     .update({
//                       users: updatedArray,
//                       last_message: {
//                         ...mymsg,
//                       },
//                       createdAt: new Date().getTime(),
//                     });
//                 }
//               }
//             });

//           if (allFcms.length) {
//             let usersFromChat = [];
//             firestore()
//               .collection('chatrooms')
//               .doc(docid)
//               .get()
//               .then(snap => {
//                 if (snap.exists) {
//                   let newArray = [...snap.data().users];

//                   console.log(newArray, 'JHJHJHJUTUTUTTUTURYRYRY');

//                   for (let newItem of newArray) {
//                     if (newItem.notifications) {
//                       console.log(newItem, 'KKKKFKFKFKFKFK');
//                       let newPerson = allFcms.find(
//                         x => x.id === newItem.user_id,
//                       );
//                       console.log(newPerson, 'NEw Person');

//                       usersFromChat.push(newPerson);
//                     }
//                   }

//                   if (usersFromChat.length) {
//                     console.log(usersFromChat, 'USRFROMCHAT');
//                     for (let i of usersFromChat) {
//                       sendMessageNotification(
//                         i.fcm,
//                         msg.user.name,
//                         msg.text,
//                         user ? user.id : getUniqueId(),
//                         route.params.door_id,
//                         docid,
//                         undefined,
//                         doorToSave.name,
//                       );
//                     }
//                   }
//                 } else {
//                   allFcms.map(item => {
//                     sendMessageNotification(
//                       item.fcm,
//                       msg.user.name,
//                       msg.text,
//                       user ? user.id : getUniqueId(),
//                       route.params.door_id,
//                       docid,
//                       undefined,
//                       doorToSave.name,
//                     );
//                   });
//                 }
//               });
//           }
//         });
//     } else {
//       setShowAlert(true);
//     }
//   };

//   const renderInputToolbar = props => {
//     return (
//       <>
//         <InputToolbar
//           {...props}
//           containerStyle={{
//             backgroundColor: '#FFFFFF',
//             borderTopWidth: 0,

//             borderRadius: 80,
//           }}
//           textInputProps={{
//             style: {
//               color: '#000',
//               flex: 1,
//               alignItems: 'center',
//               paddingHorizontal: 20,
//               marginBottom: Platform.OS === 'ios' ? 15 : 0,
//             },
//             multiline: false,
//             returnKeyType: 'go',
//             onSubmitEditing: () => {
//               if (props.text && props.onSend) {
//                 let text = props.text;
//                 props.onSend({text: text.trim()}, true);
//               }
//             },
//           }}
//         />
//       </>
//     );
//   };
//   const renderSend = props => {
//     return (
//       <Send {...props}>
//         <View style={{marginRight: 10, marginBottom: 5}}>
//           <Icon name="send" size={25} color={'black'} />
//         </View>
//       </Send>
//     );
//   };

//   function myDate() {
//     let day_id = '';
//     var a = new Date();
//     var weekdays = new Array(7);
//     weekdays[0] = 'Sunday';
//     weekdays[1] = 'Monday';
//     weekdays[2] = 'Tuesday';
//     weekdays[3] = 'Wednesday';
//     weekdays[4] = 'Thursday';
//     weekdays[5] = 'Friday';
//     weekdays[6] = 'Saturday';
//     var r = weekdays[a.getDay()];

//     if (r === 'Sunday') {
//       return (day_id = '3');
//     }
//     if (r === 'Monday') {
//       return (day_id = '4');
//     }
//     if (r === 'Tuesday') {
//       return (day_id = '5');
//     }
//     if (r === 'Wednesday') {
//       return (day_id = '6');
//     }
//     if (r === 'Thursday') {
//       return (day_id = '7');
//     }
//     if (r === 'Friday') {
//       return (day_id = '1');
//     }
//     if (r === 'Saturday') {
//       return (day_id = '2');
//     }
//   }

//   const callingIsAllowedHandler = item => {
//     if (user) {
//       if (Number(item.user_id) === Number(user.id)) {
//         setCallingAllowed(true);

//         setRingIsAllowed(false);
//       }
//     }
//     if (userDoors.some(e => Number(e.id) === Number(item.id))) {
//       setRingIsAllowed(false);
//     } else {
//       console.log(userDoors, 'HelloDoors');
//       // Alert.alert('Hi');
//       setRingIsAllowed(true);
//       setCallingAllowed(true);
//     }

//     if (!user) {
//       setRingIsAllowed(true);
//     }
//   };

//   const ringOnStartupHandler = async () => {
//     const internet = await InternetCheck();
//     if (!internet) {
//       return;
//     }

//     let dayToday = myDate();

//     if (doorToSave) {
//       let data = [...doorToSave.doordays];
//       console.log(data, 'KAIFIFFIFFIIF');

//       let newDay = data.filter(e => e.day_id === dayToday);
//       let today = getCurrentDate();

//       console.log(today);
//       let date = new Date(`${today} ${newDay[0].to_hour}`);
//       let date2 = new Date(`${today} ${newDay[0].from_hour}`);
//       let currentTime = new Date().getTime();

//       var startTime = new Date(date).getTime();
//       var endTime = new Date(date2).getTime();

//       if (currentTime >= startTime && currentTime <= endTime) {
//         if (route.params) {
//           if (ringCount < 3) {
//             setRinging(true);
//             setRingCount(ringCount + 1);

//             var config = {
//               method: 'post',
//               url: `${BASE_URL}${RING_THE_DOOR}`,

//               data: {
//                 guest_id: user ? user.id : '',
//                 door_id: route.params.door_id ? route.params.door_id : '',
//                 dev_converted_id: user ? '' : getUniqueId().substring(0, 6),
//                 dev_org_id: user ? '' : getUniqueId(),
//                 chat_id: chatId,
//                 screen: 'RealDoorVisitorChat',
//               },
//             };
//             axios(config)
//               .then(function (response) {
//                 console.log(response, 'faraz Syedddd TEsponse');
//                 Toast.show(t('Host Phone is Ringing.'));
//               })
//               .then(() => {
//                 console.log('KAHANISUNO');
//                 let myMessage = {
//                   _id: uuid.v4(),
//                   text: doorToSave.msg_in_operational_houres,
//                   createdAt: new Date(),

//                   user: {
//                     _id: route.params.user_id,
//                     name: doorToSave.name,
//                     avatar: doorToSave.image,
//                   },
//                 };

//                 let docid = route.params.chatgroupid
//                   ? route.params.chatgroupid
//                   : chatId;

//                 console.log(myMessage, 'SSdryrygrygrygrygr', fetchedUser);

//                 firestore()
//                   .collection('chatrooms')
//                   .doc(docid)
//                   .collection('messages')
//                   .add({
//                     ...myMessage,
//                     createdAt: firestore.FieldValue.serverTimestamp(),
//                   })
//                   .then(() => {
//                     console.log('Donessssss');
//                     firestore()
//                       .collection('chatrooms')
//                       .doc(docid)
//                       .get()
//                       .then(snap => {
//                         if (!snap.exists) {
//                           firestore()
//                             .collection('chatrooms')
//                             .doc(docid)
//                             .set({
//                               users: people,
//                               user_id: user ? user.id : getUniqueId(),
//                               door_id: docid,
//                               doorname: doorToSave.name,
//                               screentoNavigate: 'RealDoorVisitorChat',

//                               real_door: doorToSave.id,

//                               doorimage: doorToSave.image,

//                               last_message: {
//                                 ...myMessage,
//                               },
//                               createdAt: new Date().getTime(),
//                             });
//                         } else {
//                           let newArray = [...snap.data().users];

//                           if (newArray.length != allFcms.length) {
//                             firestore()
//                               .collection('chatrooms')
//                               .doc(docid)
//                               .update({
//                                 users: people,
//                               });
//                           } else {
//                             let updatedArray = [];

//                             newArray.map(item => {
//                               updatedArray.push({
//                                 ...item,
//                                 is_seen: false,
//                               });
//                             });
//                             firestore()
//                               .collection('chatrooms')
//                               .doc(docid)
//                               .update({
//                                 users: updatedArray,
//                                 last_message: {
//                                   ...myMessage,
//                                 },
//                                 createdAt: new Date().getTime(),
//                               });
//                           }
//                         }
//                       });
//                   })
//                   .catch(e => {
//                     console.log(e, 'BODY');
//                   });

//                 let tone =
//                   Platform.OS === 'ios'
//                     ? `${doorToSave.ring_tone}.mp3`
//                     : doorToSave.ring_tone;
//                 NotificationCreator(
//                   'Alert',
//                   doorToSave.msg_in_operational_houres,

//                   {},
//                   false,
//                   `doorbell${doorToSave.ring_tone}`,
//                   tone,
//                 );
//                 setTimeout(() => {
//                   setRinging(false);
//                 }, 5000);
//               })
//               .catch(function (error) {
//                 crashlytics().recordError(error.response);

//                 setRinging(false);
//                 SimpleToast.show(error.response.data.meta.message[0]);

//                 console.log(error.response);
//               });
//           } else {
//             setNotRing(true);

//             let myMessage = {
//               _id: uuid.v4(),
//               text: doorToSave.msg_in_off_houres,
//               createdAt: new Date(),

//               user: {
//                 _id: route.params.user_id,
//                 name: doorToSave.name,
//                 avatar: doorToSave.image,
//               },
//             };

//             let docid = route.params.chatgroupid
//               ? route.params.chatgroupid
//               : chatId;

//             firestore()
//               .collection('chatrooms')
//               .doc(docid)
//               .collection('messages')
//               .add({
//                 ...myMessage,
//                 createdAt: firestore.FieldValue.serverTimestamp(),
//               })
//               .then(() => {
//                 firestore()
//                   .collection('chatrooms')
//                   .doc(docid)
//                   .get()
//                   .then(snap => {
//                     if (!snap.exists) {
//                       firestore()
//                         .collection('chatrooms')
//                         .doc(docid)
//                         .set({
//                           users: people,
//                           user_id: user ? user.id : getUniqueId(),
//                           door_id: docid,
//                           doorname: doorToSave.name,
//                           screentoNavigate: 'RealDoorVisitorChat',

//                           real_door: doorToSave.id,
//                           doorimage: doorToSave.image,

//                           last_message: {
//                             ...myMessage,
//                           },
//                           createdAt: new Date().getTime(),
//                         });
//                     } else {
//                       let newArray = [...snap.data().users];

//                       if (newArray.length != allFcms.length) {
//                         firestore().collection('chatrooms').doc(docid).update({
//                           users: people,
//                         });
//                       } else {
//                         let updatedArray = [];

//                         newArray.map(item => {
//                           updatedArray.push({
//                             ...item,
//                             is_seen: false,
//                           });
//                         });
//                         firestore()
//                           .collection('chatrooms')
//                           .doc(docid)
//                           .update({
//                             users: updatedArray,
//                             last_message: {
//                               ...myMessage,
//                             },
//                             createdAt: new Date().getTime(),
//                           });
//                       }
//                     }
//                   });
//               });
//             let tone =
//               Platform.OS === 'ios'
//                 ? `${doorToSave.ring_tone}.mp3`
//                 : doorToSave.ring_tone;

//             NotificationCreator(
//               fetchedUser.username,
//               doorToSave.msg_in_off_houres,
//               {},
//               false,
//               `doorbell${doorToSave.ring_tone}`,
//               tone,
//             );
//           }
//         }
//       } else {
//         setNotRing(true);

//         let myMessage = {
//           _id: uuid.v4(),
//           text: doorToSave.msg_in_off_houres,
//           createdAt: new Date(),

//           user: {
//             _id: route.params.user_id,
//             name: doorToSave.name,
//             avatar: doorToSave.image,
//           },
//         };

//         let docid = route.params.chatgroupid
//           ? route.params.chatgroupid
//           : chatId;

//         firestore()
//           .collection('chatrooms')
//           .doc(docid)
//           .collection('messages')
//           .add({
//             ...myMessage,
//             createdAt: firestore.FieldValue.serverTimestamp(),
//           })
//           .then(snap => {
//             if (!snap.exists) {
//               firestore()
//                 .collection('chatrooms')
//                 .doc(docid)
//                 .set({
//                   users: people,
//                   user_id: user ? user.id : getUniqueId(),
//                   door_id: docid,
//                   doorname: doorToSave.name,
//                   screentoNavigate: 'RealDoorVisitorChat',

//                   real_door: doorToSave.id,
//                   doorimage: doorToSave.image,

//                   last_message: {
//                     ...myMessage,
//                   },
//                   createdAt: new Date().getTime(),
//                 });
//             } else {
//               let newArray = [...snap.data().users];

//               if (newArray.length != allFcms.length) {
//                 firestore().collection('chatrooms').doc(docid).update({
//                   users: people,
//                 });
//               } else {
//                 let updatedArray = [];

//                 newArray.map(item => {
//                   updatedArray.push({
//                     ...item,
//                     is_seen: false,
//                   });
//                 });
//                 firestore()
//                   .collection('chatrooms')
//                   .doc(docid)
//                   .update({
//                     users: updatedArray,
//                     last_message: {
//                       ...myMessage,
//                     },
//                     createdAt: new Date().getTime(),
//                   });
//               }
//             }
//           });
//         let tone =
//           Platform.OS === 'ios'
//             ? `${doorToSave.ring_tone}.mp3`
//             : doorToSave.ring_tone;

//         NotificationCreator(
//           fetchedUser.username,
//           doorToSave.msg_in_off_houres,
//           {},
//           false,
//           `doorbell${doorToSave.ring_tone}`,
//           tone,
//         );
//       }
//     }
//   };

//   useEffect(() => {
//     if (messageFromPreviousScreen === false) {
//       if (doorToSave && fetchedUser && !isBlocked && people.length) {
//         if (route.params) {
//           if (route.params.message) {
//             console.log('route.params.messages ');

//             let myMessage = {
//               _id: uuid.v4(),
//               text: route.params.message,
//               createdAt: new Date(),

//               user: {
//                 _id: user.id,
//                 name: user.username,
//                 avatar: user.profile,
//               },
//             };

//             let docid = route.params.chatgroupid
//               ? route.params.chatgroupid
//               : chatId;

//             console.log(docid, 'TEst');
//             firestore()
//               .collection('chatrooms')
//               .doc(docid)
//               .collection('messages')
//               .add({
//                 ...myMessage,
//                 createdAt: firestore.FieldValue.serverTimestamp(),
//               })
//               .then(() => {
//                 console.log('Donessssss');
//                 firestore()
//                   .collection('chatrooms')
//                   .doc(docid)
//                   .get()
//                   .then(snap => {
//                     if (!snap.exists) {
//                       firestore()
//                         .collection('chatrooms')
//                         .doc(docid)
//                         .set({
//                           users: people,
//                           user_id: user ? user.id : getUniqueId(),
//                           door_id: docid,
//                           doorname: doorToSave.name,
//                           screentoNavigate: 'RealDoorVisitorChat',

//                           real_door: doorToSave.id,
//                           doorimage: doorToSave.image,

//                           last_message: {
//                             ...myMessage,
//                           },
//                           createdAt: new Date().getTime(),
//                         });

//                       setMessageFromPreviousScreen(true);
//                     } else {
//                       let newArray = [...snap.data().users];

//                       if (newArray.length != allFcms.length) {
//                         firestore().collection('chatrooms').doc(docid).update({
//                           users: people,
//                         });
//                       } else {
//                         let updatedArray = [];

//                         newArray.map(item => {
//                           updatedArray.push({
//                             ...item,
//                             is_seen: false,
//                           });
//                         });
//                         firestore()
//                           .collection('chatrooms')
//                           .doc(docid)
//                           .update({
//                             users: updatedArray,
//                             last_message: {
//                               ...myMessage,
//                             },
//                             createdAt: new Date().getTime(),
//                           });
//                       }
//                       setMessageFromPreviousScreen(true);
//                     }
//                   });
//               })
//               .catch(e => {
//                 console.log(e, 'BODY');
//               });
//           }
//         }
//       }
//     }
//   }, [doorToSave, people]);

//   useEffect(() => {
//     if (ringedOnStartUp === false) {
//       if (doorToSave && fetchedUser && !isBlocked && people.length) {
//         if (user) {
//           if (Number(user.id) != Number(doorToSave.user_id)) {
//             if (route.params.onStart) {
//               ringOnStartupHandler();
//             }
//             setRingOnStartUp(true);
//           }
//         } else {
//           ringOnStartupHandler();
//           setRingOnStartUp(true);
//         }
//       }
//     }
//   }, [doorToSave, people]);

//   return (
//     <>
//       {/* <AwesomeAlert
//         show={showAlert}
//         showProgress={false}
//         title="Alert"
//         message="Dou you want to save the chat?"
//         closeOnTouchOutside={true}
//         closeOnHardwareBackPress={false}
//         showConfirmButton={true}
//         showCancelButton={true}
//         cancelText="No"
//         confirmText="Yes"
//         confirmButtonColor="#1A98D5"
//         cancelButtonColor="red"
//         onCancelPressed={() => {
//           deleteChat().then(() => {
//             setShowAlert(false);

//             navigation.goBack();
//           });
//         }}
//         onConfirmPressed={() => {
//           var config = {
//             method: 'post',
//             url: `${BASE_URL}${SAVE_CHAT}`,
//             headers: {
//               Authorization: `Bearer ${user.token}`,
//             },
//             data: {
//               user_id: route.params.user_id,
//               jsonData: JSON.stringify(messages),
//               door_id: route.params.door_id,
//             },
//           };

//           axios(config)
//             .then(function (response) {
//               setShowAlert(false);

//               navigation.goBack();
//             })
//             .catch(function (error) {
//               console.log(error);
//             });
//         }}
//       /> */}
//       {loading ? (
//         <AnimatedLoader />
//       ) : (
//         <>
//           {doorToSave && (
//             <>
//               <Header
//                 rightComponent={() => (
//                   <>
//                     {user && (
//                       <View
//                         style={{
//                           flexDirection: 'row',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           marginVertical: 10,
//                         }}>
//                         <Notification
//                           onPress={setNotification}
//                           name={
//                             notifications
//                               ? 'notifications'
//                               : 'notifications-off'
//                           }
//                           color={'#FFFFFF'}
//                           size={25}
//                           style={{marginHorizontal: 10, alignSelf: 'center'}}
//                         />
//                       </View>
//                     )}
//                   </>
//                 )}
//                 leftComponent={() => (
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       marginVertical: 5,
//                     }}>
//                     <AntDesign
//                       onPress={() => {
//                         if (user) {
//                           navigation.goBack();
//                         } else {
//                           navigation.goBack();
//                         }
//                       }}
//                       name="arrowleft"
//                       color={'#FFFFFF'}
//                       size={25}
//                       style={{marginHorizontal: 5}}
//                     />
//                     <TouchableOpacity>
//                       <Image
//                         source={
//                           doorToSave.image
//                             ? {uri: doorToSave.image}
//                             : Constants.PROFILE_PLACE_HOLDER
//                         }
//                         style={{
//                           alignSelf: 'center',
//                           width: 50,
//                           height: 50,
//                           borderRadius: 25,
//                         }}
//                       />
//                     </TouchableOpacity>
//                   </View>
//                 )}
//                 containerStyle={{
//                   borderBottomEndRadius: 15,
//                   borderBottomStartRadius: 15,
//                 }}
//                 statusBarProps={{
//                   barStyle: 'light-content',
//                   backgroundColor: '#1A98D5',
//                 }}
//                 barStyle="light-content" // or directly
//                 backgroundColor="#1A98D5"
//                 centerComponent={() => (
//                   <View
//                     style={{
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                       marginTop: 15,
//                     }}>
//                     <Text
//                       allowFontScaling={false}
//                       style={{
//                         fontFamily: 'Poppins-SemiBold',
//                         color: '#FFFFFF',
//                         fontSize: 18,
//                         textAlign: 'center',
//                       }}>
//                       {doorToSave.name}
//                     </Text>
//                   </View>
//                 )}
//               />

//               {!isBlocked && (
//                 <>
//                   {ringIsAlloweed && (
//                     <>
//                       {route.params && (
//                         <>
//                           {!notRing && (
//                             <>
//                               {ringing ? (
//                                 <View style={{alignItems: 'center'}}>
//                                   <Text
//                                     allowFontScaling={false}
//                                     style={{
//                                       marginVertical: 15,
//                                       color: 'grey',
//                                       fontFamily: 'Poppins-Bold',
//                                     }}>
//                                     {t('Please wait for the answer.')}
//                                   </Text>
//                                 </View>
//                               ) : (
//                                 <>
//                                   {messages && (
//                                     <>
//                                       {/* {messages.some(
//                   e => e.sentBy === route.params.user_id,
//                 ) ? null : ( */}
//                                       <>
//                                         {/* {doorToSave && Number(doorToSave.user_id) != user.id && ( */}
//                                         <TouchableOpacity
//                                           onPress={async () => {
//                                             ringOnStartupHandler();
//                                           }}
//                                           style={{
//                                             alignSelf: 'center',
//                                             marginVertical: 20,
//                                             backgroundColor: '#1A98D5',
//                                             height: 50,
//                                             width: 100,
//                                             padding: 10,
//                                             borderRadius: 5,
//                                             justifyContent: 'center',
//                                             alignItems: 'center',
//                                           }}>
//                                           <Text
//                                             allowFontScaling={false}
//                                             style={{
//                                               fontFamily: 'Poppins-SemiBold',
//                                               color: '#FFFFFF',
//                                             }}>
//                                             {t('Ring')}
//                                           </Text>
//                                         </TouchableOpacity>
//                                         {/* )} */}
//                                       </>
//                                       {/* )} */}
//                                     </>
//                                   )}
//                                 </>
//                               )}
//                             </>
//                           )}
//                         </>
//                       )}
//                     </>
//                   )}
//                 </>
//               )}

//               {/* )} */}

//               {!isBlocked && (
//                 <>
//                   {callingAllowed && (
//                     <>
//                       {user && (
//                         <View
//                           style={{
//                             alignSelf: 'center',
//                             flexDirection: 'row',
//                             justifyContent: 'space-between',
//                             marginVertical: 20,
//                           }}>
//                           {doorToSave && doorToSave.audio && (
//                             <TouchableOpacity
//                               onPress={async () => {
//                                 const internet = await InternetCheck();
//                                 if (!internet) {
//                                   return;
//                                 }

//                                 if (user.audio) {
//                                   if (Platform.OS === 'android') {
//                                     try {
//                                       const granted =
//                                         await PermissionsAndroid.request(
//                                           PermissionsAndroid.PERMISSIONS
//                                             .RECORD_AUDIO,
//                                           {
//                                             title: 'MICROPHONE Access Required',
//                                             message:
//                                               'This App needs to Access your MICROPHONE',
//                                           },
//                                         );
//                                       if (
//                                         granted ===
//                                         PermissionsAndroid.RESULTS.GRANTED
//                                       ) {
//                                         //To Check, If Permission is granted

//                                         let docid = route.params.chatgroupid
//                                           ? route.params.chatgroupid
//                                           : chatId;

//                                         console.log(
//                                           theVisitor,
//                                           'KFJRYUYTYTYTREEYEYYQQYYQ',
//                                         );

//                                         dispatch(
//                                           makeCallDataHandler({
//                                             // roomId :  route.params.user_id
//                                             chat_id: docid,
//                                             door_id: route.params.door_id,

//                                             roomId: uuid.v4(),
//                                             callTo:
//                                               Number(fetchedUser.id) ===
//                                               Number(user.id)
//                                                 ? theVisitor
//                                                 : fetchedUser,
//                                           }),
//                                         );

//                                         navigation.navigate('AudioCall');
//                                         // subscribeLocationLocation();
//                                       } else {
//                                         alert('Permission Denied');
//                                       }
//                                     } catch (err) {
//                                       // console.log(err);
//                                     }
//                                   } else {
//                                     let docid = route.params.chatgroupid
//                                       ? route.params.chatgroupid
//                                       : chatId;

//                                     dispatch(
//                                       makeCallDataHandler({
//                                         // roomId :  route.params.user_id
//                                         chat_id: docid,
//                                         door_id: route.params.door_id,

//                                         roomId: uuid.v4(),
//                                         callTo:
//                                           Number(fetchedUser.id) ===
//                                           Number(user.id)
//                                             ? theVisitor
//                                             : fetchedUser,
//                                       }),
//                                     );

//                                     navigation.navigate('AudioCall');
//                                   }
//                                 } else {
//                                   navigation.navigate('Offers', {
//                                     showModel: true,
//                                   });
//                                 }
//                                 // navigation.navigate('AudioCall', {
//                                 //   // roomId :  route.params.user_id
//                                 //   roomId: makeRoomId(),
//                                 //   callTo: fetchedUser,
//                                 // });
//                               }}>
//                               <Image
//                                 source={
//                                   user.audio
//                                     ? Constants.AUDIO_ICON
//                                     : Constants.AUDIO_PREMIUM_ICON
//                                 }
//                                 style={{
//                                   height: 60,
//                                   width: 60,
//                                   marginHorizontal: 30,
//                                 }}
//                               />
//                             </TouchableOpacity>
//                           )}
//                           {doorToSave && doorToSave.video && (
//                             <TouchableOpacity
//                               onPress={async () => {
//                                 const internet = await InternetCheck();
//                                 if (!internet) {
//                                   return;
//                                 }
//                                 if (user.video) {
//                                   if (Platform.OS === 'android') {
//                                     try {
//                                       const granted =
//                                         await PermissionsAndroid.request(
//                                           PermissionsAndroid.PERMISSIONS.CAMERA,
//                                           {
//                                             title: 'Camera Access Required',
//                                             message:
//                                               'This App needs to Access your MICROPHONE',
//                                           },
//                                         );
//                                       if (
//                                         granted ===
//                                         PermissionsAndroid.RESULTS.GRANTED
//                                       ) {
//                                         //To Check, If Permission is granted

//                                         let docid = route.params.chatgroupid
//                                           ? route.params.chatgroupid
//                                           : chatId;

//                                         console.log(
//                                           theVisitor,
//                                           'Hello the visitor',
//                                         );

//                                         dispatch(
//                                           makeCallDataHandler({
//                                             // roomId :  route.params.user_id
//                                             chat_id: docid,
//                                             door_id: route.params.door_id,

//                                             roomId: uuid.v4(),
//                                             callTo:
//                                               Number(fetchedUser.id) ===
//                                               Number(user.id)
//                                                 ? theVisitor
//                                                 : fetchedUser,
//                                           }),
//                                         );
//                                         navigation.navigate('Call');
//                                         // subscribeLocationLocation();
//                                       } else {
//                                         alert('Permission Denied');
//                                       }
//                                     } catch (err) {
//                                       // console.log(err);
//                                     }
//                                   } else {
//                                     let docid = route.params.chatgroupid
//                                       ? route.params.chatgroupid
//                                       : chatId;

//                                     console.log(
//                                       theVisitor,
//                                       'Hello the visitor',
//                                     );
//                                     dispatch(
//                                       makeCallDataHandler({
//                                         // roomId :  route.params.user_id
//                                         chat_id: docid,
//                                         door_id: route.params.door_id,

//                                         roomId: uuid.v4(),
//                                         callTo:
//                                           Number(fetchedUser.id) ===
//                                           Number(user.id)
//                                             ? theVisitor
//                                             : fetchedUser,
//                                       }),
//                                     );
//                                     navigation.navigate('Call');
//                                   }
//                                   // console.log(user);
//                                 } else {
//                                   navigation.navigate('Offers', {
//                                     showModel: true,
//                                   });
//                                 }
//                                 // navigation.navigate('Call', {
//                                 //   // roomId :  route.params.user_id
//                                 //   roomId: makeRoomId(),
//                                 //   callTo: fetchedUser,
//                                 // });
//                               }}>
//                               <Image
//                                 source={
//                                   user.video
//                                     ? Constants.VIDEO_ICON
//                                     : Constants.VIDEO_PREMIUM_ICON
//                                 }
//                                 style={{
//                                   height: 60,
//                                   width: 60,
//                                   marginHorizontal: 30,
//                                 }}
//                               />
//                             </TouchableOpacity>
//                           )}
//                         </View>
//                       )}
//                     </>
//                   )}
//                 </>
//               )}

//               <AwesomeAlert
//                 show={showAlert}
//                 showProgress={false}
//                 title="Alert"
//                 message="You have been blocked by the door owner!"
//                 closeOnTouchOutside={false}
//                 closeOnHardwareBackPress={false}
//                 showConfirmButton={true}
//                 confirmButtonColor="red"
//                 confirmText="Ok"
//                 onConfirmPressed={() => {
//                   if (user) {
//                     navigation.replace('Home');
//                   } else {
//                     navigation.replace('OnBoard');
//                   }
//                 }}
//               />

//               <GiftedChat
//                 renderUsernameOnMessage
//                 renderInputToolbar={renderInputToolbar}
//                 renderMessage={renderMessage}
//                 renderSend={renderSend}
//                 renderBubble={renderBubble}
//                 showUserAvatar
//                 scrollToBottom
//                 messages={messages}
//                 alwaysShowSend
//                 onSend={messages => onSend(messages)}
//                 user={{
//                   _id: user ? user.id : getUniqueId(),
//                   name: user ? user.username : 'Annonymous',
//                   avatar: user
//                     ? user.profile
//                     : 'https://kristalle.com/wp-content/uploads/2020/07/dummy-profile-pic-1.jpg',
//                 }}
//               />
//             </>
//           )}
//         </>
//       )}
//     </>
//   );
// };
// export default GroupChat;
