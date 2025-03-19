// signup.tsx (Frontend Signup Page)
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [branch, setBranch] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [password, setPassword] = useState("");
    const [money, setMoney] = useState("");
    const [VPA, setVPA] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const generateAccountNumber = () => {
        const randomAccNum = Math.floor(1000000000 + Math.random() * 9000000000);
        setAccountNumber(randomAccNum.toString());
    };

    const generateMoney = () => {
        const randomMoney = Math.floor(10000 + Math.random() * 90000);
        setMoney(randomMoney.toString());
    };

    const handleSignup = async () => {
        if (!email || !password || !VPA || !name || !branch || !accountNumber || !money) {
            toast.error("Please fill in all fields.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, VPA, name, branch, accountNumber, money }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Signup successful! Redirecting...");
                setTimeout(() => router.push("/login"), 2000);
            } else {
                toast.error(data.error || "Signup failed. Try again.");
            }
        } catch (error) {
            console.error("Signup Error:", error);
            toast.error("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h1 className="text-xl font-bold text-center mb-4">Signup</h1>
                <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="mb-2 w-full" />
                <Input placeholder="Branch" value={branch} onChange={(e) => setBranch(e.target.value)} className="mb-2 w-full" />
                <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-2 w-full" />
                <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-2 w-full" />
                <Input placeholder="VPA" value={VPA} onChange={(e) => setVPA(e.target.value)} className="mb-4 w-full" />
                
                <Button onClick={generateAccountNumber} className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-2">
                    {accountNumber ? `Account No: ${accountNumber}` : "Generate Account Number"}
                </Button>
                
                <Button onClick={generateMoney} className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-2">
                    {money ? `Initial Money: ₹${money}` : "Generate Money"}
                </Button>
                
                <Button onClick={handleSignup} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full" disabled={loading}>
                    {loading ? "Signing up..." : "Signup"}
                </Button>
            </div>
        </div>
    );
}
