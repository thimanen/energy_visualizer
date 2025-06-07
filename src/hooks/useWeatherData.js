import { useState, useEffect } from 'react'
import weatherInterpretationCodes from '../../assets/weather_interpretation_codes.json'

const useWeatherData = (lat, long) => {
  const [weatherData, setWeatherData] = useState('')
  const [weatherCodes, setWeatherCodes] = useState([])
  const [loading, setLoading] = useState(false)

  const baseUrl = 'https://api.open-meteo.com/v1/forecast?'
  const weatherParams =
    '&current=temperature_2m,is_day,weather_code&timezone=Africa%2FCairo'

  const weatherUrl =
    baseUrl + 'latitude=' + lat + '&longitude=' + long + weatherParams

  const fetchWeather = async () => {
    setLoading(true)
    try {
      const response = await fetch(weatherUrl)

      if (!response.ok) {
        console.error(`Fetch error: ${response.status} ${response.statusText}`)
        setLoading(false)
        return
      }
      const data = await response.json()
      setWeatherData(data)
    } catch (error) {
      console.error('Error fetching weather data:', error)
      setWeatherData(null)
    } finally {
      setLoading(false)
    }
  }

  const fetchWeatherCodes = async () => {
    try {
      setWeatherCodes(weatherInterpretationCodes)
    } catch (error) {
      console.error('Error fetching weather codes:', error)
      setWeatherCodes(null)
    }
  }

  useEffect(() => {
    fetchWeather()
    fetchWeatherCodes()
  }, [weatherUrl])

  return { weatherData, weatherCodes, loading }
}

export default useWeatherData
