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

interface Transaction {
  amount: number;
  to: string;
  timestamp: Date;
}

interface DebitsProps {
  debits: Transaction[];
}

export default function Debits({ debits }: DebitsProps) {
  return (
    <div className="h-full p-4 bg-gray-50 rounded-lg">
      <div className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Debits
      </div>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead>Amount</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {debits.length > 0 ? (
            debits.map((debit, index) => (
              <TableRow key={index}>
                <TableCell>₹{debit.amount}</TableCell>
                <TableCell>{debit.to}</TableCell>
                <TableCell>{new Date(debit.timestamp).toLocaleString()}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-gray-500">
                No debits found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}