import { Outlet, Route, Routes } from "react-router-dom"
import { StudentList } from "../components/students/StudentList"
import { StudentView } from "../components/students/StudentView"

export const StudentViews = () => {
    return (
        <Routes>
            <Route path="/" element={<Outlet />} >
            
				<Route path="students" element={ <StudentView />  } />

            </Route>
        </Routes>
    )}