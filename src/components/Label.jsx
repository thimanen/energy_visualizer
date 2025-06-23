import { StyleSheet, View, Text } from 'react-native'
import theme from '../theme'

const Label = ({ energyFlow, labelVisible }) => {
  if (labelVisible) {
    return (
      <View style={styles.labelContainer}>
        <Text>mains: {energyFlow.mainsBought}, </Text>
        <Text>solar used: {energyFlow.solarUsed}, </Text>
        <Text>solar sold: {energyFlow.solarSold}</Text>
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

export default Label

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection:'row',
    backgroundColor: theme.chartColors.backgroundColor,
    marginVertical: 5,
    alignItems: 'center',
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
