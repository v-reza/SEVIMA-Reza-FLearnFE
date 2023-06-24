"use client";
import React, { useMemo } from "react";
import { useField } from "./useField";
import { SelectResourceInput as Base } from "../form";
import useList from "@/src/hooks/useList";
type Props = InputActiveProps & {
  resource: string;
  pks: string[];
};

export const SelectResourceInput = (props: Props) => {
  const { label, onChange, value } = useField(props);

  const list = useList({
    resource: props.resource,
    pks: props.pks,
  });

  const options = useMemo(() => {
    const data = list.datas ?? [];

    return data.map((item: any) => {
      return {
        label: item.name,
        value: item.code,
      };
    });
  }, [list.datas]);


  return (
    <Base
      onChange={onChange}
      label={label}
      value={value}
      {...props}
      options={options}
    />
  );
};

export default SelectResourceInput;
