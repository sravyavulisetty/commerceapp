"use client";
import MainLayout from "@/components/MainLayout";
import { useSession, getSession } from "next-auth/react";
import { useEffect } from "react";
function Home(){
  const {data :session} = useSession();
  return (
    <MainLayout>
      <div className="text-blue-900 flex justify-between">
        <h2>Hello</h2>
      </div> 
    </MainLayout>
  )
 
}
export default Home;
