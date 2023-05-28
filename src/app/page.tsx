'use client'

import CalendarHeader from '@/components/CalendarHeader'
import EventModal from '@/components/EventModal'
import Month from '@/components/Month'
import Sidebar from '@/components/Sidebar'
import GlobalContext from '@/contexts/GlobalContext'
import { getMonth } from '@/utils/getMonth'
import { useContext, useEffect, useState } from 'react'

export default function Home() {
  const [currenMonth, setCurrentMonth] = useState(getMonth())
  const { monthIndex, showEventModal } = useContext(GlobalContext)

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex))
  }, [monthIndex])

  return (
    <>
      {showEventModal && <EventModal />}

      <div className="flex flex-col h-screen">
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currenMonth} />
        </div>
      </div>
    </>
  )
}
