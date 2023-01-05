import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOneProp, updateProp } from "../../managers/PropManager";

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
    <form className="props">
        <header className="propHeader">Edit Prop</header>
        <div className="editPropForm">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="type">Name: </label>
                    <input type="text" id="name" required autoFocus className="form-control"
                        value={currentProp.name}
                        autocomplete="off"
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
                className="btn btn-2"
                >
                    Update
            </button>
        </div>
    </form>

)
}