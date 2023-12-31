import React from 'react'
import Dashboard from './Components/Dashboard'
import DashContext from './utils/DashContext'
import {BrowserRouter,Routes, Route, Navigate} from 'react-router-dom'
function App() {
  return <>
  <DashContext>
    <Dashboard/>
  </DashContext>
  </>
}

export default App