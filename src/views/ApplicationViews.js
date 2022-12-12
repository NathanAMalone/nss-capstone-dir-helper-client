import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { InstrumentList } from "../components/instruments/InstrumentList"
import { MusicList } from "../components/music/MusicList"
import { UniformList } from "../components/uniforms/UniformList"
import { PropList } from "../components/props/PropsList"
import { StudentList } from "../components/students/StudentList"
import { EditInstrument } from "../components/instruments/EditInstrument"
import { EditMusic } from "../components/music/EditMusic"
import { EditUniform } from "../components/uniforms/EditUniform"
import { EditProp } from "../components/props/EditProp"

export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                {/* Add Routes here */}
				
                <Route path="instruments" element={ <InstrumentList />  } />
                <Route path="instruments/:instrumentId" element={ <EditInstrument />  } />
                <Route path="music" element={ <MusicList />  } />
                <Route path="music/:musicId" element={ <EditMusic />  } />
                <Route path="uniforms" element={ <UniformList />  } />
                <Route path="uniforms/:uniformId" element={ <EditUniform />  } />
                <Route path="props" element={ <PropList />  } />
                <Route path="props/:propId" element={ <EditProp />  } />
                <Route path="students" element={ <StudentList />  } />

            </Route>
        </Routes>
    </>
}
