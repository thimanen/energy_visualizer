import { useState, useEffect, useRef } from 'react'
import { DateTime } from 'luxon'
import Constants from 'expo-constants'

const useYearData = (date) => {
  const [yearData, setYearData] = useState([])
  const [loading, setLoading] = useState(false)
  const dataCache = useRef({})

  //make sure the given date is the first date of the month, and if not, make it the first (of the same month)
  const givenDate = DateTime.fromISO(date, { zone: 'Europe/Helsinki' })
  const firstDate = givenDate.startOf('year').toISODate()
    
  const url = `${Constants.expoConfig.extra.server_uri}/year/${firstDate}`

  const fetchYearData = async () => {
    if (dataCache.current[firstDate]) {
      setYearData(dataCache.current[firstDate])
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

      setYearData(json)
    } catch (error) {
      console.error('Fecth exception:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchYearData()
  }, [firstDate])

  return { yearData, loading }
}

export default useYearData