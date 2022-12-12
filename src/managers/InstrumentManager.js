export const getInstruments = () => {
    return fetch("http://localhost:8000/instruments", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const getOneInstrument = (instrumentId) => {
    return fetch(`http://localhost:8000/instruments/${instrumentId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const updateInstrument = (instrument, instrumentId) => {
    return fetch(`http://localhost:8000/instruments/${instrumentId}`, { 
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-type": "application/json"
        },
        method: "PUT", 
        body: JSON.stringify(instrument)
    })
        
}