"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Please enter both email and password.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (res.ok) {
                toast.success("Login successful! Redirecting...");
                document.cookie = `token=${data.token}; path=/`; // Store token
                setTimeout(() => router.push("/"), 2000);
            } else {
                toast.error(data.error || "Invalid credentials.");
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
                <h1 className="text-xl font-bold mb-4">Login</h1>
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
                <Button
                    onClick={handleLogin}
                    className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </Button>
            </div>
        </div>
    );
}
