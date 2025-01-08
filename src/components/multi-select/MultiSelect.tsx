"use client";
import { useDebounceFn } from "@/utils";
import type { ChangeEvent, KeyboardEvent } from "react";
import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ChevronDownIcon, ChevronUpIcon, Chip, ClickAwayListener, CloseIcon, IconButton, Input } from "../";
import type { InputProps } from "../input";
import type { ItemType } from "./List";
import { List } from "./List";
import styles from "./multi-select.module.scss";

type MultiSelectProps = {
  options: ItemType[];
  value: ItemType[];
  onChange: (value: ItemType[]) => void;
  className?: string;
  inputProps?: InputProps;
};
export function MultiSelect({
  onChange,
  value: valueProp,
  options: optionsProp,
  className,
  inputProps,
}: MultiSelectProps) {
  const [options, setOptions] = useState(optionsProp);
  const [filteredOptions, setFilteredOptions] = useState(optionsProp);
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  const handleAddOptions = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") {
      return;
    }
    const currentValue = event.currentTarget.value.trim();

    if (!currentValue) {
      return;
    }
    const existingItem = options.find((item) => item.label === currentValue);

    if (existingItem) {
      if (!valueProp.some((item) => item.id === existingItem.id)) {
        onChange([...valueProp, existingItem]);
      }
      setFilteredOptions(options);
    } else {
      const newItem = { label: currentValue, id: uuidv4() };
      const newOptions = [newItem, ...options];
      setOptions(newOptions);
      setFilteredOptions(newOptions);
      onChange([...valueProp, newItem]);
    }

    setValue("");
  };

  const handleDebouncedAction = useCallback(
    (value: string) => {
      const newOptions = options.filter((item) => item.label.toLowerCase().includes(value.toLowerCase()));
      setFilteredOptions(newOptions);
    },
    [options]
  );

  const debouncedChange = useDebounceFn(handleDebouncedAction, 250);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value;
    debouncedChange(currentValue);
    setValue(currentValue);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ClickAwayListener onClickAway={handleClose} className={className}>
      <div className={styles.multiSelect}>
        <Input
          onFocus={handleOpen}
          onChange={handleInputChange}
          value={value}
          endIcon={open ? <ChevronUpIcon /> : <ChevronDownIcon />}
          onKeyDown={handleAddOptions}
          placeholder="Add item and press enter"
          {...inputProps}
        />

        {open && (
          <List
            onClick={(item, selected) => {
              if (selected) {
                onChange(valueProp.filter(({ id }) => id !== item.id));
                return;
              }
              onChange([...valueProp, item]);
            }}
            options={filteredOptions}
            selectedOptions={valueProp}
            emptyState={<span className={styles.emptyState}>No items found! Press enter to add.</span>}
          />
        )}
        <div className={styles.chipContainer}>
          {valueProp.map(({ label, id }) => (
            <Chip
              key={id}
              label={label}
              endIcon={
                <IconButton onClick={() => onChange(valueProp.filter((item) => item.id !== id))}>
                  <CloseIcon />
                </IconButton>
              }
            />
          ))}
        </div>
      </div>
    </ClickAwayListener>
  );
}
