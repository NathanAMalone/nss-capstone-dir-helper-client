import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMusic } from "../../managers/MusicManager";

export const AddMusic = () => {
    const [ currentMusic, setCurrentMusic ] = useState({
        name: "",
        part: "",
        assigned: false
    })
    const navigate = useNavigate()

const changeMusicState = (evt) => {
    const copy = {...currentMusic}
    const propertyToModify = evt.target.id
    copy[propertyToModify] = evt.target.value
    setCurrentMusic(copy)
}

return (
    <article className="music">
        <header className="musicHeader">New Music Form</header>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Name: </label>
                <input type="text" id="name" required autoFocus className="form-control"
                    value={currentMusic.name}
                    onChange={changeMusicState}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="part">Part: </label>
                <input type="text" id="part" required className="form-control"
                    value={currentMusic.part}
                    onChange={changeMusicState}
                />
            </div>
        </fieldset>
        
        <button type="submit"
            onClick={evt => {
                // Prevent form from being submitted
                evt.preventDefault()

                const music = {
                    name: currentMusic.name,
                    part: currentMusic.part,
                    assigned: false
                }
                
                // Send POST request to your API
                createMusic(music)
                    .then(() => navigate("/music"))
            }}
            // className="btn btn-primary"
            >
                Add
        </button>
    </article>

)
}