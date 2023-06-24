"use client"
import React from 'react'
import { useField } from './useField'
import { DateInput as Base } from "@components/form"

type Props = InputActiveProps

export const DateInput = (props: Props) => {
  const { value, onChange, label } = useField(props) 
  return <Base value={value} onChange={onChange} label={label} {...props}/>
}

export default DateInput