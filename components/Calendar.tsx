"use client"
import React from "react";
import dayjs from "dayjs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useLogStore } from "@/store";

export default function Calendar() {
  const logs = useLogStore((state) => state.logs)
  function getDateInMonth(year = dayjs().year(), month = dayjs().month()) {
    const startDate = dayjs().year(year).month(month).date(1);
    const endDate = startDate.endOf("month");

    const datesArray = [];
    for (let i = startDate.date(); i <= endDate.date(); i++) {
      datesArray.push(startDate.date(i).format("DD-MM-YYYY"));
    }
    return datesArray;
  }

  const getColor = (value: number) => {
    if(value === 0){
        return "bg-gray-100 text-black"
    }else if(value < 5){
        return "bg-green-100 text-black"
    }
    else if(value < 10){
        return "bg-green-300 text-black"
    }
    else return "bg-green-500 text-white"
  }

  const hour = 10

  return (
    <div className="border border-dashed flex flex-wrap gap-2 p-5 justify-center rounded-md">
      {getDateInMonth().map((value, index) => {
        const log = logs[value]
        return (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger>
                <div className={cn("h-5 w-5 rounded-sm text-xs flex justify-center items-center font-bold cursor-pointer",getColor(log?.hour || 0))}>
                  {value.slice(0, 2)}
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{`${log?.hour || 0} hours on ${dayjs(log?.date).format("DD-MM-YYYY")}`}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
}
