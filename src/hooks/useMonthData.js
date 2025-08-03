import { useState, useEffect, useRef } from 'react'
import { DateTime } from 'luxon'
import Constants from 'expo-constants'

const useMonthData = (date) => {
  const [monthData, setMonthData] = useState([])
  const [loading, setLoading] = useState(false)
  const dataCache = useRef({})

  //make sure the given date is the first date of the month, and if not, make it the first (of the same month)
  const givenDate = DateTime.fromISO(date, { zone: 'Europe/Helsinki' })
  const firstDate = givenDate.startOf('month').toISODate()
  console.log('first date of month: ', firstDate)

  const url = `${Constants.expoConfig.extra.server_uri}/month/${firstDate}`

  const fetchMonthData = async () => {
    if (dataCache.current[firstDate]) {
      setMonthData(dataCache.current[firstDate])
      return
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
      dataCache.current[firstDate] = json

      setMonthData(json)
    } catch (error) {
      console.error('Fecth exception:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMonthData()
  }, [firstDate])

  return { monthData, loading }
}

export default useMonthData