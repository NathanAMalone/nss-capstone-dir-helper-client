import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProp } from "../../managers/PropManager";

export const AddProp = () => {
    const [ currentProp, setCurrentProp ] = useState({
        name: "",
        assigned: false
    })
    const navigate = useNavigate()

const changePropState = (evt) => {
    const copy = {...currentProp}
    const propertyToModify = evt.target.id
    copy[propertyToModify] = evt.target.value
    setCurrentProp(copy)
}

return (
    <form className="props">
        <header className="propHeader">New Prop Form</header>
        <div className="newPropForm">
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
                        name: currentProp.name,
                        assigned: false
                    }
                    
                    // Send POST request to your API
                    createProp(prop)
                        .then(() => navigate("/props"))
                }}
                className="btn btn-2"
                >
                    Add
            </button>
        </div>
    </form>

)
}