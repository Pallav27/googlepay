import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Balance = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-md">
      {/* Bank Balance Display */}
      <h1 className="text-4xl font-bold text-gray-800">Bank Balance</h1>
      <div className="text-6xl font-semibold text-green-600 my-4">$500.00</div>

      {/* Account Details */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-left">
        <h2 className="text-lg font-bold text-gray-700">Account Details</h2>
        <p className="text-gray-600"><span className="font-semibold">Name:</span> Pallav Sharma</p>
        <p className="text-gray-600"><span className="font-semibold">Account Number:</span> 1234567890</p>
        <p className="text-gray-600"><span className="font-semibold">Branch Name:</span> Bokaro</p>
        <p className="text-gray-600"><span className="font-semibold">Email:</span> pallavshrm27@gmail.com</p>
      </div>

      {/* Transfer Section */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Transfer Funds</h2>
        <div className="flex flex-col gap-4">
          <Input placeholder="Enter VPA ID" className="p-2 border border-gray-300 rounded-md" />
          <Input placeholder="Enter Amount" className="p-2 border border-gray-300 rounded-md" />
          <Button className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-md">
            Transfer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Balance;
