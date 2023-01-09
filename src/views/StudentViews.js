import { Outlet, Route, Routes } from "react-router-dom"
import { Home } from "../components/home/Home"
import { StudentView } from "../components/students/StudentView"

export const StudentViews = () => {
    return (
        <Routes>
            <Route path="/" element={<Outlet />} >
            
				<Route path="students" element={ <StudentView />  } />
                <Route path="/home" element={ <Home />} />

            </Route>
        </Routes>
    )}