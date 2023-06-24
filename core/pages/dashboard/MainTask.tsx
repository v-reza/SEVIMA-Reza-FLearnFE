"use client";
import { Button, Modal } from "@/src/components";
import SlideOver from "@/src/components/SlideOver";
import {
  DateInput,
  TextInput,
  TimeInput,
  useFormContext,
} from "@/src/components/activeform";
import SelectResourceInput from "@/src/components/activeform/SelectResourceInput";
import { Calendar } from "@/src/components/calendar";
import { useLoadingContext } from "@/src/contexts/LoadingContext";
import { useMutation } from "@/src/hooks/useMutation";
import moment from "moment";
import React, { useRef, useState } from "react";
import CalendarContent from "./CalendarContent";
import { useRouter } from "next/navigation";
const MainDashboard = () => {
  const [show, setShow] = useState<boolean>(false);
  const { setForm, form } = useFormContext();
  const { showLoadingOverlay, hideLoadingOverlay } = useLoadingContext()
  const router = useRouter()
  const { save } = useMutation({
    resource: "task",
    pks: ["_id"]
  })
  console.log({ form });
  const calendarResourceRef = useRef<any>(null)

  const onSubmit = async () => {
    showLoadingOverlay()
    try {
      let data = {
        ...form
      }
      const startDate = moment(data.task_start_date).format("YYYY-MM-DD")
      const startTime = moment(data.task_start_time, "HH:mm").format("HH:mm:ss")
      const endDate = moment(data.task_end_date).format("YYYY-MM-DD")
      const endTime = moment(data.task_end_time, "HH:mm").format("HH:mm:ss")
      
      data = {
        ...data,
        task_start_date: moment(`${startDate} ${startTime}`).format("YYYY-MM-DDTHH:mm:ss"),
        task_end_date: moment(`${endDate} ${endTime}`).format("YYYY-MM-DDTHH:mm:ss"),
      }

      await save({ data })
      calendarResourceRef.current.reload()
      setForm({})
      setShow(false)
    } catch (error) {
      console.log(error)
    } finally {
      hideLoadingOverlay()
    }
  }

  return (
    <>
      <SlideOver
        title="Add a New Task"
        show={show}
        onClose={() => {
          setShow(false);
          setForm({});
        }}
      >
        <TextInput label="Task Name" source="task_name" />
        <DateInput label="Start Date" source="task_start_date" />
        <TimeInput label="Start Time" source="task_start_time" />
        <DateInput label="End Date" source="task_end_date" />
        <TimeInput label="End Time" source="task_end_time" />
        <SelectResourceInput
          source="target_classroom_code"
          resource="classroom"
          pks={["code"]}
          label="Target Classroom"
        />
        <div className="mt-4 flex justify-end w-full">
          <Button btnType="primary" label="Save" onClick={onSubmit}/>
        </div>
      </SlideOver>
      <div className="relative w-full h-full">
        <div className="px-6 py-4">
          <Button
            btnType="primary"
            label="Add a New Task"
            onClick={() => setShow(true)}
          />
          <div className="mt-6">
            <Calendar
              resource="task"
              pks={["_id"]}
              getList={(list) => calendarResourceRef.current = list}
              options={{
                weekMaxEvents: 5,
                monthMaxEvents: 1,
              }}
              pksCalendar={{
                sourceStartDate: "task_start_date",
                sourceEndDate: "task_end_date",
              }}
              onClick={(e) => {
                const data = JSON.parse(e.event.groupId);
                router.push(`/dashboard/${data._id}`)
              }}
            >
              {({ event }) => {
                return <CalendarContent event={event}/>
              }}
            </Calendar>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainDashboard;
