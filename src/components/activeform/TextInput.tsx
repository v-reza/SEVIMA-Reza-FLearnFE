import React from "react";
import { useField } from "./useField";
import { TextInput as Base } from "../form";
type Props = InputActiveProps;

export const TextInput = (props: Props) => {
  const { label, onChange, value } = useField(props);
  return <Base onChange={onChange} label={label} value={value} {...props}/>
};

export default TextInput;
