import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Debits</CardTitle>
      </CardHeader>
      <CardContent>
        {debits.length > 0 ? (
          <div className="space-y-3">
            {debits.map((debit, index) => (
              <Card key={index} className="p-4">
                <p><strong>Amount:</strong> ₹{debit.amount}</p>
                <p><strong>To:</strong> {debit.to}</p>
                <p><strong>Date:</strong> {new Date(debit.timestamp).toLocaleString()}</p>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No debits found.</p>
        )}
      </CardContent>
    </Card>
  );
}