import { View, StyleSheet, Text } from 'react-native'
import CalBarTab from './CalBarTab'
import theme from '../theme'

const styles = StyleSheet.create({
  calSelector: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.titleColors.backgroundColor,
  },
})

const CalBar = ({ calendarMode, setCalendarMode }) => {
  return (
    <View style={styles.calSelector}>
      <CalBarTab
        title={'Day'}
        calendarMode={calendarMode}
        setCalendarMode={setCalendarMode}
      />
      <CalBarTab
        title={'Week'}
        calendarMode={calendarMode}
        setCalendarMode={setCalendarMode}
      />
      <CalBarTab
        title={'Month'}
        calendarMode={calendarMode}
        setCalendarMode={setCalendarMode}
      />
      <CalBarTab
        title={'Year'}
        calendarMode={calendarMode}
        setCalendarMode={setCalendarMode}
      />
    </View>
  )
}

export default CalBar
