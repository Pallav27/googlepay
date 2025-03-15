"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignup = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (res.ok) {
                toast.success("Signup successful! Redirecting...");
                setTimeout(() => router.push("/login"), 2000);
            } else {
                toast.error(data.error || "Signup failed. Try again.");
            }
        } catch (error) {
            toast.error("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-md w-80">
                <h1 className="text-xl font-bold mb-4">Signup</h1>
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-2"
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-4"
                />
                <button
                    onClick={handleSignup}
                    className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                    disabled={loading}
                >
                    {loading ? "Signing up..." : "Signup"}
                </button>
            </div>
        </div>
    );
}
