import React, {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { deleteInstrument, getInstruments } from "../../managers/InstrumentManager"
import { getStudents } from "../../managers/StudentManager"
import "./Instruments.css"

export const InstrumentList = () => {
    const [instruments, setInstruments] = useState([])
    const [students, setStudents] = useState([])
    const navigate = useNavigate()
    
    useEffect(() => {
        getInstruments().then(data => setInstruments(data))
    }, [])

    useEffect(() => {
        getStudents().then(data => setStudents(data))
    }, [])

    return (
        <article className="instruments">
            <header className="instrumentHeader">Instruments</header>
            <button onClick={
                () => navigate(`/addInstruments`)}
            className="btn btn-add">
                Add Instrument
            </button>
            {
                instruments.map((instrument) => {
                    return <section className="instrumentCard" key={`instrumentCard--${instrument.id}`}>
                        <div className="cardData">
                            <div className="cardDiv">Type: {instrument.type}</div>
                            <div className="cardDiv">Name: {instrument.name}</div>
                            <div className="cardDiv">Serial Number: {instrument.serial_number}</div>
                            {
                                instrument.out_for_repair
                                ?<div className="cardDiv">Out for repair? Yes</div>
                                :<div className="cardDiv">Out for repair? No</div>
                            }
                            {
                                instrument.school_owned
                                ?<div className="cardDiv">School Owned: Yes</div>
                                :<div className="cardDiv">School Owned: No</div>
                            }
                            <div>Is the instrument assigned?
                                <div className="assignedTo">Assigned to:</div>
                            {
                                instrument.assigned
                                ? students.map(student => {
                                    if(student?.instrument?.id === instrument.id)
                                        return <li className="assignedList"
                                        key={`assignedList--${student.id}`}>
                                            {student.full_name}
                                        </li>
                                })
                                :<div className="notAssigned">Not assigned.</div>
                            }
                            </div>
                        </div>
                        <aside>
                            <button onClick={
                                () => navigate(`/instruments/${instrument.id}`)}
                                className="btn btn-2"
                                key={`editButton--${instrument.id}`}>
                                    Edit
                            </button>
                            <button onClick={
                                () => deleteInstrument(instrument.id).then(window.location.reload())}
                                className="btn btn-2"
                                key={`deleteButton--${instrument.id}`}>
                                    Delete
                            </button>
                        </aside>
                    </section>
                })    
            }
        </article>
    )
}