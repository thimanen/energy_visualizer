import Constants from 'expo-constants'
import { Text, StyleSheet, View } from 'react-native'
import Title from './Title'
import ChartByHour from './ChartByHour'

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  },
})

const Main = () => {
  return (
    <View style={styles.container}>
      <Title />
      <ChartByHour />
    </View>
  )
}

export default Main
