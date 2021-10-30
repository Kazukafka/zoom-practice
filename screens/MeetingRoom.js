import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Alert, SafeAreaView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import StartMeeting from '../components/StartMeeting'
import { io } from "socket.io-client"
import { Camera } from 'expo-camera';
import FontAwesome from "react-native-vector-icons/FontAwesome";

const menuIcons = [
  {
    id: 1,
    name: "microphone",
    title: "mute",
    customColor: "#efefef",
  },
  {
    id: 2,
    name: "video-camera",
    title: "Stop Video",
  },
  {
    id: 3,
    name: "upload",
    title: "Share Content",
  },
  {
    id: 4,
    name: "group",
    title: "Participants",
  }
];
let socket;

function MeetingRoom() {
  const [name, setName] = useState()
  const [roomId, setRoomId] = useState()
  const [activeUsers, setActiveUsers] = useState([]);
  const [startCamera, setStartCamera] = useState(false)

  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      setStartCamera(true);
    } else {
      Alert.alert("Access denied");
    }
  }

  const joinRoom = () => {
    __startCamera();
    socket.emit('join-room', { roomId: roomId, userName: name })
  }

  useEffect(() => {
    // ここはngrokを使って外部時からアクセス可能にしてからURLを貼り付ける
    //ngrok is the tool that makes you personal URL able to access from third-party
    // つまり、順序ではターミナルで「ngrok http 3001」を先に実行する必要がある
    //At first, you need to do "ngrok http 3001"
    socket = io("http://84c1-126-197-232-78.ngrok.io");
    socket.on('connection', () => console.log("connected"))
    socket.on("all-users", users => {
      console.log(users, "After clean up")
      setActiveUsers(users)
    })
  }, [])

  return (
    <View style={styles.container}>
      {/* StartMeetingSection */}
      {startCamera ? (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.activeUsersContainer}>
            <View style={styles.cameraContainer}>
              <Camera
                type={"front"}
                style={{
                  width: activeUsers.length <= 1 ? "100%" : 150,
                  height: activeUsers.length <= 1 ? 600 : 150
                }}
              >
              </Camera>
              {activeUsers.filter(user => (user.userName != name)).map((user, index) =>
                <View key={index} style={styles.activeUserContainer}>
                  <Text style={{ color: "white" }}>{user.userName}</Text>
                </View>
              )}
            </View>
          </View>
          {/* Footer */}
          <View style={styles.menu}>
            {menuIcons.map((icon, index) =>
              <TouchableOpacity
                //to solve 「Warning: Each child in a list should have a unique "key" prop.」
                key={index}
                style={styles.tile}
              >
                <FontAwesome name={icon.name} size={24} color={"#efefef"} />
                <Text style={styles.textTile}>Mute</Text>
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaView>
      ) : (
        <StartMeeting
          name={name}
          setName={setName}
          roomId={roomId}
          setRoomId={setRoomId}
          joinRoom={joinRoom}
        />
      )
      }
    </View >
  )
}

export default MeetingRoom

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1c1c1c",
    flex: 1
  },
  tile: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginTop: 15
  },
  textTile: {
    color: "white",
    marginTop: 10
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  cameraContainer: {
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
  },
  activeUsersContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  },
  activeUserContainer: {
    borderColor: "gray",
    borderWidth: 1,
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center"
  }
})
