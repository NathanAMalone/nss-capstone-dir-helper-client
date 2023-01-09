import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./components/nav/NavBar"
import { Route, Routes } from "react-router-dom"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { Authorized } from "./views/Authorized"
import { DirectorRegister } from "./components/auth/DirectorRegister"


export const Helper = () => {
    return <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/directorRegister" element={<DirectorRegister />} />
    
        <Route path="*" element={
            <Authorized>
                <>
                    <NavBar />
                    <ApplicationViews />
                </>
            </Authorized> }/>
    
    </Routes> 
}

