"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type Transaction = {
  date: string;
  debits: number;
  credits: number;
};

export default function TransactionChart({ transactions }: { transactions: Transaction[] }) {
  const [showDebits, setShowDebits] = useState(true);

  // Ensure transactions have unique date keys
  const uniqueTransactions = transactions.map((t, index) => ({ ...t, id: `${t.date}-${index}` }));

  return (
    <Card className="p-4 shadow-lg rounded-2xl border border-gray-200 dark:border-gray-800 w-full h-96">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Transactions Overview
        </CardTitle>
        <div className="flex gap-2">
          <Button variant={showDebits ? "default" : "outline"} onClick={() => setShowDebits(true)}>
            Debits
          </Button>
          <Button variant={!showDebits ? "default" : "outline"} onClick={() => setShowDebits(false)}>
            Credits
          </Button>
        </div>
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={uniqueTransactions} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
            <XAxis dataKey="date" tick={{ fill: "#94a3b8" }} />
            <YAxis tick={{ fill: "#94a3b8" }} />
            <Tooltip contentStyle={{ backgroundColor: "#1e293b", color: "#f8fafc", borderRadius: "8px" }} cursor={{ fill: "#334155" }} />
            <Legend iconType="circle" wrapperStyle={{ color: "#94a3b8" }} />
            {showDebits ? (
              <Bar key="debits-bar" dataKey="debits" fill="#f87171" name="Debits" radius={[8, 8, 0, 0]} />
            ) : (
              <Bar key="credits-bar" dataKey="credits" fill="#34d399" name="Credits" radius={[8, 8, 0, 0]} />
            )}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}