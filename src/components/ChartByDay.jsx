import React, { useState, useEffect } from 'react'
import { Text, View, Dimensions } from 'react-native'
import { DateTime } from 'luxon'
import computeEnergyFlows from '../utils/energyCalculator'
import { BarChart } from 'react-native-gifted-charts'
import theme from '../theme'
import useDailyData from '../hooks/useDailyData'

const dailyData_old = [
  {
    total_act_energy: 32062.353,
    total_act_ret_energy: 19572.246,
    max_act_power: 7843.4,
    count: 1440,
    source: 'mains',
    timestamp: '2025-05-25T21:00:00.000Z',
  },
  {
    total_act_energy: 28542.7894,
    total_act_ret_energy: 11.5344,
    max_act_power: 7449.000000000001,
    count: 1440,
    source: 'solar',
    timestamp: '2025-05-25T21:00:00.000Z',
  },
  {
    total_act_energy: 19753.605,
    total_act_ret_energy: 32346.3811,
    max_act_power: 11210,
    count: 1440,
    source: 'mains',
    timestamp: '2025-05-26T21:00:00.000Z',
  },
  {
    total_act_energy: 43178.9505,
    total_act_ret_energy: 4.7411,
    max_act_power: 7330,
    count: 1440,
    source: 'solar',
    timestamp: '2025-05-26T21:00:00.000Z',
  },
  {
    total_act_energy: 16835.641,
    total_act_ret_energy: 10820.5567,
    max_act_power: 6264.1,
    count: 1440,
    source: 'mains',
    timestamp: '2025-05-27T21:00:00.000Z',
  },
  {
    total_act_energy: 18521.6858,
    total_act_ret_energy: 8.3553,
    max_act_power: 6324.499999999999,
    count: 1440,
    source: 'solar',
    timestamp: '2025-05-27T21:00:00.000Z',
  },
  {
    total_act_energy: 29208.5537,
    total_act_ret_energy: 15593.3256,
    max_act_power: 9988.1,
    count: 1440,
    source: 'mains',
    timestamp: '2025-05-28T21:00:00.000Z',
  },
  {
    total_act_energy: 21991.7075,
    total_act_ret_energy: 13.2348,
    max_act_power: 5226.299999999999,
    count: 1440,
    source: 'solar',
    timestamp: '2025-05-28T21:00:00.000Z',
  },
  {
    total_act_energy: 15540.9391,
    total_act_ret_energy: 30773.4705,
    max_act_power: 5962.1,
    count: 1440,
    source: 'mains',
    timestamp: '2025-05-29T21:00:00.000Z',
  },
  {
    total_act_energy: 40564.6254,
    total_act_ret_energy: 8.1169,
    max_act_power: 6816.1,
    count: 1440,
    source: 'solar',
    timestamp: '2025-05-29T21:00:00.000Z',
  },
  {
    total_act_energy: 21694.8046,
    total_act_ret_energy: 5227.7257,
    max_act_power: 10524.5,
    count: 1440,
    source: 'mains',
    timestamp: '2025-05-30T21:00:00.000Z',
  },
  {
    total_act_energy: 13117.9111,
    total_act_ret_energy: 14.4743,
    max_act_power: 2265.1,
    count: 1440,
    source: 'solar',
    timestamp: '2025-05-30T21:00:00.000Z',
  },
  {
    total_act_energy: 11977.0972,
    total_act_ret_energy: 11095.2803,
    max_act_power: 9637.5,
    count: 1317,
    source: 'mains',
    timestamp: '2025-05-31T21:00:00.000Z',
  },
  {
    total_act_energy: 19317.0175,
    total_act_ret_energy: 0.47329999999999994,
    max_act_power: 8045.5,
    count: 1317,
    source: 'solar',
    timestamp: '2025-05-31T21:00:00.000Z',
  },
]

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
    <View>
      <BarChart
        stackData={energyData}
        width={Dimensions.get('window').width - 10}
        barWidth={40}
        initialSpacing={10}
        spacing={10}
        barBorderRadius={4}
        backgroundColor={theme.chartColors.backgroundColor}
        yAxisTextStyle={{ color: theme.chartColors.labelColor, fontSize: 10 }}
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
