import React from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Login from './pages/Login.js'
import ShowOne from './pages/ShowOne.js'
import ShowOfferts from './pages/ShowOfferts.js'
import Register from './pages/Register.js'
import AddOffert from './pages/AddOffert.js'
import Dashboard from './pages/Dashboard.js'
import EditOffert from './pages/EditOffert.js'

const App =()=>{
    return <div>
        <BrowserRouter>
        <Routes>
        <Route path="/" exact element={<Login />}></Route>
        <Route path="https://krzysiekkurwainzynierem.netlify.app/login" exact element={<Login />}></Route>
        <Route path="https://krzysiekkurwainzynierem.netlify.app/register" exact element={<Register />}></Route>
        <Route path="https://krzysiekkurwainzynierem.netlify.app/addoffert" exact element={<AddOffert />}></Route>
        <Route path="https://krzysiekkurwainzynierem.netlify.app/offerts/page/:id" exact element={<ShowOfferts />}></Route>
        <Route path="https://krzysiekkurwainzynierem.netlify.app/editOffert/:id" exact element={<EditOffert />}></Route>
        <Route path="https://krzysiekkurwainzynierem.netlify.app/dashboard/" exact element={<Dashboard />}></Route>
        <Route path="https://krzysiekkurwainzynierem.netlify.app/offert/:id" exact element={<ShowOne />}></Route>

        </Routes>
        </BrowserRouter>
    </div>
}

export default App