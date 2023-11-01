"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useLogStore } from "@/store";
import { SelectSingleEventHandler } from "react-day-picker";
import { toast } from "./ui/use-toast";
import dayjs from "dayjs";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function NewLog() {
  const log = useLogStore((state) => state.log);
  const logs = useLogStore((state) => state.logs);
  const setLog = useLogStore((state) => state.setLog);
  const setLogs = useLogStore((state) => state.setLogs);
  const setDate = useLogStore((state) => state.setDate);

  const supebase = createClientComponentClient()

  const closeDialog = () => {
    document.getElementById("close-btn")?.click()
  }

  const validateLog = () => {
    if (!log.date || !log.hour || log.hour === 0) {
      throw "Ngày và giờ không được trống!";
    } else if (log.hour >= 242) {
      throw "Ngày chỉ có 24h!";
    }
  };

  const submitLog = async () => {
    try {
      validateLog();
      const {error} = await supebase.from("logs").upsert({
        ...log, date:  dayjs(log.date).format("DD-MM-YYYY")
      }).select("*").single()
      if(!error){
        setLogs(log,dayjs(log.date).format("DD-MM-YYYY"))
      toast({
        title: "Tạo bản ghi thành công!",
        description: `${log.hour} hours in ${dayjs(log.date).format("DD-MM-YYYY")}`,
        variant: "default"
      })
      closeDialog()
      }else {
        toast({
          title: "Tạo bản ghi thất bại!",
          description: error.message,
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Tạo bản ghi thất bại!",
        description: error as string,
        variant: "destructive"
      })
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="border border-dashed dark:border-white sm:w-72 w-full h-14 flex flex-col"
        >
          <IoMdAddCircleOutline className="w-6 h-6 dark:text-white text-muted-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tạo bản ghi</DialogTitle>
          <DialogDescription>
            Hãy nhớ rằng, thời gian là tài sản quý giá nhất của bạn - hãy đầu tư
            nó một cách khôn ngoan với Ứng dụng Nhật ký thời gian của bạn!
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Label>Ngày:</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !log.date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {log.date ? (
                    format(log.date as Date, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={log.date as Date}
                  onSelect={setDate as SelectSingleEventHandler}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center gap-4">
            <Label>Giờ:</Label>
            <Input
              value={log.hour}
              onChange={(e) =>
                setLog({ ...log, hour: parseInt(e.target.value) })
              }
              type="number"
              min="0"
              max="23"
            />
          </div>

          <div className="flex items-center gap-4">
            <Label>Note:</Label>
            <Input
              placeholder="Note of the log"
              value={log.note}
              onChange={(e) => setLog({ ...log, note: e.target.value })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={submitLog}
          >
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
