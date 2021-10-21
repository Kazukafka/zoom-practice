import React from 'react'
import { View, SafeAreaView, StyleSheet } from 'react-native'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import MenuButton from '../components/MenuButton'
import ContactsMenu from '../components/ContactsMenu'

function Home() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ height: '100%' }}>
        <Header />
        <SearchBar />
        <MenuButton />
        <ContactsMenu />

      </SafeAreaView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1c1c1c",
    padding: 15
  }
})
