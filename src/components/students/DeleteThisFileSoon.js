import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { createBourbonTried } from "../../managers/BourbonsTriedManager"
import { getBourbons } from "../../managers/BourbonManager"
import { getDescriptors } from "../../managers/DescriptorsManager"
export const AddBourbon = () => {
    const navigate = useNavigate()
    const [bourbons, setBourbons] = useState([])
    const [descriptors, setDescriptors] = useState([])
    const [chosenDescriptors, setChosenDescriptors] = useState(new Set())
    const [triedNewBourbon, updateNewBourbon] = useState({
        bourbon: 0,
        comments: "",
        rating: 0,
        descriptors: []
    })
    useEffect(() => {
        getBourbons().then(setBourbons)
    }, []
    )
    useEffect(() => {
        getDescriptors().then(setDescriptors)
    }, []
    )
    const changeTriedBourbonState = (domEvent) => {
        const value = domEvent.target.value
        updateNewBourbon({
            ...triedNewBourbon,
            [domEvent.target.name]: value
        })
    }
    return (
        <form className="bourbonForm">
            <h2 className="bourbonForm__description">Add A New Bourbon</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="bourbon">Bourbon:</label>
                    <select name="bourbon" className="drop_down" value={triedNewBourbon.name}
                    onChange={changeTriedBourbonState}>
                        <option value={0}>Select Bourbon</option>
                        {
                            bourbons.map((bourbon) =>{
                                return <option value={`${bourbon.id}`} key={`bourbon--${bourbon.id}`}>{bourbon.name}</option>
                            }
                            )
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Comments: </label>
                    <input type="text"
                        name="comments"
                        required autoFocus
                        className="form-control"
                        placeholder="What did you think?"
                        value={triedNewBourbon.comments}
                        onChange={changeTriedBourbonState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="rating">Rating: </label>
                    <input type="number"
                        name="rating"
                        required autoFocus
                        className="form-control"
                        placeholder="How Would You Rate It?"
                        value={triedNewBourbon.rating}
                        onChange={changeTriedBourbonState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="descriptor">Descriptor:</label>
                    {
                        descriptors.map((descriptor) =>{
                            return<>
                            <option value={`${descriptor.id}`} key={`descriptor--${descriptor.id}`}>{descriptor.label}</option>
                            <input
                                type="checkbox"
                                className="addDescriptor"
                                value={triedNewBourbon.descriptors}
                                onChange={
                                    (evt) => {
                                        const copy = new Set(chosenDescriptors)
                                        if(copy.has(descriptor.id)){
                                            copy.remove(descriptor.id)
                                        } else {
                                            copy.add(descriptor.id)
                                        }
                                        setChosenDescriptors(copy)
                                    }
                                }
                                />
                            </>
                        }
                        )
                    }
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    window.alert("Bourbon has been added!")
                    const newTriedBourbon = {
                        bourbon: parseInt(triedNewBourbon.bourbon),
                        comments: triedNewBourbon.comments,
                        rating: triedNewBourbon.rating,
                        descriptors: Array.from(chosenDescriptors)
                    }
                    createBourbonTried(newTriedBourbon)
                        .then(() => navigate({ pathname: "/mybourbons" }))
                }}
                className="btn btn-primary">Add Bourbon</button>
            </form>
            )
}