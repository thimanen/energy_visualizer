// example energy data from 23.5.

import React, { useState, useEffect } from 'react'
import { Text, View, Dimensions } from 'react-native'
import { DateTime } from 'luxon'
import computeEnergyFlows from '../utils/energyCalculator'
import { BarChart } from 'react-native-gifted-charts'
import theme from '../theme'

const hourlyData = [
  {
    total_act_energy: 1132.6395,
    total_act_ret_energy: 0,
    max_act_power: 3414,
    count: 60,
    source: 'mains',
    timestamp: '2025-05-22T21:00:00.000Z',
  },
  {
    total_act_energy: 0.14759999999999998,
    total_act_ret_energy: 0.08829999999999999,
    max_act_power: 0,
    count: 60,
    source: 'solar',
    timestamp: '2025-05-22T21:00:00.000Z',
  },
  {
    total_act_energy: 462.7493,
    total_act_ret_energy: 0,
    max_act_power: 1249.3,
    count: 60,
    source: 'mains',
    timestamp: '2025-05-22T22:00:00.000Z',
  },
  {
    total_act_energy: 0.09369999999999999,
    total_act_ret_energy: 0.06949999999999999,
    max_act_power: 0,
    count: 60,
    source: 'solar',
    timestamp: '2025-05-22T22:00:00.000Z',
  },
  {
    total_act_energy: 456.0618,
    total_act_ret_energy: 0,
    max_act_power: 1161.3000000000002,
    count: 60,
    source: 'mains',
    timestamp: '2025-05-22T23:00:00.000Z',
  },
  {
    total_act_energy: 0.10089999999999999,
    total_act_ret_energy: 0.0877,
    max_act_power: 0,
    count: 60,
    source: 'solar',
    timestamp: '2025-05-22T23:00:00.000Z',
  },
  {
    total_act_energy: 441.65569999999997,
    total_act_ret_energy: 0,
    max_act_power: 2511.2999999999997,
    count: 60,
    source: 'mains',
    timestamp: '2025-05-23T00:00:00.000Z',
  },
  {
    total_act_energy: 0.1025,
    total_act_ret_energy: 0.089,
    max_act_power: 0,
    count: 60,
    source: 'solar',
    timestamp: '2025-05-23T00:00:00.000Z',
  },
  {
    total_act_energy: 429.4313,
    total_act_ret_energy: 0,
    max_act_power: 2656.6,
    count: 60,
    source: 'mains',
    timestamp: '2025-05-23T01:00:00.000Z',
  },
  {
    total_act_energy: 26.2087,
    total_act_ret_energy: 0.048,
    max_act_power: 52.099999999999994,
    count: 60,
    source: 'solar',
    timestamp: '2025-05-23T01:00:00.000Z',
  },
  {
    total_act_energy: 354.224,
    total_act_ret_energy: 2.2835,
    max_act_power: 2322.4,
    count: 60,
    source: 'mains',
    timestamp: '2025-05-23T02:00:00.000Z',
  },
  {
    total_act_energy: 106.2204,
    total_act_ret_energy: 0.0595,
    max_act_power: 341.8,
    count: 60,
    source: 'solar',
    timestamp: '2025-05-23T02:00:00.000Z',
  },
  {
    total_act_energy: 176.224,
    total_act_ret_energy: 30.964,
    max_act_power: 912.1999999999999,
    count: 60,
    source: 'mains',
    timestamp: '2025-05-23T03:00:00.000Z',
  },
  {
    total_act_energy: 320.4223,
    total_act_ret_energy: 0,
    max_act_power: 498.29999999999995,
    count: 60,
    source: 'solar',
    timestamp: '2025-05-23T03:00:00.000Z',
  },
  {
    total_act_energy: 1718.9774,
    total_act_ret_energy: 102.4474,
    max_act_power: 5500.5,
    count: 60,
    source: 'mains',
    timestamp: '2025-05-23T04:00:00.000Z',
  },
  {
    total_act_energy: 629.4922,
    total_act_ret_energy: 0,
    max_act_power: 1087.6,
    count: 60,
    source: 'solar',
    timestamp: '2025-05-23T04:00:00.000Z',
  },
  {
    total_act_energy: 78.9611,
    total_act_ret_energy: 271.8168,
    max_act_power: 1133.5,
    count: 60,
    source: 'mains',
    timestamp: '2025-05-23T05:00:00.000Z',
  },
  {
    total_act_energy: 809.8751,
    total_act_ret_energy: 0,
    max_act_power: 1253.2,
    count: 60,
    source: 'solar',
    timestamp: '2025-05-23T05:00:00.000Z',
  },
  {
    total_act_energy: 45.2769,
    total_act_ret_energy: 950.1002,
    max_act_power: 1160.3,
    count: 60,
    source: 'mains',
    timestamp: '2025-05-23T06:00:00.000Z',
  },
  {
    total_act_energy: 1422.506,
    total_act_ret_energy: 0,
    max_act_power: 2641.8,
    count: 60,
    source: 'solar',
    timestamp: '2025-05-23T06:00:00.000Z',
  },
  {
    total_act_energy: 612.5941,
    total_act_ret_energy: 2172.6823,
    max_act_power: 918.5,
    count: 60,
    source: 'mains',
    timestamp: '2025-05-23T07:00:00.000Z',
  },
  {
    total_act_energy: 2933.7738,
    total_act_ret_energy: 0,
    max_act_power: 3792.2,
    count: 60,
    source: 'solar',
    timestamp: '2025-05-23T07:00:00.000Z',
  },
  {
    total_act_energy: 0.0115,
    total_act_ret_energy: 3333.3522000000003,
    max_act_power: -709,
    count: 60,
    source: 'mains',
    timestamp: '2025-05-23T08:00:00.000Z',
  },
  {
    total_act_energy: 3745.9091,
    total_act_ret_energy: 0,
    max_act_power: 5711.5,
    count: 60,
    source: 'solar',
    timestamp: '2025-05-23T08:00:00.000Z',
  },
  {
    total_act_energy: 0,
    total_act_ret_energy: 3897.6068999999998,
    max_act_power: -1418.2,
    count: 60,
    source: 'mains',
    timestamp: '2025-05-23T09:00:00.000Z',
  },
  {
    total_act_energy: 4293.213,
    total_act_ret_energy: 0,
    max_act_power: 5938.8,
    count: 60,
    source: 'solar',
    timestamp: '2025-05-23T09:00:00.000Z',
  },
  {
    total_act_energy: 0,
    total_act_ret_energy: 4730.631,
    max_act_power: -973.3,
    count: 60,
    source: 'mains',
    timestamp: '2025-05-23T10:00:00.000Z',
  },
  {
    total_act_energy: 5356.3019,
    total_act_ret_energy: 0,
    max_act_power: 6536,
    count: 60,
    source: 'solar',
    timestamp: '2025-05-23T10:00:00.000Z',
  },
  {
    total_act_energy: 0.1067,
    total_act_ret_energy: 2640.6298,
    max_act_power: -162.9000000000001,
    count: 60,
    source: 'mains',
    timestamp: '2025-05-23T11:00:00.000Z',
  },
  {
    total_act_energy: 3279.5901,
    total_act_ret_energy: 0,
    max_act_power: 7100,
    count: 60,
    source: 'solar',
    timestamp: '2025-05-23T11:00:00.000Z',
  },
  {
    total_act_energy: 300.6436,
    total_act_ret_energy: 2414.9797,
    max_act_power: 876.5999999999999,
    count: 60,
    source: 'mains',
    timestamp: '2025-05-23T12:00:00.000Z',
  },
  {
    total_act_energy: 3500.9064,
    total_act_ret_energy: 0,
    max_act_power: 6702.9,
    count: 60,
    source: 'solar',
    timestamp: '2025-05-23T12:00:00.000Z',
  },
  {
    total_act_energy: 6856.7142,
    total_act_ret_energy: 50.7477,
    max_act_power: 10428.9,
    count: 60,
    source: 'mains',
    timestamp: '2025-05-23T13:00:00.000Z',
  },
  {
    total_act_energy: 695.397,
    total_act_ret_energy: 0,
    max_act_power: 1160,
    count: 60,
    source: 'solar',
    timestamp: '2025-05-23T13:00:00.000Z',
  },
  {
    total_act_energy: 25.0299,
    total_act_ret_energy: 200.7669,
    max_act_power: 344.30000000000007,
    count: 60,
    source: 'mains',
    timestamp: '2025-05-23T14:00:00.000Z',
  },
  {
    total_act_energy: 770.0153,
    total_act_ret_energy: 0,
    max_act_power: 1070.7,
    count: 60,
    source: 'solar',
    timestamp: '2025-05-23T14:00:00.000Z',
  },
  {
    total_act_energy: 5944.1392,
    total_act_ret_energy: 36.8836,
    max_act_power: 11167.6,
    count: 60,
    source: 'mains',
    timestamp: '2025-05-23T15:00:00.000Z',
  },
  {
    total_act_energy: 436.206,
    total_act_ret_energy: 0,
    max_act_power: 755.8,
    count: 60,
    source: 'solar',
    timestamp: '2025-05-23T15:00:00.000Z',
  },
  {
    total_act_energy: 1111.9186,
    total_act_ret_energy: 0,
    max_act_power: 3070.1,
    count: 60,
    source: 'mains',
    timestamp: '2025-05-23T16:00:00.000Z',
  },
  {
    total_act_energy: 138.006,
    total_act_ret_energy: 0,
    max_act_power: 263.8,
    count: 60,
    source: 'solar',
    timestamp: '2025-05-23T16:00:00.000Z',
  },
  {
    total_act_energy: 1360.5057,
    total_act_ret_energy: 0,
    max_act_power: 3008.4,
    count: 60,
    source: 'mains',
    timestamp: '2025-05-23T17:00:00.000Z',
  },
  {
    total_act_energy: 46.761,
    total_act_ret_energy: 0,
    max_act_power: 84.9,
    count: 60,
    source: 'solar',
    timestamp: '2025-05-23T17:00:00.000Z',
  },
  {
    total_act_energy: 2689.9898,
    total_act_ret_energy: 0,
    max_act_power: 9799.2,
    count: 60,
    source: 'mains',
    timestamp: '2025-05-23T18:00:00.000Z',
  },
  {
    total_act_energy: 2.1358,
    total_act_ret_energy: 11.241299999999999,
    max_act_power: 32.5,
    count: 60,
    source: 'solar',
    timestamp: '2025-05-23T18:00:00.000Z',
  },
  {
    total_act_energy: 891.181,
    total_act_ret_energy: 0,
    max_act_power: 3014.9999999999995,
    count: 60,
    source: 'mains',
    timestamp: '2025-05-23T19:00:00.000Z',
  },
  {
    total_act_energy: 0.1779,
    total_act_ret_energy: 2.2425,
    max_act_power: 1.7999999999999998,
    count: 60,
    source: 'solar',
    timestamp: '2025-05-23T19:00:00.000Z',
  },
  {
    total_act_energy: 927.6623,
    total_act_ret_energy: 0,
    max_act_power: 2976.8,
    count: 60,
    source: 'mains',
    timestamp: '2025-05-23T20:00:00.000Z',
  },
  {
    total_act_energy: 0.1764,
    total_act_ret_energy: 0.09659999999999999,
    max_act_power: 1.7999999999999998,
    count: 60,
    source: 'solar',
    timestamp: '2025-05-23T20:00:00.000Z',
  },
]

// format the enerData to be compatible with StackedBarChart
const formatEnergyDataForStackedChart = (data) => {
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

const ChartByHour = () => {
  const [energyData, setEnergyData] = useState([])

  const solarData = hourlyData.filter((s) => s.source === 'solar')
  const mainsData = hourlyData.filter((m) => m.source === 'mains')

  useEffect(() => {
    const energyFlow = computeEnergyFlows(mainsData, solarData)
    const energyFlowPerLocalHour = energyFlow.map((item) => ({
      ...item,
      hour: DateTime.fromISO(item.timestamp).toLocal().toFormat('HH'),
    }))
    const formattedEnergyData = formatEnergyDataForStackedChart(
      energyFlowPerLocalHour
    )
    setEnergyData(formattedEnergyData)
  }, [hourlyData])

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
        xAxisLabelTextStyle={{
          color: theme.chartColors.labelColor,
          fontSize: 10,
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
