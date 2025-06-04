// example energy data from 23.5.

import React, { useState, useEffect } from 'react'
import { Text, View, Dimensions } from 'react-native'
import { DateTime } from 'luxon'
import computeEnergyFlows from '../utils/energyCalculator'
import { BarChart } from 'react-native-gifted-charts'
import theme from '../theme'
import useHourlyData from '../hooks/useHourlyData'

// format the enerData to be compatible with StackedBarChart
const formatEnergyDataForStackedChartPerHour = (data) => {
  const formattedData = []
  for (let i = 0; i < data.length; i++) {
    const reading = data[i]
    // Start showing from 01.00 till 24.00 (00.00)
    let hour = parseInt(reading.hour) % 24
    // Show only every other label
    const showLabel = hour % 2 === 0
    const label = showLabel ? String(hour) : ''

    formattedData.push({
      label,
      stacks: [
        { value: reading.solarUsed, color: theme.chartColors.solarUsed },
        { value: reading.mainsBought, color: theme.chartColors.mainsBought },
        { value: -1 * reading.solarSold, color: theme.chartColors.solarSold },
      ],
    })
  }
  return formattedData
}

const ChartByHour = ({ date }) => {
  const [energyData, setEnergyData] = useState([])
  const { hourlyData, loading } = useHourlyData(date)

  useEffect(() => {
    if (!loading && hourlyData && hourlyData.length > 0) {
      const solarData = hourlyData.filter((s) => s.source === 'solar')
      const mainsData = hourlyData.filter((m) => m.source === 'mains')

      const energyFlow = computeEnergyFlows(mainsData, solarData)
      const energyFlowPerLocalHour = energyFlow.map((item) => ({
        ...item,
        hour: DateTime.fromISO(item.timestamp).toLocal().toFormat('HH'),
      }))
      const formattedEnergyData = formatEnergyDataForStackedChartPerHour(
        energyFlowPerLocalHour
      )
      setEnergyData(formattedEnergyData)
    }
  }, [hourlyData])

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  if (!hourlyData || hourlyData.length === 0) {
    return (
      <View>
        <Text>No data available</Text>
      </View>
    )
  }

  return (
    <View>
      <BarChart
        stackData={energyData}
        width={Dimensions.get('window').width - 10}
        barWidth={11}
        initialSpacing={10}
        spacing={5}
        barBorderRadius={4}
        backgroundColor={theme.chartColors.backgroundColor}
        yAxisTextStyle={{ color: theme.chartColors.labelColor, fontSize: 10 }}
        yAxisLabelTexts={[
          '-6kWh',
          '-4kWh',
          '-2kWh',
          '0',
          '2kWh',
          '4kWh',
          '6kWh',
          '8kWh',
          '10kWh',
          '12kWh',
        ]}
        xAxisLabelTextStyle={{
          color: theme.chartColors.labelColor,
          fontSize: 10,
          textAlign: 'center',
        }}
        isAnimated
        noOfSections={6}
        labelsDistanceFromXaxis={10}
        maxValue={12000}
        mostNegativeValue={-6000}
      />
    </View>
  )
}

export default ChartByHour
