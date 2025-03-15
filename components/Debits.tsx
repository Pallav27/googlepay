import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Credits = () => {
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      {/* Section Title */}
      <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">Debits</h3>

      {/* Table */}
      <Table className="w-full border border-gray-200">
        <TableCaption className="text-gray-500">
          Last Fetched: {new Date().toLocaleString()}
        </TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="text-left font-semibold text-gray-700">Transaction ID</TableHead>
            <TableHead className="text-right font-semibold text-gray-700">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="border-t">
            <TableCell className="text-gray-600">Debit Card</TableCell>
            <TableCell className="text-red-500 text-right font-semibold">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Credits;
