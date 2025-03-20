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
  from: string;
  timestamp: Date;
}

interface CreditsProps {
  credits: Transaction[];
}

export default function Credits({ credits }: CreditsProps) {
  return (
    <div className="h-full p-4 bg-gray-50 rounded-lg">
      <div className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Credits
      </div>
      <Table className="border">
        
        <TableHeader>
          <TableRow>
            <TableHead>Amount</TableHead>
            <TableHead>From</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {credits.length > 0 ? (
            credits.map((credit, index) => (
              <TableRow key={index}>
                <TableCell>₹{credit.amount}</TableCell>
                <TableCell>{credit.from}</TableCell>
                <TableCell>{new Date(credit.timestamp).toLocaleString()}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-gray-500">
                No credits found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}