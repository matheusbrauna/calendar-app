'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { useState, useEffect, ReactElement } from 'react'
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import dayjs from 'dayjs'

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(dayjs())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  const goToPreviousMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'))
  }

  const goToNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'))
  }

  const year = currentDate.year()
  const month = currentDate.format('MMMM')

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
        'items-start',
        'justify-end',
        'cursor-pointer',
        'box-border',
        'text-center',
        isCurrentMonth ? '' : 'text-zinc-500',
        isPastDay ? 'bg-zinc-950/25 text-zinc-500' : '',
      ]

      calendar.push(
        <Dialog.Root key={day.format('YYYY-MM-DD')}>
          <Dialog.Trigger
            className={dayClasses.join(' ')}
            style={{ boxShadow: 'inset 0 0 0 1px #27272a' }}
          >
            <p
              className={
                isToday
                  ? 'bg-blue-500 text-white h-7 w-7 rounded-full font-bold grid place-items-center m-2'
                  : 'm-2'
              }
            >
              {day.format('D')}
            </p>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-[#00000070] animate-overlayShow" />
            <Dialog.Content className="p-6 animate-contentShow shadow-modal max-w-md fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 bg-white rounded-md max-h-[85vh] h-64 w-[90vw]">
              <Dialog.Title className="text-black">
                {day.format('D')}
              </Dialog.Title>
              <Dialog.Description>{day.format('DDD')}</Dialog.Description>
              <Dialog.Close />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>,
      )

      day = day.add(1, 'day')
    }

    return calendar
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex items-center justify-between w-full gap-4 p-4">
        <button
          className="h-10 px-6 transition-colors border rounded-lg border-zinc-700 hover:border-zinc-500"
          onClick={() => setCurrentDate(dayjs())}
        >
          Hoje
        </button>

        <h2 className="text-xl font-bold uppercase lg:text-4xl text-zinc-600">
          {month}
        </h2>

        <div className="flex items-center gap-4">
          <button className="mr-2" onClick={goToPreviousMonth}>
            <FiArrowLeft size={24} />
          </button>
          <button onClick={goToNextMonth}>
            <FiArrowRight size={24} />
          </button>
          <h2 className="text-xl font-bold uppercase lg:text-4xl text-zinc-600">
            {year}
          </h2>
        </div>
      </div>
      <div className="grid w-screen grid-cols-7">
        <div className="p-2 text-right">Dom</div>
        <div className="p-2 text-right">Seg</div>
        <div className="p-2 text-right">Ter</div>
        <div className="p-2 text-right">Qua</div>
        <div className="p-2 text-right">Qui</div>
        <div className="p-2 text-right">Sex</div>
        <div className="p-2 text-right">Sab</div>
      </div>
      <div className="grid w-screen h-full grid-cols-7">{renderCalendar()}</div>
    </div>
  )
}

export default Calendar
