import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './Pages/Home/index.tsx'
import SavedQuotesPage from './Pages/SavedQuotes.tsx'
import SharedQuotePage from './Pages/SharedQuote/index.tsx'

const router = createBrowserRouter([
  {path: '/', element: <HomePage/>},
  {path: '/saved-quotes', element: <SavedQuotesPage/>},
  {path: '/shared-quote', element: <SharedQuotePage/>},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
