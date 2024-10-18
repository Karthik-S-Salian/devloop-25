"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button, type ButtonProps } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import { cn } from "~/lib/utils";

export type InnerComboboxProps<T> = {
  data: T[];
  dataValueKey: keyof T;
  dataDisplayKey: keyof T;
  dataSearchKeys?: (keyof T)[];
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  noResultPlaceholder?: string | React.ReactElement;
};

const InnerCombobox = <T extends Record<string, string>>({
  data,
  dataValueKey,
  dataDisplayKey,
  dataSearchKeys,
  value,
  setValue,
  placeholder,
  noResultPlaceholder = "No results found",
  setOpen,
}: InnerComboboxProps<T> & {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <Command>
    <CommandInput placeholder={placeholder} />
    <CommandList>
      <CommandEmpty asChild={typeof noResultPlaceholder !== "string"}>
        {noResultPlaceholder}
      </CommandEmpty>
      <CommandGroup>
        {data.map((d, idx) => (
          <CommandItem
            key={idx}
            value={d[dataValueKey]}
            onSelect={(currentValue) => {
              setValue(currentValue === value ? "" : currentValue);
              setOpen(false);
            }}
            keywords={[d[dataDisplayKey]].concat(
              dataSearchKeys?.map((key) => d[key]) ?? [],
            )}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                value === d[dataValueKey] ? "opacity-100" : "opacity-0",
              )}
            />
            {d[dataDisplayKey]}
          </CommandItem>
        ))}
      </CommandGroup>
    </CommandList>
  </Command>
);

const Combobox = <T extends Record<string, string>>({
  data,
  dataValueKey,
  dataDisplayKey,
  dataSearchKeys,
  value,
  setValue,
  placeholder,
  noResultPlaceholder = "No results found",
  className,
  ref,
  ...props
}: InnerComboboxProps<T> &
  ButtonProps & {
    ref?: React.RefObject<HTMLButtonElement>;
  }) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={(cn("w-[200px] justify-between"), className)}
            {...props}
          >
            {data.find((d) => d[dataValueKey] === value)?.[dataDisplayKey] ??
              placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          container={containerRef.current}
          className="w-[200px] p-0"
        >
          <InnerCombobox
            data={data}
            dataValueKey={dataValueKey}
            dataDisplayKey={dataDisplayKey}
            dataSearchKeys={dataSearchKeys}
            value={value}
            setValue={setValue}
            placeholder={placeholder}
            noResultPlaceholder={noResultPlaceholder}
            setOpen={setOpen}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export { InnerCombobox, Combobox };
