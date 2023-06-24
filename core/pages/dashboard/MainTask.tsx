"use client";
import { Button } from "@/src/components";
import { Calendar } from "@/src/components/calendar";
import React from "react";

const MainDashboard = () => {
  return (
    <div className="relative w-full h-full">
      <div className="px-6 py-4">
        <Button btnType="primary" label="Add a New Task"/>
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
  );
};

export default MainDashboard;
