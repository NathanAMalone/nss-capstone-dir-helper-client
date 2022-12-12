import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOneUniform, updateUniform } from "../../managers/UniformManager";

export const EditUniform = () => {
    const { uniformId } = useParams()
    const [ currentUniform, setCurrentUniform ] = useState({
        uniformNumber: 0,
        size: "",
        outForCleaning: false,
    })
    const navigate = useNavigate()

useEffect(() => {
    getOneUniform(uniformId).then(data => setCurrentUniform(data))
}, [uniformId])

const changeUniformState = (evt) => {
    const copy = {...currentUniform}
    const propertyToModify = evt.target.id
    copy[propertyToModify] = evt.target.value
    setCurrentUniform(copy)
}

const changeUniformCheck = (evt) => {
    const copy = {...currentUniform}
    const propertyToModify = evt.target.id
    copy[propertyToModify] = evt.target.checked
    setCurrentUniform(copy)
}

return (
    <article className="uniforms">
        <header className="uniformHeader">Edit Uniform</header>
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
        <fieldset>
            <div className="form-group">
                <label htmlFor="outForCleaning">Out for Cleaning? </label>
                <input type="checkbox" id="out_for_cleaning" required className="form-control"
                    checked={currentUniform.out_for_cleaning}
                    onChange={changeUniformCheck}
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
                    out_for_cleaning: currentUniform.out_for_cleaning
                }
                
                // Send POST request to your API
                updateUniform(uniform, uniformId)
                    .then(() => navigate("/uniforms"))
            }}
            // className="btn btn-primary"
            >
                Update
        </button>
    </article>

)
}