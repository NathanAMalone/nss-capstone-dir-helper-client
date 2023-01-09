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

export const createInstrument = (instrument) => {
    return fetch("http://localhost:8000/instruments", { 
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-type": "application/json"
        },
        method: "POST", 
        body: JSON.stringify(instrument),
    })
        .then(res => res.json())
}

export const deleteInstrument = (instrumentId) => {
    return fetch(`http://localhost:8000/instruments/${instrumentId}`, { 
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        },
        method: "DELETE", 
    })
        
}