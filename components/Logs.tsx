"use client"
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLogStore } from "@/store";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export default function Logs() {
  const logs = useLogStore((state) => state.logs)
  return (
    <Table>
      <TableCaption>Danh sách các bản ghi.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/3">Ngày</TableHead>
          <TableHead className="w-1/3">Thời gian</TableHead>
          <TableHead className="w-1/3">Ghi chú</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(logs)?.map((log) => {
            const date = log[1].date as Date
          return (
            <TableRow key={log[0]}>
              <TableCell>
                {date.toLocaleDateString()}
              </TableCell>
              <TableCell>{log[1].hour}</TableCell>
              <TableCell>{log[1].note}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  );
}
