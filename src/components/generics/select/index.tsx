import * as React from "react";

type SelectOption<V extends string | number> = {
  label: string;
  value: V;
};

type SelectProps<V extends string | number> = {
  options: ReadonlyArray<SelectOption<V>>;
  value: V | "";
  onChange: (v: V | "") => void;
  placeholder?: string;
  disabled?: boolean;
};

export function Select<V extends string | number>({
  options, value, onChange, placeholder, disabled
}: SelectProps<V>) {
  return (
    <select
      disabled={disabled}
      value={value === "" ? "" : (value as string | number)}
      onChange={(e) => onChange((e.target.value as unknown) as V)}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(opt => (
        <option key={String(opt.value)} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
