import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getSchools } from "../../managers/SchoolManager"

export const DirectorRegister = () => {
    const [director, setDirector] = useState({ "account_type": "director" })
    const [serverFeedback, setFeedback] = useState("")
    const conflictDialog = useRef()
    const navigate = useNavigate()
    const [schools, setSchools] = useState([])
    const [schoolId, setSchoolId] = useState(0)

    useEffect(() => {
        getSchools().then(data => setSchools(data))
    }, [])

    const handleRegister = (e) => {
        e.preventDefault()
        fetch("http://localhost:8000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(director)
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json()
                }
                return res.json().then((json) => {
                    throw new Error(JSON.stringify(json))
                });
            })
            .then(createdUser => {
                localStorage.setItem("lu_token", createdUser.token)
                localStorage.setItem("user", JSON.stringify(createdUser))
                navigate("/")
            })
            .catch(error => {
                setFeedback(JSON.parse(error.message).message)
            })
    }

    useEffect(() => {
        if (serverFeedback !== "") {
            conflictDialog.current.showModal()
        }
    }, [serverFeedback])

    const updateDirector = (evt) => {
        const copy = { ...director }
        copy[evt.target.id] = evt.target.value
        setDirector(copy)
    }


    return (
        <main style={{ textAlign: "center" }}>
            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>{ serverFeedback }</div>
                <button className="button--close"
                    onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Welcome to the Helper!</h1>
                <fieldset>
                    <label htmlFor="first_name"> First Name </label>
                    <input onChange={updateDirector}
                        type="text" id="first_name" className="form-control"
                        placeholder="Enter your first name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="last_name"> Last Name </label>
                    <input onChange={updateDirector}
                        type="text" id="last_name" className="form-control"
                        placeholder="Enter your last name" required />
                </fieldset>
                {/* <fieldset>
                    <label htmlFor="school"> School </label>
                    <select className="schoolDropDown"
                        onChange={(evt) => {
                            setSchoolId(parseInt(evt.target.value))
                        }}>
                        <option>Select School...</option>
                        {
                            schools.map((school) => {
                                return <option
                                    value={`${school.id}`}
                                    key={`school--${school.id}`}>
                                    {school.name}
                                </option>
                            })
                        }
                    </select>
                </fieldset> */}
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateDirector}
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="password"> Password </label>
                    <input onChange={updateDirector}
                        type="password"
                        id="password"
                        className="form-control" required />
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}