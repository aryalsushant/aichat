import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import Homepage from './routes/homepage/homepage';
import DashboardPage from './routes/dashboardpage/dashboardpage';
import ChatPage from './routes/chatpage/chatpage';

const router = createBrowserRouter([
 {
  element: <RootLayout/>,
  childern: [
    {
      path: "/", element: <Homepage/>
    }
  ]
 },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
