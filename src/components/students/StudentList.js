import React, {useEffect, useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import { deleteStudent, getStudents } from "../../managers/StudentManager"

export const StudentList = () => {
    const [students, setStudents] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getStudents().then(data => setStudents(data))
    }, [])

    return (
        <article className="students">
            <header className="studentHeader">Students</header>
            {
                students.map((student) => {
                    return <section className="studentCard">
                        <div className="cardData">
                            <div className="cardDiv">Name: {student.full_name}</div>
                            <div className="cardDiv">School: {student.school.name}</div>
                            <div className="cardDiv">Instrument: {student?.instrument?.name}</div>
                            <div className="cardDiv">Instrument Serial Number: {student?.instrument?.serial_number}</div>
                            <div className="cardDiv">Prop: {student?.prop?.name}</div>
                            <div className="cardDiv">Uniform: {student?.uniform?.uniform_number}</div>
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
                            <button onClick={
                                () => navigate(`/students/${student.id}`)}
                                // className="btn btn-primary"
                                key={`editButton--${student.id}`}>
                                    Edit
                            </button>
                            <button onClick={
                                () => deleteStudent(student.id).then(window.location.reload())}
                                // className="btn btn-primary"
                                key={`deleteButton--${student.id}`}>
                                    Delete
                            </button>
                        </aside>
                    </section>
                })    
            }
        </article>
    )
}