import React, {useEffect, useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import { getStudents } from "../../managers/StudentManager"
import { getUniforms } from "../../managers/UniformManager"

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
            <button>Add New Uniform</button>
            {
                uniforms.map((uniform) => {
                    return <section className="uniformCard">
                        <div className="cardData">
                            <div className="cardDiv">Uniform Number: {uniform.uniform_number}</div>
                            <div className="cardDiv">Uniform Size: {uniform.size}</div>
                            <div>Is the uniform assigned?
                                <div>Assigned to:</div>
                            {
                                uniform.assigned
                                ? students.map(student => {
                                    if(student.uniform.id === uniform.id)
                                    return <li>{student.full_name}</li>
                                })
                                :<div>Not assigned.</div>
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
                                // className="btn btn-primary"
                                key={`editButton--${uniform.id}`}>
                                    Edit
                            </button>
                            <button>Delete</button>
                        </aside>
                    </section>
                })    
            }
        </article>
    )
}