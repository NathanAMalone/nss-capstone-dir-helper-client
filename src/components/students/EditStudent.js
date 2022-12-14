import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getInstruments } from "../../managers/InstrumentManager";
import { getMusic } from "../../managers/MusicManager";
import { getProps } from "../../managers/PropManager";
import { getOneStudent, updateStudent } from "../../managers/StudentManager";
import { getUniforms } from "../../managers/UniformManager";

export const EditStudent = () => {
    const { studentId } = useParams()
    const [ currentStudent, setCurrentStudent ] = useState({
        instrumentId: 0,
        uniformId: 0,
        propId: 0,
        musicParts: []
    })
    const navigate = useNavigate()
    const [ props, setProps ] = useState([])
    const [ propsId, setPropsId ] = useState(0)
    const [ uniforms, setUniforms ] = useState([])
    const [ uniformsId, setUniformsId ] = useState(0)
    const [ instruments, setInstruments ] = useState([])
    const [ instrumentsId, setInstrumentsId ] = useState(0)
    const [ musics, setMusic ] = useState([])
    const [ assignedMusic, setAssignedMusic ] = useState(new Set())

useEffect(() => {
    getOneStudent(studentId).then(data => {setCurrentStudent(data)
        for (const part of data.music_parts) {
            assignedMusic.add(part.id)
        }
    })
}, [studentId])

useEffect(() => {
    getProps().then(data => setProps(data))
}, [])

useEffect(() => {
    getUniforms().then(data => setUniforms(data))
}, [])

useEffect(() => {
    getInstruments().then(data => setInstruments(data))
}, [])

useEffect(() => {
    getMusic().then(data => setMusic(data))
}, [])
// useEffect(() => {
//     getOneStudent(studentId)
//         .then((data) => {
//             setCurrentStudent(data)
//             for (const music of data.musics) {
//                 assignedMusic.add(music.id)
//             }
//         })
// }, [studentId])

return (
    <form className="studentsEdit">
        <header className="studentsEditHeader">Edit Student</header>
        <fieldset>
            <div className="form-group">
                <label htmlFor="instrument">Instrument: </label>
                <select className="instrumentDropDown"
                    onChange={(evt) => {
                        setInstrumentsId(parseInt(evt.target.value))
                    }}
                >
                    <option value={currentStudent?.instrument?.id}>Select Instrument...</option>
                    {
                        instruments.map((instrument) => {
                            return <option
                                value={`${instrument.id}`}
                                key={`instrument==${instrument.id}`}
                            >
                                {instrument.name}  Ser. Number: {instrument.serial_number}
                            </option>
                        })
                    }
                </select>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="instrument">Uniform: </label>
                <select className="uniformDropDown"
                    onChange={(evt) => {
                        setUniformsId(parseInt(evt.target.value))
                    }}
                >
                    <option value={currentStudent?.uniform?.id}>Select Uniform...</option>
                    {
                        uniforms.map((uniform) => {
                            return <option
                                value={`${uniform.id}`}
                                key={`instrument==${uniform.id}`}
                            >
                                Number: {uniform.uniform_number} Size:{uniform.size}
                            </option>
                        })
                    }
                </select>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="prop">Prop: </label>
                <select className="propDropDown"
                    onChange={(evt) => {
                        setPropsId(parseInt(evt.target.value))
                    }}
                >
                    <option value={currentStudent?.prop?.id}>Select Prop...</option>
                    {
                        props.map((prop) => {
                            return <option
                                value={`${prop.id}`}
                                key={`instrument==${prop.id}`}
                            >
                                {prop.name}
                            </option>
                        })
                    }
                </select>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
            <label htmlFor="musicParts">Assigned Music: </label>
                {
                    musics.map((music) => {
                        return <>
                        <option value={`${music.id}`} key={`music--${music.id}`}>{music.name} {music.part}</option>
                        <input type="checkbox"
                            className="selectPart"
                            defaultChecked={
                                currentStudent?.music_parts?.find(part => part.id === music.id) ? true : false
                            }
                            // value={currentStudent.music_parts}
                             onChange={(evt) => {
                                const copy = new Set(assignedMusic)
                                if(copy.has(music.id)){
                                    copy.remove(music.id)
                                } else {
                                    copy.add(music.id)
                                }
                                setAssignedMusic(copy)
                             }}
                        ></input>
                        </>
                    })
                }
            </div>
        </fieldset>
        
        
        <button type="submit"
            onClick={evt => {
                // Prevent form from being submitted
                evt.preventDefault()

                const student = {
                    instrument: instrumentsId,
                    uniform: uniformsId,
                    prop: propsId,
                    music_parts: Array.from(assignedMusic)
                }
                
                // Send POST request to your API
                updateStudent(student, studentId)
                    .then(() => navigate("/students"))
            }}
            // className="btn btn-primary"
            >
                Update
        </button>
    </form>

)
}