"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "react-hot-toast";

interface Request {
  id: string;
  amount: number;
  from: string;
  to: string;
  status: "Pending" | "Completed" | "Rejected";
}

export default function Requests({ userVPA }: { userVPA: string }) {
  const [vpa, setVPA] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    // Fetch requests from the database
    const fetchRequests = async () => {
      try {
        const res = await fetch(`/api/requests?userVPA=${userVPA}`);
        if (!res.ok) {
          throw new Error("Failed to fetch requests.");
        }
        const data = await res.json();
        setRequests(data.requests || []); // Ensure requests is an array
      } catch (error) {
        console.error("Fetch requests error:", error);
        toast.error("Failed to fetch requests.");
      }
    };

    fetchRequests();
  }, [userVPA]);

  const handleRequest = async () => {
    if (!vpa || !amount) {
      toast.error("Please fill in all fields.");
      return;
    }

    const amountNumber = parseFloat(amount);
    if (isNaN(amountNumber) || amountNumber <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fromVPA: userVPA, toVPA: vpa, amount: amountNumber }),
      });

      if (!res.ok) {
        throw new Error("Failed to send request.");
      }

      const data = await res.json();
      toast.success("Request sent successfully!");
      setRequests((prev) => [data.request, ...prev]);
      setVPA("");
      setAmount("");
    } catch (error) {
      console.error("Request error:", error);
      toast.error("Failed to send request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (requestId: string, status: "Completed" | "Rejected") => {
    try {
      const res = await fetch("/api/requests", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, fromVPA: userVPA, toVPA: vpa, status }),
      });

      if (!res.ok) {
        throw new Error("Failed to update request.");
      }

      const data = await res.json();
      toast.success(`Request ${status.toLowerCase()}.`);
      setRequests((prev) =>
        prev.map((request) =>
          request.id === requestId ? { ...request, status } : request
        )
      );
    } catch (error) {
      console.error("Update status error:", error);
      toast.error("Failed to update request. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Money Requests</h2>

      {/* Request Form */}
      <div className="mb-8">
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
          <Button onClick={handleRequest} disabled={loading}>
            {loading ? "Sending Request..." : "Send Request"}
          </Button>
        </div>
      </div>

      {/* Request History Table */}
      <Table>
        <TableCaption>Request History</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Amount</TableHead>
            <TableHead>VPA ID</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.length > 0 ? (
            requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>₹{request.amount}</TableCell>
                <TableCell>{request.from === userVPA ? request.to : request.from}</TableCell>
                <TableCell>
                  {request.status === "Pending" ? (
                    <div className="relative group">
                      <span className="text-yellow-600">Pending</span>
                      <div className="absolute hidden group-hover:block bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10">
                        <Button
                          onClick={() => handleUpdateStatus(request.id, "Completed")}
                          className="bg-green-500 text-white px-2 py-1 mr-2"
                        >
                          Complete
                        </Button>
                        <Button
                          onClick={() => handleUpdateStatus(request.id, "Rejected")}
                          className="bg-red-500 text-white px-2 py-1"
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  ) : request.status === "Completed" ? (
                    <span className="text-green-600">Completed</span>
                  ) : (
                    <span className="text-red-600">Rejected</span>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-gray-500">
                No requests found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}