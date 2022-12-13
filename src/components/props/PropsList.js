import React, {useEffect, useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import { deleteProp, getProps } from "../../managers/PropManager"
import { getStudents } from "../../managers/StudentManager"

export const PropList = () => {
    const [props, setProps] = useState([])
    const [students, setStudents] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getProps().then(data => setProps(data))
    }, [])

    useEffect(() => {
        getStudents().then(data => setStudents(data))
    }, [])

    return (
        <article className="props">
            <header className="propHeader">Props</header>
            <button onClick={
                () => navigate(`/addProps`)}
            className="btn btn-primary">
                Add Prop
            </button>
            {
                props.map((prop) => {
                    return <section className="propCard">
                        <div className="cardData">
                            <div className="cardDiv">Name: {prop.name}</div>
                            <div>Is the prop assigned?
                                <div>Assigned to:</div>
                            {
                                prop.assigned
                                ? students.map(student => {
                                    if(student.prop.id === prop.id)
                                        return <li>{student.full_name}</li>
                                })
                                :<div>Not assigned.</div>
                            }
                            </div>
                        </div>
                        <aside>
                        <button onClick={
                            () => navigate(`/props/${prop.id}`)}
                            // className="btn btn-primary"
                            key={`editButton--${prop.id}`}>
                                Edit
                        </button>
                        <button onClick={
                            () => deleteProp(prop.id).then(window.location.reload())}
                            // className="btn btn-primary"
                            key={`deleteButton--${prop.id}`}>
                                Delete
                        </button>
                        </aside>
                    </section>
                })    
            }
        </article>
    )
}