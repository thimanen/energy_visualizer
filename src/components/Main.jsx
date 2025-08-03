import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { DateTime } from 'luxon'
import Title from './Title'
import PlantData from './PlantData'
import ChartByHour from './ChartByHour'
import CalBar from './CalBar'
import DayCalendar from './DayCalendar'
import ChartByDay from './ChartByDay'
import ChartByMonth from './ChartByMonth'
import Label from './Label'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.chartColors.backgroundColor,
  },
})

const Main = () => {
  const today = DateTime.local().toISODate()

  const [calendarMode, setCalendarMode] = useState('Day')
  const [selectedDate, setSelectedDate] = useState(DateTime.local().toISODate())
  const [energyFlow, setEnergyFlow] = useState({})
  const [labelVisible, setLabelVisible] = useState(false)

  return (
    <View style={styles.container}>
      <Title />
      <PlantData />
      <Label energyFlow={energyFlow} labelVisible={labelVisible} />
      {calendarMode === 'Day' && <ChartByHour date={selectedDate} />}
      {calendarMode === 'Week' && (
        <ChartByDay
          date={selectedDate}
          setEnergyFlow={setEnergyFlow}
          setLabelVisible={setLabelVisible}
        />
      )}
      {calendarMode === 'Month' && <ChartByMonth date={selectedDate} />}
      <CalBar calendarMode={calendarMode} setCalendarMode={setCalendarMode} />
      <DayCalendar
        today={today}
        onSelectDate={setSelectedDate}
        selected={selectedDate}
        calendarMode={calendarMode}
      />
    </View>
  )
}

export default Main
