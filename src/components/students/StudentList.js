import React, {useEffect, useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import { getStudents } from "../../managers/StudentManager"

export const StudentList = () => {
    const [students, setStudents] = useState([])

    useEffect(() => {
        getStudents().then(data => setStudents(data))
    }, [])

    return (
        <article className="students">
            <header className="studentHeader">Students</header>
            <button>Add New Student</button>
            {
                students.map((student) => {
                    return <section className="studentCard">
                        <div className="cardData">
                            <div className="cardDiv">Name: {student.full_name}</div>
                            <div className="cardDiv">School: {student.school.name}</div>
                            <div className="cardDiv">Instrument: {student.instrument.name}</div>
                            <div className="cardDiv">Instrument Serial Number: {student.instrument.serial_number}</div>
                            <div className="cardDiv">Prop: {student.prop.name}</div>
                            <div className="cardDiv">Uniform: {student.uniform.uniform_number}</div>
                            <div className="cardDiv">
                                {
                                    student.music_parts.map(part => {
                                        return<> 
                                        <div>Music: {part.name}</div>
                                        <div>Part: {part.part}</div>
                                        </>
                                    })
                                }
                            </div>
                        </div>
                        <aside>
                            <button>Edit</button>
                            <button>Delete</button>
                        </aside>
                    </section>
                })    
            }
        </article>
    )
}