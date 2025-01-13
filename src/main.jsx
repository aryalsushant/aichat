import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import Homepage from './routes/homepage/homepage';
import DashboardPage from './routes/dashboardpage/dashboardpage';
import ChatPage from './routes/chatpage/chatpage';
import RootLayout from './layouts/rootLayout/rootLayout';
import DashboardLayout from './layouts/dashboardLayout/DashboardLayout';

const router = createBrowserRouter([
 {
  element: <RootLayout/>,
  children: [
    {
      path: "/", element: <Homepage/>,
    },
    {
      element: <DashboardLayout/>,
      children: [
        {
          path: "/dashboard",
          element: <DashboardPage/>
        },
        {
          path: "/dashboard/chats/:id",
          element: <ChatPage/>
        },
      ]
    },
  ],
 },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
