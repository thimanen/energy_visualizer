import { View, Text, StyleSheet, Image } from 'react-native'
import useWeatherData from '../hooks/useWeatherData'
import theme from '../theme'

const Weather = ({ lat, long }) => {
  /*
  console.log(`latitude: ${lat}, longitude: ${long}`)
  */
  const { weatherData, weatherCodes, loading } = useWeatherData(lat, long)
  if (loading) return <Text>Loading weather...</Text>
  if (!weatherData) return <Text>No weather data</Text>
  if (!weatherCodes) return <Text>No weather data</Text>

  const weatherCode = weatherData.current.weather_code
  const isDay = weatherData.current.is_day

  const weatherIconUri = isDay
    ? weatherCodes[weatherCode].day.image
    : weatherCodes[weatherCOde].night.image

  const temperature = weatherData.current.temperature_2m
  const temperatureUnit = weatherData.current_units.temperature_2m

  return (
    <View style={styles.imageTopRow}>
      <View style={styles.weatherTemp}>
        <Text style={styles.textStyle}>
          {temperature}
          {temperatureUnit}
        </Text>
      </View>
      <View style={styles.weatherIcon}>
        <Image
          style={{ width: 70, height: 70 }}
          source={{ uri: weatherIconUri }}
        />
      </View>
    </View>
  )
}

export default Weather

const styles = StyleSheet.create({
  imageTopRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  weatherIcon: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  weatherTemp: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  textStyle: {
    color: theme.titleColors.textColor,
    fontSize: theme.titleColors.fontSize,
    fontWeight: theme.titleColors.fontWeight,
  },
})
