import { useState, useEffect, useRef } from 'react'
import { DateTime } from 'luxon'

const useCurrentData = () => {
  const [currentData, setCurrentData] = useState([])
  const [loading, setLoading] = useState(false)
  const dataCache = useRef({})

  const now = DateTime.now()
  const minutes = now.minute

  /*
  const url = `http://192.168.68.119:3000/energy/now`
*/

  const url = `http://82.128.129.121:3000/energy/now`

  const fetchCurrentData = async () => {
    if (dataCache.current[minutes]) {
      setCurrentData(dataCache.current[minutes])
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
      dataCache.current[minutes] = json

      setCurrentData(json)
    } catch (error) {
      console.error('Fecth exception:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCurrentData()
  }, [minutes])
  return { currentData, loading }
}

export default useCurrentData
