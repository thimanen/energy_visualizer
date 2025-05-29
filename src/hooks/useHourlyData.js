import { useState, useEffect } from 'react'
import { DateTime } from 'luxon'

const useHourlyData = (date) => {
  const [hourlyData, setHourlyData] = useState([])
  const [loading, setLoading] = useState(false)

  const url = `http://192.168.68.119:3000/energy/hourly/${date}`

  const fetchHourlyData = async () => {
    if (!DateTime.fromFormat(date, 'yyyy-MM-dd').isValid) {
      return
    }
    setLoading(true)

    const response = await fetch(url)
    const json = await response.json()

    setLoading(false)
    setHourlyData(json)
  }

  useEffect(() => {
    fetchHourlyData()
  }, [date])

  return { hourlyData, loading }
}

export default useHourlyData
