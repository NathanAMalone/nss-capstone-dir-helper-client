import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createInstrument } from "../../managers/InstrumentManager";
import "./Instruments.css"


export const AddInstrument = () => {
    const [ instrument, setInstrument ] = useState({
        name: "",
        type: "",
        serial_number: 0,
        out_for_repair: false,
        school_owned: false,
        assigned: false
    })
    const navigate = useNavigate()

const changeInstrumentState = (evt) => {
    const copy = {...instrument}
    const propertyToModify = evt.target.id
    copy[propertyToModify] = evt.target.value
    setInstrument(copy)
}

const changeInstrumentCheck = (evt) => {
    const copy = {...instrument}
    const propertyToModify = evt.target.id
    copy[propertyToModify] = evt.target.checked
    setInstrument(copy)
}

return (
    <form className="instruments">
        <header className="instrumentHeader">New Instrument Form</header>
        <div className="newInstrumentForm">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" required autoFocus className="form-control"
                        value={instrument.name}
                        onChange={changeInstrumentState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="type">Type: </label>
                    <input type="text" id="type" required className="form-control"
                        value={instrument.type}
                        onChange={changeInstrumentState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="serialNumber">Serial Number: </label>
                    <input type="number" id="serial_number" required className="form-control"
                        value={instrument.serial_number}
                        onChange={changeInstrumentState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="schoolOwned">School owned? </label>
                    <input type="checkbox" id="school_owned" required className="form-control"
                        checked={instrument.school_owned}
                        onChange={changeInstrumentCheck}
                    />
                </div>
            </fieldset>
            
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const newInstrument = {
                        name: instrument.name,
                        type: instrument.type,
                        serial_number: instrument.serial_number,
                        out_for_repair: instrument.out_for_repair,
                        school_owned: instrument.school_owned,
                        assigned: false
                    }
                    
                    // Send POST request to your API
                    createInstrument(newInstrument)
                        .then(() => navigate("/instruments"))
                }}
                className="btn btn-2"
                >
                    Add
            </button>
        </div>
    </form>

)
}