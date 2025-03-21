"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

type Transaction = {
  date: string;
  debits: number;
  credits: number;
};

export default function TransactionChart({ transactions }: { transactions: Transaction[] }) {
  return (
    <Card className="p-4">
      <CardContent className="h-96">
        <h2 className="text-xl font-bold mb-4">Transactions Overview</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={transactions} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="debits" fill="#f87171" name="Debits" />
            <Bar dataKey="credits" fill="#34d399" name="Credits" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
