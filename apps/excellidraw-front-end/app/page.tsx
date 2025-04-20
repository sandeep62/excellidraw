"use client";
import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div>
        <Button size="big" className="to-blue-500 p-2 mr-2 rounded-sm" onClick={()=>{
          router.push("/signin")
        }} >Please SignIn</Button>
      </div>
    </div>
  );
}
