import moment from "moment";
import React from "react";

const CalendarContent = (props: any) => {
  const data = JSON.parse(props.event.groupId);

  return (
    <div className="flex flex-col px-4 py-2" style={{ whiteSpace: "normal" }}>
      <span className="text-xs">Task - {data.task_name}</span>
      <div className="mt-4  flex flex-col">
        <span>Deadline</span>
        <span>
          {moment(data.task_start_date).format("HH:mm")} -{" "}
          {moment(data.task_end_date).format("HH:mm")}
        </span>
      </div>
      <div className="mt-4 flex flex-col">
        <span>Target Classroom</span>
        <span>{data.target_classroom.name}</span>
      </div>
    </div>
  );
};

export default CalendarContent;
