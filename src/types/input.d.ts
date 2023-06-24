declare interface InputProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  classNameInput?: string;
  defaultValue?: string
}

declare interface InputActiveProps extends InputProps {
  source: string
}