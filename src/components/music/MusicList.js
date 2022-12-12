import React, {useEffect, useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import { getMusic } from "../../managers/MusicManager"
import { getStudents } from "../../managers/StudentManager"

export const MusicList = () => {
    const [music, setMusic] = useState([])
    const [students, setStudents] = useState([])
    const navigate = useNavigate()
    
    useEffect(() => {
        getMusic().then(data => setMusic(data))
    }, [])

    useEffect(() => {
        getStudents().then(data => setStudents(data))
    }, [])

    return (
        <article className="music">
            <header className="musicHeader">Music</header>
            <button>Add New Music</button>
            {
                music.map((music) => {
                    return <section className="musicCard">
                        <div className="cardData">
                            <div className="cardDiv">Name: {music.name}</div>
                            <div className="cardDiv">Part: {music.part}</div>
                           <div>Is the music assigned?
                            <div>Assigned to:</div>
                            {
                                music.assigned
                                ? students.map(student => {
                                    return student.music_parts.map(part => {
                                        if(part.id === music.id)
                                        return <li>{student.full_name}.</li>
                                    })
                                })
                                :<div>Not assigned.</div>
                            }
                            </div>
                        </div>
                        <aside>
                        <button onClick={
                                () => navigate(`/music/${music.id}`)}
                                // className="btn btn-primary"
                                key={`editButton--${music.id}`}>
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