import React, { useState, useEffect } from 'react'
import { Text, View, Dimensions } from 'react-native'
import { DateTime } from 'luxon'
import computeEnergyFlows from '../utils/energyCalculator'
import { BarChart } from 'react-native-gifted-charts'
import theme from '../theme'
import useYearData from '../hooks/useYearData'

// format the enerData to be compatible with StackedBarChart
const formatEnergyDataForStackedChartPerMonth = (data) => {
  const formattedData = []
  const firstMonth = data[0].month
  let currentMonth = 1

  while (currentMonth < firstMonth) {
    formattedData.push({
      label: currentMonth,
      stacks: [
        { value: 0, color: theme.chartColors.solarUsed },
        { value: 0, color: theme.chartColors.mainsBought },
        { value: 0, color: theme.chartColors.solarSold },
      ],
    })
    currentMonth += 1
  }

  for (let i = 0; i < data.length; i++) {
    const reading = data[i]

    formattedData.push({
      label: reading.month,
      stacks: [
        { value: reading.solarUsed, color: theme.chartColors.solarUsed },
        { value: reading.mainsBought, color: theme.chartColors.mainsBought },
        { value: -1 * reading.solarSold, color: theme.chartColors.solarSold },
      ],
    })
  }

  return formattedData
}

const ChartByYear = ({ date, setEnergyFlow, setLabelVisible }) => {
  const [energyData, setEnergyData] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(null)
  const { yearData, loading } = useYearData(date)

  const handleOnPress = (item, index) => {
    setEnergyFlow({
      solarUsed: item.stacks[0].value,
      mainsBought: item.stacks[1].value,
      solarSold: -1 * item.stacks[2].value,
    })
    setLabelVisible(true)

    setTimeout(() => {
      setLabelVisible(false)
    }, 5000)
  }

  useEffect(() => {
    if (yearData && yearData.length > 0) {
      const solarData = yearData.filter((s) => s.source === 'solar')
      const mainsData = yearData.filter((m) => m.source === 'mains')

      const energyFlow = computeEnergyFlows(mainsData, solarData)
      const energyFlowPerLocalDay = energyFlow.map((item) => ({
        ...item,
        month: DateTime.fromISO(item.timestamp).toLocal().month,
      }))
      const formattedEnergyData = formatEnergyDataForStackedChartPerMonth(
        energyFlowPerLocalDay
      )
      setEnergyData(formattedEnergyData)
    }
  }, [yearData])

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  if (!yearData || yearData.length === 0) {
    return (
      <View>
        <Text>No data available</Text>
      </View>
    )
  }

  return (
    <View
      style={{ backgroundColor: theme.chartColors.backgroundColor, padding: 5 }}
    >
      <BarChart
        stackData={energyData}
        width={Dimensions.get('window').width - 10}
        barWidth={20}
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
          '-100kWh',
          '-80kWh',
          '-60kWh',
          '-40kWh',
          '-20kWh',
          '0',
          '20kWh',
          '40kWh',
          '60kWh',
          '80kWh',
          '100kWh',
          '120kWh',
        ]}
        xAxisLabelTextStyle={{
          color: theme.chartColors.labelColor,
          fontSize: 10,
          textAlign: 'center',
        }}
        isAnimated
        noOfSections={6}
        labelsDistanceFromXaxis={10}
        maxValue={1200000}
        mostNegativeValue={-1000000}
        showStackLabels={true}
        onPress={(item, index) => handleOnPress(item, index)}
      />
    </View>
  )
}

export default ChartByYear
