import React, {useEffect, useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import { getProps } from "../../managers/PropManager"
import { getStudents } from "../../managers/StudentManager"

export const PropList = () => {
    const [props, setProps] = useState([])
    const [students, setStudents] = useState([])
    
    useEffect(() => {
        getProps().then(data => setProps(data))
    }, [])

    useEffect(() => {
        getStudents().then(data => setStudents(data))
    }, [])

    return (
        <article className="props">
            <header className="propHeader">Props</header>
            <button>Add New Prop</button>
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
                            <button>Edit</button>
                            <button>Delete</button>
                        </aside>
                    </section>
                })    
            }
        </article>
    )
}