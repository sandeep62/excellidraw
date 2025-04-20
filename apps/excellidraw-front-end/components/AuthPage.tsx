"use client";

import Input from "@repo/ui/input";
import { Button } from "@repo/ui/button";

export default function AuthPage({ isSignin }: { isSignin: boolean }) {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-blue-900">
      <div className="p-6 bg-slate-200 rounded-lg shadow-lg w-[350px]">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          {isSignin ? "Sign In" : "Sign Up"}
        </h2>

        <div className="space-y-4">
          <Input
            size="big"
            placeholder="Email"
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <Input
          size="big"
            placeholder="Password"
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <Button
            className="w-full py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md transition duration-300 shadow"
            onClick={() => alert("Hello")}
          >
            Submit
          </Button>
        </div>

        <p className="text-sm text-gray-600 text-center mt-4">
          {isSignin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span className="text-blue-600 hover:underline cursor-pointer">
            {isSignin ? "Sign up" : "Sign in"}
          </span>
        </p>
      </div>
    </div>
  );
}
