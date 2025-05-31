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

const CalBar = () => {
  return (
    <View style={styles.calSelector}>
      <CalBarTab title={'Day'} />
      <CalBarTab title={'Week'} />
      <CalBarTab title={'Month'} />
      <CalBarTab title={'Year'} />
    </View>
  )
}

export default CalBar
