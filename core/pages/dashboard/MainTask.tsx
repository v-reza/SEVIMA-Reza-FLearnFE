"use client";
import { Button, Modal } from "@/src/components";
import SlideOver from "@/src/components/SlideOver";
import {
  DateInput,
  TextInput,
  TimeInput,
  useFormContext,
} from "@/src/components/activeform";
import { Calendar } from "@/src/components/calendar";
import React, { useState } from "react";
const MainDashboard = () => {
  const [show, setShow] = useState<boolean>(false);
  const { setForm, form } = useFormContext();

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
        <div className="mt-4 flex justify-end w-full">
          <Button btnType="primary" label="Save" />
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
              pksCalendar={{
                sourceStartDate: "start_date",
                sourceEndDate: "end_date",
              }}
            >
              {({ event }) => {
                return <div></div>;
              }}
            </Calendar>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainDashboard;
