import React from "react";
import { useField } from "./useField";
import { TimeInput as Base } from "../form";
type Props = InputActiveProps;

export const TimeInput = (props: Props) => {
  const { label, onChange, value } = useField(props);
  return <Base onChange={onChange} label={label} value={value} {...props}/>
};

export default TimeInput;
