"use client";

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
  to?: string; // For debits
  from?: string; // For credits
  timestamp: Date;
}

interface TransactionsProps {
  debits: Transaction[];
  credits: Transaction[];
}

export default function Transactions({ debits, credits }: TransactionsProps) {
  // Combine debits and credits into a single array
  const transactions = [
    ...debits.map((debit) => ({ ...debit, type: "debit" as const })),
    ...credits.map((credit) => ({ ...credit, type: "credit" as const })),
  ];

  // Sort transactions by timestamp (newest first)
  transactions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="h-full p-4 bg-gray-50 rounded-lg">
      <Table>
        <TableCaption>Transaction History</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell>
                  {transaction.type === "credit" ? (
                    <span className="text-green-600">Credit</span>
                  ) : (
                    <span className="text-red-600">Debit</span>
                  )}
                </TableCell>
                <TableCell
                  className={
                    transaction.type === "credit" ? "text-green-600" : "text-red-600"
                  }
                >
                  ₹{transaction.amount}
                </TableCell>
                <TableCell>
                  {transaction.type === "credit"
                    ? `From: ${transaction.from}`
                    : `To: ${transaction.to}`}
                </TableCell>
                <TableCell>
                  {new Date(transaction.timestamp).toLocaleString()}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500">
                No transactions found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}