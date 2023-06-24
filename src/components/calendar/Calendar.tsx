"use cliet"
import React, { useEffect, useState } from "react";
import { CalendarContext } from "./context";
import BaseCalendar from "./Base";
import _ from "lodash";
import moment from "moment";
import { SERVER_DATE_TIME_FORMAT } from "../../utils/constant";
import {
  DateSelectArg,
  EventApi,
  EventClickArg,
  EventInput,
} from "@fullcalendar/core";
import useList from "@/src/hooks/useList";

export type CalendarOptions = {
  dayMaxEvents?: number;
  monthMaxEvents?: number;
  weekMaxEvents?: number;
};

type PksCalendar = {
  sourceStartDate: string;
  sourceEndDate?: string;
};

type JSONOptions = {
  id: string | number;
  title: string;
  start: string;
  groupItems?: any;
  end?: string;
};

export type CalendarProviderProps = {
  resource: string;
  pks: string[];
  filters?: any;
  children: (props: any) => React.ReactNode;
  pksCalendar: PksCalendar;
  disableEditDay?: boolean
  disableEditWeek?: boolean
  disableEditMonth?: boolean
  onClick?: (e: EventClickArg) => void;
  baseUrl?: string;
  json?: JSONOptions[];
  initialView?: "dayGridMonth" | "dayGridWeek" | "dayGridDay";
  weekends?: boolean;
  onEventColors?: (el: Element) => void;
  onSelectDate?: (options: DateSelectArg) => void;
  options?: CalendarOptions;
  getList?: (list: any) => void;
  onMoveData?: (newData: any, oldData: any) => void
};

export const Calendar = (props: CalendarProviderProps) => {
  const [data, setData] = useState<EventInput[]>([]);
  const [limitEvents] = useState<CalendarOptions>({
    dayMaxEvents: props.options?.dayMaxEvents ?? 7,
    monthMaxEvents: props.options?.monthMaxEvents ?? 2,
    weekMaxEvents: props.options?.weekMaxEvents ?? 5,
  });
  const [maxEvents, setMaxEvents] = useState<number>(0);
  const [toolbarType, setToolbarType] = useState<string>("week");
  const [numberReRender, setNumberReRender] = useState<number>(0);
  const [newDataEventMove, setNewDataEventMove] = useState<any[]>([]);
  const [oldDataEventMove, setOldDataEventMove] = useState<any[]>([]);
  const { disableEditDay = false , disableEditMonth = false , disableEditWeek = false } = props

  const reRenderCell = () => setNumberReRender(numberReRender + 1);

  const onEventMove = (args: EventApi[]) => {
    setOldDataEventMove(args);
    args.map((event) => {
      const eventStr = moment(event.startStr).format(SERVER_DATE_TIME_FORMAT);
      const data = JSON.parse(event.groupId);
      if (
        !moment(eventStr).isSame(
          moment(data[props.pksCalendar.sourceStartDate]).format(
            SERVER_DATE_TIME_FORMAT
          )
        )
      ) {
        setNewDataEventMove({
          ...data,
          new_date: eventStr
        })
      }
    });
  };

  useEffect(() => {
    if (Object.keys(newDataEventMove).length > 0) {
      props.onMoveData && props.onMoveData(newDataEventMove, oldDataEventMove);
    }
  }, [newDataEventMove])

  const list = useList({
    resource: props.resource,
    pks: props.pks,
    baseUrl: props.baseUrl,
    filters: props.filters,
  });

  useEffect(() => {
    props.getList && props.getList(list);
  }, [JSON.stringify(list.datas)]);

  useEffect(() => {
    const datas = list.datas ?? [];
    setData(
      datas?.map((e: any, index: number) => {
        return {
          id: index.toString(),
          title: "",
          start: moment(_.get(e, props.pksCalendar.sourceStartDate)).format(
            SERVER_DATE_TIME_FORMAT
          ),
          groupId: props.json
            ? JSON.stringify(e?.groupItems)
            : JSON.stringify(e),
          ...(props.pksCalendar.sourceEndDate && {
            end: moment(_.get(e, props.pksCalendar.sourceEndDate)).format(
              SERVER_DATE_TIME_FORMAT
            ),
          }),
        };
      })
    );
  }, [JSON.stringify(list.datas)]);

  return (
    <CalendarContext.Provider
      value={{
        ...props,
        disableEditDay,
        disableEditMonth,
        disableEditWeek,
        options: limitEvents,
        reRenderCell,
        numberReRender,
        maxEvents,
        setMaxEvents,
        toolbarType,
        setToolbarType,
        onEventMove,
        list: {
          ...list,
          datas: data,
        },
      }}
    >
      <BaseCalendar />
    </CalendarContext.Provider>
  );
};

export default Calendar;
