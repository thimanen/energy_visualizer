import { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { DateTime } from 'luxon'
import Date from './Date'

const DayCalendar = ({ today, onSelectDate, selected, calendarMode }) => {
  const [dates, setDates] = useState([])
  const [visibleMonth, setVisibleMonth] = useState(
    DateTime.local().toFormat('LLLL')
  )
  const calendarRef = useRef(null)

  // initial dates -30 to +30 days
  useEffect(() => {
    const initialDates = []
    for (let i = -60; i <= 0; i++) {
      initialDates.push(DateTime.local().plus({ days: i }))
    }
    setDates(initialDates)
  }, [])

  const renderItem = ({ item }) => (
    <Date
      today={today}
      date={item}
      onSelectDate={onSelectDate}
      selected={selected}
      calendarMode={calendarMode}
    />
  )

  useEffect(() => {
    if (calendarRef.current && dates.length > 0) {
      setTimeout(() => {
        calendarRef.current.scrollToIndex({
          index: dates.length - 1,
          animated: true,
        })
      }, 0)
    }
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

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const centerIndex = Math.floor(viewableItems.length / 2)
      const centerDate = viewableItems[centerIndex].item
      setVisibleMonth(centerDate.toFormat('LLLL'))
    }
  }).current

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 })

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
              length: 70,
              offset: 70 * index,
              index,
            })}
            initialScrollIndex={dates.length - 1}
            showsHorizontalScrollIndicator={false}
            onScrollToIndexFailed={handleScrollToIndexFailed}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewConfigRef.current}
          />
        </View>
      </View>
    </View>
  )
}

export default DayCalendar

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
