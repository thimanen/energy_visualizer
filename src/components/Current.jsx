import { View, Text, StyleSheet } from 'react-native'
import useCurrentData from '../hooks/useCurrentData'
import theme from '../theme'

const Current = () => {
  const { currentData, loading } = useCurrentData()

  if (loading) return <Text>Loading data...</Text>
  if (!currentData) return <Text>No current data</Text>

  currentEnergy = Math.round(currentData.total_act_energy * 100) / 100
  
  return (
    <View style={styles.currentEnergy}>
      <Text style={styles.textStyle}>{currentEnergy} Wh</Text>
    </View>
  )
}

export default Current

const styles = StyleSheet.create({
  textStyle: {
    color: theme.titleColors.textColorAlt,
    fontSize: theme.titleColors.fontSize,
    fontWeight: theme.titleColors.fontWeight,
  },
  currentEnergy: {
    paddingLeft: 10,
    paddingRight: 10,
  },
})
