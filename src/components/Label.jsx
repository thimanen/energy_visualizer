import { StyleSheet, View, Text } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import theme from '../theme'

const roundUp = (power) => {
  const kilo = power / 1000
  return Math.round(kilo * 100) / 100
}

const Label = ({ energyFlow, labelVisible }) => {
  if (labelVisible) {
    return (
      <View style={styles.labelContainer}>
        <MaterialCommunityIcons
          name="transmission-tower-export"
          size={20}
          color="black"
        />
        <Text> {roundUp(energyFlow.mainsBought)} kW </Text>

        <MaterialCommunityIcons name="solar-power" size={20} color="black" />
        <Text> {roundUp(energyFlow.solarUsed + energyFlow.solarSold)} kW </Text>

        <MaterialCommunityIcons
          name="transmission-tower-import"
          size={20}
          color="black"
        />
        <Text> {roundUp(energyFlow.solarSold)} kW</Text>
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
