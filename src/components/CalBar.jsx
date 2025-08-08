import { View, StyleSheet, Text } from 'react-native'
import CalBarTab from './CalBarTab'
import Button from './Button'
import theme from '../theme'

const styles = StyleSheet.create({
  calSelector: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.titleColors.backgroundColor,
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.titleColors.backgroundColor,
  },
})

const CalBar = ({
  calendarMode,
  setCalendarMode,
  detailViewMode,
  setDetailViewMode,
}) => {
  return (
    <View style={styles.buttonRow}>
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
      <View style={styles.calSelector}>
        <Button
          title={'Stat'}
          detailViewMode={detailViewMode}
          setDetailViewMode={setDetailViewMode}
        />
      </View>
    </View>
  )
}

export default CalBar
