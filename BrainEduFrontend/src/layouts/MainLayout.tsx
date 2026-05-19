import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router";
import AppHoc from "../hocs/appHocs";
import Header from "../components/Header/Header";
import PageMeta from "../components/common/PageMeta";
function MainLayout() {

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />

      <main 
        className="flex-1 overflow-y-auto relative scroll-smooth" 
      >
        <div className="max-w-7xl py-4 mx-auto relative z-10 min-h-[calc(100vh-80px)] bg-white!">
          <Outlet />
        </div>

      </main>
    </div>
  );
}

export default AppHoc(MainLayout);