import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Credits</CardTitle>
      </CardHeader>
      <CardContent>
        {credits.length > 0 ? (
          <div className="space-y-3">
            {credits.map((credit, index) => (
              <Card key={index} className="p-4">
                <p><strong>Amount:</strong> ₹{credit.amount}</p>
                <p><strong>From:</strong> {credit.from}</p>
                <p><strong>Date:</strong> {new Date(credit.timestamp).toLocaleString()}</p>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No credits found.</p>
        )}
      </CardContent>
    </Card>
  );
}