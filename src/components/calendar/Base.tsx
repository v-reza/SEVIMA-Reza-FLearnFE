import React, { useEffect, useMemo, useState } from "react";
import { useCalendarContext } from "./context";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import _ from "lodash";
import moment from "moment";
import { SERVER_DATE_TIME_FORMAT } from "../../utils/constant";

const CellContent = (
  cellInfo: any,
  onRenderType: (type: string) => void,
  children: any
) => {
  const type = cellInfo.view.type;
  onRenderType(type);

  return <>{children(cellInfo)}</>;
};

const BaseCalendar = () => {
  const {
    list,
    onClick,
    maxEvents,
    setMaxEvents,
    initialView = "dayGridWeek",
    weekends = true,
    options,
    children,
    onSelectDate,
    onEventColors,
    toolbarType,
    numberReRender,
    reRenderCell,
    setToolbarType,
    onEventMove,
    disableEditDay,
    disableEditMonth,
    disableEditWeek
  } = useCalendarContext();
  const {
    dayMaxEvents = 7,
    monthMaxEvents = 2,
    weekMaxEvents = 5,
  } = options ?? {};
  const [selectDate, setSelectDate] = useState<any>(null);

  const onRenderType = (type: string) => {
    if (type === "dayGridMonth") {
      setMaxEvents(monthMaxEvents);
      setToolbarType("month");
    } else if (type === "dayGridWeek") {
      setMaxEvents(weekMaxEvents);
      setToolbarType("week");
    } else {
      setMaxEvents(dayMaxEvents);
      setToolbarType("day");
    }
  };
  const dateRef = React.useRef<any>(null);
  const fullCalendarRef = React.useRef<any>(null);

  const onChangeDate = (value: string) => {
    if (fullCalendarRef.current) {
      fullCalendarRef.current.calendar.gotoDate(
        moment(value, SERVER_DATE_TIME_FORMAT).toDate()
      );
      setSelectDate(value);
    }
  };


  useEffect(() => {
    const parentElement = document.querySelectorAll(
      'td[data-date]:not([data-date=""]):not(:empty).fc-day'
    );
    const interval = setInterval(() => {

      //popover
      document.querySelectorAll('.fc-popover > .fc-popover-body > .fc-daygrid-event-harness > .fc-event').forEach((el) => {
        if (el.querySelector("div")) {
          onEventColors && onEventColors(el);
          interval && clearInterval(interval);
        }
      })

      parentElement.forEach((div) => {
        // day
        div
          .querySelectorAll(
            ".fc-timegrid-col-frame > .fc-timegrid-col-events > .fc-timegrid-event-harness > .fc-event"
          )
          .forEach((el) => {
            if (el.querySelector(".fc-event-main")) {
              onEventColors && onEventColors(el);
              interval && clearInterval(interval);
            }
          });


        // weeks & month
        div
          .querySelectorAll(".fc-daygrid-event-harness > .fc-daygrid-event")
          .forEach((el) => {
            if (el.querySelector("div")) {
              onEventColors && onEventColors(el);
              interval && clearInterval(interval);
            }
          });
      });
    }, 500);


    return () => {
      clearInterval(interval);
    };
  }, [list.datas, toolbarType, numberReRender, fullCalendarRef.current]);

  const disable = useMemo(() => {
    if (toolbarType === "day") {
      return !disableEditDay
    } else if (toolbarType === "week") {
      return !disableEditWeek
    } else if (toolbarType === "month" ){
      return !disableEditMonth
    } else {
      return !false
    }
  }, [toolbarType, disableEditDay, disableEditMonth, disableEditWeek])

  return (
    <>
      {/* <div ref={dateRef}>
        <DateInput
          placeholder="Select Date"
          onChange={onChangeDate}
          value={selectDate}
        />
      </div> */}
      <FullCalendar
        plugins={[
          dayGridPlugin,
          multiMonthPlugin,
          interactionPlugin,
          timeGridPlugin,
        ]}
        initialView={initialView}
        displayEventTime={false}
        dayMaxEvents={maxEvents}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek,timeGridDay",
        }}
        ref={fullCalendarRef}
        datesSet={(dateInfo) => {
          // check if Arrow and Today clicked remove value select date
          setSelectDate(null);
          reRenderCell();

          // get toolbar element
          // const element = document.querySelectorAll(
          //   ".fc .fc-header-toolbar .fc-toolbar-chunk"
          // );

          // if (element) {
          //   element[0].classList.add("d-flex");
          //   element[0].classList.add("align-items-start");
          //   element[0]
          //     .querySelector(".fc-button-group")
          //     ?.insertAdjacentElement("afterend", dateRef.current);
          // }
        }}
        views={{
          today: { buttonText: "Today" },
          dayGridMonth: { buttonText: "Month" },
          timeGridDay: { buttonText: "Day" },
          dayGridWeek: { buttonText: "Week" },
        }}
        weekends={weekends}
        allDaySlot={false}
        events={list.datas}
        editable={disable}
        selectable={disable}
        moreLinkClick={(arg) => reRenderCell()}
        select={onSelectDate}
        dayPopoverFormat={{
          dateStyle: "full",
        }}
        aspectRatio={2.8}
        weekNumberCalculation="ISO"
        eventsSet={onEventMove}
        eventContent={(cellInfo) =>
          CellContent(cellInfo, onRenderType, children)
        }
        eventClick={onClick}
      />
    </>
  );
};

export default BaseCalendar;
