import { useState, useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import useStatistics from '../hooks/useStatistics'
import theme from '../theme'
import { computeEnergyFlowsForTotals } from '../utils/energyCalculator'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const roundUpToMega = (power) => {
  const mega = power / 1000000
  return Math.round(mega * 100) / 100
}
const Statistics = ({ detailViewMode, date }) => {
  const { statData, loading } = useStatistics(date)
  const [energyFlow, setEnergyFlow] = useState(null)

  useEffect(() => {
    if (statData && statData.allTime && statData.allTime.length > 0) {
      const solarDataAllTime = statData.allTime.filter(
        (s) => s.source === 'solar'
      )
      const mainsDataAllTime = statData.allTime.filter(
        (m) => m.source === 'mains'
      )

      if (solarDataAllTime && mainsDataAllTime) {
        const flow = computeEnergyFlowsForTotals(
          mainsDataAllTime[0],
          solarDataAllTime[0]
        )
        setEnergyFlow(flow)
      } else {
        setEnergyFlow(null)
      }
    }
  }, [detailViewMode, statData])

  if (loading) return <Text>Loading data...</Text>
  if (!statData) return <Text>No current data</Text>
  if (!energyFlow) return <Text>No energy data available</Text>
  
  return (
    <View style={styles.labelContainer}>
      <Text>All time:</Text>
      <MaterialCommunityIcons
        name="transmission-tower-export"
        size={20}
        color="black"
      />
      <Text> {roundUpToMega(energyFlow.mainsBought)} MW </Text>

      <MaterialCommunityIcons name="solar-power" size={20} color="black" />
      <Text>
        {' '}
        {roundUpToMega(energyFlow.solarUsed + energyFlow.solarSold)} MW{' '}
      </Text>

      <MaterialCommunityIcons
        name="transmission-tower-import"
        size={20}
        color="black"
      />
      <Text> {roundUpToMega(energyFlow.solarSold)} MW</Text>
    </View>
  )
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
