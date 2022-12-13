import { Outlet, Route, Routes } from "react-router-dom"
import { InstrumentList } from "../components/instruments/InstrumentList"
import { MusicList } from "../components/music/MusicList"
import { UniformList } from "../components/uniforms/UniformList"
import { PropList } from "../components/props/PropsList"
import { StudentList } from "../components/students/StudentList"
import { EditInstrument } from "../components/instruments/EditInstrument"
import { EditMusic } from "../components/music/EditMusic"
import { EditUniform } from "../components/uniforms/EditUniform"
import { EditProp } from "../components/props/EditProp"
import { AddInstrument } from "../components/instruments/AddInstrument"
import { AddMusic } from "../components/music/AddMusic"
import { AddUniform } from "../components/uniforms/AddUniform"
import { AddProp } from "../components/props/AddProp"
import { EditStudent } from "../components/students/EditStudent"

export const DirectorViews = () => {
    return (
        <Routes>
            <Route path="/" element={<Outlet />} >
            
				
                <Route path="instruments" element={ <InstrumentList />  } />
                <Route path="addInstruments" element={ <AddInstrument />  } />
                <Route path="instruments/:instrumentId" element={ <EditInstrument />  } />
                <Route path="music" element={ <MusicList />  } />
                <Route path="addMusic" element={ <AddMusic />  } />
                <Route path="music/:musicId" element={ <EditMusic />  } />
                <Route path="uniforms" element={ <UniformList />  } />
                <Route path="addUniforms" element={ <AddUniform />  } />
                <Route path="uniforms/:uniformId" element={ <EditUniform />  } />
                <Route path="props" element={ <PropList />  } />
                <Route path="addProps" element={ <AddProp />  } />
                <Route path="props/:propId" element={ <EditProp />  } />
                <Route path="students" element={ <StudentList />  } />
                <Route path="students/:studentId" element={ <EditStudent />  } />

            </Route>
        </Routes>
    )
}
