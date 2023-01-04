import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOneMusic, updateMusic } from "../../managers/MusicManager";

export const EditMusic = () => {
    const { musicId } = useParams()
    const [ currentMusic, setCurrentMusic ] = useState({
        name: "",
        part: "",
    })
    const navigate = useNavigate()

useEffect(() => {
    getOneMusic(musicId).then(data => setCurrentMusic(data))
}, [musicId])

const changeMusicState = (evt) => {
    const copy = {...currentMusic}
    const propertyToModify = evt.target.id
    copy[propertyToModify] = evt.target.value
    setCurrentMusic(copy)
}

return (
    <form className="music">
        <header className="musicHeader">Edit Music</header>
        <div className="editMusicForm">
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
                        part: currentMusic.part
                    }
                    
                    // Send POST request to your API
                    updateMusic(music, musicId)
                        .then(() => navigate("/music"))
                }}
                className="btn btn-2"
                >
                    Update
            </button>
        </div>
    </form>

)
}