import { useState } from 'react'
import Constants from 'expo-constants'
import { TextInput, StyleSheet, View } from 'react-native'
import Title from './Title'
import PlantData from './PlantData'
import ChartByHour from './ChartByHour'

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  },
})

const Main = () => {
  const [date, setDate] = useState('2025-05-23')

  const handleDateChange = (text) => {
    setDate(text)
  }

  return (
    <View style={styles.container}>
      <Title />
      <PlantData />
      <ChartByHour date={date} />
      <TextInput
        onChangeText={handleDateChange}
        value={date}
        placeholder="YYYY-MM-DD"
      />
    </View>
  )
}

export default Main
