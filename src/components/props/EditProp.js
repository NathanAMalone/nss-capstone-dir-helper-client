import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOneProp, updateProp } from "../../managers/PropManager";
import { getOneUniform, updateUniform } from "../../managers/UniformManager";

export const EditProp = () => {
    const { propId } = useParams()
    const [ currentProp, setCurrentProp ] = useState({
        name: ""
    })
    const navigate = useNavigate()

useEffect(() => {
    getOneProp(propId).then(data => setCurrentProp(data))
}, [propId])

const changePropState = (evt) => {
    const copy = {...currentProp}
    const propertyToModify = evt.target.id
    copy[propertyToModify] = evt.target.value
    setCurrentProp(copy)
}

return (
    <article className="props">
        <header className="propHeader">Edit Prop</header>
        <fieldset>
            <div className="form-group">
                <label htmlFor="type">Name: </label>
                <input type="text" id="name" required autoFocus className="form-control"
                    value={currentProp.name}
                    onChange={changePropState}
                />
            </div>
        </fieldset>
                
        <button type="submit"
            onClick={evt => {
                // Prevent form from being submitted
                evt.preventDefault()

                const prop = {
                    name: currentProp.name
                }
                
                // Send POST request to your API
                updateProp(prop, propId)
                    .then(() => navigate("/props"))
            }}
            // className="btn btn-primary"
            >
                Update
        </button>
    </article>

)
}