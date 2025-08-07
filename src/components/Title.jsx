import { View, StyleSheet, Text } from 'react-native'
import theme from '../theme'

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    backgroundColor: theme.titleColors.backgroundColor,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  textStyle: {
    color: theme.titleColors.textColor,
    fontSize: theme.titleColors.fontSize,
    fontWeight: theme.titleColors.fontWeight
  },
})

const Title = () => {
  return (
    <View style={styles.flexContainer}>
      <Text style={styles.textStyle}>EFlowViz</Text>
    </View>
  )
}

export default Title
