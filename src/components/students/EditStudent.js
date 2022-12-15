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
    const [ uniforms, setUniforms ] = useState([])
    const [ instruments, setInstruments ] = useState([])
    const [ musics, setMusic ] = useState([])
    const [ assignedMusic, setAssignedMusic ] = useState(new Set())

useEffect(() => {
    getOneStudent(studentId).then(data => {setCurrentStudent(data)
        const selectedMusic = new Set()
        for (const part of data.music_parts) {
            selectedMusic.add(part.id)
        }
        setAssignedMusic(selectedMusic)
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

const changeCurrentStudentState = (evt) => {
    const copy = {...currentStudent}
    const propertyToModify = evt.target.id
    copy[propertyToModify] = parseInt(evt.target.value)
    setCurrentStudent(copy)
}

return (
    <form className="studentsEdit">
        <header className="studentsEditHeader">Edit Student</header>
        <fieldset>
            <div className="form-group">
                <label htmlFor="instrument">Instrument: </label>
                <select className="instrumentDropDown" id="instrument"
                    onChange={
                        // (evt) => {
                        // setInstrumentsId(parseInt(evt.target.value))
                        changeCurrentStudentState
                    // }
                }
                >
                    <option value={0}>Select Instrument...</option>
                    {
                        instruments.map((instrument) => {
                            const isSelected = instrument.id === currentStudent?.instrument?.id
                            return <option
                                selected={isSelected ? true:false}
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
                <select className="uniformDropDown" id="uniform"
                    onChange={
                        // (evt) => {
                        // setUniformsId(parseInt(evt.target.value))
                        changeCurrentStudentState
                    // }
                }
                >
                    <option value={currentStudent?.uniform?.id}>Select Uniform...</option>
                    {
                        uniforms.map((uniform) => {
                            const isSelected = uniform.id === currentStudent?.uniform?.id
                            return <option
                                selected={isSelected ? true:false}
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
                <select className="propDropDown" id="prop"
                   onChange={ 
                    // (evt) => {
                    // setUniformsId(parseInt(evt.target.value))
                    changeCurrentStudentState
                // }
            }
                >
                    <option value={currentStudent?.prop?.id}>Select Prop...</option>
                    {
                        props.map((prop) => {
                            const isSelected = prop.id === currentStudent?.prop?.id
                            return <option
                                selected={isSelected ? true:false}
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
                                // currentStudent?.music_parts?.find(part => part.id === music.id) ? true : false
                                assignedMusic.has(music.id)
                            }
                            checked={
                                // currentStudent?.music_parts?.find(part => part.id === music.id) ? true : false
                                assignedMusic.has(music.id)
                            }
                            onChange={(evt) => {
                                const copy = new Set(assignedMusic)
                                if(copy.has(music.id)){
                                    copy.delete(music.id)
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
                    instrument: currentStudent.instrument,
                    uniform: currentStudent.uniform,
                    prop: currentStudent.prop,
                    music_parts: Array.from(assignedMusic)
                }
                // if (currentStudent.instrument.id) {
                // ?student[instrument] = currentStudent.instrument.id
                // :student[instrument] = currentStudent.instrument}
                
                // if (currentStudent.uniform.id)
                // ?student[uniform] = currentStudent.uniform.id
                // :student[uniform] = currentStudent.uniform
                
                // if (currentStudent.prop.id)
                // ?student[prop] = currentStudent.prop.id
                // :student[prop] = currentStudent.prop
                
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