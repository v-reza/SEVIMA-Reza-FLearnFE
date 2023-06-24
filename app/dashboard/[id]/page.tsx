"use client"
import Sidebar from '@/core/layout/Sidebar'
import DetailTask from '@/core/pages/dashboard/DetailPage/DetailTask'
import { Breadcrumb } from 'flowbite-react'
import { useParams } from 'next/navigation'
import React from 'react'

const DetailPage = () => {
  const params = useParams()
  // console.log(id)
  return (
    <div>
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
          <Breadcrumb.Item>{params.id}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="mt-16">
          <DetailTask />
        </div>
      </div>
    </div>
    </div>
  )
}

export default DetailPage