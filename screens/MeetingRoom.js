import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Touchable } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import StartMeeting from '../components/StartMeeting'
import { io } from "socket.io-client"

let socket;

function MeetingRoom() {
  const [name, setName] = useState()
  const [roomId, setRoomId] = useState()
  const [activeUsers, setActiveUsers] = useState();

  const joinRoom = () => {
    socket.emit('join-room', { roomId: roomId, userName: name })
  }

  useEffect(() => {
    // ここはngrokを使って外部時からアクセス可能にしてからURLを貼り付ける
    //ngrok is the tool that makes you personal URL able to access from third-party
    // つまり、順序ではターミナルで「ngrok http 3001」を先に実行する必要がある
    //At first, you need to do "ngrok http 3001"
    socket = io("http://cccc-126-149-24-187.ngrok.io/");
    socket.on('connection', () => console.log("connected"))
    socket.on("all-users", users => {
      console.log("Active Users");
      console.log(users)
      setActiveUsers(users)
    })
  }, [])

  return (
    <View style={styles.container}>
      {/* StartMeetingSection */}
      <StartMeeting
        name={name}
        setName={setName}
        roomId={roomId}
        setRoomId={setRoomId}
        joinRoom={joinRoom}
      />
    </View>
  )
}

export default MeetingRoom

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1c1c1c",
    flex: 1
  },

})
