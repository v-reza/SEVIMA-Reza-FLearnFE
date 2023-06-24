import { EventApi } from '@fullcalendar/core';
import { ListResult } from '../../hooks/useList';
import { CalendarOptions, CalendarProviderProps } from './Calendar';
import { createContext, useContext } from "react"

export type ICalendarContext = {
  list: ListResult<any>
  setMaxEvents: React.Dispatch<React.SetStateAction<number>>
  maxEvents: number
  toolbarType: string
  setToolbarType: React.Dispatch<React.SetStateAction<string>>
  numberReRender: number
  reRenderCell: () => void
  onEventMove: (args: EventApi[]) => void
} & CalendarProviderProps

export const CalendarContext = createContext<ICalendarContext | null>(null)
export const useCalendarContext = () => {
  const context = useContext(CalendarContext)
  if (!context) {
    throw new Error("useCalendarContext must be used within a CalendarContextProvider")
  }
  return context
}


