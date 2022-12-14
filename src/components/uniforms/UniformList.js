import React, {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { getStudents } from "../../managers/StudentManager"
import { deleteUniform, getUniforms } from "../../managers/UniformManager"
import "./Uniforms.css"

export const UniformList = () => {
    const [uniforms, setUniforms] = useState([])
    const [students, setStudents] = useState([])
    const navigate = useNavigate()
    
    useEffect(() => {
        getUniforms().then(data => setUniforms(data))
    }, [])

    useEffect(() => {
        getStudents().then(data => setStudents(data))
    }, [])

    return (
        <article className="uniforms">
            <header className="uniformHeader">Uniforms</header>
            <button onClick={
                () => navigate(`/addUniforms`)}
            className="btn btn-add">
                Add Uniform
            </button>
            {
                uniforms.map((uniform) => {
                    return <section className="uniformCard" key={`uniformCard--${uniform.id}`}>
                        <div className="cardData">
                            <div className="cardDiv">Uniform Number: {uniform.uniform_number}</div>
                            <div className="cardDiv">Uniform Size: {uniform.size}</div>
                            <div>Is the uniform assigned?
                                <div className="assignedTo">Assigned to:</div>
                            {
                                uniform.assigned
                                ? students.map(student => {
                                    if(student?.uniform?.id === uniform.id)
                                    return <li className="assignedList"
                                    key={`studentCard--${student.id}`}>
                                        {student.full_name}
                                    </li>
                                })
                                :<div className="notAssigned">Not assigned.</div>
                            }
{
                                uniform.out_for_cleaning
                                ?<div className="cardDiv">Out for cleaning? Yes</div>
                                :<div className="cardDiv">Out for cleaning? No</div>
                            }                            </div>
                        </div>
                        <aside>
                            <button onClick={
                                () => navigate(`/uniforms/${uniform.id}`)}
                                className="btn btn-2"
                                key={`editButton--${uniform.id}`}>
                                    Edit
                            </button>
                        <button onClick={
                            () => deleteUniform(uniform.id).then(window.location.reload())}
                            className="btn btn-2"
                            key={`deleteButton--${uniform.id}`}>
                                Delete
                        </button>
                        </aside>
                    </section>
                })    
            }
        </article>
    )
}