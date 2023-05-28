'use client'

import React, { useContext } from 'react'
import GlobalContext from '@/contexts/GlobalContext'
export default function CreateEventButton() {
  const { setShowEventModal } = useContext(GlobalContext)
  return (
    <button
      onClick={() => setShowEventModal(true)}
      className="flex items-center p-2 border rounded-full shadow-md hover:shadow-2xl"
    >
      <p>criar</p>
      <span className="pl-3 pr-7"> Create</span>
    </button>
  )
}
