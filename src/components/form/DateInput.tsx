"use client";
import moment from "moment";
import React, { useMemo, useState } from "react";
import _ from "lodash";
import Datepicker from "react-tailwindcss-datepicker";

type Props = InputProps;

export const DateInput = (props: Props) => {
  const { value = "", placeholder = "", label } = props;
  
  const onChange = (val: any) => {
    let dateMoment = moment(val.startDate, "YYYY-MM-DD");
    const date = dateMoment.format("YYYY-MM-DDTHH:mm:ss");
    props.onChange && props.onChange(date);
  };
  const finalValue = useMemo(() => {
    if (value) {
      const date = moment(value, "YYYY-MM-DDTHH:mm:ss");
      const finalDate = date.format("YYYY-MM-DD");
      if (finalDate === "Invalid date") {
        return value;
      }
      return finalDate;
    }
    return "";
  }, [value]);

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-500"
        >
          {label}
        </label>
      )}
      <div className="mt-1">
        <Datepicker
          value={{
            startDate: finalValue,
            endDate: finalValue
          }}
          onChange={onChange}
          asSingle
          containerClassName="z-50"
          popoverDirection="down"
          showFooter
          placeholder="Select Date"
          toggleIcon={(open) => {
            return (
              <></>
            )
          }}
          inputClassName="w-full px-4 p-1 pr-8 text-sm font-normal rounded-md text-white border border-gray-700 focus:border-[#2553a1] bg-[#30324E] focus:ring-0 focus:ring-offset-0 focus:outline-0"
        />
      </div>
    </div>
  );
};

export default DateInput;
