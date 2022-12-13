import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getInstruments, updateInstrument } from "../../managers/InstrumentManager";
import { getMusic } from "../../managers/MusicManager";
import { getProps } from "../../managers/PropManager";
import { getUniforms } from "../../managers/UniformManager";

export const EditStudent = () => {
    const { studentId } = useParams()
    const [ currentStudent, setCurrentStudent ] = useState({
        name: "",
        type: "",
        serialNumber: 0,
        outForRepair: false,
        schoolOwned: false,
        assigned: false
    })
    const navigate = useNavigate()
    const [ props, setProps ] = useState([])
    const [ uniforms, setUniforms ] = useState([])
    const [ instruments, setInstruments ] = useState([])
    const [ music, setMusic ] = useState([])

useEffect(() => {
    getOneStudent(studentId).then(data => setCurrentStudent(data))
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

const changeStudentState = (evt) => {
    const copy = {...currentStudent}
    const propertyToModify = evt.target.id
    copy[propertyToModify] = evt.target.value
    setCurrentStudent(copy)
}

const changeStudentCheck = (evt) => {
    const copy = {...currentStudent}
    const propertyToModify = evt.target.id
    copy[propertyToModify] = evt.target.checked
    setStudentInstrument(copy)
}

return (
    <article className="students">
        <header className="studentHeader">Edit Student</header>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Name: </label>
                <input type="text" id="name" required autoFocus className="form-control"
                    value={currentInstrument.name}
                    onChange={changeInstrumentState}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="type">Type: </label>
                <input type="text" id="type" required className="form-control"
                    value={currentInstrument.type}
                    onChange={changeInstrumentState}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="serialNumber">Serial Number: </label>
                <input type="number" id="serial_number" required className="form-control"
                    value={currentInstrument.serial_number}
                    onChange={changeInstrumentState}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="outForRepair">Out for Repair? </label>
                <input type="checkbox" id="out_for_repair" required className="form-control"
                    checked={currentInstrument.out_for_repair}
                    onChange={changeInstrumentCheck}
                />
            </div>
        </fieldset>
         <fieldset>
            <div className="form-group">
                <label htmlFor="schoolOwned">School owned? </label>
                <input type="checkbox" id="school_owned" required className="form-control"
                    checked={currentInstrument.school_owned}
                    onChange={changeInstrumentCheck}
                />
            </div>
        </fieldset>
        
        <button type="submit"
            onClick={evt => {
                // Prevent form from being submitted
                evt.preventDefault()

                const instrument = {
                    name: currentInstrument.name,
                    type: currentInstrument.type,
                    serial_number: currentInstrument.serial_number,
                    out_for_repair: currentInstrument.out_for_repair,
                    school_owned: currentInstrument.school_owned
                }
                
                // Send POST request to your API
                updateInstrument(instrument, instrumentId)
                    .then(() => navigate("/instruments"))
            }}
            // className="btn btn-primary"
            >
                Update
        </button>
    </article>

)
}