export const getProps = () => {
    return fetch("http://localhost:8000/props", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const getOneProp = (propId) => {
    return fetch(`http://localhost:8000/props/${propId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const updateProp = (prop, propId) => {
    return fetch(`http://localhost:8000/props/${propId}`, { 
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-type": "application/json"
        },
        method: "PUT", 
        body: JSON.stringify(prop)
    })
        
}

export const createProp = (prop) => {
    return fetch("http://localhost:8000/props", { 
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-type": "application/json"
        },
        method: "POST", 
        body: JSON.stringify(prop),
    })
        .then(res => res.json())
}

export const deleteProp = (propId) => {
    return fetch(`http://localhost:8000/props/${propId}`, { 
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        },
        method: "DELETE", 
    })
        
}