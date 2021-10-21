import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

function MenuButton() {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <FontAwesome name={"video-camera"} size={23} color={"#efefef"} />
        </TouchableOpacity>
        <Text style={styles.menuText}>New Meeting</Text>
      </View>
    </View>
  )
}

export default MenuButton

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    paddingBottom: 10,
    borderBottomColor: "#1F1F1F",
    borderBottomWidth: 1
  },
  buttonContainer: {
    alignItems: "center"
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: "blue",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  menuText: {
    color: "#858585",
    fontSize: 20,
    paddingTop: 10,
    fontWeight: "600"
  }
})
