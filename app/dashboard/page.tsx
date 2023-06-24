"use client";

import Sidebar from "@/core/layout/Sidebar";
import MainTask from "@/core/pages/dashboard/MainTask";
import { Tab } from "@/src/components";
import React from "react";
import { Breadcrumb } from "flowbite-react";
import { useUserContext } from "@/src/contexts/UserContext";

const page = () => {
  const { user } = useUserContext();
  return (
    <div className="flex flex-1">
      <Sidebar />
      <div className="px-6 w-full h-full py-6">
        <Breadcrumb>
          <Breadcrumb.Item>
            <div className="flex items-center gap-2">
              <i className="fas fa-home text-indigo-600"></i>
              <span>Home</span>
            </div>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Task</Breadcrumb.Item>
        </Breadcrumb>
        <div className="mt-16">
          {user?.role_code == "T" && (
            <Tab>
              <Tab.Item label="Calendar Task">
                <MainTask />
              </Tab.Item>
              <Tab.Item label="Monitoring Task">adad</Tab.Item>
            </Tab>
          )}
          {user?.role_code === "S" && (
            <Tab>
              <Tab.Item label="Calendar Task">
                <MainTask />
              </Tab.Item>
            </Tab>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
