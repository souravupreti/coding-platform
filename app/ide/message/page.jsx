"use client";

import { useMemo, useState } from "react";
import { getSocket } from "../../config/socket";
import { useEffect } from "react"; 

export default function Message() {
  const [count, setCount] = useState(0);
  const socket =useMemo(()=>{
    const socketInstance = getSocket();
    return socketInstance.connect();
  }
  ,[]);
  useEffect(()=>{
    console.log(socket);
    socket.emit("message","hello");
    socket.on("add",(payload)=>{
      console.log(payload);
      setCount((prev)=>prev+1);
    });
    socket.on("minus",(payload)=>{
      console.log(payload);
      setCount((prev)=>prev-1);
    });
  },[]);

  const increment = () => {
    console.log("increment");
    socket.emit("add",1);
  };

  const decrement = () => {
    socket.emit("minus",1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Counter</h2>
      
      <div className="flex items-center space-x-4">
        <button
          onClick={decrement}
          className="bg-red-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          -
        </button>
        
        <span className="text-4xl font-bold text-gray-800 min-w-[3rem] text-center">
          {count}
        </span>
        
        <button
          onClick={increment}
          className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          +
        </button>
      </div>
    </div>
  );
}
