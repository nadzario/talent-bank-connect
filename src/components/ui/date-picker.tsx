
"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, Locale } from "date-fns";
import { ru } from "date-fns/locale";

interface DatePickerProps {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  locale?: Locale;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
}

export function DatePicker({ 
  selected, 
  onSelect, 
  placeholder = "Выберите дату", 
  className,
  locale = ru,
  value,
  onChange
}: DatePickerProps) {
  const actualValue = value || selected;
  const handleChange = (date: Date | undefined) => {
    if (onChange) onChange(date);
    if (onSelect) onSelect(date);
  };
  
  const formatDate = (date: Date) => {
    try {
      return format(date, "PPP", { locale });
    } catch (error) {
      console.error("Error formatting date:", error);
      return format(date, "yyyy-MM-dd");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !actualValue && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {actualValue ? formatDate(actualValue) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={actualValue}
          onSelect={handleChange}
          initialFocus
          locale={locale}
        />
      </PopoverContent>
    </Popover>
  );
}
