import { View, StyleSheet, Text } from 'react-native'
import theme from '../theme'

const Statistics = ({ detailViewMode }) => {
  if (detailViewMode) {
    return (
      <View style={styles.labelContainer}>
        <Text>Statistics</Text>
      </View>
    )
  } else {
    return (
      <View style={styles.labelContainer}>
        <Text style={styles.hiddenTextStyle}>This label is not visiblel</Text>
      </View>
    )
  }
}
export default Statistics

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row',
    backgroundColor: theme.chartColors.backgroundColor,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginHorizontal: 5,
  },
  hiddenTextStyle: {
    color: theme.chartColors.backgroundColor,
  },
  big: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  medium: {
    fontSize: 10,
  },
})
