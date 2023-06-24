"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Tooltip } from "flowbite-react";
import logoIcon from "@assets/images/logo_icon.png"

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="h-screen min-h-full">
      <div className="bg-[#292F4C] px-2 w-[5rem] h-full">
        <div className="flex flex-col items-center justify-between h-full">
          <div className="flex flex-col items-center">
            <Link href="/">
              <div className="flex-shrink-0 pt-2 flex items-center justify-center ">
                <Image
                  alt="logo_icon"
                  src={logoIcon}
                  width={60}
                  height={80}
                  priority
                />
              </div>
            </Link>
            <div className="bg-gray-600/50 h-[1.6px] w-full" />
            <div className="flex flex-col items-center w-full space-y-4">
              <Link href="/dashboard">
                <Tooltip content="Manage Task" placement="right">
                  <div className="mt-4 flex items-center p-2 hover:bg-gray-700 hover:rounded-md cursor-pointer tooltip-right peer">
                    <i className="fas fa-calendar-check text-indigo-600 text-xl "></i>
                  </div>
                </Tooltip>
              </Link>
              <div
                className="flex items-center p-2 hover:bg-gray-700 hover:rounded-md cursor-pointer tooltip-right"
                data-tooltip="Inbox"
                data-tooltip-position="right"
              >
                <i className="far fa-inbox text-xl text-white"></i>
              </div>
            </div>
          </div>
          <div className="pb-4 flex flex-col-reverse space-y-4 space-y-reverse w-full">
            <div className="flex items-center justify-center">
              <div
                className="flex items-center p-2 hover:bg-gray-700 hover:rounded-md cursor-pointer tooltip-right bg-indigo-600 rounded-md"
                data-tooltip="User"
                data-tooltip-position="right"
              >
                <i className="far fa-user text-xl text-white"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
