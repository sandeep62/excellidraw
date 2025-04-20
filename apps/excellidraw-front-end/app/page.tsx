"use client";
import { useState } from "react";
import Input from "@repo/ui/input";
import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";

export default function AuthPage({ isSignin }: { isSignin: boolean }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // only for signup
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleAuth = async () => {
    setLoading(true);
    setError("");

    try {
      const url = isSignin ? "http://localhost:3012/signin" : "http://localhost:3012/signup";
      const payload = isSignin
        ? { username: email, password }
        : { username: email, password, name };

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      if (isSignin && data.token) {
        localStorage.setItem("token", data.token);
        router.push("/dashboard");
      }

      if (!isSignin && data.UserId) {
        alert("Signup successful! Please sign in.");
        router.push("/signin");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex">
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-800 to-indigo-600 text-white justify-center items-center flex-col p-10">
        <h1 className="text-5xl font-bold mb-4">Welcome to ExcelliDraw</h1>
        <p className="text-lg text-center max-w-md">Sign in to collaborate and create!</p>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
            {isSignin ? "Sign In" : "Create Account"}
          </h2>

          <div className="space-y-5">
            {!isSignin && (
              <Input
                type="text"
                size="big"
                placeholder="Your name"
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <Input
              type="email"
              size="big"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              size="big"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button
              size="big"
              className="w-full py-3 bg-blue-600 text-white rounded-lg"
              onClick={handleAuth}
              
            >
              {loading ? "Processing..." : isSignin ? "Sign In" : "Sign Up"}
            </Button>
          </div>

          <p className="text-center text-sm mt-6">
            {isSignin ? "Don't have an account?" : "Already have an account?"}{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => router.push(isSignin ? "/signup" : "/signin")}
            >
              {isSignin ? "Sign Up" : "Sign In"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
