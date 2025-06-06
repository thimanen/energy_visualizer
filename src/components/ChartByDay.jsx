import React, { useState, useEffect } from 'react'
import { Text, View, Dimensions } from 'react-native'
import { DateTime } from 'luxon'
import computeEnergyFlows from '../utils/energyCalculator'
import { BarChart } from 'react-native-gifted-charts'
import theme from '../theme'
import useDailyData from '../hooks/useDailyData'

// format the enerData to be compatible with StackedBarChart
const formatEnergyDataForStackedChartPerDay = (data) => {
  const formattedData = []
  for (let i = 0; i < data.length; i++) {
    const reading = data[i]

    formattedData.push({
      label: reading.day,
      stacks: [
        { value: reading.solarUsed, color: theme.chartColors.solarUsed },
        { value: reading.mainsBought, color: theme.chartColors.mainsBought },
        { value: -1 * reading.solarSold, color: theme.chartColors.solarSold },
      ],
    })
  }
  return formattedData
}

const ChartByDay = ({ date }) => {
  const [energyData, setEnergyData] = useState([])
  const { dailyData, loading } = useDailyData(date)

  useEffect(() => {
    if (dailyData && dailyData.length > 0) {
      const solarData = dailyData.filter((s) => s.source === 'solar')
      const mainsData = dailyData.filter((m) => m.source === 'mains')

      const energyFlow = computeEnergyFlows(mainsData, solarData)
      const energyFlowPerLocalDay = energyFlow.map((item) => ({
        ...item,
        day: DateTime.fromISO(item.timestamp).toLocal().toFormat('EEE'),
      }))
      const formattedEnergyData = formatEnergyDataForStackedChartPerDay(
        energyFlowPerLocalDay
      )
      setEnergyData(formattedEnergyData)
    }
  }, [dailyData])

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  if (!dailyData || dailyData.length === 0) {
    return (
      <View>
        <Text>No data available</Text>
      </View>
    )
  }

  return (
    <View style={{backgroundColor: theme.chartColors.backgroundColor, padding: 5 }}>
      <BarChart
        stackData={energyData}
        width={Dimensions.get('window').width - 10}
        barWidth={40}
        initialSpacing={10}
        spacing={10}
        barBorderRadius={4}
        backgroundColor={theme.chartColors.backgroundColor}
        yAxisTextStyle={{
          color: theme.chartColors.labelColor,
          fontSize: 12,
          backgroundColor: theme.chartColors.backgroundColor,
        }}
        yAxisLabelTexts={[
          '-40kWh',
          '-30kWh',
          '-20kWh',
          '-10kWh',
          '0',
          '10kWh',
          '20kWh',
          '30kWh',
          '40kWh',
          '50kWh',
          '60kWh',
        ]}
        xAxisLabelTextStyle={{
          color: theme.chartColors.labelColor,
          fontSize: 10,
          textAlign: 'center',
        }}
        isAnimated
        noOfSections={6}
        labelsDistanceFromXaxis={10}
        maxValue={60000}
        mostNegativeValue={-40000}
      />
    </View>
  )
}

export default ChartByDay
