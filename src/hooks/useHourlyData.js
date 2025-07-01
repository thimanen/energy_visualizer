import { useState, useEffect, useRef } from 'react'
import { DateTime } from 'luxon'
import Constants from 'expo-constants'

const useHourlyData = (date) => {
  const [hourlyData, setHourlyData] = useState([])
  const [loading, setLoading] = useState(false)
  const dataCache = useRef({})

  /* 
  const url = `http://192.168.68.119:3000/energy/hourly/${date}`

  
  const url = `http://82.128.129.121:3000/energy/hourly/${date}`
 */
  const url = `${Constants.expoConfig.extra.server_uri}/hourly/${date}`

  const fetchHourlyData = async () => {
    if (!DateTime.fromFormat(date, 'yyyy-MM-dd').isValid) {
      return
    }

    if (dataCache.current[date]) {
      setHourlyData(dataCache.current[date])
      return
    }

    setLoading(true)

    try {
      const response = await fetch(url)

      if (!response.ok) {
        console.error(`Fetch error: ${response.status} ${response.statusText}`)
        setLoading(false)
        return
      }
      const json = await response.json()
      dataCache.current[date] = json

      setHourlyData(json)
    } catch (error) {
      console.error('Fetch exception:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHourlyData()
  }, [date])

  return { hourlyData, loading }
}

export default useHourlyData
