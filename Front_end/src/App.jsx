import './App.css'

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ContextProvider from './components/ContextApi'
import Dashboard from './components/Dashboard'
import DeleteProduct from './components/DeleteProduct'
import Login from './components/Login'
import PrivateRoute from './components/PrivateRoute'
import Register from './components/Register'
import UpdateProduct from './components/UpdateProduct'
function App() {


  return (
    <>
      <ContextProvider>
        <BrowserRouter>
          <Routes>

            <Route path="/" element={<Navigate to='/login' />} />

            <Route element={<Register />} path="/register"></Route>
            <Route element={<Login />} path="/login"></Route>
            <Route element={<PrivateRoute><Dashboard /></PrivateRoute>} path="/dashboard"></Route>
            <Route element={<DeleteProduct />} path="/delete-product"></Route>
            <Route element={<PrivateRoute><UpdateProduct /></PrivateRoute>} path="/update-product"></Route>


          </Routes>

        </BrowserRouter>
      </ContextProvider>

    </>
  )
}

export default App
