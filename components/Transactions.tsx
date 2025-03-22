"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Transaction {
  amount: number;
  to?: string;
  from?: string;
  timestamp: Date;
}

interface TransactionsProps {
  debits: Transaction[];
  credits: Transaction[];
  onTransfer: (vpa: string, amount: number) => void; // Add this prop
}

export default function Transactions({ debits, credits, onTransfer }: TransactionsProps) {
  const [vpa, setVPA] = useState("");
  const [amount, setAmount] = useState("");

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();

    const amountNumber = parseFloat(amount);
    if (isNaN(amountNumber) || amountNumber <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    onTransfer(vpa, amountNumber);
  };

  // Combine debits and credits into a single array
  const transactions = [
    ...debits.map((debit) => ({ ...debit, type: "debit" as const })),
    ...credits.map((credit) => ({ ...credit, type: "credit" as const })),
  ];

  // Sort transactions by timestamp (newest first)
  transactions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="h-full p-4 rounded-lg bg-stone-100">
      {/* Transfer Form */}
      <form onSubmit={handleTransfer} className="mb-6">
        <div className="flex flex-col space-y-4">
          <Input
            placeholder="Enter VPA ID"
            value={vpa}
            onChange={(e) => setVPA(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button type="submit">Transfer</Button>
        </div>
      </form>

      {/* Transactions Table */}
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