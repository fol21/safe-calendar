import React, { FC, use, useEffect, useState } from 'react'
import { Calendar, dateFnsLocalizer, Event, luxonLocalizer, Views } from 'react-big-calendar'
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'


import { GlobalContext } from '../renderer'

import './App.css'
import { DateTime, Settings } from 'luxon'
import { Link } from 'react-router'
import { RightArrow } from '../icons/RightArrow'

const App: FC = () => {

  const context = React.useContext(GlobalContext);

  const [events, setEvents] = useState<Event[]>()
  console.log("events", events)

  const onEventResize: withDragAndDropProps['onEventResize'] = data => {
    const { start, end } = data

    setEvents(currentEvents => {
      return [...currentEvents]
    })
  }

  const onEventDrop: withDragAndDropProps['onEventDrop'] = data => {
    console.log(data)
  }

  useEffect(() => {
    setEvents(
      context.piCalendar.pis
        .flatMap(pi => pi.planningIntervalIterations)
        .flatMap(it => it.events)
        .map((event) => ({
          start: event.startDate,
          end: event.endDate,
          title: event.path,
        } as Event)))
  }, [context])

  return (
    <div className='calendar-container'>
      <div className='calendar-breadcrumb'>
        <Link className='link' to="/">Setup</Link>
        <RightArrow style={{width:"1vw", fill: "white", margin: "0px 10px" }} />
        <Link className='link' to="/calendar">Calendar</Link>
      </div>
      <DnDCalendar
        defaultView={Views.MONTH}
        events={events}
        localizer={localizer}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        resizable
        className='calendar'
      />
    </div>
  )
}

const endOfHour = (date: Date): Date => DateTime.fromJSDate(date).endOf('hour').toJSDate()
const now = new Date()
const start = endOfHour(now)
const end = DateTime.fromJSDate(start).plus({hours: 2}).toJSDate()

Settings.defaultZone = 'America/Sao_Paulo'
const localizer = luxonLocalizer(DateTime, {firstDayOfWeek: 7})

const DnDCalendar = withDragAndDrop(Calendar)

export default App