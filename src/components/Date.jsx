import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { DateTime } from 'luxon'

const Date = ({ today, date, onSelectDate, selected }) => {
  const inputDate = DateTime.fromISO(date)
  
  // day is written on datepicker
  const day =
    inputDate.toISODate() === today
      ? 'Today'
      : inputDate.toFormat('EEE')

  // number of the day
  const dayNumber = inputDate.toFormat('d')
  const fullDate = inputDate.toISODate()

  return (
    <TouchableOpacity
      onPress={() => onSelectDate(fullDate)}
      style={[
        styles.card,
        selected === fullDate && { backgroundColor: '#6146c6' },
      ]}
    >
      <Text style={[styles.big, selected === fullDate && { color: '#fff' }]}>
        {day}
      </Text>
      <View style={{ height: 10 }} />
      <Text
        style={[
          styles.medium,
          selected === fullDate && {
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 12,
          },
        ]}
      >
        {dayNumber}
      </Text>
    </TouchableOpacity>
  )
}

export default Date

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#eee',
    borderRadius: 10,
    borderColor: '#ddd',
    padding: 5,
    marginVertical: 5,
    alignItems: 'center',
    height: 60,
    width: 60,
    marginHorizontal: 5,
  },
  big: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  medium: {
    fontSize: 10,
  },
})
