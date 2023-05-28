'use client'

import dayjs from 'dayjs'
import React, { useContext } from 'react'
import GlobalContext from '@/contexts/GlobalContext'
export default function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext)
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1)
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1)
  }
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month(),
    )
  }
  return (
    <header className="flex items-center px-4 py-2">
      <p>Logo</p>
      <h1 className="mr-10 text-xl text-gray-500 fond-bold">Calendar</h1>
      <button onClick={handleReset} className="px-4 py-2 mr-5 border rounded">
        Today
      </button>
      <button onClick={handlePrevMonth}>
        <span className="mx-2 text-gray-600 cursor-pointer material-icons-outlined">
          chevron_left
        </span>
      </button>
      <button onClick={handleNextMonth}>
        <span className="mx-2 text-gray-600 cursor-pointer material-icons-outlined">
          chevron_right
        </span>
      </button>
      <h2 className="ml-4 text-xl font-bold text-gray-500">
        {dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}
      </h2>
    </header>
  )
}
