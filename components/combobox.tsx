"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ComboBoxItemType } from "@/types/common";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

interface ComboBoxProps {
  items: ComboBoxItemType[];
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  searchPlaceholder?: string;
  onValueChange?: (value: string) => void;
}

export function ComboBox({
  items,
  defaultValue = "",
  placeholder = "Select...",
  buttonClassName,
  searchPlaceholder = "Search...",
  onValueChange,
}: ComboBoxProps) {
  const [value, setValue] = React.useState(defaultValue);
  const [open, setOpen] = React.useState(false);

  const selectedItem = items.find((item) => item.value === value);

  function handleSelect(newValue: string) {
    const val = newValue === value ? "" : newValue;
    setValue(val);
    if (onValueChange) onValueChange(val);
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-[250px] justify-between ${buttonClassName || ""}`}
        >
          {selectedItem ? selectedItem.label : placeholder}
          {selectedItem?.flag && <span className="ml-auto">{selectedItem?.flag}</span>}

          <ChevronsUpDown className="ml-2 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[250px] p-0" side="bottom" align="start">
        <Command className="scrollbar">
          <CommandInput placeholder={searchPlaceholder} autoFocus />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {items &&
                items.map((item) => (
                  <CommandItem key={item.value} value={item.value} onSelect={handleSelect}>
                    {item.label}
                    <div className="ml-auto flex flex-row items-center gap-x-1">
                      {value === item.value && <Check />}
                      {item.flag && <span>{item.flag}</span>}
                    </div>
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
