import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import theme from '../theme'

const Button = ({ title, detailViewMode, setDetailViewMode }) => {
  const toggleViewMode = () => {
    setDetailViewMode(!detailViewMode)
  }

  return (
    <TouchableOpacity
      style={[
        styles.card,
        detailViewMode === true && {
          backgroundColor: theme.calendarColors.cardSelectHigh,
        },
      ]}
      onPress={() => toggleViewMode()}
    >
      <Text style={[detailViewMode === true && { color: '#fff' }]}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default Button

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
