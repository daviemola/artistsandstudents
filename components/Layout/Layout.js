import Sidebar from "./Sidebar";
import React from "react";

export default function Layout({ children }) {
  return (
    <div className="">
      <Sidebar />
      {children}
    </div>
  );
}
