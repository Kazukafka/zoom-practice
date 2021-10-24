import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Touchable } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

function MeetingRoom() {
  const [name, setName] = useState()
  const [roomId, setRoomId] = useState()
  return (
    // StartMeetingSection
    <View style={styles.container}>
      <View style={styles.startMeetingContainer}>
        <View style={styles.info}>
          <TextInput
            style={styles.textInput}
            value={name}
            placeholder="Enter name"
            placeholderTextColor="#767467"
            onChangeText={text => setName(text)}
          />

        </View>
        <View style={styles.info}>
          <TextInput
            style={styles.textInput}
            value={roomId}
            placeholder="Enter room ID"
            placeholderTextColor="#767467"
            onChangeText={text => setRoomId(text)}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => { }}
            style={styles.startMeetingButton}
          >
            <Text style={{ color: "white" }}>
              Start Meeting
            </Text>

          </TouchableOpacity>
        </View>
      </View>
    </View >
  )
}

export default MeetingRoom

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1c1c1c",
    flex: 1
  },
  info: {
    width: "100%",
    backgroundColor: "#373538",
    height: 50,
    borderTopWidth: 1,
    borderColor: "#484648",
    padding: 12,
    justifyContent: "center"
  },
  textInput: {
    color: "white",
    fontSize: 18
  },
  startMeetingButton: {
    width: 350,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0470DC",
    height: 50,
    borderRadius: 15
  }
})