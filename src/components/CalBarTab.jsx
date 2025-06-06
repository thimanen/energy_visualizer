import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import theme from '../theme'

const CalBarTab = ({ title, calendarMode, setCalendarMode }) => {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        calendarMode === title && { backgroundColor: theme.calendarColors.cardSelectHigh },
      ]}
      onPress={() =>setCalendarMode(title)}
    >
      <Text style={[calendarMode === title && { color: '#fff' }]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CalBarTab

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.calendarColors.cardBackground,
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
