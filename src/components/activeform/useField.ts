"use client"

import { useCallback, useEffect, useMemo, useState } from "react";
import _ from "lodash";
import * as yup from "yup";
import { useFormContext } from "./DataForm";

export function useField(props: any) {
  const { label, source } = props;

  // useEffect(() => {
  //   if (props.value !== undefined && props.value !== null) {
  //     setForm((oldForm: any) => {
  //       const newv = _.setWith(oldForm, source, props.value, Object);
  //       return {
  //         ...newv,
  //       };
  //     });
  //   }
  // }, []);

  const { form, setForm } = useFormContext();

  const onChange = (value: any) => {
    setForm((oldForm: any) => {
      const newv = _.setWith(oldForm, source, value, Object);
      return { ...newv };
    });
  };
  const value = useMemo(() => {
    return _.get(form, source);
  }, [_.get(form, source)]);

  return {
    value: value,
    label,
    onChange,
  };
}
