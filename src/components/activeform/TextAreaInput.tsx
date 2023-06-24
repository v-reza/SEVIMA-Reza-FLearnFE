"use client"
import React from "react";
import { useField } from "./useField";
import { TextAreaInput as Base } from "../form";
type Props = InputActiveProps;

export const TextAreaInput = (props: Props) => {
  const { label, onChange, value } = useField(props);
  return <Base onChange={onChange} label={label} value={value} {...props}/>
};

export default TextAreaInput;
