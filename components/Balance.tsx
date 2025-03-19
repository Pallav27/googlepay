import React from "react";
import { Button } from "./ui/button";
import {Input} from "./ui/input";

interface User {
  name: string;
  branch: string;
  accountNumber: string;
  money: number;
  email: string;
}

interface BalanceProps {
  user: User | null;
}

export default function Balance({ user }: BalanceProps) {
  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 h-full rounded-lg shadow-lg border border-gray-200 items-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Account Overview</h2>
      {user ? (
        <div className="space-y-4 text-center">
          <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <p className="text-sm text-gray-600">Name</p>
            <p className="text-lg font-semibold text-gray-800">{user.name}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <p className="text-sm text-gray-600">Branch</p>
            <p className="text-lg font-semibold text-gray-800">{user.branch}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <p className="text-sm text-gray-600">Account Number</p>
            <p className="text-lg font-semibold text-gray-800">{user.accountNumber}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <p className="text-sm text-gray-600">Balance</p>
            <p className="text-2xl font-bold text-green-600">₹{user.money}</p>
          </div>
          <div className="flex flex-col space-y-4 items-center">
            <Input placeholder="Enter VPA"/>
            
            <Button onChange={() => console.log("Transfer Money")}>
              Transfer Money
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <p className="text-gray-600">Please log in to view your balance.</p>
        </div>
      )}
    </div>
  );
}