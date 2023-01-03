import React, {useEffect, useState} from "react"
import { getStudents } from "../../managers/StudentManager"
import "./Students.css"

export const StudentView = () => {
    const [student, setStudents] = useState({})

    useEffect(() => {
        getStudents().then(data => setStudents(data))
    }, [])

    return (
        <article className="students">
            <header className="studentHeader">Student</header>
            {
               
                    <section className="studentCard">
                        <div className="cardData">
                            <div className="cardDiv">Name: {student?.full_name}</div>
                            <div className="cardDiv">School: {student?.school?.name}</div>
                            <div className="cardDiv">Instrument: {student?.instrument?.name}</div>
                            <div className="cardDiv">Instrument Serial Number: {student?.instrument?.serial_number}</div>
                            <div className="cardDiv">Prop: {student?.prop?.name}</div>
                            <div className="cardDiv">Uniform: {student?.uniform?.uniform_number}</div>
                            <div className="cardDiv">
                                {
                                    student?.music_parts?.map(part => {
                                        return<> 
                                        <div>Music: {part?.name}</div>
                                        <div className="assignedPart">Part: {part?.part}</div>
                                        </>
                                    })
                                }
                            </div>
                        </div>
                    </section>
                    
            }
        </article>
    )
}