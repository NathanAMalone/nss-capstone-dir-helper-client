import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOneInstrument, updateInstrument } from "../../managers/InstrumentManager";
import "./Instruments.css"

export const EditInstrument = () => {
    const { instrumentId } = useParams()
    const [ currentInstrument, setCurrentInstrument ] = useState({
        name: "",
        type: "",
        serialNumber: 0,
        outForRepair: false,
        schoolOwned: false,
        assigned: false
    })
    const navigate = useNavigate()

useEffect(() => {
    getOneInstrument(instrumentId).then(data => setCurrentInstrument(data))
}, [instrumentId])

const changeInstrumentState = (evt) => {
    const copy = {...currentInstrument}
    const propertyToModify = evt.target.id
    copy[propertyToModify] = evt.target.value
    setCurrentInstrument(copy)
}

const changeInstrumentCheck = (evt) => {
    const copy = {...currentInstrument}
    const propertyToModify = evt.target.id
    copy[propertyToModify] = evt.target.checked
    setCurrentInstrument(copy)
}

return (
    <form className="instruments">
        <header className="instrumentHeader">Edit Instrument</header>
        <div className="editInstrumentForm">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" required autoFocus className="form-control"
                        value={currentInstrument.name}
                        onChange={changeInstrumentState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="type">Type: </label>
                    <input type="text" id="type" required className="form-control"
                        value={currentInstrument.type}
                        onChange={changeInstrumentState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="serialNumber">Serial Number: </label>
                    <input type="number" id="serial_number" required className="form-control"
                        value={currentInstrument.serial_number}
                        onChange={changeInstrumentState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="outForRepair">Out for Repair? </label>
                    <input type="checkbox" id="out_for_repair" required className="form-control"
                        checked={currentInstrument.out_for_repair}
                        onChange={changeInstrumentCheck}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="schoolOwned">School owned? </label>
                    <input type="checkbox" id="school_owned" required className="form-control"
                        checked={currentInstrument.school_owned}
                        onChange={changeInstrumentCheck}
                    />
                </div>
            </fieldset>
            
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const instrument = {
                        name: currentInstrument.name,
                        type: currentInstrument.type,
                        serial_number: currentInstrument.serial_number,
                        out_for_repair: currentInstrument.out_for_repair,
                        school_owned: currentInstrument.school_owned
                    }
                    
                    // Send POST request to your API
                    updateInstrument(instrument, instrumentId)
                        .then(() => navigate("/instruments"))
                }}
                className="btn btn-2"
                >
                    Update
            </button>
        </div>
    </form>

)
}