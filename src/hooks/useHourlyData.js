import { useState, useEffect, useRef } from 'react'
import { DateTime } from 'luxon'

const useHourlyData = (date) => {
  const [hourlyData, setHourlyData] = useState([])
  const [loading, setLoading] = useState(false)
  const dataCache = useRef({})

  const url = `http://192.168.68.119:3000/energy/hourly/${date}`

  const fetchHourlyData = async () => {
    if (!DateTime.fromFormat(date, 'yyyy-MM-dd').isValid) {
      return
    }

    if (dataCache.current[date]) {
      setHourlyData(dataCache.current[date])
      return
    }

    setLoading(true)

    const response = await fetch(url)
    const json = await response.json()
    dataCache.current[date] = json

    setLoading(false)
    setHourlyData(json)
  }

  useEffect(() => {
    fetchHourlyData()
  }, [date])

  return { hourlyData, loading }
}

export default useHourlyData
