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

/*
  const url = `http://82.128.129.121:3000/energy/daily/${monday}`
*/
  const fetchDailyData = async () => {
    if (dataCache.current[monday]) {
      setDailyData(dataCache.current[monday])
    }

    setLoading(true)

    try {
      const response = await fetch(url)
      if (!response.ok) {
        console.error(`Fetch error: ${response.status} ${response.statusText}`)
        const errorText = await response.text()
        console.error(`Server response: ${errorText}`)
        setLoading(false)
        return
      }

      const json = await response.json()
      dataCache.current[monday] = json

      setDailyData(json)
    } catch (error) {
      console.error('Fecth exception:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDailyData()
  }, [monday])

  return { dailyData, loading }
}

export default useDailyData
