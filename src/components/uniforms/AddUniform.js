import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUniform } from "../../managers/UniformManager";

export const AddUniform = () => {
    const [ currentUniform, setCurrentUniform ] = useState({
        uniformNumber: 0,
        size: "",
        outForCleaning: false,
        assigned: false
    })
    const navigate = useNavigate()

const changeUniformState = (evt) => {
    const copy = {...currentUniform}
    const propertyToModify = evt.target.id
    copy[propertyToModify] = evt.target.value
    setCurrentUniform(copy)
}

return (
    <form className="uniforms">
        <header className="uniformHeader">New Uniform Form</header>
        <fieldset>
            <div className="form-group">
                <label htmlFor="uniformNumber">Uniform Number: </label>
                <input type="number" id="uniform_number" required autoFocus className="form-control"
                    value={currentUniform.uniform_number}
                    onChange={changeUniformState}
                />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="type">Size: </label>
                <input type="text" id="size" required className="form-control"
                    value={currentUniform.size}
                    onChange={changeUniformState}
                />
            </div>
        </fieldset>
        
        <button type="submit"
            onClick={evt => {
                // Prevent form from being submitted
                evt.preventDefault()

                const uniform = {
                    uniform_number: currentUniform.uniform_number,
                    size: currentUniform.size,
                    out_for_cleaning: currentUniform.out_for_cleaning,
                    assigned: false
                }
                
                // Send POST request to your API
                createUniform(uniform)
                    .then(() => navigate("/uniforms"))
            }}
            // className="btn btn-primary"
            >
                Add
        </button>
    </form>

)
}