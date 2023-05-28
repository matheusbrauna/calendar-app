'use client'

import { useState, useEffect, ReactElement } from 'react'
import dayjs from 'dayjs'

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(dayjs())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  const renderCalendar = () => {
    const startDate = currentDate.startOf('month').startOf('week')
    const endDate = currentDate.endOf('month').endOf('week')

    const calendar: ReactElement[] = []

    let day = startDate

    while (day.isBefore(endDate)) {
      const isCurrentMonth = day.isSame(currentDate, 'month')
      const isToday = day.isSame(dayjs(), 'day')
      const isPastDay = day.isBefore(dayjs(), 'day')

      const dayClasses = [
        'flex',
        'items-center',
        'justify-center',
        'cursor-pointer',
        'border',
        isCurrentMonth ? 'text-black' : 'text-gray-400',
        isToday ? 'bg-blue-500 text-white' : '',
        isPastDay ? 'opacity-50' : '',
      ]

      calendar.push(
        <div key={day.format('YYYY-MM-DD')} className={dayClasses.join(' ')}>
          {day.format('D')}
        </div>,
      )

      day = day.add(1, 'day')
    }

    return calendar
  }

  return (
    <div className="flex items-center justify-center">
      <div className="grid w-screen h-screen grid-cols-7">
        <div className="text-center">Sun</div>
        <div className="text-center">Mon</div>
        <div className="text-center">Tue</div>
        <div className="text-center">Wed</div>
        <div className="text-center">Thu</div>
        <div className="text-center">Fri</div>
        <div className="text-center">Sat</div>
        {renderCalendar()}
      </div>
    </div>
  )
}

export default Calendar
