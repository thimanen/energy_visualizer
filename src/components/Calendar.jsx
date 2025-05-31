import { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { DateTime } from 'luxon'
import Date from './Date'

const Calendar = ({ today, onSelectDate, selected }) => {
  const [dates, setDates] = useState([])
  const [visibleMonth, setVisibleMonth] = useState(
    DateTime.local().toFormat('LLL')
  )
  const calendarRef = useRef(null)

  // initial dates -30 to +30 days
  useEffect(() => {
    const initialDates = []
    for (let i = -30; i < 30; i++) {
      initialDates.push(DateTime.local().plus({ days: i }))
    }
    setDates(initialDates)
  }, [])

  const renderItem = ({ item }) => (
    <Date today={today} date={item} onSelectDate={onSelectDate} selected={selected} />
  )

  const handleScrollToToday = () => {
    if (calendarRef.current && dates.length > 0) {
      calendarRef.current.scrollToIndex({ index: 28, animated: false })
    }
  }
  useEffect(() => {
    handleScrollToToday()
  }, [dates])

  const handleScrollToIndexFailed = (info) => {
    console.warn('Scroll to index failed, retrying...', info)
    setTimeout(() => {
      if (calendarRef.current) {
        calendarRef.current.scrollToIndex({
          index: info.index,
          animated: false,
        })
      }
    }, 500)
  }

  return (
    <View>
      <View style={styles.centered}>
        <Text style={styles.title}>{visibleMonth}</Text>
      </View>
      <View style={styles.dateSection}>
        <View style={styles.scroll}>
          <FlatList
            ref={calendarRef}
            horizontal
            data={dates}
            keyExtractor={(item) => item.toISODate()}
            renderItem={renderItem}
            getItemLayout={(data, index) => ({
                length: 60,
                offset: 60 * index,
                index,
              })}
            showsHorizontalScrollIndicator={false}
            onScrollToIndexFailed={handleScrollToIndexFailed}
          />
        </View>
      </View>
    </View>
  )
}

export default Calendar

const styles = StyleSheet.create({
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateSection: {
    width: '100%',
    padding: 20,
  },
  scroll: {
    height: 150,
  },
})
