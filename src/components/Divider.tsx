import clsx from "clsx";
import React from "react";
import Separator from "./Separator";

type Props = {
  label: string;
  classNameLabel?: string;
};

export const Divider = (props: Props) => {
  const { label, classNameLabel } = props;
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        {/* <Separator /> */}
        <div className="w-full border-t border-gray-300 " />
      </div>
      <div className="relative flex justify-center">
        <span
          className={clsx(
            "px-2 bg-white text-sm text-gray-500",
            classNameLabel
          )}
        >
          {label}
        </span>
      </div>
    </div>
  );
};

export default Divider;
