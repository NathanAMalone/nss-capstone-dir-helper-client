import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { InstrumentList } from "../components/instruments/InstrumentList"
import { MusicList } from "../components/music/MusicList"
import { UniformList } from "../components/uniforms/UniformList"
import { PropList } from "../components/props/PropsList"
import { StudentList } from "../components/students/StudentList"

export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                {/* Add Routes here */}
				
                <Route path="instruments" element={ <InstrumentList />  } />
                <Route path="music" element={ <MusicList />  } />
                <Route path="uniforms" element={ <UniformList />  } />
                <Route path="props" element={ <PropList />  } />
                <Route path="students" element={ <StudentList />  } />

            </Route>
        </Routes>
    </>
}
