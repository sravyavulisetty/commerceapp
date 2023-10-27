"use client"
import "@/app/globals.css"
import { useEffect, useState } from "react";
import {usePathname} from "next/navigation";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { BiSolidDashboard } from "react-icons/bi";
import { BsCartCheckFill } from "react-icons/bs";
import { BsFillBoxFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import {BiMenu} from "react-icons/bi";
import {BiSearch} from "react-icons/bi";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
function MainLayout({children}) {
  const inactiveLink = "flex gap-1 items-center my-2 ml-2";
  const activeLink = "flex gap-1 items-center bg-white text-blue-900 my-2 ml-2 rounded p-1";
  const [show,setShow] = useState(false); 
  const {data: session} = useSession();
  const router = usePathname();
  const handleShow = ()=>{
    setShow(prev => !prev);
   }
  if(!session){
    return ( 
    <div className='bg-blue-900 w-screen h-screen flex items-center justify-center'>
      <div className='text-center w-full'>
        <button onClick={()=>{
          signIn('google');
        }} className='bg-white rounded p-2'>Sign in with GOOGLE</button>
      </div>
    </div>
    )
  }
  return (
    <>
    <div className='relative overflow-hidden flex flex-row justify-center items-center p-7 bg-blue-900'>
    {show ? 
    <div className='absolute left-1 float-left flex flex-row text-center text-white'>
            <div className='flex flex-row items-center justify-center rounded bg-white p-2 text-blue-900'>
                <HiOutlineBuildingStorefront size={25}/>
                <span className='text-sm'>E-commerce Admin</span>
            </div>
            <span><button><BiMenu size={35} onClick={handleShow} className='ml-2'/></button></span>
    </div>:
    <div className='absolute left-4 top-2 float-left text-center bg-blue-900 text-white'>
        <button><BiMenu size={40} onClick={handleShow}/></button>
    </div>
   }
    <div className='absolute top-1/2 left-auto -translate-y-1/2 flex flex-row items-center justify-center'>
       <div>
        <input className='border-white h-auto w-auto' type='text' placeholder='Search here'/>
        </div>
       <button><BiSearch size={25} color='white' className='ml-2 -mt-1'/></button>
    </div>
    <div className='absolute left-3/4 text-white text-center'>
        <div className="flex flex-row">
        <div className="flex flex-row items-center justify-center">
          <img src={session.user.image} alt="image" className="w-8 h-8 rounded-full"/>
          <span className='ml-1'>{session.user.name}</span>
        </div>
        <button onClick={()=>signOut("google")} className='ml-4'>Sign out</button>
        </div>
    </div>
    </div>
    <div className='bg-white rounded-lg p-4 flex'>
      {!show ? 
      <div className="min-h-screen bg-blue-900 p-3 -mt-4 text-white -ml-4 mr-4 flex flex-col gap-2 ease-in transition duration-400">
        <Link href="/" className={router === "/" ? activeLink : inactiveLink}><BiSolidDashboard size={30}/>
                </Link>
            <Link href="/orders" className={router === "/orders" ? activeLink : inactiveLink}><BsCartCheckFill size={30}/>
                </Link>
            <Link href="/products" className={router === "/products" ? activeLink : inactiveLink}><BsFillBoxFill size={30}/>
                </Link>
            <Link href="/settings" className={router === "/settings" ? activeLink : inactiveLink}><IoMdSettings size={30}/>
                </Link>
      </div> :
      <div className='flex flex-col gap-2 min-h-screen bg-blue-900 text-white -ml-4 -mt-4 p-3 ease-in transition duration-200'>
        <Link href="/" className={router === "/" ? activeLink : inactiveLink}>
      <BiSolidDashboard size={30}/>
           <p className="ease-in transition duration-200">Dashboard</p>
        </Link>
        <Link href="/orders" className={router === "/orders" ? activeLink : inactiveLink}>
      <BsCartCheckFill size={30}/>
           Orders
        </Link>
        <Link href="/products" className={router === "/products" ? activeLink : inactiveLink}>
      <BsFillBoxFill size={30}/>
           Products
        </Link>
        <Link href="/settings" className={router === "/settings" ? activeLink : inactiveLink}>
      <IoMdSettings size={30}/>
          Settings
        </Link>
      </div>}
      <div className="ml-12 w-2/3">{children}</div>
      </div>
    </>
  )
}
export default MainLayout;
