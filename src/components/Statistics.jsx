import { View, StyleSheet, Text } from 'react-native'
import useStatistics from '../hooks/useStatistics'
import theme from '../theme'

const Statistics = ({ detailViewMode, date }) => {
  if (detailViewMode) {
    const { statData, loading } = useStatistics(date)

    if (loading) return <Text>Loading data...</Text>
    if (!statData) return <Text>No current data</Text>

    console.log(statData)

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
