import clsx from 'clsx';
import React from 'react'
type Props = InputProps
export const TextAreaInput = (props: Props) => {
  const {
    label = "",
    value = "",
    placeholder = "",
    className,
    classNameInput,
    defaultValue,
  } = props;
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.onChange && props.onChange(e.target.value);
  }
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
      <div className={clsx("mt-1 rounded-md shadow-sm", className)}>
        <textarea
          value={value}
          onChange={onChange}
          className={clsx(
            "block w-full px-4 p-1 pr-8 text-sm font-normal rounded-md text-white border border-gray-700 focus:border-[#2553a1] bg-[#30324E] focus:ring-0 focus:ring-offset-0 focus:outline-0",
            classNameInput
          )}
          rows={4}
          placeholder={placeholder}
          defaultValue={defaultValue}
        ></textarea>
      </div>
    </div>
  )
}

export default TextAreaInput