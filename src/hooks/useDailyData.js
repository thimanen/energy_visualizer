import { useState, useEffect, useRef } from 'react'
import { DateTime } from 'luxon'

const useDailyData = (date) => {
  const [dailyData, setDailyData] = useState([])
  const [loading, setLoading] = useState(false)
  const dataCache = useRef({})

  //make sure the give date is a Monday, and if not, make it a Monday (of the same week)
  const givenDate = DateTime.fromISO(date, { zone: 'Europe/Helsinki' })
  const monday = givenDate.startOf('week').toISODate()
  
  const url = `http://192.168.68.119:3000/energy/daily/${monday}`

  const fetchDailyData = async () => {
    if (dataCache.current[monday]) {
      setDailyData(dataCache.current[monday])
    }

    setLoading(true)

    const response = await fetch(url)
    const json = await response.json()
    dataCache.current[monday] = json
    setLoading(false)
    setDailyData(json)
  }

  useEffect(() => {
    fetchDailyData()
  }, [monday])

  return { dailyData, loading }
}

export default useDailyData
