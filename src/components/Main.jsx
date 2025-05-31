import { useState } from 'react'
import Constants from 'expo-constants'
import { TextInput, StyleSheet, View } from 'react-native'
import { DateTime } from 'luxon'
import Title from './Title'
import PlantData from './PlantData'
import ChartByHour from './ChartByHour'
import Calendar from './Calendar'

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  },
})

const Main = () => {
  const today = DateTime.local().toISODate()
  const [date, setDate] = useState(today)
  const [selectedDate, setSelectedDate] = useState(
    DateTime.local().toISODate()
  )

  const handleDateChange = (text) => {
    setDate(text)
  }

  return (
    <View style={styles.container}>
      <Title />
      <PlantData />
      <ChartByHour date={selectedDate} />
      <Calendar today={today} onSelectDate={setSelectedDate} selected={selectedDate} />
    </View>
  )
}

export default Main
